import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  Scale, 
  Send,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

export const ComplaintsCaste = () => {
  const { token } = useAdmin();
  const [registrar, setRegistrar] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    category: "Student",
    email: "",
    mobile: "",
    subject: "",
    description: "",
  });

  // Admin modal
  const [modal, setModal] = useState<{ type: string; item: any } | null>(null);
  const [modalData, setModalData] = useState<any>({});

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const fetchData = async () => {
    try {
      const reg = await fetch(`${API}/api/caste/registrar`).then((r) => r.json());
      const mem = await fetch(`${API}/api/caste/members`).then((r) => r.json());
      setRegistrar(reg);
      setMembers(Array.isArray(mem) ? mem : []);
    } catch (error) {
      console.error("Failed to fetch caste complaint data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/caste/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to submit complaint");
        return;
      }
      toast.success("Complaint submitted successfully!");
      setFormData({ full_name: "", category: "Student", email: "", mobile: "", subject: "", description: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit complaint");
    }
  };

  // ─── Admin CRUD helpers ───
  const openModal = (type: string, item?: any) => {
    setModal({ type, item: item || null });
    setModalData(item ? { ...item } : {});
  };

  const saveItem = async (endpoint: string, data: any, id?: number) => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `${API}/api/${endpoint}/${id}` : `${API}/api/${endpoint}`;
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
      const res = await fetch(`${API}/api/${endpoint}/${id}`, { method: "DELETE", headers: authHeaders() });

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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <ComplaintsHeader activeTab="complaints" />
      
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">
                COMPLAINTS FOR LODGING CASTE-BASED DISCRIMINATION (SC/ST/OBC)
              </h2>
              <div className="mt-2 h-1 w-20 bg-[#c9a227]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Side: Information Block */}
              <div className="lg:col-span-7 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#f8f9fa] p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-[#0f2d5c] flex items-center justify-center text-white shadow-lg">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#c9a227]">Registrar - In Charge</p>
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">{registrar?.name || "Dr. Viswachandra Nath M"}</h3>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-1" />
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {registrar?.address || (
                            <>
                              Damodaram Sanjivayya National Law University<br />
                              Nyayaprastha, Sabbavaram, Visakhapatnam – 531035
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <a href={`tel:${registrar?.phone || "08924248212"}`} className="flex items-center gap-3 text-[#0f2d5c] font-bold hover:text-[#c9a227] transition-colors group">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Phone className="h-4 w-4 text-[#c9a227]" />
                        </div>
                        {registrar?.phone || "08924 248212"}
                      </a>
                      <a href={`mailto:${registrar?.email || "registrar@dsnlu.ac.in"}`} className="flex items-center gap-3 text-[#0f2d5c] font-bold hover:text-[#c9a227] transition-colors group">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Mail className="h-4 w-4 text-[#c9a227]" />
                        </div>
                        {registrar?.email || "registrar@dsnlu.ac.in"}
                      </a>
                    </div>
                  </div>

                  {/* Admin: Edit Registrar */}
                  {token && registrar && (
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => openModal("registrar", registrar)} className="text-xs bg-white border px-3 py-1 rounded shadow hover:bg-gold/10">✏️ Edit Registrar</button>
                      <button onClick={() => deleteItem("caste/registrar", registrar.id)} className="text-xs bg-white border px-3 py-1 rounded shadow hover:bg-red-50 text-red-600">🗑️ Delete</button>
                    </div>
                  )}
                  {token && !registrar && (
                    <button onClick={() => openModal("registrar")} className="text-xs bg-navy text-gold border px-3 py-1 rounded shadow">+ Add Registrar</button>
                  )}
                </motion.div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl font-bold text-[#0f2d5c] flex items-center gap-3">
                      <Users className="h-6 w-6 text-[#c9a227]" />
                      Complaints Redressal Cell Members
                    </h4>
                    {token && (
                      <button onClick={() => openModal("member")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Member</button>
                    )}
                  </div>
                  <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-elegant bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0f2d5c] text-white text-[10px] uppercase font-black tracking-[0.2em]">
                            <th className="px-8 py-5">Name</th>
                            <th className="px-8 py-5">Role</th>
                            {token && <th className="px-8 py-5">Actions</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {members.length > 0 ? (
                            members.map((item, i) => (
                              <tr key={item.id || i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-5 font-bold text-[#0f2d5c]">{item.name}</td>
                                <td className="px-8 py-5">
                                  <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    item.role === "Convener" ? "bg-[#0f2d5c] text-white" : "bg-gray-100 text-gray-600"
                                  )}>
                                    {item.role}
                                  </span>
                                </td>
                                {token && (
                                  <td className="px-8 py-5">
                                    <div className="flex gap-2">
                                      <button onClick={() => openModal("member", item)} className="text-xs p-1">✏️</button>
                                      <button onClick={() => deleteItem("caste/members", item.id)} className="text-xs p-1">🗑️</button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            ))
                          ) : (
                            [
                              { name: "Dr. A. Nageswara Rao", role: "Convener" },
                              { name: "Dr. K. Sudha", role: "Member" },
                              { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
                              { name: "Dr. I. Durga Prasad", role: "Member" },
                              { name: "Dr. R. Deepthi", role: "Member" },
                            ].map((item, i) => (
                              <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-5 font-bold text-[#0f2d5c]">{item.name}</td>
                                <td className="px-8 py-5">
                                  <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    item.role === "Convener" ? "bg-[#0f2d5c] text-white" : "bg-gray-100 text-gray-600"
                                  )}>
                                    {item.role}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Complaint Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden sticky top-28">
                  <div className="bg-[#0f2d5c] p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Scale size={100} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight">Complaint Box</h3>
                    <p className="text-gray-300 text-xs mt-1 font-medium tracking-wide uppercase">Submit your complaint confidentially</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name (Required)</label>
                      <Input 
                        required 
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" 
                      />
                    </div>
                    
                    <div className="space-y-1.5 text-left uppercase">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Student', 'Teacher', 'Staff'].map((cat) => (
                          <div key={cat} className="relative">
                            <input 
                              type="radio" 
                              name="category" 
                              id={cat} 
                              className="peer hidden" 
                              checked={formData.category === cat}
                              onChange={() => setFormData({ ...formData, category: cat })}
                            />
                            <label htmlFor={cat} className="flex items-center justify-center p-3 text-[10px] font-bold border rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-[#0f2d5c] peer-checked:bg-[#0f2d5c] peer-checked:text-white transition-all">
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <Input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" 
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile</label>
                        <Input 
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                      <Input 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" 
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complaint Description</label>
                      <Textarea 
                        placeholder="Provide detailed information regarding the incident..." 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="rounded-2xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] min-h-[120px]" 
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Supporting Document</label>
                      <div className="relative group/file">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="p-4 border-2 border-dashed rounded-2xl flex items-center justify-center gap-3 text-gray-400 group-hover/file:bg-gray-50 group-hover/file:border-[#c9a227] transition-all">
                          <FileText className="h-5 w-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">Select PDF / Image</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-[#0f2d5c] text-white font-bold hover:bg-[#1a3d7c] group shadow-lg mt-4">
                      Submit Official Complaint
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ====== ADMIN MODAL ====== */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold capitalize">{modal.item ? "Edit" : "Add"} {modal.type}</h2>

            {/* Registrar form */}
            {modal.type === "registrar" && (
              <>
                <input className="w-full border p-2 rounded" value={modalData.name || ""} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} placeholder="Name" />
                <input className="w-full border p-2 rounded" value={modalData.designation || ""} onChange={(e) => setModalData({ ...modalData, designation: e.target.value })} placeholder="Designation" />
                <input className="w-full border p-2 rounded" value={modalData.university_name || ""} onChange={(e) => setModalData({ ...modalData, university_name: e.target.value })} placeholder="University Name" />
                <input className="w-full border p-2 rounded" value={modalData.address || ""} onChange={(e) => setModalData({ ...modalData, address: e.target.value })} placeholder="Address" />
                <input className="w-full border p-2 rounded" value={modalData.phone || ""} onChange={(e) => setModalData({ ...modalData, phone: e.target.value })} placeholder="Phone" />
                <input className="w-full border p-2 rounded" value={modalData.email || ""} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} placeholder="Email" />
              </>
            )}

            {/* Member form */}
            {modal.type === "member" && (
              <>
                <input className="w-full border p-2 rounded" value={modalData.name || ""} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} placeholder="Name" />
                <select className="w-full border p-2 rounded" value={modalData.role || ""} onChange={(e) => setModalData({ ...modalData, role: e.target.value })}>
                  <option value="">Select Role</option>
                  <option value="Convener">Convener</option>
                  <option value="Member">Member</option>
                </select>
              </>
            )}

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={() => {
                  const endpoint = modal.type === "registrar" ? "caste/registrar" : "caste/members";
                  saveItem(endpoint, modalData, modal.item?.id);
                }}
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

export default ComplaintsCaste;
