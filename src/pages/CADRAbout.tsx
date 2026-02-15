import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Eye, Users, FileText, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CADRAbout = () => {
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
            <span className="font-medium text-gold">CADR - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              CENTRE FOR ALTERNATIVE DISPUTE RESOLUTION
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
            >
              Promoting excellence in ADR through research, training, and academia.
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-20">
            
            {/* Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8 border-l-4 border-gold pl-6">
                Introduction
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  ADR as a concept is an alternative to the formal legal system, providing a simplified, cost-effective, and less time-consuming mechanism for dispute resolution. The core of ADR lies in the flexibility it offers to the parties involved, encouraging settlement through mutual agreement.
                </p>
                <p>
                  Established with a vision to revolutionize the dispute resolution landscape, the Centre for Alternative Dispute Resolution (CADR) at DSNLU serves as a hub for academic and professional engagement in the field of mediation, arbitration, and conciliation.
                </p>
                <p>
                  The Centre draws inspiration from the long-standing tradition of Lok Adalats and other indigenous dispute resolution mechanisms in India, aiming to integrate traditional wisdom with modern global practices. We are committed to fostering a culture of peace and professional excellence in every aspect of legal practice.
                </p>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] mb-4">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a premier institution dedicated to the advancement of Alternative Dispute Resolution through rigorous research, innovative teaching, and meaningful social engagement, fostering a future where justice is accessible and collaborative.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] mb-4">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to promote ADR culture through specialized training, promote research in conflict resolution, and equip students and practitioners with the necessary tools to handle complex disputes in a globalized legal environment.
                </p>
              </motion.div>
            </div>

            {/* Objectives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Objectives
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Policy-oriented research in ADR",
                  "Government assistance in drafting ADR regulations",
                  "Specialized Training programs for professionals",
                  "Hands-on Experiential learning for students",
                  "Organizing Seminars & International workshops",
                  "Collaboration with leading ADR institutions",
                  "Providing Mediation & Arbitration advisory",
                  "Industry-focused professional training",
                  "Promote a culture of ADR in academia",
                  "Expert Student committee mentorship"
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                    <Target className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm font-medium text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
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
                      <td className="px-6 py-4 font-medium text-foreground bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. P. Jogi Naidu</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-foreground bg-secondary/20" rowSpan={5}>Faculty Members</td>
                      <td className="px-6 py-4">Dr. N. Bhagyalakshmi</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. A. Nageswara Rao</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Mr. R. Vishnu Kumar</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. I. Durga Prasad</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. R. Deepthi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Publication Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6">
                Publications
              </h2>
              <div className="group relative max-w-md overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-gold/30">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-gold/20 bg-gold/5 text-gold">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-gold transition-colors">
                      JALAF Volume 1, Issue 1
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The Arbitration Journal of DSNLU
                    </p>
                    <button className="text-xs font-bold uppercase tracking-widest text-gold hover:text-[#0f2d5c] transition-colors">
                      View Details (Coming Soon)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CADRAbout;
