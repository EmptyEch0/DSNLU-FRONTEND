import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export interface FacultyMember {
  id?: number;
  name: string;
  slug: string;
  designation: string;
  image_url: string;
  category_id: number;
  display_order: number;
  is_active: number;
}

interface Category {
  id: number;
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  facultyData: FacultyMember | null;
  categories: Category[];
  defaultCategoryId?: number;
  onSuccess: () => void;
}

export const FacultyEditModal = ({ isOpen, onClose, facultyData, categories, defaultCategoryId, onSuccess }: Props) => {
  const { token } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<FacultyMember>>({
    name: "",
    slug: "",
    designation: "",
    image_url: "",
    category_id: defaultCategoryId || 0,
    display_order: 0,
    is_active: 1,
  });

  useEffect(() => {
    if (facultyData) {
      setFormData(facultyData);
    } else {
      setFormData({
        name: "",
        slug: "",
        designation: "",
        image_url: "",
        category_id: defaultCategoryId || (categories.length > 0 ? categories[0].id : 0),
        display_order: 0,
        is_active: 1,
      });
    }
  }, [facultyData, isOpen, categories, defaultCategoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name || !formData.slug || !formData.image_url || !formData.category_id) {
      toast.error("Name, Slug, Image URL, and Category are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (facultyData?.id) {
        // Update
        await apiFetch(`/api/admin/faculty/${facultyData.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        toast.success("Faculty updated successfully");
      } else {
        // Create
        await apiFetch("/api/admin/faculty", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        toast.success("Faculty added successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Save Error", error);
      toast.error("Failed to save faculty");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-8 py-5 backdrop-blur-md">
          <h2 className="font-serif text-2xl font-bold text-[#0f2d5c]">
            {facultyData ? "Edit Faculty Member" : "Add Faculty Member"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-all hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Name *</label>
              <input
                type="text"
                required
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="Prof. (Dr.) John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Slug (unique-id) *</label>
              <input
                type="text"
                required
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="john-doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Designation *</label>
              <input
                type="text"
                required
                value={formData.designation || ""}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="Professor"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Category *</label>
              <select
                required
                value={formData.category_id || ""}
                onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
              >
                <option value="" disabled>Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                value={formData.display_order || 0}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Status</label>
              <select
                value={formData.is_active || 1}
                onChange={(e) => setFormData({ ...formData, is_active: parseInt(e.target.value) })}
                className="w-full rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-navy uppercase tracking-wider">Image URL *</label>
              <div className="flex gap-6 items-center">
                <input
                  type="url"
                  required
                  value={formData.image_url || ""}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="flex-1 rounded-2xl border border-input bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                  placeholder="https://..."
                />
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl">
                  {formData.image_url ? (
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] text-muted-foreground uppercase text-center p-2">No Image</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 -mx-8 -mb-8 mt-12 flex items-center justify-end gap-4 border-t bg-slate-50/90 px-8 py-6 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-8 py-3 text-sm font-bold text-navy transition-all hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-full bg-[#0f2d5c] px-10 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#1a3a6c] hover:shadow-gold/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5 text-gold" />
              )}
              {facultyData ? "Update Faculty" : "Save Faculty"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
