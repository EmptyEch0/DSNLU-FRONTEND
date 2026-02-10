import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const vcImageUrl = "https://dsnlu.ac.in/storage/2024/04/vcdsnlu.jpeg";
const vcCvUrl = "https://dsnlu.ac.in/storage/2024/07/Prof_-D_S_Prakasa-Rao_CV.pdf";

export function VCMessageSection() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            From the Vice-Chancellor
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Vice-Chancellor's Message
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:col-span-2"
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={vcImageUrl}
                alt="Prof. (Dr.) Dasari Surya Prakasa Rao, Vice-Chancellor"
                className="aspect-[3/4] w-full max-w-xs object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-16">
                <h3 className="font-serif text-lg font-bold text-primary-foreground">
                  Prof. (Dr.) Dasari Surya Prakasa Rao
                </h3>
                <p className="text-sm text-gold">Vice-Chancellor</p>
                <p className="text-xs text-primary-foreground/70">
                  Damodaram Sanjivayya National Law University
                </p>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It gives me immense pleasure to welcome you to the Damodaram Sanjivayya National Law University, 
                Visakhapatnam — an institution established by the Government of Andhra Pradesh to create a centre 
                of excellence in legal education and research.
              </p>
              <p>
                Named after the great visionary and former Chief Minister of Andhra Pradesh, Shri Damodaram 
                Sanjivayya, our university carries forward his legacy of social justice, equality, and 
                empowerment through the transformative power of legal education.
              </p>
              <p>
                We are committed to producing legal professionals who are not only academically 
                distinguished but are also ethically grounded, socially aware, and capable of contributing 
                meaningfully to the justice delivery system of our nation.
              </p>
              <p>
                Our faculty comprises distinguished scholars, and our curriculum is designed to meet 
                global standards while remaining rooted in the Indian constitutional framework. Through 
                moot courts, legal aid clinics, internships, and research centres, we provide a holistic 
                learning experience.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-navy-light">
                <Link to="/vice-chancellor">
                  Read Full Message <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-navy">
                <a href={vcCvUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> About the Vice-Chancellor
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
