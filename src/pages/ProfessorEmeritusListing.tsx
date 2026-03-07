import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

interface EmeritusProfile {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  image_url: string;
  slug: string;
  bio_html: string;
}

const API = import.meta.env.VITE_API_URL;

const ProfessorEmeritusListing = () => {
  const [profiles, setProfiles] = useState<EmeritusProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAdmin();

  const [showModal, setShowModal] = useState(false);
  const [editProfile, setEditProfile] = useState<EmeritusProfile | null>(null);
  const [formData, setFormData] = useState({
    name: "", slug: "", title: "", subtitle: "", image_url: "", bio_html: "",
  });

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${API}/api/professor-emeritus`);
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, []);

  const openEdit = (profile: EmeritusProfile) => {
    setEditProfile(profile);
    setFormData({
      name: profile.name, slug: profile.slug, title: profile.title,
      subtitle: profile.subtitle, image_url: profile.image_url, bio_html: profile.bio_html || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    await fetch(`${API}/api/professor-emeritus/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    const method = editProfile ? "PUT" : "POST";
    const url = editProfile
      ? `${API}/api/professor-emeritus/${editProfile.id}`
      : `${API}/api/professor-emeritus`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    fetchProfiles();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Professor Emeritus</span>
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
              Our People
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Professor Emeritus
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold"
            />
          </div>
        </section>

        {/* Profiles Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">

            {/* Admin Add Button */}
            {token && (
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => {
                    setEditProfile(null);
                    setFormData({ name: "", slug: "", title: "", subtitle: "", image_url: "", bio_html: "" });
                    setShowModal(true);
                  }}
                  className="px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  + Add Profile
                </button>
              </div>
            )}

            {loading && <div className="p-8 text-center text-muted-foreground">Loading profiles...</div>}
            {error && <div className="p-8 text-center text-red-500">{error}</div>}

            {!loading && !error && (
              <div className="space-y-12">
                {profiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-card shadow-elegant transition-all duration-500 hover:shadow-2xl"
                  >
                    {/* Admin Edit/Delete Buttons */}
                    {token && (
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <button onClick={() => openEdit(profile)} title="Edit" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors">✏️</button>
                        <button onClick={() => handleDelete(profile.id)} title="Delete" className="bg-white/90 p-1.5 rounded shadow hover:bg-red-50 transition-colors">🗑️</button>
                      </div>
                    )}

                    {/* Left: Image */}
                    <div className="md:w-1/3 relative h-80 md:h-auto overflow-hidden bg-muted">
                      <img
                        src={profile.image_url}
                        alt={profile.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-gold transition-colors">
                          {profile.name}
                        </h3>
                        <p className="mt-2 text-gold font-medium uppercase tracking-wider text-sm">
                          {profile.title}
                        </p>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                          {profile.subtitle}
                        </p>
                      </div>

                      <Link
                        to={`/people/professor-emeritus/${profile.slug}`}
                        className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#2a1b15] px-6 py-3 text-sm font-bold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-[#3d2920] hover:gap-3 group/btn shadow-lg"
                      >
                        View Bio Data
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold">
              {editProfile ? "Edit Profile" : "Add Profile"}
            </h2>

            <input placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded" />

            <input placeholder="Slug (e.g. dvss-somayajulu)" value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border p-2 rounded" />

            <input placeholder="Title" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2 rounded" />

            <input placeholder="Subtitle" value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full border p-2 rounded" />

            <input placeholder="Image URL" value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full border p-2 rounded" />

            <textarea placeholder="Bio HTML" value={formData.bio_html}
              onChange={(e) => setFormData({ ...formData, bio_html: e.target.value })}
              className="w-full border p-2 rounded h-40" />

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-navy text-gold rounded font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorEmeritusListing;
