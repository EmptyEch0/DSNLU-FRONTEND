import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, BookOpen, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

interface CommitteeMember {
  id: number;
  role: string;
  name: string;
}

const CLRAbout = () => {
  const { token } = useAdmin();

  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CommitteeMember | null>(null);

  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");

  const fetchCommittee = async () => {
    const res = await fetch(`${API}/api/centres/clr`);
    const data = await res.json();
    setCommittee(data.committee);
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const handleSave = async () => {
    if (editItem) {
      await fetch(`${API}/api/admin/centre-committee/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: formRole,
          name: formName,
        }),
      });
    } else {
      await fetch(`${API}/api/admin/centre-committee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_slug: "clr",
          role: formRole,
          name: formName,
        }),
      });
    }

    setShowModal(false);
    setEditItem(null);
    fetchCommittee();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    await fetch(`${API}/api/admin/centre-committee/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCommittee();
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
            <span className="font-medium text-gold">CLR - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1454165833965-ad9021b0abc3?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              CORPORATE LEGAL RESEARCH (CLR)
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
            
            {/* Motto Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border-l-[6px] border-gold bg-secondary/20 p-8 shadow-sm"
            >
              <Quote className="absolute -top-4 -left-4 h-10 w-10 text-gold/20" />
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm">Our Motto</span>
                <p className="font-serif text-2xl font-bold text-[#0f2d5c] italic leading-relaxed">
                  "Research, evaluation, analysis and critical thinking of Corporate, Business, and Commercial Laws."
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
              <div className="grid gap-4">
                {[
                  "Carry out extensive research and create awareness of corporate, business and commercial laws.",
                  "Organise guest lectures, workshops, seminars, symposiums, conferences and panel discussions.",
                  "Publish newsletter/report on latest legal developments quarterly or half-yearly.",
                  "Publish journals through “Call for Papers” and encourage stakeholder research contributions.",
                  "Conduct competitions (essay, mock mergers & acquisitions, employee-management disputes, etc.) at university and national level.",
                  "Collaborate with law firms through MoUs.",
                  "Collaborate with LIC, CARDS and IPR Cell for skill development programs."
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:border-gold/30 hover:shadow-md group">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                      <Target className="h-3 w-3" />
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      {obj}
                    </p>
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
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                  Committee
                </h2>
                {token && (
                  <button
                    onClick={() => {
                      setEditItem(null);
                      setFormRole("");
                      setFormName("");
                      setShowModal(true);
                    }}
                    className="bg-gold text-[#0f2d5c] px-4 py-2 rounded font-bold transition-all hover:bg-gold/90 shadow-sm"
                  >
                    + Add Member
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
                  <tbody className="divide-y text-muted-foreground">
                    {committee.map((member) => (
                      <tr key={member.id} className="hover:bg-secondary/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground bg-secondary/10">
                          {member.role}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span>{member.name}</span>

                            {token && (
                              <div className="flex gap-2">
                                <button
                                  className="p-1 px-2 border rounded hover:bg-gold/10 text-gold transition-colors"
                                  onClick={() => {
                                    setEditItem(member);
                                    setFormRole(member.role);
                                    setFormName(member.name);
                                    setShowModal(true);
                                  }}
                                >
                                  ✏️
                                </button>

                                <button
                                  className="p-1 px-2 border rounded hover:bg-red-50 text-red-500 transition-colors"
                                  onClick={() => handleDelete(member.id)}
                                >
                                  🗑️
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

          </div>
        </section>
      </main>
      <Footer />

      {/* Modal UI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl"
          >
            <h2 className="text-2xl font-serif font-bold text-[#0f2d5c]">
              {editItem ? "Edit Member" : "Add Member"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-1">Role</label>
                <input
                  className="w-full border rounded-lg p-3 outline-none focus:border-gold transition-colors"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. Faculty Member"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-1">Name</label>
                <input
                  className="w-full border rounded-lg p-3 outline-none focus:border-gold transition-colors"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold transition-all hover:bg-[#1a3a6b] shadow-md"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CLRAbout;
