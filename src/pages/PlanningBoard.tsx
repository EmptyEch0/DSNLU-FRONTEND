import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

interface CouncilMember {
  id: number;
  serial_no: number;
  member_name: string;
  designation: string;
}

const API = import.meta.env.VITE_API_URL;

const PlanningBoard = () => {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAdmin();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editMember, setEditMember] = useState<CouncilMember | null>(null);
  const [formName, setFormName] = useState("");
  const [formDesignation, setFormDesignation] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/api/planning-board`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = async () => {
    await fetch(`${API}/api/planning-board`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ member_name: formName, designation: formDesignation }),
    });
    setShowAddModal(false);
    setFormName("");
    setFormDesignation("");
    fetchMembers();
  };

  const handleEdit = async () => {
    if (!editMember) return;
    await fetch(`${API}/api/planning-board/${editMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ member_name: formName, designation: formDesignation }),
    });
    setEditMember(null);
    setFormName("");
    setFormDesignation("");
    fetchMembers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    await fetch(`${API}/api/planning-board/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMembers(members.filter((m) => m.id !== id));
  };

  const saveOrder = async (updated: CouncilMember[]) => {
    const orders = updated.map((m, index) => ({ id: m.id, order: index + 1 }));
    await fetch(`${API}/api/planning-board/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orders }),
    });
  };

  const moveUp = (id: number) => {
    const index = members.findIndex((m) => m.id === id);
    if (index === 0) return;
    const updated = [...members];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((m, i) => ({ ...m, serial_no: i + 1 }));
    setMembers(reordered);
    saveOrder(reordered);
  };

  const moveDown = (id: number) => {
    const index = members.findIndex((m) => m.id === id);
    if (index === members.length - 1) return;
    const updated = [...members];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((m, i) => ({ ...m, serial_no: i + 1 }));
    setMembers(reordered);
    saveOrder(reordered);
  };

  const openEditModal = (member: CouncilMember) => {
    setEditMember(member);
    setFormName(member.member_name);
    setFormDesignation(member.designation);
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
            <Link to="/about" className="transition-colors hover:text-gold">About DSNLU</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Authorities</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Planning & Monitoring Board</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Authorities
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Planning & Monitoring Board
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-gold/80 font-medium"
            >
              Under Section 23(1) of DSNLU Act, 2008
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold"
            />
          </div>
        </section>

        {/* Members Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">

            {token && (
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => { setShowAddModal(true); setFormName(""); setFormDesignation(""); }}
                  className="px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  + Add Member
                </button>
              </div>
            )}

            {loading && (
              <div className="p-8 text-center text-muted-foreground">Loading board members...</div>
            )}

            {error && (
              <div className="p-8 text-center text-red-500">{error}</div>
            )}

            {!loading && !error && (
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Hon'ble Member</th>
                        <th className="px-6 py-4">Designation / Details</th>
                        {token && <th className="px-6 py-4">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {members.map((member) => (
                        <tr key={member.id} className="transition-colors hover:bg-gold/5 group">
                          <td className="px-6 py-5 text-muted-foreground">{member.serial_no}</td>
                          <td className="px-6 py-5 font-bold text-foreground group-hover:text-gold whitespace-nowrap">{member.member_name}</td>
                          <td className="px-6 py-5 text-muted-foreground leading-relaxed">{member.designation}</td>
                          {token && (
                            <td className="px-6 py-5">
                              <div className="flex gap-2">
                                <button onClick={() => openEditModal(member)} title="Edit" className="p-1.5 rounded hover:bg-gold/10 transition-colors">✏️</button>
                                <button onClick={() => handleDelete(member.id)} title="Delete" className="p-1.5 rounded hover:bg-red-50 transition-colors">🗑️</button>
                                <button onClick={() => moveUp(member.id)} title="Move Up" className="p-1.5 rounded hover:bg-gold/10 transition-colors">⬆️</button>
                                <button onClick={() => moveDown(member.id)} title="Move Down" className="p-1.5 rounded hover:bg-gold/10 transition-colors">⬇️</button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Add New Member</h2>
            <input className="w-full border p-2 rounded" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Member Name" />
            <input className="w-full border p-2 rounded" value={formDesignation} onChange={(e) => setFormDesignation(e.target.value)} placeholder="Designation" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-navy text-gold rounded font-bold">Add Member</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Edit Member</h2>
            <input className="w-full border p-2 rounded" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Member Name" />
            <input className="w-full border p-2 rounded" value={formDesignation} onChange={(e) => setFormDesignation(e.target.value)} placeholder="Designation" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setEditMember(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-navy text-gold rounded font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningBoard;
