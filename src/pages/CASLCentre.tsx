import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 19;
const CENTRE_NAME = "Centre for Aviation and Space Laws (CAS-L)";

const CASLCentre = () => {
  const { token } = useAdmin();

  const [content, setContent] = useState<any[]>([]);
  const [committee, setCommittee] = useState<any[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState<"about" | "committee">("committee");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    role: "",
    name: "",
    display_order: 1,
  });

  useEffect(() => {
    fetchContent();
    fetchCommittee();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/content`);
      setContent(await res.json());
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchCommittee = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/committee`);
      setCommittee(await res.json());
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  const openEdit = (item: any, type: "about" | "committee") => {
    setEditType(type);
    setEditItem(item);

    if (type === "about") {
      setFormData({
        title: item?.title || "",
        content: item?.content || "",
        role: "",
        name: "",
        display_order: 1,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        role: item?.role || "",
        name: item?.name || "",
        display_order: item?.display_order || committee.length + 1,
      });
    }

    setShowModal(true);
  };

  const handleSave = async () => {
    let url = "";
    let method = editItem ? "PUT" : "POST";

    if (editType === "about") {
      url = `/api/centres/admin/content/${editItem.id}`;
    } else {
      url = editItem ? `/api/centres/admin/committee/${editItem.id}` : `/api/centres/admin/committee`;
    }

    try {
      const response = await fetch(`${API}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centre_id: CENTRE_ID,
          ...formData,
        }),
      });

      if (response.ok) {
        toast.success("Saved successfully");
        setShowModal(false);
        fetchContent();
        fetchCommittee();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("Error saving data");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API}/api/centres/admin/committee/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Deleted");
        fetchCommittee();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">CAS-L</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden text-center text-white">
          <div className="container relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold md:text-5xl uppercase tracking-wider"
            >
              {CENTRE_NAME}
            </motion.h1>
            <div className="mx-auto mt-6 h-1 w-24 bg-gold rounded-full" />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container max-w-5xl space-y-20">
            
            {/* About Content */}
            <div className="space-y-12">
              {content.map((c) => (
                <div key={c.id} className="space-y-6">
                  <div className="flex items-center justify-between border-l-4 border-gold pl-6">
                    <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">
                      {c.title}
                    </h2>
                    {token && (
                      <button onClick={() => openEdit(c, "about")} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic text-lg text-justify whitespace-pre-line">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Committee Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-l-4 border-gold pl-6">
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">
                  Committee
                </h2>
                {token && (
                  <button onClick={() => openEdit(null, "committee")} className="bg-gold text-[#0f2d5c] px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-sm flex items-center gap-2">
                    <Plus className="h-3.5 w-3.5" /> Add Member
                  </button>
                )}
              </div>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium">
                    {committee.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10">
                          {member.role}
                          {token && (
                            <div className="flex gap-2 mt-1">
                               <button onClick={() => openEdit(member, "committee")} className="text-blue-600 hover:underline text-[10px]">Edit</button>
                               <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:underline text-[10px]">Delete</button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">{member.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-xl"
            >
              <h2 className="text-xl font-bold text-[#0f2d5c]">
                {editItem ? "Edit" : "Add"} {editType === "about" ? "Content" : "Member"}
              </h2>

              {editType === "about" ? (
                <>
                  <input
                    className="w-full border p-2 rounded focus:border-gold outline-none font-bold"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <textarea
                    className="w-full border p-2 rounded focus:border-gold outline-none leading-relaxed"
                    rows={8}
                    placeholder="Content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <input
                    className="w-full border p-2 rounded focus:border-gold outline-none"
                    placeholder="Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <input
                    className="w-full border p-2 rounded focus:border-gold outline-none"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-2 rounded focus:border-gold outline-none"
                    placeholder="Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-bold hover:text-red-500">Cancel</button>
                <button onClick={handleSave} className="bg-[#0f2d5c] text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CASLCentre;
