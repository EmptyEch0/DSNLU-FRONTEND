import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LucideIcon, ChevronRight, Globe, Scale, ShieldCheck, Users, GraduationCap, Briefcase, Globe2, Edit, Trash2, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 14;

const iconMap: Record<string, LucideIcon> = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Globe: Globe,
  Globe2: Globe2,
  Scale: Scale,
  ShieldCheck: ShieldCheck,
};

interface CentreContent {
  id: number;
  centre_id: number;
  title: string;
  content: string;
  section_type?: string;
  icon_name?: string;
  display_order?: number;
}

interface CommitteeMember {
  id: number;
  centre_id: number;
  name: string;
  role: string;
  display_order: number;
}

interface TeamMember {
  id: number;
  group_id: number;
  name: string;
  display_order: number;
}

interface TeamGroup {
  id: number;
  centre_id: number;
  role_title: string;
  display_order: number;
  members: TeamMember[];
}

type EditItem = CentreContent | CommitteeMember | TeamGroup | TeamMember;

const CILADAbout = () => {
  const { token } = useAdmin();

  const [content, setContent] = useState<CentreContent[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [teams, setTeams] = useState<TeamGroup[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<EditItem | null>(null);
  const [editType, setEditType] = useState<"about" | "committee" | "teamGroup" | "teamMember">("committee");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    role: "",
    name: "",
    role_title: "",
    group_id: 0,
    display_order: 1,
  });

  useEffect(() => {
    fetchContent();
    fetchCommittee();
    fetchTeams();
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

  const fetchTeams = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/student-teams`);
      setTeams(await res.json());
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const openEdit = (item: EditItem | null, type: "about" | "committee" | "teamGroup" | "teamMember", extra?: { group_id?: number }) => {
    setEditType(type);
    setEditItem(item);

    if (type === "about") {
      const aboutItem = item as CentreContent;
      setFormData({
        title: aboutItem?.title || "",
        content: aboutItem?.content || "",
        role: "",
        name: "",
        role_title: "",
        group_id: 0,
        display_order: 1,
      });
    } else if (type === "committee") {
      const commItem = item as CommitteeMember;
      setFormData({
        title: "",
        content: "",
        role: commItem?.role || "",
        name: commItem?.name || "",
        role_title: "",
        group_id: 0,
        display_order: commItem?.display_order || committee.length + 1,
      });
    } else if (type === "teamGroup") {
      const groupItem = item as TeamGroup;
      setFormData({
        title: "",
        content: "",
        role: "",
        name: "",
        role_title: groupItem?.role_title || "",
        group_id: 0,
        display_order: groupItem?.display_order || teams.length + 1,
      });
    } else if (type === "teamMember") {
      const memberItem = item as TeamMember;
      setFormData({
        title: "",
        content: "",
        role: "",
        name: memberItem?.name || "",
        role_title: "",
        group_id: extra?.group_id || memberItem?.group_id || 0,
        display_order: memberItem?.display_order || 1,
      });
    }

    setShowModal(true);
  };

  const handleSave = async () => {
    let url = "";
    const method = editItem ? "PUT" : "POST";

    if (editType === "about") {
      url = `/api/centres/admin/content/${(editItem as CentreContent).id}`;
    } else if (editType === "committee") {
      url = editItem ? `/api/centres/admin/committee/${(editItem as CommitteeMember).id}` : `/api/centres/admin/committee`;
    } else if (editType === "teamGroup") {
      url = editItem ? `/api/centres/admin/team-group/${(editItem as TeamGroup).id}` : `/api/centres/admin/team-group`;
    } else if (editType === "teamMember") {
      url = editItem ? `/api/centres/admin/team-member/${(editItem as TeamMember).id}` : `/api/centres/admin/team-member`;
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
        fetchTeams();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("Error saving data");
    }
  };

  const handleDelete = async (id: number, type: "committee" | "teamGroup" | "teamMember") => {
    if (!confirm("Are you sure?")) return;
    let url = "";
    if (type === "committee") url = `/api/centres/admin/committee/${id}`;
    else if (type === "teamGroup") url = `/api/centres/admin/team-group/${id}`;
    else if (type === "teamMember") url = `/api/centres/admin/team-member/${id}`;

    try {
      const response = await fetch(`${API}${url}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Deleted");
        fetchCommittee();
        fetchTeams();
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
            <span className="font-medium text-gold">CILAD - About</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl uppercase tracking-wider leading-tight max-w-4xl mx-auto"
            >
              Centre for International Law & Allied Disciplines (CILAD)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-8 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="container max-w-6xl space-y-24">
            
            {/* Introduction & About */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {content.map((c, i) => (
                  <div key={c.id} className="space-y-4">
                    <div className="flex items-center justify-between border-l-4 border-gold pl-6">
                      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider">
                        {c.title}
                      </h2>
                      {token && (
                        <button onClick={() => openEdit(c, "about")} className="text-blue-600 hover:underline text-xs flex items-center gap-1 font-bold">
                           <Edit className="h-3 w-3" /> Edit
                        </button>
                      )}
                    </div>
                    <p className={`text-muted-foreground leading-relaxed ${i === 0 ? "text-lg text-justify italic border-b-2 border-secondary/50 pb-8" : ""}`}>
                      {c.content}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  { label: "Public International Law", icon: Globe },
                  { label: "Private International Law", icon: Scale },
                  { label: "International Trade Law", icon: Briefcase },
                  { label: "Environmental Law", icon: ShieldCheck },
                  { label: "Humanitarian Law", icon: Globe2 }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-md transition-all text-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-[#0f2d5c] text-[10px] uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
                <div className="sm:col-span-2 p-6 rounded-2xl border-2 border-dashed border-gold/30 bg-gold/5 text-center flex items-center justify-center font-bold text-[#0f2d5c] text-sm uppercase tracking-wider">
                  & INTERDISCIPLINARY RESEARCH
                </div>
              </motion.div>
            </div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-l-4 border-gold pl-6">
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-wider">
                  Committee
                </h2>
                {token && (
                  <button onClick={() => openEdit(null, "committee")} className="bg-gold text-[#0f2d5c] px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-sm flex items-center gap-2">
                    <Plus className="h-3.5 w-3.5" /> Add Member
                  </button>
                )}
              </div>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm max-w-4xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground font-medium italic">
                    {committee.map((member) => (
                      <tr key={member.id} className="hover:bg-secondary/10 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/10 not-italic">
                          {member.role}
                          {token && (
                            <div className="flex gap-2 mt-1">
                               <button onClick={() => openEdit(member, "committee")} className="text-blue-600 hover:underline text-[10px]">Edit</button>
                               <button onClick={() => handleDelete(member.id, "committee")} className="text-red-600 hover:underline text-[10px]">Delete</button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">{member.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Student Members Grid */}
            <div className="space-y-12 pt-10">
               <div className="flex items-center justify-center gap-6">
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] text-center uppercase tracking-[0.2em]">Student Team</h2>
                 {token && (
                    <button onClick={() => openEdit(null, "teamGroup")} className="text-xs bg-[#0f2d5c] text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#1a3a6b]">
                       <Plus className="h-3 w-3" /> Add Team Block
                    </button>
                 )}
               </div>
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {teams.map((team, i) => (
                    <motion.div 
                      key={team.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-3xl border bg-card hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center"
                    >
                       <div className={`mb-6 p-4 rounded-2xl bg-[#0f2d5c]/5 text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-colors`}>
                         <GraduationCap className="h-6 w-6" />
                       </div>
                       <h4 className="font-serif text-lg font-bold text-[#0f2d5c] mb-6 uppercase tracking-wider">
                         {team.role_title}
                         {token && (
                           <div className="flex justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openEdit(team, "teamGroup")} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700">
                               <Edit className="h-3 w-3" />
                             </button>
                             <button onClick={() => handleDelete(team.id, "teamGroup")} className="bg-red-600 text-white p-1 rounded hover:bg-red-700">
                               <Trash2 className="h-3 w-3" />
                             </button>
                           </div>
                         )}
                       </h4>
                       <ul className="space-y-2 mb-6">
                         {team.members.map((m: any) => (
                           <li key={m.id} className="text-sm font-medium text-muted-foreground flex items-center gap-2 justify-center group/member">
                             {m.name}
                             {token && (
                               <div className="flex gap-1 opacity-0 group-hover/member:opacity-100 transition-opacity">
                                 <button onClick={() => openEdit(m, "teamMember")} className="text-blue-500 hover:text-blue-700"><Edit className="h-2.5 w-2.5" /></button>
                                 <button onClick={() => handleDelete(m.id, "teamMember")} className="text-red-500 hover:text-red-700"><Trash2 className="h-2.5 w-2.5" /></button>
                               </div>
                             )}
                           </li>
                         ))}
                       </ul>
                       {token && (
                        <button 
                          onClick={() => openEdit(null, "teamMember", { group_id: team.id })}
                          className="mt-auto text-[10px] font-bold uppercase tracking-widest text-[#0f2d5c] hover:bg-[#0f2d5c]/5 px-3 py-1 rounded"
                        >
                          + Add Member
                        </button>
                       )}
                    </motion.div>
                  ))}
               </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl h-auto max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-[#0f2d5c]">
                {editItem ? "Edit" : "Add"} {editType}
              </h2>

              {editType === "about" && (
                <>
                  <input
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <textarea
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </>
              )}

              {editType === "committee" && (
                <>
                  <input
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <input
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </>
              )}

              {editType === "teamGroup" && (
                <>
                  <input
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Role Title"
                    value={formData.role_title}
                    onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </>
              )}

              {editType === "teamMember" && (
                <>
                  <input
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Member Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-2 rounded outline-none focus:border-gold"
                    placeholder="Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted-foreground font-medium">Cancel</button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#1a3a6b]"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CILADAbout;
