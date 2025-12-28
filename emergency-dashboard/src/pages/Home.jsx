// import StatsGrid from "../components/StatsGrid";
// import IncidentTable from "../components/IncidentTable";
// import LiveMap from "../components/LiveMap";
// import ActivitySidebar from "../components/ActivitySidebar";
// import { useIncidents } from "../context/IncidentContext";

// export default function Home() {
//   const { incidents, loading } = useIncidents();
//   const alertIncidents = incidents.filter(inc => inc.status === "PENDING");

//   return (
//     <div className="space-y-4 pb-8 bg-[#f8fafc] min-h-screen">
      
//       {/* 🔴 Ultra-Sleek Black & Red Ticker (Exact 16px height vibe) */}
//       {!loading && alertIncidents.length > 0 && (
//         <div className="bg-black text-white h-7 flex items-center overflow-hidden border-b border-red-600/50 relative z-[1000]">
//           {/* Static Label (Fixed) */}
//           <div className="bg-red-600 h-full px-3 flex items-center z-20 shadow-[5px_0_15px_rgba(0,0,0,0.3)]">
//             <span className="text-[10px] font-black tracking-tighter uppercase italic">Live_Feed</span>
//           </div>

//           {/* Moving Content (Horizontal List) */}
//           <div className="flex animate-marquee items-center">
//             {[...alertIncidents, ...alertIncidents].map((inc, index) => (
//               <div key={`${inc.id}-${index}`} className="flex items-center whitespace-nowrap px-8 border-r border-white/10">
//                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-3"></span>
//                 <p className="text-[11px] font-bold uppercase tracking-wider">
//                   <span className="text-red-500 mr-2">[{inc.type}]</span>
//                   <span className="text-slate-200">{inc.desc}</span>
//                   <span className="ml-3 text-[9px] font-mono text-slate-500">ID:{inc.id.toString().slice(-4)}</span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Stats Overview */}
//       <div className="px-4 mt-2">
//         <StatsGrid />
//       </div>

//       {/* Main Content Area */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-8 items-start mt-4">
        
//         {/* LEFT COLUMN: Table */}
//         <div className="lg:col-span-8 w-full">
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
//             <IncidentTable />
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Intel & Logs */}
//         <div className="lg:col-span-4 w-full space-y-6 sticky top-24">
//           <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/60 group">
//             <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
//                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Satellite Intel</span>
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//             </div>
//             <div className="h-[350px]">
//                <LiveMap />
//             </div>
//           </div>

//           <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/60">
//             <ActivitySidebar />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



import StatsGrid from "../components/StatsGrid";
import IncidentTable from "../components/IncidentTable";
import LiveMap from "../components/LiveMap";
import ActivitySidebar from "../components/ActivitySidebar";
import { useIncidents } from "../context/IncidentContext";

export default function Home() {
  const { incidents, loading } = useIncidents();

  // Status check dono case ke liye (Caps/Small)
  const alertIncidents = incidents.filter(inc => 
    inc.status?.toUpperCase() === "PENDING"
  );

  return (
    <div className="space-y-4 pb-8 bg-[#f8fafc] min-h-screen">
      
      {/* 🔴 Horizontal News Ticker (16px - 20px Height) */}
      {/* {!loading && alertIncidents.length > 0 && (
        <div className="bg-black text-white h-[32px] flex items-center overflow-hidden border-b border-red-600 relative z-[1000] shadow-lg">
          
          <div className="bg-red-600 h-full px-3 flex items-center z-30 shrink-0 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
            <span className="text-[10px] font-black tracking-tighter uppercase italic leading-none">
              BREAKING
            </span>
          </div>

          <div className="relative flex items-center overflow-hidden w-full h-full">
            <div className="flex animate-marquee whitespace-nowrap items-center py-1">
              {[...alertIncidents, ...alertIncidents, ...alertIncidents].map((inc, index) => (
                <div key={`${inc.id}-${index}`} className="flex items-center px-10">
                  <span className="w-2 h-2 rounded-full bg-red-600 mr-4 shadow-[0_0_8px_red]"></span>
                  
                  <p className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
                    <span className="text-red-500">[ {inc.type || "ALERT"} ]</span>
                    <span className="text-slate-100">{inc.desc || inc.location}</span>
                    <span className="text-slate-500 font-mono text-[9px] bg-white/5 px-2 rounded border border-white/10">
                      ID:{ (inc._id || inc.id).toString().slice(-4) }
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Stats Overview */}
      <div className="px-4 mt-2">
        <StatsGrid />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-8 items-start mt-2 text-sm">
        <div className="lg:col-span-8 w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <IncidentTable />
          </div>
        </div>

        <div className="lg:col-span-4 w-full space-y-6 sticky top-24">
          <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/60 group">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center font-black text-[9px] text-slate-400 uppercase tracking-widest">
                <span>Satellite Intel</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="h-[350px]">
               <LiveMap />
            </div>
          </div>
          <ActivitySidebar />
        </div>
      </div>
    </div>
  );
}