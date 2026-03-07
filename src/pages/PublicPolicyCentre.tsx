import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark, FileText, Download, Target, Users, Edit, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 10;

interface CentreContent {
  id: number | string;
  centre_id?: number;
  title: string;
  content: string;
}

interface Brochure {
  id: number | null;
  centre_id?: number;
  title: string;
  file_url: string;
}

const PublicPolicyCentre = () => {
  const { token } = useAdmin();
  const [content, setContent] = useState<CentreContent | null>(null);
  const [brochure, setBrochure] = useState<Brochure | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"about" | "brochure">("about");
  const [editItem, setEditItem] = useState<CentreContent | Brochure | { id: string | number | null } | null>(null);

  // Form states for About
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutText, setAboutText] = useState("");

  // Form states for Brochure
  const [brochureTitle, setBrochureTitle] = useState("");
  const [brochureUrl, setBrochureUrl] = useState("");

  useEffect(() => {
    fetchContent();
    fetchBrochure();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/content`);
      const data = await res.json();
      if (data && data.length > 0) {
        setContent(data[0]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchBrochure = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/brochure`);
      const data = await res.json();
      // data might be null if not found
      if (data && Object.keys(data).length > 0) {
        setBrochure(data);
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  const openEditAbout = () => {
    setModalType("about");
    setAboutTitle(content?.title || "About the Centre");
    setAboutText(content?.content || "");
    setEditItem(content || { id: "new" });
    setShowModal(true);
  };

  const openEditBrochure = () => {
    setModalType("brochure");
    setBrochureTitle(brochure?.title || "Center for Law & Policy Brochure");
    setBrochureUrl(brochure?.file_url || "https://dsnlu.ac.in/storage/2025/01/center_law_policy_brochure.pdf");
    setEditItem(brochure || { id: null });
    setShowModal(true);
  };

  const handleSaveAbout = async () => {
    if (!editItem) return;
    const item = editItem as CentreContent | { id: string };
    try {
      const idStr = (item.id !== "new") ? `/${item.id}` : "";
      const url = `${API}/api/centres/admin/content${idStr}`; 
        
      await fetch(url, {
        method: item.id !== "new" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: aboutTitle, content: aboutText }),
      });
      toast.success("About section updated");
      fetchContent();
      setShowModal(false);
    } catch (error) {
      toast.error("Error updating about section");
    }
  };

  const handleSaveBrochure = async () => {
    if (!editItem) return;
    const item = editItem as Brochure;
    try {
      const idValue = item.id || null;
      const url = idValue 
        ? `${API}/api/centres/admin/brochure/${idValue}`
        : `${API}/api/centres/admin/brochure`; 
      
      await fetch(url, {
        method: idValue ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          centre_id: CENTRE_ID,
          title: brochureTitle, 
          file_url: brochureUrl, 
          is_active: 1 
        }),
      });
      toast.success("Brochure updated");
      fetchBrochure();
      setShowModal(false);
    } catch (error) {
      toast.error("Error updating brochure");
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
            <span className="font-medium text-gold">Law & Public Policy</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Law & Public Policy
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none space-y-6"
            >
              <div className="flex items-center justify-between border-l-4 border-gold pl-6 mb-10">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider m-0">
                  {content?.title || "About the Centre"}
                </h2>
                {token && (
                   <button
                     onClick={openEditAbout}
                     className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     <Edit className="h-4 w-4" /> Edit Content
                   </button>
                )}
              </div>
              
              <div className="relative p-10 rounded-3xl border bg-card shadow-sm group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                   <Landmark className="h-32 w-32 text-[#0f2d5c]" />
                 </div>
                 <p className="text-muted-foreground leading-relaxed text-lg text-justify relative z-10 whitespace-pre-wrap">
                  {content?.content || "No content available."}
                 </p>
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: Landmark, label: "Governance Reforms" },
                { icon: Target, label: "Legislative Analysis" },
                { icon: Users, label: "Public Policy" },
                { icon: FileText, label: "Evidence-Based" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 rounded-2xl border bg-card text-center transition-all hover:bg-gold/5 group">
                  <div className="mb-4 p-4 rounded-xl bg-[#0f2d5c]/5 text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-[#0f2d5c] uppercase text-xs tracking-widest leading-tight">{item.label}</h4>
                </div>
              ))}
            </motion.div>

            {/* Brochure Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border-2 border-dashed border-gold/30 p-12 bg-secondary/20 flex flex-col md:flex-row items-center justify-between gap-10 relative group"
            >
               <div className="space-y-4 text-center md:text-left">
                 <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold mb-2">
                   <FileText className="h-6 w-6" />
                 </div>
                 <h3 className="font-serif text-3xl font-bold text-[#0f2d5c]">
                   {brochure?.title || "Download Centre Brochure"}
                 </h3>
                 <p className="text-muted-foreground max-w-md">Get detailed insights into our research wings, flagship programs, and institutional collaborative policy frameworks.</p>
               </div>
               
               <div className="shrink-0 w-full md:w-auto flex flex-col gap-4">
                 {brochure && (
                   <Button asChild className="w-full md:w-auto bg-[#0f2d5c] border-2 border-gold text-white hover:bg-[#0f2d5c]/90 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
                      <a href={brochure.file_url} target="_blank" rel="noopener noreferrer">
                         Download PDF <Download className="ml-3 h-5 w-5" />
                      </a>
                   </Button>
                 )}
                 {!brochure && !token && (
                   <p className="text-muted-foreground italic">No brochure available</p>
                 )}
               </div>

               {token && (
                 <div className="absolute top-4 right-4">
                   <button
                     onClick={openEditBrochure}
                     className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors bg-white/50 backdrop-blur-sm p-3 rounded-full shadow-sm hover:shadow-md"
                   >
                     <Edit className="h-4 w-4" /> Edit
                   </button>
                 </div>
               )}
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
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-6 shadow-2xl h-auto max-h-[90vh] overflow-y-auto min-scrollbar"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-serif font-bold text-[#0f2d5c]">
                  {modalType === "about" ? "Edit About Content" : "Edit Brochure Link"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {modalType === "about" ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Title</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="Title"
                      value={aboutTitle}
                      onChange={(e) => setAboutTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Content</label>
                    <textarea
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors min-h-[200px]"
                      placeholder="Description"
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pt-4 gap-3">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Cancel</button>
                    <button onClick={handleSaveAbout} className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]">Save Changes</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Brochure Default Title</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="E.g., Download Centre Brochure"
                      value={brochureTitle}
                      onChange={(e) => setBrochureTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0f2d5c] uppercase tracking-wider">Brochure PDF URL</label>
                    <input
                      className="w-full border p-3 rounded-lg outline-none focus:border-gold transition-colors"
                      placeholder="https://..."
                      value={brochureUrl}
                      onChange={(e) => setBrochureUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pt-4 gap-3">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Cancel</button>
                    <button onClick={handleSaveBrochure} className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]">Save Brochure</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PublicPolicyCentre;
