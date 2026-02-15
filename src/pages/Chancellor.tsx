import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Chancellor = () => {
  const formerChancellors = [
    { name: "Prof. A. Lakshminath (Founder Chancellor)", from: "05.11.2008", to: "04.11.2014" },
    { name: "Hon'ble Mr. Justice Dilip Babasaheb Bhosale", from: "12.05.2016", to: "30.07.2016" },
    { name: "Hon'ble Mr. Justice Ramesh Ranganathan", from: "31.07.2016", to: "06.07.2018" },
    { name: "Hon'ble Mr. Justice T. B. Radha Krishnan", from: "07.07.2018", to: "31.12.2018" },
    { name: "Hon'ble Mr. Justice C. Praveen Kumar", from: "01.01.2019", to: "06.10.2019" },
    { name: "Hon'ble Mr. Justice J. K. Maheshwari", from: "07.10.2019", to: "04.01.2021" },
    { name: "Hon'ble Mr. Justice Arup Kumar Goswami", from: "06.01.2021", to: "10.10.2021" },
    { name: "Hon'ble Mr. Justice Prashant Kumar Mishra", from: "13.10.2021", to: "18.05.2023" },
    { name: "Hon'ble Mr. Justice A.V. Sesha Sai", from: "19.05.2023", to: "27.07.2023" },
    { name: "Hon'ble Justice Dhiraj Singh Thakur", from: "28.07.2023", to: "Present" },
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
            <span className="font-medium text-gold">Chancellor</span>
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
              Chancellor
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Chancellor Profile Section */}
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
                    src="https://dsnlu.ac.in/storage/2023/07/Sri-Justice-Dhiraj-Singh-Thakur-2-2.jpg"
                    alt="Sri Justice Dhiraj Singh Thakur"
                    className="aspect-[3/4] w-full max-w-sm object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Hon'ble Sri Justice Dhiraj Singh Thakur
                  </h2>
                  <p className="mt-2 text-gold font-medium uppercase tracking-wider">The Hon'ble Chief Justice</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    Chancellor, DSNLU
                  </p>
                </div>
              </motion.div>

              {/* Right Side: Biography */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg text-justify"
              >
                <p>
                  Sri Justice Dhiraj Singh Thakur assumed the office of the Chief Justice of the High Court of Andhra Pradesh on July 28, 2023. By virtue of his office, he serves as the Chancellor of Damodaram Sanjivayya National Law University, providing visionary leadership and guidance to the institution.
                </p>
                <p>
                  Born on April 25, 1964, Justice Thakur stems from a family with a profound legal legacy. He obtained his LL.B. degree from Jammu University and embarked on his legal career by enrolling as an Advocate in 1989. His exceptional legal acumen and dedication to the profession led to his designation as a Senior Advocate in 2011.
                </p>
                <p>
                  Justice Thakur's judicial journey began with his appointment as a Permanent Judge of the High Court of Jammu and Kashmir in 2013. His tenure was marked by landmark judgments and a steadfast commitment to the principles of justice. He later served as a Judge of the High Court of Judicature at Bombay, further enriching his judicial experience across diverse jurisdictions.
                </p>
                <p>
                  Known for his scholarly approach and administrative efficiency, Justice Thakur has consistently upheld the highest standards of the judiciary. As Chancellor, he is deeply committed to fostering an environment of academic excellence, research innovation, and social responsibility at DSNLU.
                </p>
                <p>
                  His leadership continues to inspire the DSNLU community to strive for excellence in legal education and to contribute meaningfully to the rule of law and the development of society.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Chancellor Section */}
        <section className="bg-secondary/30 py-16 lg:py-24 border-y border-border/50">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6"
              >
                <h2 className="font-serif text-3xl font-bold text-foreground">Founder Chancellor</h2>
                <div className="h-1 w-16 rounded-full bg-gold" />
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Professor A. Lakshminath served as the Founder Chancellor of Damodaram Sanjivayya National Law University. His foundational vision and pioneering leadership were instrumental in establishing DSNLU as a premier institution for legal education in Andhra Pradesh and India.
                </p>
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm mt-8">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-border">
                      <tr className="bg-gold/5">
                        <td className="px-6 py-4 font-bold text-foreground">Name</td>
                        <td className="px-6 py-4 text-muted-foreground">Prof. A. Lakshminath</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-foreground">Tenure From</td>
                        <td className="px-6 py-4 text-muted-foreground">05.11.2008</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-foreground">Tenure To</td>
                        <td className="px-6 py-4 text-muted-foreground">04.11.2014</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex justify-center"
              >
                <div className="relative p-4 rounded-full border-2 border-dashed border-gold/30">
                  <div className="h-64 w-64 rounded-full overflow-hidden bg-muted">
                    {/* Image placeholder or actual image if available */}
                    <div className="flex h-full w-full items-center justify-center bg-navy/5 text-navy/20">
                      <ChevronRight className="h-12 w-12 opacity-20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* List of Chancellors Table */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground capitalize">Chancellor – High Court of Andhra Pradesh</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
                <p className="mt-4 text-muted-foreground">Historical list of the Hon'ble Chancellors of DSNLU</p>
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">From</th>
                        <th className="px-6 py-4">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {formerChancellors.map((chancellor, index) => (
                        <tr key={index} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold">{chancellor.name}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{chancellor.from}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground font-medium">
                            {chancellor.to === "Present" ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Present
                              </span>
                            ) : chancellor.to}
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

export default Chancellor;
