// import { Droplet, Flame, Phone, Plus } from "lucide-react";
// import { createContext, useContext, useState, useMemo } from "react";

// const IncidentContext = createContext();

// export const IncidentProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedIncident, setSelectedIncident] = useState(null);
//   const [searchType, setSearchType] = useState("location"); // default location
//   // 🪵 Session Logs (Backend pe 0 load, sirf local memory)
//   const [logs, setLogs] = useState([]);

//   const [incidents, setIncidents] = useState([
//     { id: 101, caller: "Amit S. (98xxxxx)", type: "Police", location: "Sector 18 Noida", severity: "NEW", status: "Pending", icon: Phone, iconColor: "text-blue-600", department: "police" },
//     { id: 102, caller: "Rajesh K.", type: "Police", location: "MG Road", severity: "NEW", status: "Pending", icon: Phone, iconColor: "text-blue-600", department: "police" },
//     { id: 103, caller: "Medical", type: "Medical", location: "Civil Lines", severity: "NEW", status: "Pending", icon: Plus, iconColor: "text-red-600", department: "medical" },
//     { id: 104, caller: "Priya K. (91xxxxx)", type: "Medical", location: "Lajpat Nagar", severity: "MEDIUM", status: "Dispatched", icon: Plus, iconColor: "text-red-600", department: "medical" },
//     { id: 105, caller: "Fire Call", type: "Fire", location: "Lajpat Nagar", severity: "MEDIUM", status: "Dispatched", icon: Flame, iconColor: "text-orange-600", department: "fire" },
//     { id: 106, caller: "Water Emergency", type: "Fire", location: "Connagut Place", severity: "RESOLVED", status: "Resolved", icon: Droplet, iconColor: "text-cyan-600", department: "fire" },
//     { id: 107, caller: "Fire Dept", type: "Fire", location: "Fire Station", severity: "RESOLVED", status: "Resolved", icon: Flame, iconColor: "text-orange-600", department: "fire" },
//   ]);

//   // Activity Log Helper
//   const addLog = (msg) => {
//     const newLog = {
//       id: Date.now(),
//       message: msg,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setLogs(prev => [newLog, ...prev].slice(0, 5)); // Sirf latest 5 dikhayenge
//   };

//   const updateIncident = (id, updatedData) => {
//     setIncidents((prev) =>
//       prev.map((inc) => (inc.id === id ? { ...inc, ...updatedData } : inc))
//     );

//     // Sync selected incident on map
//     if (selectedIncident?.id === id) {
//       setSelectedIncident(prev => ({ ...prev, ...updatedData }));
//     }

//     // 🪵 Log the activity (Frontend only)
//     const logMsg = updatedData.assignedOfficer 
//       ? `Unit ${updatedData.assignedUnit} assigned to #${id}`
//       : `Incident #${id} status updated to ${updatedData.status}`;
//     addLog(logMsg);
//   };

//   const stats = useMemo(() => ({
//     total: incidents.length,
//     pending: incidents.filter((i) => i.status === "Pending").length,
//     dispatched: incidents.filter((i) => i.status === "Dispatched").length,
//     resolved: incidents.filter((i) => i.status === "Resolved").length,
//   }), [incidents]);

//   return (
//     <IncidentContext.Provider 
//       value={{ 
//         incidents, 
//         updateIncident, 
//         stats, 
//         searchQuery, 
//         setSearchQuery,
//         selectedIncident,
//         setSelectedIncident,
//         logs ,// ✅ Exported for Sidebar/Home
//         searchType,     // ✅ Ye add kar
//         setSearchType,
//       }}

//     >
//       {children}
//     </IncidentContext.Provider>
//   );
// };

// export const useIncidents = () => useContext(IncidentContext);





// import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";

// const IncidentContext = createContext();
// const BASE_URL = "https://safety-system-ikpn.onrender.com/api";

// export const IncidentProvider = ({ children }) => {
//   const [incidents, setIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("description"); // Default search ab description pe
//   const [selectedIncident, setSelectedIncident] = useState(null);
//   const [logs, setLogs] = useState([]);

//   // 📡 Optimized Fetch: Sirf kaam ka data mapping
//   const fetchIncidents = useCallback(async () => {
//     try {
//       if (incidents.length === 0) setLoading(true);
      
//       const response = await axios.get(`${BASE_URL}/incidents`);
      
