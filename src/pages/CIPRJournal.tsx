import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, BookOpen, FileCheck, Info, ExternalLink, Mail, ListChecks, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CIPRJournal = () => {
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
            <span className="font-medium text-gold">CIPR&T Journal</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl"
            >
              DSNLU Journal of Science, Technology & Law (DJSTL)
            </motion.h1>
            <p className="mt-4 text-gold font-bold tracking-[0.2em] uppercase">ISSN No: 2583-1208</p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16 bg-muted/30">
          <div className="container grid md:grid-cols-3 gap-8">
             <div className="p-8 rounded-2xl bg-white border shadow-sm flex flex-col items-center text-center group hover:border-gold/30 transition-all">
                <div className="mb-4 p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-[#0f2d5c] mb-2 uppercase tracking-wide">Peer-Reviewed</h4>
                <p className="text-sm text-muted-foreground">Maintains highest academic standards through double-blind peer reviews.</p>
             </div>
             <div className="p-8 rounded-2xl bg-white border shadow-sm flex flex-col items-center text-center group hover:border-gold/30 transition-all">
                <div className="mb-4 p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-[#0f2d5c] mb-2 uppercase tracking-wide">Open Access</h4>
                <p className="text-sm text-muted-foreground">Freely accessible to the global research community to foster legal dialogue.</p>
             </div>
             <div className="p-8 rounded-2xl bg-white border shadow-sm flex flex-col items-center text-center group hover:border-gold/30 transition-all">
                <div className="mb-4 p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <Info className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-[#0f2d5c] mb-2 uppercase tracking-wide">Themes</h4>
                <p className="text-sm text-muted-foreground">Focuses on contemporary issues at the intersection of Science, Tech & Law.</p>
             </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container max-w-5xl space-y-20">
            
            {/* Eligibility & Theme */}
            <div className="grid md:grid-cols-2 gap-12">
               <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
               >
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">Eligibility</h2>
                 <p className="text-muted-foreground leading-relaxed">
                   The journal welcomes original and unpublished submissions from Academicians, Legal Professionals, Research Scholars, and Students who are engaged in the study of Intellectual Property and Technology Law.
                 </p>
               </motion.div>
               <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
               >
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">Theme</h2>
                 <p className="text-muted-foreground leading-relaxed">
                   We invite high-quality articles specifically exploring the evolving landscapes of:
                 </p>
                 <ul className="grid grid-cols-2 gap-2 text-sm font-bold text-[#0f2d5c]">
                   <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-gold" /> Intellectual Property Law</li>
                   <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-gold" /> Technology Law</li>
                 </ul>
               </motion.div>
            </div>

            {/* Submission Guidelines */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b pb-4">
                <ListChecks className="h-8 w-8 text-gold" />
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">Submission Guidelines</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Cover letter containing title, author name & affiliation.",
                  "Maximum 2 authors per submission.",
                  "Manuscript must be completely anonymous.",
                  "300-word abstract with 5 keywords required.",
                  "Similarity index must be below 10%.",
                  "Submissions via MS Word (.doc) only.",
                  "Deadlines: 31 May / 31 October annually.",
                  "Review period: Minimum 12 weeks."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:border-gold/30 transition-all">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Formatting Guidelines */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl border bg-[#0f2d5c] text-white shadow-2xl space-y-10"
            >
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-gold" />
                <h2 className="font-serif text-3xl font-bold">Formatting Guidelines</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h4 className="text-gold font-bold uppercase tracking-widest text-sm border-b border-gold/30 pb-2">Layout & Font</h4>
                    <ul className="space-y-4 text-sm text-white/80">
                      <li>• Times New Roman (TNR), Size 12, 1.5 spacing.</li>
                      <li>• Main Title: TNR 14, Bold, Centered.</li>
                      <li>• Headings: Use Roman Numerals (I, II, III...).</li>
                      <li>• Citation Style: Bluebook 21st Edition.</li>
                      <li>• Footnotes: TNR 10, Single spacing.</li>
                    </ul>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-gold font-bold uppercase tracking-widest text-sm border-b border-gold/30 pb-2">Word Limits</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                          <span className="font-bold">Long Articles</span>
                          <span className="text-gold">5000 – 8000</span>
                       </div>
                       <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                          <span className="font-bold">Short Articles</span>
                          <span className="text-gold">3000 – 5000</span>
                       </div>
                       <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                          <span className="font-bold">Legislative Comment</span>
                          <span className="text-gold">2000 – 3000</span>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border-2 border-dashed border-gold/30 p-10 bg-secondary/20 flex flex-col md:flex-row items-center justify-between gap-8"
            >
               <div className="space-y-2">
                 <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">Ready for Submission?</h3>
                 <p className="text-muted-foreground">For any queries or formal submissions, please contact us via email.</p>
                 <div className="flex items-center gap-2 mt-4 text-[#0f2d5c] font-bold">
                    <Mail className="h-5 w-5 text-gold" />
                    <a href="mailto:ipr@dsnlu.ac.in" className="hover:text-gold transition-colors">ipr@dsnlu.ac.in</a>
                 </div>
               </div>
               <div className="flex flex-col sm:flex-row gap-4">
                 <Button asChild className="bg-[#0f2d5c] hover:bg-[#0f2d5c]/90 h-14 px-8 font-bold">
                    <a href="https://dsnlu.ac.in/dsnlu-journal-of-science-technology-and-law/" target="_blank" rel="noopener noreferrer">
                       Previous Issues <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                 </Button>
               </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CIPRJournal;
