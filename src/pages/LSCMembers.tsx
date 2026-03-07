import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LSCHeader } from "@/components/layout/LSCHeader";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  GraduationCap, 
  Medal, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  ShieldCheck 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL;

interface LSCMember {
  id: number;
  member_type: "faculty" | "student";
  name: string;
  designation: string;
  role: string;
  display_order: number;
}

const LSCMembers = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<{ faculty: LSCMember[]; students: LSCMember[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin states
  const [modal, setModal] = useState<{ type: "add" | "edit"; data?: LSCMember } | null>(null);
  const [formData, setFormData] = useState<Partial<LSCMember>>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/lsc/members`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load committee members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/lsc/member/${modal.data?.id}`
      : `${API}/api/admin/lsc/member`;
    
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
        fetchData();
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
      const res = await fetch(`${API}/api/admin/lsc/member/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success("Member deleted");
        fetchData();
      } else {
        toast.error("Failed to delete member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

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
        <LSCHeader activeTab="members" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              
              {/* Faculty Coordinator */}
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left space-y-4">
                    <h2 className="font-serif text-3xl font-bold text-foreground">Faculty Coordinators</h2>
                    <div className="divider-gold mx-auto md:ml-0" />
                  </div>
                  {token && (
                    <button
                      onClick={() => {
                        setModal({ type: "add" });
                        setFormData({ member_type: "faculty", display_order: 0 });
                      }}
                      className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      Add Faculty
                    </button>
                  )}
                </div>

                <div className="grid gap-8 justify-center sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                  {data?.faculty.map((member, index) => (
                    <motion.div 
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative p-8 rounded-3xl border-2 border-gold/10 bg-white shadow-elegant text-center space-y-4 overflow-hidden group hover:border-gold/30 transition-all"
                    >
                      {token && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <button
                            onClick={() => {
                              setModal({ type: "edit", data: member });
                              setFormData(member);
                            }}
                            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-gold">
                        <Medal className="h-24 w-24" />
                      </div>
                      <div className="h-20 w-20 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
                        <UserCheck className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-navy">{member.name}</h3>
                      <p className="text-gold font-bold uppercase tracking-widest text-sm">{member.designation}</p>
                      <div className="pt-4 flex justify-center">
                        <span className="inline-flex items-center rounded-full bg-navy/5 px-4 py-1 text-xs font-bold text-navy uppercase tracking-tighter">
                          {member.role}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Student Members */}
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 flex-shrink-0 bg-gold rounded-full" />
                    <h3 className="font-serif text-2xl font-bold">Student Members</h3>
                  </div>
                  {token && (
                    <button
                      onClick={() => {
                        setModal({ type: "add" });
                        setFormData({ member_type: "student", display_order: 0 });
                      }}
                      className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      Add Student
                    </button>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data?.students.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-md transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-foreground group-hover:text-gold transition-colors">
                          {member.name}
                        </span>
                      </div>

                      {token && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setModal({ type: "edit", data: member });
                              setFormData(member);
                            }}
                            className="p-1 px-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-1 px-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recruitment Note */}
              <div className="mt-12 p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30 text-center">
                <p className="text-muted-foreground italic leading-relaxed">
                  Student members are selected through a rigorous process of interviews and academic standing, ensuring the committee remains composed of dedicated and ethical individuals.
                </p>
              </div>

            </div>
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
                {modal.type === "edit" ? "Edit" : "Add"} LSC Member
              </h3>
              <button 
                onClick={() => setModal(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMember} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Member Type</label>
                  <select
                    value={formData.member_type || ""}
                    onChange={(e) => setFormData({ ...formData, member_type: e.target.value as "faculty" | "student" })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="faculty">Faculty</option>
                    <option value="student">Student</option>
                  </select>
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

              {formData.member_type === "faculty" && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Designation</label>
                    <input
                      type="text"
                      value={formData.designation || ""}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="e.g. Faculty Coordinator"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Level / Role</label>
                    <input
                      type="text"
                      value={formData.role || ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="e.g. LSC Faculty Lead"
                    />
                  </div>
                </>
              )}

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

export default LSCMembers;
