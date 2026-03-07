import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Scale, Users, Gavel, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

const AmbedkarCentre = () => {
  const { token } = useAdmin();
  const [committee, setCommittee] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formOrder, setFormOrder] = useState(1);

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/ambedkar/committee`);
      const data = await res.json();
      setCommittee(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching Ambedkar committee:", error);
    }
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormRole(item.role);
    setFormName(item.name);
    setFormOrder(item.display_order);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      role: formRole,
      name: formName,
      display_order: formOrder,
    };

    try {
      if (editItem) {
        await fetch(`${API}/api/admin/ambedkar/committee/${editItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API}/api/admin/ambedkar/committee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      setShowModal(false);
      fetchCommittee();
    } catch (error) {
      console.error("Error saving Ambedkar committee member:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete member?")) return;

    try {
      await fetch(`${API}/api/admin/ambedkar/committee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCommittee();
    } catch (error) {
      console.error("Error deleting Ambedkar committee member:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Ambedkar Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541872703-74c5e443d1fe?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
              >
                AMBEDKAR CENTRE
              </motion.h1>
              {token && (
                <button
                  onClick={() => {
                    setEditItem(null);
                    setFormRole("");
                    setFormName("");
                    setFormOrder(committee.length + 1);
                    setShowModal(true);
                  }}
                  className="bg-gold text-[#0f2d5c] px-4 py-2 rounded-lg font-bold shadow-md hover:bg-gold/90 transition-all text-sm whitespace-nowrap"
                >
                  + Add Member
                </button>
              )}
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-center"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-10">
                About the Centre
              </h2>
              <div className="bg-secondary/10 p-10 rounded-3xl border shadow-sm relative overflow-hidden">
                 <Scale className="absolute -top-10 -right-10 h-40 w-40 text-[#0f2d5c] opacity-5" />
                 <p className="text-muted-foreground leading-relaxed text-lg italic text-justify">
                  The Ambedkar Centre at DSNLU is dedicated to promoting constitutional values, social justice, equality, and the protection of marginalized communities in alignment with the vision of Dr. B.R. Ambedkar. The Centre encourages research, discourse, and policy engagement in areas concerning social justice, constitutional governance, and human rights.
                 </p>
              </div>
            </motion.div>

            {/* Core Values / Themes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: ShieldCheck, label: "Social Justice" },
                { icon: Gavel, label: "Constitutional Values" },
                { icon: Scale, label: "Equality" },
                { icon: Users, label: "Human Rights" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-2xl border bg-card text-center hover:shadow-md transition-all group hover:border-gold/30">
                  <div className="mb-4 p-3 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif font-bold text-[#0f2d5c] uppercase text-xs tracking-widest">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Committee
              </h2>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground">
                    {committee.map((member) => (
                      <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10 whitespace-nowrap">
                          {member.role}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{member.name}</span>
                            {token && (
                              <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                                <button 
                                  onClick={() => openEdit(member)}
                                  className="text-gold hover:text-gold/80 transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(member.id)}
                                  className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {committee.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-6 py-10 text-center italic text-muted-foreground">
                          No committee members found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-xl font-bold text-[#0f2d5c]">
                  {editItem ? "Edit Member" : "Add Member"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Role</label>
                  <input
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                    placeholder="e.g. Honorary Chair Person"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Name</label>
                  <input
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                    placeholder="Full Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Display Order</label>
                  <input
                    type="number"
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmbedkarCentre;
