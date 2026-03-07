import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark, User, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

interface RTIOfficer {
  id: number;
  role: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  display_order: number;
}

interface RTIPage {
  id: number;
  payment_content: string;
}

const API = import.meta.env.VITE_API_URL;

const RTIAct = () => {
  const [page, setPage] = useState<RTIPage | null>(null);
  const [officers, setOfficers] = useState<RTIOfficer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAdmin();

  // Page edit state
  const [editingPage, setEditingPage] = useState(false);
  const [pageContent, setPageContent] = useState("");

  // Officer modal state
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [editOfficer, setEditOfficer] = useState<RTIOfficer | null>(null);
  const [officerForm, setOfficerForm] = useState({
    role: "", name: "", designation: "", email: "", phone: "", address: "",
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/rti`);
      const data = await res.json();
      setPage(data.page);
      setOfficers(data.officers);
      if (data.page) setPageContent(data.page.payment_content || "");
    } catch (err) {
      setError("Failed to load RTI data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- Page content handlers ---
  const handleSavePage = async () => {
    if (!page) return;
    await fetch(`${API}/api/rti/page`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: page.id, payment_content: pageContent }),
    });
    setEditingPage(false);
    fetchData();
  };

  // --- Officer handlers ---
  const handleAddOfficer = async () => {
    await fetch(`${API}/api/rti/officer`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(officerForm),
    });
    setShowOfficerModal(false);
    resetOfficerForm();
    fetchData();
  };

  const handleEditOfficer = async () => {
    if (!editOfficer) return;
    await fetch(`${API}/api/rti/officer/${editOfficer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(officerForm),
    });
    setEditOfficer(null);
    setShowOfficerModal(false);
    resetOfficerForm();
    fetchData();
  };

  const handleDeleteOfficer = async (id: number) => {
    if (!confirm("Are you sure you want to remove this officer?")) return;
    await fetch(`${API}/api/rti/officer/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const openEditOfficer = (officer: RTIOfficer) => {
    setEditOfficer(officer);
    setOfficerForm({
      role: officer.role, name: officer.name, designation: officer.designation,
      email: officer.email, phone: officer.phone, address: officer.address,
    });
    setShowOfficerModal(true);
  };

  const resetOfficerForm = () => {
    setOfficerForm({ role: "", name: "", designation: "", email: "", phone: "", address: "" });
  };

  const saveOrder = async (updated: RTIOfficer[]) => {
    const orders = updated.map((o, i) => ({ id: o.id, order: i + 1 }));
    await fetch(`${API}/api/rti/officer/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orders }),
    });
  };

  const moveUp = (id: number) => {
    const index = officers.findIndex((o) => o.id === id);
    if (index === 0) return;
    const updated = [...officers];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setOfficers(updated);
    saveOrder(updated);
  };

  const moveDown = (id: number) => {
    const index = officers.findIndex((o) => o.id === id);
    if (index === officers.length - 1) return;
    const updated = [...officers];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setOfficers(updated);
    saveOrder(updated);
  };

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center"><p className="text-red-500">{error}</p></main>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compliance & Media</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">RTI Act</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
            >
              Compliance & Media
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              RTI ACT
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
          <div className="container max-w-4xl">
            <div className="space-y-16">
              {/* Payment Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 rounded-full bg-gold" />
                  <h2 className="font-serif text-3xl font-bold text-foreground">1. Payment of RTI Fees</h2>
                  {token && !editingPage && (
                    <button onClick={() => setEditingPage(true)} className="ml-auto bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors">✏️</button>
                  )}
                </div>

                {editingPage && token ? (
                  <div className="space-y-4">
                    <textarea
                      className="w-full border p-3 rounded min-h-[200px] font-mono text-sm"
                      value={pageContent}
                      onChange={(e) => setPageContent(e.target.value)}
                      placeholder="HTML content for payment section..."
                    />
                    <div className="flex gap-3">
                      <button onClick={handleSavePage} className="px-4 py-2 bg-navy text-gold rounded font-bold">Save</button>
                      <button onClick={() => setEditingPage(false)} className="px-4 py-2 border rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: page?.payment_content || "" }}
                  />
                )}
              </motion.div>

              {/* Officers Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1 rounded-full bg-gold" />
                  <h2 className="font-serif text-3xl font-bold text-foreground">2. RTI Officers</h2>
                  {token && (
                    <button
                      onClick={() => { setEditOfficer(null); resetOfficerForm(); setShowOfficerModal(true); }}
                      className="ml-auto px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      + Add Officer
                    </button>
                  )}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {officers?.map((officer) => (
                    <motion.div
                      key={officer.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative rounded-2xl border bg-card p-8 shadow-sm space-y-6"
                    >
                      {/* Admin controls */}
                      {token && (
                        <div className="absolute top-4 right-4 flex gap-1">
                          <button onClick={() => openEditOfficer(officer)} title="Edit" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">✏️</button>
                          <button onClick={() => handleDeleteOfficer(officer.id)} title="Delete" className="bg-white/90 p-1.5 rounded shadow hover:bg-red-50 transition-colors text-sm">🗑️</button>
                          <button onClick={() => moveUp(officer.id)} title="Move Up" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">⬆️</button>
                          <button onClick={() => moveDown(officer.id)} title="Move Down" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">⬇️</button>
                        </div>
                      )}

                      <div className="flex items-center gap-3 border-b pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                          <Landmark className="h-5 w-5" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-foreground">{officer.role}</h3>
                      </div>

                      <div className="space-y-5">
                        <div className="flex gap-4">
                          <User className="h-5 w-5 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Name</p>
                            <p className="font-medium text-foreground">{officer.name}</p>
                            <p className="text-sm text-muted-foreground">{officer.designation}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Mail className="h-5 w-5 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Email</p>
                            <a href={`mailto:${officer.email}`} className="font-medium text-foreground hover:text-gold transition-colors">{officer.email}</a>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Phone className="h-5 w-5 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Phone</p>
                            <p className="font-medium text-foreground">{officer.phone}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Address</p>
                            <p className="text-sm text-foreground">{officer.address}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Officer Add/Edit Modal */}
      {showOfficerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold">{editOfficer ? "Edit Officer" : "Add Officer"}</h2>
            <input className="w-full border p-2 rounded" value={officerForm.role} onChange={(e) => setOfficerForm({ ...officerForm, role: e.target.value })} placeholder="Role (e.g. Public Information Officer)" />
            <input className="w-full border p-2 rounded" value={officerForm.name} onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })} placeholder="Name" />
            <input className="w-full border p-2 rounded" value={officerForm.designation} onChange={(e) => setOfficerForm({ ...officerForm, designation: e.target.value })} placeholder="Designation" />
            <input className="w-full border p-2 rounded" value={officerForm.email} onChange={(e) => setOfficerForm({ ...officerForm, email: e.target.value })} placeholder="Email" />
            <input className="w-full border p-2 rounded" value={officerForm.phone} onChange={(e) => setOfficerForm({ ...officerForm, phone: e.target.value })} placeholder="Phone" />
            <input className="w-full border p-2 rounded" value={officerForm.address} onChange={(e) => setOfficerForm({ ...officerForm, address: e.target.value })} placeholder="Address" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => { setShowOfficerModal(false); setEditOfficer(null); }} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={editOfficer ? handleEditOfficer : handleAddOfficer} className="px-4 py-2 bg-navy text-gold rounded font-bold">
                {editOfficer ? "Save Changes" : "Add Officer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RTIAct;
