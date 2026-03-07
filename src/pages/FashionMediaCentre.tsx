import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Globe, Scale, ShieldCheck, Users, GraduationCap, Briefcase, Globe2, Edit, Trash2, Plus, X, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;
const CENTRE_ID = 15;

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

interface Brochure {
  id: number;
  centre_id: number;
  title: string;
  file_url: string;
}

type EditItem = CentreContent | CommitteeMember | TeamGroup | TeamMember | Brochure;

const FashionMediaCentre = () => {
  const { token } = useAdmin();

  const [content, setContent] = useState<CentreContent[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [teams, setTeams] = useState<TeamGroup[]>([]);
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<EditItem | null>(null);
  const [editType, setEditType] = useState<"about" | "committee" | "teamGroup" | "teamMember" | "brochure">("committee");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    role: "",
    name: "",
    role_title: "",
    group_id: 0,
    display_order: 1,
    file_url: "",
  });

  useEffect(() => {
    fetchContent();
    fetchCommittee();
    fetchTeams();
    fetchBrochure();
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

  const fetchBrochure = async () => {
    try {
      const res = await fetch(`${API}/api/centres/${CENTRE_ID}/brochure`);
      setBrochure(await res.json());
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  const openEdit = (item: EditItem | null, type: "about" | "committee" | "teamGroup" | "teamMember" | "brochure", extra?: { group_id?: number }) => {
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
        file_url: "",
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
        file_url: "",
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
        file_url: "",
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
        file_url: "",
      });
    } else if (type === "brochure") {
      const brochureItem = item as Brochure;
      setFormData({
        title: brochureItem?.title || "Centre Brochure",
        content: "",
        role: "",
        name: "",
        role_title: "",
        group_id: 0,
        display_order: 1,
        file_url: brochureItem?.file_url || "",
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
    } else if (editType === "brochure") {
        url = editItem ? `/api/centres/admin/brochure/${(editItem as Brochure).id}` : `/api/centres/admin/brochure`;
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
        fetchBrochure();
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
            <Link to="/" className="transition-colors hover:text-gold font-bold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold font-bold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-bold text-gold">C-FAME</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-white md:text-6xl uppercase tracking-tighter leading-tight max-w-5xl mx-auto drop-shadow-lg"
            >
              Centre for Fashion, Media and Entertainment Laws (C-FAME)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-8 h-1.5 w-32 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
            />
            {brochure ? (
              <a 
                href={brochure.file_url} 
                target="_blank" 
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-gold text-[#0f2d5c] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl"
              >
                <FileText className="h-5 w-5" /> Download Brochure
              </a>
            ) : token && (
               <button onClick={() => openEdit(null, "brochure")} className="mt-10 bg-gold/20 text-gold border border-gold/50 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gold/30">
                 + Add Brochure
               </button>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-slate-50/50">
          <div className="container max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-16">
              
              {/* Left Column: About & Content */}
              <div className="lg:col-span-2 space-y-16">
                {content.map((c, i) => (
                  <motion.div 
                    key={c.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-3xl border shadow-sm relative group"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-8 border-gold pl-6 uppercase tracking-wider">
                        {c.title}
                      </h2>
                      {token && (
                        <button onClick={() => openEdit(c, "about")} className="text-blue-600 hover:scale-110 transition-transform">
                           <Edit className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <p className={`text-muted-foreground leading-relaxed text-lg text-justify ${i === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-[#0f2d5c] first-letter:mr-3 first-letter:float-left pt-2" : ""}`}>
                      {c.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Committee */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between bg-[#0f2d5c] p-6 rounded-2xl text-white shadow-lg">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-widest">Committee</h3>
                  {token && (
                    <button onClick={() => openEdit(null, "committee")} className="bg-gold text-[#0f2d5c] p-2 rounded-lg hover:rotate-90 transition-transform">
                      <Plus className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="grid gap-4">
                  {committee.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow group relative">
                       <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1">{member.role}</p>
                       <p className="text-[#0f2d5c] font-bold text-lg">{member.name}</p>
                       {token && (
                         <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(member, "committee")} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                               <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(member.id, "committee")} className="text-red-500 hover:text-red-700 cursor-pointer">
                               <Trash2 className="h-4 w-4" />
                            </button>
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Student Section */}
            <div className="mt-32 space-y-20">
               <div className="text-center space-y-4">
                 <h2 className="font-serif text-5xl font-bold text-[#0f2d5c] uppercase tracking-[0.2em]">Student Ecosystem</h2>
                 <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
                 {token && (
                    <button onClick={() => openEdit(null, "teamGroup")} className="mt-4 text-xs font-bold uppercase py-2 px-6 border-2 border-[#0f2d5c] text-[#0f2d5c] rounded-full hover:bg-[#0f2d5c] hover:text-white transition-colors">
                       + Add Team Category
                    </button>
                 )}
               </div>

               {/* Grid for Teams */}
               <div className="space-y-24">
                  {teams.map((team, i) => (
                    <div key={team.id} className="space-y-12">
                       <div className="flex items-center gap-8 group">
                          <div className="h-[2px] flex-1 bg-slate-200" />
                          <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] bg-white px-8 py-2 border-2 border-gold rounded-full uppercase tracking-widest relative">
                             {team.role_title}
                             {token && (
                               <div className="absolute -top-4 -right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => openEdit(team, "teamGroup")} className="bg-blue-600 text-white p-1 rounded-full shadow-lg"><Edit className="h-3 w-3" /></button>
                                  <button onClick={() => handleDelete(team.id, "teamGroup")} className="bg-red-600 text-white p-1 rounded-full shadow-lg"><Trash2 className="h-3 w-3" /></button>
                               </div>
                             )}
                          </h3>
                          <div className="h-[2px] flex-1 bg-slate-200" />
                       </div>

                       <div className={`grid gap-6 ${team.role_title.toLowerCase().includes('member') ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                          {team.members.map((m: any) => (
                            <motion.div 
                              key={m.id}
                              whileHover={{ y: -5 }}
                              className={`p-6 rounded-2xl border text-center group/card transition-all relative ${team.role_title.toLowerCase().includes('member') ? 'bg-secondary/10 hover:bg-gold/10' : 'bg-white shadow-sm hover:shadow-xl hover:border-gold/30'}`}
                            >
                               <p className="text-[#0f2d5c] font-bold text-sm tracking-tight">{m.name}</p>
                               {token && (
                                 <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(m, "teamMember")} className="text-blue-500 hover:text-blue-700"><Edit className="h-3 w-3" /></button>
                                    <button onClick={() => handleDelete(m.id, "teamMember")} className="text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></button>
                                 </div>
                               )}
                            </motion.div>
                          ))}
                          {token && (
                            <button 
                              onClick={() => openEdit(null, "teamMember", { group_id: team.id })}
                              className="p-6 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors font-bold uppercase text-xs"
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add
                            </button>
                          )}
                       </div>
                    </div>
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
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white p-10 rounded-3xl w-full max-w-xl space-y-6 shadow-2xl h-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-2xl font-bold text-[#0f2d5c]">
                  {editItem ? "Update" : "Create"} {editType}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="h-6 w-6" /></button>
              </div>

              {editType === "about" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Title</label>
                    <input
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50 transition-all font-bold"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Content</label>
                    <textarea
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50 transition-all leading-relaxed"
                      rows={8}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {editType === "committee" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Role</label>
                    <input
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="e.g. Faculty Member"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
                    <input
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Doctor Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                   <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Display Order</label>
                    <input
                      type="number"
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {editType === "teamGroup" && (
                <div className="space-y-4">
                  <input
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Team Group Title (e.g. Student Members)"
                    value={formData.role_title}
                    onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Display Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </div>
              )}

              {editType === "teamMember" && (
                <div className="space-y-4">
                  <input
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Order"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </div>
              )}

              {editType === "brochure" && (
                <div className="space-y-4">
                  <input
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="File URL"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6 border-t mt-4">
                <button onClick={() => setShowModal(false)} className="px-6 py-2 text-muted-foreground font-bold hover:text-[#0f2d5c]">Cancel</button>
                <button
                  onClick={handleSave}
                  className="bg-[#0f2d5c] text-white px-10 py-3 rounded-xl font-bold shadow-xl hover:bg-[#1a3a6b] hover:scale-105 transition-all"
                >
                  Confirm & Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FashionMediaCentre;
