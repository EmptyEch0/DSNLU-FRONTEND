import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Visitor = () => {
  const visitors = [
    { id: 1, name: "Hon'ble Sri Justice N.V. Ramana", designation: "Judge Supreme Court of India", from: "24.04.2021", to: "23.06.2021" },
    { id: 2, name: "Hon'ble Sri Justice L. Nageswara Rao", designation: "Judge Supreme Court of India", from: "24.06.2021", to: "11.08.2022" },
    { id: 3, name: "Hon'ble Mr. Justice Pamidighantam Sri Narasimha", designation: "Judge, Supreme Court of India", from: "12.08.2022", to: "Present" },
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
            <span className="text-foreground">Leadership & Governance</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Visitor</span>
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
              Leadership & Governance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Visitor
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Visitor Profile Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Left Side: Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col items-center"
              >
                <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src="https://dsnlu.ac.in/storage/2022/12/Justice-Shri-P.-Kodanda-Ramayya-234x300-1.jpg"
                    alt="Hon'ble Mr. Justice Pamidighantam Sri Narasimha"
                    className="aspect-[3/4] w-full max-w-sm object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Hon'ble Mr. Justice Pamidighantam Sri Narasimha
                  </h2>
                  <p className="mt-2 text-gold font-medium">Visitor</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    Judge, Supreme Court of India
                  </p>
                </div>

                {/* Governance Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 flex items-center gap-4 rounded-xl border border-gold/20 bg-gold/5 px-6 py-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-foreground">Administrative Head of the University</p>
                </motion.div>
              </motion.div>

              {/* Right Side: Biography */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg text-justify"
              >
                <p>
                  Justice Pamidighantam Sri Narasimha was born on May 3, 1963, in Hyderabad, to Smt. Satyavati and the late Justice P. Kodanda Ramayya, who was a distinguished judge of the Andhra Pradesh High Court and a renowned legal scholar.
                </p>
                <p>
                  He pursued his higher education at Nizam College, Hyderabad, where he graduated with triple majors in Economics, Political Science, and Public Administration. Subsequently, he obtained his law degree from the Campus Law Centre, Delhi University, in 1988, marking the beginning of a stellar legal career.
                </p>
                <p>
                  Justice Narasimha began his practice at the High Court, Civil Courts, and Tribunals in Hyderabad before shifting his practice to the Supreme Court of India. His profound understanding of law and exceptional advocacy led to his designation as a Senior Advocate by the Supreme Court in 2008.
                </p>
                <p>
                  In May 2014, he was appointed as the Additional Solicitor General of India, a position he held until December 2018. During his tenure, he represented the Government of India in numerous landmark cases, including Constitution Bench matters, the Ayodhya Title Dispute, and international disputes before the International Tribunal for the Law of the Sea (ITLOS).
                </p>
                <p>
                  On August 31, 2021, Justice Narasimha was elevated directly from the Bar as a Judge of the Supreme Court of India, a rare and prestigious distinction. He continues to serve the nation with unwavering commitment to the rule of law and justice, and is in line to become the Chief Justice of India.
                </p>
                <p>
                  As the Visitor of Damodaram Sanjivayya National Law University, his guidance and vision continue to inspire the institution towards higher standards of academic and ethical excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Former & Present Visitors Table */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">Former & Present Visitors</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">SI.No</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Designation</th>
                        <th className="px-6 py-4">From</th>
                        <th className="px-6 py-4">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {visitors.map((visitor) => (
                        <tr key={visitor.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{visitor.id}</td>
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold">{visitor.name}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{visitor.designation}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{visitor.from}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground font-medium">
                            {visitor.to === "Present" ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Present
                              </span>
                            ) : visitor.to}
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

export default Visitor;
