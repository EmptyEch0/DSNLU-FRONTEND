import { useState, useEffect } from "react";
import { X, Save, Loader2, Upload } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { VisitingFaculty } from "@/pages/AdminVisitingFaculty";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  facultyData: VisitingFaculty | null;
  onSuccess: () => void;
}

export const VisitingFacultyEditModal = ({ isOpen, onClose, facultyData, onSuccess }: Props) => {
  const { token } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<VisitingFaculty>>({
    name: "",
    designation: "Visiting Faculty",
    image_url: "",
    present_position: "Visiting Professor",
    display_order: 0,
  });

  useEffect(() => {
    if (facultyData) {
      setFormData(facultyData);
    } else {
      setFormData({
        name: "",
        designation: "Visiting Faculty",
        image_url: "",
        present_position: "Visiting Professor",
        display_order: 0,
      });
    }
  }, [facultyData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name || !formData.image_url) {
      toast.error("Name and Image URL are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (facultyData?.id) {
        // Update
        await apiFetch(`/api/visiting-faculty/${facultyData.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        toast.success("Visiting faculty updated successfully");
      } else {
        // Create
        await apiFetch("/api/visiting-faculty", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        toast.success("Visiting faculty added successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Save Error", error);
      toast.error("Failed to save visiting faculty");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 p-safe backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur-md">
          <h2 className="font-serif text-2xl font-bold text-navy">
            {facultyData ? "Edit Visiting Faculty" : "Add Visiting Faculty"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Name *</label>
              <input
                type="text"
                required
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Prof. (Dr.) John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Designation</label>
              <input
                type="text"
                value={formData.designation || ""}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Visiting Faculty"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Present Position</label>
              <input
                type="text"
                value={formData.present_position || ""}
                onChange={(e) => setFormData({ ...formData, present_position: e.target.value })}
                className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Visiting Professor"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Display Order</label>
              <input
                type="number"
                value={formData.display_order || 0}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="0"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-navy">Image URL *</label>
              <div className="flex gap-4 items-start">
                <input
                  type="url"
                  required
                  value={formData.image_url || ""}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="flex-1 rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="https://..."
                />
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                )}
              </div>
            </div>
            
            <div className="md:col-span-2 rounded-xl bg-blue-50 p-4 mt-2">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> To enter advanced details (Education, Experience, Publications, Conferences, Bio) for this visiting faculty, please insert them directly into the database or use the main Faculty Administration panel when available. Currently, only basic info required for the Visiting Faculty list is supported.
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 flex items-center justify-end gap-3 border-t bg-gray-50/80 px-6 py-4 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-full bg-navy px-8 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
