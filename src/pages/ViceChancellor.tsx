import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const vcImageUrl = "https://dsnlu.ac.in/storage/2024/04/vcdsnlu.jpeg";

const ViceChancellor = () => {
  const formerVCs = [
    { id: 1, name: "Prof. Y. Satyanarayana", from: "16.09.2008", to: "03.11.2011" },
    { id: 2, name: "Prof. R.G.B. Bhagavath Kumar", from: "04.11.2011", to: "02.11.2015" },
    { id: 3, name: "Prof. G.S.N. Raju (In-Charge)", from: "02.11.2015", to: "08.02.2016" },
    { id: 4, name: "Prof. E.A. Narayana (In-Charge)", from: "08.02.2016", to: "24.06.2016" },
    { id: 5, name: "Prof. V. Kesava Rao (In-Charge)", from: "24.06.2016", to: "24.12.2018" },
    { id: 6, name: "Prof. S. Surya Prakash", from: "24.12.2018", to: "31.05.2023" },
    { id: 7, name: "Prof. D. Surya Prakasa Rao", from: "19.10.2023", to: "Present" },
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
            <span className="font-medium text-gold">Vice-Chancellor</span>
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
              Vice-Chancellor
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* VC Profile Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Left Side: Image & Contact */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="flex flex-col items-center">
                  <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={vcImageUrl}
                      alt="Prof. (Dr.) Dasari Surya Prakasa Rao"
                      className="aspect-[3/4] w-full max-w-sm object-cover"
                    />
                  </div>
                  <div className="mt-8 text-center">
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Prof. (Dr.) Dasari Surya Prakasa Rao
                    </h2>
                    <p className="mt-2 text-gold font-medium uppercase tracking-wider">Vice-Chancellor</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                      DSNLU, Visakhapatnam
                    </p>
                  </div>
                </div>

                {/* Contact Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border bg-card p-6 shadow-sm space-y-4"
                >
                  <h4 className="font-serif text-lg font-bold text-foreground border-b pb-2">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Email</p>
                        <a href="mailto:vc@dsnlu.ac.in" className="text-sm text-foreground hover:text-gold transition-colors font-medium">
                          vc@dsnlu.ac.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Phone</p>
                        <p className="text-sm text-foreground font-medium">0891-2812000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Office</p>
                        <p className="text-sm text-foreground font-medium">Nyayaprastha, Visakhapatnam</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side: Biography */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg text-justify"
              >
                <div className="prose prose-lg max-w-none">
                  <p>
                    Prof. (Dr.) Dasari Surya Prakasa Rao is a distinguished academician and legal scholar with over three decades of experience in legal education and research. He assumed office as the Vice-Chancellor of Damodaram Sanjivayya National Law University (DSNLU) on October 19, 2023.
                  </p>
                  <p>
                    Prior to joining DSNLU, Prof. Rao served as a Professor of Law and held various administrative positions including Dean of Faculty of Law at Andhra University. His academic journey is marked by a profound commitment to excellence, having mentored numerous doctoral students and contributed extensively to legal scholarship through published books and research articles in reputed journals.
                  </p>
                  <p>
                    A recipient of several prestigious awards, Prof. Rao has been recognized for his outstanding contribution to the field of law. He has been a member of various academic and decision-making bodies of several National Law Universities and Central Universities across India.
                  </p>
                  <p>
                    As Vice-Chancellor, Prof. Rao's vision is to elevate DSNLU to a center of global excellence. He focuses on integrating multidisciplinary research, enhancing clinical legal education, and fostering international collaborations. Under his leadership, the university is strengthening its commitment to social justice and the rule of law, ensuring that DSNLU graduates are prepared to meet the challenges of the contemporary legal landscape.
                  </p>
                  <p>
                    His administrative philosophy centers on transparency, academic freedom, and inclusive growth, creating a vibrant ecosystem for students and faculty to thrive and innovate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Former VCs Table */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">Former Vice-Chancellors</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
                <p className="mt-4 text-muted-foreground">Historical list of the Vice-Chancellors of DSNLU</p>
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">SI.No</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">From</th>
                        <th className="px-6 py-4">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {formerVCs.map((vc) => (
                        <tr key={vc.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{vc.id}</td>
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold">{vc.name}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{vc.from}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground font-medium">
                            {vc.to === "Present" ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Present
                              </span>
                            ) : vc.to}
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

export default ViceChancellor;
