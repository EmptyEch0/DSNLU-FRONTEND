import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark, User, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RTIAct = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compliance & Media</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">RTI Act</span>
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
              Compliance & Media
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              RTI ACT
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              {/* Payment Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 rounded-full bg-gold" />
                  <h2 className="font-serif text-3xl font-bold text-foreground">1. Payment of RTI Fees</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    Applicants seeking information under the Right to Information Act, 2005 may pay the prescribed fee of ₹10/- (Rupees Ten only) in the form of a Demand Draft / Indian Postal Order / Banker's Cheque drawn in favor of "The Registrar, Damodaram Sanjivayya National Law University", payable at Visakhapatnam.
                  </p>
                  <p>
                    Alternatively, the fee can be paid in cash at the University's Accounts Department during working hours. For information involving additional processing costs (such as photocopies), further fees will be communicated as per the RTI Rules.
                  </p>
                </div>
              </motion.div>

              {/* Contact Blocks */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Public Information Officer */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border bg-card p-8 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">Public Information Officer</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <User className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Name</p>
                        <p className="font-medium text-foreground">Dr. Viswachandra Nath Madasu</p>
                        <p className="text-sm text-muted-foreground">Assistant Professor & PIO</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Mail className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Email</p>
                        <a href="mailto:pio@dsnlu.ac.in" className="font-medium text-foreground hover:text-gold transition-colors">pio@dsnlu.ac.in</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium text-foreground">0891-2812000 (Extn: 2005)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Address</p>
                        <p className="text-sm text-foreground">DSNLU, Nyayaprastha, Sabbavaram, Visakhapatnam - 531035, A.P., India</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* First Appellate Authority */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border bg-card p-8 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">First Appellate Authority</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <User className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Name</p>
                        <p className="font-medium text-foreground">Prof. (Dr.) D. Surya Prakasa Rao</p>
                        <p className="text-sm text-muted-foreground">Vice-Chancellor & FAA</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Mail className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Email</p>
                        <a href="mailto:vc@dsnlu.ac.in" className="font-medium text-foreground hover:text-gold transition-colors">vc@dsnlu.ac.in</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium text-foreground">0891-2812000 (Board)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Address</p>
                        <p className="text-sm text-foreground">DSNLU, Nyayaprastha, Sabbavaram, Visakhapatnam - 531035, A.P., India</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RTIAct;
