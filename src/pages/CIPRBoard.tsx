import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Award, UserCheck, Users, Mail, GraduationCap, Gavel, Scale, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

const CIPRBoard = () => {
  const { token } = useAdmin();
  const [board, setBoard] = useState<any[]>([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formDesignation, setFormDesignation] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formOrder, setFormOrder] = useState(1);

  const fetchBoard = async () => {
    try {
      const res = await fetch(`${API}/api/centres/cipr/board`);
      const data = await res.json();
      setBoard(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching CIPR board:", error);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormRole(item.role);
    setFormName(item.name);
    setFormDesignation(item.designation || "");
    setFormEmail(item.email || "");
    setFormOrder(item.display_order);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      role: formRole,
      name: formName,
      designation: formDesignation,
      email: formEmail,
      display_order: formOrder,
    };

    try {
      if (editItem) {
        await fetch(`${API}/api/admin/cipr/board/${editItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API}/api/admin/cipr/board`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      setShowModal(false);
      fetchBoard();
    } catch (error) {
      console.error("Error saving CIPR board member:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete board member?")) return;

    try {
      await fetch(`${API}/api/admin/cipr/board/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchBoard();
    } catch (error) {
      console.error("Error deleting CIPR board member:", error);
    }
  };

  // Grouping Logic
  const grouped = board.reduce((acc: any, item) => {
    if (!acc[item.role]) acc[item.role] = [];
    acc[item.role].push(item);
    return acc;
  }, {});

  // Roles to display as large cards vs list items
  const specialRoles = ["Chief Patron", "Patron", "Honorary Editor", "Chief Editor"];

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
            <span className="font-medium text-gold">CIPR&T Board</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507679799987-c7377ec48696?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
               <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
              >
                IPR Editorial & Advisory Board
              </motion.h1>
              {token && (
                 <button
                  onClick={() => {
                    setEditItem(null);
                    setFormRole("");
                    setFormName("");
                    setFormDesignation("");
                    setFormEmail("");
                    setFormOrder(board.length + 1);
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

        {/* Dynamic Board Sections */}
        <section className="py-20 lg:py-24">
          <div className="container max-w-5xl space-y-24">
             {Object.keys(grouped).map((role) => (
                <div key={role} className="space-y-12">
                   <div className="flex items-center gap-4 border-l-4 border-gold pl-6">
                      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider">{role}</h2>
                   </div>

                   <div className={
                      role === "Chief Patron" || role === "Patron" 
                      ? "grid md:grid-cols-2 gap-8" 
                      : (role === "Honorary Editor" || role === "Chief Editor" ? "flex flex-col gap-8" : "grid md:grid-cols-2 lg:grid-cols-2 gap-6")
                   }>
                      {grouped[role].map((member: any) => (
                         <motion.div 
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className={`
                            relative p-8 rounded-3xl border bg-white shadow-sm flex items-start gap-6 group transition-all hover:shadow-md
                            ${role === "Chief Patron" ? "border-t-8 border-gold" : ""}
                            ${role === "Patron" ? "border-t-8 border-[#0f2d5c]" : ""}
                            ${role === "Honorary Editor" ? "bg-[#0f2d5c] text-white shadow-2xl items-center" : ""}
                            ${role === "Chief Editor" ? "border-2 border-gold/30 bg-secondary/10 items-center" : ""}
                          `}
                         >
                            {/* Icon Logic */}
                            <div className={`
                               p-4 rounded-2xl shrink-0
                               ${role === "Chief Patron" ? "bg-[#0f2d5c] text-gold" : "bg-gold text-[#0f2d5c]"}
                               ${role === "Honorary Editor" ? "bg-white/10 text-gold scale-110 !rounded-full" : ""}
                               ${role === "Chief Editor" ? "bg-white shadow-inner !rounded-full border-4 border-gold p-6" : ""}
                            `}>
                               {role === "Chief Patron" && <Gavel className="h-8 w-8 text-gold" />}
                               {role === "Patron" && <Scale className="h-8 w-8" />}
                               {role === "Honorary Editor" && <UserCheck className="h-10 w-10" />}
                               {role === "Chief Editor" && <GraduationCap className="h-10 w-10" />}
                               {!specialRoles.includes(role) && <Award className="h-6 w-6 text-gold" />}
                            </div>

                            <div className="space-y-2 flex-1">
                               <h3 className={`font-serif text-xl font-bold ${role === "Honorary Editor" ? "text-3xl" : "text-[#0f2d5c]"} ${role === "Honorary Editor" ? "text-white" : ""}`}>
                                  {member.name}
                               </h3>
                               {member.designation && (
                                  <p className={`text-sm leading-relaxed ${role === "Honorary Editor" ? "text-white/70 text-lg" : "text-muted-foreground"}`} dangerouslySetInnerHTML={{ __html: member.designation.replace(/\n/g, '<br />') }} />
                               )}
                               {member.email && (
                                  <div className="flex items-center gap-2 text-gold font-medium mt-2">
                                     <Mail className="h-4 w-4" />
                                     <a href={`mailto:${member.email}`} className="hover:underline text-sm">{member.email}</a>
                                  </div>
                               )}

                               {token && (
                                 <div className="flex gap-4 mt-4 text-xs">
                                   <button 
                                      onClick={() => openEdit(member)}
                                      className="text-blue-600 hover:scale-105 transition-transform font-bold underline underline-offset-4"
                                   >
                                      Edit
                                   </button>
                                   <button 
                                      onClick={() => handleDelete(member.id)}
                                      className="text-red-600 hover:scale-105 transition-transform font-bold underline underline-offset-4"
                                   >
                                      Delete
                                   </button>
                                 </div>
                               )}
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>
             ))}

             {board.length === 0 && (
                <div className="py-20 text-center">
                   <p className="text-muted-foreground italic">No board members found in database.</p>
                </div>
             )}
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
              className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-xl font-bold text-[#0f2d5c]">
                  {editItem ? "Edit Board Member" : "Add Board Member"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0f2d5c]">Role</label>
                    <select
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors bg-white"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="Chief Patron">Chief Patron</option>
                      <option value="Patron">Patron</option>
                      <option value="Honorary Editor">Honorary Editor</option>
                      <option value="Chief Editor">Chief Editor</option>
                      <option value="Advisory Board">Advisory Board</option>
                      <option value="Editorial Board">Editorial Board</option>
                    </select>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors mt-2"
                      placeholder="Or enter custom role"
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
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Designation (Supports new lines)</label>
                  <textarea
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors min-h-[100px]"
                    placeholder="e.g. Judge, Supreme Court of India"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0f2d5c]">Email (Optional)</label>
                    <input
                      type="email"
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="email@dsnlu.ac.in"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
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

export default CIPRBoard;
