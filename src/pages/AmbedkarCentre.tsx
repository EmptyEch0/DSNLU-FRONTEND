import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Scale, Users, Gavel, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AmbedkarCentre = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Ambedkar Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541872703-74c5e443d1fe?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl"
            >
              AMBEDKAR CENTRE
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-center"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-10">
                About the Centre
              </h2>
              <div className="bg-secondary/10 p-10 rounded-3xl border shadow-sm relative overflow-hidden">
                 <Scale className="absolute -top-10 -right-10 h-40 w-40 text-[#0f2d5c] opacity-5" />
                 <p className="text-muted-foreground leading-relaxed text-lg italic text-justify">
                  The Ambedkar Centre at DSNLU is dedicated to promoting constitutional values, social justice, equality, and the protection of marginalized communities in alignment with the vision of Dr. B.R. Ambedkar. The Centre encourages research, discourse, and policy engagement in areas concerning social justice, constitutional governance, and human rights.
                 </p>
              </div>
            </motion.div>

            {/* Core Values / Themes (Added for Better Layout) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: ShieldCheck, label: "Social Justice" },
                { icon: Gavel, label: "Constitutional Values" },
                { icon: Scale, label: "Equality" },
                { icon: Users, label: "Human Rights" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-2xl border bg-card text-center hover:shadow-md transition-all group hover:border-gold/30">
                  <div className="mb-4 p-3 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif font-bold text-[#0f2d5c] uppercase text-xs tracking-widest">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Committee
              </h2>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. A. Nageswara Rao</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Faculty Member</td>
                      <td className="px-6 py-4">Dr. M. Viswachandranath</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={3}>Members</td>
                      <td className="px-6 py-4">Ms. Sherley Hepsiba D</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Ms. Gali Parivartana</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Ms. D. Aparna</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AmbedkarCentre;
