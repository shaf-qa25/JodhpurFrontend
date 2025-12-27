import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useIncidents } from "../context/IncidentContext";
import { useEffect } from 'react';

// Marker icon fix (Leaflet default icons React mein kabhi kabhi gayab ho jate hain)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to auto-move map when incident is selected
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 15, { animate: true });
  }, [coords, map]);
  return null;
}

export default function LiveMap() {
  const { selectedIncident } = useIncidents();

  // Mapping locations to real coordinates (Dummy for now)
  const locationCoords = {
    "Sector 18 Noida": [28.5677, 77.3213],
    "MG Road": [28.4792, 77.0801],
    "Civil Lines": [28.6814, 77.2229],
    "Lajpat Nagar": [28.5677, 77.2433],
    "Connagut Place": [28.6315, 77.2167],
    "Fire Station": [28.6139, 77.2090]
  };

  const defaultPos = [28.6139, 77.2090]; // Delhi Center
  const currentPos = selectedIncident ? locationCoords[selectedIncident.location] : defaultPos;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[400px] relative">
      <div className="absolute top-3 left-12 z-[1000] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-gray-200">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
          {selectedIncident ? `Tracking: ${selectedIncident.location}` : "City Overview"}
        </span>
      </div>

      <MapContainer 
        center={defaultPos} 
        zoom={12} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Saare incidents ke markers dikhane ke liye */}
        {Object.entries(locationCoords).map(([name, pos], idx) => (
          <Marker key={idx} position={pos} icon={customIcon}>
            <Popup>
              <div className="font-bold text-xs">{name}</div>
            </Popup>
          </Marker>
        ))}

        {/* Selected Incident focus logic */}
        {currentPos && <RecenterMap coords={currentPos} />}
      </MapContainer>
    </div>
  );
}