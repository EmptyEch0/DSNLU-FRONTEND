import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  registrarData: any;
  onSuccess: () => void;
}

const API = import.meta.env.VITE_API_URL;

export const RegistrarEditModal = ({
  isOpen,
  onClose,
  registrarData,
  onSuccess,
}: Props) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (registrarData) {
      setForm(registrarData);
    }
  }, [registrarData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${API}/api/registrar/${registrarData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl space-y-4">
        <h2 className="text-xl font-bold">Edit Registrar</h2>

        <input
          className="w-full border p-2"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="w-full border p-2"
          value={form.designation || ""}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          placeholder="Designation"
        />

        <textarea
          className="w-full border p-2 h-40"
          value={form.message || ""}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Message"
        />

        <input
          className="w-full border p-2"
          value={form.image_url || ""}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="Image URL"
        />

        <div className="flex justify-end gap-4 pt-4">
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
