import { motion } from "framer-motion";
import { ArrowRight, Scale, BookOpen, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const highlights = [
  { icon: Scale, title: "Constitutional Values", description: "Upholding the principles of justice, liberty, and equality" },
  { icon: BookOpen, title: "Academic Excellence", description: "Rigorous curriculum designed by eminent legal scholars" },
  { icon: Users, title: "Distinguished Faculty", description: "Renowned professors and visiting judges from across India" },
  { icon: Trophy, title: "National Recognition", description: "Consistently ranked among top law universities in India" },
];

export function AboutSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
              About DSNLU
            </span>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              A Premier Institution of{" "}
              <span className="text-gradient-gold">Legal Learning</span>
            </h2>
            <div className="divider-gold mb-8" />
            
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Damodaram Sanjivayya National Law University (DSNLU) was established in 2008 by the 
              Government of Andhra Pradesh. Named after the illustrious Shri Damodaram Sanjivayya, 
              former Chief Minister of Andhra Pradesh and Union Minister, the university embodies 
              his vision of social justice and legal empowerment.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Located in the picturesque city of Visakhapatnam, DSNLU is committed to excellence in 
              legal education, research, and public service. The university offers a holistic learning 
              environment that prepares students for distinguished careers in law and justice.
            </p>

            <Button asChild className="group bg-primary text-primary-foreground hover:bg-navy-light">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}