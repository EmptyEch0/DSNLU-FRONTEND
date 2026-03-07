import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Briefcase, 
  UserCircle, 
  ShieldCheck, 
  Headphones, 
  LucideIcon, 
  Pencil, 
  Trash2, 
  Plus 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { StaffEditModal, StaffMember } from "@/components/admin/StaffEditModal";

interface StaffCategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
  members: StaffMember[];
}

const IconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Briefcase,
  UserCircle,
  Headphones
};

const StaffCard = ({ 
  member, 
  onEdit, 
  onDelete 
}: { 
  member: StaffMember;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const { token } = useAdmin();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl p-6 shadow-sm border border-transparent transition-all duration-300 hover:shadow-xl hover:border-gold/20 flex flex-col items-center text-center"
    >
      {token && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => { e.preventDefault(); onEdit?.(); }}
            className="p-2 rounded-full bg-white/90 shadow-sm border hover:bg-gold hover:text-white transition-colors text-navy"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onDelete?.(); }}
            className="p-2 rounded-full bg-white/90 shadow-sm border hover:bg-red-500 hover:text-white transition-colors text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="relative w-32 h-32 mb-4">
        <img
          src={member.image_url}
          alt={member.name}
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
      </div>
      <h3 className="font-serif font-bold text-[#0f2d5c] text-lg mb-1 group-hover:text-gold transition-colors">
        {member.name}
      </h3>
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        {member.designation}
      </p>
      <div className="mt-4 h-0.5 w-8 rounded-full bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
    </motion.div>
  );
};

const SectionHeading = ({ title, icon: Icon }: { title: string; icon: LucideIcon }) => (
  <div className="relative mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gold/10 rounded-xl">
        <Icon className="h-6 w-6 text-gold" />
      </div>
      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] tracking-tight truncate">
        {title}
      </h2>
    </div>
    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-full bg-gold"
      />
    </div>
  </div>
);

interface CategoryResponse {
  id: number;
  title: string;
  slug: string;
  icon: string;
  display_order: number;
  is_active: number;
}

const OfficersStaff = () => {
  const { token } = useAdmin();
  const [categories, setCategories] = useState<StaffCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<number | undefined>();
  const [reorderCategory, setReorderCategory] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const cats = await apiFetch<CategoryResponse[]>("/api/staff/categories");
      
      const catsWithMembers = await Promise.all(
        cats.map(async (cat) => {
          const members = await apiFetch<StaffMember[]>(`/api/staff/by-category/${cat.slug}`);
          return { ...cat, members };
        })
      );
      
      // Deduplicate by id
      const unique = catsWithMembers.filter(
        (cat, index, self) => index === self.findIndex(c => c.id === cat.id)
      );
      setCategories(unique);
    } catch (error) {
      console.error("Failed to fetch staff data", error);
      toast.error("Failed to load staff directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await apiFetch(`/api/admin/staff/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Staff member deleted");
        fetchData();
      } catch (error) {
        console.error("Delete Error", error);
        toast.error("Failed to delete staff member");
      }
    }
  };

  const handleReorder = async (catId: number, newMembers: StaffMember[]) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, members: newMembers } : cat));
  };

  const saveOrder = async (catId: number) => {
    if (!token) return;
    const category = categories.find(c => c.id === catId);
    if (!category) return;

    const items = category.members.map((m, index) => ({
      id: m.id,
      display_order: index + 1
    }));

    try {
      await apiFetch("/api/admin/staff/reorder", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(items)
      });
      toast.success("Order saved successfully");
      setReorderCategory(null);
    } catch (error) {
      console.error("Reorder Error", error);
      toast.error("Failed to save order");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
            <p className="text-muted-foreground font-serif italic">Loading Officers & Staff...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Officers & Staff</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 inline-block"
            >
              Academic Administration
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Officers & Staff
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-gold/50 via-gold to-gold/50" 
            />
          </div>
        </section>

        {/* Directory Content */}
        <div className="container py-24 space-y-24">
          {categories.map((category) => (
            <section key={category.id}>
              <div className="relative">
                <SectionHeading 
                  title={category.title} 
                  icon={IconMap[category.icon] || Briefcase} 
                />
                
                {token && (
                  <div className="absolute right-0 top-0 flex gap-2">
                    {reorderCategory === category.id ? (
                      <button
                        onClick={() => saveOrder(category.id)}
                        className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-green-700"
                      >
                        Save Order
                      </button>
                    ) : (
                      <button
                        onClick={() => setReorderCategory(category.id)}
                        className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-navy transition-all hover:bg-slate-200"
                      >
                        Reorder
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedStaff(null);
                        setSelectedCatId(category.id);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-white transition-all hover:bg-navy hover:shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      Add Member
                    </button>
                  </div>
                )}
              </div>

              {reorderCategory === category.id ? (
                <Reorder.Group
                  axis="y"
                  values={category.members}
                  onReorder={(newOrder) => handleReorder(category.id, newOrder)}
                  className="grid grid-cols-1 gap-4"
                >
                  {category.members.map((member) => (
                    <Reorder.Item
                      key={member.id}
                      value={member}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-dashed border-slate-200 cursor-move"
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden border">
                        <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-navy">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.designation}</p>
                      </div>
                      <div className="mr-4 text-slate-400">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                          <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${category.slug !== 'university-officers' ? 'xl:grid-cols-4' : ''} gap-8`}>
                  {category.members.map((member) => (
                    <StaffCard 
                      key={member.id} 
                      member={member} 
                      onEdit={() => {
                        setSelectedStaff(member);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => member.id && handleDelete(member.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />

      <StaffEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staffData={selectedStaff}
        categories={categories}
        defaultCategoryId={selectedCatId}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default OfficersStaff;
