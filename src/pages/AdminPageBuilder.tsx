import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plus, Pencil, Trash2, ExternalLink, Menu, Layout, Settings, ChevronRight, Loader2, Save, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Page {
  id: number;
  title: string;
  slug: string;
  is_active: number;
  created_at: string;
}

interface NavAddition {
  id: number;
  nav_parent: string;
  group_heading: string;
  item_label: string;
  page_slug: string;
  display_order: number;
  is_active: number;
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

const AdminPageBuilder = () => {
  const { token, isAdminMode } = useAdmin();
  const [pages, setPages] = useState<Page[]>([]);
  const [navAdditions, setNavAdditions] = useState<NavAddition[]>([]);
  const [loading, setLoading] = useState(true);

  const [isPageModalOpen, setPageModalOpen] = useState(false);
  const [isNavModalOpen, setNavModalOpen] = useState(false);

  const [editingPage, setEditingPage] = useState<Partial<Page> | null>(null);
  const [editingNav, setEditingNav] = useState<Partial<NavAddition> | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const auth = { Authorization: `Bearer ${token}` };
      const [pRes, nRes] = await Promise.all([
        fetch(`${API}/api/dynamic-pages`, { headers: auth }),
        fetch(`${API}/api/dynamic-pages/nav-additions/all`, { headers: auth }),
      ]);
      const [pData, nData] = await Promise.all([pRes.json(), nRes.json()]);

      if (pData.success) setPages(pData.data);
      if (nData.success) setNavAdditions(nData.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  if (!token || !isAdminMode) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold text-navy mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You must be logged in as an admin to view this page.</p>
        <Button asChild><Link to="/">Go Home</Link></Button>
      </div>
    );
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  const handleDeletePage = async (id: number) => {
    if (!confirm("Delete this page and ALL its sections?")) return;
    try {
      await fetch(`${API}/api/dynamic-pages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Page deleted");
      fetchData();
    } catch { toast.error("Delete failed"); }
  };

  const handleDeleteNav = async (id: number) => {
    if (!confirm("Remove this entry from the navigation?")) return;
    try {
      await fetch(`${API}/api/dynamic-pages/nav-additions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Nav entry removed");
      fetchData();
    } catch { toast.error("Delete failed"); }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingPage?.id;
    const url = isNew ? `${API}/api/dynamic-pages` : `${API}/api/dynamic-pages/${editingPage.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingPage),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? "Page created" : "Page updated");
        setPageModalOpen(false);
        fetchData();
      } else {
        toast.error(data.message || "Save failed");
      }
    } catch { toast.error("Save failed"); }
  };

  const handleSaveNav = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingNav?.id;
    const url = isNew ? `${API}/api/dynamic-pages/nav-additions` : `${API}/api/dynamic-pages/nav-additions/${editingNav.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingNav),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? "Nav entry added" : "Nav entry updated");
        setNavModalOpen(false);
        fetchData();
      } else {
        toast.error(data.message || "Save failed");
      }
    } catch { toast.error("Save failed"); }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20">
        {/* Header Section */}
        <section className="bg-[#0f2d5c] py-12 text-white">
          <div className="container">
            <h1 className="font-serif text-3xl font-bold uppercase tracking-wider mb-2">Page & Menu Management</h1>
            <p className="text-blue-200">Create custom pages and inject them into the main navigation.</p>
          </div>
        </section>

        <div className="container py-8 grid lg:grid-cols-2 gap-8">
          
