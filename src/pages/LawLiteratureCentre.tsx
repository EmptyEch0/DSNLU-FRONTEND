import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, BookOpen, Quote, Sparkles, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LawLiteratureCentre = () => {
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
            <span className="font-medium text-gold">Law & Literature</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Law & Literature
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
              className="prose prose-lg max-w-none space-y-10"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-10 border-l-4 border-gold pl-6 uppercase tracking-wider text-center lg:text-left">
                About the Centre
              </h2>
              <div className="relative p-12 rounded-[2.5rem] border bg-gradient-to-br from-white to-secondary/20 shadow-sm overflow-hidden group">
                 <Quote className="absolute -top-10 -left-10 h-40 w-40 text-[#0f2d5c] opacity-5 -rotate-12" />
                 <p className="leading-relaxed text-xl text-justify italic relative z-10 text-[#0f2d5c]/80">
                  The Centre for Law & Literature explores the intersection between legal thought and literary narratives. It encourages critical engagement with legal philosophy, justice, ethics, and constitutional values through literary texts and interdisciplinary scholarship.
                 </p>
              </div>
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                   <Users className="h-5 w-5" />
                 </div>
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider">
                  Committee
                </h2>
              </div>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium italic">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10 not-italic">Honorary Chair Person</td>
                      <td className="px-6 py-4">Prof. D. Surya Prakasa Rao</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10 not-italic">Faculty Member</td>
                      <td className="px-6 py-4">Dr. P. Jogi Naidu</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10 not-italic" rowSpan={2}>Members</td>
                      <td className="px-6 py-4">Dr. N. Bhagyalakshmi</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Rifat Khan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Users = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default LawLiteratureCentre;
