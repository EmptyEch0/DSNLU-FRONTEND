import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Target, 
  Eye, 
  Users, 
  FileText, 
  BookOpen, 
  Plus, 
  Trash2, 
  Pencil,
  Download,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { groupByRole, cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface CommitteeMember {
  id: number;
  role: string;
  name: string;
  designation?: string;
  display_order?: number;
}

interface Publication {
  id: number;
  title: string;
  subtitle: string;
  pdf_url: string;
  is_published: boolean;
  display_order: number;
}

interface CentreData {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const CADRAbout = () => {
  const { isAdminMode, token } = useAdmin();
  const [data, setData] = useState<{
    centre: CentreData;
    committee: CommitteeMember[];
    publications: Publication[];
  } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CommitteeMember | null>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formDesignation, setFormDesignation] = useState("");

  const isAdmin = !!token && isAdminMode;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/centres/cadr`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load centre data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API}/api/admin/committee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_slug: "cadr",
          role: formRole,
          name: formName,
          designation: formDesignation
        }),
      });

      if (res.ok) {
        toast.success("Member added successfully");
        setShowModal(false);
        setFormRole("");
        setFormName("");
        setFormDesignation("");
        fetchData();
      } else {
        toast.error("Failed to add member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleEdit = async () => {
    if (!editItem) return;

    try {
      const res = await fetch(`${API}/api/admin/committee/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: formRole,
          name: formName,
          designation: formDesignation
        }),
      });

      if (res.ok) {
        toast.success("Member updated successfully");
        setEditItem(null);
        setFormRole("");
        setFormName("");
        setFormDesignation("");
        fetchData();
      } else {
        toast.error("Failed to update member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      const res = await fetch(`${API}/api/admin/committee/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Member deleted");
        fetchData();
      } else {
        toast.error("Failed to delete member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const deletePublication = async (id: number) => {
    if (!confirm("Delete this publication?")) return;
    try {
      const res = await fetch(`${API}/api/admin/publication/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        toast.success("Publication deleted");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin border-4 border-gold border-t-transparent rounded-full" />
        </main>
        <Footer />
      </div>
    );
  }

  const groupedCommittee = data ? groupByRole(data.committee) : {};

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold uppercase tracking-wider text-[11px] font-bold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold uppercase tracking-wider text-[11px] font-bold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-bold text-gold uppercase tracking-wider text-[11px]">{data?.centre.slug.toUpperCase()} - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              {data?.centre.name.toUpperCase()}
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl text-white/80 max-w-2xl mx-auto italic font-light"
            >
              Promoting excellence in ADR through research, training, and academia.
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-20">
            
            {/* Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8 border-l-4 border-gold pl-6">
                Introduction
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-wrap">
                  {data?.centre.description}
                </p>
              </div>
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                  Committee
                </h2>
                {isAdmin && (
                  <button 
                    onClick={() => {
                      setShowModal(true);
                      setFormRole("");
                      setFormName("");
                      setFormDesignation("");
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gold text-[#0f2d5c] rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm"
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </button>
                )}
              </div>
              
              <div className="overflow-hidden rounded-[32px] border bg-white shadow-premium">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy text-gold">
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Role</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Name & Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(groupedCommittee).map(([role, members]) => (
                      members.map((member, index) => (
                        <tr key={member.id} className="group hover:bg-gold/5 transition-colors">
                          {index === 0 && (
                            <td 
                              className="px-8 py-6 font-bold text-navy text-xs uppercase tracking-wider bg-secondary/10 border-r" 
                              rowSpan={members.length}
                            >
                              {role}
                            </td>
                          )}
                          <td className="px-8 py-6 flex justify-between items-center group/cell">
                            <div>
                              <div className="font-bold text-navy">{member.name}</div>
                              {member.designation && (
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 italic">
                                  {member.designation}
                                </div>
                              )}
                            </div>

                            {isAdmin && (
                              <div className="flex gap-2 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditItem(member);
                                    setFormRole(member.role);
                                    setFormName(member.name);
                                    setFormDesignation(member.designation || "");
                                  }}
                                  className="p-2 text-navy hover:bg-gold/10 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(member.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Publication Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Publications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.publications.filter(p => p.is_published || isAdmin).map((pub) => (
                  <div key={pub.id} className="relative group overflow-hidden rounded-[32px] border bg-white p-8 shadow-sm transition-all hover:shadow-premium hover:border-gold/30">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gold/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:bg-gold/10 transition-colors" />
                    
                    <div className="relative flex items-start gap-6">
                      <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-gold/20 bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white transition-all">
                        <FileText className="h-8 w-8" />
                        {!pub.is_published && <span className="text-[8px] font-bold uppercase mt-1">Draft</span>}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors leading-tight">
                          {pub.title}
                        </h4>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                          {pub.subtitle}
                        </p>
                        <div className="flex items-center gap-4">
                           <a 
                             href={`${API}/${pub.pdf_url}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-navy transition-colors"
                           >
                             <Download className="h-3 w-3" /> View Document
                           </a>
                          {isAdmin && (
                            <button 
                              onClick={() => deletePublication(pub.id)}
                              className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {(showModal || editItem) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="bg-navy p-6 flex justify-between items-center text-white">
                <h2 className="text-xl font-serif font-bold text-gold flex items-center gap-3">
                  {editItem ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {editItem ? "Edit Member" : "Add Member"}
                </h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setEditItem(null);
                  }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Role</label>
                  <input
                    className="w-full bg-secondary/20 border-0 rounded-xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Faculty Member"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                  <input
                    className="w-full bg-secondary/20 border-0 rounded-xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Dr. John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Designation (Optional)</label>
                  <input
                    className="w-full bg-secondary/20 border-0 rounded-xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    placeholder="e.g. Assistant Professor"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditItem(null);
                    }}
                    className="flex-1 px-6 py-4 border-2 border-navy/10 rounded-2xl font-bold text-navy hover:bg-navy/5 transition-all text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={editItem ? handleEdit : handleAdd}
                    className="flex-1 px-6 py-4 bg-navy text-gold rounded-2xl font-bold hover:scale-105 transition-all shadow-lg text-sm"
                  >
                    {editItem ? "Save Changes" : "Confirm addition"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CADRAbout;
