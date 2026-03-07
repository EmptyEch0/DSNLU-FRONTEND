import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

export default function AdminCampusLife() {
  const [items, setItems] = useState<any[]>([]);
  const { token } = useAdmin();
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    image_url: "",
    icon_name: "",
    display_order: 1,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    const res = await fetch(`${API}/api/campus-life`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`${API}/api/campus-life/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${API}/api/campus-life`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
    }

    setForm({ title: "", description: "", image_url: "", icon_name: "", display_order: 1 });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`${API}/api/campus-life/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Campus Life Admin</h2>

      {/* Form */}
      <div className="space-y-4 mb-8">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Icon Name (BookOpen, Scale, Building2, Users)"
          value={form.icon_name}
          onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Display Order"
          value={form.display_order}
          onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-navy text-gold px-6 py-2 rounded font-bold"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Order</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border text-center">{item.id}</td>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border text-center">{item.icon_name}</td>
              <td className="p-2 border text-center">{item.display_order}</td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
