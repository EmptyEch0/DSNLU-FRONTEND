import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Phone, 
  Mail, 
  GraduationCap, 
  FileText, 
  Home, 
  Trophy,
  ArrowRight,
  ShieldQuestion,
  ChevronRight,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

interface WelfareOfficial {
  id: number;
  name: string;
  designation: string;
  sub_role?: string;
  concern: string;
  icon: string;
  phone: string;
  email: string;
  display_order: number;
}

interface WelfarePage {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  GraduationCap,
  Home,
  Trophy
};

export default function StudentWelfareCell() {
  const { token } = useAdmin();
  const [data, setData] = useState<{
    page: WelfarePage;
    officials: WelfareOfficial[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<
    | { type: "add" }
    | { type: "edit"; data: WelfareOfficial }
    | null
  >(null);

  const [formData, setFormData] = useState<Partial<WelfareOfficial>>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/student-welfare`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load student welfare data");
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

  const saveOfficial = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = modal?.type === "edit";
    const url = isEdit && modal.type === "edit"
      ? `${API}/api/admin/student-welfare/${modal.data.id}`
      : `${API}/api/admin/student-welfare`;

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
        toast.success(isEdit ? "Official updated!" : "Official added!");
        setModal(null);
        fetchData();
      } else {
        toast.error("Failed to save official.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving official.");
    }
  };

  const deleteOfficial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this official?")) return;

    try {
      const res = await fetch(`${API}/api/admin/student-welfare/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (res.ok) {
        toast.success("Official deleted successfully!");
        fetchData();
      } else {
        toast.error("Failed to delete official.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting official.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      
      <main className="flex-grow">
        {/* Institutional Hero Section */}
        <section className="relative overflow-hidden bg-navy py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy to-navy" />
          
          <div className="container relative z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex items-center gap-2 text-gold/80">
                <Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Students</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Student Welfare Cell</span>
              </div>
              
              <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl uppercase">
                {data?.page?.title || "Student Welfare Cell"}
              </h1>
              <div className="h-1 w-24 bg-gold rounded-full mb-8 shadow-gold/20 shadow-lg" />
              <p className="max-w-2xl text-lg font-medium text-white/80 leading-relaxed italic">
                {data?.page?.subtitle || '"Students are advised to contact the concerned authority for their grievance."'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grievance Contact Section */}
        <section className="py-20 lg:py-28">
          <div className="container px-4">
            <div className="mx-auto max-w-7xl">
              
              {token && (
                <div className="flex justify-end mb-8">
                  <Button
                    onClick={() => {
                      setModal({ type: "add" });
                      setFormData({ display_order: (data?.officials?.length || 0) + 1 });
                    }}
                    className="bg-navy text-gold hover:bg-navy/90 rounded-full text-xs font-bold flex items-center gap-2 px-6 h-10 shadow-lg"
                  >
                    <Plus className="h-4 w-4" />
                    Add Official
                  </Button>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                </div>
              ) : (
                <>
                  {data?.officials?.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground italic text-lg">
                        No student welfare officials added yet.
                      </p>
                    </div>
                  )}

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.officials?.map((official, index) => {
                      const IconComponent = iconMap[official.icon] || FileText;

                      return (
                        <motion.div
                          key={official.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-elegant transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-l-4 border-transparent hover:border-gold"
                        >
                          {token && (
                            <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => {
                                  setModal({ type: "edit", data: official });
                                  setFormData(official);
                                }}
                                className="p-2 bg-white/90 border rounded-lg text-navy hover:text-gold shadow-sm hover:shadow-md transition-all"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => deleteOfficial(official.id)}
                                className="p-2 bg-white/90 border rounded-lg text-red-600 hover:bg-red-50 shadow-sm hover:shadow-md transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-gold">
                              <IconComponent className="h-7 w-7" />
                            </div>
                            <span className="rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white transition-colors">
                              {official.concern}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 mb-6">
                            <h3 className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                              {official.name}
                            </h3>
                            <p className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
                              {official.designation}
                            </p>
                            {official.sub_role && (
                              <p className="text-[13px] font-medium text-navy/60">
                                {official.sub_role}
                              </p>
                            )}
                          </div>

                          <div className="mt-auto flex flex-col gap-4 border-t border-navy/5 pt-6">
                            <a 
                              href={`tel:+91${official.phone}`}
                              className="flex items-center gap-3 text-sm font-medium text-navy/80 transition-colors hover:text-gold"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 group-hover:bg-navy/20">
                                <Phone className="h-4 w-4" />
                              </div>
                              +91 {official.phone}
                            </a>
                            <a 
                              href={`mailto:${official.email}`}
                              className="flex items-center gap-3 text-sm font-medium text-navy/80 transition-colors hover:text-gold"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 group-hover:bg-navy/20">
                                <Mail className="h-4 w-4" />
                              </div>
                              {official.email}
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Still Need Help Section */}
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-24 rounded-3xl bg-navy p-10 lg:p-16 text-center relative overflow-hidden group shadow-2xl"
                >
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 bg-gold/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-gold backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <ShieldQuestion className="h-10 w-10" />
                    </div>
                    
                    <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
                      Still Need Help?
                    </h2>
                    <p className="mb-10 max-w-xl text-lg text-white/70">
                      If your concern isn't addressed above, please contact the University Administration for further assistance.
                    </p>
                    
                    <Link to="/contact-us">
                      <Button 
                        size="lg" 
                        className="bg-gold text-navy hover:bg-white hover:text-navy px-10 h-14 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-gold/20 transition-all duration-300 group-hover:translate-x-1"
                      >
                        Contact Administration
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Admin Modal */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy">
                {modal.type === "edit" ? "Edit Official" : "Add Official"}
              </h2>
              <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-navy">
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>

            <form onSubmit={saveOfficial} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Official Name</label>
                <input
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="Full Name (e.g. Dr. K. Sudha)"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Designation</label>
                  <input
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="Associate Dean"
                    value={formData.designation || ""}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Icon</label>
                  <select
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                    value={formData.icon || ""}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                  >
                    <option value="">Select Icon</option>
                    <option value="FileText">FileText (Examination)</option>
                    <option value="GraduationCap">GraduationCap (Academics)</option>
                    <option value="Home">Home (Hostel)</option>
                    <option value="Trophy">Trophy (Sports)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Concern / Area</label>
                <input
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="Examination Matters"
                  value={formData.concern || ""}
                  onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Sub Role (Optional)</label>
                <input
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="Chief Warden – Boys Hostel"
                  value={formData.sub_role || ""}
                  onChange={(e) => setFormData({ ...formData, sub_role: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone</label>
                  <input
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="10-digit number"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Order</label>
                  <input
                    type="number"
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="1"
                    value={formData.display_order || ""}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                <input
                  type="email"
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="name@dsnlu.ac.in"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-6 py-2 border-2 border-muted-foreground/20 rounded-full font-bold hover:bg-secondary/50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 py-2 bg-navy text-gold rounded-full font-bold shadow-lg shadow-navy/20 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  {modal.type === "edit" ? "Update Official" : "Create Official"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
