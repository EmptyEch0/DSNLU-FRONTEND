import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  AlertTriangle, 
  Phone, 
  Mail, 
  Globe, 
  ShieldAlert, 
  Users, 
  FileText,
  Info,
  ShieldCheck,
  Building2,
  AlertOctagon
} from "lucide-react";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const AntiRagging = () => {
  const { token } = useAdmin();
  const [helpline, setHelpline] = useState<any>(null);
  const [agency, setAgency] = useState<any>(null);
  const [committee, setCommittee] = useState<any[]>([]);

  // Admin modal
  const [modal, setModal] = useState<{ type: string; item: any } | null>(null);
  const [modalData, setModalData] = useState<any>({});

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const fetchData = async () => {
    try {
      const [h, a, c] = await Promise.all([
        fetch(`${API}/api/anti-ragging/helpline`).then(r => r.json()),
        fetch(`${API}/api/anti-ragging/agency`).then(r => r.json()),
        fetch(`${API}/api/anti-ragging/committee`).then(r => r.json()),
      ]);
      setHelpline(h);
      setAgency(a);
      setCommittee(Array.isArray(c) ? c : []);
    } catch (err) {
      console.error("Failed to fetch anti-ragging data:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (type: string, item?: any) => {
    setModal({ type, item: item || null });
    setModalData(item ? { ...item } : {});
  };

  const saveItem = async (endpoint: string, data: any, id?: number) => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `${API}/api/anti-ragging/${endpoint}/${id}` : `${API}/api/anti-ragging/${endpoint}`;
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(data) });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();
      if (!res.ok) { alert(`❌ Error: ${result.error || "Unable to save"}`); return; }

      toast.success(`✅ Successfully ${id ? "updated" : "added"}!`);
      setModal(null);
      fetchData();
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("❌ Server error. Please try again.");
    }
  };

  const deleteItem = async (endpoint: string, id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API}/api/anti-ragging/${endpoint}/${id}`, { method: "DELETE", headers: authHeaders() });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();
      if (!res.ok) { alert(`❌ Error: ${result.error || "Unable to delete"}`); return; }

      toast.success("✅ Deleted successfully!");
      fetchData();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("❌ Server error.");
    }
  };

  // Fallback static data
  const fallbackCommittee = [
    { type: "Chairman", name: "Prof. D. Surya Prakasa Rao", designation: "Vice Chancellor", mobile: "08924 248234", email: "vc@dsnlu.ac.in" },
    { type: "Convenor", name: "Prof. Nandini C.P.", designation: "Professor of Law", mobile: "+91 91772 37622", email: "nandinicp@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Dayanand Murthy C.P.", designation: "Associate Professor", mobile: "+91 98485 23789", email: "dayanand@dsnlu.ac.in" },
    { type: "Member", name: "Dr. P. Jogi Naidu", designation: "Associate Professor", mobile: "+91 94401 24707", email: "joginaidu@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Bharat Kumar R.", designation: "Assistant Professor", mobile: "+91 99661 14455", email: "bharatkumar@dsnlu.ac.in" },
    { type: "Member", name: "Dr. N. Bhagya Lakshmi", designation: "Assistant Professor", mobile: "+91 94403 64246", email: "bhagyalakshmi@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Ch. Lakshmi", designation: "Assistant Professor", mobile: "+91 94403 14567", email: "lakshmi@dsnlu.ac.in" },
    { type: "Member", name: "Dr. A. Nageswara Rao", designation: "Assistant Professor", mobile: "+91 83418 71919", email: "nageswararao@dsnlu.ac.in" },
    { type: "Police Rep", name: "Circle Inspector of Police", designation: "Sabbavaram PS", mobile: "08924 248210", email: "-" },
    { type: "Warden", name: "Dr. Rifat Khan", designation: "Girls Hostel", mobile: "+91 94943 14567", email: "rifat@dsnlu.ac.in" },
  ];

  const displayCommittee = committee.length > 0 ? committee : fallbackCommittee;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <ComplaintsHeader activeTab="anti-ragging" />
      
      <main className="flex-1">
        <section className="py-16">
          <div className="container space-y-16">
            
            {/* Warning Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-[2.5rem] border-4 border-dashed border-red-400 bg-red-50 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-red-600/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="h-20 w-20 bg-red-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl animate-pulse">
                  <AlertTriangle className="h-10 w-10" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-700 uppercase tracking-tight">
                    Ragging is a Criminal Offence
                  </h2>
                  <p className="text-lg sm:text-xl text-red-900 font-medium max-w-2xl mx-auto leading-relaxed italic">
                    "Ragging in any form is strictly prohibited on the campus and is a punishable offence under the UGC Regulations."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Helpline + Agency Section */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-navy text-white rounded-[2rem] p-10 space-y-8 relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80')] opacity-5 bg-cover grayscale" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold ring-1 ring-gold/30 group-hover:bg-[#c9a227] group-hover:text-white transition-all duration-500">
                      <Phone className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">National Helpline</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">National Anti-Ragging Helpline</p>
                       <p className="text-3xl font-black text-[#c9a227]">{helpline?.phone || "1800-180-5522"}</p>
                       <p className="text-sm font-bold text-white/70 mt-1">24×7 Toll Free Service</p>
                    </div>

                    <div className="grid gap-4">
                       <a href={`mailto:${helpline?.email || "helpline@antiragging.in"}`} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#c9a227] hover:text-white transition-all duration-300 font-bold group/link">
                          <Mail className="h-5 w-5 text-[#c9a227] group-hover:text-white" />
                          {helpline?.email || "helpline@antiragging.in"}
                       </a>
                       <a href={helpline?.website || "https://www.antiragging.in"} target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#c9a227] hover:text-white transition-all duration-300 font-bold group/link">
                          <Globe className="h-5 w-5 text-[#c9a227] group-hover:text-white" />
                          {helpline?.website || "www.antiragging.in"}
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-secondary rounded-[2rem] p-10 space-y-8 relative overflow-hidden group"
              >
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy ring-1 ring-navy/10 group-hover:bg-navy group-hover:text-white transition-all duration-500">
                      <ShieldAlert className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy uppercase tracking-tight">Monitoring Agency</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-secondary/40 border border-navy/5">
                       <p className="text-navy/50 text-xs font-bold uppercase tracking-widest mb-2 font-['Inter']">UGC Monitoring Agency</p>
                       <p className="text-xl font-bold text-navy leading-tight">{agency?.name || "Centre for Youth (C4Y)"}</p>
                    </div>

                    <div className="grid gap-4">
                       <a href={`mailto:${agency?.email || "antiragging@c4yindia.org"}`} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-navy/5 hover:bg-navy hover:text-white transition-all duration-300 font-bold group/link text-navy">
                          <Mail className="h-5 w-5 text-gold" />
                          {agency?.email || "antiragging@c4yindia.org"}
                       </a>
                       <a href={agency?.website || "https://www.c4yindia.org"} target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-navy/5 hover:bg-navy hover:text-white transition-all duration-300 font-bold group/link text-navy">
                          <Globe className="h-5 w-5 text-gold" />
                          {agency?.website || "www.c4yindia.org"}
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Committee Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-secondary pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-gold" />
                    <h2 className="text-3xl font-serif font-bold text-navy uppercase tracking-tight">Anti-Ragging Committee</h2>
                  </div>
                  <p className="text-muted-foreground font-medium">Statutory committee ensuring a ragging-free campus environment.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f2d5c] text-white text-xs font-bold uppercase tracking-widest border-b-4 border-[#c9a227]">
                     Academic Year 2025-26
                  </div>
                  {token && (
                    <button onClick={() => openModal("committee")} className="px-4 py-2 bg-[#0f2d5c] text-[#c9a227] rounded-full font-bold text-sm">+ Add Member</button>
                  )}
                </div>
              </div>

              <div className="rounded-[2.5rem] border shadow-2xl bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0f2d5c] text-white text-xs uppercase tracking-[0.2em] font-black">
                        <th className="px-8 py-6">Type / Position</th>
                        <th className="px-8 py-6">Hon'ble Member</th>
                        <th className="px-8 py-6">Designation</th>
                        <th className="px-8 py-6 whitespace-nowrap">Mobile</th>
                        <th className="px-8 py-6">Official Email</th>
                        {token && <th className="px-8 py-6">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {displayCommittee.map((member: any, i: number) => (
                        <tr key={member.id || i} className="hover:bg-gold/5 transition-colors group">
                          <td className="px-8 py-5">
                             <span className={cn(
                               "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                               member.type === "Chairman" ? "bg-red-600 text-white" : 
                               member.type === "Convenor" ? "bg-gold text-navy" : "bg-secondary text-navy"
                             )}>
                               {member.type}
                             </span>
                          </td>
                          <td className="px-8 py-5 font-bold text-navy tracking-tight">{member.name}</td>
                          <td className="px-8 py-5 text-muted-foreground font-medium">{member.designation}</td>
                          <td className="px-8 py-5 font-bold text-navy">
                             {member.mobile !== "-" ? (
                               <a href={`tel:${member.mobile.replace(/\s/g, "")}`} className="hover:text-gold transition-colors flex items-center gap-2">
                                 <Phone className="h-3.5 w-3.5 text-gold/50" />
                                 {member.mobile}
                               </a>
                             ) : "-"}
                          </td>
                          <td className="px-8 py-5 font-medium text-foreground/70 italic">
                             {member.email !== "-" ? (
                               <a href={`mailto:${member.email}`} className="hover:text-gold transition-colors flex items-center gap-2">
                                 <Mail className="h-3.5 w-3.5 text-gold/50" />
                                 {member.email}
                               </a>
                             ) : "-"}
                          </td>
                          {token && member.id && (
                            <td className="px-8 py-5">
                              <div className="flex gap-2">
                                <button onClick={() => openModal("committee", member)} className="text-xs p-1">✏️</button>
                                <button onClick={() => deleteItem("committee", member.id)} className="text-xs p-1">🗑️</button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Statutory Note */}
            <div className="bg-secondary/30 p-8 rounded-3xl flex items-start gap-6 border-l-8 border-navy">
               <Info className="h-10 w-10 text-gold shrink-0" />
               <div className="space-y-2">
                  <h4 className="text-navy font-bold uppercase tracking-wider text-sm">Statutory Regulations</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     As per the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, DSNLU has zero tolerance towards ragging. Students are required to submit anti-ragging affidavits at the time of admission.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                     <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-navy bg-white px-4 py-2 rounded-lg border border-navy/5 hover:border-gold hover:text-gold transition-all">
                        <FileText className="h-4 w-4" /> Download UGC Regs
                     </button>
                     <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-navy bg-white px-4 py-2 rounded-lg border border-navy/5 hover:border-gold hover:text-gold transition-all">
                        <FileText className="h-4 w-4" /> Anti-Ragging Affidavit
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ====== ADMIN MODAL ====== */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold capitalize">{modal.item ? "Edit" : "Add"} Committee Member</h2>

            <select className="w-full border p-2 rounded" value={modalData.type || ""} onChange={(e) => setModalData({ ...modalData, type: e.target.value })}>
              <option value="">Select Type</option>
              <option value="Chairman">Chairman</option>
              <option value="Convenor">Convenor</option>
              <option value="Member">Member</option>
              <option value="Police Rep">Police Rep</option>
              <option value="Warden">Warden</option>
            </select>
            <input className="w-full border p-2 rounded" value={modalData.name || ""} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} placeholder="Name" />
            <input className="w-full border p-2 rounded" value={modalData.designation || ""} onChange={(e) => setModalData({ ...modalData, designation: e.target.value })} placeholder="Designation" />
            <input className="w-full border p-2 rounded" value={modalData.mobile || ""} onChange={(e) => setModalData({ ...modalData, mobile: e.target.value })} placeholder="Mobile" />
            <input className="w-full border p-2 rounded" value={modalData.email || ""} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} placeholder="Email" />

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={() => saveItem("committee", modalData, modal.item?.id)}
                className="px-4 py-2 bg-navy text-gold rounded font-bold"
              >
                {modal.item ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiRagging;
