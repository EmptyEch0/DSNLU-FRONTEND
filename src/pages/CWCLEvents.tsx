import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, User, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const events = [
  {
    title: "Awareness Program: Protection Laws of Women and Child",
    date: "07.11.2023",
    description: "An intensive awareness session focused on the legal protections available to women and children under Indian law. The program aimed to educate students and the public on practical legal remedies.",
    guidance: "Prof (Dr) D. Surya Prakasa Rao & Dr. N. Bhagya Lakshmi"
  },
  {
    title: 'National Seminar: "Live-in Relationship: Impact on Family Laws in India"',
    date: "11th & 12th March 2023",
    description: "A two-day national seminar exploring the legal complexities and socio-legal impacts of live-in relationships on traditional family law structures in India.",
    guidance: null
  },
  {
    title: "National Girl Child Day",
    date: "24 January 2023",
    description: "Commemorating National Girl Child Day with various competitions and a special interaction session with the Superintendent of Police (SP) regarding safety and empowerment.",
    guidance: "Interaction with SP"
  },
  {
    title: 'International Women’s Day Seminar: "Gender Equality Today for a Sustainable Tomorrow"',
    date: "8 March 2022",
    description: "A signature seminar celebrating women's achievements and discussing the roadmap for achieving gender equality as a cornerstone for sustainable development.",
    guidance: null
  },
  {
    title: 'National Webinar: "Violence Against Women: Issues & Concerns"',
    date: "25 Nov 2021",
    description: "International Day for Elimination of Violence against Women was marked with a national webinar addressing systemic issues and emerging concerns in protection against violence.",
    guidance: null
  }
];

const images = [
  "https://dsnlu.ac.in/storage/2024/01/cwcl-events4.png",
  "https://dsnlu.ac.in/storage/2024/01/cwcl-events3.png",
  "https://dsnlu.ac.in/storage/2024/01/cwcl-events2.png",
  "/placeholder.svg" // Placeholder for the 4th image
];

const CWCLEvents = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">CWCL Events</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl"
            >
              CWCL EVENTS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-5xl">
            <div className="grid gap-12">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col md:flex-row gap-8 rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:border-gold/30"
                >
                  <div className="flex shrink-0 items-center justify-center rounded-2xl bg-[#0f2d5c]/5 p-6 h-32 w-full md:w-32 transition-colors group-hover:bg-[#0f2d5c] group-hover:text-white">
                    <Calendar className="h-12 w-12" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gold">
                      <span className="flex items-center gap-1.5 bg-gold/10 px-3 py-1 rounded-full uppercase tracking-widest">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] group-hover:text-gold transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    {event.guidance && (
                      <div className="flex items-center gap-2 pt-2 text-sm font-semibold text-[#0f2d5c]/80">
                        <User className="h-4 w-4 text-gold" />
                        <span>Guidance: {event.guidance}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24">
          <div className="container">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-0.5 w-12 bg-gold" />
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">EVENT GALLERY</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-md transition-shadow hover:shadow-xl"
                >
                  <img 
                    src={src} 
                    alt={`CWCL Event ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0f2d5c]/10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CWCLEvents;
