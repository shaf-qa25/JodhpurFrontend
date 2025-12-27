import { useState } from "react"
import { useIncidents } from "../context/IncidentContext"
import AdminActionModal from "./AdminActionModal"
import { SearchX, MapPin, AlertCircle, Loader2, UserCheck } from "lucide-react"

export default function IncidentTable() {
  const { 
    incidents, 
    updateIncident, 
    searchQuery, 
    searchType, // 👈 Context se aa raha hai
    setSelectedIncident: setGlobalIncident, 
    selectedIncident: globalIncident 
  } = useIncidents()
  
  const [modalIncident, setModalIncident] = useState(null)

  // Search highlighting logic
  const highlightText = (text, query) => {
    if (!text || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded font-bold">{part}</mark> 
        : part
    );
  };

  // 🔍 Pure Filter Logic (Header ki state ke basis pe)
  const filteredIncidents = incidents.filter((incident) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return incident.status !== "Resolved";

    let matches = false;
    // Header mein jo selected hai wahi search hoga
    if (searchType === "location") matches = incident.location.toLowerCase().includes(query);
    else if (searchType === "department") matches = incident.department.toLowerCase().includes(query);
    else if (searchType === "caller") matches = incident.caller.toLowerCase().includes(query);
    else if (searchType === "id") matches = incident.id.toString().includes(query);

    return matches && incident.status !== "Resolved"
  })

  const getSeverityColor = (severity) => {
    const colors = {
      NEW: "bg-red-100 text-red-700 border border-red-300 shadow-[0_0_10px_rgba(239,68,68,0.05)]",
      ACTIVE: "bg-blue-100 text-blue-700 border border-blue-300", 
      MEDIUM: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    }
    return colors[severity] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
          Live Incident Feed 
        </h2>
        {searchQuery && (
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black border border-blue-100">
            FILTERING {searchType.toUpperCase()}: "{searchQuery}"
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        {filteredIncidents.length > 0 ? (
          <table className="w-full">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Caller</th>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Severity</th>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Assigned</th>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Location</th>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Status</th>
                <th className="text-right py-3 px-4 font-bold text-gray-600 uppercase text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident) => {
                const Icon = incident.icon
                const isActive = globalIncident?.id === incident.id
                const currentSeverity = (incident.status !== "Pending" && incident.severity === "NEW") ? "ACTIVE" : incident.severity;

                return (
                  <tr 
                    key={incident.id} 
                    onClick={() => setGlobalIncident(incident)} 
                    className={`border-b border-gray-100 transition-all cursor-pointer group ${
                      isActive ? 'bg-blue-50/80 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-50 ' + incident.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                           <p className="font-bold text-sm text-gray-900 leading-none">
                             {highlightText(incident.caller, searchQuery)}
                           </p>
                           <p className="text-[10px] text-gray-400 mt-1 font-mono uppercase font-bold tracking-tighter">
                            {incident.department} • #{incident.id}
                           </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${getSeverityColor(currentSeverity)}`}>
                        {currentSeverity}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold ${incident.assignedOfficer ? 'text-slate-900' : 'text-gray-400 italic'}`}>
                        {incident.assignedOfficer || "Unassigned"}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-medium text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {highlightText(incident.location, searchQuery)}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[11px] font-bold uppercase text-slate-700">{incident.status}</span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setModalIncident(incident); }}
                        className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-all uppercase"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <SearchX className="w-12 h-12 mb-2 opacity-20" />
            <p className="font-bold text-lg text-slate-400">Arre bhai, yahan kuch nahi mila!</p>
          </div>
        )}
      </div>

      {modalIncident && (
        <AdminActionModal
          incident={modalIncident}
          onClose={() => setModalIncident(null)}
          onUpdate={(data) => {
            updateIncident(modalIncident.id, data)
            setModalIncident(null)
          }}
        />
      )}
    </div>
  )
}