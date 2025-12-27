import { useIncidents } from "../context/IncidentContext";
import { History, Clock, Zap, ShieldCheck } from "lucide-react";

export default function ActivitySidebar() {
  // Context se logs nikale
  const { logs } = useIncidents();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-3">
        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" />
          Session Activity
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Live</span>
        </div>
      </div>

      {/* Logs List */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-100 before:via-gray-100 before:to-transparent">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="relative pl-8 group">
              {/* Timeline Icon */}
              <div className="absolute left-0 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white border-2 border-blue-500 group-first:border-blue-600 shadow-sm">
                <Zap className="h-2 w-2 text-blue-500 fill-blue-500" />
              </div>
              
              {/* Log Content */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">
                    {log.message}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-gray-300" />
                    <span className="text-[9px] text-gray-400 font-mono">{log.time}</span>
                  </div>
                </div>
                
                {/* Status Badge inside log */}
                <div className="mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-500/50" />
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">System Verified</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              <History className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-[11px] text-gray-400 italic">Awaiting actions...</p>
            <p className="text-[10px] text-gray-300 mt-1">Updates will be logged here.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {logs.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-center">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            Showing last 5 events
          </p>
        </div>
      )}
    </div>
  );
}