import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  FileText, 
  Download, 
  ExternalLink, 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  Gavel,
  History
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const policySections = [
  {
    title: "SC/ST Policy Guidelines",
    icon: <ShieldCheck className="h-6 w-6" />,
    content: "The university strictly follows the SC/ST reservation policies as mandated by the Government of India and the UGC. These guidelines cover admission quotas, staff recruitment, and student support services.",
    pdfs: [
      { name: "DSNLU SC/ST Policy Document", link: "#" },
      { name: "Roster Management Guidelines", link: "#" }
    ]
  },
  {
    title: "UGC Rules & Directives",
    icon: <BookOpen className="h-6 w-6" />,
    content: "UGC directives during the IX Plan period and subsequent amendments regarding the establishment and functioning of SC/ST cells in Higher Educational Institutions (HEIs).",
    pdfs: [
      { name: "UGC Directives for HEIs", link: "#" },
      { name: "Reservation Policy in Higher Education", link: "#" }
    ]
  },
  {
    title: "Anti-Ragging Regulations",
    icon: <Gavel className="h-6 w-6" />,
    content: "UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009. DSNLU enforces these regulations with zero tolerance.",
    pdfs: [
      { name: "UGC Anti-Ragging regulations 2009", link: "#" },
      { name: "Supreme Court Directives on Ragging", link: "#" }
    ]
  },
  {
    title: "Complaint Filing Guidelines",
    icon: <FileText className="h-6 w-6" />,
    content: "Step-by-step instructions for students and staff on how to file grievances related to discrimination, harassment, or administrative issues.",
    pdfs: [
      { name: "Grievance Redressal Procedure", link: "#" },
      { name: "Complaint Form Template (PDF)", link: "#" }
    ]
  },
  {
    title: "Relevant Government Acts",
    icon: <Scale className="h-6 w-6" />,
    content: "Key legislations including the Protection of Civil Rights Act (1955) and the SC/ST (Prevention of Atrocities) Act (1989).",
    pdfs: [
      { name: "The Protection of Civil Rights Act, 1955", link: "#" },
      { name: "SC/ST Prevention of Atrocities Act, 1989", link: "#" }
    ]
  }
];

const GrievanceRules = () => {
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
            <span>Grievance Redressal</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Rules & Regulations</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80')] bg-cover opacity-10 z-0" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
                Rules & <span className="text-gold">Regulations</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
              <p className="mt-6 text-white/60 font-medium max-w-2xl mx-auto italic">
                Statutory policies and guidelines governing grievance redressal and campus conduct at DSNLU.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4 border-b pb-6 border-slate-200">
                <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <History className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Statutory Framework</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-6">
                {policySections.map((section, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-2xl px-6 bg-white overflow-hidden shadow-elegant hover:border-gold/30 transition-all group"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-6 text-left">
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 ring-1 ring-navy/5">
                          {section.icon}
                        </div>
                        <span className="font-serif text-xl font-bold text-navy tracking-tight">{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2">
                       <div className="pl-14 lg:pl-18 space-y-6">
                          <p className="text-foreground/70 leading-relaxed font-medium">
                            {section.content}
                          </p>
                          <div className="grid sm:grid-cols-2 gap-4">
                             {section.pdfs.map((pdf, pIndex) => (
                               <a 
                                key={pIndex} 
                                href={pdf.link}
                                className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gold/40 bg-gold/5 group/pdf hover:bg-navy hover:text-white hover:border-navy transition-all duration-300"
                               >
                                 <div className="flex items-center gap-3">
                                   <FileText className="h-5 w-5 text-gold" />
                                   <span className="text-xs font-black uppercase tracking-tight">{pdf.name}</span>
                                 </div>
                                 <Download className="h-4 w-4 opacity-0 group-hover/pdf:opacity-100 transition-all group-hover/pdf:translate-y-0.5" />
                               </a>
                             ))}
                          </div>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* External Links */}
              <div className="bg-navy rounded-3xl p-10 text-white relative overflow-hidden group shadow-2xl mt-12">
                 <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                 <div className="relative space-y-6 text-center">
                    <h4 className="text-xl font-serif font-bold tracking-tight">External Links & Resources</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                       <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-gold hover:text-navy hover:border-gold font-bold">
                          UGC Portals <ExternalLink className="ml-2 h-4 w-4" />
                       </Button>
                       <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-gold hover:text-navy hover:border-gold font-bold">
                          Anti-Ragging Website <ExternalLink className="ml-2 h-4 w-4" />
                       </Button>
                       <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-gold hover:text-navy hover:border-gold font-bold">
                          Legal Services Portal <ExternalLink className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GrievanceRules;
