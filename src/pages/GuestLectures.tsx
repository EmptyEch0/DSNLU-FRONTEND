import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Users, PlayCircle, Plus, Pencil, Trash2, X, ShieldCheck, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface GuestLectureVideo {
  id: number;
  lecture_id: number;
  title: string;
  video_url?: string;
  display_order: number;
}

interface GuestLecture {
  id: number;
  year_id: number;
  speaker_name: string;
  designation: string;
  topic: string;
  lecture_date: string;
  description: string;
  image_url: string;
  display_order: number;
  videos: GuestLectureVideo[];
}

interface GuestLectureYear {
  id: number;
  year_label: string;
  display_order: number;
  lectures: GuestLecture[];
}

const GuestLectures = () => {
  const { token } = useAdmin();
  const isAdmin = !!token;
  const [data, setData] = useState<GuestLectureYear[]>([]);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal States
  const [showYearModal, setShowYearModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingYear, setEditingYear] = useState<GuestLectureYear | null>(null);
  const [editingLecture, setEditingLecture] = useState<GuestLecture | null>(null);
  const [editingVideo, setEditingVideo] = useState<GuestLectureVideo | null>(null);

  // Form States
  const [yearForm, setYearForm] = useState({ year_label: "", display_order: 0 });
  const [lectureForm, setLectureForm] = useState({
    speaker_name: "",
    designation: "",
    topic: "",
    lecture_date: "",
    description: "",
    image_url: "",
    display_order: 0,
    year_id: 0
  });
  const [videoForm, setVideoForm] = useState({
    title: "",
    video_url: "",
    display_order: 0,
    lecture_id: 0
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/guest-lectures`);
      const resData = await res.json();
      setData(resData);
      if (resData.length > 0 && !activeYear) {
        setActiveYear(resData[0].year_label);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load guest lectures");
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
    if (!showLectureModal) {
      setEditingLecture(null);
    }
  }, [showLectureModal]);

  useEffect(() => {
    if (!showVideoModal) {
      setEditingVideo(null);
    }
  }, [showVideoModal]);

  const handleCRUD = async (
    url: string,
    method: string,
    body: unknown,
    successMsg: string
  ) => {
    try {
      const currentToken = token || localStorage.getItem("adminToken");
      console.log(`Token at ${method} time:`, currentToken);

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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
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
              Guest Lectures
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

        {/* Year Selection Tabs */}
        <div className="border-b bg-secondary/30 sticky top-[72px] z-20 backdrop-blur-md">
          <div className="container flex items-center justify-center gap-8 py-4 overflow-x-auto no-scrollbar">
            {data.map((year) => (
              <div key={year.id} className="relative group/tab">
                <button
                  onClick={() => setActiveYear(year.year_label)}
                  className={`relative py-2 text-lg font-semibold transition-colors duration-300 whitespace-nowrap ${
                    activeYear === year.year_label ? "text-gold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {year.year_label}
                  {activeYear === year.year_label && (
                    <motion.div
                      layoutId="activeYearUnderline"
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
                        if (confirm("Delete this year and all its lectures?")) {
                          handleCRUD(`/api/admin/guest-lectures/years/${year.id}`, "DELETE", {}, "Year deleted");
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

        {/* Content Section */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="container">
            {isAdmin && activeYearData && (
              <div className="mb-12 flex justify-center">
                <button
                  onClick={() => {
                    setEditingLecture(null);
                    setLectureForm({
                      speaker_name: "",
                      designation: "",
                      topic: "",
                      lecture_date: activeYear || "",
                      description: "",
                      image_url: "",
                      display_order: (activeYearData.lectures?.length || 0) + 1,
                      year_id: activeYearData.id
                    });
                    setShowLectureModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gold/50 px-8 py-4 text-gold hover:bg-gold/5 transition-colors"
                >
                  <Plus className="h-5 w-5" /> Add New Lecture to {activeYear}
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid gap-12 lg:gap-16"
              >
                {!activeYearData || activeYearData.lectures?.length === 0 ? (
                  <div className="text-center text-muted-foreground py-20">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No guest lectures recorded for this year.</p>
                  </div>
                ) : (
                  activeYearData.lectures.map((lecture, index) => (
                    <motion.div
                      key={lecture.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group relative flex flex-col md:flex-row gap-8 lg:gap-12"
                    >
                      {/* Left: Image Placeholder (16:9) */}
                      <div className="md:w-2/5 aspect-video overflow-hidden rounded-2xl shadow-elegant bg-muted relative">
                        <img
                          src={lecture.image_url}
                          alt={lecture.speaker_name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {isAdmin && (
                          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100">
                            <button
                              onClick={() => {
                                setEditingLecture(lecture);
                                setLectureForm({
                                  ...lecture,
                                  year_id: lecture.year_id
                                });
                                setShowLectureModal(true);
                              }}
                              className="p-2 bg-white/90 text-primary rounded-xl shadow-lg hover:bg-gold hover:text-white transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this lecture?")) {
                                  handleCRUD(`/api/admin/guest-lectures/${lecture.id}`, "DELETE", {}, "Lecture deleted");
                                }
                              }}
                              className="p-2 bg-white/90 text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Right: Speaker Info */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-foreground mb-1">{lecture.speaker_name}</h3>
                          <p className="text-gold font-medium text-lg italic">{lecture.designation}</p>
                        </div>
                        
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <div>
                            <span className="font-bold text-foreground">Topic(s): </span>
                            {lecture.topic}
                          </div>
                          <div>
                            <span className="font-bold text-foreground">Date(s): </span>
                            {lecture.lecture_date}
                          </div>
                          <p>{lecture.description}</p>
                          
                          {(lecture.videos?.length > 0 || isAdmin) && (
                            <div className="mt-6 pt-6 border-t border-gold/20">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="flex items-center gap-2 font-bold text-foreground text-lg">
                                  <PlayCircle className="h-5 w-5 text-gold" />
                                  Videos Section:
                                </h4>
                                {isAdmin && (
                                  <button
                                    onClick={() => {
                                      setEditingVideo(null);
                                      setVideoForm({
                                        title: "",
                                        video_url: "",
                                        display_order: (lecture.videos?.length || 0) + 1,
                                        lecture_id: lecture.id
                                      });
                                      setShowVideoModal(true);
                                    }}
                                    className="p-1 px-3 border border-gold/50 rounded-full text-gold text-sm hover:bg-gold/10 flex items-center gap-1"
                                  >
                                    <Plus className="h-3 w-3" /> Add Video
                                  </button>
                                )}
                              </div>
                              <ul className="list-disc list-inside space-y-2">
                                {lecture.videos?.map((vid) => (
                                  <li key={vid.id} className="group/vid flex items-center justify-between">
                                    <span 
                                      className={cn(
                                        "transition-colors",
                                        vid.video_url ? "hover:text-gold cursor-pointer" : ""
                                      )}
                                      onClick={() => vid.video_url && window.open(vid.video_url, '_blank')}
                                    >
                                      {vid.title}
                                    </span>
                                    {isAdmin && (
                                      <div className="flex gap-2 opacity-0 group-hover/vid:opacity-100 transition-all duration-200 scale-95 group-hover/vid:scale-100">
                                        <button 
                                          onClick={() => {
                                            setEditingVideo(vid);
                                            setVideoForm(vid);
                                            setShowVideoModal(true);
                                          }}
                                          className="text-blue-500 hover:scale-110"
                                        >
                                          <Pencil className="h-3 w-3" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm("Delete this video?")) {
                                              handleCRUD(`/api/admin/guest-lectures/videos/${vid.id}`, "DELETE", {}, "Video deleted");
                                            }
                                          }}
                                          className="text-red-500 hover:scale-110"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider for all except last */}
                      {index !== activeYearData.lectures.length - 1 && (
                        <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:hidden lg:block lg:opacity-50" />
                      )}
                    </motion.div>
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
                    ? await handleCRUD(`/api/admin/guest-lectures/years/${editingYear.id}`, "PUT", yearForm, "Year updated")
                    : await handleCRUD(`/api/admin/guest-lectures/years`, "POST", yearForm, "Year added");
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

      {/* Lecture Modal */}
      {showLectureModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingLecture ? "Edit Lecture" : "Add New Lecture"}</h2>
              <button disabled={saving} onClick={() => setShowLectureModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Speaker Name</label>
                <input type="text" value={lectureForm.speaker_name} onChange={(e) => setLectureForm({...lectureForm, speaker_name: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Designation</label>
                <input type="text" value={lectureForm.designation} onChange={(e) => setLectureForm({...lectureForm, designation: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Topic(s)</label>
                <input type="text" value={lectureForm.topic} onChange={(e) => setLectureForm({...lectureForm, topic: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Lecture Date</label>
                <input type="text" value={lectureForm.lecture_date} onChange={(e) => setLectureForm({...lectureForm, lecture_date: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={lectureForm.display_order} onChange={(e) => setLectureForm({...lectureForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Image URL</label>
                <input type="text" value={lectureForm.image_url} onChange={(e) => setLectureForm({...lectureForm, image_url: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Description</label>
                <textarea rows={4} value={lectureForm.description} onChange={(e) => setLectureForm({...lectureForm, description: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
            </div>
            <button
              disabled={saving}
              onClick={async () => {
                if (!lectureForm.speaker_name.trim()) return toast.error("Speaker name is required");
                if (!lectureForm.topic.trim()) return toast.error("Topic is required");
                
                setSaving(true);
                const success = editingLecture 
                  ? await handleCRUD(`/api/admin/guest-lectures/${editingLecture.id}`, "PUT", lectureForm, "Lecture updated")
                  : await handleCRUD(`/api/admin/guest-lectures`, "POST", lectureForm, "Lecture added");
                setSaving(false);
                if (success) setShowLectureModal(false);
              }}
              className="w-full py-4 mt-8 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : editingLecture ? "Save Changes" : "Add Lecture"}
            </button>
          </motion.div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingVideo ? "Edit Video" : "Add Video"}</h2>
              <button disabled={saving} onClick={() => setShowVideoModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Video Title</label>
                <input type="text" value={videoForm.title} onChange={(e) => setVideoForm({...videoForm, title: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Video URL (optional)</label>
                <input type="text" value={videoForm.video_url} onChange={(e) => setVideoForm({...videoForm, video_url: e.target.value})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-muted-foreground">Display Order</label>
                <input type="number" value={videoForm.display_order} onChange={(e) => setVideoForm({...videoForm, display_order: Number(e.target.value) || 0})} className="w-full rounded-lg border border-gold/30 px-4 py-2 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <button
                disabled={saving}
                onClick={async () => {
                  if (!videoForm.title.trim()) return toast.error("Video title is required");
                  setSaving(true);
                  const success = editingVideo 
                    ? await handleCRUD(`/api/admin/guest-lectures/videos/${editingVideo.id}`, "PUT", videoForm, "Video updated")
                    : await handleCRUD(`/api/admin/guest-lectures/videos`, "POST", videoForm, "Video added");
                  setSaving(false);
                  if (success) setShowVideoModal(false);
                }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : editingVideo ? "Save Changes" : "Add Video"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GuestLectures;
