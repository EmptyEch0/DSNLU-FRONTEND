import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Target, 
  Wifi, 
  Database, 
  Monitor, 
  BookCopy, 
  Globe,
  Award,
  CheckCircle2,
  Library
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { LucideIcon } from "lucide-react";

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: LucideIcon }) => (
  <div className="space-y-4">
    <h2 className="font-serif text-4xl font-bold text-navy flex items-center gap-3">
      <Icon className="h-8 w-8 text-blue-600" /> {title}
    </h2>
    <div className="h-1 w-20 bg-blue-600 rounded-full" />
  </div>
);

const Counter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/80 font-medium uppercase tracking-widest text-sm">{label}</div>
    </div>
  );
};

const LibraryAbout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="about" />

        {/* Stats Counter Section */}
        <section className="bg-navy py-16">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <Counter end={30000} label="Books" suffix="+" />
              <Counter end={100} label="Journals" suffix="+" />
              <Counter end={5000} label="E-Resources" suffix="+" />
              <Counter end={1000} label="Subscribers" suffix="+" />
            </div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Vision & Mission */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl font-bold text-navy flex items-center gap-3">
                    <Target className="h-8 w-8 text-blue-600" /> Our Mission
                  </h2>
                  <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-blue-600 pl-6 py-2">
                  "To enrich the academic community by providing exceptional access to diverse legal resources, fostering a culture of research excellence, and maintaining a state-of-the-art learning environment at DSNLU."
                </p>
                <ul className="space-y-4">
                  {[
                    "Continuous enrichment of library collection",
                    "Seamless access to digital and global resources",
                    "Promoting information literacy among students",
                    "Effective implementation of open access systems"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/20 rounded-3xl p-10 lg:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Award className="h-32 w-32 text-navy" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-8">Special Features</h3>
                <div className="grid gap-6">
                  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-navy/5 transform transition-all hover:scale-[1.02] hover:shadow-md">
                    <Monitor className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy text-lg">Open Access System</h4>
                      <p className="text-muted-foreground">Implemented for easy access to books and other materials without any restrictions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-navy/5 transform transition-all hover:scale-[1.02] hover:shadow-md">
                    <Wifi className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy text-lg">Wi-Fi & LAN Features</h4>
                      <p className="text-muted-foreground">High-speed connectivity across the library premise for seamless research and browsing.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Resources Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy">Digital & E-Resources</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our library is equipped with a vast array of digital tools and platforms to support modern legal research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Database, 
                  title: "E-Resource Access", 
                  desc: "Access to premium legal databases like LexisNexis, Westlaw, and SCC Online through campus network and remote access." 
                },
                { 
                  icon: Globe, 
                  title: "Remotexs Integration", 
                  desc: "Advanced remote access gateway allowing students and faculty to access digital library resources from anywhere in the world." 
                },
                { 
                  icon: BookCopy, 
                  title: "Digital Repositories", 
                  desc: "Extensive collection of institutional repositories, archives, and past research papers available for digital consultation." 
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-3xl shadow-elegant border border-navy/5 text-center group hover:bg-navy transition-colors duration-500"
                >
                  <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <item.icon className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section on Library Excellence */}
        <section className="py-20 lg:py-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 transform origin-top-right -z-10" />
          <div className="container max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" 
                      alt="Library Stats" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8 order-1 lg:order-2"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl font-bold text-navy">Fostering Academic Excellence</h2>
                  <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </div>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Our constant effort is being made to enrich the library with a collection of a wide variety of books and journals from the perspective of law students and scholars.
                  </p>
                  <p>
                    DSNLU Library is not just a repository of books; it's a dynamic ecosystem where ideas are sparked, research is conducted, and the next generation of legal minds is nurtured.
                  </p>
                </div>
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white rounded-full px-8 py-6 h-auto text-lg transition-all duration-300">
                  Read More About Our Initiatives
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LibraryAbout;
