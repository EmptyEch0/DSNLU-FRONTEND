import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, User, ExternalLink, ShieldCheck, Ship, Scale, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

interface CManEvent {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  event_date: string;
  tag?: string;
  category?: string;
  display_order: number;
  is_published: number;
}

const CManEvents = () => {
  const { token } = useAdmin();

  const [events, setEvents] = useState<CManEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CManEvent | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    event_date: "",
    tag: "",
    category: "",
    display_order: 1,
    is_published: 1,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/api/centres/cman/events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const openEdit = (event: CManEvent) => {
    setEditItem(event);
    setFormData({
      title: event.title || "",
      subtitle: event.subtitle || "",
      description: event.description || "",
      event_date: event.event_date || "",
      tag: event.tag || "",
      category: event.category || "",
      display_order: event.display_order || 1,
      is_published: event.is_published !== undefined ? event.is_published : 1,
    });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      event_date: "",
      tag: "",
      category: "",
      display_order: events.length + 1,
      is_published: 1,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editItem
      ? `/api/admin/cman/events/${editItem.id}`
      : `/api/admin/cman/events`;

    try {
      await fetch(`${API}${url}`, {
        method: editItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setShowModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete event?")) return;

    try {
      await fetch(`${API}/api/admin/cman/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
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
            <span className="font-medium text-gold">C-MAN Events</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544924222-3513ce0fc972?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
                >
                  Recent Events
                </motion.h1>
                <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-1 w-24 rounded-full bg-gold" 
                  />
                  {token && (
                    <button
                      onClick={openAdd}
                      className="bg-gold text-[#0f2d5c] px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-gold/90 transition-all shadow-md"
                    >
                      + Add Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="space-y-12">
               
               {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative rounded-3xl border bg-card p-1 shadow-sm transition-all hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12 border-l-8 border-gold rounded-2xl overflow-hidden relative">
                       <div className="absolute -top-10 -right-10 p-10 opacity-5 group-hover:rotate-12 transition-transform">
                         <Ship className="h-40 w-40 text-[#0f2d5c]" />
                       </div>
                       
                       <div className="flex-1 space-y-6 relative z-10">
                         <div className="flex flex-wrap items-center gap-4">
                           {event.event_date && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-2 rounded-full">
                              <Calendar className="h-3.5 w-3.5" /> 
                              {/* If valid date parse, otherwise just show the text */}
                              {isNaN(Date.parse(event.event_date)) ? event.event_date : new Date(event.event_date).toLocaleDateString()}
                            </span>
                           )}
                           {event.tag && (
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0f2d5c] bg-[#0f2d5c]/5 px-4 py-2 rounded-full flex items-center gap-2">
                              <Scale className="h-4 w-4" /> {event.tag}
                            </span>
                           )}
                         </div>

                         <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] leading-tight group-hover:text-gold transition-colors">
                           {event.title}
                         </h2>

                         <div className="space-y-4">
                           {event.subtitle && (
                            <p className="italic text-muted-foreground leading-relaxed text-justify border-l-4 border-secondary/50 pl-6">
                              {event.subtitle}
                            </p>
                           )}
                           <p className="text-muted-foreground leading-relaxed text-justify">
                             {event.description}
                           </p>
                         </div>

                         <div className="flex items-center justify-between pt-4 border-t border-secondary/50">
                            <div className="flex items-center gap-6">
                               <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                  <User className="h-4 w-4 text-gold" />
                                  <span>{event.category || "General"}</span>
                               </div>
                            </div>
                            
                            {token && (
                              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                                <button 
                                  onClick={() => openEdit(event)}
                                  className="text-gold hover:text-gold/80 transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(event.id)}
                                  className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                         </div>
                       </div>
                    </div>
                  </motion.div>
                ))}

                {events.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground italic border rounded-3xl bg-secondary/10">
                    No events found.
                  </div>
                )}

            </div>
          </div>
        </section>

        {/* Future Commitment */}
        <section className="py-24 bg-[#0f2d5c] text-white overflow-hidden">
           <div className="container relative z-10 text-center max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-12 bg-gold mx-auto" />
                <h3 className="font-serif text-3xl font-bold">Bridging Law and Maritime Excellence</h3>
                <p className="text-white/80 leading-relaxed italic">
                  Continuing our objective to encourage specialized research and professional training in the maritime sector through high-impact academic and social engagement.
                </p>
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
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl h-auto max-h-[90vh] overflow-y-auto min-scrollbar"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-serif font-bold text-[#0f2d5c]">
                  {editItem ? "Edit Event" : "Add Event"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0f2d5c] uppercase">Title</label>
                  <input
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0f2d5c] uppercase">Subtitle (Optional)</label>
                  <input
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                    placeholder="Short description or emphasis"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase">Date (or Label)</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase">Tag</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="e.g. NHRC Collaboration"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase">Category</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="e.g. Discussion"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase">Display Order</label>
                    <input
                      type="number"
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0f2d5c] uppercase">Description</label>
                  <textarea
                    className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors min-h-[100px]"
                    placeholder="Detailed description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                
                {editItem && (
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="is_published"
                      checked={formData.is_published === 1}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                      className="h-4 w-4 accent-gold rounded focus:ring-gold"
                    />
                    <label htmlFor="is_published" className="text-sm font-medium text-foreground">
                      Published publicly
                    </label>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b] transition-colors"
                >
                  Save Changes
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CManEvents;
