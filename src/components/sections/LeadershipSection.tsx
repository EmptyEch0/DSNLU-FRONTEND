import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const leaders = [
  {
    name: "Hon'ble Mr. Justice Pamidighantam Sri Narasimha",
    title: "Visitor",
    position: "Judge, Supreme Court of India",
    image: "https://dsnlu.ac.in/storage/2022/12/Justice-Shri-P.-Kodanda-Ramayya-234x300-1.jpg",
    links: [
      { label: "Visitor's Profile", href: "/visitor" },
    ],
  },
  {
    name: "Sri Justice Dhiraj Singh Thakur",
    title: "Chancellor",
    position: "The Hon'ble Chief Justice",
    image: "https://dsnlu.ac.in/storage/2023/07/Sri-Justice-Dhiraj-Singh-Thakur-2-2.jpg",
    links: [
      { label: "Chancellor's Message", href: "/chancellor" },
      { label: "Chancellor's Profile", href: "/chancellor" },
    ],
  },
  {
    name: "Prof. (Dr.) Dasari Surya Prakasa Rao",
    title: "Vice-Chancellor",
    position: "Vice-Chancellor, DSNLU",
    image: "https://dsnlu.ac.in/storage/2024/04/vcdsnlu.jpeg",
    links: [
      { label: "Vice-Chancellor's Message", href: "/vice-chancellor" },
      { label: "Vice-Chancellor's Profile", href: "/vice-chancellor" },
    ],
  },
  {
    name: "Dr. Viswachandra Nath Madasu",
    title: "Registrar (I/c)",
    position: "Registrar-In Charge, DSNLU",
    image: "https://dsnlu.ac.in/storage/2024/08/Dr.-Viswachandra-Nath-M-.png",
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
              transition={{ delay: index * 0.2 }}
              className="group flex flex-col"
            >
              {/* Leader Card */}
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-elegant transition-all duration-500 group-hover:shadow-2xl">
                {/* Image Section */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge & Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="mb-3 inline-block rounded-full bg-gold/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy shadow-lg backdrop-blur-sm">
                      {leader.title}
                    </span>
                    <h3 className="mb-1 font-serif text-2xl font-bold leading-tight group-hover:text-gold transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-medium text-white/80">{leader.position}</p>
                  </div>
                </div>

                {/* Dark Brown Buttons Container */}
                <div className="flex flex-col bg-navy border-t-2 border-gold/30">
                  {leader.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="group/link flex w-full items-center justify-between border-b border-gold/10 bg-[#2a1b15] px-8 py-5 text-gold transition-all duration-300 last:border-0 hover:bg-[#3d2920] hover:px-10"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">{link.label}</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-2" />
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Subtle accent bar */}
              <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-gold/30 transition-all duration-500 group-hover:w-24 group-hover:bg-gold" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}