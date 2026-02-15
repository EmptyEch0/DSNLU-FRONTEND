import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileEdit, CheckCircle2, AlertCircle, Send, BookOpen, User, Info, Calendar, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const guidelines = [
  "English language only",
  "Word count: 1000–1500 words",
  "Abstract under 100 words required",
  "File format: .doc / .docx",
  "Plagiarism limit: Max 10%",
  "Authorship: Max 2 authors per article",
  "Content: Analytical writing required (No descriptive-only posts)"
];

const formatting = [
  "Font: Times New Roman, Size 12",
  "Spacing: 1.5 lines",
  "Alignment: Justified",
  "Margins: 1-inch on all sides",
  "Citations: Hyperlink references preferred",
  "Note: No footnotes allowed"
];

const CILADBlog = () => {
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
            <Link to="/centres/cilad/about" className="transition-colors hover:text-gold">CILAD</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Blog Submission</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              CILAD Blog Submission
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Guidelines Section */}
        <section className="py-20 lg:py-32">
          <div className="container max-w-6xl space-y-24">
            
            {/* Purpose */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-widest">Purpose</h2>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto italic">
                Encouraging analytical articles that explore contemporary developments, paradigm shifts, and jurisdictional debates in the vast landscape of International Law.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
               {/* Submission Guidelines */}
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="p-10 rounded-3xl border bg-card shadow-sm space-y-8"
               >
                  <div className="flex items-center gap-4 text-[#0f2d5c]">
                     <FileEdit className="h-6 w-6 text-gold" />
                     <h3 className="font-serif text-2xl font-bold uppercase tracking-wider">Submission Guidelines</h3>
                  </div>
                  <div className="space-y-4">
                     {guidelines.map((item, i) => (
                       <div key={i} className="flex gap-4 items-start group">
                          <CheckCircle2 className="h-5 w-5 mt-0.5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-muted-foreground font-medium">{item}</span>
                       </div>
                     ))}
                  </div>
               </motion.div>

               {/* Formatting Guidelines */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="p-10 rounded-3xl border bg-[#0f2d5c] text-white shadow-xl space-y-8 relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                     <BookOpen className="h-32 w-32 text-gold" />
                  </div>
                  <div className="flex items-center gap-4 text-gold relative z-10">
                     <Info className="h-6 w-6" />
                     <h3 className="font-serif text-2xl font-bold uppercase tracking-wider text-white">Formatting</h3>
                  </div>
                  <div className="space-y-4 relative z-10">
                     {formatting.map((item, i) => (
                       <div key={i} className="flex gap-4 items-start group">
                          <AlertCircle className="h-5 w-5 mt-0.5 text-gold shrink-0 group-hover:bg-gold group-hover:text-[#0f2d5c] rounded-full transition-all" />
                          <span className="text-white/80 font-medium">{item}</span>
                       </div>
                     ))}
                  </div>
               </motion.div>
            </div>

            {/* Submission Process */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[2.5rem] bg-secondary/20 border-2 border-dashed border-gold/30 flex flex-col items-center text-center space-y-10"
            >
               <div className="h-20 w-20 rounded-full bg-gold/10 text-gold flex items-center justify-center shadow-inner">
                  <Send className="h-8 w-8" />
               </div>
               <div className="space-y-4 max-w-2xl">
                  <h3 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-widest">How to Submit</h3>
                  <div className="grid gap-6 sm:grid-cols-3 pt-6">
                     <div className="space-y-2">
                        <Calendar className="h-5 w-5 mx-auto text-gold" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Rolling Submissions</p>
                     </div>
                     <div className="space-y-2 border-x border-gold/20">
                        <FileEdit className="h-5 w-5 mx-auto text-gold" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Official Form Only</p>
                     </div>
                     <div className="space-y-2">
                        <User className="h-5 w-5 mx-auto text-gold" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Author Bio Required</p>
                     </div>
                  </div>
               </div>
               <p className="text-muted-foreground text-sm max-w-lg italic">
                  Note: All rights transfer to CILAD upon publication. Submissions are subject to ethical review and scholarly validation.
               </p>
               <Button className="bg-[#0f2d5c] text-white hover:bg-gold hover:text-[#0f2d5c] transition-all px-12 py-8 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl group">
                  Submit via Form <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </Button>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CILADBlog;
