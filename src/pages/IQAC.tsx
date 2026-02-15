import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, CheckCircle2, Users, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IQAC = () => {
  const functions = [
    "Development and application of quality benchmarks/parameters for various academic and administrative activities of the institution.",
    "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.",
    "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes.",
    "Dissemination of information on various quality parameters of higher education.",
    "Organization of inter and intra institutional workshops, seminars on quality related themes and promotion of quality circles.",
    "Documentation of the various programs/activities leading to quality improvement.",
    "Acting as a nodal agency of the Institution for coordinating quality-related activities, including adoption and dissemination of best practices.",
    "Development and maintenance of institutional database through MIS for the purpose of maintaining/enhancing the institutional quality.",
    "Development of Quality Culture in the institution.",
    "Preparation of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC, to be submitted to NAAC.",
  ];

  const naacCommittee = [
    { name: "Prof. (Dr.) D. Surya Prakasa Rao", role: "Chairperson" },
    { name: "Dr. Viswachandra Nath Madasu", role: "Director/Coordinator" },
    { name: "Dr. P. Sree Sudha", role: "Member" },
    { name: "Dr. S. K. Bose", role: "Member" },
    { name: "Dr. P. Jogi Naidu", role: "Member" },
    { name: "Dr. B. Neelima", role: "Member" },
  ];

  const iqacCommittee = [
    { name: "Prof. (Dr.) D. Surya Prakasa Rao", role: "Vice-Chancellor & Chairperson" },
    { name: "Dr. Viswachandra Nath Madasu", role: "Registrar (I/c) & Member" },
    { name: "Dr. P. Sree Sudha", role: "Associate Professor & IQAC Coordinator" },
    { name: "Dr. S. K. Bose", role: "Associate Professor & Member" },
    { name: "Dr. P. Jogi Naidu", role: "Assistant Professor & Member" },
    { name: "Shri. B. Mastan", role: "Finance Officer & Member" },
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
            <span className="text-foreground">Compliance & Media</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">IQAC</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
            >
              Compliance & Media
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              IQAC
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 prose prose-lg max-w-none text-muted-foreground"
            >
              <div className="flex items-center gap-4 not-prose">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Award className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground m-0">Introduction</h2>
              </div>
              <p>
                The Internal Quality Assurance Cell (IQAC) of Damodaram Sanjivayya National Law University (DSNLU) was established to maintain and enhance the quality of education and administrative processes. In pursuance of the National Assessment and Accreditation Council (NAAC) guidelines, the IQAC at DSNLU acts as a catalytic agent in the university's efforts towards academic excellence.
              </p>
              <p>
                The primary aim of IQAC is to develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution. It promotes measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Functions Section */}
        <section className="bg-secondary/30 py-16 lg:py-24 border-y">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Functions of IQAC</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {functions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-6 rounded-2xl bg-card border shadow-sm transition-all hover:shadow-md hover:border-gold/30 group"
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Committee Tables */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="space-y-20">
              {/* NAAC Committee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">NAAC Committee</h2>
                </div>
                <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-8 py-5">Name</th>
                        <th className="px-8 py-5">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {naacCommittee.map((member, index) => (
                        <tr key={index} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-8 py-5 font-bold text-foreground group-hover:text-gold">{member.name}</td>
                          <td className="px-8 py-5 text-muted-foreground group-hover:text-foreground">{member.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* IQAC Committee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">IQAC Committee</h2>
                </div>
                <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-8 py-5">Name</th>
                        <th className="px-8 py-5">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {iqacCommittee.map((member, index) => (
                        <tr key={index} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-8 py-5 font-bold text-foreground group-hover:text-gold">{member.name}</td>
                          <td className="px-8 py-5 text-muted-foreground group-hover:text-foreground">{member.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default IQAC;
