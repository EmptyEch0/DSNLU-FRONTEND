import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, BookOpen, Scale, ShieldCheck, Plus, Pencil, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface CommitteeMember {
  id: number;
  role: string;
  name: string;
  designation?: string;
}

const CWCLAbout = () => {
  const { isAdminMode, token } = useAdmin();
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CommitteeMember | null>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formDesignation, setFormDesignation] = useState("");

  const isAdmin = !!token && isAdminMode;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/centres/cwcl/full`);
      const data = await res.json();
      setCommittee(data.committee);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load CWCL data");
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
          centre_slug: "cwcl",
          role: formRole,
          name: formName,
          designation: formDesignation
        }),
      });

      if (res.ok) {
        toast.success("Member added");
        setShowModal(false);
        setFormRole("");
        setFormName("");
        setFormDesignation("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
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
        toast.success("Member updated");
        setEditItem(null);
        setFormRole("");
        setFormName("");
        setFormDesignation("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
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
            <span className="font-bold text-gold uppercase tracking-wider text-[11px]">CWCL - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              CENTRE FOR CHILD AND WOMAN LAW
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
                <p>
                  The Centre for Child and Woman Law (CWCL) at DSNLU was established to facilitate interdisciplinary research and advocacy on legal issues affecting the most vulnerable sections of society. The centre recognizes that women and children often face unique legal challenges rooted in systemic gender inequality and societal structures.
                </p>
                <p>
                  Our primary objective is to conduct rigorous research on the intersection of law, policy, and society, specifically focusing on how legal frameworks can be strengthened to protect and empower women and children. We believe that legal empowerment is a crucial step towards achieving social justice.
                </p>
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Objectives
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { icon: BookOpen, title: "Research & Capacity Building", desc: "Conducting in-depth studies and developing legal expertise on women and child rights.", bg: "bg-blue-50", text: "text-[#0f2d5c]", hover: "group-hover:bg-blue-600" },
                  { icon: ShieldCheck, title: "Awareness & Sensitization", desc: "Creating social awareness and educating the public on protective legal frameworks.", bg: "bg-gold/10", text: "text-gold", hover: "group-hover:bg-gold" },
                  { icon: Users, title: "Collaborative Engagement", desc: "Organizing guest lectures, workshops, seminars, and international conferences.", bg: "bg-secondary", text: "text-foreground", hover: "group-hover:bg-[#0f2d5c]" },
                ].map((obj, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 rounded-[32px] border bg-card shadow-sm hover:shadow-premium transition-all group border-gray-100 hover:border-gold/20">
                    <div className={cn("mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all group-hover:scale-110 group-hover:text-white", obj.bg, obj.text, obj.hover)}>
                      <obj.icon className="h-10 w-10" />
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-3 text-navy">{obj.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
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

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {committee.map((member) => (
                  <div key={member.id} className="group relative flex flex-col p-8 rounded-[32px] border bg-white shadow-premium transition-all hover:border-gold/30 hover:shadow-2xl">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-gold/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-gold/10 transition-all" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-3">
                      {member.role}
                    </p>
                    <h4 className="text-xl font-serif font-bold text-navy group-hover:text-gold transition-colors">
                      {member.name}
                    </h4>
                    {member.designation && (
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-2 italic">
                        {member.designation}
                      </p>
                    )}

                    {isAdmin && (
                      <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditItem(member);
                            setFormRole(member.role);
                            setFormName(member.name);
                            setFormDesignation(member.designation || "");
                          }}
                          className="flex-1 flex items-center justify-center gap-2 p-2.5 text-navy hover:bg-gold/10 rounded-xl transition-colors font-bold text-xs"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="flex-1 flex items-center justify-center gap-2 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-xs"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    )}
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

export default CWCLAbout;
