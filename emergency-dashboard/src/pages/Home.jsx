import StatsGrid from "../components/StatsGrid";
import IncidentTable from "../components/IncidentTable";
import LiveMap from "../components/LiveMap";
import ActivitySidebar from "../components/ActivitySidebar"; // 👈 Naya Sidebar import kiya
import { useIncidents } from "../context/IncidentContext";

export default function Home() {
  const { incidents } = useIncidents();

  return (
    <div className="space-y-6 pb-8">
      {/* 🔴 Emergency Ticker (Breaking News Style) */}
      <div className="bg-slate-900 text-white py-2.5 overflow-hidden whitespace-nowrap border-y border-slate-700 shadow-lg">
        <div className="inline-block animate-marquee whitespace-nowrap">
          {incidents.map((inc) => (
            <span key={inc.id} className="mx-12 text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="text-red-500">ALERT:</span>
              {inc.type} IN {inc.location}
              <span className="text-slate-500 font-mono">[ID: #{inc.id}]</span>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {incidents.map((inc) => (
            <span key={`dup-${inc.id}`} className="mx-12 text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="text-red-500">ALERT:</span>
              {inc.type} IN {inc.location}
              <span className="text-slate-500 font-mono">[ID: #{inc.id}]</span>
            </span>
          ))}
        </div>
      </div>

      <StatsGrid />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 items-start">

        {/* LEFT COLUMN: Table (8 parts out of 12) */}
        <div className="lg:col-span-8 w-full overflow-hidden">
          <IncidentTable />
        </div>

        {/* RIGHT COLUMN: Map & Sidebar (4 parts out of 12) */}
        <div className="lg:col-span-4 w-full space-y-6">
          {/* Map Container - Isko ek height fix de rahe hain taaki sidebar niche hi rahe */}
          <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 min-h-[300px]">
            <LiveMap />
          </div>

          {/* Sidebar Container */}
          <div className="w-full">
            <ActivitySidebar />
          </div>
        </div>

      </div>
    </div>
  );
}