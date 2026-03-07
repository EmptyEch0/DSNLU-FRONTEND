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
  Table as TableIcon,
  Trash2,
  CheckCircle2,
  Users,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Subject {
  id: number;
  subject_code: string;
  subject_name: string;
  credits: number | null;
}

interface Semester {
  id: number;
  title: string;
  subjects: Subject[];
}

interface Curriculum {
  id: number;
  year: string;
  total_credits: number;
  semesters: Semester[];
}


const BALLB = () => {
  const { isAdminMode, token } = useAdmin();
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [activeCurriculumYear, setActiveCurriculumYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [programId, setProgramId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/academic/program/BALLB`);
      const data = await res.json();

      setCurricula(data);

      if (data.length > 0) {
        setActiveCurriculumYear(prev => prev || data[0].year);
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch curriculum");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Program ID for admin operations
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await fetch(`${API}/api/academic/program/BALLB`);
        const data = await res.json();
        if (data.length > 0) {
          // We need a separate endpoint to get the program ID, 
          // but for now we can infer it if the API returns it or use a default.
          // Let's assume the program ID is needed for POST /regulation.
          // I will update the backend to ensure program_id is available.
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgram();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeYearData = curricula.find((c: Curriculum) => c.year === activeCurriculumYear);

  const isAdmin = !!token && isAdminMode;

  const handleDeleteSubject = async (subId: number) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      const res = await fetch(`${API}/api/academic/subject/${subId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        toast.success("Subject deleted");
        fetchData();
      } else {
        toast.error("Failed to delete subject");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

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
            <span className="font-bold text-gold uppercase tracking-wider text-[11px]">B.A. LL.B. (Hons.)</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-transparent" />
          <div className="container relative z-10">
            <div className="max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold uppercase tracking-[0.2em]"
              >
                <GraduationCap className="h-4 w-4" /> Academic Programs
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-5xl font-bold text-white md:text-7xl leading-tight"
              >
                B.A. LL.B. <span className="text-gold">(Hons.)</span>
              </motion.h1>
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
                Five Year Integrated Bachelor of Arts & Bachelor of Laws
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
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</p>
                <h3 className="text-2xl font-serif font-bold text-navy">5 Years</h3>
              </div>
            </div>
            <div className="p-8 text-center space-y-3 group hover:bg-gold/5 transition-colors">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Credits</p>
                <h3 className="text-2xl font-serif font-bold text-navy">220 Credits</h3>
              </div>
            </div>
            <div className="p-8 text-center space-y-3 group hover:bg-gold/5 transition-colors">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Teaching Hours</p>
                <h3 className="text-2xl font-serif font-bold text-navy">60 Hours / Credit</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Eligibility */}
        <section className="py-24 bg-secondary/10">
          <div className="container overflow-hidden">
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
                    Course Overview
                  </h2>
                  <div className="h-1 w-20 bg-gold rounded-full" />
                </div>
                <div className="prose prose-lg text-muted-foreground leading-relaxed italic">
                  The University offers Five Year Integrated B.A., LL.B. (Hons.). Students are required to complete 220 credits before they become eligible to graduate. Each credit course involves 60 hours of classroom teaching.
                </div>
                <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                  <h3 className="font-bold text-navy flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold" /> Key Highlights
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Comprehensive Five-Year Integrated Program",
                      "Industry-aligned Dynamic Curriculum",
                      "Integrated Internship & Moot Court Training",
                      "Specialized Electives in Global Law Trends",
                      "Access to Premium Electronic Databases"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif font-bold text-navy flex items-center gap-3">
                    <Scale className="h-8 w-8 text-gold" />
                    Eligibility Criteria
                  </h2>
                  <div className="h-1 w-20 bg-gold rounded-full" />
                </div>
                
                <div className="bg-navy p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:bg-gold/20 transition-all" />
                  <div className="relative z-10 flex gap-6">
                    <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                      <ScrollText className="h-8 w-8 text-gold" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold font-serif text-gold tracking-tight">CLAT Notification</h4>
                      <p className="text-white/80 leading-relaxed font-medium">
                        DSNLU is governed by CLAT notification as regards eligibility criteria. Candidates must successfully clear the CLAT (Common Law Admission Test) to be eligible for the program.
                      </p>
                      <Link 
                        to="https://consortiumofnlus.ac.in/" 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline group/link"
                      >
                        Visit Consortium of NLUs Website <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Curriculum Section */}
            <section className="py-24">
          <div className="container">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl font-serif font-bold text-navy">Academic <span className="text-gold">Curriculum</span></h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto">Explore our progressive curriculum designed to shape the legal minds of tomorrow.</p>
            </div>

            {/* Curriculum Tabs */}
            <div className="flex flex-col items-center mb-12 gap-4">
              {isAdmin && (
                <button
                  onClick={async () => {
                    const year = prompt("Enter new regulation year (e.g., 2027 - 2032)");
                    if (!year) return;

                    // Note: We need the program_id. Let's get it from the first regulation if available
                    const progId = curricula[0]?.id ? curricula[0].id : null; // This is actually reg ID, we need program ID.
                    // Better: The backend should handle programCode in the POST as well or we fetch it.
                    // For now, I'll use a hardcoded program_id based on BALLB being ID 1 (standard in my migration).

                    await fetch(`${API}/api/academic/regulation`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        program_id: 1, // BALLB ID
                        regulation_year: year,
                        total_credits: 220,
                        display_order: curricula.length + 1,
                      }),
                    });

                    toast.success("New Regulation Added");
                    fetchData();
                  }}
                  className="bg-gold text-navy px-4 py-2 rounded-lg font-bold"
                >
                  + Add Regulation Year
                </button>
              )}
              <div className="bg-secondary/50 p-2 rounded-2xl flex flex-wrap justify-center gap-2 border">
                {curricula.map((c: Curriculum) => (
                  <div key={c.id} className="relative">
                    <button
                      onClick={() => setActiveCurriculumYear(c.year)}
                      className={cn(
                        "px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300",
                        activeCurriculumYear === c.year 
                          ? "bg-navy text-gold shadow-lg scale-105" 
                          : "text-muted-foreground hover:bg-white hover:text-navy"
                      )}
                    >
                      {c.year}
                    </button>

                    {isAdmin && (
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this regulation?")) return;
                          await fetch(`${API}/api/academic/regulation/${c.id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          toast.success("Regulation Deleted");
                          fetchData();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg z-10 hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCurriculumYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <div className="bg-card rounded-[40px] border shadow-premium overflow-hidden">
                  <div className="bg-navy p-6 flex items-center justify-between border-b border-white/10">
                    <h3 className="text-gold font-serif text-lg font-bold flex items-center gap-3 italic">
                      <TableIcon className="h-5 w-5" /> Detailed Curriculum for {activeCurriculumYear}
                    </h3>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            const title = prompt("Semester title (e.g., First Semester)");
                            if (!title) return;

                            await fetch(`${API}/api/academic/semester`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({
                                regulation_id: activeYearData?.id,
                                semester_title: title,
                                semester_number: (activeYearData?.semesters.length || 0) + 1,
                                display_order: (activeYearData?.semesters.length || 0) + 1,
                              }),
                            });

                            toast.success("Semester Added");
                            fetchData();
                          }}
                          className="bg-gold text-navy px-3 py-1 rounded-md text-xs font-bold hover:bg-gold/90 transition-colors"
                        >
                          + Add Semester
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-8 lg:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      {activeYearData?.semesters.map((sem, idx) => (
                        <div key={idx} className="space-y-6 group">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold font-serif font-bold group-hover:bg-gold group-hover:text-navy transition-colors">
                              {idx + 1}
                            </div>
                            <h4 className="text-xl font-serif font-bold text-navy border-b-2 border-gold/20 pb-1 group-hover:border-gold transition-all">
                              {sem.title}
                            </h4>
                            {isAdmin && (
                              <button
                                onClick={async () => {
                                  if (!confirm(`Delete ${sem.title}? This will delete all subjects in it.`)) return;
                                  await fetch(`${API}/api/academic/semester/${sem.id}`, {
                                    method: "DELETE",
                                    headers: { Authorization: `Bearer ${token}` },
                                  });
                                  toast.success("Semester Deleted");
                                  fetchData();
                                }}
                                className="bg-red-100 text-red-600 p-1.5 rounded-lg hover:bg-red-200 transition-colors"
                                title="Delete Semester"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-secondary/30">
                                  <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Code</th>
                                  <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Subject</th>
                                  {sem.subjects.length > 0 && sem.subjects[0].credits !== null && (
                                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Cr</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y text-sm">
                                {sem.subjects.length === 0 ? (
                                  <tr>
                                    <td colSpan={3} className="px-5 py-6 text-center text-muted-foreground text-sm italic">
                                      No subjects added yet
                                    </td>
                                  </tr>
                                ) : (
                                  sem.subjects.map((sub: Subject) => (
                                    <tr key={sub.id} className="hover:bg-gold/5 transition-colors relative group/row">
                                      <td className="px-5 py-3 font-bold text-navy">{sub.subject_code}</td>
                                      <td className="px-5 py-3 text-foreground font-medium">
                                        {sub.subject_name}
                                        {isAdmin && (
                                          <button
                                            onClick={() => handleDeleteSubject(sub.id)}
                                            className="ml-2 text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity"
                                            title="Delete Subject"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                      </td>
                                      {sub.credits !== null && (
                                        <td className="px-5 py-3 text-center font-bold text-gold bg-gold/5">{sub.credits}</td>
                                      )}
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                            {isAdmin && (
                              <div className="p-4 border-t bg-secondary/10 flex justify-center">
                                <button
                                  onClick={async () => {
                                    const code = prompt("Subject Code (e.g., 1.1)");
                                    const name = prompt("Subject Name");
                                    const creditsStr = prompt("Credits (number or leave empty)");
                                    if (!code || !name) return;

                                    const credits = creditsStr ? parseInt(creditsStr) : null;

                                    await fetch(`${API}/api/academic/subject`, {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                      },
                                      body: JSON.stringify({
                                        semester_id: sem.id,
                                        subject_code: code,
                                        subject_name: name,
                                        credits,
                                        display_order: sem.subjects.length + 1,
                                      }),
                                    });

                                    toast.success("Subject Added");
                                    fetchData();
                                  }}
                                  className="flex items-center gap-2 text-navy/60 hover:text-navy font-bold text-sm transition-colors"
                                >
                                  <Plus className="h-4 w-4" /> Add Subject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};


export default BALLB;
