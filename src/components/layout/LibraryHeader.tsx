import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Library,
  Info,
  BookOpen,
  ShieldCheck,
  Search,
  Wifi,
  ChevronRight
} from "lucide-react";

interface LibraryHeaderProps {
  activeTab: string;
}

const tabs = [
  { id: "info", label: "Library Info", href: "/library/info", icon: Info },
  { id: "about", label: "About Library", href: "/library/about", icon: Library },
  { id: "regulations", label: "Library Regulations", href: "/library/regulations", icon: BookOpen },
  { id: "turnitin", label: "Anti-Plagiarism Software (Turnitin)", href: "/library/turnitin", icon: ShieldCheck },
  { id: "opac", label: "OPAC", href: "/library/opac", icon: Search },
  { id: "knimbus", label: "Remote Access (Knimbus)", href: "/library/knimbus", icon: Wifi },
];

export const LibraryHeader = ({ activeTab }: LibraryHeaderProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-secondary/50">
        <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground font-sans">
          <Link to="/" className="transition-colors hover:text-gold uppercase font-bold tracking-tight">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground uppercase font-bold tracking-tight">Library</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold uppercase font-semibold">
            {tabs.find(t => t.id === activeTab)?.label || "Info"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-navy py-20 overflow-hidden text-white">
        {/* Blue Gradient Academic Banner with Bookshelf Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-[#223b6b] to-navy opacity-95" />
        <div 
          className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"
          aria-hidden="true"
        />
        
        <div className="container relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block font-sans font-semibold uppercase tracking-[0.2em] text-gold text-sm md:text-base"
          >
            Knowledge • Research • Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold md:text-5xl lg:text-7xl uppercase tracking-tight"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          >
            DSNLU Central Library
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 h-1 w-32 rounded-full bg-gold shadow-lg" 
          />
        </div>
      </section>

      {/* Sub-Navbar Navigation */}
      <div className="sticky top-[100px] z-[40] border-b bg-white shadow-md">
        <div className="container">
          <div className="flex flex-nowrap justify-center overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={cn(
                  "group relative flex items-center gap-2.5 px-6 md:px-8 py-5 text-xs md:text-[13px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                  activeTab === tab.id ? "text-blue-600" : "text-navy hover:text-blue-600"
                )}
              >
                <tab.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-blue-600" : "text-navy/40 group-hover:text-blue-600")} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="libraryTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Subtle hover effect for non-active tabs */}
                {activeTab !== tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 bg-blue-600/30 transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
