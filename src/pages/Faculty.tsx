import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { FacultyEditModal, FacultyMember } from "@/components/admin/FacultyEditModal";

interface FacultyCategory {
  id: number;
  title: string;
  slug: string;
  members: FacultyMember[];
}

const FacultyCard = ({ 
  member, 
  isVC = false, 
  onEdit, 
  onDelete 
}: { 
  member: FacultyMember; 
  isVC?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const { token } = useAdmin();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={isVC ? "max-w-xl mx-auto" : ""}
    >
      <div className={`group relative bg-white overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/30 border border-transparent flex flex-col items-center p-8 text-center ${isVC ? 'border-b-4 border-b-gold lg:p-12' : ''}`}>
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

        <Link 
          to={member.slug ? `/people/faculty/${member.slug}` : "#"}
          className="block relative mb-6 focus:outline-none"
        >
          <div className={`relative ${isVC ? 'w-48 h-48 lg:w-56 lg:h-56' : 'w-32 h-32'}`}>
            <img
              src={member.image_url}
              alt={member.name}
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105 border-4 border-white shadow-md"
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-gold/20 transition-colors pointer-events-none" />
          </div>
        </Link>
        <Link 
          to={member.slug ? `/people/faculty/${member.slug}` : "#"}
          className="focus:outline-none"
        >
          <h3 className={`font-serif font-bold text-[#0f2d5c] mb-2 hover:text-gold transition-colors ${isVC ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
            {member.name}
          </h3>
        </Link>
        <p className={`text-muted-foreground font-medium ${isVC ? 'text-lg text-gold' : 'text-sm'}`}>
          {member.designation}
        </p>
        {!isVC && <div className="mt-4 h-1 w-8 rounded-full bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />}
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-16 flex flex-col items-center">
    <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-widest text-center">
      {children}
    </h2>
    <div className="mt-4 h-1 w-24 rounded-full bg-gold" />
  </div>
);

interface CategoryResponse {
  id: number;
  title: string;
  slug: string;
  display_order: number;
  is_active: number;
}

const Faculty = () => {
  const { token } = useAdmin();
  const [categories, setCategories] = useState<FacultyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<number | undefined>();
  const [reorderCategory, setReorderCategory] = useState<number | null>(null);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      const cats = await apiFetch<CategoryResponse[]>("/api/faculty/categories");
      
      const catsWithMembers = await Promise.all(
        cats.map(async (cat) => {
          const members = await apiFetch<FacultyMember[]>(`/api/faculty/by-category/${cat.slug}`);
          return { ...cat, members };
        })
      );
      
      // Deduplicate by id
      const unique = catsWithMembers.filter(
        (cat, index, self) => index === self.findIndex(c => c.id === cat.id)
      );
      setCategories(unique);
    } catch (error) {
      console.error("Failed to fetch faculty data", error);
      toast.error("Failed to load faculty directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await apiFetch(`/api/admin/faculty/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Faculty member deleted");
        fetchFacultyData();
      } catch (error) {
        console.error("Delete Error", error);
        toast.error("Failed to delete faculty member");
      }
    }
  };

  const handleReorder = async (catId: number, newMembers: FacultyMember[]) => {
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
      await apiFetch("/api/admin/faculty/reorder", {
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
            <p className="text-muted-foreground font-serif italic">Loading Faculty Directory...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Faculty</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl uppercase tracking-wider"
            >
              Faculty Directory
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="py-24 space-y-32">
          {categories.map((category) => (
            <section key={category.id} className="container">
              <div className="flex flex-col items-center mb-12 relative">
                <SectionTitle>{category.title}</SectionTitle>
                {token && (
                  <div className="absolute right-4 top-0 flex gap-2">
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
                        setSelectedFaculty(null);
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
                        {/* Drag handle icon */}
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                          <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <div className={category.slug === 'vc' ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"}>
                  {category.members.map((member) => (
                    <FacultyCard 
                      key={member.id} 
                      member={member} 
                      isVC={category.slug === 'vc'}
                      onEdit={() => {
                        setSelectedFaculty(member);
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

      <FacultyEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facultyData={selectedFaculty}
        categories={categories}
        defaultCategoryId={selectedCatId}
        onSuccess={fetchFacultyData}
      />
    </div>
  );
};

export default Faculty;
