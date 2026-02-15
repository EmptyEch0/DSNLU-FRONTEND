import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Building2, 
  FileText, 
  Download, 
  Info,
  Scale,
  Award,
  ScrollText
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const StatutoryCommittees = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold text-xs sm:text-sm">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground text-xs sm:text-sm">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">Statutory Committees</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight"
            >
              Statutory Committees <br />
              <span className="text-gold">& Centres</span>
            </motion.h1>
            <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-6"
              >
                <div className="h-20 w-20 bg-secondary rounded-[2rem] flex items-center justify-center text-navy mx-auto mb-8 shadow-xl ring-4 ring-secondary/50">
                   <Building2 className="h-10 w-10 text-gold" />
                </div>
                <p className="text-xl sm:text-2xl text-navy font-serif leading-relaxed italic border-l-4 border-gold pl-8 py-2 text-justify">
                  "Damodaram Sanjivayya National Law University has constituted various Statutory Committees and Academic Centres to ensure effective governance, compliance, and academic excellence in accordance with University regulations and statutory mandates."
                </p>
              </motion.div>

              {/* Download Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-navy p-10 sm:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,33,71,0.3)] group"
              >
                <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 h-64 w-64 bg-gold/5 rounded-full blur-[100px] -ml-32 -mb-32" />
                
                <div className="relative flex flex-col md:flex-row items-center gap-10">
                   <div className="h-24 w-24 shrink-0 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                      <ScrollText className="h-12 w-12 text-gold group-hover:text-navy" />
                   </div>
                   <div className="flex-1 space-y-4 text-center md:text-left">
                      <h3 className="text-3xl font-serif font-bold tracking-tight">Centres & Committees – Revised List</h3>
                      <p className="text-white/60 font-medium">Download the latest updated list of all statutory committees and academic centres as of December 2024.</p>
                      
                      <div className="pt-4">
                        <a 
                          href="https://dsnlu.ac.in/storage/2024/12/Centres-Committees-01.12.24-Revised-latest.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button className="h-16 px-12 rounded-2xl bg-gold text-navy font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all group flex items-center gap-3">
                            <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                            Download PDF (Revised List)
                          </Button>
                        </a>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { icon: <Scale className="h-6 w-6" />, title: "Governance", text: "Committees ensuring statutory compliance and administrative efficiency." },
                 { icon: <Award className="h-6 w-6" />, title: "Academic Excellence", text: "Centres dedicated to research, outreach, and legal advancement." },
                 { icon: <ShieldCheck className="h-6 w-6" />, title: "Compliance", text: "Strict adherence to OBC, SC/ST, and institutional mandates." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-navy/5 hover:border-gold/30 transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-gold mb-6">{item.icon}</div>
                    <h4 className="text-navy font-bold uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Contact/Help */}
        <section className="py-20 lg:py-32">
          <div className="container">
             <div className="max-w-2xl mx-auto p-12 rounded-[3rem] border border-dashed border-gold/40 bg-gold/5 text-center space-y-6">
                <Info className="h-10 w-10 text-navy mx-auto animate-bounce" />
                <h4 className="text-navy font-serif text-2xl font-bold italic uppercase tracking-tight">Need further clarification?</h4>
                <p className="text-foreground/70 font-medium">For specific details regarding committee mandates or membership updates, please contact the University Administration office.</p>
                <Button variant="outline" className="rounded-xl border-navy text-navy font-bold px-8 hover:bg-navy hover:text-white transition-all">
                  Contact Admin
                </Button>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StatutoryCommittees;
