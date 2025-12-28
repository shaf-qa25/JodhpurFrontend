// import { Search, ChevronDown, Bell, User, Zap, LogOut } from "lucide-react";
// import { useIncidents } from "../context/IncidentContext";
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const { searchQuery, setSearchQuery, searchType, setSearchType, stats, loading, fetchIncidents } = useIncidents();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <header className="sticky top-0 z-[1000] bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-2 group cursor-pointer" onClick={fetchIncidents}>
//           <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
//             <Zap className={`w-6 h-6 text-white ${loading ? 'animate-pulse' : ''}`} />
//           </div>
//           <div>
//             <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Sam<span className="text-blue-600">park</span></h1>
//             <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">Control Center</p>
//           </div>
//         </div>

//         {/* Updated Search Bar */}
//         <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 w-[500px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
//           <div className="relative">
//             <select 
//               value={searchType}
//               onChange={(e) => setSearchType(e.target.value)}
//               className="appearance-none bg-transparent pl-4 pr-8 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 outline-none cursor-pointer"
//             >
//               <option value="type">Type</option>
//               <option value="description">Description</option>
//               <option value="location">Location</option>
//               <option value="id">Incident ID</option>
//             </select>
//             <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
//           </div>

//           <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>

//           <div className="flex items-center flex-1 px-3">
//             <Search className="w-5 h-5 text-slate-400" />
//             <input 
//               type="text" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder={`Search by ${searchType}...`}
//               className="bg-transparent border-none outline-none ml-2 text-sm w-full font-semibold text-slate-700 placeholder:text-slate-400"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-6">
//         {/* Stats Section */}
//         <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
//            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
//              <span className={`w-2.5 h-2.5 rounded-full ${stats.pending > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
//              <span className="text-xs font-bold text-slate-700 uppercase">{stats.pending} New</span>
//            </div>
//            <div className="flex items-center gap-2">
//              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
//              <span className="text-xs font-bold text-slate-700 uppercase">{stats.dispatched} Active</span>
//            </div>
//         </div>

//         <button onClick={handleLogout} className="flex items-center gap-2 p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-xs uppercase">
//           <LogOut className="w-5 h-5" />
//           <span>Exit</span>
//         </button>
//       </div>
//     </header>
//   );
// }



import { Search, ChevronDown, Bell, User, Zap, LogOut } from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { searchQuery, setSearchQuery, searchType, setSearchType, stats, loading, fetchIncidents } = useIncidents();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    /* Humne sirf '!' lagaya hai taaki tera white color aur border fix rahe */
    <header className="sticky top-0 z-[1000] !bg-white !border-b !border-slate-200 !px-8 !py-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={fetchIncidents}>
          <div className="!bg-slate-900 p-2 rounded-xl group-hover:bg-blue-600 transition-all shadow-lg">
            <Zap className={`w-6 h-6 !text-white ${loading ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h1 className="text-xl font-black !text-slate-900 tracking-tight leading-none uppercase">
              Sam<span className="!text-blue-600">park</span>
            </h1>
            <p className="text-xs font-bold !text-slate-400 tracking-widest uppercase mt-1">Control Center</p>
          </div>
        </div>

        {/* Search Bar - Original White Look */}
        <div className="hidden lg:flex items-center !bg-slate-50 border !border-slate-200 rounded-xl p-1 w-[500px] focus-within:!bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <div className="relative">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none bg-transparent pl-4 pr-8 py-2 text-xs font-bold uppercase tracking-wider !text-slate-600 outline-none cursor-pointer"
            >
              <option value="type">Type</option>
              <option value="description">Description</option>
              <option value="location">Location</option>
              <option value="id">Incident ID</option>
            </select>
            <ChevronDown className="w-4 h-4 !text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="w-[1px] h-6 !bg-slate-200 mx-1"></div>

          <div className="flex items-center flex-1 px-3">
            <Search className="w-5 h-5 !text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${searchType}...`}
              className="bg-transparent border-none outline-none ml-2 text-sm w-full font-semibold !text-slate-700 placeholder:!text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Stats Section */}
        <div className="hidden md:flex items-center gap-4 px-4 py-2 !bg-slate-50 border !border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 border-r !border-slate-200 pr-4">
              <span className={`w-2.5 h-2.5 rounded-full ${stats.pending > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
              <span className="text-xs font-bold !text-slate-700 uppercase">{stats.pending} New</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-xs font-bold !text-slate-700 uppercase">{stats.dispatched} Active</span>
            </div>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 p-2.5 !text-slate-500 hover:!text-red-600 hover:!bg-red-50 rounded-xl transition-all font-bold text-xs uppercase">
          <LogOut className="w-5 h-5" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}