import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 20;
const CENTRE_NAME = "International Centre for MSMEs (ICMSME)";

const ICMSMECentre = () => {
  const { token } = useAdmin();

  const [content, setContent] = useState<any[]>([]);
  const [committee, setCommittee] = useState<any[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
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
      setContent(await res.json());
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/committee`);
      setCommittee(await res.json());
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  const openEdit = (item: any, type: "about" | "committee") => {
    setEditType(type);
    setEditItem(item);

    if (type === "about") {
      setFormData({
        title: item?.title || "",
        content: item?.content || "",
        role: "",
        name: "",
        display_order: 1,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        role: item?.role || "",
        name: item?.name || "",
        display_order: item?.display_order || committee.length + 1,
      });
    }

    setShowModal(true);
  };

  const handleSave = async () => {
    let url = "";
    let method = editItem ? "PUT" : "POST";

    if (editType === "about") {
      url = `/api/centres/admin/content/${editItem.id}`;
    } else {
      url = editItem ? `/api/centres/admin/committee/${editItem.id}` : `/api/centres/admin/committee`;
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
        toast.success("Saved successfully");
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
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API}/api/centres/admin/committee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Deleted");
        fetchCommittee();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting");
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
            <span className="font-medium text-gold">ICMSME</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden text-center text-white">
          <div className="container relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold md:text-5xl uppercase tracking-wider"
            >
              International Centre for MSMEs (ICMSME)
            </motion.h1>
            <div className="mx-auto mt-6 h-1 w-24 bg-gold rounded-full" />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container max-w-5xl space-y-20">
            
            {/* About Content Blocks */}
            <div className="space-y-16">
              {content.map((c) => (
                <div key={c.id} className="space-y-8 bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-md relative group">
                  <div className="flex items-center justify-between border-l-8 border-gold pl-8">
                    <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">
                      {c.title}
                    </h2>
                    {token && (
                      <button onClick={() => openEdit(c, "about")} className="text-blue-600 hover:scale-110 transition-transform flex items-center gap-1 font-bold">
                        <Edit className="h-4 w-4" /> Edit
                      </button>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg text-justify whitespace-pre-line font-medium opacity-90">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Committee Section */}
            <div className="space-y-8 pt-10 border-t border-slate-200">
              <div className="flex items-center justify-between">
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-widest border-b-4 border-gold pb-2">
                  Committee
                </h2>
                {token && (
                  <button onClick={() => openEdit(null, "committee")} className="bg-gold text-[#0f2d5c] px-6 py-3 rounded-2xl font-bold text-xs uppercase shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                    <Plus className="h-4 w-4" /> Add Member
                  </button>
                )}
              </div>
              <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-10 py-6 text-sm font-bold uppercase tracking-widest">Role</th>
                      <th className="px-10 py-6 text-sm font-bold uppercase tracking-widest">Name Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#0f2d5c] font-bold">
                    {committee.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-10 py-8 bg-secondary/5 font-serif text-lg align-top w-2/5">
                          {member.role}
                          {token && (
                            <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => openEdit(member, "committee")} className="text-blue-600 hover:text-blue-800 text-[11px] uppercase tracking-tighter hover:underline px-2 py-1 bg-blue-50 rounded">Edit</button>
                               <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-800 text-[11px] uppercase tracking-tighter hover:underline px-2 py-1 bg-red-50 rounded">Delete</button>
                            </div>
                          )}
                        </td>
                        <td className="px-10 py-8 text-slate-700 text-lg align-top">
                          {member.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white p-12 rounded-[2.5rem] w-full max-w-2xl space-y-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center border-b pb-6">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0f2d5c] to-gold">
                  {editItem ? "Update" : "Create"} {editType === "about" ? "Section" : "Member"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Plus className="h-8 w-8 rotate-45 text-[#0f2d5c]" /></button>
              </div>

              {editType === "about" ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 pl-1 font-serif">Heading Title</label>
                    <input
                      className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-gold outline-none transition-colors font-bold text-[#0f2d5c]"
                      placeholder="e.g. Objectives"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 pl-1 font-serif">Main Narrative</label>
                    <textarea
                      className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-gold outline-none transition-colors leading-relaxed font-medium"
                      rows={10}
                      placeholder="Detailed content..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 pl-1">Role/Designation</label>
                      <input
                        className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-gold outline-none font-bold"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 pl-1">Display Rank (Order)</label>
                      <input
                        type="number"
                        className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-gold outline-none font-bold"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 pl-1">Full Name & Details</label>
                    <textarea
                       className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-gold outline-none font-bold"
                       rows={3}
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-6 pt-8 border-t">
                <button onClick={() => setShowModal(false)} className="px-8 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors uppercase tracking-widest text-xs">Cancel Changes</button>
                <button onClick={handleSave} className="bg-[#0f2d5c] text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">Save to Database</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ICMSMECentre;
