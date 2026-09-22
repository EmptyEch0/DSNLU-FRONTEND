import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, BookOpen, Scale, Users, Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { Skeleton } from "@/components/ui/skeleton";

interface CampusItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  display_order: number;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const iconMap: Record<string, any> = {
  BookOpen,
  Scale,
  Building2,
  Users,
};

export function CampusSection() {
  const [facilities, setFacilities] = useState<CampusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAdminMode } = useAdmin();

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<CampusItem | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIcon, setFormIcon] = useState("");

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/campus-life`);
      if (res.ok) {
        const data = await res.json();
        setFacilities(Array.isArray(data) ? data : []);
      } else {
        setFacilities([]);
      }
    } catch (err) {
      console.error("Failed to fetch campus life:", err);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // --- Admin handlers ---
  const handleAdd = async () => {
    const nextOrder = facilities.length + 1;
    await fetch(`${API}/api/campus-life`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: formTitle,
        description: formDesc,
        image_url: formImage,
        icon_name: formIcon,
        display_order: nextOrder,
      }),
    });
    setShowAddModal(false);
    resetForm();
    fetchFacilities();
  };

  const handleEdit = async () => {
    if (!editItem) return;
    await fetch(`${API}/api/campus-life/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: formTitle,
        description: formDesc,
        image_url: formImage,
        icon_name: formIcon,
        display_order: editItem.display_order,
      }),
    });
    setEditItem(null);
    resetForm();
    fetchFacilities();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    await fetch(`${API}/api/campus-life/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFacilities();
  };

  const saveOrder = async (updated: CampusItem[]) => {
    const orders = updated.map((m, i) => ({ id: m.id, order: i + 1 }));
    await fetch(`${API}/api/campus-life/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orders }),
    });
  };

  const moveUp = (id: number) => {
    const index = facilities.findIndex((f) => f.id === id);
    if (index === 0) return;
    const updated = [...facilities];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((f, i) => ({ ...f, display_order: i + 1 }));
    setFacilities(reordered);
    saveOrder(reordered);
  };

  const moveDown = (id: number) => {
    const index = facilities.findIndex((f) => f.id === id);
    if (index === facilities.length - 1) return;
    const updated = [...facilities];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((f, i) => ({ ...f, display_order: i + 1 }));
    setFacilities(reordered);
    saveOrder(reordered);
  };

  const openEditModal = (item: CampusItem) => {
    setEditItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormImage(item.image_url);
    setFormIcon(item.icon_name || "");
  };

  const resetForm = () => {
    setFormTitle("");
    setFormDesc("");
    setFormImage("");
    setFormIcon("");
  };

  // Admin action buttons overlay
  const AdminActions = ({ item }: { item: CampusItem }) => (
    <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-navy-dark/90 backdrop-blur-md p-1.5 rounded-lg border border-gold/30 shadow-lg">
      <button
        onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
        title="Edit facility"
        className="p-1.5 rounded-md hover:bg-gold/20 text-gold transition-colors"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
        title="Delete facility"
        className="p-1.5 rounded-md hover:bg-red-500/20 text-red-400 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); moveUp(item.id); }}
        title="Move Up"
        className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); moveDown(item.id); }}
        title="Move Down"
        className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <section className="bg-background py-20 lg:py-28 relative">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-medium uppercase tracking-wider text-gold">
            Campus Life
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Life at DSNLU
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A vibrant campus experience with world-class facilities and opportunities for growth
          </p>
        </motion.div>

        {/* Admin Add Button */}
        {token && isAdminMode && (
          <div className="flex justify-end mb-8">
            <button
              onClick={() => {
                setShowAddModal(true);
                resetForm();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg border border-gold/30 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add Facility
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Skeleton className="h-72 w-full rounded-2xl" />
              <Skeleton className="h-72 w-full rounded-2xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* First 2 facilities with image cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {facilities.slice(0, 2).map((facility, index) => {
                const Icon = iconMap[facility.icon_name || ""] || Building2;
                return (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="group relative overflow-hidden rounded-2xl border border-border shadow-sm bg-card"
                  >
                    {token && isAdminMode && <AdminActions item={facility} />}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <OptimizedImage
                        src={facility.image_url}
                        alt={facility.title}
                        containerClassName="h-full w-full"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 backdrop-blur-sm border border-gold/30">
                        <Icon className="h-6 w-6 text-gold" />
                      </div>
                      <h3 className="mb-2 font-serif text-2xl font-bold text-ivory">
                        {facility.title}
                      </h3>
                      <p className="text-ivory/80 text-sm leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Remaining facilities as structured feature cards */}
            {facilities.length > 2 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {facilities.slice(2).map((facility, index) => {
                  const Icon = iconMap[facility.icon_name || ""] || Building2;
                  return (
                    <motion.div
                      key={facility.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative flex items-start gap-4 rounded-xl border bg-card p-6 transition-all hover:border-gold/30 hover:shadow-md"
                    >
                      {token && isAdminMode && <AdminActions item={facility} />}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-gold/20">
                        <Icon className="h-7 w-7 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                          {facility.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {facility.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card text-card-foreground border p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl">
            <h2 className="text-xl font-serif font-bold text-foreground">Add New Facility</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Modern Moot Court"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe the facility..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Image URL</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Icon (Building2, BookOpen, Scale, Users)</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formIcon}
                  onChange={(e) => setFormIcon(e.target.value)}
                  placeholder="Building2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-5 py-2 bg-navy text-gold rounded-lg font-bold text-sm shadow hover:bg-navy-light transition-colors"
              >
                Add Facility
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card text-card-foreground border p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl">
            <h2 className="text-xl font-serif font-bold text-foreground">Edit Facility</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Image URL</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="Image URL"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Icon</label>
                <input
                  className="w-full border bg-background text-foreground p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                  value={formIcon}
                  onChange={(e) => setFormIcon(e.target.value)}
                  placeholder="Icon"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-5 py-2 bg-navy text-gold rounded-lg font-bold text-sm shadow hover:bg-navy-light transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}