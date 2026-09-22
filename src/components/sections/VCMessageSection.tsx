import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { VCEditModal } from "@/components/admin/VCEditModal";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { Skeleton } from "@/components/ui/skeleton";

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

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const defaultVC: VC = {
  id: 1,
  name: "Prof. (Dr.) Dasari Surya Prakasa Rao",
  designation: "Vice-Chancellor",
  university: "DSNLU, Visakhapatnam",
  short_message:
    "Welcome to Damodaram Sanjivayya National Law University (DSNLU). Our mission is to impart quality legal education, foster research, and cultivate ethical legal professionals committed to justice and societal transformation.",
  full_message: "",
  image_url: "https://dsnlu.ac.in/wp-content/uploads/2024/04/vcdsnlu.jpeg",
  resume_url: "",
};

export function VCMessageSection() {
  const { token, isAdminMode } = useAdmin();
  const [vc, setVc] = useState<VC>(defaultVC);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchVC = () => {
    fetch(`${API}/api/vc/current`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setVc({
            ...data,
            image_url: data.image_url || defaultVC.image_url,
          });
        }
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

  // Helper as fallback if short_message is empty
  const stripHtml = (html: string) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <section className="bg-card py-20 lg:py-28 relative">
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
            {token && isAdminMode && (
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

        {loading ? (
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="flex flex-col items-center lg:col-span-2">
              <Skeleton className="aspect-[3/4] w-full max-w-xs rounded-2xl" />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-8 w-3/4 rounded" />
              <Skeleton className="h-28 w-full rounded" />
              <Skeleton className="h-10 w-48 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-12 lg:grid-cols-5">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:col-span-2"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl shadow-xl w-full max-w-xs border border-border">
                <OptimizedImage
                  src={vc.image_url || defaultVC.image_url}
                  alt={vc.name}
                  containerClassName="aspect-[3/4] w-full"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                  <h3 className="font-serif text-lg font-bold text-gold">
                    {vc.name}
                  </h3>
                  <p className="text-sm text-white/90">{vc.designation}</p>
                  <p className="text-xs text-white/70">
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
                  {vc.short_message || (stripHtml(vc.full_message).slice(0, 600) + "...")}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="bg-navy text-gold hover:bg-navy-light font-bold">
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
        )}
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
