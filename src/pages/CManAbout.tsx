import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Anchor, ShieldCheck, Globe, Users, Target, Briefcase, GraduationCap, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

const CManAbout = () => {
  const { token } = useAdmin();
  const [committee, setCommittee] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formYear, setFormYear] = useState("");
  const [formCategory, setFormCategory] = useState("committee");
  const [formOrder, setFormOrder] = useState(1);

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/cman/committee`);
      const data = await res.json();
      setCommittee(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching C-MAN committee:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API}/api/centres/cman/students`);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching C-MAN students:", error);
    }
  };

  useEffect(() => {
    fetchCommittee();
    fetchStudents();
  }, []);

  const openEdit = (item: any, category: string) => {
    setEditItem(item);
    setFormRole(item.role || "");
    setFormName(item.name);
    setFormYear(item.year_label || "");
    setFormCategory(category);
    setFormOrder(item.display_order || 1);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload: any = {
      name: formName,
      display_order: formOrder,
    };

    if (formCategory === "committee") {
      payload.role = formRole;
    } else {
      payload.year_label = formYear;
      payload.category = formCategory; // student_member, convenor, co-convenor
    }

    const url = formCategory === "committee" 
      ? "/api/admin/cman/committee" 
      : "/api/admin/cman/students";

    try {
      if (editItem) {
        await fetch(`${API}${url}/${editItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API}${url}`, {
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
      fetchStudents();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleDelete = async (id: number, type: string) => {
    if (!confirm("Delete this member?")) return;

    const url = type === "committee" 
      ? `/api/admin/cman/committee/${id}` 
      : `/api/admin/cman/students/${id}`;

    try {
      await fetch(`${API}${url}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCommittee();
      fetchStudents();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // --- Grouping Logic ---
  const convenor = students.find(s => s.category === "convenor");
  const coConvenor = students.find(s => s.category === "co-convenor");
  const groupedStudents = students
    .filter(s => s.category === "student_member")
    .reduce((acc: any, curr: any) => {
      if (!acc[curr.year_label]) acc[curr.year_label] = [];
      acc[curr.year_label].push(curr);
      return acc;
    }, {});

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
            <span className="font-medium text-gold">C-MAN - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src="https://dsnlu.ac.in/storage/2024/09/IMG-20240823-WA0006-300x300.jpg" 
                alt="C-MAN Logo" 
                className="h-32 w-32 rounded-full border-4 border-gold shadow-lg"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <motion.h1 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-serif text-2xl font-bold text-white md:text-4xl uppercase tracking-wider"
                  >
                    Centre for Maritime, Admiralty & Navigation Laws (C-MAN)
                  </motion.h1>
                  {token && (
                    <div className="flex gap-2">
                       <button
                        onClick={() => {
                          setEditItem(null);
                          setFormRole("");
                          setFormName("");
                          setFormCategory("committee");
                          setFormOrder(committee.length + 1);
                          setShowModal(true);
                        }}
                        className="bg-gold text-[#0f2d5c] px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-gold/90 transition-all shadow-md whitespace-nowrap"
                      >
                        + Committee
                      </button>
                      <button
                        onClick={() => {
                          setEditItem(null);
                          setFormName("");
                          setFormYear("");
                          setFormCategory("student_member");
                          setFormOrder(students.length + 1);
                          setShowModal(true);
                        }}
                        className="bg-white text-[#0f2d5c] px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-white/90 transition-all shadow-md whitespace-nowrap"
                      >
                        + Student
                      </button>
                    </div>
                  )}
                </div>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-6 h-1 w-24 rounded-full bg-gold mx-auto md:mx-0" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-24">
            
            {/* About the Centre */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8 border-l-4 border-gold pl-6">
                About the Centre
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                <p>
                  Established on **29 July 2024**, the Centre for Maritime, Admiralty & Navigation Laws (C-MAN) is a specialized research core at DSNLU. The centre was established with a vision to strengthen the foundations of maritime and shipping law research in India.
                </p>
                <p>
                  Located in Visakhapatnam, a city that serves as a major gateway port and the headquarters of the Eastern Naval Command, C-MAN is uniquely positioned to bridge the gap between academic study and the practical complexities of the maritime sector.
                </p>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-[#0f2d5c] text-white shadow-xl relative overflow-hidden"
            >
              <Anchor className="absolute top-0 right-0 p-10 h-40 w-40 text-gold opacity-10" />
              <h3 className="font-serif text-3xl font-bold text-gold mb-12 uppercase tracking-widest text-center">Vision & Mission</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { icon: ShieldCheck, text: "Advance maritime policy and legal frameworks" },
                   { icon: Globe, text: "Protect and preserve the global marine environment" },
                   { icon: Briefcase, text: "Promote safe, efficient and sustainable shipping" },
                   { icon: Target, text: "Support economic growth through maritime excellence" }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center text-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-gold">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-white/90 leading-snug">{item.text}</p>
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
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
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
                            <span>{member.name}</span>
                            {token && (
                              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
                                <button 
                                  onClick={() => openEdit(member, "committee")}
                                  className="text-gold hover:text-gold/80 transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(member.id, "committee")}
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
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Centre Composition */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Centre Composition (AY 2025–26)
              </h2>

              {/* Office Bearers */}
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Convenor */}
                <div className="relative group">
                  <div className="p-8 rounded-3xl border-2 border-gold/30 bg-gold/5 flex items-center gap-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                    <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold group-hover:text-[#0f2d5c]">
                      <Users className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-white/80">Student Convenor</p>
                      <h4 className="font-serif text-xl font-bold">{convenor?.name || "TBA"}</h4>
                      <span className="text-xs font-bold opacity-70">{convenor?.year_label || "-"}</span>
                    </div>
                  </div>
                  {token && convenor && (
                    <div className="absolute top-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEdit(convenor, "convenor")}
                        className="p-1 px-2 bg-white/20 text-white rounded text-[8px] font-bold uppercase hover:bg-white/40"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Co-Convenor */}
                <div className="relative group">
                  <div className="p-8 rounded-3xl border-2 border-gold/30 bg-gold/5 flex items-center gap-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                    <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold group-hover:text-[#0f2d5c]">
                      <Users className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-white/80">Student Co-Convenor</p>
                      <h4 className="font-serif text-xl font-bold">{coConvenor?.name || "TBA"}</h4>
                      <span className="text-xs font-bold opacity-70">{coConvenor?.year_label || "-"}</span>
                    </div>
                  </div>
                  {token && coConvenor && (
                    <div className="absolute top-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEdit(coConvenor, "co-convenor")}
                        className="p-1 px-2 bg-white/20 text-white rounded text-[8px] font-bold uppercase hover:bg-white/40"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Members Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                 {Object.keys(groupedStudents).map((year, i) => (
                   <div key={i} className="p-6 rounded-2xl border bg-card shadow-sm hover:border-gold/30 hover:shadow-md transition-all">
                      <h4 className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-6">
                        <GraduationCap className="h-4 w-4" />
                        {year}
                      </h4>
                      <ul className="space-y-3">
                        {groupedStudents[year].map((m: any) => (
                          <li key={m.id} className="flex flex-col gap-1 text-sm font-medium text-muted-foreground group/item">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-gold/30 group-hover/item:bg-gold transition-colors" />
                              {m.name}
                            </div>
                            {token && (
                              <div className="flex gap-3 text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity ml-3">
                                <button 
                                  onClick={() => openEdit(m, "student_member")}
                                  className="text-gold uppercase font-bold hover:text-gold/80"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(m.id, "student_member")}
                                  className="text-red-500 uppercase font-bold hover:text-red-400"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
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
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-xl font-bold text-[#0f2d5c]">{editItem ? "Edit Entry" : "Add Entry"}</h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="h-6 w-6" /></button>
              </div>
              
              <div className="space-y-4">
                {formCategory === "committee" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0f2d5c]">Role</label>
                    <input className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors" value={formRole} onChange={(e) => setFormRole(e.target.value)} placeholder="e.g. Faculty Member" />
                  </div>
                )}

                {formCategory !== "committee" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0f2d5c]">Year Label</label>
                    <input className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors" value={formYear} onChange={(e) => setFormYear(e.target.value)} placeholder="e.g. IV Year" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Name</label>
                  <input className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Full Name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f2d5c]">Display Order</label>
                  <input type="number" className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))} />
                </div>

                {formCategory !== "committee" && !editItem && (
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0f2d5c]">Category</label>
                    <select className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors" value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                      <option value="student_member">Student Member</option>
                      <option value="convenor">Convenor</option>
                      <option value="co-convenor">Co-Convenor</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground">Cancel</button>
                <button onClick={handleSave} className="bg-[#0f2d5c] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]">Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CManAbout;
