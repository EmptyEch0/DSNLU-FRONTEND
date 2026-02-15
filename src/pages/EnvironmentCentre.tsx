import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Leaf, ShieldCheck, Globe, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EnvironmentCentre = () => {
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
            <span className="font-medium text-gold">Environmental Law Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              Centre for Environmental Law & Climate Justice
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
        <section className="py-20 lg:py-32">
          <div className="container max-w-5xl space-y-24">
            
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none space-y-10"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-10 border-l-4 border-gold pl-6 uppercase tracking-wider">
                About the Centre
              </h2>
              <div className="relative p-10 rounded-3xl border bg-card shadow-sm overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
                   <Leaf className="h-32 w-32 text-green-600" />
                 </div>
                 <p className="text-muted-foreground leading-relaxed text-lg text-justify relative z-10">
                  The Centre for Environmental Law & Climate Justice at DSNLU is dedicated to promoting research, policy engagement, and academic discourse in environmental governance, climate change law, sustainability, and ecological justice. The Centre aims to integrate legal frameworks with environmental responsibility and global climate commitments, fostering awareness and research in emerging environmental challenges.
                 </p>
              </div>
            </motion.div>

            {/* Core Pillars (Added for Visual Balance) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: ShieldCheck, label: "Environmental Governance" },
                { icon: Globe, label: "Climate Change" },
                { icon: Scale, label: "Ecological Justice" },
                { icon: Leaf, label: "Sustainability" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 rounded-2xl border bg-card text-center transition-all hover:shadow-md hover:border-gold/30">
                  <div className="mb-4 p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-[#0f2d5c] uppercase text-xs tracking-widest leading-tight">{item.label}</h4>
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
                  <tbody className="divide-y text-muted-foreground font-medium">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. K. Sudha</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Faculty Member</td>
                      <td className="px-6 py-4">Dr. Rifat Khan</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={3}>Members</td>
                      <td className="px-6 py-4">Ms. Sherley Hepsiba D</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Ms. D. Aparna</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Kiran Kumari</td>
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

export default EnvironmentCentre;
