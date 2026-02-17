import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/hero-campus.jpg";
import { HeroCarousel } from "./HeroCarousel";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="DSNLU Campus"
          className="h-full w-full object-cover"
        />
        <div className="bg-overlay-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-[85vh] flex-col justify-center py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.5fr_1fr] md:gap-8 lg:grid-cols-[55%_45%]">
          {/* LEFT COLUMN: Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-navy-dark/50 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-ivory">Admissions Open 2025-26</span>
            </motion.div>

            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
              Shaping the Future of{" "}
              <span className="text-gradient-gold">Legal Excellence</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-ivory/80 md:text-xl">
              Damodaram Sanjivayya National Law University stands as a beacon of legal education,
              nurturing future advocates, judges, and legal scholars who will uphold justice and the rule of law.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="group bg-gold text-navy hover:bg-gold-dark">
                <GraduationCap className="mr-2 h-5 w-5" />
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory/10 hover:text-ivory">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Programs
              </Button>
              <Button size="lg" variant="ghost" className="text-ivory hover:bg-ivory/10 hover:text-ivory">
                <Bell className="mr-2 h-5 w-5" />
                Latest Notices
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Mini Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
             <HeroCarousel />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <div className="container">
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-ivory/10 bg-navy-dark/60 p-6 backdrop-blur-md md:grid-cols-4">
              <StatItem number="2008" label="Established" />
              <StatItem number="1000+" label="Students" />
              <StatItem number="50+" label="Faculty Members" />
              <StatItem number="A" label="NAAC Grade" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-2xl font-bold text-gold md:text-3xl">{number}</div>
      <div className="text-sm text-ivory/70">{label}</div>
    </div>
  );
}