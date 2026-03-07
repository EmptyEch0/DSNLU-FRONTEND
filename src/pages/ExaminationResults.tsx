import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, Calendar, ArrowRight, Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExamSidebar } from "@/components/layout/ExamSidebar";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { ExamResultModal, ExamResult } from "@/components/admin/ExamResultModal";

const ResultCardContent = ({ result }: { result: ExamResult }) => (
  <div className="flex flex-col h-full justify-between gap-4">
    <div className="space-y-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
        <FileText className="h-5 w-5" />
      </div>
      <h3 className="font-bold text-foreground leading-snug group-hover:text-gold transition-colors text-lg">
        {result.title}
      </h3>
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Calendar className="h-3.5 w-3.5 text-gold" />
        {result.result_date}
      </div>
    </div>
    <div className="flex items-center justify-end">
      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 sm:px-4 font-bold text-sm tracking-wide gap-2 group/btn">
        {result.type === 'internal' ? "VIEW DETAILS" : "VIEW FILE"}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Button>
    </div>
  </div>
);

const ExaminationResults = () => {
  const { token } = useAdmin();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<ExamResult[]>("/api/exams");
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch exam results", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this examination result?")) {
      try {
        await apiFetch(`/api/exams/exam-result/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Result deleted");
        fetchResults();
      } catch (error) {
        console.error("Delete Error", error);
        toast.error("Failed to delete result");
      }
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
            <span className="text-foreground">Academics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Affairs & Examinations</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Examination Results</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-[#d4a017] md:text-4xl lg:text-5xl uppercase tracking-tight"
            >
              Examination Results
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ExamSidebar />
              </div>

              {/* Results Grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-navy font-serif italic">Latest Results</h2>
                  {token && (
                    <Button 
                      onClick={() => { setSelectedResult(null); setIsModalOpen(true); }}
                      className="bg-gold hover:bg-navy text-white font-bold gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add Result
                    </Button>
                  )}
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-gold" />
                    <p className="text-muted-foreground font-serif italic">Loading Results...</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative"
                      >
                        {token && (
                          <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setSelectedResult(result); setIsModalOpen(true); }}
                              className="p-2 rounded-full bg-white shadow-sm border hover:bg-gold hover:text-white transition-colors text-navy"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => result.id && handleDelete(result.id)}
                              className="p-2 rounded-full bg-white shadow-sm border hover:bg-red-500 hover:text-white transition-colors text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        {result.type === 'pdf' || result.type === 'url' ? (
                          <a 
                            href={result.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group block h-full bg-[#f4f6f9] border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-1"
                          >
                            <ResultCardContent result={result} />
                          </a>
                        ) : (
                          <Link 
                            to={`/academics/examination-results/${result.slug}`}
                            className="group block h-full bg-[#f4f6f9] border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-1"
                          >
                            <ResultCardContent result={result} />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                    {results.length === 0 && !loading && (
                      <div className="md:col-span-2 text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                        <p className="text-muted-foreground">No examination results found.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ExamResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={selectedResult}
        onSuccess={fetchResults}
      />
    </div>
  );
};

export default ExaminationResults;
