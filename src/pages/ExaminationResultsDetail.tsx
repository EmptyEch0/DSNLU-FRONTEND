import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExamSidebar } from "@/components/layout/ExamSidebar";
import { examResultsData } from "@/data/examResultsData";

const ExaminationResultsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const result = examResultsData.find((r) => r.slug === slug);

  if (!result) {
    return <Navigate to="/academics/examination-results" replace />;
  }

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
        <section className="relative bg-primary py-16 overflow-hidden">
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
                    <h2 className="font-serif text-2xl font-bold text-foreground">Semester-wise Results</h2>
                    <p className="text-sm text-muted-foreground font-medium">Published on {result.date}</p>
                  </div>

                  {result.files?.map((file, index) => (
                    <motion.div
                      key={index}
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

                      <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm tracking-wide gap-2 group/btn">
                        <a href={file.href} target="_blank" rel="noopener noreferrer">
                          VIEW FILE <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
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
    </div>
  );
};

export default ExaminationResultsDetail;
