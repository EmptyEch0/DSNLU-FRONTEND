import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { Trophy, Users, ShieldCheck, Quote, Activity } from "lucide-react";

const SportsAbout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="about" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              
              {/* Mission Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Our Mission</h2>
                  <div className="divider-gold mx-auto" />
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div className="bg-gold/5 rounded-3xl p-8 md:p-12 border border-gold/20 relative">
                    <div className="absolute top-0 left-8 -translate-y-1/2 bg-gold text-white p-3 rounded-xl shadow-lg">
                      <Quote className="h-6 w-6" />
                    </div>
                    <p className="font-serif text-2xl italic leading-relaxed text-navy mb-8">
                      "The Sports Committee has been founded with a vision to develop the sporting culture in the University."
                    </p>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>
                        Elevating sports culture is our primary objective. We believe that athletic participation is essential for the holistic development of students, fostering discipline, resilience, and a competitive spirit that translates into professional excellence.
                      </p>
                      <p>
                        Our motto is to showcase sporting skills and provide a platform where talent meets opportunity. Through year-round events and participation in national fests, we ensure that DSNLU is recognized in the collegiate sporting arena.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      { 
                        title: "Elevating Sports Culture", 
                        desc: "Promoting various sporting events and ensuring maximum student engagement.",
                        icon: Activity 
                      },
                      { 
                        title: "Holistic Development", 
                        desc: "Building leadership, teamwork, and time-management skills through active sports involvement.",
                        icon: ShieldCheck 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Committee Structure */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 flex-shrink-0 bg-navy rounded-full" />
                  <h3 className="font-serif text-3xl font-bold">Committee Structure</h3>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      The Sports Committee is a well-structured body comprising **12 dedicated student members** who manage the logistics and coordination of all sporting activities.
                    </p>
                    <p>
                      The committee functions under the expert guidance of the **Physical Director** and is supervised by a **Faculty Advisor**. This collaborative structure ensures that events are professional, fair, and aligned with the university's academic calendar.
                    </p>
                    <p>
                      Operating year-round, the committee manages everything from daily practice sessions to organizing large-scale inter-mural tournaments and selecting teams for national fests.
                    </p>
                  </div>

                  <div className="bg-navy rounded-3xl p-10 text-white shadow-elegant relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 pointer-events-none transition-transform group-hover:scale-[1.7]">
                      <Users className="h-32 w-32" />
                    </div>
                    <div className="relative z-10 space-y-6 text-center">
                      <div className="h-20 w-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto text-gold">
                        <ShieldCheck className="h-10 w-10" />
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-gold">Building Discipline, Teamwork & Leadership Through Sports</h4>
                      <p className="text-primary-foreground/80 leading-relaxed italic">
                        Our committee members are not just organizers; they are leaders who cultivate an environment of mutual respect and sporting excellence.
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

export default SportsAbout;
