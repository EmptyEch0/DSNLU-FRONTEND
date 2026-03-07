import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Users, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Scale,
  Download
} from "lucide-react";

interface ICCHeaderProps {
  activeTab: string;
}

const tabs = [
  { id: "about", label: "About ICC", href: "/students/icc/about", icon: ShieldCheck },
  { id: "members", label: "Committee Members", href: "/students/icc/members", icon: Users },
  { id: "rules", label: "Rules", href: "/students/icc/rules", icon: Scale },
  { id: "statutory", label: "Statutory Committees", href: "/students/cells-committees/statutory", icon: Building2 },
];

export const ICCHeader = ({ activeTab }: ICCHeaderProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-secondary/50">
        <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-gold">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Students</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">ICC</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">
            {activeTab === "about" && "About ICC"}
            {activeTab === "members" && "Members"}
            {activeTab === "rules" && "Rules"}
            {activeTab === "statutory" && "Statutory Committees"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-navy py-20 overflow-hidden text-white">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="container relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl uppercase tracking-wider"
          >
            Internal Complaints <span className="text-gold">Committee</span>
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
      <div className="sticky top-[72px] z-40 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container">
          <div className="flex flex-nowrap justify-center overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 md:px-6 py-5 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors hover:text-gold whitespace-nowrap",
                  activeTab === tab.id ? "text-gold" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderlineICC"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
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
