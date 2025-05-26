import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample coverage data (replace with your actual GeoJSON data)
const coverageData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Central Business District",
        status: "covered",
        speed: "1.2 Gbps",
        population: "45,000",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            /* Array of coordinate arrays */
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Northern Expansion Zone",
        status: "planned",
        eta: "Q4 2024",
        potentialCustomers: "12,000",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            /* Array of coordinate arrays */
          ],
        ],
      },
    },
  ],
};

const getStyle = (feature) => {
  switch (feature.properties.status) {
    case "covered":
      return { color: "#2563eb", weight: 2, fillOpacity: 0.4 };
    case "planned":
      return {
        color: "#16a34a",
        weight: 2,
        fillOpacity: 0.3,
        dashArray: "5, 5",
      };
    default:
      return { color: "#666", weight: 1 };
  }
};

const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold">${feature.properties.name}</h3>
        ${
          feature.properties.status === "covered"
            ? `
          <p>📶 Speed: ${feature.properties.speed}</p>
          <p>👥 Served Population: ${feature.properties.population}</p>
        `
            : `
          <p>🛠 Planned Expansion</p>
          <p>⏳ ETA: ${feature.properties.eta}</p>
          <p>🎯 Potential Customers: ${feature.properties.potentialCustomers}</p>
        `
        }
      </div>
    `;
    layer.bindPopup(popupContent);

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 4 });
        e.target.openPopup();
      },
      mouseout: (e) => {
        e.target.setStyle(getStyle(feature));
        e.target.closePopup();
      },
    });
  }
};

const MapLegend = () => {
  const map = useMap();

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "bg-white p-4 rounded-lg shadow-lg");
    div.innerHTML = `
      <h4 class="font-bold mb-2">Network Coverage</h4>
      <div class="flex items-center mb-2">
        <div class="w-4 h-4 bg-blue-600/40 mr-2"></div>
        <span>Active Coverage</span>
      </div>
      <div class="flex items-center mb-2">
        <div class="w-4 h-4 bg-green-600/30 mr-2 border-dashed border-2 border-green-600"></div>
        <span>Planned Expansion</span>
      </div>
    `;
    return div;
  };

  legend.addTo(map);

  return null;
};

const CoverageLayers = () => (
  <LayersControl position="topright">
    <LayersControl.BaseLayer checked name="Standard Map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </LayersControl.BaseLayer>

    <LayersControl.Overlay checked name="Network Coverage">
      <GeoJSON
        data={coverageData}
        style={getStyle}
        onEachFeature={onEachFeature}
      />
    </LayersControl.Overlay>
  </LayersControl>
);

export default function CoverageMap() {
  const center = useMemo(() => [-3.8615321, 39.6332887], []);

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <CoverageLayers />
        <MapLegend />
      </MapContainer>

      <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Network Coverage Analytics</h2>
        <div className="flex gap-4">
          <div className="pr-4 border-r border-gray-200">
            <p className="text-sm text-gray-600">Total Coverage Area</p>
            <p className="text-2xl font-bold">142 km²</p>
          </div>
          <div className="pr-4 border-r border-gray-200">
            <p className="text-sm text-gray-600">Planned Expansion</p>
            <p className="text-2xl font-bold">58 km²</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Households Covered</p>
            <p className="text-2xl font-bold">45,230</p>
          </div>
        </div>
      </div>
    </div>
  );
}
