import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, User, ExternalLink, ShieldCheck, Ship, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CManEvents = () => {
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
            <span className="font-medium text-gold">C-MAN Events</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544924222-3513ce0fc972?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Recent Events
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="space-y-12">
               
               {/* Event Card */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="group relative rounded-3xl border bg-card p-1 shadow-sm transition-all hover:shadow-xl"
               >
                 <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12 border-l-8 border-gold rounded-2xl overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 p-10 opacity-5 group-hover:rotate-12 transition-transform">
                      <Ship className="h-40 w-40 text-[#0f2d5c]" />
                    </div>
                    
                    <div className="flex-1 space-y-6 relative z-10">
                      <div className="flex flex-wrap items-center gap-4">
                         <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-2 rounded-full">
                           <Calendar className="h-3.5 w-3.5" /> 31 August 2024
                         </span>
                         <span className="text-xs font-bold uppercase tracking-widest text-[#0f2d5c] bg-[#0f2d5c]/5 px-4 py-2 rounded-full flex items-center gap-2">
                           <Scale className="h-4 w-4" /> NHRC Collaboration
                         </span>
                      </div>

                      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] leading-tight group-hover:text-gold transition-colors">
                        One Day Open House Discussion on “Rights of Fishermen”
                      </h2>

                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed text-justify">
                          The Centre for Maritime, Admiralty & Navigation Laws (C-MAN) at DSNLU, in collaboration with the **National Human Rights Commission (NHRC)**, organized a significant open house discussion focused on the legislative and social protections afforded to the fishing community.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-justify italic border-l-4 border-secondary/50 pl-6">
                          "The event served as a vital platform for dialogue between legal scholars, maritime industry stakeholders, and representatives from the fishing community, addressing human rights challenges, safety at sea, and the socio-economic impact of maritime policies on traditional fishing rights."
                        </p>
                      </div>

                      <div className="flex items-center gap-6 pt-4 border-t border-secondary/50">
                         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <User className="h-4 w-4 text-gold" />
                            <span>Experts & Stakeholders</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <ShieldCheck className="h-4 w-4 text-gold" />
                            <span>Rights Advocacy</span>
                         </div>
                      </div>
                    </div>
                 </div>
               </motion.div>

            </div>
          </div>
        </section>

        {/* Future Commitment */}
        <section className="py-24 bg-[#0f2d5c] text-white overflow-hidden">
           <div className="container relative z-10 text-center max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-12 bg-gold mx-auto" />
                <h3 className="font-serif text-3xl font-bold">Bridging Law and Maritime Excellence</h3>
                <p className="text-white/80 leading-relaxed italic">
                  Continuing our objective to encourage specialized research and professional training in the maritime sector through high-impact academic and social engagement.
                </p>
              </motion.div>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default CManEvents;
