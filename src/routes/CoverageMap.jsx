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
  const locationPulseRef = useRef(null);
  const locationTimeoutRef = useRef(null);
  const pulseIntervalRef = useRef(null);

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(error.message);
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
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

  const startPulseAnimation = (coords) => {
    if (!window.L || !mapInstance.current) return;

    clearInterval(pulseIntervalRef.current);

    locationPulseRef.current = window.L.circle([coords.lat, coords.lng], {
      radius: 30,
      stroke: false,
      fillColor: '#4285F4',
      fillOpacity: 0.7,
      className: 'location-pulse',
    }).addTo(mapInstance.current);

    markerRef.current = window.L.marker([coords.lat, coords.lng], {
      icon: window.L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
      }),
      zIndexOffset: 1000,
    }).addTo(mapInstance.current);

    let radius = 30;
    let opacity = 0.7;
    let growing = true;

    pulseIntervalRef.current = setInterval(() => {
      if (growing) {
        radius += 2;
        opacity -= 0.02;
        if (radius >= 60) growing = false;
      } else {
        radius -= 2;
        opacity += 0.02;
        if (radius <= 30) growing = true;
      }

      locationPulseRef.current.setRadius(radius);
      locationPulseRef.current.setStyle({ fillOpacity: opacity });
    }, 50);
  };

  const centerOnUserLocation = () => {
    if (!mapInstance.current) return;
    setIsLocating(true);
    clearTimeout(locationTimeoutRef.current);
    clearInterval(pulseIntervalRef.current);

    if (markerRef.current) {
      mapInstance.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }

    if (locationPulseRef.current) {
      mapInstance.current.removeLayer(locationPulseRef.current);
      locationPulseRef.current = null;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(userCoords);
          setLocationError(null);
          mapInstance.current.setView([userCoords.lat, userCoords.lng], 16);

          setAddress('Your current location');
          setIsLoading(true);
          setShowEligibilityPanel(true);

          startPulseAnimation(userCoords);

          locationTimeoutRef.current = setTimeout(() => {
            checkEligibility(userCoords);
            setIsLocating(false);
          }, 2000);
        },
        (error) => {
          setLocationError(error.message);
          setIsLocating(false);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
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

  return (
    <motion.div
      className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <main ref={mapRef} className="absolute top-16 md:top-20 bottom-0 left-0 right-0 z-10" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-20 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
      >
        Back to Home
      </button>

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

      {showLegend && <MapLegend onClose={() => setShowLegend(false)} />}

      <AnimatePresence>
        {showEligibilityPanel && (
          <CoverageEligibilityPanel
            address={address}
            isEligible={isEligible}
            isLoading={isLoading}
            onClose={() => setShowEligibilityPanel(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CoverageMap;
