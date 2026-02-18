import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, utilityLinks } from "./header/navData";
import { MegaMenu } from "./header/MegaMenu";
import { MobileMenu } from "./header/MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top Utility Bar (Blue Strip) */}
      <div className="bg-primary text-primary-foreground border-b border-white/10">
        <div className="container flex items-center justify-between py-1.5 text-[12px] sm:text-[13px]">
          {/* Left: Contact Info */}
          <div className="hidden items-center gap-6 md:flex">
            <a href="tel:+918924248216" className="flex items-center gap-2 transition-colors hover:text-gold">
              <Phone className="h-3 w-3" />
              <span>+91 8924 248216</span>
            </a>
            <a href="mailto:dsnluvsp@gmail.com" className="flex items-center gap-2 transition-colors hover:text-gold">
              <Mail className="h-3 w-3" />
              <span>dsnluvsp@gmail.com</span>
            </a>
          </div>

          {/* Right: Utility Links & Search */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-6">
            <a href="mailto:dsnluvsp@gmail.com" className="md:hidden flex items-center gap-1 text-[12px] font-medium text-white mr-auto sm:mr-0 truncate max-w-[170px]">
              <Mail className="h-3 w-3" />
              <span>dsnluvsp@gmail.com</span>
            </a>
            <div className="hidden items-center gap-4 sm:gap-5 md:flex">
              {utilityLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                  className="font-medium transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Advanced Animated Search Button & Input */}
            <div className="relative flex items-center h-8">
              <motion.div
                initial={false}
                animate={{ 
                  width: searchOpen ? (window.innerWidth < 640 ? "160px" : "220px") : "32px",
                  backgroundColor: searchOpen ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.1)"
                }}
                className={cn(
                  "flex items-center overflow-hidden rounded-full transition-all duration-400 ease-in-out h-8",
                  searchOpen ? "px-3 shadow-md border border-gold/30" : "cursor-pointer hover:bg-white/20"
                )}
                onClick={() => !searchOpen && setSearchOpen(true)}
              >
                <Search className={cn("h-4 w-4 shrink-0 transition-colors duration-300", searchOpen ? "text-primary" : "text-white")} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  autoFocus={searchOpen}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={cn(
                    "ml-2 w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground/60 transition-opacity duration-300",
                    !searchOpen && "pointer-events-none opacity-0"
                  )}
                />
                {searchOpen && (
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setSearchOpen(false); 
                      setSearchValue(""); 
                    }}
                    className="ml-1 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
                  </button>
                )}
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Branding Section (Logo + Gold Name) */}
      <div 
        className="py-2 md:py-5 shadow-inner relative overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #1e2f4f 0%, #223b6b 50%, #1e2f4f 100%)",
          boxShadow: "inset 0 -10px 25px rgba(0,0,0,0.3)"
        }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-5 pointer-events-none mix-blend-overlay" />
        
        <div className="container relative z-10 px-4">
          <div className="flex flex-col items-center justify-between gap-1 md:gap-4 md:flex-row">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src="https://dsnlu.ac.in/storage/2023/11/dsnlulogo0-1.png" 
                  alt="DSNLU Logo Left" 
                  className="h-[40px] md:h-[75px] w-auto transition-all"
                />
              </Link>
            </div>

            {/* Center: University Name & Quote */}
            <div className="flex flex-col items-center text-center max-w-3xl">
              <h1 
                className="font-serif text-[14px] md:text-2xl lg:text-[28px] font-bold tracking-tight text-[#d4a017] leading-tight"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
              >
                DAMODARAM SANJIVAYYA NATIONAL LAW UNIVERSITY
              </h1>
              <p className="mt-1 font-serif text-[10px] md:text-[14px] italic text-[#f3f3f3] opacity-85">
                ~ a cradle of future jurists ~
              </p>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0 hidden md:block">
              <Link to="/">
                <img 
                  src="https://dsnlu.ac.in/storage/2022/12/DSNLU_Logo-1-300x291-1.png" 
                  alt="DSNLU Logo Right" 
                  className="h-[40px] md:h-[75px] w-auto transition-all"
                />
              </Link>
            </div>
            
            {/* Right Logo Mobile (Hidden on desktop to avoid duping flex logic if not needed, but keeping consistent with original layout which seemed to show both? 
               Wait, the original layout just stacked them. 
               The requirement says "Resize circular logos (top & bottom)". 
               In the original code: 
               Flex col gap-4. 
               Logo Left.
               Center Text.
               Right Logo.
               
               In mobile column layout, this means:
               Top: Left Logo
               Middle: Text
               Bottom: Right Logo.
               
               If I keep it as is, it will be:
               Logo
               Text
               Logo
               
               Let's respect the "Resize circular logos (top & bottom)" instruction implying both are visible.
            */}
             <div className="flex-shrink-0 md:hidden">
              <Link to="/">
                <img 
                  src="https://dsnlu.ac.in/storage/2022/12/DSNLU_Logo-1-300x291-1.png" 
                  alt="DSNLU Logo Right" 
                  className="h-[40px] w-auto transition-all"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Section (Slim Academic Style - Light Grey) */}
      <nav className="relative z-[100] bg-[#f4f5f7] border-b border-black/[0.05] hidden lg:block h-[44px] overflow-visible">
        <div className="container h-full flex items-center justify-center p-0">
          <div className="flex items-center justify-center h-full gap-1 overflow-visible max-w-6xl mx-auto">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.groups && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 xl:px-4 h-full text-[13px] xl:text-[13.5px] font-medium text-[#1f2f4a] tracking-tight transition-all duration-250 hover:text-navy whitespace-nowrap",
                    "font-['Inter']",
                    activeDropdown === item.label && "text-navy"
                  )}
                >
                  {item.label}
                  {item.groups && <ChevronDown className="h-3 w-3 ml-0.5 transition-transform group-hover:rotate-180" />}
                </Link>
                
                {/* Subtle Underline Animation */}
                <span className={cn(
                  "absolute bottom-0 left-2 right-2 h-[2.5px] bg-navy/70 scale-x-0 transition-transform duration-250 origin-left group-hover:scale-x-100",
                  activeDropdown === item.label && "scale-x-100"
                )} />

                <AnimatePresence>
                  {item.groups && activeDropdown === item.label && (
                    <MegaMenu groups={item.groups} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu items={navItems} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
