import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Music, 
  Theater, 
  Palette, 
  Mic2, 
  BookOpen, 
  Star, 
  Users, 
  Trophy,
  Download,
  Mail,
  MapPin,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CulturalCommittee = () => {
  const objectives = [
    "Promote artistic and creative excellence",
    "Encourage student participation in cultural events",
    "Organize university cultural festivals",
    "Represent DSNLU in national-level cultural competitions",
    "Foster teamwork, leadership, and cultural inclusivity"
  ];

  const activities = [
    { icon: Theater, title: "Drama & Theatre", desc: "Showcasing dramatic excellence through plays and skits." },
    { icon: Music, title: "Music Competitions", desc: "Platform for vocal and instrumental talent exploration." },
    { icon: Star, title: "Dance Performances", desc: "Celebrating rhythm through classical and contemporary styles." },
    { icon: Palette, title: "Fine Arts", desc: "Creative expression through painting, sketching, and crafts." },
    { icon: Mic2, title: "Literary Events", desc: "Debates, elocution, and poetry for vocal expression." },
    { icon: Trophy, title: "Cultural Fests", desc: "Organizing and managing the university's flagship fests." },
    { icon: Users, title: "National Representation", desc: "Leading the DSNLU contingent in external competitions." },
  ];

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
            <span className="font-medium text-gold capitalize">Cultural Committee</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-navy py-16 md:py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253361-bee8718a300a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm md:text-base border-b border-gold/30 pb-2"
            >
              Celebrating Creativity. Preserving Culture. Inspiring Expression.
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl uppercase tracking-tighter"
            >
              Cultural Committee
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-32 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="font-serif text-3xl font-bold text-navy">About the Cultural Committee</h2>
                <div className="divider-gold" />
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    The Cultural Committee of Damodaram Sanjivayya National Law University (DSNLU) is dedicated to nurturing creativity, artistic expression, and cultural diversity among students.
                  </p>
                  <p>
                    The committee serves as a platform for students to explore and showcase their talents across music, dance, theatre, literary arts, and fine arts. It plays a vital role in fostering holistic development beyond academics.
                  </p>
                  <p>
                    Through its initiatives, the Cultural Committee strengthens unity, leadership, and confidence among students while upholding the vibrant cultural spirit of the University.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-elegant"
              >
                <img 
                  src="https://images.unsplash.com/photo-1460661419201-fd4ce186860d?q=80&w=1200&auto=format&fit=crop" 
                  alt="Cultural expression"
                  className="w-full h-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container max-w-5xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl font-bold">Objectives</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-4 md:grid-cols-1">
              {objectives.map((obj, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-5 rounded-xl border bg-card shadow-sm group hover:border-gold/30 transition-all"
                >
                  <div className="h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-foreground">{obj}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Major Activities */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold">Major Activities</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border bg-card hover:border-gold/20 hover:shadow-lg transition-all text-center space-y-4 group"
                >
                  <div className="h-14 w-14 rounded-full bg-navy/5 text-navy flex items-center justify-center mx-auto group-hover:bg-gold group-hover:text-white transition-colors">
                    <act.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{act.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{act.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Section */}
        <section className="py-16 bg-navy text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-gold">Committee Details</h2>
                <p className="text-primary-foreground/70">Download the detailed cultural committee document for more information.</p>
              </div>
              <a 
                href="https://dsnlu.ac.in/storage/2023/01/Culturelas.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-bold py-4 px-8 rounded-full transition-all group shadow-lg"
              >
                <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                View / Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-secondary/10">
          <div className="container max-w-4xl">
            <div className="p-10 rounded-3xl border bg-card shadow-elegant text-center space-y-8">
              <div className="h-16 w-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy">Contact Cultural Committee</h2>
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>NYAYAPRASTHA, Sabbavaram, Visakhapatnam – 531035</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-navy">
                    <Mail className="h-4 w-4 text-gold" />
                    <a href="mailto:cultural@dsnlu.ac.in" className="hover:text-gold transition-colors underline-offset-4 hover:underline">
                      cultural@dsnlu.ac.in
                    </a>
                  </div>
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

export default CulturalCommittee;
