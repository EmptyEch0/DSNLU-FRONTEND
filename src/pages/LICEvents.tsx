import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, User, ExternalLink, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const events = [
  {
    title: "National Level Competition on Crime Scene Investigation (CSI – 6.0)",
    date: "18th March 2025",
    description: "The flagship CSI competition returns for its 6th edition, bringing together students for a hands-on experience in forensic investigation and criminal law application.",
    category: "Competition"
  },
  {
    title: "National Level Competition on Crime Scene Investigation (CSI – 5.0)",
    date: "23rd March 2024",
    description: "The 5th edition of CSI challenged participants with complex crime scenarios, emphasizing the importance of evidentiary value and meticulous investigation.",
    category: "Competition"
  },
  {
    title: "World Entrepreneurship Day - Collage Making Competition",
    subtitle: "“MAKE IN INDIA”",
    date: "21st August 2023",
    description: "Celebrating innovation and indigenous entrepreneurship through a creative collage-making event focused on the Make in India initiative.",
    category: "Program"
  },
  {
    title: "VIBODHA Workshop",
    subtitle: "Two-Day National Workshop on Legal Entrepreneurship",
    date: "18th & 19th March 2023",
    description: "A comprehensive national workshop aimed at inspiring legal students to explore entrepreneurial paths within the legal industry.",
    category: "Workshop"
  },
  {
    title: "National Level Competition on Crime Scene Investigation (CSI – 4.0)",
    date: "24th September 2022",
    description: "Conducted the 4th edition of our signature CSI competition, fostering practical legal skills and forensic awareness.",
    category: "Competition"
  },
  {
    title: "Forensic Science and Its Evidentiary Value",
    subtitle: "Two-Day Online Workshop",
    date: "25th & 26th September 2021",
    description: "Deep-diving into the scientific and legal aspects of forensic evidence in the judicial process.",
    category: "Workshop"
  },
  {
    title: "Legal Profession and Practice – Challenges and Prospects",
    subtitle: "One-Day Online Workshop in association with DSNLU Alumni Association",
    date: "10th April 2021",
    description: "A bridge-building event where alumni shared insights into the practical challenges and opportunities in the legal profession today.",
    category: "Workshop"
  },
  {
    title: "Advocacy Workshops",
    subtitle: "Trial Advocacy Series",
    date: "2018 - 2019",
    description: "Conducted intensive workshops on Criminal Trial Advocacy (October 2018) and Civil Trial Advocacy (March 2019) to enhance courtroom skills.",
    category: "Training"
  }
];

const LICEvents = () => {
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
            <span className="font-medium text-gold">LIC Events</span>
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
              LIC EVENTS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="grid gap-8">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl border bg-card p-1 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-7 border-l-8 border-gold rounded-xl">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0f2d5c]/5 text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all duration-300">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-4">
                         <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                           <Calendar className="h-3 w-3" /> {event.date}
                         </span>
                         <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                           {event.category}
                         </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] leading-tight">
                        {event.title}
                      </h3>
                      {event.subtitle && (
                        <p className="font-bold text-muted-foreground uppercase tracking-wider text-sm">
                          {event.subtitle}
                        </p>
                      )}
                      <p className="text-muted-foreground leading-relaxed italic border-l-2 border-secondary pl-4 mt-4">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Highlight */}
        <section className="py-24 bg-[#0f2d5c] text-white overflow-hidden">
           <div className="container relative z-10 text-center max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-12 bg-gold mx-auto" />
                <h2 className="font-serif text-3xl font-bold">Empowering the Future of Law</h2>
                <p className="text-white/80 leading-relaxed text-lg italic">
                  "Our events are designed to not only educate but also to inspire students to rethink the boundaries of legal practice and embrace the spirit of innovation."
                </p>
              </motion.div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LICEvents;
