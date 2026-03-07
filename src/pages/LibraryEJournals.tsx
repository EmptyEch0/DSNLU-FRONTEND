import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { ExternalLink, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const LibraryEJournals = () => {
  const { token } = useAdmin();
  const [journals, setJournals] = useState<any[]>([]);
  const [modal, setModal] = useState<{ type: "add" | "edit"; item?: any } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/library/ejournals`);
      const data = await res.json();
      setJournals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("EJournals fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const saveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "edit";
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${API}/api/library/ejournals/${modal.item.id}`
      : `${API}/api/library/ejournals`;

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

      toast.success("Journal saved!");
      setModal(null);
      fetchData();
    } catch {
      toast.error("Server error.");
    }
  };

  const deleteJournal = async (id: number) => {
    if (!confirm("Delete this E-Journal?")) return;
    try {
      const res = await fetch(`${API}/api/library/ejournals/${id}`, {
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

  const fallbackJournals = [
    {
      name: "Cambridge Law Journal",
      url: "https://www.cambridge.org/core/journals/cambridge-law-journal",
      desc: "A leading legal journal publishing high-quality research across all areas of law.",
      image: "https://www.cambridge.org/core/services/aop-file-manager/live/repository/product/CLJ/logo.png"
    },
    {
      name: "Economic & Political Weekly",
      url: "https://www.epw.in/",
      desc: "A premier social science journal providing a platform for critical analysis of contemporary issues.",
      image: "https://www.epw.in/sites/all/themes/epw/logo.png"
    },
    {
      name: "ICSID Review (Oxford)",
      url: "https://academic.oup.com/icsidreview",
      desc: "Specialized journal on international investment law and dispute settlement.",
      image: "https://academic.oup.com/file-asset/icsidreview/icsidreview_logo.png"
    }
  ];

  const displayJournals = journals.length > 0 ? journals : fallbackJournals;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="journals" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy">E-Journals</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Access a curated collection of world-class legal journals and academic publications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayJournals.map((journal, i) => (
                <motion.div
                  key={journal.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[32px] p-8 shadow-elegant border border-navy/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center relative"
                >
                  {token && (
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button
                        onClick={() => {
                          setModal({ type: "edit", item: journal });
                          setFormData(journal);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-full hover:scale-110 transition-transform"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteJournal(journal.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-full hover:scale-110 transition-transform"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="relative mb-8 w-32 h-32 rounded-3xl bg-secondary/20 flex items-center justify-center overflow-hidden border border-navy/5 group-hover:rotate-1 transition-transform duration-500">
                    <img 
                      src={journal.image || journal.image_url} 
                      alt={journal.name || journal.title}
                      className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${new URL(journal.url).hostname}&sz=128`;
                      }}
                    />
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{journal.name || journal.title}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed">
                    {journal.desc || journal.description}
                  </p>

                  <div className="mt-auto w-full">
                    <a href={journal.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-navy hover:bg-blue-600 text-white rounded-2xl py-6 h-auto font-bold shadow-lg transform group-hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                         Visit Journal <ExternalLink className="h-4 w-4" />
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
                  <Plus className="h-5 w-5" /> Add E-Journal
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
              <h3 className="text-xl font-serif font-bold">{modal.type === "edit" ? "Edit E-Journal" : "Add E-Journal"}</h3>
              <button onClick={() => setModal(null)} className="hover:scale-110 transition-transform">✕</button>
            </div>
            <form onSubmit={saveJournal} className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Title</label>
                <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="e.g. Cambridge Law Journal" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Description</label>
                <textarea required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 min-h-[100px] outline-none focus:border-blue-600 transition-colors" placeholder="Brief description..." value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">URL</label>
                <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="https://..." value={formData.url || ""} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Image URL</label>
                <input className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="https://.../logo.png" value={formData.image_url || ""} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
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

export default LibraryEJournals;
