import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GeneralCouncilPage = () => {
  const members = [
    { id: 1, name: "Shri Justice Dhiraj Singh Thakur", designation: "The Hon’ble Chief Justice, High Court of Andhra Pradesh" },
    { id: 2, name: "Prof. (Dr.) D. Surya Prakasa Rao", designation: "Vice-Chancellor, DSNLU" },
    { id: 3, name: "Hon'ble Sri. Justice D.V.S.S. Somayajulu", designation: "Judge (Retd.), High Court of A.P., Amaravati and Professor Emeritus / Distinguished Professor, DSNLU" },
    { id: 4, name: "Hon'ble Sri. Justice N. Jayasurya", designation: "Judge, High Court of A.P., Amaravati" },
    { id: 5, name: "Mr. Manan Kumar Mishra", designation: "Chairman, Bar Council of India, New Delhi" },
    { id: 6, name: "Sri. Rami Reddy Aluru", designation: "Advocate & Member Bar Council of India, New Delhi" },
    { id: 7, name: "Prof. T. Tirupati Rao", designation: "Chancellor, Manipur University, Manipur" },
    { id: 8, name: "Sri. Dammalapati Srinivas", designation: "Advocate General, State of Andhra Pradesh, High Court of A.P." },
    { id: 9, name: "Sri. K. Rama Jogeswara Rao", designation: "Advocate & Vice-Chairman, Bar Council of Andhra Pradesh" },
    { id: 10, name: "Prof. G. Mohan Gopal", designation: "Former Director, National Judicial Academy, Bhopal" },
    { id: 11, name: "Prof. Ranbir Singh", designation: "Founder Vice-Chancellor, NALSAR & Pro Chancellor, IILM University" },
    { id: 12, name: "Shri. B. Adinarayana Rao", designation: "Senior Advocate, High Court of Andhra Pradesh, Amaravati" },
    { id: 13, name: "Sri. P. Sri Raghuram", designation: "Senior Advocate, High Court of Andhra Pradesh" },
    { id: 14, name: "Prof. K. Madhu Murthy", designation: "Chairman, Andhra Pradesh State Council of Higher Education" },
    { id: 15, name: "Chief Secretary to Government", designation: "Government of Andhra Pradesh" },
    { id: 16, name: "Ms. G. Pratibhadevi", designation: "Secretary to Government, Law Department, Government of Andhra Pradesh" },
    { id: 17, name: "Finance Secretary", designation: "Addl. Secretary to Government, Finance Department, Government of Andhra Pradesh" },
    { id: 18, name: "Principal Secretary to Government", designation: "Higher Education, Government of Andhra Pradesh" },
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
            <span className="font-medium text-gold">General Council</span>
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
              General Council
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-gold/80 font-medium"
            >
              Under Section 12(1) of DSNLU Act, 2008
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Council Members Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">GENERAL COUNCIL</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Hon’ble Member</th>
                        <th className="px-6 py-4">Designation / Details</th>
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

export default GeneralCouncilPage;
