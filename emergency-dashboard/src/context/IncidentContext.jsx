import { Droplet, Flame, Phone, Plus } from "lucide-react";
import { createContext, useContext, useState, useMemo } from "react";

const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [searchType, setSearchType] = useState("location"); // default location
  // 🪵 Session Logs (Backend pe 0 load, sirf local memory)
  const [logs, setLogs] = useState([]);

  const [incidents, setIncidents] = useState([
    { id: 101, caller: "Amit S. (98xxxxx)", type: "Police", location: "Sector 18 Noida", severity: "NEW", status: "Pending", icon: Phone, iconColor: "text-blue-600", department: "police" },
    { id: 102, caller: "Rajesh K.", type: "Police", location: "MG Road", severity: "NEW", status: "Pending", icon: Phone, iconColor: "text-blue-600", department: "police" },
    { id: 103, caller: "Medical", type: "Medical", location: "Civil Lines", severity: "NEW", status: "Pending", icon: Plus, iconColor: "text-red-600", department: "medical" },
    { id: 104, caller: "Priya K. (91xxxxx)", type: "Medical", location: "Lajpat Nagar", severity: "MEDIUM", status: "Dispatched", icon: Plus, iconColor: "text-red-600", department: "medical" },
    { id: 105, caller: "Fire Call", type: "Fire", location: "Lajpat Nagar", severity: "MEDIUM", status: "Dispatched", icon: Flame, iconColor: "text-orange-600", department: "fire" },
    { id: 106, caller: "Water Emergency", type: "Fire", location: "Connagut Place", severity: "RESOLVED", status: "Resolved", icon: Droplet, iconColor: "text-cyan-600", department: "fire" },
    { id: 107, caller: "Fire Dept", type: "Fire", location: "Fire Station", severity: "RESOLVED", status: "Resolved", icon: Flame, iconColor: "text-orange-600", department: "fire" },
  ]);

  // Activity Log Helper
  const addLog = (msg) => {
    const newLog = {
      id: Date.now(),
      message: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev].slice(0, 5)); // Sirf latest 5 dikhayenge
  };

  const updateIncident = (id, updatedData) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, ...updatedData } : inc))
    );

    // Sync selected incident on map
    if (selectedIncident?.id === id) {
      setSelectedIncident(prev => ({ ...prev, ...updatedData }));
    }

    // 🪵 Log the activity (Frontend only)
    const logMsg = updatedData.assignedOfficer 
      ? `Unit ${updatedData.assignedUnit} assigned to #${id}`
      : `Incident #${id} status updated to ${updatedData.status}`;
    addLog(logMsg);
  };

  const stats = useMemo(() => ({
    total: incidents.length,
    pending: incidents.filter((i) => i.status === "Pending").length,
    dispatched: incidents.filter((i) => i.status === "Dispatched").length,
    resolved: incidents.filter((i) => i.status === "Resolved").length,
  }), [incidents]);

  return (
    <IncidentContext.Provider 
      value={{ 
        incidents, 
        updateIncident, 
        stats, 
        searchQuery, 
        setSearchQuery,
        selectedIncident,
        setSelectedIncident,
        logs ,// ✅ Exported for Sidebar/Home
        searchType,     // ✅ Ye add kar
        setSearchType,
      }}

    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentContext);