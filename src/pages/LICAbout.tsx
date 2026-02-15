import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, Lightbulb, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const memberSemesters = [
  { semester: "IX Semester", members: ["Member 1", "Member 2"] }, // Data not fully provided, using placeholders or generic structure
  { semester: "VII Semester", members: ["Member 1", "Member 2"] },
  { semester: "V Semester", members: ["Member 1", "Member 2"] },
  { semester: "III Semester", members: ["Member 1", "Member 2"] },
  { semester: "I Semester", members: ["Member 1", "Member 2"] },
];

const traineeMembers = [
  { name: "Meruva Tony Akash", semester: "V Semester" },
  { name: "Priyansha Trivedi", semester: "V Semester" },
  { name: "Koilada Tanusri Naga Nuka Sai", semester: "III Semester" },
  { name: "Varun Jagga", semester: "I Semester" },
];

const LICAbout = () => {
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
            <span className="font-medium text-gold">LIC - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              LEGAL INCUBATION CENTRE (LIC)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
            
            {/* Purpose Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 relative inline-block rounded-2xl border-l-4 border-gold bg-white/5 p-6 backdrop-blur-sm shadow-xl"
            >
              <p className="text-xl font-bold text-gold uppercase tracking-wider">
                Purpose: Fostering Legal Entrepreneurship and Advocacy Skills
              </p>
            </motion.div>
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
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Established in 2018 by Damodaram Sanjivayya National Law University, the Legal Incubation Centre (LIC) is a pioneering institutional mechanism designed to foster legal entrepreneurship and advocacy skills among students and professionals.
                </p>
                <p>
                  The centre's primary focus is to encourage innovative legal solutions and provide a bridge between legal theory and practical application. We aim to support aspiring legal professionals in navigating the complexities of the modern legal landscape.
                </p>
                <p>
                  As an incubation hub, LIC provides a platform for creative thinking and interdisciplinary collaboration, ensuring that the legal community is better equipped to handle real-world challenges with professional excellence.
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Lightbulb, text: "Encourage and support legal start-ups with interdisciplinary innovation" },
                  { icon: Briefcase, text: "Bridge academic knowledge and real-world legal practice" },
                  { icon: Target, text: "Provide experiential learning opportunities" },
                  { icon: Users, text: "Organise workshops on professional skills & entrepreneurship culture" },
                  { icon: GraduationCap, text: "Conduct inter-university & national-level competitions (CSI, trial advocacy, etc.)" }
                ].map((obj, i) => (
                  <div key={i} className="group flex flex-col p-6 rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-gold/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                      <obj.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#0f2d5c] leading-snug">
                      {obj.text}
                    </p>
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
                      <td className="px-6 py-4">Dr. Nandini C.P.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={4}>Faculty Members</td>
                      <td className="px-6 py-4">Dr. Ch. Lakshmi</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. A. Nageswara Rao</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Rifat Khan</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. I. Durga Prasad</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Student Members */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Student Members
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {memberSemesters.map((sem, i) => (
                  <div key={i} className="p-6 rounded-2xl border bg-card shadow-sm hover:border-gold/30 transition-all">
                    <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-4">{sem.semester}</h4>
                    <ul className="space-y-2">
                      {sem.members.map((m, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground font-medium">
                          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trainee Members */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Trainee Members
              </h2>
              <div className="grid gap-4">
                {traineeMembers.map((trainee, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-xl border bg-secondary/20 group hover:border-gold/30 transition-all">
                    <h4 className="font-bold text-[#0f2d5c]">{trainee.name}</h4>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3 py-1 rounded-full shadow-sm">
                      {trainee.semester}
                    </span>
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

export default LICAbout;
