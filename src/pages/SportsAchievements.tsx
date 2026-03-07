import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Star, 
  History, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  PlusCircle, 
  ShieldCheck 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL;

interface MedalTally {
  id: number;
  medal_type: string;
  details: string;
}

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  badge_text: string;
  year_range: string;
  medals: MedalTally[];
}

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

const SportsAchievements = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<{ achievements: Achievement[]; timeline: TimelineItem[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin states
  const [achModal, setAchModal] = useState<{ type: "add" | "edit"; data?: Achievement } | null>(null);
  const [timelineModal, setTimelineModal] = useState<{ type: "add" | "edit"; data?: TimelineItem } | null>(null);
  const [medalModal, setMedalModal] = useState<{ achId: number; type: "add" | "edit"; data?: MedalTally } | null>(null);
  
  const [achForm, setAchForm] = useState<Partial<Achievement>>({});
  const [timelineForm, setTimelineForm] = useState<Partial<TimelineItem>>({});
  const [medalForm, setMedalForm] = useState<Partial<MedalTally>>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/sports/achievements`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Achievement CRUD ---
  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = achModal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/sports/achievement/${achModal.data?.id}`
      : `${API}/api/admin/sports/achievement`;
    
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(achForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Achievement updated" : "Achievement added");
        setAchModal(null);
        fetchData();
      }
    } catch (err) { toast.error("Error saving achievement"); }
  };

  const handleDeleteAchievement = async (id: number) => {
    if (!window.confirm("Are you sure? This will also delete associated medals.")) return;
    try {
      const res = await fetch(`${API}/api/admin/sports/achievement/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success("Achievement deleted"); fetchData(); }
    } catch (err) { toast.error("Error deleting achievement"); }
  };

  // --- Medal CRUD ---
  const handleSaveMedal = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = medalModal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/sports/medal/${medalModal.data?.id}`
      : `${API}/api/admin/sports/medal`;
    
    const body = isEdit ? medalForm : { ...medalForm, achievement_id: medalModal?.achId };

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        toast.success("Medal saved");
        setMedalModal(null);
        fetchData();
      }
    } catch (err) { toast.error("Error saving medal"); }
  };

  const handleDeleteMedal = async (id: number) => {
    if (!window.confirm("Delete this medal data?")) return;
    try {
      const res = await fetch(`${API}/api/admin/sports/medal/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success("Medal deleted"); fetchData(); }
    } catch (err) { toast.error("Error deleting medal"); }
  };

  // --- Timeline CRUD ---
  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = timelineModal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/sports/timeline/${timelineModal.data?.id}`
      : `${API}/api/admin/sports/timeline`;
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(timelineForm)
      });
      if (res.ok) {
        toast.success("Timeline updated");
        setTimelineModal(null);
        fetchData();
      }
    } catch (err) { toast.error("Error saving timeline"); }
  };

  const handleDeleteTimeline = async (id: number) => {
    if (!window.confirm("Delete this timeline item?")) return;
    try {
      const res = await fetch(`${API}/api/admin/sports/timeline/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success("Timeline deleted"); fetchData(); }
    } catch (err) { toast.error("Error deleting timeline item"); }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="achievements" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="space-y-24">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Achievements & Milestones</h2>
                  <div className="divider-gold mx-auto md:ml-0" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0 italic">
                    "Celebrating the spirit of victory and the dedication of our athletes."
                  </p>
                </div>
                {token && (
                  <button
                    onClick={() => { setAchModal({ type: "add" }); setAchForm({}); }}
                    className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                  >
                    <Plus className="h-4 w-4" /> Add Achievement
                  </button>
                )}
              </div>

              {/* Dynamic Achievements */}
              {data?.achievements.map((achievement, index) => (
                <motion.div 
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8 relative group"
                >
                  {token && (
                    <div className="absolute top-0 right-0 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setAchModal({ type: "edit", data: achievement }); setAchForm(achievement); }}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAchievement(achievement.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Medal className="h-8 w-8 text-gold" />
                    <h3 className="font-serif text-3xl font-bold">{achievement.title}</h3>
                  </div>

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[21/9]">
                     <img 
                      src={achievement.image_url} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover"
                     />
                     {achievement.badge_text && (
                       <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-8">
                         <span className="bg-gold text-navy px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase">
                           {achievement.badge_text}
                         </span>
                       </div>
                     )}
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-4">
                      <h4 className="font-bold text-xl text-navy flex items-center gap-2">
                         <Trophy className="h-5 w-5 text-gold" /> Participation Overview
                      </h4>
                      <div className="text-muted-foreground leading-relaxed prose prose-sm max-w-none">
                        <ReactMarkdown>
                          {typeof achievement.description === "string"
                            ? achievement.description
                            : achievement.description
                            ? JSON.stringify(achievement.description)
                            : ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <div className="bg-navy text-white p-8 rounded-2xl shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xl text-gold">Medal Tally</h4>
                        {token && (
                          <button
                            onClick={() => { setMedalModal({ achId: achievement.id, type: "add" }); setMedalForm({}); }}
                            className="p-1.5 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-navy transition-all"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                         {achievement.medals.map((medal, mIdx) => (
                           <div key={medal.id} className="space-y-1 relative group/medal">
                              {token && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover/medal:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => { setMedalModal({ achId: achievement.id, type: "edit", data: medal }); setMedalForm(medal); }}
                                    className="p-1 rounded bg-white text-navy transform scale-75 shadow-sm"
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMedal(medal.id)}
                                    className="p-1 rounded bg-red-500 text-white transform scale-75 shadow-sm"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                              <div className={cn(
                                "text-3xl font-bold",
                                medal.medal_type.toLowerCase().includes('gold') && "text-gold",
                                medal.medal_type.toLowerCase().includes('silver') && "text-slate-300",
                                medal.medal_type.toLowerCase().includes('bronze') && "text-orange-400 font-bold"
                              )}>
                                {medal.medal_type}
                              </div>
                              <div className="text-[10px] uppercase tracking-tighter opacity-60">
                                {medal.details}
                              </div>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Past Participation - Timeline style */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <History className="h-8 w-8 text-navy" />
                    <h3 className="font-serif text-3xl font-bold">Legacy of Participation</h3>
                  </div>
                  {token && (
                    <button
                      onClick={() => { setTimelineModal({ type: "add" }); setTimelineForm({}); }}
                      className="flex items-center gap-2 rounded-full bg-navy px-6 py-2 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                    >
                      <Plus className="h-4 w-4" /> Add Milestone
                    </button>
                  )}
                </div>

                <div className="relative pl-12 border-l-2 border-dashed border-gold space-y-12">
                   {data?.timeline.map((item, i) => (
                     <div key={item.id} className="relative group/time">
                        <div className="absolute -left-[60px] top-0 h-6 w-6 rounded-full bg-navy border-4 border-white shadow-md flex items-center justify-center">
                           <div className="h-2 w-2 rounded-full bg-gold" />
                        </div>
                        <div className="p-8 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow space-y-2 relative">
                           {token && (
                             <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/time:opacity-100 transition-opacity">
                                <button
                                  onClick={() => { setTimelineModal({ type: "edit", data: item }); setTimelineForm(item); }}
                                  className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform scale-90 shadow-sm"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTimeline(item.id)}
                                  className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all transform scale-90 shadow-sm"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                             </div>
                           )}
                           <span className="text-gold font-bold text-sm tracking-widest">{item.year}</span>
                           <h4 className="text-xl font-bold text-navy">{item.title}</h4>
                           <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      {/* Achievement Modal */}
      {achModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden my-auto shadow-2xl">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" /> {achModal.type === "edit" ? "Edit" : "Add"} Achievement
              </h3>
              <button onClick={() => setAchModal(null)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handleSaveAchievement} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                <input type="text" value={achForm.title || ""} onChange={e => setAchForm({ ...achForm, title: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Badge Text (e.g. 🏆 Best Runner Up)</label>
                  <input type="text" value={achForm.badge_text || ""} onChange={e => setAchForm({ ...achForm, badge_text: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
                  <input type="text" value={achForm.image_url || ""} onChange={e => setAchForm({ ...achForm, image_url: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Overview Description (Markdown supported)</label>
                <textarea rows={4} value={achForm.description || ""} onChange={e => setAchForm({ ...achForm, description: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none resize-none" />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setAchModal(null)} className="flex-1 p-4 rounded-xl border-2 font-black uppercase text-xs tracking-widest">Cancel</button>
                <button type="submit" className="flex-1 p-4 rounded-xl bg-navy text-gold font-black uppercase text-xs tracking-widest hover:bg-gold hover:text-navy transition-all">Save Achievement</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Medal Modal */}
      {medalModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border-t-8 border-gold">
            <div className="p-6 text-center border-b">
              <h3 className="font-serif text-lg font-bold text-navy">Manage Medal Data</h3>
            </div>
            <form onSubmit={handleSaveMedal} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Medal Type / Category</label>
                <input type="text" value={medalForm.medal_type || ""} onChange={e => setMedalForm({ ...medalForm, medal_type: e.target.value })} className="w-full rounded-xl border p-3 text-sm" placeholder="Gold / Silver / etc" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Details / Sports</label>
                <textarea value={medalForm.details || ""} onChange={e => setMedalForm({ ...medalForm, details: e.target.value })} className="w-full rounded-xl border p-3 text-sm" placeholder="Sports list or count" required />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setMedalModal(null)} className="flex-1 p-2.5 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-2 bg-navy text-gold p-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-gold hover:text-navy transition-all">Save Medal</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Timeline Modal */}
      {timelineModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" /> {timelineModal.type === "edit" ? "Edit" : "Add"} Milestone
              </h3>
              <button onClick={() => setTimelineModal(null)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handleSaveTimeline} className="p-8 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Year(s)</label>
                  <input type="text" value={timelineForm.year || ""} onChange={e => setTimelineForm({ ...timelineForm, year: e.target.value })} className="w-full rounded-xl border p-3 text-sm" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                  <input type="text" value={timelineForm.title || ""} onChange={e => setTimelineForm({ ...timelineForm, title: e.target.value })} className="w-full rounded-xl border p-3 text-sm" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                <textarea rows={3} value={timelineForm.description || ""} onChange={e => setTimelineForm({ ...timelineForm, description: e.target.value })} className="w-full rounded-xl border p-3 text-sm resize-none" required />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setTimelineModal(null)} className="flex-1 p-3 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-3 rounded-xl text-[10px] font-black uppercase hover:bg-gold hover:text-navy transition-all">Save Milestone</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SportsAchievements;
