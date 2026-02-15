import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, BookOpen, Newspaper, Calendar, ArrowUpRight, Award, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CILADInitiatives = () => {
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
            <span className="font-medium text-gold">Current Initiatives</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Current Initiatives
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Initiatives Section */}
        <section className="py-20">
          <div className="container max-w-5xl space-y-16">
            
            {/* Objectives Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: BookOpen, label: "Academic Discourse", text: "Workshops and seminars on global law" },
                { icon: Award, label: "Quarterly Journal", text: "Planned ISSN publications for research" },
                { icon: Target, label: "Skill Development", text: "International law simulations and training" },
                { icon: ArrowUpRight, label: "Collaborations", text: "Institutional tie-ups with global practitioners" }
              ].map((obj, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card text-center hover:shadow-md transition-all group">
                   <div className="mb-4 h-10 w-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mx-auto group-hover:bg-gold group-hover:text-white transition-all">
                     <obj.icon className="h-5 w-5" />
                   </div>
                   <h4 className="font-bold text-[#0f2d5c] text-xs uppercase tracking-widest mb-2">{obj.label}</h4>
                   <p className="text-muted-foreground text-[10px] leading-relaxed">{obj.text}</p>
                </div>
              ))}
            </motion.div>

            {/* Main Series Cards */}
            <div className="grid gap-10">
               {/* IL 101 */}
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-col md:flex-row gap-8 p-10 rounded-[2.5rem] border bg-gradient-to-r from-background to-secondary/20 shadow-sm relative group overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-40 w-40 text-[#0f2d5c]" />
                  </div>
                  <div className="flex-1 space-y-6 relative z-10">
                     <div className="flex items-center gap-3 text-gold">
                        <span className="h-px w-8 bg-gold" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em]">Institutional Series</span>
                     </div>
                     <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">IL 101 Infographic Series</h2>
                     <p className="text-muted-foreground leading-relaxed text-justify">
                        Our flagship visual initiative aimed at simplifying complex international law concepts. This series breaks down landmark treaties, global legal developments, and jurisdictional nuances into easy-to-understand infographic formats for law students and practitioners alike.
                     </p>
                     <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-5 py-2 rounded-full border bg-white text-[10px] font-bold text-[#0f2d5c] uppercase flex items-center gap-2">
                           <Bell className="h-3 w-3 text-gold" /> Academic Awareness
                        </span>
                        <span className="px-5 py-2 rounded-full border bg-white text-[10px] font-bold text-[#0f2d5c] uppercase flex items-center gap-2">
                           <Calendar className="h-3 w-3 text-gold" /> Regular Updates
                        </span>
                     </div>
                  </div>
               </motion.div>

               {/* News Bulletin */}
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-col md:flex-row gap-8 p-10 rounded-[2.5rem] border bg-gradient-to-l from-background to-gold/5 shadow-sm relative group overflow-hidden"
               >
                  <div className="absolute top-0 left-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                    <Newspaper className="h-40 w-40 text-gold" />
                  </div>
                  <div className="flex-1 space-y-6 relative z-10">
                     <div className="flex items-center gap-3 text-[#0f2d5c]">
                        <span className="h-px w-8 bg-[#0f2d5c]" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em]">CILAD Publications</span>
                     </div>
                     <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">CILAD News Bulletin Series</h2>
                     <p className="text-muted-foreground leading-relaxed text-justify">
                        A monthly publication cataloging pivotal global legal developments. The bulletin covers shifting paradigms in international trade, humanitarian interventions, environmental resolutions, and diplomatic shifts, ensuring our readers stay informed on the pulse of global legal trends.
                     </p>
                     <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-5 py-2 rounded-full border bg-[#0f2d5c] text-[10px] font-bold text-white uppercase flex items-center gap-2">
                           <Newspaper className="h-3 w-3 text-gold" /> Global Discourse
                        </span>
                        <span className="px-5 py-2 rounded-full border bg-[#0f2d5c] text-[10px] font-bold text-white uppercase flex items-center gap-2">
                           <Calendar className="h-3 w-3 text-gold" /> Monthly Edition
                        </span>
                     </div>
                  </div>
               </motion.div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CILADInitiatives;
