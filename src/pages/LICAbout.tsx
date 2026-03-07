import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, Lightbulb, Briefcase, GraduationCap, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

const LICAbout = () => {
  const { token } = useAdmin();

  const [data, setData] = useState<any>({
    honorary: [],
    faculty: [],
    students: {},
    trainees: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formCategory, setFormCategory] = useState("");
  const [formRoleTitle, setFormRoleTitle] = useState("");
  const [formName, setFormName] = useState("");
  const [formSemester, setFormSemester] = useState("");

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/lic/committee`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormCategory(item.category);
    setFormRoleTitle(item.role_title || "");
    setFormName(item.name);
    setFormSemester(item.semester || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      category: formCategory,
      role_title: formRoleTitle,
      name: formName,
      semester: formSemester,
    };

    if (editItem) {
      await fetch(`${API}/api/admin/lic-committee/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/api/admin/lic-committee`, {
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
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    await fetch(`${API}/api/admin/lic-committee/${id}`, {
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
            <span className="font-medium text-gold">LIC - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              LEGAL INCUBATION CENTRE (LIC)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
            
            {/* Purpose Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 relative inline-block rounded-2xl border-l-4 border-gold bg-white/5 p-6 backdrop-blur-sm shadow-xl"
            >
              <p className="text-xl font-bold text-gold uppercase tracking-wider">
                Purpose: Fostering Legal Entrepreneurship and Advocacy Skills
              </p>
            </motion.div>
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
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Established in 2018 by Damodaram Sanjivayya National Law University, the Legal Incubation Centre (LIC) is a pioneering institutional mechanism designed to foster legal entrepreneurship and advocacy skills among students and professionals.
                </p>
                <p>
                  The centre's primary focus is to encourage innovative legal solutions and provide a bridge between legal theory and practical application. We aim to support aspiring legal professionals in navigating the complexities of the modern legal landscape.
                </p>
                <p>
                  As an incubation hub, LIC provides a platform for creative thinking and interdisciplinary collaboration, ensuring that the legal community is better equipped to handle real-world challenges with professional excellence.
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Lightbulb, text: "Encourage and support legal start-ups with interdisciplinary innovation" },
                  { icon: Briefcase, text: "Bridge academic knowledge and real-world legal practice" },
                  { icon: Target, text: "Provide experiential learning opportunities" },
                  { icon: Users, text: "Organise workshops on professional skills & entrepreneurship culture" },
                  { icon: GraduationCap, text: "Conduct inter-university & national-level competitions (CSI, trial advocacy, etc.)" }
                ].map((obj, i) => (
                  <div key={i} className="group flex flex-col p-6 rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-gold/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                      <obj.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#0f2d5c] leading-snug">
                      {obj.text}
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
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                  Committee
                </h2>
                {token && (
                  <button
                    onClick={() => {
                      setEditItem(null);
                      setFormCategory("");
                      setFormRoleTitle("");
                      setFormName("");
                      setFormSemester("");
                      setShowModal(true);
                    }}
                    className="bg-gold text-[#0f2d5c] px-4 py-2 rounded font-bold shadow-md hover:bg-gold/90 transition-all"
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
                    {data.honorary.map((m: any) => (
                      <tr key={m.id} className="group/item">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20 whitespace-normal">
                          {m.role_title}
                        </td>
                        <td className="px-6 py-4 flex justify-between items-center transition-all">
                          {m.name}
                          {token && (
                            <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <button onClick={() => openEdit(m)} className="p-1 hover:text-gold transition-colors">✏️</button>
                              <button onClick={() => handleDelete(m.id)} className="p-1 hover:text-red-500 transition-colors">🗑️</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {data.faculty.map((m: any) => (
                      <tr key={m.id} className="group/item">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Faculty Member</td>
                        <td className="px-6 py-4 flex justify-between items-center transition-all">
                          {m.name}
                          {token && (
                            <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <button onClick={() => openEdit(m)} className="p-1 hover:text-gold transition-colors">✏️</button>
                              <button onClick={() => handleDelete(m.id)} className="p-1 hover:text-red-500 transition-colors">🗑️</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Student Members */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Student Members
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(data.students).map(([semester, members]: any) => (
                  <div key={semester} className="p-6 rounded-2xl border bg-card shadow-sm hover:border-gold/30 transition-all">
                    <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-4">{semester}</h4>
                    <ul className="space-y-2">
                      {members.map((m: any) => (
                        <li key={m.id} className="group/item flex items-center justify-between text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                            {m.name}
                          </div>
                          {token && (
                            <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <button onClick={() => openEdit(m)} className="p-1 hover:text-gold transition-colors text-sm">✏️</button>
                              <button onClick={() => handleDelete(m.id)} className="p-1 hover:text-red-500 transition-colors text-sm">🗑️</button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trainee Members */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Trainee Members
              </h2>
              <div className="grid gap-4">
                {data.trainees.map((t: any) => (
                  <div key={t.id} className="group flex items-center justify-between p-5 rounded-xl border bg-secondary/20 hover:border-gold/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div>
                        <strong className="text-[#0f2d5c] font-bold">{t.name}</strong>
                        <span className="ml-3 text-gold text-xs font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                          {t.semester}
                        </span>
                      </div>
                      {token && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(t)} className="p-1 hover:text-gold transition-colors">✏️</button>
                          <button onClick={() => handleDelete(t.id)} className="p-1 hover:text-red-500 transition-colors">🗑️</button>
                        </div>
                      )}
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
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#0f2d5c]">
                  {editItem ? "Edit Member" : "Add Member"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <select
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="honorary">Honorary</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
                <option value="trainee">Trainee</option>
              </select>

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Role Title (if honorary/faculty)"
                value={formRoleTitle}
                onChange={(e) => setFormRoleTitle(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />

              {(formCategory === "student" || formCategory === "trainee") && (
                <input
                  className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                  placeholder="Semester"
                  value={formSemester}
                  onChange={(e) => setFormSemester(e.target.value)}
                />
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b] transition-all"
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

export default LICAbout;
