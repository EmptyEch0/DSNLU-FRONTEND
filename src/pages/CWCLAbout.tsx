import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, BookOpen, Scale, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CWCLAbout = () => {
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
            <span className="font-medium text-gold">CWCL - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              CENTRE FOR WOMEN AND CHILD LAW
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
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-20">
            
            {/* About the Centre */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8 border-l-4 border-gold pl-6">
                About the Centre
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The Centre for Women and Child Law (CWCL) at DSNLU was established to facilitate interdisciplinary research and advocacy on legal issues affecting the most vulnerable sections of society. The centre recognizes that women and children often face unique legal challenges rooted in systemic gender inequality and societal structures.
                </p>
                <p>
                  Our primary objective is to conduct rigorous research on the intersection of law, policy, and society, specifically focusing on how legal frameworks can be strengthened to protect and empower women and children. We believe that legal empowerment is a crucial step towards achieving social justice.
                </p>
                <p>
                  Gender inequality remains a persistent global challenge, manifesting in various forms of discrimination and violence. Simultaneously, children represent the future of our nation, yet they are often the most susceptible to neglect and exploitation. The CWCL is dedicated to addressing these critical gaps through academic rigor and public sensitization.
                </p>
                <p>
                  Through our public awareness missions, we aim to bridge the gap between complex legal statutes and the people they are meant to protect. By fostering a deeper understanding of rights and responsibilities, the CWCL strives to create a safer and more equitable environment for all.
                </p>
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Objectives
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#0f2d5c] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Research & Capacity Building</h4>
                  <p className="text-sm text-muted-foreground">Conducting in-depth studies and developing legal expertise on women and child rights.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Awareness & Sensitization</h4>
                  <p className="text-sm text-muted-foreground">Creating social awareness and educating the public on protective legal frameworks.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-foreground group-hover:bg-[#0f2d5c] group-hover:text-white transition-colors">
                    <Users className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Collaborative Engagement</h4>
                  <p className="text-sm text-muted-foreground">Organizing guest lectures, workshops, seminars, and international conferences.</p>
                </div>
              </div>
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Committee
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Honorary Chair */}
                <div className="col-span-full mb-4">
                  <div className="inline-flex items-center gap-4 p-6 rounded-2xl border bg-[#0f2d5c] text-white shadow-lg w-full md:w-auto min-w-[320px]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                      <Users className="h-8 w-8 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold/80 mb-1">Honorary Chair Person</p>
                      <h4 className="text-xl font-bold">Dr. Rifat Khan</h4>
                    </div>
                  </div>
                </div>

                {/* Other Members */}
                {[
                  { role: "Faculty Member", name: "Dr. Ch. Lakshmi" },
                  { role: "Member", name: "Ms. Sherley Hepsiba D" },
                  { role: "Member", name: "Ms. D. Aparna" },
                ].map((member, i) => (
                  <div key={i} className="flex flex-col p-6 rounded-2xl border bg-card shadow-sm hover:border-gold/30 transition-all">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{member.role}</p>
                    <h4 className="text-lg font-bold text-foreground">{member.name}</h4>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CWCLAbout;
