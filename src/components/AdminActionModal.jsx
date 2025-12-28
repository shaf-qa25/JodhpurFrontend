import { X, Shield, Truck, User, FileText, Send, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function AdminActionModal({ incident, onClose, onUpdate }) {
  const incidentId = incident._id || incident.id;
  
  const [status, setStatus] = useState(incident.status);
  const [officer, setOfficer] = useState(incident.assignedOfficer || "");
  const [unit, setUnit] = useState(incident.assignedUnit || "");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ 
      id: incidentId,
      status, 
      assignedOfficer: officer, 
      assignedUnit: unit,
      adminNotes: notes,
      dispatchedAt: new Date().toISOString() 
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4!">
      <div className="bg-white rounded-2xl! shadow-2xl! w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border border-white/20">
        
        {/* Header Section */}
        <div className="bg-slate-900 p-6! text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-4! -top-4! opacity-10!">
            <Shield className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Dispatch Unit</h2>
            <div className="flex items-center gap-2! mt-2!">
               <span className="bg-blue-600 text-[9px] px-2! py-0.5! rounded! font-black tracking-widest uppercase">
                 {incident.type || "General"}
               </span>
               <p className="text-[10px]! text-slate-400 font-mono tracking-tighter">ID: #{incidentId.toString().slice(-8)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full! transition-colors relative z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Indicator Bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6! py-3! flex items-center gap-2!">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          <p className="text-[10px] font-bold text-slate-500 uppercase">Current: <span className="text-slate-900">{incident.status}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="p-6! space-y-5!">
          
          {/* Status Selection */}
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase mb-2! block tracking-widest">Update Operational Status</label>
            <div className="grid grid-cols-3 gap-2">
              {["Pending", "Dispatched", "Resolved"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2! text-[11px] font-bold rounded-xl! border transition-all duration-300 ${
                    status === s 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Officer & Unit Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5!">
              <label className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Assign Officer</label>
              <div className="relative group">
                <User className="absolute left-3! top-1/2! -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Officer Name"
                  className="w-full pl-9! pr-3! py-2.5! bg-slate-50 border border-slate-200 rounded-xl! text-xs focus:ring-4! focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  value={officer}
                  onChange={(e) => setOfficer(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5!">
              <label className="text-[10px]! font-black text-slate-500 uppercase block tracking-widest">Vehicle/Unit</label>
              <div className="relative group">
                <Truck className="absolute left-3! top-1/2! -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Unit ID"
                  className="w-full pl-9! pr-3! py-2.5! bg-slate-50 border border-slate-200 rounded-xl! text-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-1.5!">
            <label className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Dispatch Notes</label>
            <div className="relative group">
              <FileText className="absolute left-3!! top-3! w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <textarea 
                rows="3"
                placeholder="Specific instructions for the responding team..."
                className="w-full pl-9! pr-3! py-2.5! bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none transition-all font-medium"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4! rounded-xl! font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            <Send className="w-4 h-4" /> Finalize & Dispatch
          </button>
        </form>
      </div>
    </div>
  );
}