import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Mail, Phone, MapPin, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { VCEditModal } from "@/components/admin/VCEditModal";

interface VC {
  id: number;
  name: string;
  designation: string;
  university: string;
  short_message: string;
  full_message: string;
  image_url: string;
  resume_url: string;
  start_date: string;
  end_date: string | null;
}

interface FormerVC {
  id: number;
  name: string;
  start_date: string;
  end_date: string | null;
}

const API = import.meta.env.VITE_API_URL;

const ViceChancellor = () => {
  const { token } = useAdmin();
  const [currentVC, setCurrentVC] = useState<VC | null>(null);
  const [formerVCs, setFormerVCs] = useState<FormerVC[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Admin Editing State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const currentRes = await fetch(`${API}/api/vc/current`);
      const currentData = await currentRes.json();
      setCurrentVC(currentData);

      const formerRes = await fetch(`${API}/api/vc/former`);
      const formerData = await formerRes.json();
      setFormerVCs(formerData);

      setLoading(false);
    } catch (error) {
      console.error("VC Page Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Loading Vice-Chancellor...</p>
      </div>
    );
  }

  if (!currentVC) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Leadership & Governance</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Vice-Chancellor</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-primary py-20">
          <div className="container text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-primary-foreground"
            >
              Vice-Chancellor
            </motion.h1>
          </div>
        </section>

        {/* VC Profile */}
        <section className="py-16">
          <div className="container max-w-6xl">
            {token && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-gold shadow-lg transition-all hover:bg-navy-light hover:scale-105 active:scale-95"
                >
                  <Edit className="h-4 w-4" />
                  Edit VC Profile
                </button>
              </div>
            )}

            <div className="grid gap-12 lg:grid-cols-5">

              {/* Left */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-col items-center">
                  <img
                    src={currentVC.image_url}
                    alt={currentVC.name}
                    className="aspect-[3/4] w-64 md:w-full max-w-sm object-cover rounded-2xl shadow-xl"
                  />
                  <div className="mt-6 text-center">
                    <h2 className="font-serif text-2xl font-bold">
                      {currentVC.name}
                    </h2>
                    <p className="text-gold font-medium">
                      {currentVC.designation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentVC.university}
                    </p>
                  </div>
                </div>

                {/* Contact Info (static for now) */}
                <div className="rounded-2xl border bg-card p-6 space-y-4 shadow-sm">
                  <h4 className="font-serif text-lg font-bold border-b pb-2 text-primary">
                    Contact Information
                  </h4>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gold/10 text-gold">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Email</p>
                      <a href="mailto:vc@dsnlu.ac.in" className="text-sm font-medium hover:text-gold transition-colors">
                        vc@dsnlu.ac.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gold/10 text-gold">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">0891-2812000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gold/10 text-gold">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Office</p>
                      <p className="text-sm font-medium">Nyayaprastha, Visakhapatnam</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Full Biography */}
              <div className="lg:col-span-3">
                <div className="prose prose-navy max-w-none text-muted-foreground leading-relaxed text-lg text-justify">
                  <div dangerouslySetInnerHTML={{ __html: currentVC.full_message }} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Former VCs */}
        <section className="bg-secondary/30 py-16">
          <div className="container max-w-5xl">
            <h2 className="text-3xl font-serif font-bold text-center mb-2">
              Former Vice-Chancellors
            </h2>
            <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-gold" />

            <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-navy text-gold uppercase text-sm tracking-wider">
                    <th className="px-6 py-4 font-bold tracking-widest">SI.No</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                    <th className="px-6 py-4 font-bold tracking-widest">From</th>
                    <th className="px-6 py-4 font-bold tracking-widest">To</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {formerVCs.map((vc, index) => (
                    <tr key={vc.id} className="transition-colors hover:bg-gold/5 group">
                      <td className="px-6 py-5 text-muted-foreground">{index + 1}</td>
                      <td className="px-6 py-5 font-bold group-hover:text-gold transition-colors">{vc.name}</td>
                      <td className="px-6 py-5 text-muted-foreground">
                        {new Date(vc.start_date).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5 text-muted-foreground">
                        {vc.end_date
                          ? new Date(vc.end_date).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
                          : <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">Present</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        <VCEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vcData={currentVC}
          onSuccess={fetchData}
        />

      </main>
      <Footer />
    </div>
  );
};

export default ViceChancellor;
