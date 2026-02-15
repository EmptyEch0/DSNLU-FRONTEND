import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  Scale, 
  Award,
  BookOpen
} from "lucide-react";

const objectives = [
  { icon: Scale, text: "To implement the reservation policy and welfare schemes of Govt. of India / UGC effectively." },
  { icon: CheckCircle2, text: "To provide a platform for redressal of grievances and offer academic guidance." },
  { icon: Lightbulb, text: "To organize workshops and sessions for skill enhancement and career development." },
  { icon: BookOpen, text: "To facilitate communication between the SC/ST community and university administration." },
];

const monitoringActivities = [
  { 
    title: "Admission Review", 
    icon: Users, 
    desc: "Periodic monitoring of the admission process to ensure strict adherence to reservation quotas for SC/ST students." 
  },
  { 
    title: "Scholarship Tracking", 
    icon: Award, 
    desc: "Overseeing the distribution and timely processing of various state and central government scholarship schemes." 
  },
];

const specialActivities = [
  { 
    title: "Remedial Classes", 
    icon: BookOpen, 
    desc: "Organizing supplementary sessions and tutorial classes to support academic performance and clarify legal concepts." 
  },
  { 
    title: "Career Awareness", 
    icon: Lightbulb, 
    desc: "Conducting seminars on judicial services, competitive exams, and internship opportunities specifically for SC/ST members." 
  },
  { 
    title: "Counseling Services", 
    icon: ShieldCheck, 
    desc: "Providing dedicated guidance and personal counseling to address academic or personal challenges faced by students." 
  },
];

const SCSTActivities = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="activities" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              {/* Objectives Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Core Objectives</h2>
                  <div className="divider-gold mx-auto" />
                  <p className="text-muted-foreground">The SC/ST Welfare Cell is guided by these foundational goals to ensure institutional equity.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {objectives.map((obj, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group border-gold/10"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-navy transition-colors">
                        <obj.icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-foreground italic group-hover:not-italic transition-all">
                        {obj.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Activities Grid */}
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Monitoring Activities */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 flex-shrink-0 bg-gold rounded-full" />
                    <h3 className="font-serif text-2xl font-bold">Monitoring Activities</h3>
                  </div>
                  <div className="grid gap-6">
                    {monitoringActivities.map((act, index) => (
                      <div key={index} className="flex gap-5 p-6 rounded-xl border bg-card hover:border-gold/30 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0">
                          <act.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-foreground">{act.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Special Initiatives */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 flex-shrink-0 bg-navy rounded-full" />
                    <h3 className="font-serif text-2xl font-bold">Special Initiatives</h3>
                  </div>
                  <div className="grid gap-6">
                    {specialActivities.map((act, index) => (
                      <div key={index} className="flex gap-5 p-6 rounded-xl border bg-card hover:border-navy/20 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-gold/5 text-gold flex items-center justify-center shrink-0">
                          <act.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-foreground">{act.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{act.desc}</p>
                        </div>
                      </div>
                    ))}
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

export default SCSTActivities;