//       // 🛠️ DATA CLEANING: Sirf kaam ki fields uthao
//       const cleanData = response.data.map(inc => ({
//         id: inc._id,
//         type: inc.type, // e.g., "ACCIDENT"
//         desc: inc.description,
//         people: inc.peopleAffected || 0,
//         // Leaflet ko [lat, lng] array chahiye hota hai
//         pos: inc.coordinates ? [inc.coordinates.lat, inc.coordinates.lng] : [28.6139, 77.2090], 
//         isVerified: inc.isVerified,
//         status: inc.status, // e.g., "PENDING"
//         time: inc.createdAt
//       }));

//       setIncidents(cleanData);
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [incidents.length]);

//   useEffect(() => {
//     fetchIncidents();
//     const interval = setInterval(fetchIncidents, 30000);
//     return () => clearInterval(interval);
//   }, [fetchIncidents]);

//   const addLog = (msg) => {
//     const newLog = {
//       id: Date.now(),
//       message: msg,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setLogs(prev => [newLog, ...prev].slice(0, 8));
//   };

//   const updateIncidentStatus = async (id, status) => {
//     const previousIncidents = [...incidents];

//     // Optimistic Update
//     setIncidents(prev => prev.map(inc => 
//       inc.id === id ? { ...inc, status } : inc
//     ));

//     try {
//       await axios.patch(`${BASE_URL}/incidents/${id}`, { status });
//       addLog(`Status: #${id.slice(-4)} updated to ${status}`);
//     } catch (error) {
//       setIncidents(previousIncidents);
//       console.error("Update Error:", error);
//     }
//   };

//   // 📊 Stats Engine (Updated for Uppercase status from backend)
//   const stats = useMemo(() => ({
//     total: incidents.length,
//     pending: incidents.filter((i) => i.status === "PENDING").length,
//     dispatched: incidents.filter((i) => i.status === "DISPATCHED").length,
//     resolved: incidents.filter((i) => i.status === "RESOLVED").length,
//   }), [incidents]);

//   return (
//     <IncidentContext.Provider 
//       value={{ 
//         incidents, loading, fetchIncidents, updateIncidentStatus,
//         stats, searchQuery, setSearchQuery, searchType, setSearchType,
//         selectedIncident, setSelectedIncident, logs 
//       }}
//     >
//       {children}
//     </IncidentContext.Provider>
//   );
// };

// export const useIncidents = () => useContext(IncidentContext);




import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const IncidentContext = createContext();
const BASE_URL = "https://safety-system-ikpn.onrender.com/api";

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("type"); 
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [logs, setLogs] = useState([]);

  const fetchIncidents = useCallback(async () => {
    try {
      if (incidents.length === 0) setLoading(true);
      
      const response = await axios.get(`${BASE_URL}/incidents`);
      
      const cleanData = response.data.map(inc => ({
        id: inc._id,
        type: inc.type, 
        desc: inc.description,
        people: inc.peopleAffected || 0,
        location: inc.location || "", 
        pos: inc.coordinates ? [inc.coordinates.lat, inc.coordinates.lng] : [0, 0], 
        isVerified: inc.isVerified,
        // 🔥 FIX: Status ko hamesha Uppercase mein convert karo
        status: inc.status ? inc.status.toUpperCase() : "PENDING", 
        time: inc.createdAt
      }));

      setIncidents(cleanData);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [incidents.length]);

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  const addLog = (msg) => {
    const newLog = {
      id: Date.now(),
      message: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev].slice(0, 8));
  };

  const updateIncidentStatus = async (id, status) => {
    const previousIncidents = [...incidents];
    const upperStatus = status.toUpperCase(); // 🔥 Ensure status is uppercase

    // Optimistic UI Update
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: upperStatus } : inc
    ));

    try {
      await axios.patch(`${BASE_URL}/incidents/${id}`, { status: upperStatus });
      addLog(`Unit #${id.slice(-4)} set to ${upperStatus}`);
    } catch (error) {
      setIncidents(previousIncidents);
      console.error("Update Error:", error);
    }
  };

  // 🔥 Stats logic ab 100% match karega kyunki data hamesha uppercase hai
  const stats = useMemo(() => ({
    total: incidents.length,
    pending: incidents.filter((i) => i.status === "PENDING").length,
    dispatched: incidents.filter((i) => i.status === "DISPATCHED").length,
    resolved: incidents.filter((i) => i.status === "RESOLVED").length,
  }), [incidents]);

  return (
    <IncidentContext.Provider 
      value={{ 
        incidents, loading, fetchIncidents, updateIncidentStatus,
        stats, searchQuery, setSearchQuery, searchType, setSearchType,
        selectedIncident, setSelectedIncident, logs 
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentContext);