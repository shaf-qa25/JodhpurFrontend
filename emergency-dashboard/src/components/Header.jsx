import { Search, ChevronDown, Bell, User, LayoutDashboard, Zap } from "lucide-react";
import { useIncidents } from "../context/IncidentContext";

export default function Header() {
  const { searchQuery, setSearchQuery, searchType, setSearchType, stats } = useIncidents();

  return (
    <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-3 flex items-center justify-between shadow-sm">
      
      {/* 🚀 Logo & Brand Section */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/10">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">RAPID<span className="text-blue-600">RESPONSE</span></h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">Control Center</p>
          </div>
        </div>

        {/* 🔍 Global Smart Search */}
        <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-300 w-[450px]">
          <div className="relative group">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none bg-transparent pl-4 pr-9 py-2 text-[11px] font-black uppercase tracking-wider text-slate-500 outline-none cursor-pointer relative z-10"
            >
              <option value="location">Location</option>
              <option value="department">Department</option>
              <option value="caller">Caller</option>
              <option value="id">ID</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-blue-500 transition-colors" />
          </div>

          <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>

          <div className="flex items-center flex-1 px-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Quick search by ${searchType}...`}
              className="bg-transparent border-none outline-none ml-2 text-sm w-full font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* 🔔 System Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Status Indicators (Live Stats) */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
           <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{stats.pending} Pending</span>
           </div>
           <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{stats.dispatched} Live</span>
           </div>
        </div>

        <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="w-[1px] h-8 bg-slate-200 mx-1"></div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors">Admin Chief</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Noida Sector 1</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}