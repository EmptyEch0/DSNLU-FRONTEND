import { motion } from "framer-motion";
import { Building2, BookOpen, Scale, Users } from "lucide-react";
import libraryImg from "@/assets/library.jpg";
import mootCourtImg from "@/assets/moot-court.jpg";

const facilities = [
  {
    icon: BookOpen,
    title: "Central Library",
    description: "Extensive collection of legal texts, journals, and digital resources",
    image: libraryImg,
  },
  {
    icon: Scale,
    title: "Moot Court Hall",
    description: "State-of-the-art facility for advocacy training and competitions",
    image: mootCourtImg,
  },
  {
    icon: Building2,
    title: "Hostels",
    description: "Comfortable accommodation with modern amenities for students",
    image: null,
  },
  {
    icon: Users,
    title: "Student Activities",
    description: "Vibrant clubs and organizations for holistic development",
    image: null,
  },
];

export function CampusSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            Campus Life
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Life at DSNLU
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A vibrant campus experience with world-class facilities and opportunities for growth
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {facilities.slice(0, 2).map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={facility.image || ""}
                  alt={facility.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 backdrop-blur-sm">
                  <facility.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-ivory">
                  {facility.title}
                </h3>
                <p className="text-ivory/80">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {facilities.slice(2).map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition-all hover:border-gold/30 hover:shadow-md"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <facility.icon className="h-7 w-7 text-gold" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}