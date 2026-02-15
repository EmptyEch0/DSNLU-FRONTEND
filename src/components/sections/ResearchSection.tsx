import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const researchAreas = [
  {
    icon: BookOpen,
    title: "Constitutional Law Research Centre",
    description: "Advanced research on constitutional matters and fundamental rights",
  },
  {
    icon: Globe,
    title: "Centre for International Law",
    description: "Studies on international treaties, humanitarian law, and global governance",
  },
  {
    icon: Users,
    title: "Centre for Human Rights",
    description: "Research on human rights jurisprudence and social justice",
  },
  {
    icon: Award,
    title: "Centre for Legal Aid",
    description: "Community service and access to justice initiatives",
  },
];

export function ResearchSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
              Research & Publications
            </span>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Advancing Legal Scholarship
            </h2>
            <div className="divider-gold mb-8" />
            
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              DSNLU is committed to fostering cutting-edge legal research that contributes to 
              the development of law and policy. Our research centres focus on contemporary 
              legal issues of national and international significance.
            </p>
            
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold">100+</div>
                <div className="text-sm text-muted-foreground">Publications</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold">25+</div>
                <div className="text-sm text-muted-foreground">Research Projects</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold">15+</div>
                <div className="text-sm text-muted-foreground">Conferences</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold">50+</div>
                <div className="text-sm text-muted-foreground">MoUs</div>
              </div>
            </div>

            <Button className="group bg-primary text-primary-foreground hover:bg-navy-light">
              Explore Research
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Research Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition-all hover:border-gold/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <area.icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="mb-1 font-serif text-lg font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-gold opacity-0 transition-all group-hover:opacity-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}