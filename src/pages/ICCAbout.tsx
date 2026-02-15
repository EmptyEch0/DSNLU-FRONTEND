import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  ShieldCheck, 
  Scale, 
  Info,
  CheckCircle2,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ICCAbout = () => {
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
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">About ICC</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight">
                About the <br />
                <span className="text-gold">Internal Complaints Committee</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-16">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-gold ring-4 ring-secondary/50">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Statutory Mandate</h2>
                </div>
                <p className="text-xl text-navy/80 font-serif leading-relaxed italic border-l-4 border-gold pl-8 text-justify">
                  "The Internal Complaints Committee (ICC) of DSNLU is constituted in accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013."
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                  The Committee ensures a safe and dignified environment for students and staff and addresses complaints related to sexual harassment with fairness, confidentiality, and sensitivity. It is committed to fostering a culture of mutual respect and social responsibility within the university premises.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-10 rounded-3xl bg-navy text-white space-y-6 shadow-2xl relative overflow-hidden group"
                 >
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-all" />
                    <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold border border-white/10">
                       <ShieldCheck className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">University Policy</h3>
                    <p className="text-white/70 leading-relaxed">DSNLU zero-tolerance policy against sexual harassment ensures that every student and employee can work and study without fear of discrimination or harassment.</p>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-10 rounded-3xl bg-secondary/30 border space-y-6 shadow-lg relative group"
                 >
                    <div className="h-14 w-14 rounded-2xl bg-navy flex items-center justify-center text-gold border border-navy/10">
                       <Scale className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy uppercase tracking-tight">Fair Procedural Integrity</h3>
                    <p className="text-muted-foreground leading-relaxed">The ICC follows principles of natural justice, ensuring both the complainant and the respondent are heard fairly while maintaining absolute confidentiality throughout the investigation.</p>
                 </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] bg-gold/5 border-dashed border-2 border-gold/40 flex items-start gap-8"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-navy flex items-center justify-center text-white">
                  <Info className="h-6 w-6 text-gold" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-navy font-black uppercase tracking-[0.1em] text-lg">Key Responsibilities</h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                     {[
                       "Prompt Redressal of Grievances",
                       "Conducting Awareness Workshops",
                       "Ensuring Confidentiality",
                       "Policy Recommendation & Updates"
                     ].map((li, i) => (
                       <li key={i} className="flex gap-2 items-center text-sm font-bold text-navy/70">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                          {li}
                       </li>
                     ))}
                  </ul>
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

export default ICCAbout;
