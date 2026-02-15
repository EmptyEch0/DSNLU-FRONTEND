import { motion } from "framer-motion";
import { ArrowRight, Bell, Calendar, FileText, AlertCircle, Briefcase, GraduationCap, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  isNew: boolean;
  icon: typeof Bell;
}

const notices: Notice[] = [
  // Recruitment & Administration
  { id: 1, title: "Recruitment Notification – Teaching Posts in Law", date: "Feb 8, 2026", category: "Recruitment", isNew: true, icon: Briefcase },
  { id: 2, title: "Recruitment Application – Teaching Posts in Law", date: "Feb 8, 2026", category: "Recruitment", isNew: true, icon: Briefcase },
  { id: 3, title: "Application Form – Non Teaching Staff", date: "Feb 5, 2026", category: "Recruitment", isNew: true, icon: FileText },
  // Admissions & Programs
  { id: 4, title: "LL.D. Notification, Regulations & Application A.Y. 2026–27", date: "Feb 3, 2026", category: "Admission", isNew: true, icon: GraduationCap },
  { id: 5, title: "Ph.D. Notification, Regulations & Application A.Y. 2026–27", date: "Feb 3, 2026", category: "Admission", isNew: true, icon: GraduationCap },
  { id: 6, title: "CLAT Admissions Guidelines for UG & PG – 2026–27", date: "Jan 30, 2026", category: "Admission", isNew: false, icon: GraduationCap },
  { id: 7, title: "PGCPAITL – Post Graduate Certificate Program in AI, Technology & Law (Brochure)", date: "Jan 28, 2026", category: "Admission", isNew: false, icon: BookOpen },
  // Academic Achievements
  { id: 8, title: "Subject Toppers Certificates Awardees List", date: "Jan 25, 2026", category: "Academic", isNew: false, icon: Award },
  { id: 9, title: "Gold & Silver Medal Awardees (8th–12th Convocations)", date: "Jan 25, 2026", category: "Academic", isNew: false, icon: Award },
  { id: 10, title: "List of Candidates Graduating (UG, PG, Ph.D., LL.D.)", date: "Jan 22, 2026", category: "Academic", isNew: false, icon: GraduationCap },
  // Research & Publications
  { id: 11, title: "IPR Chair Guidelines", date: "Jan 20, 2026", category: "Research", isNew: false, icon: BookOpen },
  { id: 12, title: "Application Form – IPR Chair Professor & Research Assistants", date: "Jan 20, 2026", category: "Research", isNew: false, icon: FileText },
  { id: 13, title: "DSNLJ Call for Papers – Brochure", date: "Jan 15, 2026", category: "Research", isNew: false, icon: BookOpen },
  // Events & Miscellaneous
  { id: 14, title: "Convocation Circular – Additional Information", date: "Jan 12, 2026", category: "Events", isNew: false, icon: Bell },
  { id: 15, title: "Sponsorship for Gold Medals", date: "Jan 10, 2026", category: "Events", isNew: false, icon: Award },
  { id: 16, title: "Refund Policy", date: "Jan 8, 2026", category: "General", isNew: false, icon: FileText },
  { id: 17, title: "Certificate Course on NDPS", date: "Jan 5, 2026", category: "Events", isNew: false, icon: BookOpen },
  { id: 18, title: "Observation of Anti-Ragging Day", date: "Jan 3, 2026", category: "General", isNew: false, icon: Bell },
  { id: 19, title: "Expression of Interest for Empanelment of Book Vendors (Extended till 10 June 2025)", date: "Dec 28, 2025", category: "Tender", isNew: false, icon: FileText },
];

const quickLinks = [
  { icon: FileText, label: "Academic Calendar", href: "#calendar" },
  { icon: Calendar, label: "Exam Schedule", href: "#exams" },
  { icon: Bell, label: "Circulars", href: "#circulars" },
  { icon: AlertCircle, label: "Important Dates", href: "#dates" },
];

export function NoticesSection() {
  return (
    <section className="bg-primary py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-2 inline-block font-medium uppercase tracking-wider text-gold">
            Latest Updates
          </span>
          <h2 className="mb-2 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            Notifications & Updates
          </h2>
          <p className="text-sm text-primary-foreground/60">
            Admissions • Recruitment • Academics • Research • Events
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
              {notices.map((notice, index) => (
                <motion.a
                  key={notice.id}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  className="group flex items-start gap-4 rounded-xl border border-navy-light bg-navy-dark/50 p-4 transition-all hover:border-gold/30 hover:bg-navy-light/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <notice.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-navy-light px-2 py-0.5 text-xs font-medium text-gold">
                        {notice.category}
                      </span>
                      {notice.isNew && (
                        <span className="rounded bg-gold px-2 py-0.5 text-xs font-bold text-navy">
                          NEW
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-primary-foreground transition-colors group-hover:text-gold line-clamp-2">
                      {notice.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-primary-foreground/60">{notice.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold opacity-0 transition-all group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full border-gold/30 text-gold hover:bg-gold hover:text-navy">
              View All Notifications <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-navy-light bg-navy-dark/50 p-8">
              <h3 className="mb-6 font-serif text-xl font-bold text-primary-foreground">
                Quick Links
              </h3>
              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-gold/20 hover:bg-navy-light/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <link.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="font-medium text-primary-foreground transition-colors group-hover:text-gold">
                      {link.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-gold opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* Admission CTA */}
            <div className="mt-6 rounded-2xl bg-gold p-8 text-center">
              <h3 className="mb-2 font-serif text-xl font-bold text-navy">
                Admissions 2026-27
              </h3>
              <p className="mb-4 text-sm text-navy/80">
                Applications are now open for all programs
              </p>
              <Button className="w-full bg-navy text-primary-foreground hover:bg-navy-dark">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
