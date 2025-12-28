import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Yahan tu apna logic laga sakta hai (Sanyam ki API ya hardcoded)
    if (email === "admin@safety.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true"); // Session save kiya
      navigate("/admin"); // Controller Room mein entry!
    } else {
      alert("Invalid Credentials, Bhai!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Command Center</h1>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Admin Email</label>
            <input 
              type="email" required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-600 outline-none transition-all font-bold text-slate-700"
              placeholder="admin@safety.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Access Key</label>
            <input 
              type="password" required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-600 outline-none transition-all font-bold text-slate-700"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
            <Lock className="w-5 h-5" /> Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}