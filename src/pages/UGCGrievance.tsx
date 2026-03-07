import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  UserPlus, 
  Scale, 
  Building2, 
  Phone, 
  Mail 
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

export const UGCGrievance = () => {
  const { token } = useAdmin();
  const [ugc, setUGC] = useState<any>(null);

  // Admin modal
  const [modal, setModal] = useState<{ item: any } | null>(null);
  const [modalData, setModalData] = useState<any>({});

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const fetchUGC = () => {
    fetch(`${API}/api/ugc`)
      .then((res) => res.json())
      .then((data) => setUGC(data))
      .catch((err) => console.error("Failed to fetch UGC data:", err));
  };

  useEffect(() => {
    fetchUGC();
  }, []);

  const openModal = (item?: any) => {
    setModal({ item: item || null });
    setModalData(item ? { ...item } : {});
  };

  const saveUGC = async () => {
    try {
      const method = modal?.item ? "PUT" : "POST";
      const url = modal?.item ? `${API}/api/ugc/${modal.item.id}` : `${API}/api/ugc`;
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(modalData) });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();
      if (!res.ok) { alert(`❌ Error: ${result.error || "Unable to save"}`); return; }

      toast.success(`✅ Successfully ${modal?.item ? "updated" : "added"}!`);
      setModal(null);
      fetchUGC();
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("❌ Server error. Please try again.");
    }
  };

  const deleteUGC = async (id: number) => {
    if (!confirm("Delete this UGC entry?")) return;
    try {
      const res = await fetch(`${API}/api/ugc/${id}`, { method: "DELETE", headers: authHeaders() });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();
      if (!res.ok) { alert(`❌ Error: ${result.error || "Unable to delete"}`); return; }

      toast.success("✅ Deleted successfully!");
      setUGC(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("❌ Server error.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <ComplaintsHeader activeTab="ugc-grievance" />
      
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[#0f2d5c]">
                    <ShieldCheck className="h-8 w-8 text-[#c9a227]" />
                    <h3 className="font-serif text-3xl font-bold">University Grants Commission (UGC)</h3>
                  </div>
                  <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">Redressal of Grievance of Students of DSNLU</p>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  DSNLU has appointed an Ombudsperson to oversee all matters related to institutional service standards and student welfare. This official channel ensures fairness, objectivity, and timely resolution to all submitted grievances.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-10 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Scale size={200} />
                </div>
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="h-20 w-20 rounded-3xl bg-[#0f2d5c] flex items-center justify-center text-white">
                      <UserPlus className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#c9a227]">Ombudsperson</p>
                      <h4 className="font-serif text-3xl font-bold text-[#0f2d5c]">{ugc?.ombudsperson_name || "Prof. A.B.S.V. Ranga Rao"}</h4>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Building2 className="h-4 w-4 text-[#c9a227]" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium leading-relaxed">
                        {ugc?.address || (
                          <>
                            Damodaram Sanjivayya National Law University<br />
                            Nyayaprastha, Sabbavaram, Visakhapatnam – 531035, AP
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 pt-4">
                      <a href={`tel:${ugc?.phone || "+918924248216"}`} className="flex items-center gap-3 text-[#0f2d5c] font-bold text-sm hover:text-[#c9a227] transition-colors">
                        <Phone className="h-4 w-4 text-[#c9a227]" /> {ugc?.phone || "08924 248216"}
                      </a>
                      <a href={`mailto:${ugc?.email || "rangarao_ausw@yahoo.com"}`} className="flex items-center gap-3 text-[#0f2d5c] font-bold text-sm hover:text-[#c9a227] transition-colors">
                        <Mail className="h-4 w-4 text-[#c9a227]" /> {ugc?.email || "rangarao_ausw@yahoo.com"}
                      </a>
                    </div>
                  </div>

                  {/* Admin: Edit/Delete UGC */}
                  {token && ugc && (
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => openModal(ugc)} className="text-xs bg-white border px-3 py-1 rounded shadow hover:bg-gold/10">✏️ Edit</button>
                      <button onClick={() => deleteUGC(ugc.id)} className="text-xs bg-white border px-3 py-1 rounded shadow hover:bg-red-50 text-red-600">🗑️ Delete</button>
                    </div>
                  )}
                  {token && !ugc && (
                    <button onClick={() => openModal()} className="text-xs bg-navy text-gold border px-3 py-1 rounded shadow">+ Add UGC Entry</button>
                  )}
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
            <h2 className="text-xl font-bold">{modal.item ? "Edit" : "Add"} UGC Grievance</h2>

            <input className="w-full border p-2 rounded" value={modalData.ombudsperson_name || ""} onChange={(e) => setModalData({ ...modalData, ombudsperson_name: e.target.value })} placeholder="Ombudsperson Name" />
            <input className="w-full border p-2 rounded" value={modalData.university_name || ""} onChange={(e) => setModalData({ ...modalData, university_name: e.target.value })} placeholder="University Name" />
            <input className="w-full border p-2 rounded" value={modalData.address || ""} onChange={(e) => setModalData({ ...modalData, address: e.target.value })} placeholder="Address" />
            <input className="w-full border p-2 rounded" value={modalData.phone || ""} onChange={(e) => setModalData({ ...modalData, phone: e.target.value })} placeholder="Phone" />
            <input className="w-full border p-2 rounded" value={modalData.email || ""} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} placeholder="Email" />

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={saveUGC} className="px-4 py-2 bg-navy text-gold rounded font-bold">
                {modal.item ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UGCGrievance;
