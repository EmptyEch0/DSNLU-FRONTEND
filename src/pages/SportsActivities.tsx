import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { 
  Dribbble, 
  Flag, 
  Target, 
  Timer, 
  Users, 
  Medal,
  Activity
} from "lucide-react";

// Lucide doesn't have specific icons for all sports, so we use appropriate alternatives
const sports = [
  { icon: Activity, title: "Football", desc: "Team-driven turf matches and strategic training." },
  { icon: Activity, title: "Cricket", desc: "Intra-mural leagues and university team practices." },
  { icon: Dribbble, title: "Basketball", desc: "High-energy court sessions and tactical drills." },
  { icon: Activity, title: "Volleyball", desc: "Skill-focused games involving power and teamwork." },
  { icon: Activity, title: "Throwball", desc: "Popular women's sport fostering speed and agility." },
  { icon: Activity, title: "Table Tennis", desc: "Fast-paced indoor sport requiring precision." },
  { icon: Activity, title: "Lawn Tennis", desc: "Outdoor court games for endurance and skill." },
  { icon: Activity, title: "Badminton", desc: "Competitive matches in singles and doubles." },
  { icon: Target, title: "Chess", desc: "Strategic mental sport involving deep planning." },
  { icon: Timer, title: "Carrom", desc: "Traditional indoor sport for focus and accuracy." },
];

const SportsActivities = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="activities" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">Intra-Mural & Inter-University Activities</h2>
                <div className="divider-gold mx-auto" />
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  DSNLU offers a diverse range of sports, providing every student with an opportunity to excel in their chosen field.
                </p>
              </div>

              {/* Sports Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {sports.map((sport, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-xl transition-all text-center space-y-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mx-auto group-hover:bg-gold group-hover:text-navy transition-colors">
                      <sport.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-gold transition-colors">
                        {sport.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-2 line-clamp-2">
                        {sport.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Inter-University Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-navy rounded-3xl p-8 md:p-12 text-white shadow-elegant"
              >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                      <Flag className="h-4 w-4" /> Global Representation
                    </div>
                    <h3 className="font-serif text-3xl font-bold">Inter-University Participation</h3>
                    <p className="text-primary-foreground/80 leading-relaxed text-lg">
                      Our university teams are selected through rigorous trials and participate in prestigious national law university sports fests across the country.
                    </p>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    {[
                      { icon: Users, title: "Team Selection", desc: "Transparent trials to select the best talent for representation." },
                      { icon: Medal, title: "Participation", desc: "DSNLU regularly competes in fests like Invicta, Magnus, and Viraj." },
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                         <item.icon className="h-8 w-8 text-gold" />
                         <h4 className="font-bold text-gold uppercase tracking-tight text-sm">{item.title}</h4>
                         <p className="text-xs text-primary-foreground/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
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

export default SportsActivities;
