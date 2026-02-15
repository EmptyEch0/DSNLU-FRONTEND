import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  FileText, 
  Download,
  ChevronRight,
  BookCopy
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function GirlsHostelManual() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      
      <main className="flex-grow">
        {/* Institutional Hero Section */}
        <section className="relative overflow-hidden bg-navy py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy to-navy" />
          
          <div className="container relative z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex items-center gap-2 text-gold/80">
                <Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Students</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Girls Hostel Manual</span>
              </div>
              
              <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl uppercase">
                Girls Hostel Manual
              </h1>
              <div className="h-1 w-24 bg-gold rounded-full mb-8 shadow-gold/20 shadow-lg" />
              <p className="max-w-2xl text-lg font-medium text-white/80 leading-relaxed italic">
                "Manual for residents of the Girls Hostel."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-28">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-10 lg:p-16 shadow-elegant border border-black/5"
              >
                <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-gold/10 p-4 text-gold">
                  <BookCopy className="h-12 w-12" />
                </div>
                
                <h2 className="mb-6 font-serif text-3xl font-bold text-navy">
                  DSNLU Hall of Residence for Girls Manual
                </h2>
                
                <p className="mb-12 text-lg text-foreground/70 leading-relaxed">
                  This manual contains the operational guidelines, responsibilities, and code of conduct 
                  specifically for the Girls Hostel of Damodaram Sanjivayya National Law University.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <a 
                    href="https://dsnlu.ac.in/storage/2022/12/DSNLU-Hall-of-Residence-for-Girls-Manual.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      className="group bg-gold text-navy hover:bg-navy hover:text-gold px-10 h-16 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-gold/20 transition-all duration-300 w-full"
                    >
                      <Download className="mr-3 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                      Download Girls Hostel Manual (PDF)
                    </Button>
                  </a>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-2">
                    Official Document • New Window
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
