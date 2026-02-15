import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LSCHeader } from "@/components/layout/LSCHeader";
import { motion } from "framer-motion";
import { Scale, ShieldCheck, Heart, BookOpen, Quote } from "lucide-react";

const LSCAbout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LSCHeader activeTab="about" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              
              {/* Constitutional Foundation */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gold/5 rounded-3xl p-8 md:p-12 border border-gold/20"
              >
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-gold text-white p-3 rounded-xl shadow-lg">
                  <Scale className="h-6 w-6" />
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy text-center mb-8">
                    Constitutional Foundation
                  </h2>
                  <div className="relative pl-8 border-l-4 border-gold">
                    <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-foreground/80 lowercase first-letter:uppercase">
                      "The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities."
                    </p>
                    <p className="mt-6 font-bold text-gold tracking-widest text-sm uppercase">
                      — Article 39A, Constitution of India
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Vision & Purpose */}
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                    <ShieldCheck className="h-4 w-4" /> Goals & Vision
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-foreground">Vision & Purpose</h3>
                  <div className="divider-gold" />
                  <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                    <p>
                      The Legal Services Committee (LSC) at DSNLU is dedicated to the vision of a society where justice is accessible to every individual, regardless of their socio-economic standing. We believe that legal education is incomplete without a commitment to social responsibility.
                    </p>
                    <p>
                      Our purpose is to bridge the gap between the complex legal system and the common citizen. We strive to provide a voice for the vulnerable and ensure that legal aid is not just a constitutional promise but a residing reality.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-navy rounded-3xl p-8 md:p-12 text-white shadow-elegant relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 pointer-events-none transition-transform group-hover:scale-[1.7]">
                    <Heart className="h-32 w-32" />
                  </div>
                  <ul className="space-y-6 relative z-10">
                    {[
                      { icon: Heart, title: "Free Legal Aid", desc: "Commitment to providing guidance and assistance to the needy." },
                      { icon: ShieldCheck, title: "Support", desc: "Standing by vulnerable groups to protect their fundamental rights." },
                      { icon: BookOpen, title: "Awareness", desc: "Promoting legal literacy as a tool for empowerment." },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gold">{item.title}</h4>
                          <p className="text-primary-foreground/80 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Role in Legal Education */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center max-w-4xl mx-auto space-y-8"
              >
                <div className="h-0.5 w-full bg-border" />
                <h3 className="font-serif text-3xl font-bold">Role in Legal Education</h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    { title: "Practical Exposure", desc: "Students engage with real-world legal issues beyond textbooks." },
                    { title: "Skill Building", desc: "Strengthening counseling, drafting, and advocacy skills." },
                    { title: "Community Bonding", desc: "Fostering empathy and a sense of duty towards the society." }
                  ].map((role, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-1.5 w-12 bg-gold mx-auto rounded-full" />
                      <h4 className="font-bold text-navy">{role.title}</h4>
                      <p className="text-sm text-muted-foreground">{role.desc}</p>
                    </div>
                  ))}
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

export default LSCAbout;
