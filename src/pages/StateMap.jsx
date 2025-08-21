// src/components/StateMap.jsx
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

function ViewportWatcher({ onBoundsChange }) {
  useMapEvents({
    moveend: (e) => {
      const bounds = e.target.getBounds();
      onBoundsChange(bounds);
    },
  });
  return null;
}

export default function StateMap({ markers, onBoundsChange }) {
  const navigate = useNavigate();
  const center = markers.length ? [markers[0].lat, markers[0].lng] : [9.0820, 8.6753];

  return (
    <MapContainer center={center} zoom={7} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ViewportWatcher onBoundsChange={onBoundsChange} />
      {markers.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          eventHandlers={{ click: () => navigate(`/business/${item.id}`) }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{item.title}</h3>
              <button
                onClick={() => navigate(`/business/${item.id}`)}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
