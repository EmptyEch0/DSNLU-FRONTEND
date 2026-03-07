import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { Users, Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

interface CommitteeMember {
  id: number;
  s_no: number;
  name: string;
  designation: string;
  role: string;
  contact: string;
  display_order: number;
}

interface Responsibility {
  id: number;
  description: string;
  display_order: number;
}

interface SCSTPage {
  id: number;
  title: string;
  description: string;
}

const SCSTCommittee = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<{
    page: SCSTPage;
    members: CommitteeMember[];
    responsibilities: Responsibility[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<
    | { type: "addMember" }
    | { type: "editMember"; data: CommitteeMember }
    | { type: "addResp" }
    | { type: "editResp"; data: Responsibility }
    | null
  >(null);

  const [formData, setFormData] = useState<Partial<CommitteeMember & Responsibility>>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/scst/committee`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load committee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const saveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "editMember";
    const url = isEdit && modal.type === "editMember"
      ? `${API}/api/admin/scst/member/${modal.data.id}`
      : `${API}/api/admin/scst/member`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          page_id: data?.page.id,
        }),
      });

      if (res.ok) {
        toast.success(isEdit ? "Member updated" : "Member added");
        setModal(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving member");
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await fetch(`${API}/api/admin/scst/member/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        toast.success("Member deleted");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting member");
    }
  };

  const saveResp = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = modal?.type === "editResp";
    const url = isEdit
      ? `${API}/api/admin/scst/responsibility/${(modal as any).data.id}`
      : `${API}/api/admin/scst/responsibility`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          page_id: data?.page.id,
        }),
      });

      if (res.ok) {
        toast.success(isEdit ? "Responsibility updated" : "Responsibility added");
        setModal(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving responsibility");
    }
  };

  const deleteResp = async (id: number) => {
    if (!confirm("Delete this responsibility?")) return;
    try {
      const res = await fetch(`${API}/api/admin/scst/responsibility/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        toast.success("Responsibility deleted");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting responsibility");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="committee" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">
                    {data?.page?.title || "Advisory Committee – SC / ST Cell"}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {data?.page?.description || "The committee is responsible for policy decisions and monitoring the welfare initiatives for members of the Scheduled Castes and Scheduled Tribes."}
                  </p>
                </div>

                {/* Admin Add Member */}
                {token && (
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={() => {
                        setModal({ type: "addMember" });
                        setFormData({ 
                          s_no: (data?.members?.length || 0) + 1,
                          display_order: (data?.members?.length || 0) + 1 
                        });
                      }}
                      className="bg-navy text-gold hover:bg-navy/90 rounded-full text-xs font-bold gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </div>
                )}

                {/* Styled Table Container */}
                <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant relative">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-navy text-white text-sm uppercase tracking-wider">
                          <th className="px-6 py-5 font-bold">S.No</th>
                          <th className="px-6 py-5 font-bold">Name</th>
                          <th className="px-6 py-5 font-bold">Designation</th>
                          <th className="px-6 py-5 font-bold">Role</th>
                          <th className="px-6 py-5 font-bold">Contact</th>
                          {token && <th className="px-6 py-5 font-bold">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y text-sm md:text-base">
                        {data?.members?.map((member, index) => (
                          <motion.tr 
                            key={member.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="hover:bg-muted/50 transition-colors group"
                          >
                            <td className="px-6 py-4 font-bold text-gold">{member.s_no}</td>
                            <td className="px-6 py-4 font-bold text-foreground group-hover:text-gold transition-colors">{member.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{member.designation}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                                {member.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground font-mono">{member.contact}</td>
                            {token && (
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setModal({ type: "editMember", data: member });
                                      setFormData(member);
                                    }}
                                    className="p-1 hover:text-gold transition-colors"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteMember(member.id)}
                                    className="p-1 hover:text-red-500 transition-colors"
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
                </div>

                <div className="mt-12 p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-serif text-xl font-bold text-navy">Committee Responsibilities</h4>
                    {token && (
                      <Button
                        onClick={() => {
                          setModal({ type: "addResp" });
                          setFormData({ display_order: (data?.responsibilities?.length || 0) + 1 });
                        }}
                        size="sm"
                        className="bg-navy text-gold rounded-full text-[10px] font-bold h-8"
                      >
                        <Plus className="h-3 w-3" /> Add Responsibility
                      </Button>
                    )}
                  </div>
                  
                  <ul className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
                    {data?.responsibilities?.map((r) => (
                      <li key={r.id} className="group flex items-start gap-3 bg-white/50 p-4 rounded-xl border border-transparent hover:border-gold/30 transition-all">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="flex-1">{r.description}</span>
                        {token && (
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setModal({ type: "editResp", data: r }); setFormData(r); }} className="p-1 hover:text-gold">
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button onClick={() => deleteResp(r.id)} className="p-1 hover:text-red-500">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      {(modal?.type === "addMember" || modal?.type === "editMember") && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-6">
            <h2 className="text-2xl font-bold text-navy">
              {modal.type === "editMember" ? "Edit Member" : "Add Member"}
            </h2>
            <form onSubmit={saveMember} className="space-y-4">
              <input className="w-full border p-3 rounded-xl" placeholder="Full Name" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <input className="w-full border p-3 rounded-xl" placeholder="Designation" value={formData.designation || ""} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
              <input className="w-full border p-3 rounded-xl" placeholder="Role (e.g. Member)" value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} required />
              <input className="w-full border p-3 rounded-xl" placeholder="Contact Email" value={formData.contact || ""} onChange={e => setFormData({ ...formData, contact: e.target.value })} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="w-full border p-3 rounded-xl" placeholder="S.No" value={formData.s_no || ""} onChange={e => setFormData({ ...formData, s_no: e.target.value })} required />
                <input type="number" className="w-full border p-3 rounded-xl" placeholder="Display Order" value={formData.display_order || ""} onChange={e => setFormData({ ...formData, display_order: e.target.value })} required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setModal(null)} className="rounded-full">Cancel</Button>
                <Button type="submit" className="bg-navy text-gold rounded-full">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(modal?.type === "addResp" || modal?.type === "editResp") && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-6">
            <h2 className="text-2xl font-bold text-navy">
              {modal.type === "editResp" ? "Edit Responsibility" : "Add Responsibility"}
            </h2>
            <form onSubmit={saveResp} className="space-y-4">
              <textarea className="w-full border p-3 rounded-xl min-h-[100px]" placeholder="Description" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              <input type="number" className="w-full border p-3 rounded-xl" placeholder="Display Order" value={formData.display_order || ""} onChange={e => setFormData({ ...formData, display_order: e.target.value })} required />
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setModal(null)} className="rounded-full">Cancel</Button>
                <Button type="submit" className="bg-navy text-gold rounded-full">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SCSTCommittee;
