import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface EmeritusDetail {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  image_url: string;
  slug: string;
  bio_html: string;
}

const API = import.meta.env.VITE_API_URL;

const ProfessorEmeritusBio = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<EmeritusDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/professor-emeritus/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [slug]);

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
      <Footer />
    </div>
  );

  if (error || !profile) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center"><p className="text-red-500">{error || "Profile not found"}</p></main>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold text-xs sm:text-sm">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/professor-emeritus" className="transition-colors hover:text-gold text-xs sm:text-sm">People</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/professor-emeritus" className="transition-colors hover:text-gold text-xs sm:text-sm">Professor Emeritus</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold truncate text-xs sm:text-sm lg:max-w-none max-w-[150px]">
              {profile.name}
            </span>
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
              Professor Emeritus
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl max-w-4xl mx-auto leading-tight"
            >
              {profile.name}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold"
            />
          </div>
        </section>

        {/* Profile Details Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              {/* Left Column: Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white bg-white">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    src={profile.image_url}
                    alt={profile.name}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>

                <div className="bg-card p-6 rounded-2xl border-l-4 border-gold shadow-sm">
                  <p className="font-serif text-xl font-bold text-foreground">
                    {profile.name}
                  </p>
                  <p className="mt-2 text-gold font-medium uppercase tracking-wider text-sm">
                    {profile.title}
                  </p>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Bio Data */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-8"
              >
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Bio Data</h2>
                  <div className="h-1 w-16 bg-gold rounded-full mb-8" />

                  <div
                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6 text-justify"
                    dangerouslySetInnerHTML={{ __html: profile.bio_html }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessorEmeritusBio;
