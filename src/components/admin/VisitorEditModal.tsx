import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import toast from "react-hot-toast";

interface Visitor {
  id: number;
  name: string;
  designation: string;
  university: string;
  title_tag: string;
  biography: string;
  image_url: string;
}

interface VisitorEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitorData: Visitor;
  onSuccess: () => void;
}

import { apiFetch } from "@/lib/api";

export function VisitorEditModal({ isOpen, onClose, visitorData, onSuccess }: VisitorEditModalProps) {
  const { token } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    university: "",
    title_tag: "",
    biography: "",
    image_url: "",
  });

  useEffect(() => {
    if (visitorData) {
      setFormData({
        name: visitorData.name || "",
        designation: visitorData.designation || "",
        university: visitorData.university || "",
        title_tag: visitorData.title_tag || "",
        biography: visitorData.biography || "",
        image_url: visitorData.image_url || "",
      });
    }
  }, [visitorData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/api/visitor/current", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      toast.success("Visitor profile updated successfully");
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update profile");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded bg-navy p-1.5 text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary">Edit Visitor Profile</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Title Tag (e.g. Visitor)</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.title_tag}
                    onChange={(e) => setFormData({ ...formData, title_tag: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Designation</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">University / Institution</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Profile Image URL</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Biography</label>
                <textarea
                  rows={10}
                  className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Enter biography details..."
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-gray-100 px-8 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-navy px-12 py-3 font-bold text-gold shadow-lg transition-all hover:bg-navy-light"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
