import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Trophy, 
  Users, 
  PhoneCall,
  ChevronRight,
  Activity
} from "lucide-react";

interface SportsHeaderProps {
  activeTab: string;
}

const tabs = [
  { id: "about", label: "About Committee", href: "/students/sports-committee/about", icon: Building2 },
  { id: "activities", label: "Activities", href: "/students/sports-committee/activities", icon: Activity },
  { id: "members", label: "Members", href: "/students/sports-committee/members", icon: Users },
  { id: "achievements", label: "Achievements", href: "/students/sports-committee/achievements", icon: Trophy },
  { id: "contact", label: "Contact", href: "/students/sports-committee/contact", icon: PhoneCall },
];

export const SportsHeader = ({ activeTab }: SportsHeaderProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-secondary/50">
        <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="transition-colors hover:text-gold shrink-0">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="shrink-0">Students</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="shrink-0">Committees & Societies</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium text-gold capitalize shrink-0">Sports Committee</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-navy py-20 overflow-hidden text-white group">
        {/* Subtle Sports Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        
        <div className="container relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm md:text-base"
          >
            Promoting Excellence Beyond Classrooms
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl uppercase tracking-wider"
          >
            Sports Committee
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
          />
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
                  "relative flex items-center gap-2 px-6 py-5 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors hover:text-gold whitespace-nowrap",
                  activeTab === tab.id ? "text-gold" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="sportsTabUnderline"
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
