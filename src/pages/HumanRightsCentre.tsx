import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Scale, ShieldCheck, Users, Gavel, Globe, Edit, Trash2, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 13;

interface CentreContent {
  id: number;
  centre_id: number;
  title: string;
  content: string;
}

interface CommitteeMember {
  id: number;
  centre_id: number;
  name: string;
  role: string;
  display_order: number;
}

const HumanRightsCentre = () => {
  const { token } = useAdmin();

  const [content, setContent] = useState<CentreContent | null>(null);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CentreContent | CommitteeMember | null>(null);
  const [editType, setEditType] = useState<"about" | "committee">("committee");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    role: "",
    name: "",
    display_order: 1,
  });

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

  const openEdit = (item: CentreContent | CommitteeMember | null, type: "about" | "committee") => {
    setEditType(type);
    setEditItem(item);

    if (type === "about") {
      const aboutItem = item as CentreContent;
      setFormData({
        title: aboutItem?.title || "About the Centre",
        content: aboutItem?.content || "",
        role: "",
        name: "",
        display_order: 1,
      });
    } else {
      const memberItem = item as CommitteeMember;
      setFormData({
        title: "",
        content: "",
        role: memberItem?.role || "",
        name: memberItem?.name || "",
        display_order: memberItem?.display_order || committee.length + 1,
      });
    }

    setShowModal(true);
  };

  const handleSave = async () => {
    let url = "";
    const method = editItem ? "PUT" : "POST";

    if (editType === "about") {
      url = `/api/centres/admin/content/${(editItem as CentreContent).id}`;
    } else {
      url = editItem
        ? `/api/centres/admin/committee/${(editItem as CommitteeMember).id}`
        : `/api/centres/admin/committee`;
    }

    try {
      const response = await fetch(`${API}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_id: CENTRE_ID,
          ...formData,
        }),
      });

      if (response.ok) {
        toast.success(editItem ? "Updated successfully" : "Added successfully");
        setShowModal(false);
        fetchContent();
        fetchCommittee();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("Error saving data");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      const response = await fetch(`${API}/api/centres/admin/committee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Member deleted");
        fetchCommittee();
      } else {
        toast.error("Failed to delete");
      }
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
            <span className="font-medium text-gold">Human Rights & Duties</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589578594224-110058e38144?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Human Rights & Duties
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
        <section className="py-24 lg:py-32">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none space-y-10"
            >
              <div className="flex items-center justify-between border-l-4 border-gold pl-6 mb-10">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider m-0">
                  {content?.title || "About the Centre"}
                </h2>
                {token && (
                  <button
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => openEdit(content, "about")}
                  >
                    <Edit className="h-4 w-4" /> Edit About
                  </button>
                )}
              </div>
              
              <div className="relative p-10 rounded-3xl border bg-card shadow-sm border-gold/10 overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                   <Scale className="h-32 w-32 text-[#0f2d5c]" />
                 </div>
                 <p className="text-muted-foreground leading-relaxed text-lg text-justify relative z-10 whitespace-pre-wrap">
                  {content?.content || "Exploring constitutional rights, fundamental duties, and social justice..."}
                 </p>
                 {token && (
                  <button
                    className="mt-4 text-sm text-blue-600 hover:underline flex items-center gap-1"
                    onClick={() => openEdit(content, "about")}
                  >
                    <Edit className="h-3 w-3" /> Edit Section
                  </button>
                )}
              </div>
            </motion.div>

            {/* Core Areas */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, label: "Constitutional Rights" },
                { icon: Gavel, label: "Fundamental Duties" },
                { icon: Scale, label: "Social Justice" },
                { icon: Globe, label: "International Law" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center p-8 rounded-2xl border bg-card text-center hover:bg-gold/5 transition-colors border-gold/10"
                >
                  <div className="mb-4 text-gold">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-[#0f2d5c] uppercase text-[10px] tracking-[0.2em] leading-tight">{item.label}</h4>
                </motion.div>
              ))}
            </div>

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
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0f2d5c] bg-gold px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors shadow-md"
                    onClick={() => {
                      setEditType("committee");
                      setEditItem(null);
                      setFormData({
                        title: "",
                        content: "",
                        role: "",
                        name: "",
                        display_order: committee.length + 1,
                      });
                      setShowModal(true);
                    }}
                  >
                    <Plus className="h-4 w-4" /> + Add Committee Member
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium">
                    {committee.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center italic text-muted-foreground">
                          No committee members configured yet.
                        </td>
                      </tr>
                    ) : (
                      committee.map((member) => (
                        <tr key={member.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10">
                            {member.role}
                            {token && (
                              <div className="flex gap-3 mt-2 text-xs">
                                <button 
                                  onClick={() => openEdit(member, "committee")} 
                                  className="text-blue-600 hover:underline"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(member.id)} 
                                  className="text-red-600 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 font-medium italic">{member.name}</td>
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
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl h-auto max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-[#0f2d5c]">
                {editItem ? "Edit" : "Add"} {editType === "about" ? "Content" : "Member"}
              </h2>

              {editType === "about" && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Title</label>
                    <input
                      className="w-full border p-2 rounded outline-none focus:border-gold"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Content</label>
                    <textarea
                      className="w-full border p-2 rounded outline-none focus:border-gold"
                      rows={5}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {editType === "committee" && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Role</label>
                    <input
                      className="w-full border p-2 rounded outline-none focus:border-gold"
                      placeholder="Role"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Name</label>
                    <input
                      className="w-full border p-2 rounded outline-none focus:border-gold"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Display Order</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded outline-none focus:border-gold"
                      placeholder="Display Order"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData({ ...formData, display_order: Number(e.target.value) })
                      }
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Cancel</button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HumanRightsCentre;
