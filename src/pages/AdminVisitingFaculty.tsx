import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { VisitingFacultyEditModal } from "@/components/admin/VisitingFacultyEditModal";

export interface VisitingFaculty {
  id: number;
  name: string;
  designation: string;
  image_url: string;
  slug: string;
  present_position: string | null;
  display_order: number;
}

const AdminVisitingFaculty = () => {
  const { token } = useAdmin();
  const [faculties, setFaculties] = useState<VisitingFaculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<VisitingFaculty | null>(null);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<VisitingFaculty[]>("/api/visiting-faculty/all");
      setFaculties(data);
    } catch (error) {
      console.error("Failed to fetch visiting faculties", error);
      toast.error("Failed to load visiting faculties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchFaculties();
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this visiting faculty member?")) {
      try {
        await apiFetch(`/api/visiting-faculty/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Visiting faculty deleted successfully");
        fetchFaculties();
      } catch (error) {
        console.error("Delete Error", error);
        toast.error("Failed to delete visiting faculty");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="animate-pulse text-muted-foreground">Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
        <p className="text-muted-foreground mb-8">You must be an admin to view this page.</p>
        <Link to="/" className="text-gold hover:underline">Return to Home</Link>
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
            <span className="text-foreground">Admin</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Visiting Faculty</span>
          </div>
        </div>

        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 block text-sm font-bold tracking-widest text-gold uppercase"
                >
                  Admin Dashboard
                </motion.span>
                <div className="flex items-center gap-4">
                  <h1 className="font-serif text-3xl font-bold text-navy md:text-4xl text-[#0f2d5c]">
                    Visiting Faculty Management
                  </h1>
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setSelectedFaculty(null);
                  setIsModalOpen(true);
                }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#0f2d5c] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                <div className="absolute inset-0 bg-gold/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Plus className="relative z-10 h-5 w-5 text-gold group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10">Add Visiting Faculty</span>
              </motion.button>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-elegant">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/50 text-navy uppercase text-sm font-bold tracking-wider">
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {faculties.map((faculty) => (
                      <tr key={faculty.id} className="transition-colors hover:bg-gold/5 group">
                        <td className="px-6 py-4">
                          <img src={faculty.image_url} alt={faculty.name} className="w-16 h-16 object-cover rounded-full border shadow-sm" />
                        </td>
                        <td className="px-6 py-4 font-bold text-navy group-hover:text-gold">{faculty.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{faculty.designation}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <ArrowUpDown className="h-4 w-4 text-gold/50" />
                            {faculty.display_order}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setSelectedFaculty(faculty);
                                setIsModalOpen(true);
                              }}
                              className="rounded-full bg-navy/5 p-2 text-navy transition-colors hover:bg-gold hover:text-white"
                              title="Edit Faculty"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(faculty.id)}
                              className="rounded-full bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                              title="Delete Faculty"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {faculties.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No visiting faculty members found. Click "Add Visiting Faculty" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <VisitingFacultyEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facultyData={selectedFaculty}
        onSuccess={fetchFaculties}
      />
    </div>
  );
};

export default AdminVisitingFaculty;
