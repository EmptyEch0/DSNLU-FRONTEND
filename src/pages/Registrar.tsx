import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { RegistrarEditModal } from "@/components/admin/RegistrarEditModal";

const API = import.meta.env.VITE_API_URL;

const Registrar = () => {
  const [registrar, setRegistrar] = useState<any>(null);
  const { token } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/registrar/current`)
      .then(res => res.json())
      .then(data => setRegistrar(data.data))
      .catch(err => console.error(err));
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
            <span className="font-medium text-gold">Registrar</span>
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
              Registrar (I/c)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Registrar Profile Section */}
        <section id="profile" className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            {token && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-gold shadow-lg transition-all hover:bg-navy-light hover:scale-105 active:scale-95"
                >
                  <Edit className="h-4 w-4" />
                  Edit Registrar Profile
                </button>
              </div>
            )}
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              {/* Left Side: Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col items-center"
              >
                {registrar && (
                  <>
                    <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white transition-all duration-500 hover:shadow-2xl">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={registrar.image_url}
                        alt={registrar.name}
                        className="aspect-[3/4] w-full max-w-sm object-cover"
                      />
                    </div>
                    <div className="mt-8 text-center">
                      <h2 className="font-serif text-2xl font-bold text-foreground">
                        {registrar.title_tag ? `${registrar.title_tag} ` : ""}{registrar.name}
                      </h2>
                      <p className="mt-2 text-gold font-medium uppercase tracking-wider">{registrar.designation}</p>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                        {registrar.university_designation}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Right Side: Message */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-8"
              >
                {registrar && (
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold rounded-full opacity-50" />
                    <div className="pl-8">
                      <h3 className="font-serif text-3xl font-bold text-foreground mb-6">Message from the Registrar</h3>
                      <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-justify" style={{ whiteSpace: "pre-line" }}>
                        {registrar.message}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RegistrarEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        registrarData={registrar}
        onSuccess={() => {
          fetch(`${API}/api/registrar/current`)
            .then(res => res.json())
            .then(data => setRegistrar(data.data));
        }}
      />
    </div>
  );
};

export default Registrar;
