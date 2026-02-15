import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Registrar = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Leadership & Governance</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Registrar</span>
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
              Leadership & Governance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Registrar (I/c)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Registrar Profile Section */}
        <section id="profile" className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              {/* Left Side: Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col items-center"
              >
                <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white transition-all duration-500 hover:shadow-2xl">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src="https://dsnlu.ac.in/storage/2024/08/Dr.-Viswachandra-Nath-M-.png"
                    alt="Dr. Viswachandra Nath Madasu"
                    className="aspect-[3/4] w-full max-w-sm object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Dr. Viswachandra Nath Madasu
                  </h2>
                  <p className="mt-2 text-gold font-medium uppercase tracking-wider">Registrar-In Charge</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    DSNLU, Visakhapatnam
                  </p>
                </div>
              </motion.div>

              {/* Right Side: Message */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-8"
              >
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold rounded-full opacity-50" />
                  <div className="pl-8">
                    <h3 className="font-serif text-3xl font-bold text-foreground mb-6">Message from the Registrar</h3>
                    <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-justify">
                      <p>
                        Education integrates academic and professional learning to build a strong foundation for future professionals. At Damodaram Sanjivayya National Law University, we believe that good education fosters personal development in students and contributes significantly to national growth.
                      </p>
                      <p>
                        In this era of rapid technological advancements, students require catalysts to stimulate their potential and appropriate guidance to make timely and correct choices. DSNLU's campus provides a pollution-free, premier environment for learning and research, supported by highly qualified and experienced faculty dedicated to academic excellence.
                      </p>
                      <p>
                        Our objective is to improve standards and achieve excellence in legal education. We understand that a university's core strength lies in its commitment to the overall development of both students and staff. DSNLU endeavors to equip students with essential life skills such as planning, organizing, team building, effective communication, and problem-solving, ensuring they are grounded in Indian cultural values while maintaining a global outlook.
                      </p>
                      <p className="font-serif font-bold text-foreground border-l-4 border-gold pl-4 py-2 bg-secondary/30 rounded-r-lg">
                        The vision of DSNLU is to transform individuals into personalities, making it an ideal place for academic pursuit and rewards.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Registrar;
