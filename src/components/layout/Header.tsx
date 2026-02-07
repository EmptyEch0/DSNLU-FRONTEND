import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Users,
  BookOpen,
  GraduationCap,
  Building2,
  FileText,
  Library,
  UserCheck,
  ClipboardList,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

const utilityLinks = [
  { label: "NIRF", href: "#nirf" },
  { label: "NAAC", href: "#naac" },
  { label: "Tender", href: "#tender" },
  { label: "RTI", href: "#rti" },
  { label: "Alumni", href: "#alumni" },
];

const navItems = [
  { label: "Home", href: "/" },
  { 
    label: "About DSNLU", 
    href: "#about",
    submenu: [
      { label: "Vision & Mission", href: "#vision", icon: Building2 },
      { label: "History", href: "#history", icon: BookOpen },
      { label: "Governance", href: "#governance", icon: Users },
      { label: "Infrastructure", href: "#infrastructure", icon: Building2 },
    ]
  },
  { 
    label: "People", 
    href: "#people",
    submenu: [
      { label: "Chancellor", href: "#chancellor", icon: UserCheck },
      { label: "Vice-Chancellor", href: "#vc", icon: UserCheck },
      { label: "Faculty", href: "#faculty", icon: Users },
      { label: "Administration", href: "#admin", icon: ClipboardList },
    ]
  },
  { 
    label: "Academics", 
    href: "#academics",
    submenu: [
      { label: "B.A. LL.B (Hons.)", href: "#ballb", icon: GraduationCap },
      { label: "LL.M", href: "#llm", icon: GraduationCap },
      { label: "Ph.D", href: "#phd", icon: BookOpen },
      { label: "Academic Calendar", href: "#calendar", icon: FileText },
    ]
  },
  { label: "Admissions", href: "#admissions" },
  { label: "Research", href: "#research" },
  { label: "Library", href: "#library" },
  { label: "Students", href: "#students" },
  { label: "Examination", href: "#examination" },
  { label: "Notices", href: "#notices" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="hidden items-center gap-6 md:flex">
            <a href="tel:+918662458228" className="flex items-center gap-2 transition-colors hover:text-gold">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 866-245-8228</span>
            </a>
            <a href="mailto:registrar@dsnlu.ac.in" className="flex items-center gap-2 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5" />
              <span>registrar@dsnlu.ac.in</span>
            </a>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="ml-2 transition-colors hover:text-gold"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
          <div className="flex w-full items-center justify-between md:hidden">
            <a href="tel:+918662458228" className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
            </a>
            <span className="text-xs">DSNLU, Visakhapatnam</span>
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b bg-card"
          >
            <div className="container py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for programs, faculty, notices..."
                  className="w-full rounded-lg border bg-background py-3 pl-12 pr-4 text-foreground outline-none ring-gold focus:ring-2"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav className="border-b bg-card shadow-sm">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <span className="font-serif text-xl font-bold text-gold">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold leading-tight text-primary md:text-xl">
                Damodaram Sanjivayya
              </h1>
              <p className="text-xs font-medium text-muted-foreground md:text-sm">
                National Law University, Visakhapatnam
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
                
                {item.submenu && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border bg-card p-2 shadow-lg"
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                      >
                        <subItem.icon className="h-4 w-4 text-gold" />
                        <span>{subItem.label}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t lg:hidden"
            >
              <div className="container py-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block border-b border-border/50 py-3 text-sm font-medium transition-colors hover:text-gold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}