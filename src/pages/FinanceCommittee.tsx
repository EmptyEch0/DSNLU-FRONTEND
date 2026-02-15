import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinanceCommittee = () => {
  const members = [
    { id: 1, name: "Prof. (Dr.) D. Surya Prakasa Rao", designation: "Vice-Chancellor, DSNLU" },
    { id: 2, name: "Finance Secretary", designation: "Government of Andhra Pradesh" },
    { id: 3, name: "Registrar", designation: "DSNLU" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/about" className="transition-colors hover:text-gold">About DSNLU</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Authorities</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Finance Committee</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Authorities
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Finance Committee
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Committee Members Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground uppercase">FINANCE COMMITTEE</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Member</th>
                        <th className="px-6 py-4">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {members.map((member) => (
                        <tr key={member.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{member.id}</td>
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold whitespace-nowrap">{member.name}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground leading-relaxed">
                            {member.designation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default FinanceCommittee;
