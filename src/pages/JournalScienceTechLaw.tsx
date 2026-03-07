import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Info,
  Users,
  BookOpen,
  Archive,
  Download,
  ExternalLink,
  Mail,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";

import { useLocation } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const tabs = [
  { id: "about", label: "ABOUT THE JOURNAL", icon: Info },
  { id: "guidelines", label: "SUBMISSION GUIDELINES", icon: FileText },
  { id: "board", label: "EDITORIAL BOARD & ADVISORY BOARD", icon: Users },
  { id: "current", label: "CURRENT ISSUES", icon: BookOpen },
  { id: "archives", label: "ARCHIVES", icon: Archive },
];

export const JournalScienceTechLaw = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const { token } = useAdmin();

  // Dynamic state
  const [about, setAbout] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [guidelines, setGuidelines] = useState<any[]>([]);
  const [wordLimits, setWordLimits] = useState<any[]>([]);
  const [board, setBoard] = useState<any[]>([]);
  const [archives, setArchives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin inline editing
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutDraft, setAboutDraft] = useState("");

  // Generic modal
  const [modal, setModal] = useState<{ type: string; item: any } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API}/api/journal/full`);
      const data = await res.json();

      setAbout(data?.about?.content || "");
      setContacts(Array.isArray(data?.contacts) ? data.contacts : []);
      setGuidelines(Array.isArray(data?.guidelines) ? data.guidelines : []);
      setWordLimits(Array.isArray(data?.wordLimits) ? data.wordLimits : []);
      setBoard(Array.isArray(data?.board) ? data.board : []);
      setArchives(Array.isArray(data?.archives) ? data.archives : []);
    } catch (err) {
      console.error("Journal fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // --- About ---
  const saveAbout = async () => {
    await fetch(`${API}/api/journal/about`, { method: "PUT", headers: authHeaders(), body: JSON.stringify({ content: aboutDraft }) });
    setAbout(aboutDraft);
    setEditingAbout(false);
  };

  // --- Generic CRUD helpers ---
  const saveItem = async (endpoint: string, data: any, id?: number) => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${API}/api/journal/${endpoint}/${id}`
        : `${API}/api/journal/${endpoint}`;

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(data),
      });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${result.error || "Unable to save item"}`);
        return;
      }

      alert(`✅ Successfully ${id ? "updated" : "added"}!`);
      setModal(null);
      fetchAll();
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("❌ Server error. Please try again.");
    }
  };

  const deleteItem = async (endpoint: string, id: number) => {
    if (!confirm("Delete this item?")) return;

    try {
      const res = await fetch(`${API}/api/journal/${endpoint}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/admin/login";
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${result.error || "Unable to delete"}`);
        return;
      }

      alert("✅ Deleted successfully!");
      fetchAll();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("❌ Server error.");
    }
  };

  const openModal = (type: string, item?: any) => {
    setModal({ type, item: item || null });
    setFormData(item ? { ...item } : {});
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-[#f8f9fa]">
          <div className="container flex items-center gap-2 py-4 text-[11px] text-gray-500 font-sans tracking-tight">
            <Link to="/" className="transition-colors hover:text-[#0f2d5c] uppercase font-bold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase font-bold">Publications</span>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase font-bold">Journals</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold uppercase font-bold">Journal of Science, Technology & Law</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d5c] via-[#1a3d7c] to-[#0f2d5c] opacity-90" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" aria-hidden="true" />
          <div className="container relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              DSNLU JOURNAL OF SCIENCE, TECHNOLOGY & LAW
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mx-auto h-1 w-32 rounded-full bg-[#c9a227] shadow-lg" />
          </div>
        </section>

        {/* Sub-Nav */}
        <div className="sticky top-[72px] md:top-[100px] z-[40] border-b bg-white shadow-sm">
          <div className="container">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar scroll-smooth">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={cn("group relative flex items-center gap-2.5 px-6 py-5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap", activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-500 hover:text-[#0f2d5c]")}>
                  <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-400 group-hover:text-[#0f2d5c]")} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="journalTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c9a227]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-16 lg:py-24">
          <AnimatePresence mode="wait">
            {/* ====== ABOUT ====== */}
            {activeTab === "about" && (
              <motion.section key="about" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">ABOUT THE JOURNAL</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />

                  {/* Editable about content */}
                  {editingAbout ? (
                    <div className="space-y-4">
                      <textarea className="w-full border p-4 rounded-lg min-h-[200px]" value={aboutDraft} onChange={(e) => setAboutDraft(e.target.value)} />
                      <div className="flex gap-3">
                        <button onClick={saveAbout} className="px-4 py-2 bg-navy text-gold rounded font-bold text-sm">Save</button>
                        <button onClick={() => setEditingAbout(false)} className="px-4 py-2 border rounded text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                      <p>{about}</p>
                      {token && (
                        <button onClick={() => { setAboutDraft(about); setEditingAbout(true); }} className="text-xs bg-white border px-3 py-1 rounded shadow hover:bg-gold/10">✏️ Edit About</button>
                      )}
                    </div>
                  )}
                </div>

                {/* Contacts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  {token && (
                    <div className="md:col-span-2 flex justify-end">
                      <button onClick={() => openModal("contact")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Contact</button>
                    </div>
                  )}
                  {contacts.map((c) => (
                    <div key={c.id} className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      {token && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button onClick={() => openModal("contact", c)} className="bg-white/90 p-1 rounded shadow text-xs">✏️</button>
                          <button onClick={() => deleteItem("contacts", c.id)} className="bg-white/90 p-1 rounded shadow text-xs">🗑️</button>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-full bg-[#0f2d5c]/5 flex items-center justify-center text-[#0f2d5c]">
                          <User className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-[#0f2d5c] text-lg">{c.role}</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="font-serif text-xl font-bold">{c.name}</p>
                        {c.email && (
                          <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors text-sm">
                            <Mail className="h-4 w-4" /> {c.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ====== GUIDELINES ====== */}
            {activeTab === "guidelines" && (
              <motion.section key="guidelines" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">SUBMISSION GUIDELINES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                {token && (
                  <div className="flex justify-end">
                    <button onClick={() => openModal("guideline")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Guideline</button>
                  </div>
                )}

                <div className="space-y-10">
                  {guidelines.map((g) => (
                    <div key={g.id} className="relative space-y-4">
                      {token && (
                        <div className="absolute top-0 right-0 flex gap-1">
                          <button onClick={() => openModal("guideline", g)} className="bg-white/90 p-1 rounded shadow text-xs">✏️</button>
                          <button onClick={() => deleteItem("guidelines", g.id)} className="bg-white/90 p-1 rounded shadow text-xs">🗑️</button>
                        </div>
                      )}
                      <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">{g.section_title}</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{g.content}</p>
                    </div>
                  ))}
                </div>

                {/* Word Limits */}
                <div className="space-y-6 pt-4">
                  <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Word Limits</h3>
                  {token && (
                    <div className="flex justify-end">
                      <button onClick={() => openModal("wordlimit")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Word Limit</button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {wordLimits.map((w) => (
                      <div key={w.id} className="relative bg-white p-6 rounded-xl border border-gray-100 text-center">
                        {token && (
                          <div className="absolute top-1 right-1 flex gap-1">
                            <button onClick={() => openModal("wordlimit", w)} className="text-xs p-1">✏️</button>
                            <button onClick={() => deleteItem("wordlimits", w.id)} className="text-xs p-1">🗑️</button>
                          </div>
                        )}
                        <p className="text-[#0f2d5c] font-bold text-lg">{w.min_words}–{w.max_words}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{w.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <Button variant="outline" className="border-[#0f2d5c] text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white" asChild>
                    <a href="mailto:ipr@dsnlu.ac.in"><Mail className="mr-2 h-4 w-4" /> Contact ipr@dsnlu.ac.in</a>
                  </Button>
                  <Button className="bg-[#c9a227] text-white hover:bg-[#b08d20]" asChild>
                    <a href="https://dsnlu.ac.in/dsnlu-journal-of-science-technology-and-law/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Previous Issues Link
                    </a>
                  </Button>
                </div>
              </motion.section>
            )}

            {/* ====== BOARD ====== */}
            {activeTab === "board" && (
              <motion.section key="board" {...fadeIn} className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">EDITORIAL BOARD & ADVISORY BOARD</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                {token && (
                  <div className="flex justify-end">
                    <button onClick={() => openModal("board")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Board Member</button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Editors (Honorary / Chief / etc) */}
                  <div className="space-y-8">
                    {board.filter(b => b.board_type !== "Advisory Board" && b.board_type !== "Editorial Board").map((m) => (
                      <div key={m.id} className="relative space-y-4">
                        {token && (
                          <div className="absolute top-0 right-0 flex gap-1">
                            <button onClick={() => openModal("board", m)} className="text-xs p-1">✏️</button>
                            <button onClick={() => deleteItem("board", m.id)} className="text-xs p-1">🗑️</button>
                          </div>
                        )}
                        <h3 className="font-bold text-[#c9a227] uppercase tracking-[0.2em] text-xs">{m.board_type}</h3>
                        <div>
                          <p className="font-serif text-2xl font-bold text-[#0f2d5c]">{m.name}</p>
                          {m.designation && <p className="text-gray-600">{m.designation}</p>}
                          {m.email && <a href={`mailto:${m.email}`} className="text-sm text-gray-400 hover:text-[#c9a227]">{m.email}</a>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-12">
                    {/* Advisory Board */}
                    <div className="space-y-6">
                      <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Advisory Board</h3>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {board.filter(b => b.board_type === "Advisory Board").map((m) => (
                          <li key={m.id} className="relative pb-2 border-b border-gray-50 flex items-start gap-2">
                            <div className="h-1 w-1 bg-[#c9a227] mt-2 rounded-full" />
                            {m.name}{m.designation ? ` - ${m.designation}` : ""}
                            {token && (
                              <span className="ml-auto flex gap-1 shrink-0">
                                <button onClick={() => openModal("board", m)} className="text-xs">✏️</button>
                                <button onClick={() => deleteItem("board", m.id)} className="text-xs">🗑️</button>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Editorial Board */}
                    <div className="space-y-6">
                      <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Editorial Board</h3>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {board.filter(b => b.board_type === "Editorial Board").map((m) => (
                          <li key={m.id} className="relative pb-2 border-b border-gray-50 flex items-start gap-2">
                            <div className="h-1 w-1 bg-[#c9a227] mt-2 rounded-full" />
                            {m.name}{m.designation ? ` - ${m.designation}` : ""}
                            {token && (
                              <span className="ml-auto flex gap-1 shrink-0">
                                <button onClick={() => openModal("board", m)} className="text-xs">✏️</button>
                                <button onClick={() => deleteItem("board", m.id)} className="text-xs">🗑️</button>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ====== CURRENT ISSUES (static) ====== */}
            {activeTab === "current" && (
              <motion.section key="current" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">CURRENT ISSUES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-[#0f2d5c]/5 rounded-xl border-2 border-white flex items-center justify-center p-6 text-[#0f2d5c]/20">
                    <BookOpen className="h-24 w-24" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">DSNLU Journal of Science, Technology & Law</h3>
                      <p className="text-gold font-bold uppercase tracking-widest text-sm">DJSTL_Vol. 3_Issue 2</p>
                    </div>
                    <p className="text-gray-500 leading-relaxed italic">
                      Explore the latest issue featuring seminal research on IP and Technology Law.
                    </p>
                    <Button className="w-full md:w-auto bg-[#0f2d5c] text-white hover:bg-[#1a3d7c] border border-[#c9a227] h-12 px-10 transition-transform active:scale-95" asChild>
                      <a href="https://dsnlu.ac.in/storage/2024/11/DJSTL_Vol-3_-issue-_2-1-2.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-5 w-5" /> VIEW FILE
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ====== ARCHIVES ====== */}
            {activeTab === "archives" && (
              <motion.section key="archives" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">ARCHIVES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                {token && (
                  <div className="flex justify-end">
                    <button onClick={() => openModal("archive")} className="px-4 py-2 bg-navy text-gold rounded-full font-bold text-sm">+ Add Archive</button>
                  </div>
                )}

                <div className="grid gap-6">
                  {archives.map((issue) => (
                    <div key={issue.id} className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                      {token && (
                        <div className="absolute top-2 right-16 flex gap-1">
                          <button onClick={() => openModal("archive", issue)} className="text-xs p-1">✏️</button>
                          <button onClick={() => deleteItem("archives", issue.id)} className="text-xs p-1">🗑️</button>
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#0f2d5c]/5 flex items-center justify-center text-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-white transition-colors">
                          <Archive className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-[#0f2d5c]">{issue.title}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#0f2d5c] hover:text-[#c9a227] hover:bg-transparent font-bold uppercase tracking-widest text-[10px]" asChild>
                        <a href={issue.file_url} target="_blank" rel="noopener noreferrer">
                          VIEW FILE <ChevronRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* ====== GENERIC ADMIN MODAL ====== */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold capitalize">{modal.item ? "Edit" : "Add"} {modal.type}</h2>

            {/* Contact form */}
            {modal.type === "contact" && (
              <>
                <input className="w-full border p-2 rounded" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Role (e.g. Faculty Convenor)" />
                <input className="w-full border p-2 rounded" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
                <input className="w-full border p-2 rounded" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
              </>
            )}

            {/* Guideline form */}
            {modal.type === "guideline" && (
              <>
                <input className="w-full border p-2 rounded" value={formData.section_title || ""} onChange={(e) => setFormData({ ...formData, section_title: e.target.value })} placeholder="Section Title" />
                <textarea className="w-full border p-2 rounded min-h-[120px]" value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Content" />
              </>
            )}

            {/* Word Limit form */}
            {modal.type === "wordlimit" && (
              <>
                <input className="w-full border p-2 rounded" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Category (e.g. Long Articles)" />
                <input className="w-full border p-2 rounded" type="number" value={formData.min_words || ""} onChange={(e) => setFormData({ ...formData, min_words: Number(e.target.value) })} placeholder="Min Words" />
                <input className="w-full border p-2 rounded" type="number" value={formData.max_words || ""} onChange={(e) => setFormData({ ...formData, max_words: Number(e.target.value) })} placeholder="Max Words" />
              </>
            )}

            {/* Board form */}
            {modal.type === "board" && (
              <>
                <select className="w-full border p-2 rounded" value={formData.board_type || ""} onChange={(e) => setFormData({ ...formData, board_type: e.target.value })}>
                  <option value="">Select Board Type</option>
                  <option value="Honorary Editor">Honorary Editor</option>
                  <option value="Chief Editor">Chief Editor</option>
                  <option value="Advisory Board">Advisory Board</option>
                  <option value="Editorial Board">Editorial Board</option>
                </select>
                <input className="w-full border p-2 rounded" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
                <input className="w-full border p-2 rounded" value={formData.designation || ""} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} placeholder="Designation" />
                <input className="w-full border p-2 rounded" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
              </>
            )}

            {/* Archive form */}
            {modal.type === "archive" && (
              <>
                <input className="w-full border p-2 rounded" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title (e.g. Vol. 2 Issue 1 (2022))" />
                <input className="w-full border p-2 rounded" type="number" value={formData.year || ""} onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })} placeholder="Year" />
                <input className="w-full border p-2 rounded" value={formData.file_url || ""} onChange={(e) => setFormData({ ...formData, file_url: e.target.value })} placeholder="File URL" />
              </>
            )}

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={() => {
                  const endpoint = modal.type === "contact" ? "contacts"
                    : modal.type === "guideline" ? "guidelines"
                    : modal.type === "wordlimit" ? "wordlimits"
                    : modal.type === "board" ? "board"
                    : "archives";
                  saveItem(endpoint, formData, modal.item?.id);
                }}
                className="px-4 py-2 bg-navy text-gold rounded font-bold"
              >
                {modal.item ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalScienceTechLaw;
