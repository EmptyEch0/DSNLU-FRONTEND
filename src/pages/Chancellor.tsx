import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { ChancellorEditModal } from "@/components/admin/ChancellorEditModal";

const API = import.meta.env.VITE_API_URL;

const Chancellor = () => {
  const [current, setCurrent] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const { token } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/chancellors/current`);
      const json = await res.json();

      if (json.success) {
        setCurrent(json.data);
      }

      const historyRes = await fetch(`${API}/api/chancellors`);
      const historyData = await historyRes.json();
      setHistory(historyData);

    } catch (error) {
      console.error("Chancellor Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {token && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-gold shadow-lg"
                >
                  Edit Chancellor
                </button>
              </div>
            )}
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Left Side: Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col items-center"
              >
                {current && (
                  <>
                    <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={current.image_url}
                        alt={current.name}
                        className="aspect-[3/4] w-64 md:w-full max-w-sm object-cover"
                      />
                    </div>
                    <div className="mt-8 text-center">
                      <h2 className="font-serif text-2xl font-bold text-foreground">
                        {current.title_tag ? `${current.title_tag} ` : ""}
                        {current.name}
                      </h2>
                      <p className="mt-2 text-gold font-medium uppercase tracking-wider">
                        {current.designation}
                      </p>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                        {current.university_designation}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Right Side: Biography */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg text-justify"
              >
                {current && (
                  <div style={{ whiteSpace: "pre-line" }}>
                    {current.biography}
                  </div>
                )}
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
                      {history.map((chancellor) => (
                        <tr key={chancellor.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold">
                            {chancellor.title_tag} {chancellor.name}
                            {chancellor.is_founder && " (Founder Chancellor)"}
                          </td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">
                            {new Date(chancellor.start_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground font-medium">
                            {chancellor.end_date ? (
                              new Date(chancellor.end_date).toLocaleDateString()
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Present
                              </span>
                            )}
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
      <ChancellorEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chancellorData={current}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default Chancellor;
