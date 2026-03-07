import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ChevronRight, FileText, Download, Calendar,
  ArrowRight, Plus, Pencil, Trash2, X, Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAdmin } from "@/context/AdminContext";

// ─── Constants ────────────────────────────────────────────────────────────────

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TABS = [
  "Notifications",
  "Examination Results",
  "Events",
  "Seminar/Conferences",
  "Centers & Journals",
  "Others",
] as const;

const YEARS = ["2025", "2024", "2023", "2022"] as const;

type Tab  = (typeof TABS)[number];
type Year = (typeof YEARS)[number];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArchiveItem {
  id: number;
  category: string;
  year: string;
  title: string;
  file_url: string;
  published_date: string;
  display_order: number;
  is_active: number;
}

interface FormState {
  title: string;
  file_url: string;
  published_date: string;
  display_order: number;
}

const EMPTY_FORM: FormState = {
  title: "",
  file_url: "",
  published_date: "",
  display_order: 0,
};

// ─── Component ────────────────────────────────────────────────────────────────

const Archives = () => {
  const { isAdminMode, token } = useAdmin();
  const isAdmin = !!token && isAdminMode;

  const [activeTab,  setActiveTab]  = useState<Tab>("Notifications");
  const [activeYear, setActiveYear] = useState<Year>("2024");
  const [items,      setItems]      = useState<ArchiveItem[]>([]);
  const [loading,    setLoading]    = useState(false);

  // Modal state
  const [modalOpen,   setModalOpen]   = useState(false);
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null);
  const [form,        setForm]        = useState<FormState>(EMPTY_FORM);
  const [saving,      setSaving]      = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/archives?category=${encodeURIComponent(activeTab)}&year=${activeYear}`
      );
      const json = await res.json();
      if (json.success) setItems(json.data);
      else toast.error("Failed to load archives");
    } catch {
      toast.error("Network error – could not load archives");
    } finally {
      setLoading(false);
    }
  }, [activeTab, activeYear]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // ── Modal helpers ──────────────────────────────────────────────────────────

  const openAdd = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (item: ArchiveItem) => {
    setEditingItem(item);
    setForm({
      title:          item.title,
      file_url:       item.file_url,
      published_date: item.published_date,
      display_order:  item.display_order,
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingItem(null); };

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.title.trim() || !form.file_url.trim() || !form.published_date) {
      toast.error("Title, File URL and Date are required");
      return;
    }
    setSaving(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url    = editingItem
        ? `${API}/api/archives/${editingItem.id}`
        : `${API}/api/archives`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category:       activeTab,
          year:           activeYear,
          title:          form.title,
          file_url:       form.file_url,
          published_date: form.published_date,
          display_order:  form.display_order,
          is_active:      1,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Save failed");

      toast.success(editingItem ? "Archive updated" : "Archive added");
      closeModal();
      fetchItems();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: ArchiveItem) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try {
      const res  = await fetch(`${API}/api/archives/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      toast.success("Archive deleted");
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compliance &amp; Media</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Archives</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
            >
              Compliance &amp; Media
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              ARCHIVES
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold"
            />
          </div>
        </section>

        {/* Tabs + Year Filter */}
        <section className="py-12 bg-secondary/20 border-b">
          <div className="container overflow-x-auto">
            <div className="flex flex-col gap-8">
              {/* Category Tabs */}
              <div className="flex flex-nowrap gap-2 pb-4 scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                      activeTab === tab
                        ? "bg-gold text-navy border-gold shadow-lg"
                        : "bg-background text-muted-foreground border-border hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Year Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground tracking-widest mr-2">
                  <Calendar className="h-4 w-4 text-gold" /> Filter by Year:
                </span>
                {YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      activeYear === year
                        ? "bg-navy text-gold"
                        : "bg-muted text-muted-foreground hover:bg-gold/10 hover:text-gold"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* List */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">

            {/* Section header */}
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {activeTab} <span className="text-gold">({activeYear})</span>
              </h2>
              <div className="flex items-center gap-4">
                {!loading && (
                  <p className="text-sm text-muted-foreground font-medium">
                    Showing {items.length} record{items.length !== 1 ? "s" : ""}
                  </p>
                )}
                {isAdmin && (
                  <Button
                    size="sm"
                    className="bg-gold text-navy hover:bg-gold/90 font-bold gap-2"
                    onClick={openAdd}
                  >
                    <Plus className="h-4 w-4" /> Add Entry
                  </Button>
                )}
              </div>
            </div>

            {/* Loading spinner */}
            {loading && (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-gold" />
              </div>
            )}

            {/* Empty state */}
            {!loading && items.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
                <FileText className="h-12 w-12 opacity-30" />
                <p className="font-medium">No records found for this selection.</p>
              </div>
            )}

            {/* Items */}
            <AnimatePresence mode="wait">
              {!loading && items.length > 0 && (
                <motion.div
                  key={`${activeTab}-${activeYear}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="group bg-card border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 flex items-center gap-4"
                    >
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                        <FileText className="h-6 w-6" />
                      </div>

                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground group-hover:text-gold transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Published on {item.published_date}
                        </p>
                      </div>

                      {/* Admin actions */}
                      {isAdmin && (
                        <div className="hidden sm:flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground hover:text-gold hover:bg-gold/10"
                            onClick={() => openEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {/* View button */}
                      <Button
                        asChild
                        variant="ghost"
                        className="hidden sm:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm tracking-wide gap-2 group/btn"
                      >
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                          View File{" "}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </a>
                      </Button>

                      {/* Mobile */}
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Admin Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Dialog */}
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-5 border-b bg-secondary/40">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {editingItem ? "Edit Archive Entry" : "Add Archive Entry"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal body */}
                <div className="px-6 py-6 space-y-5">
                  {/* Category + Year (read-only display) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Category
                      </label>
                      <div className="px-3 py-2 rounded-xl bg-secondary text-sm font-medium text-foreground">
                        {activeTab}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Year
                      </label>
                      <div className="px-3 py-2 rounded-xl bg-secondary text-sm font-medium text-foreground">
                        {activeYear}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Notification for Semester Exams"
                      className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                    />
                  </div>

                  {/* File URL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      File URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={form.file_url}
                      onChange={(e) => setForm((f) => ({ ...f, file_url: e.target.value }))}
                      placeholder="https://example.com/file.pdf"
                      className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                    />
                  </div>

                  {/* Date + Display Order */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Published Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={form.published_date}
                        onChange={(e) => setForm((f) => ({ ...f, published_date: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={form.display_order}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, display_order: Number(e.target.value) }))
                        }
                        className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal footer */}
                <div className="px-6 py-4 border-t bg-secondary/20 flex justify-end gap-3">
                  <Button variant="outline" onClick={closeModal} disabled={saving}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gold text-navy hover:bg-gold/90 font-bold gap-2"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingItem ? "Update Entry" : "Add Entry"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Archives;
