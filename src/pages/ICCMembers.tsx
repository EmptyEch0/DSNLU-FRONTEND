import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Users, 
  UserCheck, 
  GraduationCap,
  ShieldCheck,
  Award,
  Plus,
  Pencil,
  Trash2,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ICCHeader } from "@/components/layout/ICCHeader";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL;

interface ICCPage {
  id: number;
  slug: string;
  title: string;
  note: string;
}

interface ICCMember {
  id: number;
  page_id: number;
  member_type: "faculty" | "student";
  name: string;
  designation: string;
  role: string;
  display_order: number;
}

const ICCMembers = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<{ page: ICCPage; members: ICCMember[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin states
  const [modal, setModal] = useState<{ type: "add" | "edit"; data?: ICCMember } | null>(null);
  const [formData, setFormData] = useState<Partial<ICCMember>>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/icc/members`);
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

  const facultyMembers = data?.members?.filter(m => m.member_type === "faculty") || [];
  const studentMembers = data?.members?.filter(m => m.member_type === "student") || [];

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.page?.id) return;

    const isEdit = modal?.type === "edit";
    const url = isEdit
      ? `${API}/api/admin/icc/member/${modal.data?.id}`
      : `${API}/api/admin/icc/member`;
    
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          page_id: data.page.id
        })
      });

      if (res.ok) {
        toast.success(`Member ${isEdit ? "updated" : "added"} successfully`);
        setModal(null);
        fetchData();
      } else {
        toast.error("Failed to save member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving");
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(`${API}/api/admin/icc/member/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success("Member deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
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
        <ICCHeader activeTab="members" />

        {/* Faculty Members */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="space-y-12">
               <div className="flex items-center justify-between border-b-2 border-gold/20 pb-4">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="h-8 w-8 text-gold" />
                    <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Faculty & Staff Members</h2>
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

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facultyMembers.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-8 rounded-3xl bg-white border border-navy/5 shadow-xl hover:shadow-2xl hover:border-gold/30 transition-all text-center flex flex-col items-center"
                    >
                       {token && (
                         <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

                       <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-all ring-4 ring-gold/20">
                          <UserCheck className="h-8 w-8" />
                       </div>
                       <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors">{member.name}</h3>
                       <p className="mt-2 text-gold font-black uppercase tracking-widest text-xs">
                         {member.role || (member.designation ? member.designation : "Member")}
                       </p>
                       <div className="mt-6 pt-6 border-t border-secondary w-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          University Administration
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Student Members */}
        <section className="py-20 lg:py-32 bg-secondary/30">
          <div className="container">
            <div className="space-y-12">
               <div className="flex items-center justify-between border-b-2 border-navy/10 pb-4">
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
                  <div className="flex items-center gap-4 ml-auto">
                    <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Student Members</h2>
                    <GraduationCap className="h-8 w-8 text-gold" />
                  </div>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {studentMembers.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative p-6 rounded-2xl bg-white border shadow-md hover:shadow-xl transition-all border-l-4 border-l-gold"
                    >
                       {token && (
                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button
                             onClick={() => {
                               setModal({ type: "edit", data: member });
                               setFormData(member);
                             }}
                             className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                           >
                             <Pencil className="h-3 w-3" />
                           </button>
                           <button
                             onClick={() => handleDeleteMember(member.id)}
                             className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                           >
                             <Trash2 className="h-3 w-3" />
                           </button>
                         </div>
                       )}

                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-navy flex items-center justify-center text-white">
                             <Users className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                             <h4 className="font-bold text-navy text-sm leading-tight">{member.name}</h4>
                             <p className="text-[10px] font-black uppercase tracking-wider text-gold">Student Representative</p>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-20">
          <div className="container text-center">
             <div className="max-w-2xl mx-auto p-10 rounded-full bg-navy text-white font-serif italic text-lg shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gold/5 opacity-50" />
                <span className="relative z-10">"{data?.page?.note || "Ensuring a safe, equitable, and empowered university community for all."}"</span>
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
                <UserCheck className="h-5 w-5 text-gold" />
                {modal.type === "edit" ? "Edit Member" : "Add Member"}
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
                    onChange={(e) => setFormData({ ...formData, member_type: e.target.value as ICCMember["member_type"] })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="faculty">Faculty / Staff</option>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation || ""}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="e.g. Professor"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role</label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="e.g. Chair Person"
                  />
                </div>
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

export default ICCMembers;
