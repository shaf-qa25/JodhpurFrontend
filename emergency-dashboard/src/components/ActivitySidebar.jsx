import { useIncidents } from "../context/IncidentContext";
import { History, Clock, Zap, ShieldCheck, Send, CheckCircle2 } from "lucide-react";

export default function ActivitySidebar() {
  const { logs } = useIncidents();

  const getLogIcon = (msg) => {
    if (msg.toLowerCase().includes("deployed") || msg.toLowerCase().includes("dispatched")) 
      return <Send className="h-2 w-2 text-blue-500 fill-blue-500" />;
    if (msg.toLowerCase().includes("resolved")) 
      return <CheckCircle2 className="h-2 w-2 text-green-500 fill-green-500" />;
    return <Zap className="h-2 w-2 text-amber-500 fill-amber-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-3">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 uppercase tracking-tight">
          <History className="w-4 h-4 text-blue-600" />
          System Logs
        </h3>
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="text-[9px] font-black text-slate-500 uppercase">Live</span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative flex-1 space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-100 before:via-gray-50 before:to-transparent">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="relative pl-8 group animate-in fade-in slide-in-from-right-2 duration-300">
              {/* Timeline Dot & Icon */}
              <div className="absolute left-0 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white border-2 border-slate-200 group-first:border-blue-500 shadow-sm transition-colors group-hover:border-blue-400">
                {getLogIcon(log.message)}
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">
                    {log.message}
                  </p>
                  <div className="flex items-center gap-1 shrink-0 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-[9px] text-slate-500 font-mono font-medium">{log.time}</span>
                  </div>
                </div>
                
                <div className="mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-500/40" />
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Admin Action</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-100 rotate-12 group-hover:rotate-0 transition-transform">
              <Zap className="w-6 h-6 text-slate-200" />
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">No Activity Yet</p>
            <p className="text-[10px] text-slate-300 mt-1 font-medium">Actions will appear in real-time</p>
          </div>
        )}
      </div>

      {/* Footer info */}
      {logs.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-50 text-center">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 py-1 rounded-lg border border-slate-100">
            Internal Session Logs
          </p>
        </div>
      )}
    </div>
  );
}