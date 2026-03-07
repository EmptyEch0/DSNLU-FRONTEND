import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Mail, Linkedin, Instagram, Phone, User, ExternalLink, Download, Trophy, Users, Clock, MapPin, Loader2, Plus, Pencil, Trash2, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface GalleryItem {
  id: number;
  image_url: string;
  caption?: string;
}

interface Edition {
  id: number;
  edition_title: string;
  edition_year?: string;
  description: string;
  summary?: string;
  is_archived: boolean;
  gallery: GalleryItem[];
}

interface TimelineItem {
  id: number;
  timeline_date: string;
  timeline_event: string;
  display_order: number;
}

interface Coordinator {
  id: number;
  coordinator_name: string;
  role: string;
  type: 'faculty' | 'student';
  phone?: string;
  email?: string;
  display_order: number;
}

interface Registration {
  id: number;
  provisional_start?: string;
  provisional_end?: string;
  final_start?: string;
  final_end?: string;
  registration_fee?: string;
  register_link?: string;
  capacity?: string;
  brochure_link?: string;
}

interface Contact {
  id: number;
  email?: string;
  linkedin_link?: string;
  instagram_link?: string;
  faculty_name?: string;
  faculty_phone?: string;
  faculty_email?: string;
}

interface NMCData {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  logo_url: string;
  hero_logo?: string;
  timeline: TimelineItem[];
  registration: Registration;
  contact: Contact;
  coordinators: Coordinator[];
  editions: Edition[];
}

