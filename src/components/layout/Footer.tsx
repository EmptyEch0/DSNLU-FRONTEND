import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ArrowRight
} from "lucide-react";

const quickLinks = [
  { label: "About DSNLU", href: "#about" },
  { label: "Academic Programs", href: "#programs" },
  { label: "Admissions", href: "#admissions" },
  { label: "Research", href: "#research" },
  { label: "Faculty", href: "#faculty" },
  { label: "Library", href: "#library" },
];

const importantLinks = [
  { label: "NIRF Data", href: "#nirf" },
  { label: "NAAC", href: "#naac" },
  { label: "RTI", href: "#rti" },
  { label: "Tenders", href: "#tenders" },
  { label: "Alumni", href: "#alumni" },
  { label: "Careers", href: "#careers" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold">
                <span className="font-serif text-xl font-bold text-navy">D</span>
              </div>
              <div>
                <h3 className="font-serif font-bold">DSNLU</h3>
                <p className="text-xs text-primary-foreground/70">Visakhapatnam</p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-primary-foreground/80">
              Damodaram Sanjivayya National Law University, established in 2008, 
              is committed to excellence in legal education and research.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-light transition-colors hover:bg-gold hover:text-navy"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm text-primary-foreground/80 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold">Important Links</h3>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm text-primary-foreground/80 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm text-primary-foreground/80">
                  Sabbavaram, Visakhapatnam District,<br />
                  Andhra Pradesh - 531035, India
                </span>
              </li>
              <li>
                <a href="tel:+918662458228" className="flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-gold">
                  <Phone className="h-5 w-5 shrink-0 text-gold" />
                  +91 866-245-8228
                </a>
              </li>
              <li>
                <a href="mailto:registrar@dsnlu.ac.in" className="flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-gold">
                  <Mail className="h-5 w-5 shrink-0 text-gold" />
                  registrar@dsnlu.ac.in
                </a>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-6 aspect-video overflow-hidden rounded-lg border border-navy-light">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.4!2d83.1!3d17.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ4JzAwLjAiTiA4M8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DSNLU Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-light">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-primary-foreground/60 md:flex-row">
          <p>© 2025 Damodaram Sanjivayya National Law University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="transition-colors hover:text-gold">Privacy Policy</a>
            <a href="#terms" className="transition-colors hover:text-gold">Terms of Use</a>
            <a href="#sitemap" className="transition-colors hover:text-gold">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}