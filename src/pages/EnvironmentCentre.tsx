import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Leaf, ShieldCheck, Globe, Scale, Edit, Plus, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 9;

const EnvironmentCentre = () => {
  const { token } = useAdmin();
  
  const [content, setContent] = useState<any>(null);
  const [committee, setCommittee] = useState<any[]>([]);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"about" | "committee">("about");
  const [editItem, setEditItem] = useState<any>(null);

  // Form States
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutText, setAboutText] = useState("");

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formOrder, setFormOrder] = useState(1);

  useEffect(() => {
    fetchContent();
    fetchCommittee();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/content`);
      const data = await res.json();
      if (data && data.length > 0) {
        setContent(data[0]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/committee`);
      const data = await res.json();
      setCommittee(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  // --- Handlers ---
  const openEditAbout = () => {
    setModalType("about");
    setAboutTitle(content?.title || "About the Centre");
    setAboutText(content?.content || "");
    setEditItem(content);
    setShowModal(true);
  };

  const openAddCommittee = () => {
    setModalType("committee");
    setEditItem(null);
    setFormRole("");
    setFormName("");
    setFormOrder(committee.length + 1);
    setShowModal(true);
  };

  const openEditCommittee = (member: any) => {
    setModalType("committee");
    setEditItem(member);
    setFormRole(member.role);
    setFormName(member.name);
    setFormOrder(member.display_order);
    setShowModal(true);
  };

  const handleSaveAbout = async () => {
    try {
      const url = editItem?.id 
        ? `${API}/api/centres/admin/content/${editItem.id}` 
        : `${API}/api/centres/admin/content`; // Assuming create doesn't exist for static 1 row, but fallback just in case
        
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: aboutTitle, content: aboutText }),
      });
      toast.success("About section updated");
      fetchContent();
      setShowModal(false);
    } catch (error) {
      toast.error("Error updating about section");
    }
  };

  const handleSaveCommittee = async () => {
    try {
      const url = editItem
        ? `${API}/api/centres/admin/committee/${editItem.id}`
        : `${API}/api/centres/admin/committee`;

      await fetch(url, {
        method: editItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_id: CENTRE_ID,
          role: formRole,
          name: formName,
          display_order: formOrder,
        }),
      });
      toast.success(editItem ? "Member updated" : "Member added");
      fetchCommittee();
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving member");
    }
  };

  const handleDeleteCommittee = async (id: number) => {
    if (!confirm("Delete member?")) return;
    try {
      await fetch(`${API}/api/centres/admin/committee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Member deleted");
      fetchCommittee();
    } catch (error) {
      toast.error("Error deleting member");
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
            <span className="font-medium text-gold">Environmental Law Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Environmental Law & Climate Justice
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none space-y-6"
            >
              <div className="flex items-center justify-between border-l-4 border-gold pl-6 mb-10">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider m-0">
                  {content?.title || "About the Centre"}
                </h2>
                {token && (
                   <button
                     onClick={openEditAbout}
                     className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     <Edit className="h-4 w-4" /> Edit Content
                   </button>
                )}
              </div>
              <div className="relative p-10 rounded-3xl border bg-card shadow-sm overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
                   <Leaf className="h-32 w-32 text-green-600" />
                 </div>
                 <p className="text-muted-foreground leading-relaxed text-lg text-justify relative z-10 whitespace-pre-wrap">
                  {content?.content || "No content configured yet."}
                 </p>
              </div>
            </motion.div>

            {/* Core Pillars (Static Decor) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: ShieldCheck, label: "Environmental Governance" },
                { icon: Globe, label: "Climate Change" },
                { icon: Scale, label: "Ecological Justice" },
                { icon: Leaf, label: "Sustainability" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 rounded-2xl border bg-card text-center transition-all hover:shadow-md hover:border-gold/30">
                  <div className="mb-4 p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-[#0f2d5c] uppercase text-xs tracking-widest leading-tight">{item.label}</h4>
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
              <div className="flex items-center justify-between border-l-4 border-gold pl-6">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider m-0">
                  Committee
                </h2>
                {token && (
                  <button
                    onClick={openAddCommittee}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0f2d5c] bg-gold px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors shadow-md"
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </button>
                )}
              </div>
              
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                      {token && <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium">
                    {committee.length === 0 ? (
                      <tr>
                        <td colSpan={token ? 3 : 2} className="px-6 py-8 text-center italic text-muted-foreground">
                          No committee members configured yet.
                        </td>
                      </tr>
                    ) : (
                      committee.map((member) => (
                        <tr key={member.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/5">
                            {member.role}
                          </td>
                          <td className="px-6 py-4">
                            {member.name}
                          </td>
                          {token && (
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-3 text-xs uppercase tracking-wider font-bold">
                                <button 
                                  onClick={() => openEditCommittee(member)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                >
                                  <Edit className="h-3 w-3" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteCommittee(member.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 className="h-3 w-3" /> Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-6 shadow-2xl h-auto max-h-[90vh] overflow-y-auto min-scrollbar"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-serif font-bold text-[#0f2d5c]">
                  {modalType === "about" 
                    ? "Edit About Content" 
                    : editItem ? "Edit Committee Member" : "Add Committee Member"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {modalType === "about" ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Title</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="Title"
                      value={aboutTitle}
                      onChange={(e) => setAboutTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Content</label>
                    <textarea
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors min-h-[200px]"
                      placeholder="Description"
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pt-4 gap-3">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Cancel</button>
                    <button onClick={handleSaveAbout} className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]">Save Changes</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Role</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="Honorary Chair Person, Faculty Member..."
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Name</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="Name of member"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Display Order</label>
                    <input
                      type="number"
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex justify-end pt-4 gap-3">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Cancel</button>
                    <button onClick={handleSaveCommittee} className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]">Save Member</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EnvironmentCentre;
