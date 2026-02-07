import { motion } from "framer-motion";
import chancellorImg from "@/assets/chancellor.jpg";
import vcImg from "@/assets/vice-chancellor.jpg";

const leaders = [
  {
    name: "Hon'ble Justice Sri S. Abdul Nazeer",
    title: "Chancellor",
    description: "Hon'ble Governor of Andhra Pradesh",
    image: chancellorImg,
  },
  {
    name: "Prof. (Dr.) V. Balakista Reddy",
    title: "Vice-Chancellor",
    description: "Distinguished Professor of Law",
    image: vcImg,
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            Leadership
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Our Distinguished Leadership
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Guided by eminent jurists and academicians committed to excellence in legal education
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg"
            >
              <div className="flex flex-col items-center p-8 text-center md:flex-row md:items-start md:text-left">
                <div className="relative mb-6 md:mb-0 md:mr-8">
                  <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-gold/20">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold">
                    <span className="font-serif text-lg font-bold text-navy">★</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-gold">
                    {leader.title}
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-bold text-foreground md:text-2xl">
                    {leader.name}
                  </h3>
                  <p className="text-muted-foreground">{leader.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold to-gold-dark" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}