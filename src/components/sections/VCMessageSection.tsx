import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
}

const API = import.meta.env.VITE_API_URL;

export function VCMessageSection() {
  const { token } = useAdmin();
  const [vc, setVc] = useState<VC | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchVC = () => {
    fetch(`${API}/api/vc/current`)
      .then((res) => res.json())
      .then((data) => {
        setVc(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("VC Fetch Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVC();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">Loading Vice-Chancellor...</p>
      </section>
    );
  }

  if (!vc) return null;

  // Helper as fallback if short_message is empty
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            From the Vice-Chancellor
          </span>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Vice-Chancellor's Message
            </h2>
            {token && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold transition-all hover:bg-gold hover:text-navy"
              >
                <Edit className="h-3 w-3" />
                Edit VC Profile
              </button>
            )}
          </div>
          <div className="mx-auto mt-6 mb-6 h-1 w-16 rounded-full bg-gold" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:col-span-2"
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={vc.image_url}
                alt={vc.name}
                className="aspect-[3/4] w-full max-w-xs object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-16">
                <h3 className="font-serif text-lg font-bold text-primary-foreground">
                  {vc.name}
                </h3>
                <p className="text-sm text-gold">{vc.designation}</p>
                <p className="text-xs text-primary-foreground/70">
                  {vc.university}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p className="text-justify line-clamp-6 md:line-clamp-none whitespace-pre-wrap">
                {vc.short_message || stripHtml(vc.full_message).slice(0, 600) + "..."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-navy-light">
                <Link to="/vice-chancellor">
                  Read Full Message <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {vc.resume_url && (
                <Button
                  asChild
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold hover:text-navy"
                >
                  <a href={vc.resume_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> About the Vice-Chancellor
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <VCEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        vcData={vc}
        onSuccess={fetchVC}
      />
    </section>
  );
}
