import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const leaders = [
  {
    name: "Justice Shri P. Kodanda Ramayya",
    title: "Visitor",
    position: "Judge (Retd.), High Court of Andhra Pradesh",
    image: "https://dsnlu.ac.in/wp-content/uploads/2022/12/Justice-Shri-P.-Kodanda-Ramayya-234x300-1.jpg",
    links: [
      { label: "Visitor's Profile", href: "/visitor" },
    ],
  },
  {
    name: "Hon'ble Smt. Justice Lisa Gill",
    title: "Chancellor",
    position: "The Chief Justice, High Court of Andhra Pradesh",
    image: "https://dsnlu.ac.in/wp-content/uploads/2026/04/CJ-AP-Smt.-Justice-Lisa-Gill.webp",
    links: [
      { label: "Chancellor's Message", href: "/chancellor" },
      { label: "Chancellor's Profile", href: "/chancellor" },
    ],
  },
  {
    name: "Prof. (Dr.) Dasari Surya Prakasa Rao",
    title: "Vice-Chancellor",
    position: "Vice-Chancellor, DSNLU",
    image: "https://dsnlu.ac.in/wp-content/uploads/2024/04/vcdsnlu.jpeg",
    links: [
      { label: "Vice-Chancellor's Message", href: "/vice-chancellor" },
      { label: "Vice-Chancellor's Profile", href: "/vice-chancellor" },
    ],
  },
  {
    name: "Dr. Viswachandra Nath M.",
    title: "Registrar (I/c)",
    position: "Registrar-In-Charge, DSNLU",
    image: "https://dsnlu.ac.in/wp-content/uploads/2024/08/Dr.-Viswachandra-Nath-M-.png",
    links: [
      { label: "Registrar's Message", href: "/registrar" },
      { label: "Registrar's Profile", href: "/registrar#profile" },
    ],
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Institutional Governance</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">Our Distinguished Leadership</h2>
          <div className="h-1.5 w-32 bg-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group flex flex-col"
            >
              {/* Leader Card */}
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-elegant transition-all duration-500 group-hover:shadow-2xl flex flex-col h-full border border-border/60">
                {/* Image Section */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <OptimizedImage
                    src={leader.image}
                    alt={leader.name}
                    containerClassName="h-full w-full"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Badge & Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                    <span className="mb-2.5 inline-block rounded-full bg-gold/90 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-navy shadow-lg backdrop-blur-sm">
                      {leader.title}
                    </span>
                    <h3 className="mb-1 font-serif text-xl font-bold leading-tight group-hover:text-gold transition-colors line-clamp-2">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-medium text-white/80 line-clamp-1">{leader.position}</p>
                  </div>
                </div>

                {/* Dark Brown Buttons Container */}
                <div className="flex flex-col bg-navy border-t-2 border-gold/30 mt-auto">
                  {leader.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="flex items-center justify-between px-6 py-3.5 text-sm font-semibold text-white/90 hover:text-gold hover:bg-white/5 transition-all duration-300 border-b border-white/10 last:border-b-0 group/link"
                    >
                      <span className="tracking-wide">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-gold transform transition-transform duration-300 group-hover/link:translate-x-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}