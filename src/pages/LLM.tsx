import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ScrollText, 
  Scale, 
  Info,
  Clock,
  CheckCircle2,
  Table as TableIcon,
  Users,
  Search,
  Gavel,
  ShieldCheck,
  Briefcase,
  Trash2,
  Plus,
  Pencil
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Paper {
  id: number;
  paper_code: string;
  paper_title: string;
  credits: number;
}

interface Specialization {
  id: number;
  specialization_key: string;
  specialization_title: string;
  papers: Paper[];
}

interface Dissertation {
  id: number;
  title: string;
  credits: number;
  description: string;
}

interface LLMDataType {
  regulation: {
    id: number;
    regulation_year: string;
  };
  compulsory: Paper[];
  dissertation: Dissertation;
  specializations: Specialization[];
}

const LLM = () => {
  const { isAdminMode, token } = useAdmin();
  const [data, setData] = useState<LLMDataType | null>(null);
  const [activeSpecId, setActiveSpecId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = !!token && isAdminMode;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/academic/llm/2023-24`);
      const result = await res.json();
      setData(result);
      if (result.specializations?.length > 0) {
        if (!activeSpecId || !result.specializations.find((s: any) => s.id === activeSpecId)) {
          setActiveSpecId(result.specializations[0].id);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch LLM curriculum");
    } finally {
      setLoading(false);
    }
  }, [activeSpecId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCRUD = async (endpoint: string, method: string, body: any = null) => {
    try {
      // All LLM admin routes are now under /api/admin/llm
      const res = await fetch(`${API}/api/admin/llm${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (res.ok) {
        toast.success("Operation successful");
        fetchData();
      } else {
        toast.error("Operation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const addCompulsoryPaper = () => {
    const paper_code = window.prompt("Paper Code (e.g., Paper-I):");
    const paper_title = window.prompt("Paper Title:");
    const credits = window.prompt("Credits:");
    if (paper_code && paper_title && credits && data) {
      handleCRUD("/compulsory", "POST", {
        regulation_id: data.regulation.id,
        paper_code,
        paper_title,
        credits: parseInt(credits)
      });
    }
  };

  const deleteCompulsoryPaper = (id: number) => {
    if (window.confirm("Delete this paper?")) {
      handleCRUD(`/compulsory/${id}`, "DELETE");
    }
  };

  const editDissertation = () => {
    if (!data?.dissertation) return;
    const title = window.prompt("Dissertation Title:", data.dissertation.title);
    const credits = window.prompt("Credits:", data.dissertation.credits.toString());
    const description = window.prompt("Description:", data.dissertation.description);
    if (title && credits && description) {
      handleCRUD(`/dissertation/${data.dissertation.id}`, "PUT", {
        title,
        credits: parseInt(credits),
        description
      });
    }
  };

  const addSpecialization = () => {
    const specialization_key = window.prompt("Spec ID (e.g., corporate):");
    const specialization_title = window.prompt("Specialization Title:");
    if (specialization_key && specialization_title && data) {
      handleCRUD("/specialization", "POST", {
        regulation_id: data.regulation.id,
        specialization_key,
        specialization_title
      });
    }
  };

  const deleteSpecialization = (id: number) => {
    if (window.confirm("Delete this specialization and all its papers?")) {
      handleCRUD(`/specialization/${id}`, "DELETE");
    }
  };

  const addSpecPaper = (specId: number) => {
    const paper_code = window.prompt("Paper Code (e.g., Paper-IV):");
    const paper_title = window.prompt("Paper Title:");
    const credits = window.prompt("Credits:");
    if (paper_code && paper_title && credits) {
      handleCRUD("/specialization-paper", "POST", {
        specialization_id: specId,
        paper_code,
        paper_title,
        credits: parseInt(credits)
      });
    }
  };

  const deleteSpecPaper = (id: number) => {
    if (window.confirm("Delete this paper?")) {
      handleCRUD(`/specialization-paper/${id}`, "DELETE");
    }
  };

  const selectedSpec = data?.specializations.find(s => s.id === activeSpecId);

  const getSpecIcon = (specId: string) => {
    switch (specId) {
      case 'corporate': return Briefcase;
      case 'constitutional': return Scale;
      case 'criminal': return Gavel;
      default: return BookOpen;
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
        <div className="border-b bg-secondary/30">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold uppercase tracking-wider text-[11px] font-bold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="uppercase tracking-wider text-[11px] font-bold">Academics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-bold text-gold uppercase tracking-wider text-[11px]">One Year LL.M.</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-transparent" />
          <div className="container relative z-10">
            <div className="max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold uppercase tracking-[0.2em]"
              >
                <GraduationCap className="h-4 w-4" /> Postgraduate Programs
              </motion.div>
              <div className="relative group">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-5xl font-bold text-white md:text-7xl leading-tight"
                >
                  Master of Laws <span className="text-gold">(LL.M.)</span>
                </motion.h1>
              </div>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-1.5 w-24 rounded-full bg-gold" 
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-white/80 leading-relaxed font-light italic"
              >
                Premium One Year Integrated Postgraduate Program ({data?.regulation.regulation_year})
              </motion.p>
            </div>
          </div>
        </section>

        {/* Course Info Stats */}
        <section className="py-12 bg-white border-b shadow-sm relative z-20 -mt-10 mx-4 lg:mx-auto max-w-6xl rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-x md:border-x-0">
            <div className="p-8 text-center space-y-3 group hover:bg-gold/5 transition-colors">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Academic Year</p>
                <h3 className="text-2xl font-serif font-bold text-navy">2 Semesters</h3>
              </div>
            </div>
            <div className="p-8 text-center space-y-3 group hover:bg-gold/5 transition-colors">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Specializations</p>
                <h3 className="text-2xl font-serif font-bold text-navy">{data?.specializations.length} Major Areas</h3>
              </div>
            </div>
            <div className="p-8 text-center space-y-3 group hover:bg-gold/5 transition-colors">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Dissertation</p>
                <h3 className="text-2xl font-serif font-bold text-navy">200 Marks</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Overview section */}
        <section className="py-24 bg-secondary/10">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif font-bold text-navy flex items-center gap-3">
                    <Info className="h-8 w-8 text-gold" />
                    Program Overview
                  </h2>
                  <div className="h-1 w-20 bg-gold rounded-full" />
                </div>
                <div className="prose prose-lg text-muted-foreground leading-relaxed italic">
                  The university offers one year LL.M. The academic year is divided into two semesters: the Monsoon Semester (July-November) and the Spring Semester (January - May).
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm uppercase tracking-wider">Monsoon Semester</h4>
                      <p className="text-xs text-muted-foreground">July — November</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm uppercase tracking-wider">Spring Semester</h4>
                      <p className="text-xs text-muted-foreground">January — May</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif font-bold text-navy">Core <span className="text-gold">Specializations</span></h2>
                    <div className="h-1 w-20 bg-gold rounded-full" />
                  </div>
                  {isAdmin && (
                    <button 
                      onClick={addSpecialization}
                      className="p-2 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-colors"
                      title="Add Specialization"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="grid gap-4">
                  {data?.specializations.map((spec, i) => {
                    const Icon = getSpecIcon(spec.specialization_key);
                    return (
                      <div key={spec.id} className="flex items-center justify-between bg-white p-5 rounded-2xl border shadow-sm group hover:border-gold transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-navy text-gold group-hover:scale-110 transition-transform">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h4 className="font-bold text-navy leading-tight">{spec.specialization_title}</h4>
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => deleteSpecialization(spec.id)}
                            className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-24">
          <div className="container">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl font-serif font-bold text-navy">LL.M. <span className="text-gold">Curriculum</span> {data?.regulation.regulation_year}</h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Compulsory & Dissertation */}
              <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                <div className="bg-navy p-8 rounded-[40px] text-white shadow-xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-gold/5 rounded-full -translate-y-20 translate-x-20 blur-3xl" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-serif font-bold text-gold flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6" /> Compulsory Papers
                      </h3>
                      {isAdmin && (
                        <button 
                          onClick={addCompulsoryPaper}
                          className="p-2 bg-gold/20 text-gold rounded-full hover:bg-gold transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {data?.compulsory.map((paper) => (
                        <div key={paper.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-gold/30 transition-colors relative">
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{paper.paper_code}</span>
                            <span className="text-[10px] font-bold text-white/50">{paper.credits} CREDITS</span>
                          </div>
                          <h4 className="mt-1 font-bold leading-tight group-hover:text-gold transition-colors">{paper.paper_title}</h4>
                          {isAdmin && (
                            <button 
                              onClick={() => deleteCompulsoryPaper(paper.id)}
                              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {data?.dissertation && (
                    <div className="pt-8 border-t border-white/10 relative group/diss">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-serif font-bold text-gold flex items-center gap-3">
                          <Award className="h-6 w-6" /> {data.dissertation.title}
                        </h3>
                        {isAdmin && (
                          <button 
                            onClick={editDissertation}
                            className="p-2 bg-gold/20 text-gold rounded-full hover:bg-gold transition-colors opacity-0 group-hover/diss:opacity-100"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-bold text-gold uppercase tracking-widest italic">Course Final</span>
                          <span className="text-[10px] font-bold text-white/50">{data.dissertation.credits} CREDITS</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-white/80">
                          {data.dissertation.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Specialization Papers */}
              <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                <div className="bg-white rounded-[40px] border shadow-premium overflow-hidden">
                  <div className="bg-secondary/30 p-4 lg:p-6 border-b flex flex-wrap gap-2 items-center justify-center">
                    {data?.specializations.map((spec) => (
                      <button
                        key={spec.id}
                        onClick={() => setActiveSpecId(spec.id)}
                        className={cn(
                          "px-6 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 uppercase tracking-wider",
                          activeSpecId === spec.id 
                            ? "bg-navy text-gold shadow-lg" 
                            : "text-muted-foreground hover:bg-white hover:text-navy border border-transparent hover:border-gold/20"
                        )}
                      >
                        {spec.specialization_title.split(' ')[0]} Law
                      </button>
                    ))}
                  </div>

                  <div className="p-8 lg:p-12 relative group/specbox">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSpecId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-navy">{selectedSpec?.specialization_title}</h3>
                            <p className="text-muted-foreground text-sm font-medium mt-1 italic">Specialization Paper Curriculum (2 Credits each)</p>
                          </div>
                          {isAdmin && activeSpecId && (
                            <button 
                              onClick={() => addSpecPaper(activeSpecId)}
                              className="p-2 bg-navy text-gold rounded-full hover:scale-110 transition-transform"
                              title="Add Paper"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedSpec?.papers.map((paper, idx) => (
                            <div key={paper.id} className="bg-card p-6 rounded-2xl border border-navy/5 flex items-start gap-4 group hover:border-gold/30 hover:shadow-md transition-all relative">
                              <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-secondary text-navy font-bold text-xs group-hover:bg-gold group-hover:text-navy transition-colors">
                                {paper.paper_code.split('-')[1]}
                              </div>
                              <h4 className="font-bold text-navy leading-snug group-hover:text-gold transition-colors">{paper.paper_title}</h4>
                              {isAdmin && (
                                <button 
                                  onClick={() => deleteSpecPaper(paper.id)}
                                  className="absolute top-2 right-2 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LLM;
