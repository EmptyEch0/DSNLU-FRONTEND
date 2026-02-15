import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProfessorEmeritusListing = () => {
  const emeritusProfiles = [
    {
      name: "Hon'ble Justice D.V.S.S. Somayajulu",
      title: "Former Judge, High Court of A.P.",
      subtitle: "Member – General Council, Executive Council & Academic Council, DSNLU",
      image: "https://dsnlu.ac.in/storage/2024/01/DVVS.jpg",
      href: "/people/professor-emeritus/dvss-somayajulu"
    }
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
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Professor Emeritus</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Our People
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Professor Emeritus
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Profiles Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="space-y-12">
              {emeritusProfiles.map((profile, index) => (
                <motion.div
                  key={profile.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-card shadow-elegant transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Left: Image */}
                  <div className="md:w-1/3 relative h-80 md:h-auto overflow-hidden bg-muted">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-gold transition-colors">
                        {profile.name}
                      </h3>
                      <p className="mt-2 text-gold font-medium uppercase tracking-wider text-sm">
                        {profile.title}
                      </p>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {profile.subtitle}
                      </p>
                    </div>

                    <Link
                      to={profile.href}
                      className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#2a1b15] px-6 py-3 text-sm font-bold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-[#3d2920] hover:gap-3 group/btn shadow-lg"
                    >
                      View Bio Data
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
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

export default ProfessorEmeritusListing;
