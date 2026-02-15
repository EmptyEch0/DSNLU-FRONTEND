import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Mail, 
  MapPin, 
  ChevronRight,
  UserCheck,
  Star,
  Image as ImageIcon,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const facultyMembers = [
  { name: "Dr. P. Jogi Naidu", role: "Convenor" },
  { name: "Dr. Rifat Khan", role: "Member" },
  { name: "Dr. A. Nageswara Rao", role: "Member" },
  { name: "Dr. B. Soma", role: "Member" },
  { name: "Dr. K. Sudha", role: "Member" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
  { name: "Ms. B. Madhuri", role: "Member" },
];

const studentMembers = [
  { 
    batch: "5th Year", 
    names: ["Lasya Charitha K", "Kuppili Havishnu Hanita", "Palak Dogra"] 
  },
  { 
    batch: "4th Year", 
    names: ["Vijaya Hadassa M", "Mihira Chakravarthy"] 
  },
  { 
    batch: "3rd Year", 
    names: ["Vaaghdevi M", "E. Likhitha", "G. Bhavana Reddy"] 
  },
  { 
    batch: "2nd Year", 
    names: ["Jatan Mittal", "Priyamvada Singh", "Priyal", "Atkuri Sri Sai Venkata Ratna Sahishn"] 
  },
  { 
    batch: "1st Year", 
    names: ["Aditya Akunuri", "Kaushaki", "Ruchitha Samhitha"] 
  }
];

const galleryImages = [
  "https://dsnlu.ac.in/storage/2022/12/4-1.png",
  "https://dsnlu.ac.in/storage/2022/12/3-1.png",
  "https://dsnlu.ac.in/storage/2022/12/1-1.png",
  "https://dsnlu.ac.in/storage/2022/12/4-1.png", // Reused as requested
];

const AlumniRelationsCommittee = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Committees & Societies</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Alumni Relations Committee</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-navy py-20 lg:py-32 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-152305085306e-8c3d3efcd35f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest border border-gold/30">
                Connecting Generations. Strengthening Legacy. Inspiring Futures.
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight">
                Alumni Relations <br className="hidden md:block" /> Committee
              </h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mx-auto h-1.5 w-32 rounded-full bg-gold" 
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold mb-4 shadow-sm">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">About the Committee</h2>
              <div className="divider-gold mx-auto" />
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The Alumni Relations Committee of Damodaram Sanjivayya National Law University (DSNLU) serves as a vital bridge between the University and its alumni network. The committee is dedicated to fostering lifelong relationships with alumni, encouraging mentorship, collaboration, and professional networking opportunities.
                </p>
                <p>
                  The committee works actively to engage alumni in academic, professional, and extracurricular development of students while strengthening institutional growth.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Faculty Members */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Faculty / Staff Members</h2>
              <div className="divider-gold mx-auto" />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {facultyMembers.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-8 rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group",
                    member.role === "Convenor" ? "border-gold/50 shadow-md" : "hover:border-gold/30"
                  )}
                >
                  <div className="space-y-4 text-center">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mx-auto transition-colors",
                      member.role === "Convenor" ? "bg-gold text-white" : "bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white"
                    )}>
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy group-hover:text-gold transition-colors">{member.name}</h3>
                      <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Members */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Student Members</h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="space-y-12">
              {studentMembers.map((batch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <GraduationCap className="h-6 w-6 text-gold" />
                    <h3 className="text-xl font-bold text-navy">{batch.batch}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold/50 to-transparent" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pl-10">
                    {batch.names.map((name, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-muted-foreground hover:text-navy transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        <span className="font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 lg:py-24 bg-navy text-white relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="text-center space-y-4 mb-20">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold uppercase tracking-widest">Committees Events</h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Event 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-10 space-y-8 relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors" />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-gold font-bold uppercase tracking-widest text-sm">
                    <Star className="h-5 w-5 fill-current" /> Highlights
                  </div>
                  <h3 className="font-serif text-3xl font-bold">Dashakam Santawara – Alumni Meet 2024</h3>
                  <div className="flex items-center gap-2 text-gold/80 font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>October 14–15, 2024</span>
                  </div>
                  <p className="text-primary-foreground/70 leading-relaxed italic">
                    The Dashakam Santawara Alumni Meet served as a vibrant platform for alumni to reconnect with DSNLU and engage meaningfully with students, faculty, and staff.
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 relative z-10">
                  <div className="space-y-4">
                    <h4 className="font-bold text-gold flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Day 1 Highlights
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/60 pl-2">
                      {["Alumni interaction sessions", "Moot court discussions", "Placement guidance", "Mentorship", "Networking"].map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gold mt-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-gold flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Day 2 Highlights
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/60 pl-2">
                      {["Alumni vs Students Sports", "Community bonding", "Celebration of memories"].map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gold mt-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Event 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-10 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group border-dashed"
              >
                <div className="h-20 w-20 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <Calendar className="h-10 w-10 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-3xl font-bold">Alumni Meet 2025 @ DSNLU</h3>
                  <div className="inline-block px-4 py-1 rounded-full bg-gold text-navy font-bold text-xs uppercase tracking-tighter">
                    More Details Coming Soon
                  </div>
                  <p className="text-primary-foreground/60 max-w-xs mx-auto">
                    We are currently planning our next major gathering. Stay tuned for dates and event schedules.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="text-center space-y-4 mb-20">
              <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Gallery Section</h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid gap-8 grid-cols-2">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.15,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="relative group aspect-video overflow-hidden rounded-2xl shadow-elegant bg-muted"
                >
                  <motion.img 
                    src={src} 
                    alt={`Alumni Meet photo ${i + 1}`}
                    className="w-full h-full object-cover transition-all duration-700"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: i % 2 === 0 ? 1.5 : -1.5,
                    }}
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <ImageIcon className="h-8 w-8 text-gold mx-auto mb-3" />
                       <p className="text-white font-serif text-xl">Alumni Meet @ DSNLU</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-secondary/10">
          <div className="container max-w-4xl">
            <div className="p-10 md:p-16 rounded-3xl border bg-card shadow-elegant text-center space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy">Connect With Us</h2>
                <div className="divider-gold mx-auto" />
              </div>
              
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold">University Address</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Damodaram Sanjivayya National Law University<br />
                    NYAYAPRASTHA, Sabbavaram<br />
                    Visakhapatnam – 531035<br />
                    Andhra Pradesh, India
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Official Email</h4>
                  <a href="mailto:alumni@dsnlu.ac.in" className="text-xl font-serif font-bold text-navy hover:text-gold transition-colors block">
                    alumni@dsnlu.ac.in
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Connecting alumni for institutional excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AlumniRelationsCommittee;
