import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

interface VC {
  id: number;
  name: string;
  designation: string;
  university: string;
  short_message: string;
  full_message: string;
  image_url: string;
  resume_url: string;
}

interface VCEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vcData: VC;
  onSuccess: () => void;
}

import { apiFetch } from "@/lib/api";

export function VCEditModal({ isOpen, onClose, vcData, onSuccess }: VCEditModalProps) {
  const { token } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    university: "",
    short_message: "",
    full_message: "",
    image_url: "",
    resume_url: "",
  });

  useEffect(() => {
    if (vcData) {
      setFormData({
        name: vcData.name || "",
        designation: vcData.designation || "",
        university: vcData.university || "",
        short_message: vcData.short_message || "",
        full_message: vcData.full_message || "",
        image_url: vcData.image_url || "",
        resume_url: vcData.resume_url || "",
      });
    }
  }, [vcData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/api/vc/current", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      toast.success("Vice-Chancellor profile updated successfully");
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
                <h2 className="font-serif text-2xl font-bold text-primary">Edit VC Profile</h2>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">University</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Profile Image URL</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Resume/CV URL</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.resume_url}
                    onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Short Message (Homepage)</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="This message appears on homepage..."
                  value={formData.short_message}
                  onChange={(e) => setFormData({ ...formData, short_message: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">VC Message (Full / Biography)</label>
                <div className="h-[300px] overflow-hidden rounded-lg border">
                  <ReactQuill
                    theme="snow"
                    value={formData.full_message}
                    onChange={(val) => setFormData({ ...formData, full_message: val })}
                    className="h-full"
                  />
                </div>
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
