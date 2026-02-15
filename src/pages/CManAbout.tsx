import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Anchor, ShieldCheck, Globe, Users, Target, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studentMembers = [
  { year: "V Year", members: ["Member 1", "Member 2"] }, // Data not explicitly provided for names, using generic list
  { year: "IV Year", members: ["Member 1", "Member 2", "Member 3"] },
  { year: "III Year", members: ["Member 1", "Member 2"] },
  { year: "II Year", members: ["Member 1", "Member 2", "Member 3"] },
  { year: "II Year (3 Year LL.B)", members: ["Member 1", "Member 2"] },
];

const CManAbout = () => {
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
            <span className="font-medium text-gold">C-MAN - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src="https://dsnlu.ac.in/storage/2024/09/IMG-20240823-WA0006-300x300.jpg" 
                alt="C-MAN Logo" 
                className="h-32 w-32 rounded-full border-4 border-gold shadow-lg"
              />
              <div className="text-center md:text-left">
                <motion.h1 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-serif text-2xl font-bold text-white md:text-4xl lg:text-5xl uppercase tracking-wider"
                >
                  Centre for Maritime, Admiralty & Navigation Laws (C-MAN)
                </motion.h1>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-6 h-1 w-24 rounded-full bg-gold" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-24">
            
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
              <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                <p>
                  Established on **29 July 2024**, the Centre for Maritime, Admiralty & Navigation Laws (C-MAN) is a specialized research core at DSNLU. The centre was established with a vision to strengthen the foundations of maritime and shipping law research in India.
                </p>
                <p>
                  Located in Visakhapatnam, a city that serves as a major gateway port and the headquarters of the Eastern Naval Command, C-MAN is uniquely positioned to bridge the gap between academic study and the practical complexities of the maritime sector.
                </p>
                <p>
                  Our focus encompasses a wide range of critical areas including admiralty law, shipping regulations, international maritime trade, maritime dispute resolution, environmental protection within marine ecosystems, and maritime security.
                </p>
                <p>
                  C-MAN aims to become a premier hub for national and international discourse, fostering collaborations with industry experts, policy makers, and legal practitioners to address the evolving challenges of the global maritime landscape.
                </p>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-[#0f2d5c] text-white shadow-xl relative overflow-hidden"
            >
              <Anchor className="absolute top-0 right-0 p-10 h-40 w-40 text-gold opacity-10" />
              <h3 className="font-serif text-3xl font-bold text-gold mb-12 uppercase tracking-widest text-center">Vision & Mission</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { icon: ShieldCheck, text: "Advance maritime policy and legal frameworks" },
                   { icon: Globe, text: "Protect and preserve the global marine environment" },
                   { icon: Briefcase, text: "Promote safe, efficient and sustainable shipping" },
                   { icon: Target, text: "Support economic growth through maritime excellence" }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center text-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-gold">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-white/90 leading-snug">{item.text}</p>
                   </div>
                 ))}
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
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  "Promote public awareness in maritime and shipping laws",
                  "Encourage specialized research, education and professional training",
                  "Create a networking platform with global maritime experts",
                  "Address contemporary maritime security & environmental challenges"
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-md transition-all group">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <Target className="h-3 w-3" />
                    </div>
                    <p className="text-muted-foreground font-bold leading-relaxed">{obj}</p>
                  </div>
                ))}
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
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. P. Jogi Naidu</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Faculty Member</td>
                      <td className="px-6 py-4">Dr. Ch. Lakshmi</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={2}>Members</td>
                      <td className="px-6 py-4">Mr. Abhishek Sinha</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Arvind Nath Tripathi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Centre Composition */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Centre Composition (AY 2025–26)
              </h2>

              {/* Office Bearers */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl border-2 border-gold/30 bg-gold/5 flex items-center gap-6 group hover:bg-gold hover:text-white transition-all duration-500">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold group-hover:text-[#0f2d5c]">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-white/80">Student Convenor</p>
                    <h4 className="font-serif text-xl font-bold">Rishi Raj</h4>
                    <span className="text-xs font-bold opacity-70">IV Year</span>
                  </div>
                </div>
                <div className="p-8 rounded-3xl border-2 border-gold/30 bg-gold/5 flex items-center gap-6 group hover:bg-gold hover:text-white transition-all duration-500">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold group-hover:text-[#0f2d5c]">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-white/80">Student Co-Convenor</p>
                    <h4 className="font-serif text-xl font-bold">Sumangala Bhargava</h4>
                    <span className="text-xs font-bold opacity-70">IV Year</span>
                  </div>
                </div>
              </div>

              {/* Student Members Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                 {studentMembers.map((sem, i) => (
                   <div key={i} className="p-6 rounded-2xl border bg-card shadow-sm hover:border-gold/30 hover:shadow-md transition-all">
                      <h4 className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-6">
                        <GraduationCap className="h-4 w-4" />
                        {sem.year}
                      </h4>
                      <ul className="space-y-3">
                        {sem.members.map((m, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-medium text-muted-foreground group">
                            <div className="h-1 w-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                            {m}
                          </li>
                        ))}
                      </ul>
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

export default CManAbout;
