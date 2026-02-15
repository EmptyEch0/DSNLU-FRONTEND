import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ExamSidebar = () => {
  const location = useLocation();
  
  const sidebarLinks = [
    { label: "5 Year B.A. LL.B. (Hons.) Calendar", href: "https://dsnlu.ac.in/storage/2025/06/Academic-Calendar-5Year-BA-LLB-Hons-2025-26.pdf", isExternal: true },
    { label: "3 Year LL.B. Calendar", href: "https://dsnlu.ac.in/storage/2025/07/3-LL.B.-Academic-Calendar-2025-26.pdf", isExternal: true },
    { label: "One Year LL.M. Calendar", href: "https://dsnlu.ac.in/storage/2025/07/One-Year-LL.M.-Academic-Calendar-2025-26.pdf", isExternal: true },
    { label: "Examination Rules", href: "https://dsnlu.ac.in/storage/2023/01/2.EXAM-RULES-DSNLU-2018.pdf", isExternal: true },
    { label: "Examination Regulations", href: "https://dsnlu.ac.in/storage/2022/12/EXAMINATION-regulations-Final-1.pdf", isExternal: true },
    { label: "Examination Results", href: "/academics/examination-results", isExternal: false },
    { label: "Certificate Verification", href: "#verification", isExternal: false },
  ];

  return (
    <aside className="space-y-2">
      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <h3 className="mb-4 px-2 font-serif text-lg font-bold text-foreground border-b pb-2">Affairs & Examinations</h3>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  isActive 
                    ? "text-gold bg-gold/5" 
                    : "text-muted-foreground hover:text-gold hover:bg-gold/5"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeSidebar"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
