import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookMarked, 
  Newspaper, 
  ChevronRight,
  Landmark,
  GraduationCap
} from "lucide-react";

interface PublicationsHeaderProps {
  activeTab: "overview" | "books" | "waves";
}

const tabs = [
  { id: "overview", label: "Overview", href: "/academics/publications/overview", icon: BookMarked },
  { id: "books", label: "Books & Scholarly Publications", href: "/academics/publications/books", icon: BookMarked },
  { id: "waves", label: "WAVES Newsletter", href: "/academics/publications/waves", icon: Newspaper },
];

export const PublicationsHeader = ({ activeTab }: PublicationsHeaderProps) => {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b bg-[#f8f9fa]">
        <div className="container flex items-center gap-2 py-4 text-[11px] text-gray-500 font-sans tracking-tight">
          <Link to="/" className="transition-colors hover:text-[#0f2d5c] uppercase font-bold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="uppercase font-bold">Academics</span>
          <ChevronRight className="h-3 w-3" />
          <span className="uppercase font-bold text-[#0f2d5c]">Publications</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold uppercase font-bold">
            {activeTab === "books" ? "Books & Scholarly Publications" : "WAVES Newsletter"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#0f2d5c] py-20 overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d5c] via-[#1a3d7c] to-[#0f2d5c] opacity-90" />
        <div 
          className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"
          aria-hidden="true"
        />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <GraduationCap className="h-5 w-5 text-[#c9a227]" />
            <span className="font-sans font-semibold uppercase tracking-[0.2em] text-[#c9a227] text-xs md:text-sm">
              Academic Scholarship • Research • Knowledge
            </span>
            <Landmark className="h-5 w-5 text-[#c9a227]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold md:text-5xl lg:text-7xl uppercase tracking-tight"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            DSNLU Publications
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 h-1 w-32 rounded-full bg-[#c9a227] shadow-lg" 
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
                  "group relative flex items-center gap-2.5 px-6 md:px-10 py-5 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                  activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-500 hover:text-[#0f2d5c]"
                )}
              >
                <tab.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-400 group-hover:text-[#0f2d5c]")} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="pubTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c9a227]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeTab !== tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 bg-[#c9a227]/30 transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
