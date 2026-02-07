import { motion } from "framer-motion";
import { ArrowRight, Bell, Calendar, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const notices = [
  {
    id: 1,
    title: "CLAT 2025 Admission Notification",
    date: "Feb 5, 2025",
    category: "Admission",
    isNew: true,
  },
  {
    id: 2,
    title: "End Semester Examination Schedule - Spring 2025",
    date: "Feb 3, 2025",
    category: "Examination",
    isNew: true,
  },
  {
    id: 3,
    title: "National Moot Court Competition 2025",
    date: "Jan 28, 2025",
    category: "Events",
    isNew: false,
  },
  {
    id: 4,
    title: "Ph.D Admission 2025-26 - Applications Open",
    date: "Jan 25, 2025",
    category: "Admission",
    isNew: false,
  },
  {
    id: 5,
    title: "Faculty Recruitment - Assistant Professor Positions",
    date: "Jan 20, 2025",
    category: "Recruitment",
    isNew: false,
  },
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
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="mb-2 inline-block font-medium uppercase tracking-wider text-gold">
                  Latest Updates
                </span>
                <h2 className="font-serif text-3xl font-bold text-primary-foreground">
                  Notices & Announcements
                </h2>
              </div>
              <Button variant="outline" className="hidden border-gold/30 text-gold hover:bg-gold hover:text-navy sm:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {notices.map((notice, index) => (
                <motion.a
                  key={notice.id}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-start gap-4 rounded-xl border border-navy-light bg-navy-dark/50 p-5 transition-all hover:border-gold/30 hover:bg-navy-light/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <Bell className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-navy-light px-2 py-0.5 text-xs font-medium text-gold">
                        {notice.category}
                      </span>
                      {notice.isNew && (
                        <span className="rounded bg-gold px-2 py-0.5 text-xs font-bold text-navy">
                          NEW
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-primary-foreground transition-colors group-hover:text-gold">
                      {notice.title}
                    </h3>
                    <p className="mt-1 text-sm text-primary-foreground/60">{notice.date}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gold opacity-0 transition-all group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full border-gold/30 text-gold hover:bg-gold hover:text-navy sm:hidden">
              View All Notices <ArrowRight className="ml-2 h-4 w-4" />
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
                Admissions 2025-26
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