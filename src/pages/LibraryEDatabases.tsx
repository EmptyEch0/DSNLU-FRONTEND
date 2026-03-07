import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { Database, ExternalLink, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const LibraryEDatabases = () => {
  const { token } = useAdmin();
  const [databases, setDatabases] = useState<any[]>([]);
  const [modal, setModal] = useState<{ type: "add" | "edit"; item?: any } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/library/edatabases`);
      const data = await res.json();
      setDatabases(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("EDatabases fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const saveDatabase = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "edit";
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${API}/api/library/edatabases/${modal.item.id}`
      : `${API}/api/library/edatabases`;

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Failed");
        return;
      }

      toast.success("Database saved!");
      setModal(null);
      fetchData();
    } catch {
      toast.error("Server error.");
    }
  };

  const deleteDatabase = async (id: number) => {
    if (!confirm("Delete this E-Database?")) return;
    try {
      const res = await fetch(`${API}/api/library/edatabases/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        toast.success("Deleted!");
        fetchData();
      }
    } catch {
      toast.error("Error deleting.");
    }
  };

  const fallbackDatabases = [
    { name: "Jus Mundi", url: "https://jusmundi.com/en", desc: "Comprehensive international law and arbitration database." },
    { name: "HeinOnline", url: "https://heinonline.org/HOL/login-hol?redirect_url=%2FHOL%2FWelcome", desc: "Premier online database containing more than 180 million pages of legal history." },
    { name: "Bar & Bench", url: "https://www.barandbench.com/", desc: "Leading news portal for the legal fraternity in India." },
    { name: "LiveLaw", url: "https://www.livelaw.in/", desc: "Comprehensive legal news portal in India." },
    { name: "LexisNexis", url: "https://signin.lexisnexis.com/lnaccess/mip/authn?aci=in&identityprofileid=96VGBH58174&request_id=1", desc: "Global legal research platform for legal professionals." },
    { name: "Oxford Public International Law", url: "https://opil.ouplaw.com/", desc: "The home of Oxford's public international law services." },
    { name: "Westlaw Asia", url: "https://launch.westlawasia.com/signon?sp=inapu-1", desc: "Leading provider of legal research for the Asian market." },
    { name: "Taxmann Research", url: "https://www.taxmann.com/research", desc: "India's largest database on taxation, corporate laws, and more." },
    { name: "SCC Online", url: "https://www.scconline.com/", desc: "The most trusted source for case law, statutes, and articles in India." },
    { name: "Manupatra", url: "https://www.manupatra.ai/", desc: "India's pioneer legal search engine and database." },
    { name: "JSTOR", url: "https://www.jstor.org/", desc: "Digital library of academic journals, books, and primary sources." }
  ];

  const displayDatabases = databases.length > 0 ? databases : fallbackDatabases;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="databases" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy uppercase tracking-tight">E-Databases</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Premium digital repositories providing global access to case law, legislation, and research materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDatabases.map((db, i) => (
                <motion.div
                  key={db.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white p-8 rounded-[32px] border border-navy/5 shadow-sm hover:shadow-2xl hover:border-blue-600/30 transition-all duration-300 flex flex-col items-start relative"
                >
                  {token && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setModal({ type: "edit", item: db });
                          setFormData(db);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-full hover:scale-110 transition-transform"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteDatabase(db.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-full hover:scale-110 transition-transform"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Database className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-navy mb-3 uppercase tracking-tight">{db.title || db.name}</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    {db.description || db.desc}
                  </p>

                  <div className="mt-auto w-full">
                    <a href={db.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full border-blue-600/20 text-blue-600 hover:bg-navy hover:text-white hover:border-navy rounded-2xl py-6 h-auto font-bold transition-all flex items-center justify-center gap-2">
                         Access Database <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {token && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => {
                    setModal({ type: "add" });
                    setFormData({});
                  }}
                  className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 py-6 h-auto text-lg gap-2 shadow-lg"
                >
                  <Plus className="h-5 w-5" /> Add E-Database
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-navy">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold">{modal.type === "edit" ? "Edit E-Database" : "Add E-Database"}</h3>
              <button onClick={() => setModal(null)} className="hover:scale-110 transition-transform">✕</button>
            </div>
            <form onSubmit={saveDatabase} className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Title</label>
                <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="e.g. Jus Mundi" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Description</label>
                <textarea required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 min-h-[100px] outline-none focus:border-blue-600 transition-colors" placeholder="Brief description..." value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">URL</label>
                <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="https://..." value={formData.url || ""} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setModal(null)} className="flex-1 rounded-xl py-6 font-bold">Cancel</Button>
                <Button type="submit" className="flex-1 bg-navy text-white hover:bg-navy/90 rounded-xl py-6 font-bold shadow-lg">Save</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LibraryEDatabases;
