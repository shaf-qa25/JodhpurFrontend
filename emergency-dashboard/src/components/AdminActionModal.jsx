import { X, Shield, Truck, User, FileText, Send } from "lucide-react";
import { useState } from "react";

export default function AdminActionModal({ incident, onClose, onUpdate }) {
  const [status, setStatus] = useState(incident.status);
  const [officer, setOfficer] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ 
      status, 
      assignedOfficer: officer, 
      assignedUnit: unit,
      adminNotes: notes,
      dispatchedAt: new Date().toLocaleTimeString() 
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase">Dispatch Unit</h2>
            <p className="text-[10px] text-slate-400 font-mono">INCIDENT ID: #{incident.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Status Selection */}
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block tracking-widest">Update Status</label>
            <div className="grid grid-cols-3 gap-2">
              {["Pending", "Dispatched", "Resolved"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
                    status === s 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Officer & Unit Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Assign Officer</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Insp. Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  value={officer}
                  onChange={(e) => setOfficer(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Vehicle/Unit</label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. PCR-45"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Dispatch Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
              <textarea 
                rows="3"
                placeholder="Special instructions for the team..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98]"
          >
            <Send className="w-4 h-4" /> Confirm Dispatch
          </button>
        </form>
      </div>
    </div>
  );
}