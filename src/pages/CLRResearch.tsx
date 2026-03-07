import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FlaskConical, Calendar, GraduationCap, Archive, Camera, Plus, Edit2, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

interface ResearchEvent {
  id: number;
  text: string;
}

interface ResearchYear {
  id: number;
  year: string;
  events: ResearchEvent[];
}

interface GalleryItem {
  image_url: string;
}

const CLRResearch = () => {
  const { token } = useAdmin();
  const [timeline, setTimeline] = useState<ResearchYear[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Admin State
  const [showYearModal, setShowYearModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState<ResearchYear | null>(null);
  const [editYear, setEditYear] = useState<ResearchYear | null>(null);
  const [editEvent, setEditEvent] = useState<ResearchEvent | null>(null);
  const [yearInput, setYearInput] = useState("");
  const [eventInput, setEventInput] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/centres/clr/research`);
      const data = await res.json();
      setTimeline(data.timeline || []);
      setGallery(data.gallery || []);
    } catch (error) {
      console.error("Error fetching research data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveYear = async () => {
    if (editYear) {
      await fetch(`${API}/api/admin/centre-research/year/${editYear.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ year_label: yearInput })
      });
    } else {
      await fetch(`${API}/api/admin/centre-research/year`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ centre_id: 4, year_label: yearInput })
      });
    }
    setShowYearModal(false);
    fetchData();
  };

  const handleDeleteYear = async (id: number) => {
    if (!confirm("Delete this year and all its events?")) return;
    await fetch(`${API}/api/admin/centre-research/year/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const saveEvent = async () => {
    if (editEvent) {
      await fetch(`${API}/api/admin/centre-research/event/${editEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ event_text: eventInput })
      });
    } else {
      await fetch(`${API}/api/admin/centre-research/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ year_id: selectedYear?.id, event_text: eventInput })
      });
    }
    setShowEventModal(false);
    fetchData();
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`${API}/api/admin/centre-research/event/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
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
            <span className="font-medium text-gold">CLR - Research Activities</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              RESEARCH COLLABORATIONS & ACADEMIC ACTIVITIES
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-center"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8">IP Education at DSNLU</h2>
              <p className="text-muted-foreground leading-relaxed">
                DSNLU adopts a comprehensive and unique approach to Intellectual Property (IP) education. By integrating science and management inputs, our curriculum provides a well-rounded perspective that goes beyond traditional legal teaching. Our focus includes comparative jurisprudence, policy implications, and the managerial aspects of IP, ensuring our researchers and students are prepared for the dynamic global landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Activities */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <FlaskConical className="h-8 w-8 text-gold" />
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">MAJOR EVENTS & INITIATIVES</h2>
              </div>
              {token && (
                <button
                  onClick={() => {
                    setEditYear(null);
                    setYearInput("");
                    setShowYearModal(true);
                  }}
                  className="bg-gold text-[#0f2d5c] px-4 py-2 rounded font-bold flex items-center gap-2 transition-all hover:bg-gold/90"
                >
                  <Plus className="h-4 w-4" /> Add Year
                </button>
              )}
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
              {timeline.map((group, groupIdx) => (
                <div key={group.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Calendar className="h-4 w-4 text-[#0f2d5c]" />
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-gold/30">
                    <div className="flex items-center justify-between mb-4">
                        <time className="font-serif font-bold text-2xl text-gold">{group.year}</time>
                        {token && (
                          <div className="flex gap-2">
                             <button 
                               onClick={() => {
                                 setEditYear(group);
                                 setYearInput(group.year);
                                 setShowYearModal(true);
                               }}
                               className="p-1 hover:text-gold transition-colors"
                             >
                               <Edit2 className="h-3.5 w-3.5" />
                             </button>
                             <button 
                               onClick={() => handleDeleteYear(group.id)}
                               className="p-1 hover:text-red-500 transition-colors"
                             >
                               <Trash2 className="h-3.5 w-3.5" />
                             </button>
                          </div>
                        )}
                    </div>
                    <ul className="space-y-3 mb-4">
                      {group.events.map((event) => (
                        <li key={event.id} className="text-sm text-muted-foreground flex justify-between items-start group/event">
                           <div className="flex gap-2">
                             <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                             {event.text}
                           </div>
                           {token && (
                             <div className="flex gap-1 opacity-0 group-hover/event:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => {
                                   setEditEvent(event);
                                   setEventInput(event.text);
                                   setShowEventModal(true);
                                 }}
                                 className="p-1 hover:text-gold transition-colors"
                               >
                                 <Edit2 className="h-3 w-3" />
                               </button>
                               <button 
                                 onClick={() => handleDeleteEvent(event.id)}
                                 className="p-1 hover:text-red-500 transition-colors"
                               >
                                 <Trash2 className="h-3 w-3" />
                               </button>
                             </div>
                           )}
                        </li>
                      ))}
                    </ul>
                    {token && (
                      <button
                        onClick={() => {
                          setSelectedYear(group);
                          setEditEvent(null);
                          setEventInput("");
                          setShowEventModal(true);
                        }}
                        className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1 hover:underline"
                      >
                        <Plus className="h-3 w-3" /> Add Event
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Contribution */}
        <section className="py-20 bg-[#0f2d5c]/5">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-[#0f2d5c] text-white p-10 md:p-16 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <GraduationCap className="h-48 w-48" />
               </div>
               <div className="relative z-10 space-y-8">
                 <h2 className="font-serif text-3xl font-bold border-l-4 border-gold pl-6">ACADEMIC CONTRIBUTION</h2>
                 <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gold text-lg uppercase tracking-wider">Curricula Focus</h4>
                      <p className="text-white/80 leading-relaxed">
                        IPR is offered as a core Undergraduate course (4 credits). Our doctoral and post-doctoral programs also emphasize specialized IP research.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-gold text-lg uppercase tracking-wider">Specialized Papers</h4>
                      <p className="text-white/80 leading-relaxed">
                        We offer an optional paper on Biotechnology Law in the 8th semester, focusing on practical litigation aspects across Patents, Trademarks, and Copyrights.
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* IP Repository */}
        <section className="py-24">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">
                   <Archive className="h-3.5 w-3.5" /> Research Library
                 </div>
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">IP REPOSITORY</h2>
                 <p className="text-muted-foreground leading-relaxed">
                    Our repository enables qualitative research in IP and interdisciplinary areas. We house an extensive collection of specialized literature and resources.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    {["Copyright", "Patents", "Geographical Indications", "Industrial Designs", "IP & Technology", "IP Taxation", "EU IP Law", "International IP"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {item}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Repository Card */}
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((img, i) => (
                   <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="aspect-square relative group overflow-hidden rounded-2xl bg-muted shadow-md"
                   >
                     <img 
                       src={img.image_url} 
                       alt="Research Activity" 
                       className="h-full w-full object-cover transition-transform group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-[#0f2d5c]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="h-8 w-8 text-white" />
                     </div>
                   </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {showYearModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-[#0f2d5c]">
                  {editYear ? "Edit Year" : "Add Year"}
                </h2>
                <button onClick={() => setShowYearModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-1">Year Label</label>
                <input
                  className="w-full border rounded-lg p-3 outline-none focus:border-gold transition-colors"
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  placeholder="e.g. 2023"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowYearModal(false)} className="px-4 py-2 font-medium">Cancel</button>
                <button
                  onClick={saveYear}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showEventModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-[#0f2d5c]">
                  {editEvent ? "Edit Event" : "Add Event"}
                </h2>
                <button onClick={() => setShowEventModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-1">Event Description</label>
                <textarea
                  className="w-full border rounded-lg p-3 outline-none focus:border-gold transition-colors min-h-[100px]"
                  value={eventInput}
                  onChange={(e) => setEventInput(e.target.value)}
                  placeholder="Enter event details..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowEventModal(false)} className="px-4 py-2 font-medium">Cancel</button>
                <button
                  onClick={saveEvent}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]"
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

export default CLRResearch;
