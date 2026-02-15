import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LSCHeader } from "@/components/layout/LSCHeader";
import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingCart, 
  Home, 
  ShieldAlert, 
  UserCircle, 
  Scale, 
  Feather, 
  Handshake, 
  BookOpen, 
  Globe,
  Plus
} from "lucide-react";

const activities = [
  { icon: Scale, title: "General Legal Services", desc: "Providing basic legal guidance and procedural advice to citizens." },
  { icon: ShoppingCart, title: "Consumer Protection", desc: "Educating and assisting consumers regarding their rights and redressal." },
  { icon: Home, title: "Family Law", desc: "Addressing issues related to marriage, divorce, and domestic concerns." },
  { icon: ShieldAlert, title: "Human Rights", desc: "Protecting individual liberties and monitoring human rights violations." },
  { icon: UserCircle, title: "Women Protection Laws", desc: "Empowering women through knowledge of safety and equality laws." },
  { icon: Users, title: "Senior Citizen Welfare", desc: "Focusing on the rights and benefits available to elderly citizens." },
  { icon: Feather, title: "Tribal Rights", desc: "Assisting tribal communities in protecting their land and cultural rights." },
  { icon: Handshake, title: "Arbitration & Mediation", desc: "Promoting out-of-court settlements and dispute resolution." },
  { icon: Globe, title: "Constitutional Rights", desc: "Raising awareness about fundamental rights and duties of citizens." },
  { icon: BookOpen, title: "Contemporary Legal Issues", desc: "Discussing and analyzing current law transforms and social impacts." },
];

const LSCActivities = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LSCHeader activeTab="activities" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-16">
              
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">Awareness & Outreach Initiatives</h2>
                <div className="divider-gold mx-auto" />
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  Our outreach programs cover a primitive range of legal aspects, ensuring no segment of society is left unaware of their rights.
                </p>
              </div>

              {/* Activities Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-8 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-lg transition-all flex gap-6"
                  >
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors">
                      <activity.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-foreground group-hover:text-gold transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {activity.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Impact Stat Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 p-8 rounded-3xl bg-navy text-white flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
              >
                <div className="space-y-2">
                  <h4 className="text-gold font-bold uppercase tracking-widest text-sm">Community Outreach Impact</h4>
                  <p className="text-primary-foreground/80 max-w-xl">
                    Since its inception, LSC has reached thousands of citizens through legal aid clinics and awareness camps in rural and urban areas.
                  </p>
                </div>
                <div className="flex gap-12 shrink-0">
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold text-gold flex items-center justify-center">50<Plus className="h-6 w-6" /></div>
                    <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mt-1">Villages Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold text-gold flex items-center justify-center">100<Plus className="h-6 w-6" /></div>
                    <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mt-1">Clinics Conducted</div>
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

export default LSCActivities;
