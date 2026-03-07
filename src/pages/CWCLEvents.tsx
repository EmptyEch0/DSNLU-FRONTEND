import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Calendar, 
  User, 
  ExternalLink, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Pencil, 
  X,
  PlusCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string;
  guidance: string;
  display_order: number;
}

interface GalleryItem {
  id: number;
  image_url: string;
  display_order: number;
}

const CWCLEvents = () => {
  const { isAdminMode, token } = useAdmin();
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [centreId, setCentreId] = useState<number | null>(null);

  // States for Event Modal
  const [showEventModal, setShowEventModal] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formGuidance, setFormGuidance] = useState("");

  const isAdmin = !!token && isAdminMode;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/centres/cwcl/full`);
      const data = await res.json();
      setEvents(data.events);
      setGallery(data.gallery);
      setCentreId(data.centre.id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load CWCL events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Event CRUD
  const handleEventSubmit = async () => {
    const method = editEvent ? "PUT" : "POST";
    const endpoint = editEvent ? `/api/admin/event/${editEvent.id}` : "/api/admin/event";

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_slug: "cwcl",
          title: formTitle,
          event_date: formDate,
          description: formDesc,
          guidance: formGuidance
        }),
      });

      if (res.ok) {
        toast.success(editEvent ? "Event updated" : "Event added");
        setShowEventModal(false);
        setEditEvent(null);
        resetEventForm();
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async (id: number) => {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`${API}/api/admin/event/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Event deleted");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetEventForm = () => {
    setFormTitle("");
    setFormDate("");
    setFormDesc("");
    setFormGuidance("");
  };

  // Gallery CRUD
  const addGalleryImage = async () => {
    const url = window.prompt("Enter Image URL:");
    if (!url) return;

    try {
      const res = await fetch(`${API}/api/admin/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_slug: "cwcl",
          image_url: url
        }),
      });

      if (res.ok) {
        toast.success("Gallery item added");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGalleryItem = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`${API}/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Image removed");
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
            <span className="font-bold text-gold uppercase tracking-wider text-[11px]">CWCL Events</span>
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
              CWCL EVENTS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-12">
               <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-tight">Timeline</h2>
               {isAdmin && (
                  <button 
                    onClick={() => {
                        resetEventForm();
                        setShowEventModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gold text-[#0f2d5c] rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm"
                  >
                    <PlusCircle className="h-4 w-4" /> Create Event
                  </button>
               )}
            </div>

            <div className="grid gap-12">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col md:flex-row gap-8 rounded-[40px] border bg-white p-10 shadow-sm transition-all hover:shadow-premium hover:border-gold/30 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gold/10 group-hover:bg-gold transition-colors" />
                  
                  <div className="flex shrink-0 items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 p-6 h-32 w-full md:w-32 transition-all group-hover:bg-navy group-hover:text-gold group-hover:border-navy">
                    <Calendar className="h-10 w-10" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="flex items-center gap-1.5 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                        {new Date(event.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>

                      {isAdmin && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditEvent(event);
                                setFormTitle(event.title);
                                setFormDate(new Date(event.event_date).toISOString().split('T')[0]);
                                setFormDesc(event.description);
                                setFormGuidance(event.guidance || "");
                              }}
                              className="p-2 text-navy hover:bg-gold/10 rounded-lg transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                               onClick={() => deleteEvent(event.id)}
                               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                               <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {event.description}
                    </p>
                    {event.guidance && (
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 text-[11px] font-bold text-navy uppercase tracking-widest italic opacity-80">
                        <User className="h-3 w-3 text-gold" />
                        <span>Guidance: {event.guidance}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="container relative z-10">
            <div className="flex items-center justify-between mb-16">
               <div className="flex items-center gap-4">
                  <div className="h-1 w-12 bg-gold rounded-full" />
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">EVENT GALLERY</h2>
               </div>
               
               {isAdmin && (
                  <button 
                    onClick={addGalleryImage}
                    className="flex items-center gap-2 px-6 py-2.5 bg-navy text-gold rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm"
                  >
                     <Plus className="h-4 w-4" /> Add Image
                  </button>
               )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group aspect-[4/3] overflow-hidden rounded-[32px] bg-muted shadow-lg transition-all hover:shadow-premium ring-1 ring-gray-100"
                >
                  <img 
                    src={item.image_url} 
                    alt={`CWCL Event ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 transition-all group-hover:opacity-100 flex flex-col items-center justify-center p-6 gap-4 text-center">
                    <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center backdrop-blur-md">
                        <ImageIcon className="h-6 w-6 text-gold" />
                    </div>
                    {isAdmin && (
                        <button 
                           onClick={() => deleteGalleryItem(item.id)}
                           className="mt-2 p-3 bg-red-500/80 hover:bg-red-600 rounded-2xl text-white transition-colors shadow-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                        >
                            <Trash2 className="h-4 w-4" /> Remove Photo
                        </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Event Modal */}
      <AnimatePresence>
        {(showEventModal || editEvent) && (
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
              className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="bg-navy p-8 flex justify-between items-center text-white">
                <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-bold text-gold flex items-center gap-3">
                        {editEvent ? <Pencil className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                        {editEvent ? "Update Event" : "Create New Event"}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Centre for child & woman law</p>
                </div>
                <button 
                  onClick={() => {
                    setShowEventModal(false);
                    setEditEvent(null);
                  }}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-all hover:rotate-90"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Event Title</label>
                  <input
                    className="w-full bg-secondary/20 border-0 rounded-2xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Workshop on POCSO Act"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Date</label>
                    <input
                        type="date"
                        className="w-full bg-secondary/20 border-0 rounded-2xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Under Guidance (Optional)</label>
                    <input
                        className="w-full bg-secondary/20 border-0 rounded-2xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all"
                        value={formGuidance}
                        onChange={(e) => setFormGuidance(e.target.value)}
                        placeholder="e.g. Dr. P Sree Sudha"
                    />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-secondary/20 border-0 rounded-2xl p-4 text-navy font-bold focus:ring-2 focus:ring-gold transition-all resize-none"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Tell us about the event..."
                  />
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
                  <button
                    onClick={() => {
                        setShowEventModal(false);
                        setEditEvent(null);
                    }}
                    className="flex-1 px-8 py-5 border-2 border-navy/10 rounded-2xl font-bold text-navy hover:bg-navy/5 transition-all text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleEventSubmit}
                    className="flex-1 px-8 py-5 bg-navy text-gold rounded-2xl font-bold hover:scale-105 transition-all shadow-xl text-xs uppercase tracking-[0.2em]"
                  >
                    {editEvent ? "Save Changes" : "Confirm Event"}
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

export default CWCLEvents;
