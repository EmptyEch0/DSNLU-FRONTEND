import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LibraryResourcesHeaderProps {
  activeTab: string;
}

const tabs = [
  { id: "print", label: "Print Resources", href: "/library/resources/print" },
  { id: "journals", label: "E-Journals", href: "/library/resources/journals" },
  { id: "books", label: "E-Books", href: "/library/resources/books" },
  { id: "databases", label: "E-Databases", href: "/library/resources/databases" },
];

export const LibraryResourcesHeader = ({ activeTab }: LibraryResourcesHeaderProps) => {
  return (
    <div className="bg-white border-b sticky top-[172px] z-[39] shadow-sm">
      <div className="container">
        <div className="flex flex-nowrap justify-center overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.href}
              className={cn(
                "relative px-6 md:px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300",
                activeTab === tab.id ? "text-blue-600" : "text-navy/60 hover:text-blue-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="resourceTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {activeTab !== tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 bg-blue-600/30 transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
