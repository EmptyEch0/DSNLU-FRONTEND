import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Award, UserCheck, Users, Mail, GraduationCap, Gavel, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CIPRBoard = () => {
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
            <span className="font-medium text-gold">CIPR&T Board</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507679799987-c7377ec48696?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              IPR Editorial & Advisory Board
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Patrons Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-5xl space-y-12">
             <div className="grid md:grid-cols-2 gap-8">
                {/* Chief Patron */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl border bg-white shadow-sm flex items-start gap-6 border-t-8 border-gold"
                >
                  <div className="p-4 rounded-2xl bg-[#0f2d5c] text-gold shrink-0">
                    <Gavel className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Chief Patron</p>
                    <h3 className="font-serif text-xl font-bold text-[#0f2d5c]">Hon’ble Sri Justice P. Narasimha</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Judge, Supreme Court of India<br />
                      Visitor, DSNLU
                    </p>
                  </div>
                </motion.div>

                {/* Patron */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-3xl border bg-white shadow-sm flex items-start gap-6 border-t-8 border-[#0f2d5c]"
                >
                  <div className="p-4 rounded-2xl bg-gold text-[#0f2d5c] shrink-0">
                    <Scale className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#0f2d5c]/60 uppercase tracking-[0.2em]">Patron</p>
                    <h3 className="font-serif text-xl font-bold text-[#0f2d5c]">Hon’ble Sri Justice Dhiraj Singh Thakur</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Chief Justice, High Court of Andhra Pradesh<br />
                      Chancellor, DSNLU
                    </p>
                  </div>
                </motion.div>
             </div>

             {/* Honorary Editor */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-[#0f2d5c] text-white shadow-2xl flex flex-col md:flex-row items-center text-center md:text-left gap-8"
             >
                <div className="p-6 rounded-full bg-white/10 text-gold scale-110">
                  <UserCheck className="h-10 w-10" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-2">Honorary Editor</p>
                   <h3 className="font-serif text-3xl font-bold mb-2">Prof. (Dr.) D. Surya Prakasa Rao</h3>
                   <p className="text-lg text-white/70">Vice-Chancellor, DSNLU</p>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Chief Editor Section */}
        <section className="py-24">
          <div className="container max-w-4xl">
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 rounded-3xl border-2 border-gold/30 bg-secondary/10 flex flex-col md:flex-row items-center gap-10"
             >
                <div className="absolute top-4 right-4 text-gold/10">
                  <Award className="h-32 w-32" />
                </div>
                <div className="h-32 w-32 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-gold text-[#0f2d5c]">
                   <GraduationCap className="h-14 w-14" />
                </div>
                <div className="space-y-4 relative z-10 flex-1">
                   <p className="text-sm font-bold text-[#0f2d5c]/60 uppercase tracking-widest">Chief Editor</p>
                   <h3 className="font-serif text-3xl font-bold text-[#0f2d5c]">Dr. Dayananda Murthy C.P</h3>
                   <div className="space-y-1 text-muted-foreground font-medium">
                      <p>Associate Professor & Chair Person, CIPR</p>
                      <div className="flex items-center gap-2 text-gold">
                        <Mail className="h-4 w-4" />
                        <a href="mailto:dmurthy@dsnlu.ac.in" className="hover:underline">dmurthy@dsnlu.ac.in</a>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Boards Section */}
        <section className="py-24 bg-muted/20">
          <div className="container max-w-6xl space-y-16">
             <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Advisory Board */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-gold" />
                    <h2 className="font-serif text-2xl font-bold text-[#0f2d5c] uppercase tracking-wide">Advisory Board</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Prof. (Dr.) V.C. Vivekananda",
                      "Prof. (Dr.) V.K. Ahuja",
                      "Prof. (Dr.) T. Ramakrishna",
                      "Prof. (Dr.) Irene Calboli"
                    ].map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all group">
                         <span className="font-bold text-[#0f2d5c] group-hover:text-gold transition-colors">{name}</span>
                         <Award className="h-5 w-5 text-gold/30 group-hover:text-gold transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Editorial Board */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <UserCheck className="h-8 w-8 text-gold" />
                    <h2 className="font-serif text-2xl font-bold text-[#0f2d5c] uppercase tracking-wide">Editorial Board</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Dr. Ragini P Khubalkar",
                      "Prof. (Dr.) G.B. Reddy",
                      "Prof. (Dr.) Subhash Chandra Roy"
                    ].map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all group">
                         <span className="font-bold text-[#0f2d5c] group-hover:text-gold transition-colors">{name}</span>
                         <CheckCircle className="h-5 w-5 text-gold/30 group-hover:text-gold transition-colors" />
                      </div>
                    ))}
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

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default CIPRBoard;
