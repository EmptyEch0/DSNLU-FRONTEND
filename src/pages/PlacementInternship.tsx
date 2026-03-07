import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Briefcase, 
  Mail, 
  Phone, 
  Users, 
  UserCircle, 
  FileText, 
  GraduationCap,
  Calendar,
  ExternalLink,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

interface PlacementMember {
  id: number;
  page_id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  committee_type: string;
  display_order: number;
}

interface PlacementSection {
  id: number;
  page_id: number;
  section_key: string;
  title: string;
  description: string;
  display_order: number;
}

interface PlacementData {
  page: {
    id: number;
    title: string;
    slug: string;
  };
  sections: PlacementSection[];
  members: PlacementMember[];
}

const PlacementInternship = () => {
  const [data, setData] = useState<PlacementData | null>(null);
  const { token } = useAdmin();
  const [modal, setModal] = useState<
    | { type: "editSection"; data: PlacementSection }
    | { type: "addMember"; committee: string }
    | { type: "editMember"; data: PlacementMember }
    | null
  >(null);

  const [formData, setFormData] = useState<Partial<PlacementMember> & { description?: string }>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/placement`);
      const resData = await res.json();
      console.log("FULL API RESPONSE:", JSON.stringify(resData, null, 2));
      setData(resData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const saveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modal?.type !== "editSection") return;

    try {
      const res = await fetch(
        `${API}/api/admin/placement/section/${modal.data.id}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({ description: formData.description }),
        }
      );

      if (res.ok) {
        toast.success("Updated!");
        setModal(null);
        fetchData();
      }
    } catch {
      toast.error("Error updating.");
    }
  };

  const saveMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = modal?.type === "editMember";
    
    // For new members, we need the page_id
    const memberData = isEdit ? formData : { ...formData, page_id: data?.page.id };

    const url = isEdit
      ? `${API}/api/admin/placement/member/${modal.data.id}`
      : `${API}/api/admin/placement/member`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(memberData),
      });

      if (res.ok) {
        toast.success("Saved!");
        setModal(null);
        fetchData();
      }
    } catch {
      toast.error("Error saving.");
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      const res = await fetch(
        `${API}/api/admin/placement/member/${id}`,
        { method: "DELETE", headers: authHeaders() }
      );

      if (res.ok) {
        toast.success("Deleted!");
        fetchData();
      }
    } catch {
      toast.error("Error deleting.");
    }
  };

  const rccFaculty = data?.members?.filter(
    (m: PlacementMember) => m.committee_type?.trim().toLowerCase() === "rcc_faculty"
  ) || [];


  const iccContacts = data?.members?.filter(
    (m: PlacementMember) => m.committee_type?.trim().toLowerCase() === "icc_contacts"
  ) || [];

  const iccFacultySection = data?.members?.filter(
    (m: PlacementMember) => m.committee_type?.trim().toLowerCase() === "icc_faculty"
  ) || [];

  const rccSection = data?.sections?.find(
    (s: PlacementSection) => s.section_key === "rcc"
  );

  const iccSection = data?.sections?.find(
    (s: PlacementSection) => s.section_key === "icc"
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            <span className="text-foreground">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Placement & Internship</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-15 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/70" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-gold md:text-5xl lg:text-6xl uppercase tracking-wider"
            >
              Placement & Internship
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-white/80 font-medium"
            >
              Recruitment & Internship Coordination at DSNLU
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-8 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Section 1: RCC */}
        <section className="py-20 bg-secondary/10">
          <div className="container space-y-16">
            
            {/* RCC Header + Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <motion.h2
                  variants={itemVariants}
                  className="font-serif text-3xl font-bold text-navy relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-16 after:bg-gold after:rounded-full"
                >
                  Recruitment Coordination Committee (RCC)
                </motion.h2>

                {token && (
                  <button
                    onClick={() => {
                      if (rccSection) {
                        setModal({ type: "editSection", data: rccSection });
                        setFormData({ description: rccSection.description });
                      }
                    }}
                    className="p-2 hover:bg-gold/10 text-gold rounded-full transition-colors bg-navy"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-12 lg:grid-cols-2 items-start">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="rounded-3xl border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
                    <div
                      className="text-foreground leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: rccSection?.description ?? "" }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
                    <div className="bg-navy px-6 py-4">
                      <h3 className="text-white font-bold flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" />
                        Internship & Placements Committee (Faculty)
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="px-6 py-4 text-sm font-bold text-navy uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-sm font-bold text-navy uppercase tracking-wider">Designation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {rccFaculty.length === 0 && (
                            <tr>
                              <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground italic">
                                No faculty members added yet.
                              </td>
                            </tr>
                          )}
                          {rccFaculty.map((member, idx) => (
                            <tr key={idx} className="hover:bg-gold/5 transition-colors group">
                              <td className="px-6 py-4 text-foreground font-medium group-hover:text-navy">{member.name}</td>
                              <td className="px-6 py-4 text-muted-foreground">{member.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>


          </div>
        </section>

        {/* Section 2: ICC */}
        <section className="py-20">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <motion.h2 
                    variants={itemVariants}
                    className="font-serif text-3xl font-bold text-navy relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-16 after:bg-gold after:rounded-full"
                  >
                    Internship Co-ordination Committee (ICC)
                  </motion.h2>

                  {token && (
                    <button
                      onClick={() => {
                        if (iccSection) {
                          setModal({ type: "editSection", data: iccSection });
                          setFormData({ description: iccSection.description });
                        }
                      }}
                      className="p-2 hover:bg-gold/10 text-gold rounded-full transition-colors bg-navy"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <motion.div variants={itemVariants} className="max-w-4xl rounded-3xl border-l-4 border-l-gold bg-card p-8 shadow-sm">
                  <div 
                    className="text-foreground leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: iccSection?.description }}
                  />
                </motion.div>
              </div>

              {/* ICC Contacts */}
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <motion.h3 variants={itemVariants} className="text-xl font-bold text-navy flex items-center gap-3">
                      <div className="h-8 w-1 bg-gold rounded-full" />
                      Committee Contacts
                    </motion.h3>

                    {token && (
                      <button
                        onClick={() => {
                          setModal({ type: "addMember", committee: "icc_contacts" });
                          setFormData({ committee_type: "icc_contacts" });
                        }}
                        className="px-4 py-2 bg-navy text-gold rounded-full flex items-center gap-2 font-bold text-xs"
                      >
                        <Plus className="h-4 w-4" />
                        Add Member
                      </button>
                    )}
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {iccContacts.length === 0 && (
                      <p className="text-muted-foreground italic col-span-full py-4">
                        No committee contacts added yet.
                      </p>
                    )}
                    {iccContacts.map((contact, idx) => (
                      <ContactCard 
                        key={idx} 
                        contact={contact} 
                        variants={itemVariants}
                        isAdmin={!!token}
                        onEdit={() => {
                          setModal({ type: "editMember", data: contact });
                          setFormData(contact);
                        }}
                        onDelete={() => deleteMember(contact.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <motion.h3 variants={itemVariants} className="text-xl font-bold text-navy mb-8 flex items-center gap-3">
                    <div className="h-8 w-1 bg-gold rounded-full" />
                    Faculty Committee
                  </motion.h3>
                  <div className="space-y-6">
                    {iccFacultySection.length === 0 && (
                      <p className="text-muted-foreground italic py-2">
                        No faculty members added yet.
                      </p>
                    )}
                    {iccFacultySection.map((faculty, idx) => (
                      <ContactCard 
                        key={idx} 
                        contact={faculty} 
                        variants={itemVariants} 
                        compact
                        isAdmin={!!token}
                        onEdit={() => {
                          setModal({ type: "editMember", data: faculty });
                          setFormData(faculty);
                        }}
                        onDelete={() => deleteMember(faculty.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Modals */}
      {modal?.type === "editSection" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl w-full max-w-2xl space-y-6 shadow-2xl"
          >
            <div>
              <h2 className="text-2xl font-bold text-navy">Edit Section Content</h2>
              <p className="text-muted-foreground text-sm mt-1">Updates will be visible after saving.</p>
            </div>
            <form onSubmit={saveSection} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy uppercase tracking-wider">Description (HTML Supported)</label>
                <textarea
                  className="w-full border rounded-2xl p-4 min-h-[300px] focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setModal(null)} className="px-6 py-2.5 border rounded-full font-bold text-sm hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg hover:shadow-gold/20 transition-all">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {(modal?.type === "addMember" || modal?.type === "editMember") && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-6 shadow-2xl"
          >
            <div>
              <h2 className="text-2xl font-bold text-navy">
                {modal.type === "editMember" ? "Edit Member" : "Add New Member"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {modal.type === "addMember" ? "Adding to: " + modal.committee.replace('_', ' ').toUpperCase() : "Modify member details below."}
              </p>
            </div>
            <form onSubmit={saveMember} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">Member Name</label>
                  <input
                    className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="Enter name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">Role / Designation</label>
                  <input
                    className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="Enter role (e.g. Student Convenor)"
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="example@dsnlu.ac.in"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                <button type="button" onClick={() => setModal(null)} className="px-6 py-2.5 border rounded-full font-bold text-sm hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg hover:shadow-gold/20 transition-all">
                  {modal.type === "editMember" ? "Update Details" : "Add Member"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Helper Components
interface Contact {
  role: string;
  name: string;
  email: string;
  phone: string;
}


const ContactCard = ({ 
  contact, 
  variants, 
  compact = false,
  isAdmin = false,
  onEdit,
  onDelete
}: { 
  contact: PlacementMember; 
  variants: Variants; 
  compact?: boolean;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <motion.div 
      variants={variants}
      className={cn(
        "group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-md hover:border-gold/30 hover:-translate-y-1 overflow-hidden",
        !compact && "lg:p-8"
      )}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.();
            }} 
            className="p-1.5 bg-background border rounded-lg text-navy hover:text-gold hover:border-gold transition-all shadow-sm"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.();
            }} 
            className="p-1.5 bg-background border rounded-lg text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
          <UserCircle className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold italic">
              {contact.role}
            </span>
            <h4 className="mt-1 text-lg font-bold text-foreground leading-tight">{contact.name}</h4>
          </div>
          
          <div className="space-y-2">
            <a 
              href={`mailto:${contact.email}`}
              className="group/link flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <Mail className="h-4 w-4 text-gold/60 group-hover/link:text-gold" />
              <span className="border-b border-transparent group-hover/link:border-gold/30 transition-all font-medium">
                {contact.email}
              </span>
            </a>
            <a 
              href={`tel:${contact.phone.replace(/[\s-]/g, '')}`}
              className="group/link flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <Phone className="h-4 w-4 text-gold/60 group-hover/link:text-gold" />
              <span className="font-bold tracking-tight">
                {contact.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementInternship;
