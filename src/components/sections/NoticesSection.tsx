import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Calendar, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { useAdmin } from "@/context/AdminContext";

interface Notice {
  id: number;
  title: string;
  link: string;
  is_new: number;
  created_at: string;
}

const quickLinks = [
  { icon: FileText, label: "Academic Calendar", href: "#calendar" },
  { icon: Calendar, label: "Exam Schedule", href: "#exams" },
  { icon: Bell, label: "Circulars", href: "#circulars" },
  { icon: AlertCircle, label: "Important Dates", href: "#dates" },
];

const API = import.meta.env.VITE_API_URL;

export function NoticesSection() {
  const { token } = useAdmin();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Admin Editing State
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    is_new: 0,
  });

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/api/notifications`);
      const data = await res.json();
      setNotices(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch Notifications Error:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      link: notice.link,
      is_new: notice.is_new,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    
    try {
      const res = await fetch(`${API}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Notification deleted successfully");
        fetchNotices();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingNotice
      ? `${API}/api/notifications/${editingNotice.id}`
      : `${API}/api/notifications`;

    const method = editingNotice ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editingNotice ? "Updated Successfully" : "Added Successfully");
        setShowModal(false);
        fetchNotices();
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <section className="bg-primary py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-2 inline-block font-medium uppercase tracking-wider text-gold">
            Latest Updates
          </span>
          <h2 className="mb-2 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            Notifications & Updates
          </h2>
          <p className="text-sm text-primary-foreground/60">
            Admissions • Recruitment • Academics • Research • Events
          </p>
        </motion.div>

        {token && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setEditingNotice(null);
                setFormData({ title: "", link: "", is_new: 0 });
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
            >
              + Add Notification
            </button>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
              {notices.map((notice, index) => (
                <div key={notice.id} className="relative group">
                  <motion.a
                    href={notice.link || "#"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.05, 0.5) }}
                    className="flex items-start gap-4 rounded-xl border border-navy-light bg-navy-dark/50 p-4 transition-all hover:border-gold/30 hover:bg-navy-light/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Bell className="h-4 w-4 text-gold" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {notice.is_new === 1 && (
                        <span className="mb-1 inline-block rounded bg-gold px-2 py-0.5 text-xs font-bold text-navy">
                          NEW
                        </span>
                      )}

                      <h3 className="text-sm font-medium text-primary-foreground transition-colors group-hover:text-gold line-clamp-2">
                        {notice.title}
                      </h3>

                      <p className="mt-0.5 text-xs text-primary-foreground/60">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-gold opacity-0 transition-all group-hover:opacity-100" />
                  </motion.a>

                  {token && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit(notice);
                        }}
                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 text-xs rounded text-navy transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(notice.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full border-gold/30 text-gold hover:bg-gold hover:text-navy">
              View All Notifications <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-navy-light bg-navy-dark/50 p-8">
              <h3 className="mb-6 font-serif text-xl font-bold text-primary-foreground">
                Quick Links
              </h3>
              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-gold/20 hover:bg-navy-light/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <link.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="font-medium text-primary-foreground transition-colors group-hover:text-gold">
                      {link.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-gold opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* Admission CTA */}
            <div className="mt-6 rounded-2xl bg-gold p-8 text-center">
              <h3 className="mb-2 font-serif text-xl font-bold text-navy">
                Admissions 2026-27
              </h3>
              <p className="mb-4 text-sm text-navy/80">
                Applications are now open for all programs
              </p>
              <Button className="w-full bg-navy text-primary-foreground hover:bg-navy-dark">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-navy">
              {editingNotice ? "Edit Notification" : "Add Notification"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-navy/60 uppercase">Title</label>
                <input
                  type="text"
                  placeholder="Notification Title"
                  className="w-full border rounded p-2 text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy/60 uppercase">Link</label>
                <input
                  type="text"
                  placeholder="URL Link"
                  className="w-full border rounded p-2 text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                  checked={formData.is_new === 1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_new: e.target.checked ? 1 : 0,
                    })
                  }
                />
                <span className="text-sm text-navy font-medium">Mark as NEW</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-navy rounded font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
