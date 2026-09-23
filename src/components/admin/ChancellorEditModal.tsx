import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { X } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export const ChancellorEditModal = ({
  isOpen,
  onClose,
  chancellorData,
  onSuccess,
}: any) => {
  const { token } = useAdmin();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sync when data arrives
  useEffect(() => {
    if (chancellorData) {
      setFormData({
        ...chancellorData,
        title_tag: chancellorData?.title_tag || "",
        name: chancellorData?.name || "",
        designation: chancellorData?.designation || "",
        university_designation: chancellorData?.university_designation || "",
        image_url: chancellorData?.image_url || "",
        biography: chancellorData?.biography || "",
        is_current: chancellorData?.is_current ?? 1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/chancellors/${formData.id || 11}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        console.error("Failed to update chancellor profile");
      }
    } catch (err) {
      console.error("Error saving chancellor data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card text-card-foreground border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-navy">Edit Chancellor Profile</h2>
            <p className="text-xs text-muted-foreground mt-1">Update Chancellor details, titles, and biography</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Title Tag
              </label>
              <input
                name="title_tag"
                value={formData.title_tag || ""}
                onChange={handleChange}
                placeholder="Hon'ble Smt. Justice"
                className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Lisa Gill"
                className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Judicial Designation
              </label>
              <input
                name="designation"
                value={formData.designation || ""}
                onChange={handleChange}
                placeholder="The Hon'ble The Chief Justice"
                className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                University Designation
              </label>
              <input
                name="university_designation"
                value={formData.university_designation || ""}
                onChange={handleChange}
                placeholder="Chancellor, DSNLU"
                className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Profile Image URL
            </label>
            <input
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography || ""}
              onChange={handleChange}
              rows={8}
              placeholder="Enter biography..."
              className="w-full border rounded-lg p-2.5 text-sm bg-background focus:ring-2 focus:ring-gold outline-none font-sans leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-navy text-gold font-bold rounded-lg text-sm shadow-md hover:bg-navy/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
