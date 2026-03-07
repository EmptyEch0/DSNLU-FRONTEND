import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const LibraryEBooks = () => {
  const { token } = useAdmin();
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [modal, setModal] = useState<{ type: "add" | "edit"; item?: any } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/library/ebooks`);
      const data = await res.json();
      setEbooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const saveEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "edit";
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${API}/api/library/ebooks/${modal.item.id}`
      : `${API}/api/library/ebooks`;

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

      toast.success("Saved successfully!");
      setModal(null);
      fetchData();
    } catch {
      toast.error("Server error.");
    }
  };

  const deleteEbook = async (id: number) => {
    if (!confirm("Delete this eBook?")) return;
    try {
      const res = await fetch(`${API}/api/library/ebooks/${id}`, {
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

  const fallbackEbooks = [
    {
      name: "Cambridge Core",
      url: "https://www.cambridge.org/core",
      desc: "A wide range of high-quality academic content from Cambridge University Press.",
      icon_name: "BookOpen"
    },
    {
      name: "EBC Reader",
      url: "https://www.ebcreader.com/",
      desc: "India's leading legal e-book platform with a vast collection of authoritative legal texts.",
      icon_name: "BookCopy"
    },
    {
      name: "LexisNexis Store",
      url: "https://store.lexisnexis.com/en-in",
      desc: "Global legal database and e-book collection for legal professionals and students.",
      icon_name: "BookOpen"
    }
  ];

  const displayEbooks = ebooks.length > 0 ? ebooks : fallbackEbooks;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="books" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy uppercase tracking-tight">E-Books</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Access a digital library of legal monographs, research papers, and classical law texts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {displayEbooks.map((platform, i) => {
                const IconComponent = (Icons as any)[platform.icon_name] || BookOpen;

                return (
                  <motion.div
                    key={platform.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-[32px] p-8 shadow-elegant border border-navy/5 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                  >
                    {token && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => {
                            setModal({ type: "edit", item: platform });
                            setFormData(platform);
                          }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-full hover:scale-110 transition-transform"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteEbook(platform.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-full hover:scale-110 transition-transform"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-600 transition-all group-hover:w-full" />
                    
                    <div className="mb-8 mx-auto w-20 h-20 rounded-2xl bg-blue-600/5 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <IconComponent className="h-10 w-10 flex-shrink-0" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-navy mb-4 uppercase tracking-tight">{platform.title || platform.name}</h3>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                      {platform.description || platform.desc}
                    </p>

                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-navy hover:bg-blue-600 text-white rounded-2xl py-6 h-auto font-bold shadow-lg transform group-hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                         Access Platform <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {token && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => {
                    setModal({ type: "add" });
                    setFormData({ icon_name: "BookOpen" });
                  }}
                  className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 py-6 h-auto text-lg gap-2 shadow-lg"
                >
                  <Plus className="h-5 w-5" /> Add E-Book
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
              <h3 className="text-xl font-serif font-bold">{modal.type === "edit" ? "Edit E-Book" : "Add E-Book"}</h3>
              <button onClick={() => setModal(null)} className="hover:scale-110 transition-transform">✕</button>
            </div>
            <form onSubmit={saveEbook} className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Title</label>
                <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="e.g. Cambridge Core" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
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
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Icon Name (Lucide)</label>
                <input className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="BookOpen, BookCopy, etc." value={formData.icon_name || ""} onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })} />
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

export default LibraryEBooks;
