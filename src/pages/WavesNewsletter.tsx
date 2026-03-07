import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicationsHeader } from "@/components/layout/PublicationsHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface Newsletter {
  id: number;
  title: string;
  slug: string;
  cover_image_url: string;
  display_order: number;
}

const API = import.meta.env.VITE_API_URL;

export const WavesNewsletter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { token } = useAdmin();

  // Admin modal state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Newsletter | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", cover_image_url: "" });

  const fetchNewsletters = async () => {
    try {
      const res = await fetch(`${API}/api/publications/newsletters`);
      const data = await res.json();
      setNewsletters(data);
    } catch (err) {
      console.error("Failed to fetch newsletters", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNewsletters(); }, []);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % newsletters.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + newsletters.length) % newsletters.length);
    }
  };

  // --- Admin handlers ---
  const handleSave = async () => {
    const method = editItem ? "PUT" : "POST";
    const url = editItem
      ? `${API}/api/publications/newsletters/${editItem.id}`
      : `${API}/api/publications/newsletters`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
    setEditItem(null);
    resetForm();
    fetchNewsletters();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this newsletter?")) return;
    await fetch(`${API}/api/publications/newsletters/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNewsletters();
  };

  const openEdit = (item: Newsletter) => {
    setEditItem(item);
    setFormData({ title: item.title || "", slug: item.slug || "", cover_image_url: item.cover_image_url });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", cover_image_url: "" });
  };

  const saveOrder = async (updated: Newsletter[]) => {
    const orders = updated.map((n, i) => ({ id: n.id, order: i + 1 }));
    await fetch(`${API}/api/publications/newsletters/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orders }),
    });
  };

  const moveUp = (id: number) => {
    const index = newsletters.findIndex((n) => n.id === id);
    if (index === 0) return;
    const updated = [...newsletters];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setNewsletters(updated);
    saveOrder(updated);
  };

  const moveDown = (id: number) => {
    const index = newsletters.findIndex((n) => n.id === id);
    if (index === newsletters.length - 1) return;
    const updated = [...newsletters];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setNewsletters(updated);
    saveOrder(updated);
  };

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="waves" />
      <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="waves" />

      <main className="flex-1 py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-wide">
              WAVES – DSNLU NEWSLETTER
            </h2>
            <div className="h-1 w-20 bg-[#c9a227] mb-8" />
            <p className="text-gray-700 text-lg max-w-3xl italic">
              "WAVES is the official newsletter of DSNLU, capturing academic developments, research insights, student initiatives, and institutional milestones."
            </p>
          </motion.div>

          {/* Admin Add Button */}
          {token && (
            <div className="flex justify-end mb-8">
              <button
                onClick={() => { setEditItem(null); resetForm(); setShowModal(true); }}
                className="px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                + Add Newsletter
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {Array.isArray(newsletters) && newsletters.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer flex flex-col items-center"
              >
                {/* Admin controls */}
                {token && (
                  <div className="absolute top-1 right-1 z-20 flex gap-1">
                    <button onClick={() => openEdit(item)} title="Edit" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">✏️</button>
                    <button onClick={() => handleDelete(item.id)} title="Delete" className="bg-white/90 p-1 rounded shadow hover:bg-red-50 transition-colors text-xs">🗑️</button>
                    <button onClick={() => moveUp(item.id)} title="Move Up" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">⬆️</button>
                    <button onClick={() => moveDown(item.id)} title="Move Down" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">⬇️</button>
                  </div>
                )}

                <div
                  className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-[3/4] w-full mb-6"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={item.cover_image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[#0f2d5c] font-bold uppercase tracking-widest text-xs group-hover:text-[#c9a227] transition-colors">
                    {item.title}
                  </p>
                  <div className="h-0.5 w-8 bg-[#c9a227]/30 mx-auto mt-2 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* INTERACTIVE VIEWER (MODAL) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-8"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative flex items-center justify-center w-full group">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="max-h-[70vh] md:max-h-[80vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1">
                  <img
                    src={newsletters[selectedIndex]?.cover_image_url}
                    alt={newsletters[selectedIndex]?.title || `Viewer ${selectedIndex + 1}`}
                    className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain"
                  />
                  <div className="bg-[#0f2d5c] p-4 text-center border-t border-[#c9a227]/30">
                    <p className="text-[#c9a227] font-bold uppercase tracking-widest text-[10px] md:text-xs">
                      {newsletters[selectedIndex]?.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <div className="bg-[#0f2d5c] px-6 py-2 rounded-full border border-[#c9a227]/30 text-white/80 font-bold uppercase tracking-widest text-xs">
                {selectedIndex + 1} / {newsletters.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{editItem ? "Edit Newsletter" : "Add Newsletter"}</h2>
            <input className="w-full border p-2 rounded" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title (e.g. Vol. V - Issue 1 & 2)" />
            <input className="w-full border p-2 rounded" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="Slug (optional)" />
            <input className="w-full border p-2 rounded" value={formData.cover_image_url} onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })} placeholder="Cover Image URL" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => { setShowModal(false); setEditItem(null); }} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-navy text-gold rounded font-bold">
                {editItem ? "Save Changes" : "Add Newsletter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WavesNewsletter;
