// import { Shield, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
// import { useIncidents } from "../context/IncidentContext";

// export default function StatsGrid() {
//   const { stats, loading } = useIncidents();

//   const calculateRate = (value) => {
//     return stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;
//   };

//   const pendingRate = calculateRate(stats.pending);
//   const dispatchedRate = calculateRate(stats.dispatched);
//   const resolvedRate = calculateRate(stats.resolved);

//   const cards = [
//     {
//       title: "Total Incidents",
//       value: stats.total,
//       icon: Shield,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       barColor: "bg-blue-600",
//       percent: 100,
//       label: "System Wide",
//       trend: "Live Feed"
//     },
//     {
//       title: "Pending Calls",
//       value: stats.pending,
//       icon: AlertTriangle,
//       color: "text-red-600",
//       bg: "bg-red-50",
//       barColor: "bg-red-500",
//       percent: pendingRate,
//       label: "Critical Action",
//       trend: `${pendingRate}% Volume`
//     },
//     {
//       title: "Active Dispatch",
//       value: stats.dispatched,
//       icon: Clock,
//       color: "text-amber-600",
//       bg: "bg-amber-50",
//       barColor: "bg-amber-500",
//       percent: dispatchedRate,
//       label: "In Field",
//       trend: "En-route"
//     },
//     {
//       title: "Cases Resolved",
//       value: stats.resolved,
//       icon: CheckCircle,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//       barColor: "bg-emerald-500",
//       percent: resolvedRate,
//       label: "Efficiency",
//       trend: "Completed"
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-2">
//       {cards.map((card, index) => (
//         <div 
//           key={index} 
//           className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden ${loading ? 'opacity-60 pointer-events-none' : ''}`}
//         >
//           {/* Subtle Background Pattern */}
//           <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
//             <card.icon className="w-24 h-24" />
//           </div>

//           <div className="flex justify-between items-start mb-6 relative z-10">
//             <div className={`p-3 rounded-xl ${card.bg} ${card.color} shadow-inner`}>
//               <card.icon className="w-6 h-6" />
//             </div>
//             <div className="flex flex-col items-end">
//                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
//                 {card.label}
//               </span>
//               <div className={`flex items-center gap-1 mt-1 ${card.color}`}>
//                 <TrendingUp className="w-3 h-3" />
//                 <span className="text-[10px] font-bold">{card.trend}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="relative z-10">
//             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
//               {loading ? "..." : card.value}
//             </h3>
//             <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
//               {card.title}
//             </p>
//           </div>

//           {/* Progress Bar Section */}
//           <div className="mt-6 relative z-10">
//             <div className="flex justify-between text-[10px] font-black mb-2">
//               <span className="text-slate-400 uppercase tracking-widest">Resource Load</span>
//               <span className={card.color}>{card.percent}%</span>
//             </div>
//             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
//               <div 
//                 className={`h-full ${card.barColor} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
//                 style={{ width: `${card.percent}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



import { Shield, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { useIncidents } from "../context/IncidentContext";

export default function StatsGrid() {
  const { stats, loading } = useIncidents();

  const calculateRate = (value) => {
    return stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;
  };

  const cards = [
    {
      title: "Total Incidents",
      value: stats.total,
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50",
      barColor: "bg-blue-600",
      percent: 100,
      label: "TOTAL",
      trend: "Live"
    },
    {
      title: "Pending Calls",
      value: stats.pending,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      barColor: "bg-red-500",
      percent: calculateRate(stats.pending),
      label: "CRITICAL",
      trend: "Waiting"
    },
    {
      title: "Active Dispatch",
      value: stats.dispatched,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      barColor: "bg-amber-500",
      percent: calculateRate(stats.dispatched),
      label: "DEPLOYED",
      trend: "En-route"
    },
    {
      title: "Cases Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      barColor: "bg-emerald-500",
      percent: calculateRate(stats.resolved),
      label: "SUCCESS",
      trend: "Completed"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6 !px-8 !py-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`bg-white !p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden ${loading ? 'opacity-60' : ''}`}
        >
          <div className="flex justify-between items-start !mb-4 relative z-10">
            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</span>
              <div className={`flex items-center justify-end gap-1 mt-0.5 ${card.color}`}>
                <span className="text-[10px] font-bold uppercase">{card.trend}</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-black text-slate-900 leading-none">
              {loading ? "--" : card.value}
            </h3>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide">
              {card.title}
            </p>
          </div>

          <div className="mt-6 relative z-10">
            <div className="flex justify-between text-[10px] font-black mb-2 uppercase text-slate-400">
              <span>Load</span>
              <span className={card.color}>{card.percent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
              <div 
                className={`h-full ${card.barColor} transition-all duration-700`}
                style={{ width: `${card.percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}