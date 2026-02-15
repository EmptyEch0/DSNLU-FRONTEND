import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark, FileText, Download, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PublicPolicyCentre = () => {
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
            <span className="font-medium text-gold">Law & Public Policy</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Law & Public Policy
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
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-10 border-l-4 border-gold pl-6 uppercase tracking-wider">
                About the Centre
              </h2>
              <div className="relative p-10 rounded-3xl border bg-card shadow-sm group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                   <Landmark className="h-32 w-32 text-[#0f2d5c]" />
                 </div>
                 <p className="text-muted-foreground leading-relaxed text-lg text-justify relative z-10">
                  The Centre for Law & Public Policy seeks to bridge legal scholarship with governance and policy-making processes. It facilitates interdisciplinary research and dialogue in constitutional law, governance reforms, socio-economic policy, and legislative analysis, contributing to evidence-based policy formulation.
                 </p>
              </div>
            </motion.div>

            {/* Core Values (Added for Consistency) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: Landmark, label: "Governance Reforms" },
                { icon: Target, label: "Legislative Analysis" },
                { icon: Users, label: "Public Policy" },
                { icon: FileText, label: "Evidence-Based" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 rounded-2xl border bg-card text-center transition-all hover:bg-gold/5 group">
                  <div className="mb-4 p-4 rounded-xl bg-[#0f2d5c]/5 text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-[#0f2d5c] uppercase text-xs tracking-widest leading-tight">{item.label}</h4>
                </div>
              ))}
            </motion.div>

            {/* Brochure Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border-2 border-dashed border-gold/30 p-12 bg-secondary/20 flex flex-col md:flex-row items-center justify-between gap-10"
            >
               <div className="space-y-4 text-center md:text-left">
                 <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold mb-2">
                   <FileText className="h-6 w-6" />
                 </div>
                 <h3 className="font-serif text-3xl font-bold text-[#0f2d5c]">Download Centre Brochure</h3>
                 <p className="text-muted-foreground max-w-md">Get detailed insights into our research wings, flagship programs, and institutional collaborative policy frameworks.</p>
               </div>
               <div className="shrink-0 w-full md:w-auto">
                 <Button asChild className="w-full md:w-auto bg-[#0f2d5c] border-2 border-gold text-white hover:bg-[#0f2d5c]/90 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
                    <a href="https://dsnlu.ac.in/storage/2025/01/center_law_policy_brochure.pdf" target="_blank" rel="noopener noreferrer">
                       Download PDF <Download className="ml-3 h-5 w-5" />
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

export default PublicPolicyCentre;
