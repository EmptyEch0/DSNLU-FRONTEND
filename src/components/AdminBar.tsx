import { useAdmin } from "@/context/AdminContext";
import { LogOut, Eye, Settings, ShieldCheck } from "lucide-react";

export function AdminBar() {
  const { token, isAdminMode, toggleAdminMode, logout } = useAdmin();

  if (!token) return null;

  return (
    <div className="bg-navy-dark border-b border-gold/20 text-white px-4 py-2 flex items-center justify-between sticky top-0 z-[100] h-12">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gold">
          <ShieldCheck className="h-5 w-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Admin Panel</span>
        </div>
        
        <div className="h-4 w-px bg-white/20 mx-2" />
        
        <button
          onClick={toggleAdminMode}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isAdminMode 
              ? "bg-gold text-navy shadow-[0_0_10px_rgba(212,160,23,0.3)]" 
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          {isAdminMode ? "Admin Mode" : "Viewer Mode"}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/60 hover:text-white transition-colors">
          <Settings className="h-4 w-4" />
        </button>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
