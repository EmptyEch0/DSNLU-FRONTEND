import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Download, 
  FileText, 
  ShieldCheck, 
  Info,
  Scale
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ICCRules = () => {
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
            <span className="text-foreground text-xs sm:text-sm">ICC</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">Rules</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight">
                ICC Rules & <br />
                <span className="text-gold">Regulations</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Rules Content */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                   <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Regulatory Framework</h2>
                   <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                      The Internal Complaints Committee (ICC) functions within a structured legal and administrative framework designed to protect the rights of all university stakeholders. These rules provide clarity on the complaint mechanism, investigation process, and disciplinary protocols.
                   </p>
                </div>

                <div className="space-y-4">
                   {[
                     { title: "Prevention", text: "Proactive measures to ensure a harassment-free campus." },
                     { title: "Prohibition", text: "Strict legal bans on all forms of sexual misconduct." },
                     { title: "Redressal", text: "Efficient and fair handling of filed complaints." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-secondary/30 border border-navy/5">
                        <div className="h-8 w-8 rounded-lg bg-navy flex items-center justify-center text-gold shrink-0 mt-1">
                           <Scale className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-navy uppercase text-sm tracking-widest">{item.title}</h4>
                           <p className="text-muted-foreground text-sm">{item.text}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-navy p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative space-y-8 text-center flex flex-col items-center">
                   <div className="h-24 w-24 bg-gold rounded-[2rem] flex items-center justify-center text-navy shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-pulse">
                      <FileText className="h-12 w-12" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-3xl font-serif font-bold italic tracking-tight uppercase">DSNLU ICC Rules</h3>
                      <p className="text-white/60 font-medium">Complete documentation of ICC regulations and complaint disposal guidelines.</p>
                   </div>
                   
                   <div className="h-px w-2/3 bg-white/10" />

                   <div className="w-full pt-4">
                      <a 
                        href="https://dsnlu.ac.in/storage/2022/12/DSNLU-ICC-Rules_1-1.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full h-16 rounded-2xl bg-white text-navy font-black text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all group flex items-center justify-center gap-3 shadow-2xl">
                          <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                          Download PDF
                        </Button>
                      </a>
                   </div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-white/40">File size: ~1.2 MB | Format: PDF</p>
                </div>
              </motion.div>

            </div>

            {/* Note Section */}
            <motion.div
              initial={{ opacity: 0, y:30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 max-w-4xl mx-auto p-12 rounded-[3rem] bg-gold/5 border-2 border-dashed border-gold/40 text-center space-y-6"
            >
              <ShieldCheck className="h-10 w-10 text-navy mx-auto" />
              <h4 className="text-navy font-serif text-2xl font-bold italic uppercase tracking-tight">Need help navigating the rules?</h4>
              <p className="text-foreground/70 font-medium italic">"Ignorance of rules is no excuse. Every student and staff member is advised to read and understand the ICC guidelines to contribute to a safer campus environment."</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ICCRules;
