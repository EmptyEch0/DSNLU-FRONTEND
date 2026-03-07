import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems as staticNavItems, utilityLinks } from "./header/navData";
import { useNavAdditions } from "@/hooks/useNavAdditions";
import { MegaMenu } from "./header/MegaMenu";
import { MobileMenu } from "./header/MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const navItems = useNavAdditions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<{ label: string; href: string; parent?: string }[]>([]);

  // ─── Search Logic ──────────────────────────────────────────────────────────

  const handleSearch = (val: string) => {
    setSearchValue(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const query = val.toLowerCase();
    const results: { label: string; href: string; parent?: string }[] = [];

    const searchRecursive = (items: any[], parentLabel?: string) => {
      items.forEach(item => {
        if (item.label && item.label.toLowerCase().includes(query) && item.href !== "#") {
          results.push({ label: item.label, href: item.href, parent: parentLabel });
        }
        if (item.groups) {
          item.groups.forEach((g: any) => searchRecursive(g.items, item.label));
        }
        if (item.items) {
          searchRecursive(item.items, parentLabel);
        }
        if (item.subItems) {
          searchRecursive(item.subItems, item.label);
        }
      });
    };

    searchRecursive(navItems);
    setSearchResults(results.slice(0, 8)); // Limit to 8 results
  };

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

            {/* Always Open Search Bar */}
            <div className="relative flex items-center h-8">
              <div
                className={cn(
                  "flex items-center overflow-visible rounded-full h-8 px-3 shadow-md border border-gold/30 bg-white"
                )}
              >
                <Search className="h-4 w-4 shrink-0 text-primary" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-2 w-[140px] sm:w-[200px] bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground/60"
                />
                {searchValue && (
                  <button 
                    onClick={() => { setSearchValue(""); setSearchResults([]); }}
                    className="ml-1 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-10 right-0 w-[280px] sm:w-[350px] bg-white rounded-xl shadow-2xl border border-border overflow-hidden z-[110]"
                  >
                    <div className="p-2 max-h-[400px] overflow-y-auto">
                      {searchResults.map((result, idx) => (
                        <Link
                          key={idx}
                          to={result.href}
                          onClick={() => { setSearchValue(""); setSearchResults([]); }}
                          className="flex flex-col px-4 py-2.5 hover:bg-gold/10 rounded-lg group transition-colors"
                        >
                          <span className="text-sm font-bold text-navy group-hover:text-primary transition-colors">
                            {result.label}
                          </span>
                          {result.parent && (
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                              {result.parent}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                className="font-serif text-[11px] sm:text-[14px] md:text-xl lg:text-2xl xl:text-[28px] font-bold tracking-tight text-[#d4a017] leading-tight whitespace-nowrap"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
              >
                DAMODARAM SANJIVAYYA NATIONAL LAW UNIVERSITY
              </h1>
              <p className="mt-0.5 md:mt-1 font-serif text-[8px] md:text-[14px] italic text-[#f3f3f3] opacity-85">
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
