import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Users, 
  Scale, 
  FileText, 
  Mail,
  Phone,
  Copy,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Eye,
  Building2,
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Globe,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const committeeMembers = [
  { name: "Dr. A. Nageswara Rao", designation: "Chairperson", capacity: "Administration", contact: "+91 83418 71919" },
  { name: "Dr. N. Bhagya Lakshmi", designation: "Member", capacity: "Faculty", contact: "-" },
  { name: "Dr. Rifat Khan", designation: "Member", capacity: "Faculty", contact: "-" },
  { name: "Dr. R. Deepthi", designation: "Member", capacity: "Faculty", contact: "-" },
  { name: "Ms. Sherley Hepsiba Dokiburra", designation: "Member", capacity: "Faculty", contact: "-" },
  { name: "Ms. D. Aparna", designation: "Member", capacity: "Staff", contact: "-" },
  { name: "Dr. Viswachandra Nath. M", designation: "Secretary", capacity: "Faculty", contact: "+91 91107 73504" },
];

const sections = [
  { id: "about-cell", label: "About Cell" },
  { id: "committee", label: "Committee" },
  { id: "activities", label: "Activities" },
  { id: "safeguards", label: "Safeguards" },
  { id: "grievance", label: "Grievance & Contact" },
];

const SCSTCell = () => {
  const [activeSection, setActiveSection] = useState("about-cell");
  const [activeTab, setActiveTab] = useState("constitutional");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Adjusted for better accuracy
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

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
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">SC / ST Cell</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/90 opacity-95" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
          
          {/* Subtle animated pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212, 160, 23, 0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div className="container relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-6 group cursor-default">
                  <ShieldCheck className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-gold uppercase tracking-[0.2em]">Student Welfare</span>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  SC / ST <span className="text-gold">Welfare Cell</span>
                </h1>
                <p className="mt-6 text-xl sm:text-2xl text-white/80 font-medium italic border-l-4 border-gold pl-6 py-2">
                  "Committed to Equality, Dignity & Social Justice"
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Sticky Section Navigation */}
        <div className="sticky top-[72px] z-40 w-full bg-navy border-y border-white/10 shadow-lg overflow-x-auto no-scrollbar">
          <div className="container flex justify-start lg:justify-center items-center h-16 sm:h-20 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "px-6 h-full flex flex-col items-center justify-center relative transition-all duration-300 group whitespace-nowrap",
                  activeSection === section.id ? "text-gold" : "text-white/60 hover:text-white"
                )}
              >
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-1 bg-gold"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 1. ABOUT CELL */}
        <section id="about-cell" className="py-20 lg:py-32 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy uppercase tracking-wider relative inline-block">
                    Introduction
                    <span className="absolute -bottom-2 left-0 w-2/3 h-1 bg-gold rounded-full" />
                  </h2>
                  <div className="pt-6 space-y-6 text-lg text-foreground/80 leading-relaxed text-justify">
                    <p>
                      In accordance with the directives of the UGC during the IX Plan period, the Scheduled Caste (SC) and Scheduled Tribe (ST) Cell was established to oversee the effective implementation of reservation policies in Universities.
                    </p>
                    <p>
                      The <span className="font-bold text-navy">Damodaram Sanjivayya National Law University (DSNLU)</span> established its SC/ST Cell in <span className="text-gold font-bold">2025</span> under the proactive leadership of its Vice-Chancellor, <span className="font-bold text-navy">Prof. (Dr.) D. Surya Prakasa Rao</span>.
                    </p>
                    <p>
                      The Primary Focus of the Cell is to ensure the welfare of students and staff belonging to the Scheduled Castes and Scheduled Tribes. It continuously monitors the implementation of reservation policies in admissions, hostels, and recruitment of teaching and non-teaching staff, besides maintaining rosters for all categories.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-secondary/30 border border-gold/10 hover:border-gold/30 transition-all duration-300 group">
                    <div className="h-10 w-10 text-gold mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-navy mb-2">Admissions</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Ensuring fair representation in all academic programs through monitored admission processes.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-secondary/30 border border-gold/10 hover:border-gold/30 transition-all duration-300 group">
                    <div className="h-10 w-10 text-gold mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-navy mb-2">Recruitment</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Monitoring and maintaining rosters for teaching and non-teaching staff recruitment.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-navy rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                  <div className="relative bg-white border-2 border-navy rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gold flex items-center justify-center text-navy ring-4 ring-gold/10">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-navy uppercase">Vision</h3>
                      </div>
                      <p className="text-xl text-navy font-serif leading-relaxed italic text-justify">
                        "To build a people-centered, ecologically sustainable society that upholds dignity, equality, social justice and human rights for all, with special emphasis on marginalized and vulnerable groups."
                      </p>
                    </div>

                    <div className="h-px w-full bg-navy/10" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-navy flex items-center justify-center text-white ring-4 ring-navy/10">
                          <Users className="h-4 w-4" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-navy uppercase">Mission</h3>
                      </div>
                      <p className="text-lg text-foreground/70 leading-relaxed text-justify">
                        To empower students from marginalized communities through structured support systems, monitoring policy implementation, and fostering an inclusive academic environment that promotes excellence and social equity.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. COMMITTEE SECTION */}
        <section id="committee" className="py-20 bg-secondary/30 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container"
          >
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy uppercase tracking-wider">
                Committee <span className="text-gold">Members</span>
              </h2>
              <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
              <p className="text-muted-foreground font-medium">
                The committed team of DSNLU Faculty and Staff leading the SC / ST Welfare Cell.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {committeeMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-500 border-none bg-white overflow-hidden rounded-2xl">
                    <div className="h-2 w-full bg-gradient-to-r from-navy via-navy/80 to-navy/60 group-hover:from-gold group-hover:to-gold/80 transition-all duration-500" />
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 ring-4 ring-secondary group-hover:ring-gold/20">
                        <Users className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-navy text-[17px] leading-tight group-hover:text-gold transition-colors">{member.name}</h3>
                        <p className="text-gold font-bold text-sm">{member.designation}</p>
                      </div>
                      <div className="pt-2 w-full space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider pb-2 border-b border-secondary">
                          <span>Capacity</span>
                          <span className="text-navy">{member.capacity}</span>
                        </div>
                        {member.contact !== "-" && (
                          <div className="flex items-center justify-center gap-2 text-primary font-bold group-hover:scale-105 transition-transform duration-300">
                             <Phone className="h-3.5 w-3.5" />
                             <span className="text-[13px]">{member.contact}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. ACTIVITIES SECTION */}
        <section id="activities" className="py-20 lg:py-32 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy uppercase tracking-wider">
                    Cell <span className="text-gold">Activities</span>
                  </h2>
                  <div className="h-1 w-24 bg-gold rounded-full" />
                  <p className="text-lg text-muted-foreground leading-relaxed pt-4">
                    The SC/ST Cell actively works towards the holistic development and support of students through various initiatives.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Core Activities</h4>
                  <div className="grid gap-3">
                    {[
                      "Awareness creation among the stakeholders",
                      "Information dissemination on Scholarships/Government Schemes",
                      "Coordination in Admission / Reservation implementation",
                      "Hostel support and accommodation assistance",
                      "Monitoring of Reservation policies"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border-l-4 border-navy group hover:bg-navy hover:text-white transition-all duration-300">
                        <CheckCircle2 className="h-5 w-5 text-gold" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="monitoring" className="border rounded-2xl px-6 bg-white overflow-hidden hover:border-gold/30 transition-all shadow-sm">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy">
                          <Eye className="h-5 w-5" />
                        </div>
                        <span className="font-serif text-xl font-bold text-navy uppercase tracking-tight">Monitoring Activities</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 space-y-4">
                      <ul className="grid gap-4 pl-14">
                        {[
                          "Awareness about scholarship schemes and financial aid.",
                          "Assisting in grievance redressal related to SC/ST affairs.",
                          "Guidance and counseling for research scholars.",
                          "Liaising with government departments for scheme implementation.",
                          "Advisory role in recruitment and promotional matters.",
                          "Facilitating Book Bank management in library for SC/ST students."
                        ].map((li, i) => (
                          <li key={i} className="text-foreground/70 flex gap-2 font-medium">
                            <span className="text-gold font-bold text-lg">•</span> {li}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="special" className="border rounded-2xl px-6 bg-white overflow-hidden hover:border-gold/30 transition-all shadow-sm">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-secondary flex items-center justify-center text-navy">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="font-serif text-xl font-bold text-navy uppercase tracking-tight">Special Activities</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8">
                       <div className="grid sm:grid-cols-2 gap-4 pl-14 pr-4">
                          {[
                            { icon: <Briefcase className="h-4 w-4" />, text: "Soft skills training & workshops" },
                            { icon: <Scale className="h-4 w-4" />, text: "Judicial services coaching" },
                            { icon: <Users className="h-4 w-4" />, text: "Mentorship programs" },
                            { icon: <FileText className="h-4 w-4" />, text: "Legal research opportunities" },
                            { icon: <Globe className="h-4 w-4" />, text: "Internship & placement support" },
                            { icon: <Info className="h-4 w-4" />, text: "Special seminars on legislation" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 text-navy font-bold text-xs uppercase tracking-wider group hover:bg-gold hover:text-navy transition-all duration-300">
                               <span className="text-navy group-hover:scale-110 transition-transform">{item.icon}</span>
                               {item.text}
                            </div>
                          ))}
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 4. SAFEGUARDS SECTION */}
        <section id="safeguards" className="py-20 lg:py-32 bg-navy relative overflow-hidden scroll-mt-20">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent opacity-100" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-fixed opacity-5 grayscale" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container relative z-10"
          >
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">
                Constitutional <span className="text-gold">Safeguards & Legislation</span>
              </h2>
              <div className="h-1 w-32 bg-gold mx-auto rounded-full" />
            </div>

            <Tabs defaultValue="constitutional" className="w-full max-w-5xl mx-auto" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-12">
                <TabsList className="bg-white/10 border border-white/20 h-16 p-2 rounded-2xl">
                  <TabsTrigger 
                    value="constitutional" 
                    className="rounded-xl px-12 h-12 data-[state=active]:bg-gold data-[state=active]:text-navy text-white/70 font-bold uppercase tracking-widest transition-all"
                  >
                    Constitutional Safeguards
                  </TabsTrigger>
                  <TabsTrigger 
                    value="legislation" 
                    className="rounded-xl px-12 h-12 data-[state=active]:bg-gold data-[state=active]:text-navy text-white/70 font-bold uppercase tracking-widest transition-all"
                  >
                    Legislation
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <TabsContent value="constitutional" className="mt-0 focus-visible:outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {[
                      { art: "Article 14", text: "Equality before law and equal protection of laws." },
                      { art: "Article 15", text: "Prohibition of discrimination on grounds of caste, race, etc." },
                      { art: "Article 16", text: "Equality of opportunity in matters of public employment." },
                      { art: "Article 17", text: "Abolition of Untouchability and its practice in any form." },
                      { art: "Article 46", text: "Promotion of educational and economic interests of SCs and STs." },
                      { art: "Articles 330-342", text: "Special provisions for reservation and commissions." }
                    ].map((item, i) => (
                      <div key={i} className="p-8 rounded-2xl bg-white/5 shadow-2xl border border-white/10 hover:border-gold/50 transition-all duration-300 group">
                        <div className="h-12 w-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                          <Scale className="h-6 w-6" />
                        </div>
                        <h4 className="text-gold font-bold text-xl mb-3">{item.art}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                    <div className="p-8 rounded-2xl bg-gold shadow-2xl flex flex-col justify-center items-center text-center space-y-2 group md:col-span-2 lg:col-span-1">
                       <h4 className="text-navy font-black text-4xl">15% & 7.5%</h4>
                       <p className="text-navy/80 font-bold uppercase tracking-wider text-sm">Reservation Percentages for SC/ST</p>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="legislation" className="mt-0 focus-visible:outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold">
                             <FileText className="h-8 w-8" />
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-white">Major Acts</h3>
                       </div>
                       <ul className="space-y-6">
                          {[
                            "Protection of Civil Rights Act, 1955",
                            "SC/ST (Prevention of Atrocities) Act, 1989",
                            "SC/ST (Prevention of Atrocities) Rules, 1995"
                          ].map((act, i) => (
                            <li key={i} className="flex gap-4 items-start group">
                               <div className="h-6 w-6 rounded-full bg-gold shrink-0 flex items-center justify-center text-navy font-bold text-xs">
                                 {i + 1}
                               </div>
                               <span className="text-white/80 font-bold text-lg group-hover:text-gold transition-colors">{act}</span>
                            </li>
                          ))}
                       </ul>
                    </div>

                    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-navy-light flex items-center justify-center text-gold border border-gold/20">
                             <Globe className="h-8 w-8" />
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-white">Commissions</h3>
                       </div>
                       <div className="space-y-6">
                          <p className="text-white/60 text-lg leading-relaxed italic border-l-2 border-gold/30 pl-6">
                            "Through the 65th Constitutional Amendment, the National Commission for SCs and STs was established to investigate and monitor all matters relating to the safeguards provided for them."
                          </p>
                          <div className="flex flex-wrap gap-4 pt-4">
                             <div className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/70 uppercase tracking-widest">
                                NCSC
                             </div>
                             <div className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/70 uppercase tracking-widest">
                                NCST
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="grievance" className="py-20 lg:py-32 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container"
          >
            <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border bg-white flex flex-col lg:flex-row">
              <div className="lg:w-2/5 bg-navy p-12 lg:p-16 flex flex-col justify-between text-white relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
                 <div className="relative space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-serif text-4xl font-bold uppercase tracking-tight">Contact <span className="text-gold">Us</span></h2>
                      <p className="text-white/60 font-medium">Have queries or need assistance? Reach out to the SC / ST Welfare Cell.</p>
                    </div>
                    
                    <div className="space-y-10 pt-8">
                      <div className="flex gap-6 group">
                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                           <Mail className="h-6 w-6 text-gold group-hover:text-navy" />
                        </div>
                        <div className="space-y-1 flex-1">
                           <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Email Address</p>
                           <a href="mailto:sc-st-grievancecell@dsnlu.ac.in" className="text-lg font-bold hover:text-gold transition-colors break-all">sc-st-grievancecell@dsnlu.ac.in</a>
                           <button 
                            onClick={() => copyToClipboard("sc-st-grievancecell@dsnlu.ac.in")}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider hover:opacity-80 mt-1"
                           >
                             <Copy className="h-3 w-3" /> Copy Email
                           </button>
                        </div>
                      </div>

                      <div className="flex gap-6 group">
                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                           <Building2 className="h-6 w-6 text-gold group-hover:text-navy" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Mailing Address</p>
                           <p className="font-medium text-white/90 leading-relaxed text-lg">
                             Damodaram Sanjivayya National Law University, <br />
                             NYAYPRASTHA, Sabbavaram, <br />
                             Visakhapatnam – 531 035
                           </p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="lg:w-3/5 p-12 lg:p-16 bg-white space-y-12">
                 <div className="grid sm:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <div className="h-px w-12 bg-gold" />
                       <div className="space-y-2">
                          <h4 className="text-navy font-black text-2xl">Chairperson</h4>
                          <p className="text-gold font-bold uppercase tracking-wider text-sm">Dr. A. Nageswara Rao</p>
                       </div>
                       <div className="space-y-4 pt-2">
                          <a href="tel:+918341871919" className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-navy/5 text-navy font-bold hover:bg-navy hover:text-white transition-all duration-300">
                             <Phone className="h-5 w-5 text-gold" />
                             +91 83418 71919
                          </a>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="h-px w-12 bg-gold" />
                       <div className="space-y-2">
                          <h4 className="text-navy font-black text-2xl">Secretary</h4>
                          <p className="text-gold font-bold uppercase tracking-wider text-sm">Dr. Viswachandra Nath. M</p>
                       </div>
                       <div className="space-y-4 pt-2">
                          <a href="tel:+919110773504" className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-navy/5 text-navy font-bold hover:bg-navy hover:text-white transition-all duration-300">
                             <Phone className="h-5 w-5 text-gold" />
                             +91 91107 73504
                          </a>
                       </div>
                    </div>
                 </div>

                 <div className="rounded-3xl bg-secondary/30 p-8 flex items-start gap-6 border-l-8 border-gold">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-navy flex items-center justify-center text-white">
                       <Info className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                       <h5 className="font-bold text-navy uppercase tracking-wider text-sm">Important Note</h5>
                       <p className="text-muted-foreground text-sm leading-relaxed">
                          Students are encouraged to approach the Cell for any grievances, scholarship assistance, or academic guidance. Transparency and confidentiality are maintained for all reports.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SCSTCell;
