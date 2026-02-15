import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { Eye, Target, Award } from "lucide-react";

const SCSTAbout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="about" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content - Left 2 Columns */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                    Introduction to SC / ST Welfare Cell
                  </h2>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                      The Scheduled Castes (SC) and Scheduled Tribes (ST) Welfare Cell at Damodaram Sanjivayya National Law University was established to ensure the effective implementation of the reservation policy and to oversee the welfare of SC/ST students and staff.
                    </p>
                    <p>
                      As a premier legal institution named after Shri Damodaram Sanjivayya, who championed social justice, the university is deeply committed to providing an inclusive and supportive environment. The cell acts as a dedicated body to address grievances, provide guidance, and foster academic and professional growth for members of these communities.
                    </p>
                    <p>
                      Our primary objective is to eliminate any form of discrimination and to provide equal opportunities in all spheres of university life, ensuring that every individual can strive for excellence with dignity and respect.
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 mt-12">
                  <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <Award className="h-10 w-10 text-gold mb-4" />
                    <h3 className="font-bold text-xl mb-2">Equality</h3>
                    <p className="text-muted-foreground">Upholding the constitutional mandate of equal opportunity for all students.</p>
                  </div>
                  <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <Award className="h-10 w-10 text-gold mb-4" />
                    <h3 className="font-bold text-xl mb-2">Integrity</h3>
                    <p className="text-muted-foreground">Maintaining transparent and fair administrative processes for welfare initiatives.</p>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar Cards - Right 1 Column */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Vision Card */}
                <div className="rounded-2xl border-2 border-gold/20 bg-white p-8 shadow-elegant relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Eye className="h-24 w-24 text-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-3">
                    <Eye className="h-6 w-6 text-gold" /> Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10 italic">
                    "To create a truly inclusive academic environment where students from Scheduled Castes and Scheduled Tribes can achieve their highest potential without barriers, guided by the principles of social justice and equity."
                  </p>
                </div>

                {/* Mission Card */}
                <div className="rounded-2xl border-2 border-navy/10 bg-navy text-white p-8 shadow-elegant relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-white">
                    <Target className="h-24 w-24" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gold mb-6 flex items-center gap-3">
                    <Target className="h-6 w-6 text-gold" /> Mission
                  </h3>
                  <ul className="space-y-4 text-primary-foreground/90 relative z-10">
                    <li className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>To implement the reservation policy and welfare schemes of Govt. of India / UGC effectively.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>To provide a platform for redressal of grievances and offer academic guidance.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>To organize workshops and sessions for skill enhancement and career development.</span>
                    </li>
                  </ul>
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

export default SCSTAbout;
