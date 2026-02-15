import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Globe, Scale, ShieldCheck, Users, GraduationCap, Briefcase, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studentTeams = [
  {
    role: "Founding Conveners",
    members: ["Surbhi Gupta", "Vinita Singh"],
    icon: GraduationCap,
    bgColor: "bg-gold/10",
    textColor: "text-gold"
  },
  {
    role: "Research & Publications Team",
    members: ["Elsa Sibu", "Archana Pingal", "Devanshi Pandey", "Katyayni Singh", "Utkarsh Gupta", "Sourav Ghosh", "Zohaa Siddiqui"],
    icon: Briefcase,
    bgColor: "bg-[#0f2d5c]/5",
    textColor: "text-[#0f2d5c]"
  },
  {
    role: "Events & Outreach",
    members: ["Ratna Sumedha Chintha", "Deepika"],
    icon: Globe,
    bgColor: "bg-secondary/50",
    textColor: "text-muted-foreground"
  },
  {
    role: "Social Media & Design",
    members: ["Medha Karaka", "Chaitanya Samhitha Ragadu"],
    icon: Globe2,
    bgColor: "bg-gold/5",
    textColor: "text-gold"
  }
];

const CILADAbout = () => {
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
            <span className="font-medium text-gold">CILAD - About</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider leading-tight max-w-4xl mx-auto"
            >
              Centre for International Law & Allied Disciplines (CILAD)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-8 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="container max-w-6xl space-y-24">
            
            {/* Introduction & About */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg text-justify italic border-b-2 border-secondary/50 pb-8">
                  International law serves as a vital mechanism in managing global relations, facilitating peaceful coexistence, resolving disputes, and regulating cross-border governance. From trade to climate change and humanitarian law, international law shapes global interactions.
                </p>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">About CILAD</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Established in 2024 as a student-run initiative under the aegis of DSNLU, CILAD aims to foster a deep understanding of international law through academic excellence, research, and global discourse.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  { label: "Public International Law", icon: Globe },
                  { label: "Private International Law", icon: Scale },
                  { label: "International Trade Law", icon: Briefcase },
                  { label: "Environmental Law", icon: ShieldCheck },
                  { label: "Humanitarian Law", icon: Globe2 }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-md transition-all text-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-[#0f2d5c] text-[10px] uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
                <div className="sm:col-span-2 p-6 rounded-2xl border-2 border-dashed border-gold/30 bg-gold/5 text-center flex items-center justify-center font-bold text-[#0f2d5c] text-sm uppercase tracking-wider">
                  & INTERDISCIPLINARY RESEARCH
                </div>
              </motion.div>
            </div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Committee
              </h2>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm max-w-4xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. Ch. Lakshmi</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Faculty Member</td>
                      <td className="px-6 py-4">Dr. B. Neelima</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={3}>Members</td>
                      <td className="px-6 py-4">Ms. Sherley Hepsiba D</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Kiran Kumari</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Ms. Gali Parivartana</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Student Members Grid */}
            <div className="space-y-12 pt-10">
               <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] text-center uppercase tracking-[0.2em]">Student Team</h2>
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {studentTeams.map((team, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-3xl border bg-card hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center"
                    >
                       <div className={`mb-6 p-4 rounded-2xl ${team.bgColor} ${team.textColor} group-hover:bg-[#0f2d5c] group-hover:text-white transition-colors`}>
                         <team.icon className="h-6 w-6" />
                       </div>
                       <h4 className="font-serif text-lg font-bold text-[#0f2d5c] mb-6 uppercase tracking-wider">{team.role}</h4>
                       <ul className="space-y-2">
                         {team.members.map((m, idx) => (
                           <li key={idx} className="text-sm font-medium text-muted-foreground">{m}</li>
                         ))}
                       </ul>
                    </motion.div>
                  ))}
               </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CILADAbout;
