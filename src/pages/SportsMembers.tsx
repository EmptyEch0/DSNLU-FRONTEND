import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  ShieldCheck, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  ArrowUpDown 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL;

interface SportsMember {
  id: number;
  name: string;
  role: string;
  member_type: string;
  is_highlight: boolean;
  display_order: number;
}

const SportsMembers = () => {
  const { token } = useAdmin();
  const [members, setMembers] = useState<SportsMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin states
  const [modal, setModal] = useState<{ type: "add" | "edit"; data?: SportsMember } | null>(null);
  const [formData, setFormData] = useState<Partial<SportsMember>>({});

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/api/sports/committee`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load committee members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/sports/committee/${modal.data?.id}`
      : `${API}/api/admin/sports/committee`;
    
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(isEdit ? "Member updated" : "Member added");
        setModal(null);
        fetchMembers();
      } else {
        toast.error("Failed to save member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(`${API}/api/admin/sports/committee/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success("Member deleted");
        fetchMembers();
      } else {
        toast.error("Failed to delete member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const highlightedMember = members.find(m => m.is_highlight);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="members" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-2">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">
                    Sports Committee Members
                  </h2>
                  <div className="divider-gold mx-auto md:ml-0" />
                </div>
                {token && (
                  <button
                    onClick={() => {
                      setModal({ type: "add" });
                      setFormData({ is_highlight: false, display_order: members.length });
                    }}
                    className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                  >
                    <Plus className="h-4 w-4" />
                    Add Member
                  </button>
                )}
              </div>

              {/* Convener Highlight Card */}
              {highlightedMember && (
                <div className="flex justify-center mb-12">
                  <div className="w-full max-w-md p-8 rounded-3xl border-2 border-gold bg-white shadow-elegant text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-navy">
                      <ShieldCheck className="h-24 w-24" />
                    </div>
                    {token && (
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={() => {
                            setModal({ type: "edit", data: highlightedMember });
                            setFormData(highlightedMember);
                          }}
                          className="p-2 rounded-full bg-white/90 text-navy hover:bg-gold hover:text-navy transition-all shadow-md"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">{highlightedMember.name}</h3>
                    <div className="mt-2 text-gold font-bold uppercase tracking-widest text-sm">
                      {highlightedMember.role}
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Table */}
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-navy text-white text-sm uppercase tracking-wider">
                      <th className="px-8 py-5 font-bold">Name</th>
                      <th className="px-8 py-5 font-bold text-right">Role</th>
                      {token && <th className="px-8 py-5 font-bold text-center">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {members.map((member, index) => (
                      <motion.tr 
                        key={member.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="hover:bg-muted/50 transition-colors group"
                      >
                        <td className="px-8 py-5 font-bold text-foreground group-hover:text-gold transition-colors">
                          {member.name}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter",
                            member.role.toLowerCase().includes("convener") 
                              ? "bg-gold/10 text-gold" 
                              : "bg-navy/5 text-muted-foreground"
                          )}>
                            {member.role}
                          </span>
                        </td>
                        {token && (
                          <td className="px-8 py-5">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => {
                                  setModal({ type: "edit", data: member });
                                  setFormData(member);
                                }}
                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30 text-center">
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  The committee includes representation from both faculty and administrative staff, ensuring a balance between academic requirements and student welfare in sports.
                </p>
              </div>

            </motion.div>
          </div>
        </section>
      </main>

      {/* Admin Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl"
          >
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                {modal.type === "edit" ? "Edit" : "Add"} Committee Member
              </h3>
              <button 
                onClick={() => setModal(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMember} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role / Designation</label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="e.g. Convener"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order ?? ""}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gold/5 border border-gold/20">
                <input
                  type="checkbox"
                  id="is_highlight"
                  checked={formData.is_highlight || false}
                  onChange={(e) => setFormData({ ...formData, is_highlight: e.target.checked })}
                  className="h-4 w-4 rounded border-gold text-gold focus:ring-gold"
                />
                <label htmlFor="is_highlight" className="text-xs font-bold text-navy cursor-pointer">
                  Highlight as Lead (Convener Card)
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-xl border-2 border-secondary p-3 text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-navy p-3 text-xs font-black uppercase tracking-widest text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  {modal.type === "edit" ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SportsMembers;
