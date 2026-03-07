import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, BookOpen, Scale, Users } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface CampusItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  display_order: number;
}

const API = import.meta.env.VITE_API_URL;

const iconMap: Record<string, any> = {
  BookOpen,
  Scale,
  Building2,
  Users,
};

export function CampusSection() {
  const [facilities, setFacilities] = useState<CampusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAdmin();

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<CampusItem | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIcon, setFormIcon] = useState("");

  const fetchFacilities = async () => {
    const res = await fetch(`${API}/api/campus-life`);
    const data = await res.json();
    setFacilities(data);
    setLoading(false);
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
      body: JSON.stringify({ title: formTitle, description: formDesc, image_url: formImage, icon_name: formIcon, display_order: nextOrder }),
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
      body: JSON.stringify({ title: formTitle, description: formDesc, image_url: formImage, icon_name: formIcon, display_order: editItem.display_order }),
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
    setFormTitle(""); setFormDesc(""); setFormImage(""); setFormIcon("");
  };

  if (loading) return null;

  // Admin action buttons overlay
  const AdminActions = ({ item }: { item: CampusItem }) => (
    <div className="absolute top-2 right-2 z-20 flex gap-1">
      <button onClick={() => openEditModal(item)} title="Edit" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">✏️</button>
      <button onClick={() => handleDelete(item.id)} title="Delete" className="bg-white/90 p-1.5 rounded shadow hover:bg-red-50 transition-colors text-sm">🗑️</button>
      <button onClick={() => moveUp(item.id)} title="Move Up" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">⬆️</button>
      <button onClick={() => moveDown(item.id)} title="Move Down" className="bg-white/90 p-1.5 rounded shadow hover:bg-gold/20 transition-colors text-sm">⬇️</button>
    </div>
  );

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
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
        {token && (
          <div className="flex justify-end mb-8">
            <button
              onClick={() => { setShowAddModal(true); resetForm(); }}
              className="px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              + Add Facility
            </button>
          </div>
        )}

        {/* First 2 with image */}
        <div className="grid gap-8 md:grid-cols-2">
          {facilities.slice(0, 2).map((facility, index) => {
            const Icon = iconMap[facility.icon_name];
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                {token && <AdminActions item={facility} />}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={facility.image_url}
                    alt={facility.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 backdrop-blur-sm">
                    {Icon && <Icon className="h-6 w-6 text-gold" />}
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-ivory">
                    {facility.title}
                  </h3>
                  <p className="text-ivory/80">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Remaining simple cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {facilities.slice(2).map((facility, index) => {
            const Icon = iconMap[facility.icon_name];
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex items-start gap-4 rounded-xl border bg-card p-6 transition-all hover:border-gold/30 hover:shadow-md"
              >
                {token && <AdminActions item={facility} />}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  {Icon && <Icon className="h-7 w-7 text-gold" />}
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Add New Facility</h2>
            <input className="w-full border p-2 rounded" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title" />
            <textarea className="w-full border p-2 rounded" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description" rows={3} />
            <input className="w-full border p-2 rounded" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="Image URL" />
            <input className="w-full border p-2 rounded" value={formIcon} onChange={(e) => setFormIcon(e.target.value)} placeholder="Icon (BookOpen, Scale, Building2, Users)" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-navy text-gold rounded font-bold">Add Facility</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Edit Facility</h2>
            <input className="w-full border p-2 rounded" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title" />
            <textarea className="w-full border p-2 rounded" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description" rows={3} />
            <input className="w-full border p-2 rounded" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="Image URL" />
            <input className="w-full border p-2 rounded" value={formIcon} onChange={(e) => setFormIcon(e.target.value)} placeholder="Icon (BookOpen, Scale, Building2, Users)" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setEditItem(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-navy text-gold rounded font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}