const NMCPage = () => {
  const [data, setData] = useState<NMCData | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAdmin();
  const isAdmin = !!token;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/competitions/nmc`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch NMC data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCRUD = async (
    url: string,
    method: string,
    body: unknown,
    successMsg: string
  ) => {
    try {
      const currentToken = token || localStorage.getItem("admin_token");
      const res = await fetch(`${API}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`
        },
        body: method !== "DELETE" ? JSON.stringify(body) : undefined
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result?.message || "Operation failed");
      }

      toast.success(successMsg);
      await fetchData();
      return true;
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      return false;
    }
  };

  // --- Modals State ---
  const [showCompModal, setShowCompModal] = useState(false);
  const [compForm, setCompForm] = useState({ title: "", subtitle: "", description: "", hero_logo: "", logo_url: "" });

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(null);
  const [timelineForm, setTimelineForm] = useState({ timeline_event: "", timeline_date: "", display_order: 0 });

  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState<Partial<Registration>>({});

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState<Partial<Contact>>({});

  const [showCoordModal, setShowCoordModal] = useState(false);
  const [editingCoord, setEditingCoord] = useState<Coordinator | null>(null);
  const [coordForm, setCoordForm] = useState({ coordinator_name: "", role: "", type: "student" as const, display_order: 0 });

  const [showEditionModal, setShowEditionModal] = useState(false);
  const [editingEdition, setEditingEdition] = useState<Edition | null>(null);
  const [editionForm, setEditionForm] = useState({ edition_title: "", edition_year: "", description: "", summary: "", is_archived: false, display_order: 0 });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ edition_id: 0, image_url: "", display_order: 0 });

  // --- Initialize Forms ---
  useEffect(() => {
    if (data) {
      setCompForm({ 
        title: data.title, 
        subtitle: data.subtitle || "", 
        description: data.description, 
        hero_logo: data.hero_logo || "", 
        logo_url: data.logo_url 
      });
      if (data.registration) setRegForm({ ...data.registration });
      if (data.contact) setContactForm({ ...data.contact });
    }
  }, [data]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-[#0f2d5c] animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 text-sm text-gray-500">
          <span className="hover:text-[#0f2d5c] cursor-pointer">Programs</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#0f2d5c] cursor-pointer">Competitions</span>
          <span className="mx-2">/</span>
          <span className="text-[#0f2d5c] font-semibold">NMC</span>
        </div>
      </div>

      <main className="flex-1">
        {/* 1️⃣ ABOUT NMC */}
        <section id="nmc-about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
              <img 
                src={data.hero_logo || data.logo_url || "https://dsnlu.ac.in/storage/2026/01/logo.webp"} 
                alt="NMC Logo" 
                className="w-32 h-auto object-contain"
              />
              <div className="flex-1 group relative">
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#0f2d5c] uppercase leading-tight mb-4">
                  {data.title}
                </h1>
                {data.subtitle && <p className="text-xl text-[#c9a227] font-serif mb-4 italic">{data.subtitle}</p>}
                <div className="h-1 w-32 bg-[#c9a227] rounded-full" />
                
                {isAdmin && (
                  <button 
                    onClick={() => setShowCompModal(true)}
                    className="absolute -top-4 -right-4 p-2 bg-white shadow-xl rounded-full text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all z-20"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div {...fadeIn} className="relative group">
                  <div 
                    className="text-gray-700 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                  {isAdmin && (
                    <button 
                      onClick={() => setShowCompModal(true)}
                      className="absolute -top-4 -right-4 p-2 bg-white shadow-xl rounded-full text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>

                {/* Timeline */}
                {data.timeline && (
                  <motion.div {...fadeIn} className="mt-12 group relative">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] uppercase tracking-wide">Timeline</h3>
                      {isAdmin && (
                        <Button 
                          onClick={() => {
                            setEditingTimeline(null);
                            setTimelineForm({ timeline_event: "", timeline_date: "", display_order: data.timeline.length + 1 });
                            setShowTimelineModal(true);
                          }}
                          className="bg-[#0f2d5c] hover:bg-[#1a3d7c] h-8 px-3 text-xs gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Event
                        </Button>
                      )}
                    </div>
                    <div className="relative pl-8 space-y-8">
                      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200" />
                      {data.timeline.map((item, idx) => (
                        <div key={idx} className="relative group/item">
                          <div className="absolute -left-[24px] top-1 w-4 h-4 rounded-full bg-[#c9a227] shadow-sm z-10" />
                          <div>
                            <p className="text-[#c9a227] font-bold text-sm uppercase mb-1">{item.timeline_date}</p>
                            <p className="text-[#0f2d5c] font-bold text-lg">{item.timeline_event}</p>
                          </div>
                          {isAdmin && (
                            <div className="absolute -right-4 top-0 flex gap-2 opacity-0 group-hover/item:opacity-100 transition-all">
                              <button onClick={() => {
                                setEditingTimeline(item);
                                setTimelineForm({ ...item });
                                setShowTimelineModal(true);
                              }} className="p-1 text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></button>
                              <button onClick={() => handleCRUD(`/api/competitions/timeline/${item.id}`, "DELETE", null, "Event deleted")} className="p-1 text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Sidebar - Registration & Contact */}
              <div className="space-y-8">
                {data.registration && (
                  <motion.div 
                    {...fadeIn}
                    className="bg-[#0f2d5c] text-white p-8 rounded-2xl shadow-xl border-t-8 border-[#c9a227] relative group"
                  >
                    <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                      <Trophy className="text-[#c9a227]" />
                      Registration Details
                    </h3>

                    {isAdmin && (
                      <button 
                        onClick={() => setShowRegModal(true)}
                        className="absolute -top-3 -right-3 p-2 bg-white shadow-xl rounded-full text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                    <div className="space-y-6">
                      {(data.registration.provisional_start || data.registration.provisional_end) && (
                        <div>
                          <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Provisional Registration</p>
                          <p className="text-lg">
                            {data.registration.provisional_start} {data.registration.provisional_end ? `– ${data.registration.provisional_end}` : ''}
                          </p>
                        </div>
                      )}
                      {(data.registration.final_start || data.registration.final_end) && (
                        <div>
                          <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Final Registration</p>
                          <p className="text-lg">
                            {data.registration.final_start} {data.registration.final_end ? `– ${data.registration.final_end}` : ''}
                          </p>
                        </div>
                      )}
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Registration Fee</p>
                        <p className="text-3xl font-bold text-[#c9a227]">{data.registration.registration_fee || "N/A"}</p>
                      </div>
                      <Button 
                        asChild
                        className="w-full bg-[#c9a227] hover:bg-[#b08e22] text-[#0f2d5c] font-bold py-6 rounded-xl mt-4"
                      >
                        <a href={data.registration.register_link || "#"} target="_blank" rel="noopener noreferrer">
                          REGISTER NOW
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  {...fadeIn}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative group"
                >
                  <h3 className="font-serif text-xl font-bold text-[#0f2d5c] mb-6 border-b border-gray-100 pb-4">
                    Contact Us
                  </h3>

                  {isAdmin && (
                    <button 
                      onClick={() => setShowContactModal(true)}
                      className="absolute -top-3 -right-3 p-2 bg-white shadow-xl rounded-full text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  <div className="space-y-6">
                    {data.contact?.email && (
                      <a href={`mailto:${data.contact.email}`} className="flex items-center gap-4 text-gray-600 hover:text-[#0f2d5c] group transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{data.contact.email}</span>
                      </a>
                    )}
                    <div className="flex gap-4">
                      {data.contact?.linkedin_link && (
                        <a href={data.contact.linkedin_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {data.contact?.instagram_link && (
                        <a href={data.contact.instagram_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all">
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    
                    {/* Faculty Details from Contact Object */}
                    {data.contact?.faculty_name && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-[#c9a227] text-xs font-bold uppercase mb-4 tracking-widest">Faculty Coordinator</p>
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-bold text-[#0f2d5c]">{data.contact.faculty_name}</p>
                            {data.contact.faculty_phone && <p className="text-sm text-gray-600 flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> {data.contact.faculty_phone}</p>}
                            {data.contact.faculty_email && <p className="text-sm text-gray-600 flex items-center gap-1 break-all"><Mail className="w-3 h-3" /> {data.contact.faculty_email}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest">Student Coordinators</p>
                        {isAdmin && (
                          <button 
                            onClick={() => {
                              setEditingCoord(null);
                              setCoordForm({ coordinator_name: "", role: "Student Coordinator", type: "student", display_order: 0 });
                              setShowCoordModal(true);
                            }}
                            className="text-[#0f2d5c] hover:text-[#c9a227]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {data.coordinators?.map((coord) => (
                          <div key={coord.id} className="bg-gray-50 p-3 rounded-lg text-center relative group/coord">
                            <p className="text-xs font-bold text-[#0f2d5c]">{coord.coordinator_name}</p>
                            {isAdmin && (
                              <button 
                                onClick={() => handleCRUD(`/api/competitions/coordinators/${coord.id}`, "DELETE", null, "Coordinator deleted")}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover/coord:opacity-100 transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Editions */}
        <AnimatePresence>
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 flex justify-end">
              {isAdmin && (
                <Button 
                  onClick={() => {
                    setEditingEdition(null);
                    setEditionForm({ edition_title: "", edition_year: "", description: "", summary: "", is_archived: false, display_order: 0 });
                    setShowEditionModal(true);
                  }}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add New Edition
                </Button>
              )}
            </div>
          </div>
          {data.editions?.map((edition, edIdx) => (
            <section 
              key={edition.id} 
              id={`nmc-edition-${edition.id}`} 
              className={cn("py-24 relative group", edition.is_archived ? "bg-gray-50" : "bg-white")}
            >
              {isAdmin && (
                <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setEditingEdition(edition);
                      setEditionForm({ ...edition, display_order: 0 }); // Adding display_order default
                      setShowEditionModal(true);
                    }}
                    className="h-10 px-4 gap-2"
                  >
                    <Pencil className="w-4 h-4" /> Edit Edition
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleCRUD(`/api/competitions/editions/${edition.id}`, "DELETE", null, "Edition deleted")}
                    className="h-10 px-4 gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              )}
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0f2d5c] mb-4 uppercase">
                    {edition.edition_title} {edition.edition_year ? `– ${edition.edition_year}` : ''}
                  </h2>
                  <div className="h-1 w-24 bg-[#c9a227] rounded-full mb-8" />
                  <motion.div {...fadeIn}>
                    <div 
                      className="text-gray-700 leading-relaxed text-lg mb-6"
                      dangerouslySetInnerHTML={{ __html: edition.description }}
                    />
                    {edition.summary && (
                      <p className="text-gray-700 leading-relaxed text-lg italic">
                        {edition.summary}
                      </p>
                    )}
                  </motion.div>
                </div>

                {!edition.is_archived && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div {...fadeIn} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <Users className="text-[#c9a227] w-8 h-8" />
                        <h4 className="font-serif text-xl font-bold text-[#0f2d5c]">Registration Summary</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Total Capacity: {data.registration?.capacity || "N/A"}
                      </p>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600">Provisional Window</span>
                        <span className="font-bold text-[#0f2d5c]">{data.registration?.provisional_start}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600">Final Window</span>
                        <span className="font-bold text-[#0f2d5c]">{data.registration?.final_start}</span>
                      </div>
                    </motion.div>

                    <motion.div {...fadeIn} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <Clock className="text-[#c9a227] w-8 h-8" />
                        <h4 className="font-serif text-xl font-bold text-[#0f2d5c]">Quick Timeline</h4>
                      </div>
                      <div className="space-y-3">
                        {data.timeline?.slice(0, 3).map((t, i) => (
                           <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" /> 
                             {t.timeline_event}: {t.timeline_date}
                           </p>
                        ))}
                      </div>
                      {data.registration?.brochure_link && (
                        <Button variant="outline" asChild className="mt-6 border-[#0f2d5c] text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white flex items-center gap-2">
                          <a href={data.registration.brochure_link} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" /> Download Brochure
                          </a>
                        </Button>
                      )}
                    </motion.div>
                  </div>
                )}

                {edition.gallery && (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-sm font-bold text-[#c9a227] uppercase tracking-[0.2em]">
                        Gallery
                      </h3>
                      {isAdmin && (
                        <Button 
                          onClick={() => {
                            setGalleryForm({ edition_id: edition.id, image_url: "", display_order: edition.gallery.length + 1 });
                            setShowGalleryModal(true);
                          }}
                          className="bg-[#c9a227] hover:bg-[#b08e22] text-[#0f2d5c] h-8 px-3 text-xs gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Image
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {edition.gallery.map((img) => (
                        <motion.div
                          key={img.id}
                          {...fadeIn}
                          whileHover={{ y: -5 }}
                          className="group/gallery relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                          <img 
                            src={img.image_url} 
                            alt={img.caption || "Gallery Image"} 
                            className={cn("w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", !edition.is_archived && "opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100")} 
                          />
                          {isAdmin && (
                            <button 
                              onClick={() => handleCRUD(`/api/competitions/gallery/${img.id}`, "DELETE", null, "Image removed")}
                              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-all z-20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          {!edition.is_archived && !isAdmin && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-gray-100 group-hover:opacity-0 transition-opacity">
                                <p className="text-[10px] font-bold text-[#0f2d5c] uppercase tracking-widest leading-none">Awaiting Memories</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d5c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          ))}
        </AnimatePresence>
      </main>
      
      <Footer />

      {/* --- ADMIN MODALS --- */}
      <AnimatePresence>
        {/* Competition Modal */}
        {showCompModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#c9a227]" />
                  Edit Competition Info
                </h2>
                <button onClick={() => setShowCompModal(false)} className="hover:rotate-90 transition-transform">
                  <X />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Main Title</label>
                    <input value={compForm.title} onChange={e => setCompForm({...compForm, title: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Subtitle (Italic)</label>
                    <input value={compForm.subtitle} onChange={e => setCompForm({...compForm, subtitle: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Description (HTML Supported)</label>
                  <textarea rows={6} value={compForm.description} onChange={e => setCompForm({...compForm, description: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none font-mono text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Main Logo URL</label>
                    <input value={compForm.logo_url} onChange={e => setCompForm({...compForm, logo_url: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Hero Logo URL (Alt)</label>
                    <input value={compForm.hero_logo} onChange={e => setCompForm({...compForm, hero_logo: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowCompModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => handleCRUD(`/api/competitions/nmc`, "PUT", compForm, "Competition updated").then(ok => ok && setShowCompModal(false))}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Timeline Modal */}
        {showTimelineModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold">{editingTimeline ? "Edit Event" : "Add New Event"}</h2>
                <button onClick={() => setShowTimelineModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Event Title</label>
                  <input value={timelineForm.timeline_event} onChange={e => setTimelineForm({...timelineForm, timeline_event: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" placeholder="e.g. Provisional Registration Closes" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Date/Time</label>
                  <input value={timelineForm.timeline_date} onChange={e => setTimelineForm({...timelineForm, timeline_date: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" placeholder="e.g. 15 February 2026" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Order</label>
                  <input type="number" value={timelineForm.display_order} onChange={e => setTimelineForm({...timelineForm, display_order: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowTimelineModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => {
                    const url = editingTimeline ? `/api/competitions/timeline/${editingTimeline.id}` : "/api/competitions/timeline";
                    const method = editingTimeline ? "PUT" : "POST";
                    const body = editingTimeline ? timelineForm : { ...timelineForm, competition_id: data?.id };
                    handleCRUD(url, method, body, editingTimeline ? "Event updated" : "Event added").then(ok => ok && setShowTimelineModal(false));
                  }}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  {editingTimeline ? "Update" : "Add Event"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold">Edit Registration Windows</h2>
                <button onClick={() => setShowRegModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Provisional Start</label>
                    <input value={regForm.provisional_start || ""} onChange={e => setRegForm({...regForm, provisional_start: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Provisional End</label>
                    <input value={regForm.provisional_end || ""} onChange={e => setRegForm({...regForm, provisional_end: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Final Start</label>
                    <input value={regForm.final_start || ""} onChange={e => setRegForm({...regForm, final_start: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Final End</label>
                    <input value={regForm.final_end || ""} onChange={e => setRegForm({...regForm, final_end: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Registration Fee</label>
                    <input value={regForm.registration_fee || ""} onChange={e => setRegForm({...regForm, registration_fee: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Capacity</label>
                    <input value={regForm.capacity || ""} onChange={e => setRegForm({...regForm, capacity: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Registration Link (Google Form)</label>
                  <input value={regForm.register_link || ""} onChange={e => setRegForm({...regForm, register_link: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Brochure Link (Direct PDF)</label>
                  <input value={regForm.brochure_link || ""} onChange={e => setRegForm({...regForm, brochure_link: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowRegModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => handleCRUD(`/api/competitions/registration/${data?.registration.id}`, "PUT", regForm, "Registration updated").then(ok => ok && setShowRegModal(false))}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  Save Windows
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold">Edit Contact Information</h2>
                <button onClick={() => setShowContactModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Official Email</label>
                    <input value={contactForm.email || ""} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">LinkedIn Link</label>
                    <input value={contactForm.linkedin_link || ""} onChange={e => setContactForm({...contactForm, linkedin_link: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Instagram Link</label>
                    <input value={contactForm.instagram_link || ""} onChange={e => setContactForm({...contactForm, instagram_link: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs font-bold uppercase text-[#c9a227] mb-2">Primary Faculty Coordinator</p>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                      <input value={contactForm.faculty_name || ""} onChange={e => setContactForm({...contactForm, faculty_name: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Phone</label>
                        <input value={contactForm.faculty_phone || ""} onChange={e => setContactForm({...contactForm, faculty_phone: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                        <input value={contactForm.faculty_email || ""} onChange={e => setContactForm({...contactForm, faculty_email: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowContactModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => handleCRUD(`/api/competitions/contact/${data?.contact.id}`, "PUT", contactForm, "Contacts updated").then(ok => ok && setShowContactModal(false))}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  Save Contacts
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Student Coordinator Modal */}
        {showCoordModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold">Add Student Coordinator</h2>
                <button onClick={() => setShowCoordModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">FullName</label>
                  <input value={coordForm.coordinator_name} onChange={e => setCoordForm({...coordForm, coordinator_name: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowCoordModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => handleCRUD("/api/competitions/coordinators", "POST", { ...coordForm, competition_id: data?.id }, "Coordinator added").then(ok => ok && setShowCoordModal(false))}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  Add Coordinator
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edition Modal */}
        {showEditionModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#0f2d5c] text-white">
                <h2 className="text-xl font-bold">{editingEdition ? "Edit Edition" : "New Edition"}</h2>
                <button onClick={() => setShowEditionModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Edition Title</label>
                    <input value={editionForm.edition_title} onChange={e => setEditionForm({...editionForm, edition_title: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Year</label>
                    <input value={editionForm.edition_year} onChange={e => setEditionForm({...editionForm, edition_year: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                  <textarea rows={4} value={editionForm.description} onChange={e => setEditionForm({...editionForm, description: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Summary (Italic/Bottom)</label>
                  <input value={editionForm.summary} onChange={e => setEditionForm({...editionForm, summary: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" checked={editionForm.is_archived} onChange={e => setEditionForm({...editionForm, is_archived: e.target.checked})} id="archived-check" />
                  <label htmlFor="archived-check" className="text-sm font-medium text-gray-700">Mark as Archival Edition (Gray Background)</label>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowEditionModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => {
                    const url = editingEdition ? `/api/competitions/editions/${editingEdition.id}` : "/api/competitions/editions";
                    const method = editingEdition ? "PUT" : "POST";
                    const body = editingEdition ? editionForm : { ...editionForm, competition_id: data?.id };
                    handleCRUD(url, method, body, editingEdition ? "Edition updated" : "Edition created").then(ok => ok && setShowEditionModal(false));
                  }}
                  className="bg-[#0f2d5c] hover:bg-[#1a3d7c]"
                >
                  {editingEdition ? "Update" : "Create Edition"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Gallery Modal */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#c9a227] text-[#0f2d5c]">
                <h2 className="text-xl font-bold">Add Image to Gallery</h2>
                <button onClick={() => setShowGalleryModal(false)}><X /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Image URL</label>
                  <input value={galleryForm.image_url} onChange={e => setGalleryForm({...galleryForm, image_url: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" placeholder="https://..." />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Display Order</label>
                  <input type="number" value={galleryForm.display_order} onChange={e => setGalleryForm({...galleryForm, display_order: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] outline-none" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowGalleryModal(false)}>Cancel</Button>
                <Button 
                  onClick={() => handleCRUD("/api/competitions/gallery", "POST", galleryForm, "Image added").then(ok => ok && setShowGalleryModal(false))}
                  className="bg-[#c9a227] text-[#0f2d5c] font-bold"
                >
                  Confirm Upload
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NMCPage;
