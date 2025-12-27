import { Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useIncidents } from "../context/IncidentContext";

export default function StatsGrid() {
  const { stats } = useIncidents();

  // Percentage calculation for progress bars
  const pendingRate = Math.round((stats.pending / stats.total) * 100) || 0;
  const dispatchedRate = Math.round((stats.dispatched / stats.total) * 100) || 0;
  const resolvedRate = Math.round((stats.resolved / stats.total) * 100) || 0;

  const cards = [
    {
      title: "Total Incidents",
      value: stats.total,
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50",
      barColor: "bg-blue-500",
      percent: 100,
      label: "All reports"
    },
    {
      title: "Pending Calls",
      value: stats.pending,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      barColor: "bg-red-500",
      percent: pendingRate,
      label: `${pendingRate}% critical`
    },
    {
      title: "Active Dispatch",
      value: stats.dispatched,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      barColor: "bg-yellow-500",
      percent: dispatchedRate,
      label: "En-route"
    },
    {
      title: "Cases Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      barColor: "bg-green-500",
      percent: resolvedRate,
      label: "Completed"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-lg ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {card.label}
            </span>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-none">
              {card.value}
            </h3>
            <p className="text-xs font-bold text-gray-500 mt-1 uppercase">
              {card.title}
            </p>
          </div>

          {/* 📊 Mini Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-bold mb-1">
              <span className="text-gray-400 uppercase">Load</span>
              <span className={card.color}>{card.percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${card.barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${card.percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}