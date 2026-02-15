import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  FlaskConical, 
  Users, 
  PhoneCall,
  ChevronRight,
  Quote
} from "lucide-react";

interface LSCHeaderProps {
  activeTab: string;
}

const tabs = [
  { id: "about", label: "About LSC", href: "/students/legal-services-committee/about", icon: Building2 },
  { id: "activities", label: "Activities", href: "/students/legal-services-committee/activities", icon: FlaskConical },
  { id: "members", label: "Members", href: "/students/legal-services-committee/members", icon: Users },
  { id: "contact", label: "Contact", href: "/students/legal-services-committee/contact", icon: PhoneCall },
];

export const LSCHeader = ({ activeTab }: LSCHeaderProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-secondary/50">
        <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-gold">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Students</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Committees & Societies</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gold capitalize">Legal Services Committee</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-navy py-16 md:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl space-y-6 text-center lg:text-left">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block font-medium uppercase tracking-widest text-gold text-sm md:text-base border-b border-gold/30 pb-2"
              >
                Access to Justice for All
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl uppercase tracking-tight"
              >
                Legal Services Committee
              </motion.h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1.5 w-32 rounded-full bg-gold mx-auto lg:mx-0" 
              />
            </div>

            {/* Quote Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-sm mx-auto lg:mx-0"
            >
              <div className="absolute -top-4 -left-4 text-gold/30">
                <Quote className="h-12 w-12 fill-current" />
              </div>
              <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6 lg:p-8 italic">
                <p className="text-lg text-primary-foreground/90 font-serif leading-relaxed">
                  "First step towards the change is awareness"
                </p>
                <p className="mt-4 text-gold font-bold not-italic tracking-wider text-sm">
                  — Nathaniel Branden
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-[72px] z-40 border-b bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container">
          <div className="flex flex-nowrap justify-center overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors hover:text-gold whitespace-nowrap",
                  activeTab === tab.id ? "text-gold" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="lscTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
