import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Gavel, 
  Scale, 
  Target, 
  Users, 
  Medal, 
  Search, 
  Trophy,
  ChevronRight,
  UserCheck,
  GraduationCap
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const MootAdvocacySociety = () => {
  const objectives = [
    "Strengthen research and drafting skills",
    "Enhance oral advocacy and courtroom confidence",
    "Conduct intra-university competitions",
    "Prepare teams for national & international competitions",
    "Promote competitive legal excellence"
  ];

  const competitions = [
    { title: "Intra Moot Court", desc: "University selection process for national representation involving prelims, finals, and Researchers Test." },
    { title: "Novice Moot Court", desc: "Mandatory competition for first-year students to build foundational advocacy skills." },
    { title: "Intra Mock Trial", desc: "Focuses on criminal litigation practice including examination and cross-examination." },
    { title: "Intra Mediation", desc: "Promotes Alternative Dispute Resolution through structured mediation rounds." },
    { title: "Intra Client Counselling", desc: "Real-world client interaction training." },
    { title: "Open Challenge Rounds", desc: "Selection process for international competitions." },
  ];

  const facultyMembers = [
    { name: "Prof. (Dr.) D. Surya Prakasa Rao", role: "Honorary Chairperson" },
    { name: "Dr. R. Bharat Kumar", role: "Convener" },
    { name: "Dr. Rifat Khan", role: "Co-Convener" },
    { name: "Dr. V. Sunitha", role: "Co-Convener" },
    { name: "Dr. Soma B", role: "Ex-Officio Member" },
    { name: "Dr. Ch. Lakshmi", role: "Member" },
    { name: "Dr. B. Neelima", role: "Member" },
    { name: "Ms. Sherley Hepsiba D", role: "Member" },
  ];

  const officeBearers = [
    { name: "Ms. Sanskriti Sinha", role: "Student Convenor" },
    { name: "Mr. Kartikey Bansal", role: "Student Co-Convenor" },
    { name: "Ms. Rupaswini", role: "Treasurer" },
  ];

  const studentMembers = [
    { year: "5th Year", names: ["Jinal Prajapat", "Greeshmika Ponnada"] },
    { year: "4th Year", names: ["Kushal Bindal", "Arjit Mishra", "Aarohi Mishra", "Viswa Pratap Singh"] },
    { year: "3rd Year", names: ["Shambhavi Pandey", "Siddhant Kaushal", "Sava Vishnu Vardhan", "Chhavi Singhal", "Duvada S.H. Neha Choudhury", "Garvita Garg"] },
    { year: "2nd Year", names: ["Aaron Thomas", "Akshat Aggarwal", "Jatan Mittal", "Kirtivardhan Singla", "Komanabelli Kishore", "Korada Sai Ikshitha", "Mohd. Aarish Saudagar", "VVNS Haritha"] },
  ];

  const achievements = [
    {
      title: "Batch 2020–2025 Achievements",
      items: ["9th National Trial Advocacy – Quarter Finalist", "12th Nyayavalokan – Semi Finalist", "2nd Insolvency Moot – Best Memorial"]
    },
    {
      title: "Arbitration & Mediation Achievements",
      items: ["HV Perera QC – Best Memorial", "NLIU-INADR – 2nd Best Mediator", "SK Mishra Mediation – Octa Finalist"]
    },
    {
      title: "Batch 2021–2026",
      items: ["Oxford IP Moot – Top 21 Global", "FDI International Arbitration – 5th World Oral Finals", "Stetson Environmental Moot – Quarter Finalist"]
    },
    {
      title: "Batch 2022–2027",
      items: ["PN Bhagwati Moot – Octa Finalist", "Dr Paras Diwan Moot – Quarter Finalist", "GNLU Moot – Best Memorial"]
    },
    {
      title: "Batch 2023–2028",
      items: ["NLU Meghalaya Moot – Quarter Finalist", "Bennett International Moot – Best Speaker", "IIT Kharagpur Moot – Quarter Finalist"]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Committees & Societies</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold capitalize">Moot & Advocacy Society</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-navy py-16 md:py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm md:text-base border-b border-gold/30 pb-2"
            >
              Training Courtroom Leaders. Building Legal Excellence.
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold md:text-5xl lg:text-7xl uppercase tracking-tight"
            >
              Moot & Advocacy <br className="hidden md:block" /> Society (MAS)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-40 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-navy">About Us</h2>
                  <div className="divider-gold" />
                </div>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    The Moot and Advocacy Society (MAS) at Damodaram Sanjivayya National Law University (DSNLU) is a student-led body guided by faculty advisors.
                  </p>
                  <p>
                    MAS is responsible for promoting, regulating, and overseeing all Inter and Intra Moot Court, Mock Trial, Mediation, Arbitration, and Client Counselling competitions.
                  </p>
                  <p>
                    Established in 2012, MAS provides structured exposure and skill development to students, enabling them to compete successfully at national and international levels.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 text-center">
                     <div className="text-3xl font-bold text-navy">22</div>
                     <div className="text-xs uppercase font-bold tracking-widest text-gold mt-1">Student Members</div>
                   </div>
                   <div className="p-6 rounded-2xl bg-navy/5 border border-navy/10 text-center">
                     <div className="text-3xl font-bold text-navy">02</div>
                     <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">Faculty Advisors</div>
                   </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/30 rounded-3xl p-10 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-full bg-gold text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Aim & Objectives</h3>
                  </div>
                  <p className="text-muted-foreground italic border-l-4 border-gold pl-4 py-2">
                    "To provide high-quality legal advocacy training and develop skilled, confident legal professionals capable of excelling in competitive legal forums."
                  </p>
                  <ul className="space-y-3">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <UserCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16 lg:py-24 bg-navy text-white relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-gold uppercase tracking-widest">Activities & Competitions</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {competitions.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all space-y-4 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-gold text-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Gavel className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl text-gold">{comp.title}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{comp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recruitment Process */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="bg-card rounded-3xl border shadow-elegant p-10 space-y-10 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Search className="h-32 w-32" />
               </div>
               <div className="space-y-4 relative z-10">
                 <h2 className="font-serif text-3xl font-bold text-navy">Recruitment Process</h2>
                 <div className="divider-gold mx-auto" />
                 <p className="text-muted-foreground italic">Joining MAS is a selective process designed to identify students with exceptional legal potential.</p>
               </div>
               <div className="grid gap-6 md:grid-cols-3 relative z-10">
                  {[
                    { title: "SOP Submission", desc: "Statement of Purpose outlining your motivation and experience." },
                    { title: "Faculty Interview", desc: "Performance-based assessment by our faculty advisors." },
                    { title: "Skill-Based Selection", desc: "Based on legal aptitude, enthusiasm, and advocacy talent." },
                  ].map((step, i) => (
                    <div key={i} className="space-y-2">
                       <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">{i+1}</div>
                       <h4 className="font-bold text-navy">{step.title}</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Faculty & Structure */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-5xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl font-bold">Faculty & Society Structure</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-navy text-white text-xs uppercase tracking-widest">
                    <th className="px-8 py-4 font-bold">Member Name</th>
                    <th className="px-8 py-4 font-bold text-right">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {facultyMembers.map((member, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-8 py-4 font-bold text-navy">{member.name}</td>
                      <td className="px-8 py-4 text-right text-sm font-medium text-gold">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Office Bearers */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold">Office Bearers (AY 2024–25)</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {officeBearers.map((ob, i) => (
                <div key={i} className="p-8 rounded-2xl border border-gold/20 bg-gold/5 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all group">
                   <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <GraduationCap className="h-8 w-8" />
                   </div>
                   <div>
                     <h3 className="font-serif text-xl font-bold text-navy">{ob.name}</h3>
                     <p className="text-xs uppercase font-bold tracking-widest text-gold mt-1">{ob.role}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAS Members by Year */}
        <section className="py-16 lg:py-24 bg-navy text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-gold uppercase tracking-widest">MAS Members</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {studentMembers.map((group, i) => (
                <div key={i} className="space-y-5">
                   <h3 className="text-lg font-bold text-gold border-b border-gold/30 pb-2">{group.year}</h3>
                   <ul className="space-y-2">
                     {group.names.map((name, idx) => (
                       <li key={idx} className="text-xs text-primary-foreground/80 flex items-center gap-2">
                         <div className="h-1 w-1 rounded-full bg-gold" />
                         {name}
                       </li>
                     ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-navy">Achievements & Milestones</h2>
              <p className="text-muted-foreground italic tracking-wide text-sm">(Academic Year 2023–2024)</p>
              <div className="divider-gold mx-auto" />
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {achievements.map((item, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`}
                  className="border rounded-2xl px-6 bg-card shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-left">
                       <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                         <Trophy className="h-5 w-5" />
                       </div>
                       <span className="font-bold text-navy group-hover:text-gold transition-colors">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <ul className="grid gap-3 pl-14">
                      {item.items.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                           <Medal className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                           {achievement}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MootAdvocacySociety;
