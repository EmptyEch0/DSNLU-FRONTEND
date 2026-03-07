import { useState, useEffect, useRef, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Download, 
  AlertTriangle, 
  ShieldAlert, 
  Wifi, 
  Users, 
  Scale, 
  FileText, 
  History,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface StudentCodeSection {
  id: number;
  page_id: number;
  section_key: string;
  title: string;
  content: string;
  display_order: number;
}

interface StudentCodeItem {
  id: number;
  section_id: number;
  section_key: string;
  title: string | null;
  content: string;
  display_order: number;
}

interface StudentCodeStep {
  id: number;
  page_id: number;
  step_number: number;
  title: string;
  description: string;
}

interface StudentCodePenalty {
  id: number;
  page_id: number;
  penalty_type: string;
  description: string;
  display_order: number;
}

interface StudentCodePage {
  id: number;
  title: string;
  slug: string;
  preamble?: string;
}

interface StudentCodeData {
  page: StudentCodePage;
  sections: StudentCodeSection[];
  items: StudentCodeItem[];
  steps: StudentCodeStep[];
  penalties: StudentCodePenalty[];
}

// sections constant removed, now derived from data as sectionsPaths

const STATIC_SECTION_KEYS = ["ragging", "sexual-harassment", "hostel", "electronic-media", "responsibilities", "revision"];

const StudentCodeOfConduct = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<StudentCodeData | null>(null);
  const [activeSection, setActiveSection] = useState("preamble");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modal, setModal] = useState<{
    type: "editSection" | "editItem" | "addItem" | "editStep" | "addStep" | "editPenalty" | "addPenalty";
    data?: StudentCodeSection | StudentCodeItem | StudentCodeStep | StudentCodePenalty;
    sectionKey?: string;
  } | null>(null);
  const [formData, setFormData] = useState<Partial<StudentCodeSection & StudentCodeItem & StudentCodeStep & StudentCodePenalty>>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/student-code`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error("Error fetching student code:", err);
      toast.error("Failed to load student code of conduct");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sectionsPaths = useMemo(() => data?.sections?.map(s => ({
    id: s.section_key,
    label: s.title
  })) || [], [data?.sections]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -70% 0%",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionsPaths.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionsPaths]);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  });

  const saveSection = async () => {
    if (!modal?.data?.id) return;
    try {
      const res = await fetch(`${API}/api/admin/student-code/section/${modal.data.id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Section updated successfully");
        fetchData();
        setModal(null);
      }
    } catch (err) {
      toast.error("Failed to update section");
    }
  };

  const saveItem = async () => {
    try {
      const isEdit = modal?.type === "editItem";
      const url = isEdit 
        ? `${API}/api/admin/student-code/item/${modal?.data?.id}` 
        : `${API}/api/admin/student-code/item`;
      
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          section_id: (modal?.data as StudentCodeItem)?.section_id || data?.sections.find(s => s.section_key === modal?.sectionKey)?.id
        })
      });
      
      if (res.ok) {
        toast.success(`Item ${isEdit ? "updated" : "added"} successfully`);
        fetchData();
        setModal(null);
      }
    } catch (err) {
      toast.error("Failed to save item");
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API}/api/admin/student-code/item/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      if (res.ok) {
        toast.success("Item deleted successfully");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const saveStep = async () => {
    try {
      const isEdit = modal?.type === "editStep";
      const url = isEdit 
        ? `${API}/api/admin/student-code/step/${modal?.data?.id}` 
        : `${API}/api/admin/student-code/step`;
      
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          page_id: data?.page?.id
        })
      });
      
      if (res.ok) {
        toast.success(`Step ${isEdit ? "updated" : "added"} successfully`);
        fetchData();
        setModal(null);
      }
    } catch (err) {
      toast.error("Failed to save step");
    }
  };

  const deleteStep = async (id: number) => {
    if (!confirm("Are you sure you want to delete this step?")) return;
    try {
      const res = await fetch(`${API}/api/admin/student-code/step/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      if (res.ok) {
        toast.success("Step deleted successfully");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete step");
    }
  };

  const savePenalty = async () => {
    try {
      const isEdit = modal?.type === "editPenalty";
      const url = isEdit 
        ? `${API}/api/admin/student-code/penalty/${modal?.data?.id}` 
        : `${API}/api/admin/student-code/penalty`;
      
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          page_id: data?.page?.id
        })
      });
      
      if (res.ok) {
        toast.success(`Penalty ${isEdit ? "updated" : "added"} successfully`);
        fetchData();
        setModal(null);
      }
    } catch (err) {
      toast.error("Failed to save penalty");
    }
  };

  const deletePenalty = async (id: number) => {
    if (!confirm("Are you sure you want to delete this penalty?")) return;
    try {
      const res = await fetch(`${API}/api/admin/student-code/penalty/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      if (res.ok) {
        toast.success("Penalty deleted successfully");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete penalty");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
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
            <span className="text-foreground">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Student Code of Conduct</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/90 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="text-left">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-serif text-4xl font-bold text-gold md:text-5xl lg:text-6xl uppercase tracking-wider"
                >
                  Student Code of Conduct
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-lg text-white/80 italic font-medium"
                >
                  Damodaram Sanjivayya National Law University
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy rounded-xl font-bold flex items-center gap-2 h-12 px-6">
                  <Download className="h-4 w-4" />
                  Download Code of Conduct (PDF)
                </Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12 relative">
              
              {/* Sticky Sidebar (Desktop) */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28 space-y-1">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6 px-4">Navigation</h4>
                  <nav className="flex flex-col border-l-2 border-border/50">
                    {sectionsPaths.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative py-3 px-4 text-left text-sm font-semibold transition-all duration-300 border-l-2 -ml-[2px]",
                          activeSection === section.id 
                            ? "text-gold border-gold bg-gold/5" 
                            : "text-muted-foreground border-transparent hover:text-navy hover:border-gold/30 hover:bg-secondary/50"
                        )}
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Mobile Navigation Accordion */}
              <div className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b -mx-4 px-4 py-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-secondary/50 text-navy font-bold"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gold" />
                    {sectionsPaths.find(s => s.id === activeSection)?.label || "Select Section"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="absolute top-full left-0 right-0 bg-background border-b shadow-xl overflow-y-auto max-h-[60vh] z-40"
                    >
                      {sectionsPaths.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full p-4 text-left text-sm font-medium border-b last:border-0",
                            activeSection === section.id ? "text-gold bg-gold/5" : "text-foreground"
                          )}
                        >
                          {section.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Panel */}
              <div className="flex-1 max-w-4xl space-y-24 pb-32">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground italic">
                    <History className="h-12 w-12 animate-spin-slow mb-4 opacity-20" />
                    Loading Student Code of Conduct...
                  </div>
                )}

                {!loading && !data && (
                  <p className="text-muted-foreground italic">No data found.</p>
                )}

                {/* Dynamic Content Sections */}
                {data?.sections
                  .filter(section => {
                    if (STATIC_SECTION_KEYS.includes(section.section_key)) return false;
                    const hasSpecializedRendering = ["applicability", "definitions", "disciplinary", "punishments"].includes(section.section_key);
                    return section.content || hasSpecializedRendering;
                  })
                  .map((section) => {
                    const items = data.items.filter(i => i.section_key === section.section_key);

                  return (
                    <ContentSection 
                      key={section.id} 
                      id={section.section_key} 
                      title={section.title}
                      onEdit={token ? () => {
                        setModal({ type: "editSection", data: section });
                        setFormData({ title: section.title, content: section.content });
                      } : undefined}
                    >
                      {/* Section Content (HTML support) - skip for sections that have their own specialized rendering */}
                      {section.content && !["applicability", "definitions"].includes(section.section_key) && (
                         <div 
                           className={cn(
                             "text-foreground leading-relaxed text-lg",
                             section.section_key === "preamble" && "border-l-4 border-gold/20 pl-8 text-xl font-serif text-justify"
                           )}
                           dangerouslySetInnerHTML={{ __html: section.content }} 
                         />
                      )}

                      {/* Specialized Content for specific sections */}
                      
                      {/* Applicability Items */}
                      {section.section_key === "applicability" && (
                        <div className="mt-8 space-y-6">
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Applicability Items</h4>
                            {token && (
                              <button
                                onClick={() => {
                                  setModal({ type: "addItem", sectionKey: section.section_key });
                                  setFormData({ title: "", content: "", display_order: items.length + 1 });
                                }}
                                className="px-3 py-1 bg-navy text-gold rounded-full flex items-center gap-2 font-bold text-[10px]"
                              >
                                <Plus className="h-3 w-3" />
                                Add Item
                              </button>
                            )}
                          </div>
                          <div className="grid gap-4">
                            {items.length === 0 && <p className="text-sm text-muted-foreground italic">No specific items listed.</p>}
                            {items.map(item => (
                              <div key={item.id} className="group relative">
                                <ChecklistItem text={item.content} />
                                {token && (
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-background/80 p-1 rounded-lg">
                                    <button 
                                      onClick={() => {
                                        setModal({ type: "editItem", data: item });
                                        setFormData({ title: item.title, content: item.content, display_order: item.display_order });
                                      }}
                                      className="p-1 hover:text-gold transition-colors"
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </button>
                                    <button onClick={() => deleteItem(item.id)} className="p-1 hover:text-red-500 transition-colors">
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Definitions Accordion */}
                      {section.section_key === "definitions" && (
                        <div className="mt-8 space-y-4">
                           <div className="flex items-center justify-between gap-4">
                            <p className="text-muted-foreground text-sm italic">Click on terms below to view detailed legal definitions.</p>
                            {token && (
                              <button
                                onClick={() => {
                                  setModal({ type: "addItem", sectionKey: section.section_key });
                                  setFormData({ title: "", content: "", display_order: items.length + 1 });
                                }}
                                className="px-3 py-1 bg-navy text-gold rounded-full flex items-center gap-2 font-bold text-[10px]"
                              >
                                <Plus className="h-3 w-3" />
                                Add Definition
                              </button>
                            )}
                          </div>
                          <div className="rounded-2xl border overflow-hidden">
                            {items.length === 0 && <p className="p-6 text-sm text-muted-foreground italic text-center">No definitions found.</p>}
                            {items.map(def => (
                              <div key={def.id} className="relative group">
                                <DefinitionsAccordion title={def.title || ""} content={def.content} />
                                {token && (
                                  <div className="absolute top-6 right-12 hidden group-hover:flex items-center gap-2">
                                    <button 
                                      onClick={() => {
                                        setModal({ type: "editItem", data: def });
                                        setFormData({ title: def.title, content: def.content, display_order: def.display_order });
                                      }}
                                      className="p-1 hover:text-gold transition-colors bg-white/80 rounded"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => deleteItem(def.id)} className="p-1 hover:text-red-500 transition-colors bg-white/80 rounded">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ragging specific additions if needed (hardcoded base + dynamic footer maybe) */}
                      {/* ... other specialized sections ... */}

                      {/* Disciplinary Process Timeline */}
                      {section.section_key === "disciplinary" && (
                        <div className="mt-12 space-y-8">
                           <div className="flex items-center justify-between gap-4">
                            <h4 className="text-lg font-bold text-navy">Timeline of Process</h4>
                            {token && (
                              <button
                                onClick={() => {
                                  setModal({ type: "addStep" });
                                  setFormData({ step_number: data.steps.length + 1, title: "", description: "" });
                                }}
                                className="px-3 py-1 bg-navy text-gold rounded-full flex items-center gap-2 font-bold text-[10px]"
                              >
                                <Plus className="h-3 w-3" />
                                Add Step
                              </button>
                            )}
                          </div>
                          <div className="relative pl-12 space-y-12 before:content-[''] before:absolute before:left-[1.35rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-gold before:to-gold/10">
                            {data.steps.map(step => (
                              <div key={step.id} className="relative group">
                                <TimelineItem step={step.step_number.toString()} title={step.title} text={step.description} />
                                {token && (
                                  <div className="absolute right-0 top-0 hidden group-hover:flex items-center gap-2">
                                    <button 
                                      onClick={() => {
                                        setModal({ type: "editStep", data: step });
                                        setFormData({ step_number: step.step_number, title: step.title, description: step.description });
                                      }}
                                      className="p-1 hover:text-gold transition-colors"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => deleteStep(step.id)} className="p-1 hover:text-red-500 transition-colors">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Punishments Table */}
                      {section.section_key === "punishments" && (
                        <div className="mt-12 space-y-4">
                           <div className="flex items-center justify-between gap-4">
                            <h4 className="text-lg font-bold text-navy">Schedule of Penalties</h4>
                            {token && (
                              <button
                                onClick={() => {
                                  setModal({ type: "addPenalty" });
                                  setFormData({ penalty_type: "", description: "", display_order: data.penalties.length + 1 });
                                }}
                                className="px-3 py-1 bg-navy text-gold rounded-full flex items-center gap-2 font-bold text-[10px]"
                              >
                                <Plus className="h-3 w-3" />
                                Add Penalty
                              </button>
                            )}
                          </div>
                          <div className="rounded-3xl border bg-card overflow-hidden shadow-elegant">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-navy text-white font-serif">
                                  <th className="px-8 py-5 font-bold uppercase tracking-wider text-sm">Penalty Type</th>
                                  <th className="px-8 py-5 font-bold uppercase tracking-wider text-sm">Description</th>
                                  {token && <th className="px-4 py-5 w-24">Actions</th>}
                                </tr>
                              </thead>
                              <tbody className="divide-y text-foreground">
                                {data.penalties.map(p => (
                                  <tr key={p.id} className="hover:bg-gold/5 transition-colors group">
                                    <PenaltyRow type={p.penalty_type} desc={p.description} color={p.display_order % 2 === 0 ? "bg-red-50/10" : ""} />
                                    {token && (
                                      <td className="px-4 py-5">
                                        <div className="flex items-center gap-2">
                                          <button 
                                            onClick={() => {
                                              setModal({ type: "editPenalty", data: p });
                                              setFormData({ penalty_type: p.penalty_type, description: p.description, display_order: p.display_order });
                                            }}
                                            className="p-1 text-gold hover:scale-110 transition-transform"
                                          >
                                            <Pencil className="h-4 w-4" />
                                          </button>
                                          <button onClick={() => deletePenalty(p.id)} className="p-1 text-red-500 hover:scale-110 transition-transform">
                                            <Trash2 className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </ContentSection>
                  );
                })}

                {/* Structural / Mixed Sections - Keep these if they aren't fully in DB yet */}
                {!loading && (
                  <>
                    {/* Responsibilities */}
                    <ContentSection 
                      id="responsibilities" 
                      title="Responsibilities of Students"
                      onEdit={token ? () => {
                        const s = data?.sections.find(s => s.section_key === "responsibilities");
                        if (s) { setModal({ type: "editSection", data: s }); setFormData({ title: s.title, content: s.content }); }
                      } : undefined}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <ResponsibilityCard icon={<Scale />} title="Academic Honesty" text="Maintenance of highest levels of academic integrity in all submissions and exams." />
                        <ResponsibilityCard icon={<Users />} title="Respect for Rights" text="Respecting the professional and personal rights of faculty, staff, and peers." />
                        <ResponsibilityCard icon={<ShieldAlert />} title="Non-discrimination" text="Upholding a campus culture free from prejudice based on caste, religion, or gender." />
                        <ResponsibilityCard icon={<History />} title="Constitutional Values" text="Adherence to the values enshrined in the Constitution of India." />
                      </div>
                    </ContentSection>

                    {/* Ragging (Hardcoded for style) */}
                    <ContentSection 
                      id="ragging" 
                      title="Ragging & Prohibition"
                      onEdit={token ? () => {
                        const s = data?.sections.find(s => s.section_key === "ragging");
                        if (s) { setModal({ type: "editSection", data: s }); setFormData({ title: s.title, content: s.content }); }
                      } : undefined}
                    >
                       <div className="rounded-3xl border-2 border-dashed border-red-200 bg-red-50/30 p-8 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg overflow-hidden animate-pulse">
                            <AlertTriangle className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-red-700 uppercase tracking-tight">Ragging is Strictly Prohibited</h3>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <p className="font-bold text-navy flex items-center gap-2 text-sm italic">
                              <Scale className="h-4 w-4 text-gold" /> Statutory Regulations:
                            </p>
                            <ul className="space-y-2 text-xs text-foreground/80 font-medium">
                              <li>• UGC Regulations on Curbing Ragging, 2009</li>
                              <li>• Andhra Pradesh Prohibition of Ragging Act, 1997</li>
                              <li>• Directions of the Hon'ble Supreme Court of India</li>
                            </ul>
                          </div>
                          <div className="rounded-2xl bg-white/50 border border-red-100 p-6">
                            <p className="font-bold text-red-800 mb-3 flex items-center gap-2 italic text-sm">
                              <ShieldAlert className="h-4 w-4" /> Penalties include:
                            </p>
                            <ul className="space-y-2 text-xs font-bold text-red-700">
                              <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-3 w-3 text-red-600" /> Expulsion from University</li>
                              <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-3 w-3 text-red-600" /> Fine up to ₹10,000</li>
                              <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-3 w-3 text-red-600" /> Suspension from Classes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </ContentSection>

                    {/* Sexual Harassment */}
                    <ContentSection 
                      id="sexual-harassment" 
                      title="Prevention of Sexual Harassment"
                      onEdit={token ? () => {
                        const s = data?.sections.find(s => s.section_key === "sexual-harassment");
                        if (s) { setModal({ type: "editSection", data: s }); setFormData({ title: s.title, content: s.content }); }
                      } : undefined}
                    >
                      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/30 p-8">
                        <div className="flex gap-6 flex-col md:flex-row">
                          <div className="h-16 w-16 shrink-0 rounded-2xl bg-purple-600 flex items-center justify-center text-white">
                            <Scale className="h-8 w-8" />
                          </div>
                          <div className="space-y-4">
                            <p className="text-lg text-purple-900 font-medium leading-relaxed">
                              DSNLU is committed to maintaining a safe environment. All forms of sexual harassment are strictly prohibited 
                              under the <span className="font-bold border-b border-purple-300">Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</span>.
                            </p>
                            <div className="flex flex-wrap gap-4">
                              <div className="px-4 py-2 bg-purple-100 rounded-lg text-xs font-bold text-purple-700 border border-purple-200 uppercase tracking-wider">
                                Sexual Harassment Redressal Committee
                              </div>
                              <div className="px-4 py-2 bg-purple-100 rounded-lg text-xs font-bold text-purple-700 border border-purple-200 uppercase tracking-wider">
                                Zero Tolerance Policy
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ContentSection>

                    {/* Prohibitions */}
                    <div id="electronic-media" className="grid gap-6 md:grid-cols-3 scroll-mt-32">
                         <div className="md:col-span-3">
                           <h3 className="text-xl font-bold text-navy mb-2 uppercase tracking-wider">General Prohibitions</h3>
                           <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold/10 to-transparent mb-6" />
                         </div>
                         <ProhibitionTile icon={<AlertTriangle />} title="Tobacco Free" text="DSNLU is a strictly non-smoking campus. Tobacco use is banned." color="neutral" />
                         <ProhibitionTile icon={<AlertTriangle />} title="No Alcohol" text="Possession or consumption of alcohol on campus is a major offence." color="neutral" />
                         <ProhibitionTile icon={<AlertTriangle />} title="No Narcotics" text="Possession or distribution of banned drugs leads to criminal prosecution." color="neutral" />
                    </div>

                    {/* Hostel */}
                    <ContentSection 
                      id="hostel" 
                      title="Hostel & Residential Conduct"
                      onEdit={token ? () => {
                        const s = data?.sections.find(s => s.section_key === "hostel");
                        if (s) { setModal({ type: "editSection", data: s }); setFormData({ title: s.title, content: s.content }); }
                      } : undefined}
                    >
                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                          <h4 className="font-bold text-navy text-lg">Key Regulations</h4>
                          <ul className="space-y-4">
                            <HostelRule title="Curfew Timing" text="All students must return to their respective hostels by 9:00 PM." />
                            <HostelRule title="Restricted Access" text="Male students are prohibited in Girls' Hostels and vice versa at all times." />
                            <HostelRule title="Leave Policy" text="Official leave permission is mandatory for staying outside the hostel overnight." />
                          </ul>
                        </div>
                        <div className="bg-secondary/30 rounded-3xl p-8 border border-border/50">
                          <Info className="h-8 w-8 text-gold mb-4" />
                          <p className="text-foreground leading-relaxed font-medium italic text-sm">
                            "The hostel is an extension of the academic environment. Conduct reflecting the dignity of the profession is expected from every resident."
                          </p>
                        </div>
                      </div>
                    </ContentSection>

                    {/* Revision */}
                    <ContentSection 
                      id="revision" 
                      title="Revision of Code"
                      onEdit={token ? () => {
                        const s = data?.sections.find(s => s.section_key === "revision");
                        if (s) { setModal({ type: "editSection", data: s }); setFormData({ title: s.title, content: s.content }); }
                      } : undefined}
                    >
                      <div className="bg-navy rounded-3xl p-10 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 h-32 w-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150" />
                        <History className="h-10 w-10 text-gold mx-auto mb-6" />
                        <h3 className="text-2xl font-serif font-bold text-white mb-4 uppercase tracking-widest">Periodic Review</h3>
                        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed text-lg italic">
                          The Code shall be reviewed periodically by the Academic Council to ensure consistency with 
                          national regulations, judicial pronouncements, and international best practices in legal education.
                        </p>
                      </div>
                    </ContentSection>
                  </>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modals */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gold/20"
            >
              <div className="bg-navy p-6 flex justify-between items-center bg-gradient-to-r from-navy to-navy/90">
                <h3 className="text-xl font-bold text-gold uppercase tracking-wider">
                  {modal.type.includes("edit") ? "Edit" : "Add"} {modal.type.includes("Section") ? "Section" : modal.type.includes("Item") ? "Item/Definition" : modal.type.includes("Step") ? "Process Step" : "Penalty"}
                </h3>
                <button onClick={() => setModal(null)} className="text-white/60 hover:text-white transition-colors">
                  <Plus className="h-6 w-6 rotate-45" />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {modal.type.includes("Section") ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Section Title</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Description / Content</label>
                      <textarea
                        rows={6}
                        value={formData.content || ""}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium resize-none text-sm leading-relaxed"
                        placeholder="Supports HTML tags for formatting..."
                      />
                    </div>
                  </>
                ) : modal.type.includes("Item") ? (
                   <>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Title (Optional for lists, Required for Definitions)</label>
                       <input
                         type="text"
                         value={formData.title || ""}
                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                         className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Content</label>
                       <textarea
                         rows={4}
                         value={formData.content || ""}
                         onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                         className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium resize-none text-sm leading-relaxed"
                       />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.display_order || 0}
                          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                          className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                        />
                      </div>
                   </>
                ) : modal.type.includes("Step") ? (
                  <>
                    <div className="grid grid-cols-4 gap-6">
                      <div className="space-y-2 col-span-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Step #</label>
                        <input
                          type="number"
                          value={formData.step_number || 0}
                          onChange={(e) => setFormData({ ...formData, step_number: parseInt(e.target.value) })}
                          className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all text-center font-bold"
                        />
                      </div>
                      <div className="space-y-2 col-span-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Step Title</label>
                        <input
                          type="text"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Description</label>
                      <textarea
                        rows={4}
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium resize-none text-sm leading-relaxed"
                      />
                    </div>
                  </>
                ) : (
                   <>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Penalty Type</label>
                       <input
                         type="text"
                         value={formData.penalty_type || ""}
                         onChange={(e) => setFormData({ ...formData, penalty_type: e.target.value })}
                         className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Description</label>
                       <textarea
                         rows={4}
                         value={formData.description || ""}
                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                         className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium resize-none text-sm leading-relaxed"
                       />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.display_order || 0}
                          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                          className="w-full px-5 py-4 bg-secondary/30 rounded-2xl border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                        />
                      </div>
                   </>
                )}
              </div>

              <div className="p-8 bg-secondary/10 flex justify-end gap-3 rounded-b-3xl">
                <button
                  onClick={() => setModal(null)}
                  className="px-8 py-3 rounded-xl font-bold text-muted-foreground hover:bg-secondary/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (modal.type.includes("Section")) saveSection();
                    else if (modal.type.includes("Item")) saveItem();
                    else if (modal.type.includes("Step")) saveStep();
                    else if (modal.type.includes("Penalty")) savePenalty();
                  }}
                  className="px-8 py-3 rounded-xl font-bold bg-navy text-gold hover:bg-navy/90 hover:shadow-lg transition-all"
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

// --- Sub-components ---

const ContentSection = ({ id, title, children, onEdit }: { id: string; title: string; children: React.ReactNode; onEdit?: () => void }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="scroll-mt-32"
  >
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">{title}</h2>
        {onEdit && (
          <button 
            onClick={onEdit}
            className="p-1.5 hover:bg-gold/10 text-gold rounded-lg transition-colors bg-navy"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold/10 to-transparent mb-4" />
      <div>{children}</div>
    </div>
  </motion.section>
);

const ChecklistItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-foreground font-medium group">
    <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-colors shrink-0">
      <CheckCircle2 className="h-3.5 w-3.5" />
    </div>
    <span>{text}</span>
  </li>
);

const ResponsibilityCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="p-6 rounded-2xl border bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-gold/20 hover:border-l-gold">
    <div className="h-10 w-10 text-gold mb-4">{icon}</div>
    <h4 className="font-bold text-navy mb-2">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const DefinitionsAccordion = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left hover:bg-secondary/20 transition-colors"
      >
        <span className="font-bold text-foreground">{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm bg-secondary/10">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProhibitionTile = ({ icon, title, text, color }: { icon: React.ReactNode; title: string; text: string; color: string }) => (
  <div className="p-6 rounded-2xl border bg-card shadow-sm text-center space-y-3 group hover:border-gold/30 transition-all">
    <div className="h-12 w-12 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground mx-auto group-hover:text-gold transition-colors">
      {icon}
    </div>
    <h5 className="font-bold text-navy">{title}</h5>
    <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const HostelRule = ({ title, text }: { title: string; text: string }) => (
  <div className="space-y-1">
    <p className="font-bold text-navy text-sm">• {title}</p>
    <p className="text-sm text-muted-foreground pl-3 border-l-2 border-gold/10">{text}</p>
  </div>
);

const TimelineItem = ({ step, title, text }: { step: string; title: string; text: string }) => (
  <div className="relative">
    <div className="absolute -left-12 top-0 h-8 w-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center border-4 border-background z-10">
      {step}
    </div>
    <div>
      <h4 className="font-bold text-navy mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  </div>
);

const PenaltyRow = ({ type, desc, color = "" }: { type: string; desc: string; color?: string }) => (
  <tr className={cn("hover:bg-gold/5 transition-colors group", color)}>
    <td className="px-8 py-5 font-bold text-navy text-sm border-r border-border/30">{type}</td>
    <td className="px-8 py-5 text-sm font-medium text-foreground">{desc}</td>
  </tr>
);

export default StudentCodeOfConduct;
