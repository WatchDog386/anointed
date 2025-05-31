import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MapControls from '../components/MapControls';
import { CoverageEligibilityPanel } from '../components/CoverageEligibilityPanel';
import { MapLegend } from '../components/MapLegend';

const CoverageMap = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const kmlLayer = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const pulseIntervalRef = useRef(null);
  const locationTimeoutRef = useRef(null);

  const [mapReady, setMapReady] = useState(false);
  const [kmlVisible, setKmlVisible] = useState(true);
  const [address, setAddress] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEligibilityPanel, setShowEligibilityPanel] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [whatsappForm, setWhatsappForm] = useState({
    show: false,
    fullName: '',
    phone: '',
    email: '',
    location: ''
  });

  // WhatsApp business number (ensure this is correct with country code)
  const whatsappNumber = "254726818938"; // Removed + for better compatibility

  // Sample areas data
  const coveredAreas = [
    "Baba Dogo",
    "Kasabun",
    "Riverside",
    "Seasons",
    "Hunters",
    "Gumba",
    "Laundry",
    "Lucky Summer",
    "Ngomongo",
    
  ];

  const NAIROBI_BOUNDS = [
    [-1.45, 36.65],
    [-1.15, 37.05],
  ];

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCss);

        await import('leaflet');

        const omnivoreScript = document.createElement('script');
        omnivoreScript.src = 'https://unpkg.com/leaflet-omnivore@0.3.4/leaflet-omnivore.min.js';
        omnivoreScript.onload = () => setMapReady(true);
        document.body.appendChild(omnivoreScript);

        const fullscreenCss = document.createElement('link');
        fullscreenCss.rel = 'stylesheet';
        fullscreenCss.href = 'https://unpkg.com/leaflet.fullscreen/Control.FullScreen.css';
        document.head.appendChild(fullscreenCss);

        const fullscreenScript = document.createElement('script');
        fullscreenScript.src = 'https://unpkg.com/leaflet.fullscreen/Control.FullScreen.js';
        document.body.appendChild(fullscreenScript);
      } catch (err) {
        console.error('Error loading map libraries:', err);
      }
    };

    loadLeaflet();

    return () => {
      mapInstance.current?.remove();
      kmlLayer.current?.remove();
      clearTimeout(locationTimeoutRef.current);
      clearInterval(pulseIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !window.L || !window.omnivore || !mapRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      minZoom: 11,
      maxBounds: NAIROBI_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    }).setView([-1.286389, 36.817223], 12);

    mapInstance.current = map;

    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    baseLayer.addTo(map);

    L.control.scale({ position: 'bottomleft' }).addTo(map);

    if (L.control.fullscreen) {
      L.control.fullscreen({ position: 'topright' }).addTo(map);
    }

    L.rectangle(NAIROBI_BOUNDS, {
      color: '#0ff',
      weight: 3,
      fill: false,
      dashArray: '10 5',
      className: 'leaflet-animated-border',
    }).addTo(map);

    kmlLayer.current = window.omnivore.kml('/coverage.kml')
      .on('ready', () => {
        try {
          map.fitBounds(kmlLayer.current.getBounds(), { padding: [30, 30] });
        } catch (e) {
          console.warn('Could not fit KML bounds:', e);
        }
      })
      .addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.attribution({
      position: 'bottomright',
      prefix: '<a href="https://leafletjs.com/">Leaflet</a>',
    }).addTo(map);
  }, [mapReady]);

  const toggleKmlVisibility = () => {
    if (!kmlLayer.current) return;
    if (kmlLayer.current.getMap()) {
      kmlLayer.current.remove();
    } else {
      kmlLayer.current.addTo(mapInstance.current);
    }
    setKmlVisible(!kmlVisible);
  };

  const createPulseEffect = (latlng) => {
    const L = window.L;
    clearInterval(pulseIntervalRef.current);
    
    if (markerRef.current) mapInstance.current.removeLayer(markerRef.current);
    if (accuracyCircleRef.current) mapInstance.current.removeLayer(accuracyCircleRef.current);

    markerRef.current = L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      }),
      zIndexOffset: 1000
    }).addTo(mapInstance.current);

    const pulseCircle = L.circle(latlng, {
      radius: 10,
      stroke: false,
      fillColor: '#4285F4',
      fillOpacity: 0.7,
      className: 'location-pulse',
    }).addTo(mapInstance.current);

    let radius = 10;
    let opacity = 0.7;
    let growing = true;

    pulseIntervalRef.current = setInterval(() => {
      if (growing) {
        radius += 2;
        opacity -= 0.02;
        if (radius >= 30) growing = false;
      } else {
        radius -= 2;
        opacity += 0.02;
        if (radius <= 10) growing = true;
      }

      pulseCircle.setRadius(radius);
      pulseCircle.setStyle({ fillOpacity: opacity });
    }, 50);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      let displayName = 'Your current location';
      if (data.address) {
        const addr = data.address;
        displayName = [
          addr.road,
          addr.neighbourhood,
          addr.suburb,
          addr.city_district,
          addr.city
        ].filter(Boolean).join(', ');
      }
      
      return displayName;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Your current location';
    }
  };

  const checkEligibility = (coords) => {
    if (!window.L || !kmlLayer.current) return;
    const point = window.L.latLng(coords.lat, coords.lng);
    let eligible = false;

    kmlLayer.current.eachLayer((layer) => {
      if (layer.getBounds && layer.getBounds().contains(point)) {
        eligible = true;
      }
    });

    setIsEligible(eligible);
    setIsLoading(false);
  };

  const centerOnUserLocation = () => {
    if (!mapInstance.current || !navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    clearTimeout(locationTimeoutRef.current);
    clearInterval(pulseIntervalRef.current);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        setUserLocation(userCoords);
        setLocationError(null);
        
        mapInstance.current.setView([userCoords.lat, userCoords.lng], 18);
        
        accuracyCircleRef.current = window.L.circle([userCoords.lat, userCoords.lng], {
          radius: userCoords.accuracy,
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.2,
          weight: 1
        }).addTo(mapInstance.current);

        createPulseEffect([userCoords.lat, userCoords.lng]);

        const displayName = await getAddressFromCoordinates(userCoords.lat, userCoords.lng);
        setAddress(displayName);
        setWhatsappForm(prev => ({
          ...prev,
          location: displayName
        }));

        setIsLoading(true);
        setShowEligibilityPanel(true);

        locationTimeoutRef.current = setTimeout(() => {
          checkEligibility(userCoords);
          setIsLocating(false);
        }, 1500);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    
    // Format phone number by removing any non-digit characters
    const formattedPhone = whatsappForm.phone.replace(/\D/g, '');
    
    // Construct the WhatsApp message
    const message = `Hello! I'm interested in your WiFi services.%0A%0A` +
                   `*Name:* ${whatsappForm.fullName}%0A` +
                   `*Phone:* ${whatsappForm.phone}%0A` +
                   `*Email:* ${whatsappForm.email}%0A` +
                   `*Location:* ${whatsappForm.location}%0A%0A` +
                   `I'm ready to connect!`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    
    // Reset the form
    setWhatsappForm({
      show: false,
      fullName: '',
      phone: '',
      email: '',
      location: address
    });
  };

  const handleConnectClick = () => {
    if (isEligible) {
      // Redirect to WiFi plans page instead of showing WhatsApp form
      navigate('/wifiplans');
    } else {
      alert("Our services aren't available in your area yet. Please check back later!");
    }
  };

  return (
    <motion.div
      className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 px-6 z-20 relative">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Our Coverage Area</h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-72px)]">
        {/* Map Section */}
        <div className="w-full lg:w-2/3 h-full relative">
          <main ref={mapRef} className="absolute inset-0 z-10" />
          
          {mapReady && (
            <MapControls
              map={mapInstance.current}
              showLegend={showLegend}
              setShowLegend={setShowLegend}
              kmlVisible={kmlVisible}
              toggleKmlVisibility={toggleKmlVisibility}
              centerOnUserLocation={centerOnUserLocation}
              userLocation={userLocation}
              locationError={locationError}
              isLocating={isLocating}
            />
          )}
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/3 bg-white border-l border-gray-200 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Coverage in Knoxville</h2>
            <p className="text-gray-600 mb-4">
              We're constantly expanding our network. Check if your area is covered or view our current coverage areas below.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Check Your Address</h3>
              <button 
                onClick={() => setShowEligibilityPanel(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800">Areas We Cover</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {coveredAreas.map((area, index) => (
                <div key={index} className="flex items-center bg-gray-50 rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-3 text-gray-800">Legend</h3>
            <MapLegend />
          </div>
        </div>
      </div>

      {/* Eligibility Panel */}
      <AnimatePresence>
        {showEligibilityPanel && (
          <CoverageEligibilityPanel
            address={address}
            isEligible={isEligible}
            isLoading={isLoading}
            onClose={() => setShowEligibilityPanel(false)}
            onConnect={handleConnectClick}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Form Modal */}
      {whatsappForm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Get Connected</h3>
              <button 
                onClick={() => setWhatsappForm({...whatsappForm, show: false})}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleWhatsappSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={whatsappForm.fullName}
                    onChange={(e) => setWhatsappForm({...whatsappForm, fullName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={whatsappForm.phone}
                    onChange={(e) => setWhatsappForm({...whatsappForm, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={whatsappForm.email}
                    onChange={(e) => setWhatsappForm({...whatsappForm, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={whatsappForm.location}
                    onChange={(e) => setWhatsappForm({...whatsappForm, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setWhatsappForm({...whatsappForm, show: false})}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.062c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m4 0c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m2.005 9.644c-.366-.01-1.422-.361-2.053-.616l-.086-.035c-.487-.199-1.153-.473-1.623-.762-.543-.333-.915-.669-1.279-1.141-.432-.561-.757-1.236-.964-1.821l-.013-.034c-.309-.84-.175-1.579.024-2.192l.013-.034c.099-.24.26-.624.26-.624s-.159-.397-.198-.606c-.04-.209-.05-.359-.099-.568-.05-.208-.248-.52-.446-.669-.198-.149-.471-.258-.97-.258-.322 0-.644.025-.966.074-.309.05-.619.124-.929.198-.396.099-1.108.347-1.564.644-.447.297-.828.694-1.04 1.141-.223.471-.347 1.033-.347 1.702 0 .669.124 1.379.471 2.118l.013.034c.396.941 1.104 2.06 1.806 2.809.744.793 1.678 1.416 2.488 1.821l.074.037c.669.322 1.847.793 2.379.941.396.112.828.174 1.213.174.57 0 1.074-.062 1.49-.211.446-.16.832-.471 1.104-.941.272-.471.347-1.033.248-1.604-.074-.458-.322-.907-.644-1.191a1.49 1.49 0 00-.793-.347c-.124-.025-.223-.033-.322-.033" />
                  </svg>
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CoverageMap;