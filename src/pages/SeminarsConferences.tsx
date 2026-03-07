import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, MapPin, Users, Info, Plus, Pencil, Trash2, X, ShieldCheck, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface SeminarImage {
  id: number;
  image_url: string;
}

interface SeminarDay {
  id: number;
  day_label: string;
  images: SeminarImage[];
}

interface Seminar {
  id: number;
  title: string;
  organizer?: string;
  location?: string;
  seminar_date?: string;
  details?: string;
  display_order: number;
  days: SeminarDay[];
  images: { id: number; image_url: string; display_order: number }[];
  subjects: { id: number; subject_name: string }[];
  guests: {
    chiefGuest: { id: number; guest_name: string; guest_type: string } | null;
    guestsOfHonour: { id: number; guest_name: string; guest_type: string }[];
    chiefGuestName: string | null;
    guestsOfHonourNames: string[];
  };
}

interface SeminarYear {
  id: number;
  year_label: string;
  display_order: number;
  seminars: Seminar[];
}

const SeminarsConferences = () => {
  const { token } = useAdmin();
  const isAdmin = !!token;
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [data, setData] = useState<SeminarYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal States
  const [showYearModal, setShowYearModal] = useState(false);
  const [showSeminarModal, setShowSeminarModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Editing States
  const [editingYear, setEditingYear] = useState<SeminarYear | null>(null);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [editingDay, setEditingDay] = useState<SeminarDay | null>(null);

  // Form States
  const [yearForm, setYearForm] = useState({ year_label: "", display_order: 0 });
  const [seminarForm, setSeminarForm] = useState({
    year_id: 0,
    title: "",
    organizer: "",
    location: "",
    seminar_date: "",
    details: "",
    display_order: 0
  });
  const [dayForm, setDayForm] = useState({ seminar_id: 0, day_label: "", display_order: 0 });
  const [imageForm, setImageForm] = useState({ seminar_id: 0, day_id: null as number | null, image_url: "", display_order: 0 });
  const [subjectForm, setSubjectForm] = useState({ seminar_id: 0, subject_name: "" });
  const [guestForm, setGuestForm] = useState({ seminar_id: 0, guest_name: "", guest_type: "chief" });

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/seminars`);
      const resData = await res.json();
      setData(resData);
      if (resData.length > 0 && !activeYear) {
        setActiveYear(resData[0].year_label);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load seminars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Form Reset Effects
  useEffect(() => {
    if (!showYearModal) {
      setEditingYear(null);
      setYearForm({ year_label: "", display_order: 0 });
    }
  }, [showYearModal]);

  useEffect(() => {
    if (!showSeminarModal) {
      setEditingSeminar(null);
    }
  }, [showSeminarModal]);

  useEffect(() => {
    if (!showDayModal) {
      setEditingDay(null);
    }
  }, [showDayModal]);

  const handleCRUD = async (
    url: string,
    method: string,
    body: unknown,
    successMsg: string
  ) => {
    try {
      const currentToken = token || localStorage.getItem("adminToken");
      const res = await fetch(`${API}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`
        },
        body: method !== "DELETE" ? JSON.stringify(body) : undefined
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Operation failed");
      }

      toast.success(successMsg);
      await fetchData();
      return true;

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
      return false;
    }
  };

  const activeYearData = data.find(y => y.year_label === activeYear);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex font-medium uppercase tracking-widest text-gold items-center justify-center gap-2"
            >
              Programs {isAdmin && <ShieldCheck className="h-4 w-4" />}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Seminars & Conferences
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />

            <div className="flex flex-col items-center gap-4 mt-8">
              {isAdmin && (
                <div className="flex items-center gap-4">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      setEditingYear(null);
                      setYearForm({ year_label: "", display_order: data.length + 1 });
                      setShowYearModal(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2 font-semibold text-primary transition-transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" /> Add Year
                  </motion.button>
                  <button className="flex items-center gap-2 text-sm text-gold hover:underline">
                    <ArrowUpDown className="h-4 w-4" /> Reorder Mode
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Year Tabs */}
        <div className="border-b bg-secondary/30 sticky top-[72px] z-20 backdrop-blur-md">
          <div className="container flex items-center justify-center gap-8 py-4 overflow-x-auto no-scrollbar">
            {data.map((year) => (
              <div key={year.id} className="relative group/tab">
                <button
                  onClick={() => setActiveYear(year.year_label)}
                  className={`relative py-2 text-xl font-serif font-bold transition-all duration-300 whitespace-nowrap ${
                    activeYear === year.year_label ? "text-gold scale-110" : "text-muted-foreground hover:text-foreground hover:scale-105"
                  }`}
                >
                  {year.year_label}
                  {activeYear === year.year_label && (
                    <motion.div
                      layoutId="activeSeminarYear"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover/tab:opacity-100 transition-all duration-200 scale-95 group-hover/tab:scale-100 z-30">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingYear(year);
                        setYearForm({ year_label: year.year_label, display_order: year.display_order });
                        setShowYearModal(true);
                      }}
                      className="p-1 bg-blue-500 text-white rounded-full hover:scale-110 shadow-lg"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete this year and all its seminars?")) {
                          handleCRUD(`/api/seminars/years/${year.id}`, "DELETE", {}, "Year deleted");
                        }
                      }}
                      className="p-1 bg-red-500 text-white rounded-full hover:scale-110 shadow-lg"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Seminars List */}
        <section className="py-16 lg:py-24">
          <div className="container">
            {isAdmin && activeYearData && (
              <div className="mb-12 flex justify-center">
                <button
                  onClick={() => {
                    setEditingSeminar(null);
                    setSeminarForm({
                      year_id: activeYearData.id,
                      title: "",
                      organizer: "",
                      location: "",
                      seminar_date: "",
                      details: "",
                      display_order: activeYearData.seminars.length + 1
                    });
                    setShowSeminarModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gold/50 px-8 py-4 text-gold hover:bg-gold/5 transition-colors"
                >
                  <Plus className="h-5 w-5" /> Add New Seminar to {activeYear}
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-20"
              >
                {!activeYearData || activeYearData.seminars.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No seminars recorded for this year.</p>
                  </div>
                ) : (
                  activeYearData.seminars.map((seminar, idx) => (
                    <div key={seminar.id} className="space-y-12 relative group/seminar">
                      {isAdmin && (
                        <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover/seminar:opacity-100 transition-all duration-200 scale-95 group-hover/seminar:scale-100 z-30">
                          <button
                            onClick={() => {
                              setEditingSeminar(seminar);
                              setSeminarForm({
                                year_id: seminar.year_id,
                                title: seminar.title,
                                organizer: seminar.organizer || "",
                                location: seminar.location || "",
                                seminar_date: seminar.seminar_date || "",
                                details: seminar.details || "",
                                display_order: seminar.display_order
                              });
                              setShowSeminarModal(true);
                            }}
                            className="p-2 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this seminar and all its content?")) {
                                handleCRUD(`/api/seminars/${seminar.id}`, "DELETE", {}, "Seminar deleted");
                              }
                            }}
                            className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      <div className="text-center space-y-4 px-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">{seminar.title}</h2>
                        {seminar.organizer && (
                          <p className="text-gold font-medium text-lg italic">By {seminar.organizer}</p>
                        )}
                      </div>

                      {/* Multi-Day Logic */}
                      {seminar.days.length > 0 ? (
                        <div className="space-y-12">
                          {seminar.days.map((day, dayIdx) => (
                            <div key={day.id} className="space-y-8 group/day relative">
                              <div className="flex items-center justify-between gap-4 bg-secondary/20 p-4 rounded-lg border-l-4 border-gold shadow-sm">
                                <div className="flex items-center gap-4">
                                  <Calendar className="h-6 w-6 text-gold" />
                                  <h3 className="text-xl font-bold text-foreground">{day.day_label}</h3>
                                </div>
                                {isAdmin && (
                                  <div className="flex gap-2 opacity-0 group-hover/day:opacity-100 transition-all duration-200 scale-95 group-hover/day:scale-100">
                                    <button
                                      onClick={() => {
                                        setEditingDay(day);
                                        setDayForm({ seminar_id: seminar.id, day_label: day.day_label, display_order: day.display_order });
                                        setShowDayModal(true);
                                      }}
                                      className="p-1 bg-blue-500 text-white rounded-lg hover:scale-110 shadow-lg"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setImageForm({ seminar_id: seminar.id, day_id: day.id, image_url: "", display_order: day.images.length + 1 });
                                        setShowImageModal(true);
                                      }}
                                      className="p-1 bg-gold text-primary rounded-lg hover:scale-110 shadow-lg"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm("Delete this day and its images?")) {
                                          handleCRUD(`/api/seminars/days/${day.id}`, "DELETE", {}, "Day deleted");
                                        }
                                      }}
                                      className="p-1 bg-red-500 text-white rounded-lg hover:scale-110 shadow-lg"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {day.images.map((img, imgIdx) => (
                                  <motion.div
                                    key={img.id}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    className="group/img relative aspect-[4/3] overflow-hidden rounded-xl shadow-elegant bg-muted"
                                  >
                                    <img
                                      src={img.image_url}
                                      alt={`Seminar Image ${imgIdx + 1}`}
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                      {isAdmin && (
                                        <button
                                          onClick={() => {
                                            if (confirm("Delete this image?")) {
                                              handleCRUD(`/api/seminars/images/${img.id}`, "DELETE", {}, "Image deleted");
                                            }
                                          }}
                                          className="p-2 bg-red-500 text-white rounded-full hover:scale-110"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                          {isAdmin && (
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setEditingDay(null);
                                  setDayForm({ seminar_id: seminar.id, day_label: "", display_order: seminar.days.length + 1 });
                                  setShowDayModal(true);
                                }}
                                className="px-6 py-2 border-2 border-dashed border-gold/40 text-gold rounded-xl hover:bg-gold/5 transition-colors text-sm font-bold uppercase tracking-widest"
                              >
                                + Add Day
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Single/Standard Logic */
                        <motion.div 
                          className="space-y-8 bg-card p-8 rounded-3xl border shadow-premium hover:shadow-2xl transition-all"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gold/10 pb-6">
                            <div className="space-y-2">
                              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">{seminar.title}</h2>
                              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-medium">
                                {seminar.seminar_date && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" /> {seminar.seminar_date}</span>}
                                {seminar.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {seminar.location}</span>}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center">
                              {seminar.subjects?.map((sub, sidx) => (
                                <div key={sidx} className="group/sub relative px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                  {sub.subject_name}
                                  {isAdmin && (
                                    <button
                                      onClick={() => handleCRUD(`/api/seminars/subjects/${sub.id}`, "DELETE", {}, "Subject removed")}
                                      className="opacity-0 group-hover/sub:opacity-100 transition-opacity hover:text-red-500"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    setSubjectForm({ seminar_id: seminar.id, subject_name: "" });
                                    setShowSubjectModal(true);
                                  }}
                                  className="h-6 w-6 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {(seminar.guests?.chiefGuest || seminar.guests?.guestsOfHonour?.length > 0 || isAdmin) && (
                            <div className="grid md:grid-cols-2 gap-8 bg-secondary/10 p-6 rounded-2xl relative">
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    setGuestForm({ seminar_id: seminar.id, guest_name: "", guest_type: "chief" });
                                    setShowGuestModal(true);
                                  }}
                                  className="absolute top-4 right-4 p-1 rounded-full bg-gold text-primary hover:scale-110 shadow-lg"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              )}
                              <div>
                                <h4 className="flex items-center gap-2 font-bold text-primary mb-3">
                                  <Users className="h-5 w-5 text-gold" />
                                  Chief Guest:
                                </h4>
                                {seminar.guests?.chiefGuest ? (
                                  <div className="flex items-center justify-between group/guest">
                                    <p className="text-foreground font-semibold">{seminar.guests.chiefGuest.guest_name}</p>
                                    {isAdmin && (
                                      <button
                                        onClick={() => handleCRUD(`/api/seminars/guests/${seminar.guests.chiefGuest!.id}`, "DELETE", {}, "Guest removed")}
                                        className="opacity-0 group-hover/guest:opacity-100 text-red-500 hover:scale-110"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-muted-foreground text-sm italic">Not specified</p>
                                )}
                              </div>
                              <div>
                                <h4 className="flex items-center gap-2 font-bold text-primary mb-3">
                                  <Users className="h-5 w-5 text-gold" />
                                  Guests of Honour:
                                </h4>
                                {seminar.guests?.guestsOfHonour?.length > 0 ? (
                                  <ul className="space-y-1">
                                    {seminar.guests.guestsOfHonour.map((g, gi) => (
                                      <li key={gi} className="text-foreground text-sm flex items-center justify-between group/guest">
                                        <div className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                                          {g.guest_name}
                                        </div>
                                        {isAdmin && (
                                          <button
                                            onClick={() => handleCRUD(`/api/seminars/guests/${g.id}`, "DELETE", {}, "Guest removed")}
                                            className="opacity-0 group-hover/guest:opacity-100 text-red-500 hover:scale-110"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-muted-foreground text-sm italic">Not specified</p>
                                )}
                              </div>
                            </div>
                          )}

                          {seminar.details && (
                            <div className="flex gap-3 text-muted-foreground italic bg-gold/5 p-4 rounded-xl border border-gold/10">
                              <Info className="h-5 w-5 text-gold flex-shrink-0" />
                              <p>{seminar.details}</p>
                            </div>
                          )}

                          <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                              <h4 className="font-bold text-primary uppercase tracking-widest text-sm">Gallery</h4>
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    setImageForm({ seminar_id: seminar.id, day_id: null, image_url: "", display_order: seminar.images.length + 1 });
                                    setShowImageModal(true);
                                  }}
                                  className="flex items-center gap-1 text-gold text-xs font-bold hover:underline"
                                >
                                  <Plus className="h-3 w-3" /> Add Image
                                </button>
                              )}
                            </div>
                            {seminar.images?.length > 0 ? (
                              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {seminar.images.map((img, imgIdx) => (
                                  <motion.div
                                    key={img.id}
                                    whileHover={{ scale: 1.05, rotate: -1 }}
                                    className="group/img relative aspect-video overflow-hidden rounded-xl shadow-md bg-muted"
                                  >
                                    <img
                                      src={img.image_url}
                                      alt="Seminar Highlights"
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                      {isAdmin && (
                                        <button
                                          onClick={() => {
                                            if (confirm("Delete this image?")) {
                                              handleCRUD(`/api/seminars/images/${img.id}`, "DELETE", {}, "Image deleted");
                                            }
                                          }}
                                          className="p-2 bg-red-500 text-white rounded-full hover:scale-110"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground text-sm italic py-4 text-center">No images uploaded yet.</p>
                            )}
                          </div>
                          {isAdmin && (
                            <div className="flex justify-center pt-8 border-t border-gold/10">
                              <button
                                onClick={() => {
                                  setEditingDay(null);
                                  setDayForm({ seminar_id: seminar.id, day_label: "", display_order: 1 });
                                  setShowDayModal(true);
                                }}
                                className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg text-sm font-bold uppercase tracking-widest"
                              >
                                Create Multi-Day Schedule
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* --- MODALS --- */}

      {/* Year Modal */}
      {showYearModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingYear ? "Edit Year" : "Add Year"}</h2>
              <button disabled={saving} onClick={() => setShowYearModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Year Label (e.g. 2025)</label>
                <input type="text" value={yearForm.year_label} onChange={(e) => setYearForm({...yearForm, year_label: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={yearForm.display_order} onChange={(e) => setYearForm({...yearForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!yearForm.year_label.trim()) return toast.error("Year label is required");
                  setSaving(true);
                  const success = editingYear 
                    ? await handleCRUD(`/api/seminars/years/${editingYear.id}`, "PUT", yearForm, "Year updated")
                    : await handleCRUD(`/api/seminars/years`, "POST", yearForm, "Year added");
                  setSaving(false);
                  if (success) setShowYearModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : editingYear ? "Save Changes" : "Add Year"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Seminar Modal */}
      {showSeminarModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingSeminar ? "Edit Seminar" : "Add New Seminar"}</h2>
              <button disabled={saving} onClick={() => setShowSeminarModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Title</label>
                <input type="text" value={seminarForm.title} onChange={(e) => setSeminarForm({...seminarForm, title: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Organizer</label>
                <input type="text" value={seminarForm.organizer} onChange={(e) => setSeminarForm({...seminarForm, organizer: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Location</label>
                <input type="text" value={seminarForm.location} onChange={(e) => setSeminarForm({...seminarForm, location: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Seminar Date</label>
                <input type="text" value={seminarForm.seminar_date} onChange={(e) => setSeminarForm({...seminarForm, seminar_date: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={seminarForm.display_order} onChange={(e) => setSeminarForm({...seminarForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Details / Description</label>
                <textarea rows={4} value={seminarForm.details} onChange={(e) => setSeminarForm({...seminarForm, details: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
            </div>
            <button
              disabled={saving}
              onClick={async () => {
                if (!seminarForm.title.trim()) return toast.error("Title is required");
                setSaving(true);
                const success = editingSeminar 
                  ? await handleCRUD(`/api/seminars/${editingSeminar.id}`, "PUT", seminarForm, "Seminar updated")
                  : await handleCRUD(`/api/seminars`, "POST", seminarForm, "Seminar added");
                setSaving(false);
                if (success) setShowSeminarModal(false);
              }}
              className="w-full py-4 mt-8 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : editingSeminar ? "Save Changes" : "Add Seminar"}
            </button>
          </motion.div>
        </div>
      )}

      {/* Day Modal */}
      {showDayModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingDay ? "Edit Day" : "Add Day"}</h2>
              <button disabled={saving} onClick={() => setShowDayModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Day Label (e.g. Day 1 - 12th June)</label>
                <input type="text" value={dayForm.day_label} onChange={(e) => setDayForm({...dayForm, day_label: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={dayForm.display_order} onChange={(e) => setDayForm({...dayForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!dayForm.day_label.trim()) return toast.error("Day label is required");
                  setSaving(true);
                  const success = editingDay 
                    ? await handleCRUD(`/api/seminars/days/${editingDay.id}`, "PUT", dayForm, "Day updated")
                    : await handleCRUD(`/api/seminars/days`, "POST", dayForm, "Day added");
                  setSaving(false);
                  if (success) setShowDayModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : editingDay ? "Save Changes" : "Add Day"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">Add Image</h2>
              <button disabled={saving} onClick={() => setShowImageModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Image URL</label>
                <input type="text" value={imageForm.image_url} onChange={(e) => setImageForm({...imageForm, image_url: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={imageForm.display_order} onChange={(e) => setImageForm({...imageForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!imageForm.image_url.trim()) return toast.error("Image URL is required");
                  setSaving(true);
                  const success = await handleCRUD(`/api/seminars/images`, "POST", imageForm, "Image added");
                  setSaving(false);
                  if (success) setShowImageModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Image"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Subject Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">Add Subject Tag</h2>
              <button disabled={saving} onClick={() => setShowSubjectModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Subject Name (e.g. BNS)</label>
                <input type="text" value={subjectForm.subject_name} onChange={(e) => setSubjectForm({...subjectForm, subject_name: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!subjectForm.subject_name.trim()) return toast.error("Subject name is required");
                  setSaving(true);
                  const success = await handleCRUD(`/api/seminars/subjects`, "POST", subjectForm, "Subject added");
                  setSaving(false);
                  if (success) setShowSubjectModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Subject"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">Add Guest</h2>
              <button disabled={saving} onClick={() => setShowGuestModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Guest Name</label>
                <input type="text" value={guestForm.guest_name} onChange={(e) => setGuestForm({...guestForm, guest_name: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Guest Type</label>
                <select value={guestForm.guest_type} onChange={(e) => setGuestForm({...guestForm, guest_type: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none bg-white">
                  <option value="chief">Chief Guest</option>
                  <option value="honour">Guest of Honour</option>
                </select>
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!guestForm.guest_name.trim()) return toast.error("Guest name is required");
                  setSaving(true);
                  const success = await handleCRUD(`/api/seminars/guests`, "POST", guestForm, "Guest added");
                  setSaving(false);
                  if (success) setShowGuestModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Guest"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SeminarsConferences;
