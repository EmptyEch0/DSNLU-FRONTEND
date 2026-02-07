import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: "B.A. LL.B (Hons.)",
    duration: "5 Years",
    intake: "180 Seats",
    type: "Undergraduate",
    description: "A comprehensive integrated program combining arts and law education, preparing students for a distinguished career in legal profession.",
    highlights: ["CLAT Admission", "Integrated Curriculum", "Moot Court Training"],
  },
  {
    title: "LL.M",
    duration: "2 Years",
    intake: "40 Seats",
    type: "Postgraduate",
    description: "Advanced legal education with specializations in Constitutional Law, Business Law, and Criminal Law for aspiring legal scholars.",
    highlights: ["Specializations Available", "Research Focus", "Expert Faculty"],
  },
  {
    title: "Ph.D in Law",
    duration: "3-5 Years",
    intake: "Limited",
    type: "Doctoral",
    description: "Rigorous doctoral research program for those seeking to contribute to legal scholarship and academia.",
    highlights: ["Original Research", "Publication Support", "Academic Mentorship"],
  },
];

export function ProgramsSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            Academic Programs
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Programs of Study
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            World-class legal education programs designed to produce competent legal professionals
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:border-gold/30 hover:shadow-lg"
            >
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-gold/10 transition-transform group-hover:scale-150" />
              
              <span className="relative mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {program.type}
              </span>
              
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {program.title}
              </h3>
              
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gold" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gold" />
                  {program.intake}
                </span>
              </div>
              
              <p className="mb-6 text-muted-foreground">
                {program.description}
              </p>
              
              <div className="mb-6 space-y-2">
                {program.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-gold" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="group/btn w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}