          {/* ─── PAGES MANAGEMENT ─── */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/10 text-gold"><Layout className="h-5 w-5" /></div>
                <h2 className="text-xl font-bold text-navy">Dynamic Pages</h2>
              </div>
              <Button onClick={() => { setEditingPage({ title: "", slug: "", is_active: 1 }); setPageModalOpen(true); }} className="bg-gold text-navy hover:bg-gold/90 font-bold gap-2">
                <Plus className="h-4 w-4" /> Create Page
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
            ) : (
              <div className="grid gap-4">
                {pages.map(page => (
                  <div key={page.id} className="p-4 rounded-xl border bg-card hover:shadow-md transition-all flex items-center justify-between group">
                    <div>
                      <h4 className="font-bold text-navy">{page.title}</h4>
                      <p className="text-xs text-muted-foreground font-mono">/pages/{page.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        <Link to={`/pages/${page.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                      </Button>
                      <Button onClick={() => { setEditingPage(page); setPageModalOpen(true); }} variant="ghost" size="sm" className="text-gold hover:bg-gold/10">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDeletePage(page.id)} variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {pages.length === 0 && <p className="text-center py-12 text-muted-foreground italic">No dynamic pages yet.</p>}
              </div>
            )}
          </section>

          {/* ─── NAVBAR ADDITIONS ─── */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600"><Menu className="h-5 w-5" /></div>
                <h2 className="text-xl font-bold text-navy">Navbar Integration</h2>
              </div>
              <Button onClick={() => { setEditingNav({ nav_parent: "Academics", group_heading: "", item_label: "", page_slug: "", display_order: 99, is_active: 1 }); setNavModalOpen(true); }} className="bg-navy text-white hover:bg-navy/90 font-bold gap-2">
                <Plus className="h-4 w-4" /> Add to Menu
              </Button>
            </div>

            <div className="grid gap-4">
              {navAdditions.map(nav => (
                <div key={nav.id} className="p-4 rounded-xl border bg-card hover:shadow-md transition-all flex items-center justify-between group">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-tighter mb-1">
                      <span>{nav.nav_parent}</span>
                      <ChevronRight className="h-3 w-3" />
                      <span>{nav.group_heading}</span>
                    </div>
                    <h4 className="font-bold text-navy">{nav.item_label}</h4>
                    <p className="text-xs text-muted-foreground">Slug: {nav.page_slug}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button onClick={() => { setEditingNav(nav); setNavModalOpen(true); }} variant="ghost" size="sm" className="text-gold hover:bg-gold/10">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleDeleteNav(nav.id)} variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {navAdditions.length === 0 && <p className="text-center py-12 text-muted-foreground italic">No custom menu links yet.</p>}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* ─── PAGE MODAL ─── */}
      <AnimatePresence>
        {isPageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.form onSubmit={handleSavePage} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-card rounded-2xl shadow-2xl border overflow-hidden">
              <div className="px-6 py-4 border-b bg-secondary/30 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-navy">{editingPage?.id ? "Edit Page" : "New Page"}</h3>
                <button type="button" onClick={() => setPageModalOpen(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Page Title</label>
                  <input required value={editingPage?.title} onChange={e => setEditingPage({ ...editingPage, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-background" placeholder="e.g. Research Ethics Committee" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Slug (URL)</label>
                  <input required value={editingPage?.slug} onChange={e => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/ /g, '-') })} className="w-full px-3 py-2 rounded-xl border bg-background" placeholder="research-ethics" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Active Status</label>
                  <select value={editingPage?.is_active} onChange={e => setEditingPage({ ...editingPage, is_active: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border bg-background">
                    <option value={1}>Active (Visible)</option>
                    <option value={0}>Draft (Hidden)</option>
                  </select>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex gap-3 text-xs text-blue-700">
                  <Info className="h-4 w-4 shrink-0" />
                  <p>Once created, you can add content sections directly on the page while in Admin Mode.</p>
                </div>
              </div>
              <div className="px-6 py-4 border-t bg-secondary/10 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setPageModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-gold text-navy hover:bg-gold/90 font-bold gap-2"><Save className="h-4 w-4" /> Save Page</Button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* ─── NAV MODAL ─── */}
      <AnimatePresence>
        {isNavModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.form onSubmit={handleSaveNav} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-card rounded-2xl shadow-2xl border overflow-hidden">
              <div className="px-6 py-4 border-b bg-secondary/30 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-navy">{editingNav?.id ? "Edit Nav Entry" : "Add to Navbar"}</h3>
                <button type="button" onClick={() => setNavModalOpen(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Top-Level Menu</label>
                  <select required value={editingNav?.nav_parent} onChange={e => setEditingNav({ ...editingNav, nav_parent: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-background">
                    <option value="Academics">Academics</option>
                    <option value="Admission">Admission</option>
                    <option value="Students">Students</option>
                    <option value="Library">Library</option>
                    <option value="Administration">Administration</option>
                    <option value="Publications">Publications</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Group Heading</label>
                  <input required value={editingNav?.group_heading} onChange={e => setEditingNav({ ...editingNav, group_heading: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-background" placeholder="e.g. Committees" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Link Label</label>
                  <input required value={editingNav?.item_label} onChange={e => setEditingNav({ ...editingNav, item_label: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-background" placeholder="e.g. Academic Council" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Page Slug (Destination)</label>
                  <select required value={editingNav?.page_slug} onChange={e => setEditingNav({ ...editingNav, page_slug: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-background">
                    <option value="">Select a page...</option>
                    {pages.map(p => <option key={p.id} value={p.slug}>{p.title} ({p.slug})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Display Order</label>
                  <input type="number" value={editingNav?.display_order} onChange={e => setEditingNav({ ...editingNav, display_order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border bg-background" />
                </div>
              </div>
              <div className="px-6 py-4 border-t bg-secondary/10 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setNavModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-navy text-white hover:bg-navy/90 font-bold gap-2"><Save className="h-4 w-4" /> Save Link</Button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPageBuilder;
