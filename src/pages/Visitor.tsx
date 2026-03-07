import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Landmark, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { apiFetch } from "@/lib/api";
import { VisitorEditModal } from "@/components/admin/VisitorEditModal";

interface VisitorProfile {
  id: number;
  name: string;
  designation: string;
  university: string;
  title_tag: string;
  biography: string;
  image_url: string;
}

interface FormerVisitor {
  id: number;
  name: string;
  designation: string;
  start_date: string;
  end_date: string | null;
}

const Visitor = () => {
  const { token } = useAdmin();
  const [visitor, setVisitor] = useState<VisitorProfile | null>(null);
  const [visitors, setVisitors] = useState<FormerVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const currentData = await apiFetch<VisitorProfile>("/api/visitor/current");
      const allData = await apiFetch<FormerVisitor[]>("/api/visitor/all");

      setVisitor(currentData);
      setVisitors(allData);
    } catch (err) {
      console.error("Visitor Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!isMounted) return;
      await fetchData();
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Loading Visitor details...</p>
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500 font-bold">Unable to load visitor data.</p>
      </div>
    );
  }

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
        {visitor && (
          <section className="py-16 lg:py-24">
            <div className="container max-w-6xl">
              {token && (
                <div className="mb-12 flex justify-end">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-sm font-bold text-gold shadow-hard transition-all hover:bg-navy-light hover:scale-105 active:scale-95"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Visitor Profile
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
                  <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={visitor.image_url}
                      alt={visitor.name}
                      className="aspect-[3/4] w-64 md:w-full max-w-sm object-cover"
                    />
                  </div>
                  <div className="mt-8 text-center">
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      {visitor.name}
                    </h2>
                    <p className="mt-2 text-gold font-medium">{visitor.title_tag}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                      {visitor.designation}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-tight mt-0.5 opacity-80">
                      {visitor.university}
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
                    <p className="font-medium text-foreground">Highest Institutional Head</p>
                  </motion.div>
                </motion.div>

                {/* Right Side: Biography */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg text-justify whitespace-pre-line"
                >
                  {visitor.biography}
                </motion.div>
              </div>
            </div>
          </section>
        )}

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
                      {visitors.map((visitor, index) => (
                        <tr key={visitor.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{index + 1}</td>
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold">{visitor.name}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">{visitor.designation}</td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground">
                            {new Date(visitor.start_date).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-6 py-5 text-muted-foreground group-hover:text-foreground font-medium">
                            {visitor.end_date ? (
                              new Date(visitor.end_date).toLocaleDateString("en-GB")
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
      
      {visitor && (
        <VisitorEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          visitorData={visitor}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default Visitor;
