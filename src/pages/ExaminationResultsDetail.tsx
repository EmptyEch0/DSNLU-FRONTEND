import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, ArrowLeft, ArrowRight, Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExamSidebar } from "@/components/layout/ExamSidebar";
import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { ExamFileModal } from "@/components/admin/ExamFileModal";

interface ExamResultFile {
  id: number;
  label: string;
  file_url: string;
  display_order: number;
}

interface ExamResult {
  id: number;
  title: string;
  result_date: string;
  type: 'pdf' | 'internal' | 'url';
  link?: string;
  slug?: string;
  files?: ExamResultFile[];
}

const ExaminationResultsDetail = () => {
  const { token } = useAdmin();
  const { slug } = useParams<{ slug: string }>();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Modal state
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ExamResultFile | null>(null);

  const fetchResult = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch<ExamResult>(`/api/exams/${slug}`);
      setResult(data);
    } catch (err: unknown) {
      console.error("Failed to fetch exam result details", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) fetchResult();
  }, [slug, fetchResult]);

  const handleDeleteFile = async (fileId: number) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await apiFetch(`/api/exams/exam-file/${fileId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("File deleted");
        fetchResult();
      } catch (error) {
        console.error("Delete Error", error);
        toast.error("Failed to delete file");
      }
    }
  };

  if (error && !loading) {
    return <Navigate to="/academics/examination-results" replace />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-gold" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) return <Navigate to="/academics/examination-results" replace />;

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
            <Link to="/academics/examination-results" className="transition-colors hover:text-gold">Examination Results</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold truncate max-w-[200px] sm:max-w-none">
              {result.title}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10">
            <Link 
              to="/academics/examination-results" 
              className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mb-6 font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Results
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-2xl font-bold text-white md:text-3xl text-center max-w-4xl mx-auto leading-tight"
            >
              {result.title}
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Detail Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ExamSidebar />
              </div>

              {/* Files List */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground italic">Semester-wise Results</h2>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-muted-foreground font-medium hidden sm:block font-serif">Published on {result.result_date}</p>
                      {token && (
                        <Button 
                          onClick={() => { setSelectedFile(null); setIsFileModalOpen(true); }}
                          className="bg-gold hover:bg-navy text-white font-bold gap-2 text-xs sm:text-sm"
                        >
                          <Plus className="h-4 w-4" /> Add File
                        </Button>
                      )}
                    </div>
                  </div>

                  {result.files?.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-card border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-foreground group-hover:text-gold transition-colors">
                          {file.label}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {token && (
                          <div className="flex gap-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setSelectedFile(file); setIsFileModalOpen(true); }}
                              className="p-2 rounded-full bg-white shadow-sm border hover:bg-gold hover:text-white transition-colors text-navy"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="p-2 rounded-full bg-white shadow-sm border hover:bg-red-500 hover:text-white transition-colors text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm tracking-wide gap-2 group/btn">
                          <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                            VIEW FILE <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {(!result.files || result.files.length === 0) && (
                    <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed">
                      <p className="text-muted-foreground">No files available for this result.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {result && result.id && (
        <ExamFileModal
          isOpen={isFileModalOpen}
          onClose={() => setIsFileModalOpen(false)}
          resultId={result.id}
          editData={selectedFile}
          onSuccess={fetchResult}
        />
      )}
    </div>
  );
};

export default ExaminationResultsDetail;
