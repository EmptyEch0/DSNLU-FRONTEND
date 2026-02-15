import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Download, 
  AlertTriangle, 
  ShieldAlert, 
  Wifi, 
  Users, 
  Scale, 
  FileText, 
  History,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "preamble", label: "Preamble" },
  { id: "applicability", label: "Applicability" },
  { id: "responsibilities", label: "Responsibilities of Students" },
  { id: "definitions", label: "Definitions" },
  { id: "ragging", label: "Ragging & Prohibition" },
  { id: "sexual-harassment", label: "Sexual Harassment" },
  { id: "hostel", label: "Hostel & Conduct" },
  { id: "electronic-media", label: "Electronic & Media Use" },
  { id: "disciplinary", label: "Disciplinary Process" },
  { id: "student-council", label: "Student Council" },
  { id: "punishments", label: "Punishments & Penalties" },
  { id: "revision", label: "Revision of Code" },
];

const StudentCodeOfConduct = () => {
  const [activeSection, setActiveSection] = useState("preamble");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -70% 0%",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Student Code of Conduct</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/90 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="text-left">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-serif text-4xl font-bold text-gold md:text-5xl lg:text-6xl uppercase tracking-wider"
                >
                  Student Code of Conduct
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-lg text-white/80 italic font-medium"
                >
                  Damodaram Sanjivayya National Law University
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy rounded-xl font-bold flex items-center gap-2 h-12 px-6">
                  <Download className="h-4 w-4" />
                  Download Code of Conduct (PDF)
                </Button>
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

        <section className="py-12 lg:py-20">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12 relative">
              
              {/* Sticky Sidebar (Desktop) */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28 space-y-1">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6 px-4">Navigation</h4>
                  <nav className="flex flex-col border-l-2 border-border/50">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative py-3 px-4 text-left text-sm font-semibold transition-all duration-300 border-l-2 -ml-[2px]",
                          activeSection === section.id 
                            ? "text-gold border-gold bg-gold/5" 
                            : "text-muted-foreground border-transparent hover:text-navy hover:border-gold/30 hover:bg-secondary/50"
                        )}
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Mobile Navigation Accordion */}
              <div className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b -mx-4 px-4 py-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-secondary/50 text-navy font-bold"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gold" />
                    {sections.find(s => s.id === activeSection)?.label || "Select Section"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="absolute top-full left-0 right-0 bg-background border-b shadow-xl overflow-y-auto max-h-[60vh] z-40"
                    >
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full p-4 text-left text-sm font-medium border-b last:border-0",
                            activeSection === section.id ? "text-gold bg-gold/5" : "text-foreground"
                          )}
                        >
                          {section.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Panel */}
              <div className="flex-1 max-w-4xl space-y-24 pb-32">
                
                {/* Preamble */}
                <ContentSection id="preamble" title="Preamble">
                  <div className="border-l-4 border-gold/20 pl-8">
                    <p className="text-xl text-foreground font-serif leading-[1.8] text-justify">
                      The Student Code of Conduct (the Code) of Damodaram Sanjivayya National Law University, Visakhapatnam, 
                      is established to maintain a learning environment that is conducive to the growth, safety, 
                      and holistic development of its students. As an elite institution of legal education, 
                      DSNLU expects its students to uphold the highest standards of integrity, ethics, 
                      and respect for the rule of law. This Code outlines the rights and responsibilities of 
                      students, providing a framework for conduct that reflects the values of the University 
                      and the legal profession.
                    </p>
                  </div>
                </ContentSection>

                {/* Applicability */}
                <ContentSection id="applicability" title="Applicability">
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground font-medium">
                      The Code applies to all persons in the University who are pursuing any studies or researchers or 
                      enrolled in any of the programs of the University.
                    </p>
                    <ul className="grid gap-4">
                      <ChecklistItem text="Academic course requirements and degree-related activities" />
                      <ChecklistItem text="University sponsored activities and events (On or Off campus)" />
                      <ChecklistItem text="Conduct involving property destruction or safety risk to University community" />
                      <ChecklistItem text="Situations resulting in a police report or criminal investigation" />
                    </ul>
                    <div className="inline-block px-4 py-2 bg-secondary/80 rounded-lg text-sm font-bold text-navy border border-gold/20">
                      Note: This Code applies to conduct occurring after 6 July 2015.
                    </div>
                  </div>
                </ContentSection>

                {/* Responsibilities */}
                <ContentSection id="responsibilities" title="Responsibilities of Students">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ResponsibilityCard icon={<Scale />} title="Academic Honesty" text="Maintenance of highest levels of academic integrity in all submissions and exams." />
                    <ResponsibilityCard icon={<Users />} title="Respect for Rights" text="Respecting the professional and personal rights of faculty, staff, and peers." />
                    <ResponsibilityCard icon={<ShieldAlert />} title="Non-discrimination" text="Upholding a campus culture free from prejudice based on caste, religion, or gender." />
                    <ResponsibilityCard icon={<History />} title="Constitutional Values" text="Adherence to the values enshrined in the Constitution of India." />
                  </div>
                </ContentSection>

                {/* Definitions */}
                <ContentSection id="definitions" title="Definitions">
                  <div className="space-y-2">
                    <p className="text-muted-foreground mb-8 text-lg italic">Click on terms below to view detailed legal definitions.</p>
                    <div className="rounded-2xl border overflow-hidden">
                      <DefinitionsAccordion title="Academic Misconduct" content="Any action or attempted action that may result in creating an unfair academic advantage for oneself or an unfair academic advantage or disadvantage for any other member or members of the University community." />
                      <DefinitionsAccordion title="Cheating" content="Using unauthorized materials, information, or study aids in any academic exercise; or failing to follow the rules of any academic exercise." />
                      <DefinitionsAccordion title="Plagiarism" content="The practice of taking someone else's work or ideas and passing them off as one's own without proper attribution, whether intentional or unintentional." />
                      <DefinitionsAccordion title="Harassment" content="Any unwelcome conduct that is offensive, humiliating, or intimidating to another person and interferes with their education or employment." />
                      <DefinitionsAccordion title="Officers of the University" content="Includes the Vice-Chancellor, Registrar, Finance Officer, and other administrative staff designated by the University statutes." />
                      <DefinitionsAccordion title="University Premises" content="Buildings or grounds owned, leased, operated, controlled, or supervised by the University, including digital networks and platforms." />
                    </div>
                  </div>
                </ContentSection>

                {/* Ragging */}
                <ContentSection id="ragging" title="Ragging & Prohibition">
                  <div className="rounded-3xl border-2 border-dashed border-red-200 bg-red-50/30 p-8 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg overflow-hidden animate-pulse">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-red-700 uppercase tracking-tight">Ragging is Strictly Prohibited</h3>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <p className="font-bold text-navy flex items-center gap-2">
                          <Scale className="h-4 w-4 text-gold" /> Statutory Regulations:
                        </p>
                        <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                          <li>• UGC Regulations on Curbing Ragging, 2009</li>
                          <li>• Andhra Pradesh Prohibition of Ragging Act, 1997</li>
                          <li>• Directions of the Hon'ble Supreme Court of India</li>
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-white/50 border border-red-100 p-6">
                        <p className="font-bold text-red-800 mb-3 flex items-center gap-2 italic">
                          <ShieldAlert className="h-4 w-4" /> Penalties include:
                        </p>
                        <ul className="space-y-2 text-sm font-bold text-red-700">
                          <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-4 w-4 text-red-600" /> Expulsion from University</li>
                          <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-4 w-4 text-red-600" /> Fine up to ₹10,000</li>
                          <li className="flex items-center gap-2 text-navy"><CheckCircle2 className="h-4 w-4 text-red-600" /> Suspension from Classes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* Sexual Harassment */}
                <ContentSection id="sexual-harassment" title="Prevention of Sexual Harassment">
                  <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/30 p-8">
                    <div className="flex gap-6 flex-col md:flex-row">
                      <div className="h-16 w-16 shrink-0 rounded-2xl bg-purple-600 flex items-center justify-center text-white">
                        <Scale className="h-8 w-8" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-lg text-purple-900 font-medium leading-relaxed">
                          DSNLU is committed to maintaining a safe environment. All forms of sexual harassment are strictly prohibited 
                          under the <span className="font-bold border-b border-purple-300">Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</span>.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="px-4 py-2 bg-purple-100 rounded-lg text-xs font-bold text-purple-700 border border-purple-200 uppercase tracking-wider">
                            Sexual Harassment Redressal Committee
                          </div>
                          <div className="px-4 py-2 bg-purple-100 rounded-lg text-xs font-bold text-purple-700 border border-purple-200 uppercase tracking-wider">
                            Zero Tolerance Policy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* Prohibitions */}
                <div className="grid gap-6 md:grid-cols-3">
                   <div className="md:col-span-3">
                     <h3 className="text-xl font-bold text-navy mb-6">General Prohibitions</h3>
                   </div>
                   <ProhibitionTile icon={<AlertTriangle />} title="Tobacco Free" text="DSNLU is a strictly non-smoking campus. Tobacco use is banned." color="neutral" />
                   <ProhibitionTile icon={<AlertTriangle />} title="No Alcohol" text="Possession or consumption of alcohol on campus is a major offence." color="neutral" />
                   <ProhibitionTile icon={<AlertTriangle />} title="No Narcotics" text="Possession or distribution of banned drugs leads to criminal prosecution." color="neutral" />
                </div>

                {/* Hostel */}
                <ContentSection id="hostel" title="Hostel & Residential Conduct">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-bold text-navy text-lg">Key Regulations</h4>
                      <ul className="space-y-4">
                        <HostelRule title="Curfew Timing" text="All students must return to their respective hostels by 9:00 PM." />
                        <HostelRule title="Restricted Access" text="Male students are prohibited in Girls' Hostels and vice versa at all times." />
                        <HostelRule title="Leave Policy" text="Official leave permission is mandatory for staying outside the hostel overnight." />
                      </ul>
                    </div>
                    <div className="bg-secondary/30 rounded-3xl p-8 border border-border/50">
                      <Info className="h-8 w-8 text-gold mb-4" />
                      <p className="text-foreground leading-relaxed font-medium italic">
                        "The hostel is an extension of the academic environment. Conduct reflecting the dignity of the profession is expected from every resident."
                      </p>
                    </div>
                  </div>
                </ContentSection>

                {/* Disciplinary Process */}
                <ContentSection id="disciplinary" title="Disciplinary Process">
                  <div className="relative mt-12 pl-12 space-y-12 before:content-[''] before:absolute before:left-[1.35rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-gold before:to-gold/10">
                    <TimelineItem step="1" title="Complaint" text="Initial report of misconduct filed by any member of the community." />
                    <TimelineItem step="2" title="Committee Referral" text="The Vice-Chancellor refers the matter to the Disciplinary Committee." />
                    <TimelineItem step="3" title="Review & Hearing" text="A confidential review and opportunity for the student to respond." />
                    <TimelineItem step="4" title="Final Decision" text="Committee submits recommendations for the Vice-Chancellor's approval." />
                    <TimelineItem step="5" title="Review Petition" text="A provision for review of the decision under specified grounds." />
                  </div>
                </ContentSection>

                {/* Punishments */}
                <ContentSection id="punishments" title="Punishments & Penalties">
                  <div className="rounded-3xl border bg-card overflow-hidden shadow-elegant">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-navy text-white font-serif">
                          <th className="px-8 py-5 font-bold uppercase tracking-wider text-sm">Penalty Type</th>
                          <th className="px-8 py-5 font-bold uppercase tracking-wider text-sm">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-foreground">
                        <PenaltyRow type="Warning" desc="A written reprimand placed in the student's personal record." />
                        <PenaltyRow type="Suspension" desc="Temporary removal from classes or University services for a fixed period." color="bg-red-50" />
                        <PenaltyRow type="Monetary Fine" desc="Penalty payment depending on the severity of the offence." />
                        <PenaltyRow type="Restitution" desc="Compensation for loss, damage, or injury to University property." />
                        <PenaltyRow type="Rustication" desc="Permanent dismissal from the University, resulting in loss of admission." color="bg-red-50" />
                      </tbody>
                    </table>
                  </div>
                </ContentSection>

                {/* Revision */}
                <ContentSection id="revision" title="Revision of Code">
                  <div className="bg-navy rounded-3xl p-10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150" />
                    <History className="h-10 w-10 text-gold mx-auto mb-6" />
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">Periodic Review</h3>
                    <p className="text-white/70 max-w-2xl mx-auto leading-relaxed text-lg">
                      The Code shall be reviewed periodically by the Academic Council to ensure consistency with 
                      national regulations, judicial pronouncements, and international best practices in legal education.
                    </p>
                  </div>
                </ContentSection>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// --- Sub-components ---

const ContentSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="scroll-mt-32"
  >
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">{title}</h2>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold/10 to-transparent mb-4" />
      <div>{children}</div>
    </div>
  </motion.section>
);

const ChecklistItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-foreground font-medium group">
    <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-colors shrink-0">
      <CheckCircle2 className="h-3.5 w-3.5" />
    </div>
    <span>{text}</span>
  </li>
);

const ResponsibilityCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="p-6 rounded-2xl border bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-gold/20 hover:border-l-gold">
    <div className="h-10 w-10 text-gold mb-4">{icon}</div>
    <h4 className="font-bold text-navy mb-2">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const DefinitionsAccordion = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left hover:bg-secondary/20 transition-colors"
      >
        <span className="font-bold text-foreground">{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm bg-secondary/10">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProhibitionTile = ({ icon, title, text, color }: { icon: React.ReactNode; title: string; text: string; color: string }) => (
  <div className="p-6 rounded-2xl border bg-card shadow-sm text-center space-y-3 group hover:border-gold/30 transition-all">
    <div className="h-12 w-12 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground mx-auto group-hover:text-gold transition-colors">
      {icon}
    </div>
    <h5 className="font-bold text-navy">{title}</h5>
    <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const HostelRule = ({ title, text }: { title: string; text: string }) => (
  <div className="space-y-1">
    <p className="font-bold text-navy text-sm">• {title}</p>
    <p className="text-sm text-muted-foreground pl-3 border-l-2 border-gold/10">{text}</p>
  </div>
);

const TimelineItem = ({ step, title, text }: { step: string; title: string; text: string }) => (
  <div className="relative">
    <div className="absolute -left-12 top-0 h-8 w-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center border-4 border-background z-10">
      {step}
    </div>
    <div>
      <h4 className="font-bold text-navy mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  </div>
);

const PenaltyRow = ({ type, desc, color = "" }: { type: string; desc: string; color?: string }) => (
  <tr className={cn("hover:bg-gold/5 transition-colors group", color)}>
    <td className="px-8 py-5 font-bold text-navy text-sm border-r border-border/30">{type}</td>
    <td className="px-8 py-5 text-sm font-medium text-foreground">{desc}</td>
  </tr>
);

export default StudentCodeOfConduct;
