// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useIncidents } from "../context/IncidentContext";
// import { useEffect } from 'react';

// // Marker icon fix (Leaflet default icons React mein kabhi kabhi gayab ho jate hain)
// const customIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // Component to auto-move map when incident is selected
// function RecenterMap({ coords }) {
//   const map = useMap();
//   useEffect(() => {
//     if (coords) map.setView(coords, 15, { animate: true });
//   }, [coords, map]);
//   return null;
// }

// export default function LiveMap() {
//   const { selectedIncident } = useIncidents();

//   // Mapping locations to real coordinates (Dummy for now)
//   const locationCoords = {
//     "Sector 18 Noida": [28.5677, 77.3213],
//     "MG Road": [28.4792, 77.0801],
//     "Civil Lines": [28.6814, 77.2229],
//     "Lajpat Nagar": [28.5677, 77.2433],
//     "Connagut Place": [28.6315, 77.2167],
//     "Fire Station": [28.6139, 77.2090]
//   };

//   const defaultPos = [28.6139, 77.2090]; // Delhi Center
//   const currentPos = selectedIncident ? locationCoords[selectedIncident.location] : defaultPos;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[400px] relative">
//       <div className="absolute top-3 left-12 z-[1000] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-gray-200">
//         <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
//           {selectedIncident ? `Tracking: ${selectedIncident.location}` : "City Overview"}
//         </span>
//       </div>

//       <MapContainer 
//         center={defaultPos} 
//         zoom={12} 
//         scrollWheelZoom={true}
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
        
//         {/* Saare incidents ke markers dikhane ke liye */}
//         {Object.entries(locationCoords).map(([name, pos], idx) => (
//           <Marker key={idx} position={pos} icon={customIcon}>
//             <Popup>
//               <div className="font-bold text-xs">{name}</div>
//             </Popup>
//           </Marker>
//         ))}

//         {/* Selected Incident focus logic */}
//         {currentPos && <RecenterMap coords={currentPos} />}
//       </MapContainer>
//     </div>
//   );
// }




import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useIncidents } from "../context/IncidentContext";
import { useEffect, useState } from 'react';

// Custom Marker Setup
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Map Recenter Logic
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords[0] !== 0) {
      map.flyTo(coords, 14, { animate: true, duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

export default function LiveMap() {
  const { incidents, selectedIncident } = useIncidents();
  const [geoCoords, setGeoCoords] = useState({}); // Address-to-Lat/Lng cache

  // 🌍 Address ko Coordinates mein badalne ka logic (Tilak Nagar case)
  const getCoordsFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (err) {
      console.error("Geocoding failed:", address);
    }
    return null;
  };

  useEffect(() => {
    const processLocations = async () => {
      const newGeo = { ...geoCoords };
      let updated = false;

      for (const inc of incidents) {
        // Agar Lat/Lng backend se NAHI aaya, tabhi address search karo
        if ((!inc.pos || inc.pos[0] === 0) && inc.location && !newGeo[inc.location]) {
          const fetched = await getCoordsFromAddress(inc.location);
          if (fetched) {
            newGeo[inc.location] = fetched;
            updated = true;
          }
          await new Promise(r => setTimeout(r, 500)); // Rate limiting API
        }
      }
      if (updated) setGeoCoords(newGeo);
    };

    if (incidents.length > 0) processLocations();
  }, [incidents]);

  // 🎯 Focus Logic: Pehle Selected, fir Latest Incident, fir Default
  const getActivePos = (inc) => {
    if (!inc) return null;
    if (inc.pos && inc.pos[0] !== 0) return inc.pos; // Agar Lat/Lng hai
    return geoCoords[inc.location]; // Agar sirf address hai
  };

  const defaultPos = [28.6139, 77.2090]; // Delhi/Noida Center
  const focusPos = getActivePos(selectedIncident) || getActivePos(incidents[0]) || defaultPos;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-full relative group">
      {/* Strategic Header Overlay */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
              {selectedIncident ? `Tracking: ${selectedIncident.type}` : "Global Intelligence Feed"}
            </span>
          </div>
        </div>
      </div>

      <MapContainer 
        center={defaultPos} 
        zoom={11} 
        className="h-full w-full grayscale-[0.3] contrast-[1.2]"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {incidents.map((inc) => {
          const position = (inc.pos && inc.pos[0] !== 0) ? inc.pos : geoCoords[inc.location];
          
          if (!position) return null;

          return (
            <Marker key={inc.id} position={position} icon={customIcon}>
              <Popup>
                <div className="p-2 min-w-[150px]">
                  <p className="font-black text-slate-900 text-xs uppercase mb-1">{inc.type}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mb-2">{inc.desc}</p>
                  <div className={`text-[9px] font-black uppercase px-2 py-1 rounded inline-block ${inc.status === 'PENDING' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {inc.status}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <RecenterMap coords={focusPos} />
      </MapContainer>
    </div>
  );
}