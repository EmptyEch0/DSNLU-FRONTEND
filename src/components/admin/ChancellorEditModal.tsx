import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

export const ChancellorEditModal = ({
  isOpen,
  onClose,
  chancellorData,
  onSuccess,
}: any) => {
  const { token } = useAdmin();
  const [formData, setFormData] = useState<any>(null);

  // 🔥 Sync when data arrives
  useEffect(() => {
    if (chancellorData) {
      setFormData({
        ...chancellorData,
        is_current: chancellorData?.is_current ?? 0,
      });
    }
  }, [chancellorData]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await fetch(`${API}/api/chancellors/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl space-y-4">

        <h2 className="text-xl font-bold">Edit Chancellor</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          rows={6}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-navy text-gold rounded"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};
