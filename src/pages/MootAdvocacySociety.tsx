import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Gavel, 
  Scale, 
  Target, 
  Users, 
  Medal, 
  Search, 
  Trophy,
  ChevronRight,
  UserCheck,
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  ArrowUpDown
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

interface Faculty {
  id: number;
  name: string;
  designation: string;
  display_order: number;
}

interface OfficeBearer {
  id: number;
  name: string;
  role: string;
  display_order: number;
}

interface Member {
  id: number;
  name: string;
  display_order: number;
}

interface MemberGroup {
  id: number;
  year_label: string;
  members: Member[];
  display_order: number;
}

interface AchievementItem {
  id: number;
  description: string;
  display_order: number;
}

interface AchievementBatch {
  id: number;
  title: string;
  items: AchievementItem[];
  display_order: number;
}

interface MASData {
  faculty: Faculty[];
  officeBearers: OfficeBearer[];
  memberGroups: MemberGroup[];
  achievements: AchievementBatch[];
}

const MootAdvocacySociety = () => {
  const { token } = useAdmin();
  const [data, setData] = useState<MASData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [facultyModal, setFacultyModal] = useState<{ type: "add" | "edit"; data?: Faculty } | null>(null);
  const [obModal, setObModal] = useState<{ type: "add" | "edit"; data?: OfficeBearer } | null>(null);
  const [groupModal, setGroupModal] = useState<{ type: "add" | "edit"; data?: MemberGroup } | null>(null);
  const [memberModal, setMemberModal] = useState<{ groupId: number; type: "add" | "edit"; data?: Member } | null>(null);
  const [batchModal, setBatchModal] = useState<{ type: "add" | "edit"; data?: AchievementBatch } | null>(null);
  const [itemModal, setItemModal] = useState<{ batchId: number; type: "add" | "edit"; data?: AchievementItem } | null>(null);

  // Form States
  const [facultyForm, setFacultyForm] = useState<Partial<Faculty>>({});
  const [obForm, setObForm] = useState<Partial<OfficeBearer>>({});
  const [groupForm, setGroupForm] = useState<Partial<MemberGroup>>({});
  const [memberForm, setMemberForm] = useState<Partial<Member>>({});
  const [batchForm, setBatchForm] = useState<Partial<AchievementBatch>>({});
  const [itemForm, setItemForm] = useState<Partial<AchievementItem>>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/mas`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load MAS data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCRUD = async (url: string, method: string, body: unknown, successMsg: string) => {
    try {
      const res = await fetch(`${API}${url}`, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        toast.success(successMsg);
        fetchData();
        return true;
      }
      toast.error("Operation failed");
      return false;
    } catch (err) {
      toast.error("An error occurred");
      return false;
    }
  };

  const objectives = [
    "Strengthen research and drafting skills",
    "Enhance oral advocacy and courtroom confidence",
    "Conduct intra-university competitions",
    "Prepare teams for national & international competitions",
    "Promote competitive legal excellence"
  ];

  const competitions = [
    { title: "Intra Moot Court", desc: "University selection process for national representation involving prelims, finals, and Researchers Test." },
    { title: "Novice Moot Court", desc: "Mandatory competition for first-year students to build foundational advocacy skills." },
    { title: "Intra Mock Trial", desc: "Focuses on criminal litigation practice including examination and cross-examination." },
    { title: "Intra Mediation", desc: "Promotes Alternative Dispute Resolution through structured mediation rounds." },
    { title: "Intra Client Counselling", desc: "Real-world client interaction training." },
    { title: "Open Challenge Rounds", desc: "Selection process for international competitions." },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Committees & Societies</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold capitalize">Moot & Advocacy Society</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-navy py-16 md:py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm md:text-base border-b border-gold/30 pb-2"
            >
              Training Courtroom Leaders. Building Legal Excellence.
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold md:text-5xl lg:text-7xl uppercase tracking-tight"
            >
              Moot & Advocacy <br className="hidden md:block" /> Society (MAS)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-40 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-navy">About Us</h2>
                  <div className="divider-gold" />
                </div>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    The Moot and Advocacy Society (MAS) at Damodaram Sanjivayya National Law University (DSNLU) is a student-led body guided by faculty advisors.
                  </p>
                  <p>
                    MAS is responsible for promoting, regulating, and overseeing all Inter and Intra Moot Court, Mock Trial, Mediation, Arbitration, and Client Counselling competitions.
                  </p>
                  <p>
                    Established in 2012, MAS provides structured exposure and skill development to students, enabling them to compete successfully at national and international levels.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 text-center">
                     <div className="text-3xl font-bold text-navy">22</div>
                     <div className="text-xs uppercase font-bold tracking-widest text-gold mt-1">Student Members</div>
                   </div>
                   <div className="p-6 rounded-2xl bg-navy/5 border border-navy/10 text-center">
                     <div className="text-3xl font-bold text-navy">08</div>
                     <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">Faculty Advisors</div>
                   </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/30 rounded-3xl p-10 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-full bg-gold text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Aim & Objectives</h3>
                  </div>
                  <p className="text-muted-foreground italic border-l-4 border-gold pl-4 py-2">
                    "To provide high-quality legal advocacy training and develop skilled, confident legal professionals capable of excelling in competitive legal forums."
                  </p>
                  <ul className="space-y-3">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <UserCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16 lg:py-24 bg-navy text-white relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-gold uppercase tracking-widest">Activities & Competitions</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {competitions.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all space-y-4 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-gold text-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Gavel className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl text-gold">{comp.title}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{comp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recruitment Process */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="bg-card rounded-3xl border shadow-elegant p-10 space-y-10 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Search className="h-32 w-32" />
               </div>
               <div className="space-y-4 relative z-10">
                 <h2 className="font-serif text-3xl font-bold text-navy">Recruitment Process</h2>
                 <div className="divider-gold mx-auto" />
                 <p className="text-muted-foreground italic">Joining MAS is a selective process designed to identify students with exceptional legal potential.</p>
               </div>
               <div className="grid gap-6 md:grid-cols-3 relative z-10">
                  {[
                    { title: "SOP Submission", desc: "Statement of Purpose outlining your motivation and experience." },
                    { title: "Faculty Interview", desc: "Performance-based assessment by our faculty advisors." },
                    { title: "Skill-Based Selection", desc: "Based on legal aptitude, enthusiasm, and advocacy talent." },
                  ].map((step, i) => (
                    <div key={i} className="space-y-2">
                       <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">{i+1}</div>
                       <h4 className="font-bold text-navy">{step.title}</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Faculty & Structure */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-12">
              <div className="text-left space-y-4">
                <h2 className="font-serif text-3xl font-bold">Faculty & Society Structure</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button 
                  onClick={() => { setFacultyModal({ type: "add" }); setFacultyForm({}); }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" /> Add Faculty
                </button>
              )}
            </div>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy text-white text-xs uppercase tracking-widest">
                    <th className="px-8 py-4 font-bold">Member Name</th>
                    <th className="px-8 py-4 font-bold">Designation</th>
                    {token && <th className="px-8 py-4 font-bold text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data?.faculty.map((member) => (
                    <tr key={member.id} className="hover:bg-muted/30 transition-colors group/row">
                      <td className="px-8 py-4 font-bold text-navy">{member.name}</td>
                      <td className="px-8 py-4 text-sm font-medium text-gold">{member.designation}</td>
                      {token && (
                        <td className="px-8 py-4 text-right space-x-2">
                          <button 
                             onClick={() => { setFacultyModal({ type: "edit", data: member }); setFacultyForm(member); }}
                             className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform scale-90 opacity-0 group-hover/row:opacity-100"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button 
                             onClick={() => { if(window.confirm("Delete?")) handleCRUD(`/api/admin/mas/faculty/${member.id}`, "DELETE", {}, "Faculty deleted"); }}
                             className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all transform scale-90 opacity-0 group-hover/row:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Office Bearers */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-16">
              <div className="text-left space-y-4">
                <h2 className="font-serif text-3xl font-bold">Office Bearers (AY 2024–25)</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button 
                  onClick={() => { setObModal({ type: "add" }); setObForm({}); }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" /> Add OB
                </button>
              )}
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {data?.officeBearers.map((ob) => (
                <div key={ob.id} className="p-8 rounded-2xl border border-gold/20 bg-gold/5 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all group relative">
                   {token && (
                     <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setObModal({ type: "edit", data: ob }); setObForm(ob); }}
                          className="p-1.5 rounded bg-white text-navy transform scale-75 shadow-sm"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => { if(window.confirm("Delete?")) handleCRUD(`/api/admin/mas/ob/${ob.id}`, "DELETE", {}, "OB deleted"); }}
                          className="p-1.5 rounded bg-red-500 text-white transform scale-75 shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                     </div>
                   )}
                   <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <GraduationCap className="h-8 w-8" />
                   </div>
                   <div>
                     <h3 className="font-serif text-xl font-bold text-navy">{ob.name}</h3>
                     <p className="text-xs uppercase font-bold tracking-widest text-gold mt-1">{ob.role}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAS Members by Year */}
        <section className="py-16 lg:py-24 bg-navy text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container max-w-6xl relative z-10">
            <div className="flex items-center justify-between mb-16">
              <div className="text-left space-y-4">
                <h2 className="font-serif text-3xl font-bold text-gold uppercase tracking-widest">MAS Members</h2>
                <div className="divider-gold" />
              </div>
              {token && (
                <button 
                  onClick={() => { setGroupModal({ type: "add" }); setGroupForm({}); }}
                  className="bg-gold text-navy px-6 py-2 rounded-full text-xs font-black uppercase"
                >
                  <Plus className="h-4 w-4 inline mr-2" /> Add Year Group
                </button>
              )}
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {data?.memberGroups.map((group) => (
                <div key={group.id} className="space-y-6 relative group/card p-4 rounded-xl hover:bg-white/5 transition-all">
                   <div className="flex items-center justify-between border-b border-gold/30 pb-2">
                     <h3 className="text-lg font-bold text-gold">{group.year_label}</h3>
                     {token && (
                       <div className="flex gap-2">
                         <button onClick={() => { setMemberModal({ groupId: group.id, type: "add" }); setMemberForm({}); }} className="text-white hover:text-gold"><Plus className="h-3.5 w-3.5"/></button>
                         <button onClick={() => { setGroupModal({ type: "edit", data: group }); setGroupForm(group); }} className="text-white hover:text-gold"><Pencil className="h-3.5 w-3.5"/></button>
                         <button onClick={() => { if(window.confirm("Delete Group?")) handleCRUD(`/api/admin/mas/group/${group.id}`, "DELETE", {}, "Group deleted"); }} className="text-white hover:text-red-400"><Trash2 className="h-3.5 w-3.5"/></button>
                       </div>
                     )}
                   </div>
                   <ul className="space-y-2.5">
                     {group.members.map((member) => (
                       <li key={member.id} className="text-xs text-primary-foreground/80 flex items-center justify-between group/mitem">
                         <div className="flex items-center gap-2">
                           <div className="h-1 w-1 rounded-full bg-gold" />
                           {member.name}
                         </div>
                         {token && (
                           <div className="flex gap-1 opacity-0 group-hover/mitem:opacity-100 transition-opacity">
                             <button onClick={() => { setMemberModal({ groupId: group.id, type: "edit", data: member }); setMemberForm(member); }} className="text-gold/50 hover:text-gold"><Pencil className="h-3 w-3"/></button>
                             <button onClick={() => handleCRUD(`/api/admin/mas/member/${member.id}`, "DELETE", {}, "Member deleted")} className="text-red-400/50 hover:text-red-400"><Trash2 className="h-3 w-3"/></button>
                           </div>
                         )}
                       </li>
                     ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="flex items-center justify-between mb-16">
              <div className="text-left space-y-4">
                <h2 className="font-serif text-3xl font-bold text-navy">Achievements & Milestones</h2>
                <p className="text-muted-foreground italic tracking-wide text-sm">(Academic Year 2023–2024)</p>
                <div className="divider-gold" />
              </div>
              {token && (
                <button 
                  onClick={() => { setBatchModal({ type: "add" }); setBatchForm({}); }}
                  className="bg-navy text-gold px-6 py-2 rounded-full text-xs font-black uppercase"
                >
                  <Plus className="h-4 w-4 inline mr-2" /> Add Batch
                </button>
              )}
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {data?.achievements.map((batch) => (
                <AccordionItem 
                  key={batch.id} 
                  value={`item-${batch.id}`}
                  className="border rounded-2xl px-6 bg-card shadow-sm overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <AccordionTrigger className="flex-1 hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                         <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                           <Trophy className="h-5 w-5" />
                         </div>
                         <span className="font-bold text-navy group-hover:text-gold transition-colors">{batch.title}</span>
                      </div>
                    </AccordionTrigger>
                    {token && (
                      <div className="flex gap-2 pr-4">
                        <button onClick={() => { setItemModal({ batchId: batch.id, type: "add" }); setItemForm({}); }} className="p-1.5 rounded bg-navy/5 text-navy hover:bg-navy hover:text-white transition-all"><Plus className="h-4 w-4"/></button>
                        <button onClick={() => { setBatchModal({ type: "edit", data: batch }); setBatchForm(batch); }} className="p-1.5 rounded bg-navy/5 text-navy hover:bg-navy hover:text-white transition-all"><Pencil className="h-4 w-4"/></button>
                        <button onClick={() => { if(window.confirm("Delete Batch?")) handleCRUD(`/api/admin/mas/achievement-batch/${batch.id}`, "DELETE", {}, "Batch deleted"); }} className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"><Trash2 className="h-4 w-4"/></button>
                      </div>
                    )}
                  </div>
                  <AccordionContent className="pb-6">
                    <ul className="grid gap-3 pl-14">
                      {batch.items.map((item) => (
                        <li key={item.id} className="flex items-start justify-between group/achitem">
                           <div className="flex items-start gap-3 text-sm text-muted-foreground">
                             <Medal className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                             {item.description}
                           </div>
                           {token && (
                             <div className="flex gap-2 opacity-0 group-hover/achitem:opacity-100 transition-opacity">
                                <button onClick={() => { setItemModal({ batchId: batch.id, type: "edit", data: item }); setItemForm(item); }} className="text-navy hover:text-gold"><Pencil className="h-3.5 w-3.5"/></button>
                                <button onClick={() => handleCRUD(`/api/admin/mas/achievement-item/${item.id}`, "DELETE", {}, "Item deleted")} className="text-red-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5"/></button>
                             </div>
                           )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Faculty Modal */}
      {facultyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" /> {facultyModal.type === "edit" ? "Edit" : "Add"} Faculty
              </h3>
              <button onClick={() => setFacultyModal(null)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = facultyModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/faculty/${facultyModal.data?.id}` : "/api/admin/mas/faculty",
                isEdit ? "PUT" : "POST",
                facultyForm,
                `Faculty ${isEdit ? "updated" : "added"}`
              );
              if (success) setFacultyModal(null);
            }} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                <input type="text" value={facultyForm.name || ""} onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Designation</label>
                <input type="text" value={facultyForm.designation || ""} onChange={e => setFacultyForm({ ...facultyForm, designation: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" required />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setFacultyModal(null)} className="flex-1 p-3 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-3 rounded-xl text-[10px] font-black uppercase hover:bg-gold hover:text-navy transition-all">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* OB Modal */}
      {obModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm focus-within:outline-none">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" /> {obModal.type === "edit" ? "Edit" : "Add"} Office Bearer
              </h3>
              <button onClick={() => setObModal(null)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = obModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/ob/${obModal.data?.id}` : "/api/admin/mas/ob",
                isEdit ? "PUT" : "POST",
                obForm,
                `OB ${isEdit ? "updated" : "added"}`
              );
              if (success) setObModal(null);
            }} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                <input type="text" value={obForm.name || ""} onChange={e => setObForm({ ...obForm, name: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role / Designation</label>
                <input type="text" value={obForm.role || ""} onChange={e => setObForm({ ...obForm, role: e.target.value })} className="w-full rounded-xl border bg-secondary/30 p-3 text-sm focus:ring-2 focus:ring-gold outline-none" required />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setObModal(null)} className="flex-1 p-3 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-3 rounded-xl text-[10px] font-black uppercase hover:bg-gold hover:text-navy transition-all">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Group Modal */}
      {groupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-navy p-6 text-white text-center">
              <h3 className="font-serif text-lg font-bold">Manage Year Group</h3>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = groupModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/group/${groupModal.data?.id}` : "/api/admin/mas/group",
                isEdit ? "PUT" : "POST",
                groupForm,
                `Group ${isEdit ? "updated" : "added"}`
              );
              if (success) setGroupModal(null);
            }} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Year Label (e.g. 5th Year)</label>
                <input type="text" value={groupForm.year_label || ""} onChange={e => setGroupForm({ ...groupForm, year_label: e.target.value })} className="w-full rounded-xl border p-3 text-sm" required />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setGroupModal(null)} className="flex-1 p-2.5 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-2.5 rounded-xl text-[10px] font-black uppercase">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Member Modal */}
      {memberModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border-t-8 border-gold">
            <div className="p-6 text-center border-b">
              <h3 className="font-serif text-lg font-bold text-navy">Member Name</h3>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = memberModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/member/${memberModal.data?.id}` : "/api/admin/mas/member",
                isEdit ? "PUT" : "POST",
                isEdit ? memberForm : { ...memberForm, group_id: memberModal.groupId },
                `Member ${isEdit ? "updated" : "added"}`
              );
              if (success) setMemberModal(null);
            }} className="p-6 space-y-4">
              <input type="text" value={memberForm.name || ""} onChange={e => setMemberForm({ ...memberForm, name: e.target.value })} className="w-full rounded-xl border p-3 text-sm" placeholder="Student Name" required />
              <div className="flex gap-2">
                <button type="button" onClick={() => setMemberModal(null)} className="flex-1 p-2.5 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-2.5 rounded-xl text-[10px] font-black uppercase">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Batch Modal */}
      {batchModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-navy p-6 text-white text-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider">Manage Achievement Batch</h3>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = batchModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/achievement-batch/${batchModal.data?.id}` : "/api/admin/mas/achievement-batch",
                isEdit ? "PUT" : "POST",
                batchForm,
                `Batch ${isEdit ? "updated" : "added"}`
              );
              if (success) setBatchModal(null);
            }} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Batch Title</label>
                <input type="text" value={batchForm.title || ""} onChange={e => setBatchForm({ ...batchForm, title: e.target.value })} className="w-full rounded-xl border p-3 text-sm" required />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setBatchModal(null)} className="flex-1 p-3 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-3 rounded-xl text-[10px] font-black uppercase">Save Batch</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Item Modal */}
      {itemModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 text-center border-b bg-navy text-gold">
              <h3 className="font-serif text-lg font-bold">Achievement Item</h3>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const isEdit = itemModal.type === "edit";
              const success = await handleCRUD(
                isEdit ? `/api/admin/mas/achievement-item/${itemModal.data?.id}` : "/api/admin/mas/achievement-item",
                isEdit ? "PUT" : "POST",
                isEdit ? itemForm : { ...itemForm, batch_id: itemModal.batchId },
                `Item ${isEdit ? "updated" : "added"}`
              );
              if (success) setItemModal(null);
            }} className="p-8 space-y-4">
              <textarea rows={4} value={itemForm.description || ""} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} className="w-full rounded-xl border p-3 text-sm resize-none" placeholder="Description of achievement..." required />
              <div className="flex gap-2">
                <button type="button" onClick={() => setItemModal(null)} className="flex-1 p-3 rounded-xl border text-[10px] font-black uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-navy text-gold p-3 rounded-xl text-[10px] font-black uppercase">Save Item</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MootAdvocacySociety;
