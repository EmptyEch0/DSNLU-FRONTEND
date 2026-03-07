import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, User, ExternalLink, Briefcase, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

interface Event {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  event_date_label: string;
}

const LICEvents = () => {
  const { token } = useAdmin();

  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDateLabel, setFormDateLabel] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/api/centres/5/events`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching LIC events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openEdit = (event: any) => {
    setEditItem(event);
    setFormTitle(event.title);
    setFormSubtitle(event.subtitle || "");
    setFormDescription(event.description);
    setFormCategory(event.category);
    setFormDateLabel(event.event_date_label);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      title: formTitle,
      subtitle: formSubtitle,
      description: formDescription,
      category: formCategory,
      event_date_label: formDateLabel,
    };

    try {
      if (editItem) {
        await fetch(`${API}/api/admin/lic-events/${editItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API}/api/admin/lic-events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      setShowModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error saving LIC event:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this event?")) return;

    try {
      await fetch(`${API}/api/admin/lic-events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchEvents();
    } catch (error) {
      console.error("Error deleting LIC event:", error);
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
            <span className="font-medium text-gold">LIC Events</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl"
            >
              LIC EVENTS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            {token && (
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => {
                    setEditItem(null);
                    setFormTitle("");
                    setFormSubtitle("");
                    setFormDescription("");
                    setFormCategory("");
                    setFormDateLabel("");
                    setShowModal(true);
                  }}
                  className="bg-gold text-[#0f2d5c] px-6 py-2 rounded-lg font-bold shadow-md hover:bg-gold/90 transition-all"
                >
                  + Add Event
                </button>
              </div>
            )}

            <div className="grid gap-8">
              {(events || []).map((event, i) => (
                <motion.div
                  key={event.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl border bg-card p-1 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-7 border-l-8 border-gold rounded-xl">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0f2d5c]/5 text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all duration-300">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-4">
                         <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                           <Calendar className="h-3 w-3" /> {event.event_date_label}
                         </span>
                         <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                           {event.category}
                         </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] leading-tight">
                        {event.title}
                      </h3>
                      {event.subtitle && (
                        <p className="font-bold text-muted-foreground uppercase tracking-wider text-sm">
                          {event.subtitle}
                        </p>
                      )}
                      <p className="text-muted-foreground leading-relaxed italic border-l-2 border-secondary pl-4 mt-4">
                        {event.description}
                      </p>

                      {token && (
                        <div className="flex gap-4 pt-6 border-t border-secondary/20">
                          <button
                            onClick={() => openEdit(event)}
                            className="flex items-center gap-2 text-sm font-bold text-[#0f2d5c] hover:text-gold transition-colors"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() => handleDelete(event.id)}
                            className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Highlight */}
        <section className="py-24 bg-[#0f2d5c] text-white overflow-hidden">
           <div className="container relative z-10 text-center max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-12 bg-gold mx-auto" />
                <h2 className="font-serif text-3xl font-bold">Empowering the Future of Law</h2>
                <p className="text-white/80 leading-relaxed text-lg italic">
                  "Our events are designed to not only educate but also to inspire students to rethink the boundaries of legal practice and embrace the spirit of innovation."
                </p>
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
              className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#0f2d5c]">
                  {editItem ? "Edit Event" : "Add Event"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Subtitle (optional)"
                value={formSubtitle}
                onChange={(e) => setFormSubtitle(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Category (Competition / Workshop / Training)"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                placeholder="Date Label (e.g. 18th March 2025)"
                value={formDateLabel}
                onChange={(e) => setFormDateLabel(e.target.value)}
              />

              <textarea
                className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors h-32 resize-none"
                placeholder="Description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />

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

export default LICEvents;
