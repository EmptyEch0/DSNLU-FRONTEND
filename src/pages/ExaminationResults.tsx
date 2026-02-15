import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExamSidebar } from "@/components/layout/ExamSidebar";
import { examResultsData, ExamResult } from "@/data/examResultsData";

const ResultCardContent = ({ result, isExternal }: { result: ExamResult, isExternal?: boolean }) => (
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
        {result.date}
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
        <section className="relative bg-primary py-16 overflow-hidden">
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
                <div className="grid gap-6 md:grid-cols-2">
                  {examResultsData.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {result.type === 'pdf' ? (
                        <a 
                          href={result.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group block h-full bg-[#f4f6f9] border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-1"
                        >
                          <ResultCardContent result={result} />
                        </a>
                      ) : result.type === 'url' ? (
                        <a 
                          href={result.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group block h-full bg-[#f4f6f9] border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-1"
                        >
                          <ResultCardContent result={result} isExternal />
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

export default ExaminationResults;
