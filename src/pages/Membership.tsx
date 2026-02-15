import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const memberships = [
  {
    logo: "https://dsnlu.ac.in/storage/2023/01/Indian_Law_Institute_Logo.png",
    title: "Indian Law Institute (ILI), New Delhi",
    description: "The Indian Law Institute (ILI) is a premier institution dedicated to advanced legal research, training, and publication. Membership enhances academic collaboration, research initiatives, and institutional excellence."
  },
  {
    logo: "https://dsnlu.ac.in/storage/2023/01/AIU_Logo.png",
    title: "Association of Indian Universities (AIU), New Delhi",
    description: "AIU promotes coordination among universities in India and ensures academic equivalence, collaboration, and policy development in higher education."
  },
  {
    logo: "https://dsnlu.ac.in/storage/2023/01/ISIL_Logo.png",
    title: "Indian Society of International Law (ISIL), New Delhi",
    description: "ISIL fosters research and study in international law and global legal developments, strengthening international academic engagement."
  }
];

const Membership = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold text-xs sm:text-sm">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-muted-foreground text-xs sm:text-sm">Academics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold truncate text-xs sm:text-sm">Membership</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
            >
              Academic Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Membership
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Introduction Section */}
        <section className="pt-16 pb-8 lg:pt-24 lg:pb-12 text-center">
          <div className="container max-w-4xl px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl font-bold text-foreground md:text-3xl"
            >
              The University is a Member of the following institutions:
            </motion.h2>
          </div>
        </section>

        {/* Cards Section */}
        <section className="pb-24 lg:pb-32">
          <div className="container max-w-7xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {memberships.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative flex flex-col items-center p-8 bg-card border rounded-2xl shadow-elegant transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  <div className="mb-8 flex h-40 w-full items-center justify-center p-4">
                    <motion.img
                      src={item.logo}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="mb-4 font-serif text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
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

export default Membership;
