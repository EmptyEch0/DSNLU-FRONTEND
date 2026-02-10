import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Phone, Mail, Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, utilityLinks } from "./header/navData";
import { MegaMenu } from "./header/MegaMenu";
import { MobileMenu } from "./header/MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-sm">
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
              <a key={link.label} href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </a>
            ))}
            <button onClick={() => setSearchOpen(!searchOpen)} className="ml-2 transition-colors hover:text-gold">
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
          <div className="border-b bg-card">
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
          </div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav className="border-b bg-card shadow-sm">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="font-serif text-lg font-bold text-gold">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold leading-tight text-primary">
                Damodaram Sanjivayya
              </h1>
              <p className="text-xs font-medium text-muted-foreground">
                National Law University, Visakhapatnam
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.groups && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:text-gold xl:px-3 xl:text-sm"
                >
                  {item.label}
                  {item.groups && <ChevronDown className="h-3 w-3" />}
                </a>

                <AnimatePresence>
                  {item.groups && activeDropdown === item.label && (
                    <MegaMenu groups={item.groups} />
                  )}
                </AnimatePresence>
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
            <MobileMenu items={navItems} onClose={() => setMobileMenuOpen(false)} />
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
