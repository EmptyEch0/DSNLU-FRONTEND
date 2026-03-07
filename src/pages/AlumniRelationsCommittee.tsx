import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Mail, 
  MapPin, 
  ChevronRight,
  UserCheck,
  Star,
  Image as ImageIcon,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  PlusCircle,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

interface AlumniPage {
  id: number;
  slug: string;
  title: string;
  about_text: string;
  address: string;
  email: string;
  footer_note: string;
}

interface AlumniMember {
  id: number;
  page_id: number;
  member_type: "faculty" | "student";
  student_year?: string;
  name: string;
  role: string;
}

interface AlumniEvent {
  id: number;
  page_id: number;
  title: string;
  event_date: string;
  description: string;
}

interface AlumniHighlight {
  id: number;
  event_id: number;
  content: string;
}

interface AlumniGallery {
  id: number;
  page_id: number;
  image_url: string;
}

interface AlumniData {
  page: AlumniPage;
  members: AlumniMember[];
  events: AlumniEvent[];
  highlights: AlumniHighlight[];
  gallery: AlumniGallery[];
}

const AlumniRelationsCommittee = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<AlumniData | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin states
  const [modal, setModal] = useState<{ 
    type: "member" | "event" | "highlight" | "gallery" | "page"; 
    mode: "add" | "edit"; 
    data?: AlumniMember | AlumniEvent | AlumniHighlight | AlumniGallery | AlumniPage 
  } | null>(null);
  const [formData, setFormData] = useState<Partial<AlumniMember & AlumniEvent & AlumniHighlight & AlumniGallery & AlumniPage>>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/alumni`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load alumni data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.page?.id) return;

    let url = "";
    let method = modal?.mode === "edit" ? "PUT" : "POST";

    switch (modal?.type) {
      case "member":
        url = modal.mode === "edit" ? `${API}/api/admin/alumni/member/${modal.data.id}` : `${API}/api/admin/alumni/member`;
        break;
      case "event":
        url = modal.mode === "edit" ? `${API}/api/admin/alumni/event/${modal.data.id}` : `${API}/api/admin/alumni/event`;
        break;
      case "highlight":
        url = modal.mode === "edit" ? `${API}/api/admin/alumni/highlight/${modal.data.id}` : `${API}/api/admin/alumni/highlight`;
        break;
      case "gallery":
        url = modal.mode === "edit" ? `${API}/api/admin/alumni/gallery/${modal.data.id}` : `${API}/api/admin/alumni/gallery`;
        break;
      case "page":
        url = `${API}/api/admin/alumni/page`;
        method = "PUT";
        break;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          page_id: data.page.id
        })
      });

      if (res.ok) {
        toast.success("Saved successfully");
        setModal(null);
        fetchData();
      } else {
        toast.error("Failed to save");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(`${API}/api/admin/alumni/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success("Deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  const facultyMembers = data?.members?.filter(m => m.member_type === "faculty") || [];
  const studentMembers = data?.members?.filter(m => m.member_type === "student") || [];

  const groupedStudents = studentMembers.reduce((acc: Record<string, AlumniMember[]>, student) => {
    const year = student.student_year || "Miscellaneous";
    if (!acc[year]) acc[year] = [];
    acc[year].push(student);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center justify-between py-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link to="/" className="transition-colors hover:text-gold">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Students</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Committees & Societies</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-gold">Alumni Relations Committee</span>
            </div>
            {token && (
              <button
                onClick={() => {
                  setModal({ type: "page", mode: "edit", data: data?.page });
                  setFormData(data?.page || {});
                }}
                className="flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
              >
                <Pencil className="h-3 w-3" />
                Edit Page Content
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-navy py-20 lg:py-32 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-152305085306e-8c3d3efcd35f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest border border-gold/30">
                Connecting Generations. Strengthening Legacy. Inspiring Futures.
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight">
                Alumni Relations <br className="hidden md:block" /> Committee
              </h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mx-auto h-1.5 w-32 rounded-full bg-gold" 
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold mb-4 shadow-sm">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">About the Committee</h2>
              <div className="divider-gold mx-auto" />
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                {data?.page?.about_text || "The Alumni Relations Committee of Damodaram Sanjivayya National Law University (DSNLU) serves as a vital bridge between the University and its alumni network..."}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Faculty Members */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Faculty / Staff Members</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button
                  onClick={() => {
                    setModal({ type: "member", mode: "add" });
                    setFormData({ member_type: "faculty", display_order: 0 });
                  }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add Faculty
                </button>
              )}
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {facultyMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative p-8 rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group",
                    member.role === "Convenor" ? "border-gold/50 shadow-md" : "hover:border-gold/30"
                  )}
                >
                  {token && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setModal({ type: "member", mode: "edit", data: member });
                          setFormData(member);
                        }}
                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("member", member.id)}
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="space-y-4 text-center">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mx-auto transition-colors",
                      member.role === "Convenor" ? "bg-gold text-white" : "bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white"
                    )}>
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy group-hover:text-gold transition-colors">{member.name}</h3>
                      <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Members */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Student Members</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button
                  onClick={() => {
                    setModal({ type: "member", mode: "add" });
                    setFormData({ member_type: "student", display_order: 0 });
                  }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add Student
                </button>
              )}
            </div>

            <div className="space-y-12">
              {Object.keys(groupedStudents).sort().reverse().map((year, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <GraduationCap className="h-6 w-6 text-gold" />
                    <h3 className="text-xl font-bold text-navy">{year}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold/50 to-transparent" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pl-10">
                    {groupedStudents[year].map((student: AlumniMember, idx: number) => (
                      <div key={student.id} className="group flex items-center justify-between gap-3 text-muted-foreground hover:text-navy transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          <span className="font-medium">{student.name}</span>
                        </div>
                        {token && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setModal({ type: "member", mode: "edit", data: student });
                                setFormData(student);
                              }}
                              className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDelete("member", student.id)}
                              className="p-1 rounded-full text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 lg:py-24 bg-navy text-white relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="flex items-center justify-between mb-20">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold uppercase tracking-widest">Committees Events</h2>
                <div className="divider-gold bg-gold" />
              </div>
              {token && (
                <button
                  onClick={() => {
                    setModal({ type: "event", mode: "add" });
                    setFormData({ display_order: 0 });
                  }}
                  className="flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-black uppercase tracking-wider text-navy hover:bg-white hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add Event
                </button>
              )}
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {data?.events?.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-10 space-y-8 relative overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 h-40 w-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors" />
                  
                  {token && (
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                      <button
                        onClick={() => {
                          setModal({ type: "event", mode: "edit", data: event });
                          setFormData(event);
                        }}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-gold hover:text-navy transition-all"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("event", event.id)}
                        className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3 text-gold font-bold uppercase tracking-widest text-sm">
                      <Star className="h-5 w-5 fill-current" /> Highlights
                    </div>
                    <h3 className="font-serif text-3xl font-bold">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gold/80 font-medium">
                      <Calendar className="h-4 w-4" />
                      <span>{event.event_date}</span>
                    </div>
                    <p className="text-primary-foreground/70 leading-relaxed italic">
                      {event.description}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gold flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Clock className="h-4 w-4" /> Event Highlights
                      </h4>
                      {token && (
                        <button
                          onClick={() => {
                            setModal({ type: "highlight", mode: "add", data: { event_id: event.id } });
                            setFormData({ event_id: event.id, display_order: 0 });
                          }}
                          className="text-[10px] font-bold text-gold/60 hover:text-gold uppercase flex items-center gap-1"
                        >
                          <PlusCircle className="h-3 w-3" /> Add Highlight
                        </button>
                      )}
                    </div>
                    <ul className="space-y-3 text-sm text-primary-foreground/60 pl-2">
                      {data.highlights
                        .filter(h => h.event_id === event.id)
                        .map((highlight) => (
                          <li key={highlight.id} className="group/item flex items-start gap-2 justify-between">
                            <div className="flex gap-2">
                              <span className="text-gold">•</span> {highlight.content}
                            </div>
                            {token && (
                              <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                                <button
                                  onClick={() => {
                                    setModal({ type: "highlight", mode: "edit", data: highlight });
                                    setFormData(highlight);
                                  }}
                                  className="p-1 text-gold/50 hover:text-gold"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDelete("highlight", highlight.id)}
                                  className="p-1 text-red-400/50 hover:text-red-400"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-20">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Gallery Section</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button
                  onClick={() => {
                    setModal({ type: "gallery", mode: "add" });
                    setFormData({ display_order: 0 });
                  }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add Photo
                </button>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {data?.gallery?.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.15,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="relative group aspect-video overflow-hidden rounded-2xl shadow-elegant bg-muted"
                >
                  <motion.img 
                    src={img.image_url} 
                    alt={`Alumni Meet photo ${i + 1}`}
                    className="w-full h-full object-cover transition-all duration-700"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: i % 2 === 0 ? 1.5 : -1.5,
                    }}
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    {token ? (
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setModal({ type: "gallery", mode: "edit", data: img });
                            setFormData(img);
                          }}
                          className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl"
                        >
                          <Pencil className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => handleDelete("gallery", img.id)}
                          className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl"
                        >
                          <Trash2 className="h-6 w-6" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <ImageIcon className="h-8 w-8 text-gold mx-auto mb-3" />
                         <p className="text-white font-serif text-xl">Alumni Meet @ DSNLU</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-secondary/10">
          <div className="container max-w-4xl">
            <div className="p-10 md:p-16 rounded-3xl border bg-card shadow-elegant text-center space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy">Connect With Us</h2>
                <div className="divider-gold mx-auto" />
              </div>
              
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold">University Address</h4>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {data?.page?.address || "Damodaram Sanjivayya National Law University\nNYAYAPRASTHA, Sabbavaram\nVisakhapatnam – 531035\nAndhra Pradesh, India"}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Official Email</h4>
                  <a href={`mailto:${data?.page?.email || "alumni@dsnlu.ac.in"}`} className="text-xl font-serif font-bold text-navy hover:text-gold transition-colors block">
                    {data?.page?.email || "alumni@dsnlu.ac.in"}
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">{data?.page?.footer_note || "Connecting alumni for institutional excellence."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Admin Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-navy p-6 text-white flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                {modal.mode === "edit" ? "Edit" : "Add"} {modal.type.charAt(0).toUpperCase() + modal.type.slice(1)}
              </h3>
              <button 
                onClick={() => setModal(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-5">
              {modal.type === "page" && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">About Text</label>
                    <textarea
                      rows={6}
                      value={formData.about_text || ""}
                      onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="About committee..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address</label>
                    <textarea
                      rows={3}
                      value={formData.address || ""}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="University address..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Official Email</label>
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="email@dsnlu.ac.in"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Footer Note</label>
                      <input
                        type="text"
                        value={formData.footer_note || ""}
                        onChange={(e) => setFormData({ ...formData, footer_note: e.target.value })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="Short note..."
                      />
                    </div>
                  </div>
                </>
              )}

              {modal.type === "member" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Member Type</label>
                      <select
                        value={formData.member_type || ""}
                        onChange={(e) => setFormData({ ...formData, member_type: e.target.value as AlumniMember["member_type"] })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="faculty">Faculty / Staff</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.display_order ?? ""}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {formData.member_type === "student" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Batch / Year</label>
                      <input
                        type="text"
                        value={formData.student_year || ""}
                        onChange={(e) => setFormData({ ...formData, student_year: e.target.value })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="e.g. 5th Year"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="Enter name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role / Designation</label>
                    <input
                      type="text"
                      value={formData.role || ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="e.g. Convenor / Member"
                    />
                  </div>
                </>
              )}

              {modal.type === "event" && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Event Title</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="Event name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Event Date</label>
                      <input
                        type="text"
                        value={formData.event_date || ""}
                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="e.g. Oct 14-15, 2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.display_order ?? ""}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                        className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                    <textarea
                      rows={4}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="Event description..."
                    />
                  </div>
                </>
              )}

              {modal.type === "highlight" && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Highlight Content</label>
                    <textarea
                      rows={3}
                      value={formData.content || ""}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="Highlight point..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order ?? ""}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {modal.type === "gallery" && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
                    <input
                      type="text"
                      value={formData.image_url || ""}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="https://..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order ?? ""}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-xl border-2 border-secondary p-3 text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-navy p-3 text-xs font-black uppercase tracking-widest text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  {modal.mode === "edit" ? "Save Changes" : "Create Item"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AlumniRelationsCommittee;
