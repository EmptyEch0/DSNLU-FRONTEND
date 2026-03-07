import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  FileCheck, 
  Scale, 
  Clock, 
  AlertCircle, 
  UserPlus, 
  Gavel, 
  FileText,
  Clock3,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const SectionHeader = ({ title, icon: Icon, onEdit, onDelete, isAdmin }: { 
  title: string, 
  icon: LucideIcon,
  onEdit?: () => void,
  onDelete?: () => void,
  isAdmin?: boolean
}) => (
  <div className="flex items-center justify-between gap-3 mb-8 border-b border-navy/10 pb-4">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-navy/5 rounded-lg">
        <Icon className="h-6 w-6 text-navy" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">{title}</h2>
    </div>
    {isAdmin && onEdit && onDelete && (
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={onDelete} className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    )}
  </div>
);

const RegulationItem = ({ children, onEdit, onDelete, isAdmin }: { 
  children: React.ReactNode,
  onEdit?: () => void,
  onDelete?: () => void,
  isAdmin?: boolean
}) => (
  <motion.li 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="group flex items-start gap-3 text-muted-foreground mb-4"
  >
    <div className="h-1.5 w-1.5 rounded-full bg-navy/40 mt-2.5 shrink-0" />
    <span className="text-lg leading-relaxed flex-1">{children}</span>
    {isAdmin && onEdit && onDelete && (
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-full">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button onClick={onDelete} className="p-1.5 hover:bg-red-50 text-red-600 rounded-full">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    )}
  </motion.li>
);

const API = import.meta.env.VITE_API_URL;

const LibraryRegulations = () => {
  const { token } = useAdmin();
  const [timings, setTimings] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  
  // Modals state
  const [timingModal, setTimingModal] = useState<{ type: "add" | "edit"; item: any } | null>(null);
  const [sectionModal, setSectionModal] = useState<{ type: "addSection" | "editSection" | "addItem" | "editItem"; data: any } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchData = async () => {
    try {
      const [timingsRes, sectionsRes] = await Promise.all([
        fetch(`${API}/api/library/timings`),
        fetch(`${API}/api/library/sections`)
      ]);
      
      const timingsData = await timingsRes.json();
      const sectionsData = await sectionsRes.json();
      
      setTimings(Array.isArray(timingsData) ? timingsData : []);
      setSections(Array.isArray(sectionsData) ? sectionsData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  /* --------- TIMINGS CRUD --------- */
  const saveTiming = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = timingModal?.type === "edit";
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${API}/api/library/timings/${timingModal.item.id}`
      : `${API}/api/library/timings`;

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(formData),
      });

      if (res.status === 403) { toast.error("Session expired."); return; }
      if (!res.ok) { const result = await res.json(); toast.error(result.error || "Failed"); return; }

      toast.success("Timing saved!");
      setTimingModal(null);
      fetchData();
    } catch { toast.error("Server error."); }
  };

  const deleteTiming = async (id: number) => {
    if (!confirm("Delete this timing?")) return;
    try {
      const res = await fetch(`${API}/api/library/timings/${id}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) { toast.success("Deleted!"); fetchData(); }
    } catch { toast.error("Error deleting."); }
  };

  /* --------- SECTIONS CRUD --------- */
  const saveSectionAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionModal) return;

    let url = `${API}/api/library/sections`;
    let method = "POST";
    let body: any = {};

    switch (sectionModal.type) {
      case "addSection":
        url += "/section";
        body = { title: formData.title };
        break;
      case "editSection":
        url += `/section/${sectionModal.data.id}`;
        method = "PUT";
        body = { title: formData.title };
        break;
      case "addItem":
        url += "/item";
        body = { section_id: sectionModal.data.section_id, content: formData.content };
        break;
      case "editItem":
        url += `/item/${sectionModal.data.id}`;
        method = "PUT";
        body = { content: formData.content };
        break;
    }

    try {
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      if (res.ok) {
        toast.success("Action successful!");
        setSectionModal(null);
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed");
      }
    } catch { toast.error("Server error."); }
  };

  const deleteSection = async (id: number) => {
    if (!confirm("Delete this section and all its contents?")) return;
    try {
      const res = await fetch(`${API}/api/library/sections/section/${id}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) { toast.success("Section deleted!"); fetchData(); }
    } catch { toast.error("Error deleting."); }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API}/api/library/sections/item/${id}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) { toast.success("Item deleted!"); fetchData(); }
    } catch { toast.error("Error deleting."); }
  };

  const libraryTimings = timings.filter(t => t.category === "Library Timings");
  const counterTimings = timings.filter(t => t.category === "Library Counter");

  // Fallback static data
  const fallbackLibraryTimings = [
    { label: "Session", value: "8:00 AM – 12:00 Midnight" },
    { label: "Weekends/Holidays", value: "9:00 AM – 5:00 PM" },
    { label: "Public Holidays", value: "Closed" },
  ];

  const fallbackCounterTimings = [
    { label: "Mon–Fri", value: "9:00 AM – 8:00 PM" },
    { label: "Sat–Sun", value: "10:00 AM – 4:00 PM" },
  ];

  const displayLibraryTimings = libraryTimings.length > 0 ? libraryTimings : fallbackLibraryTimings;
  const displayCounterTimings = counterTimings.length > 0 ? counterTimings : fallbackCounterTimings;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="regulations" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {/* Dynamic Sections */}
              {sections.map((section) => (
                <div key={section.id} className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                  <SectionHeader 
                    title={section.title} 
                    icon={FileText} 
                    isAdmin={!!token}
                    onEdit={() => { setSectionModal({ type: "editSection", data: section }); setFormData({ title: section.title }); }}
                    onDelete={() => deleteSection(section.id)}
                  />
                  <ul className="space-y-2">
                    {section.items?.map((item: any) => (
                      <RegulationItem 
                        key={item.id}
                        isAdmin={!!token}
                        onEdit={() => { setSectionModal({ type: "editItem", data: item }); setFormData({ content: item.content }); }}
                        onDelete={() => deleteItem(item.id)}
                      >
                        {item.content}
                      </RegulationItem>
                    ))}
                  </ul>
                  {token && (
                    <Button 
                      variant="ghost" 
                      onClick={() => { setSectionModal({ type: "addItem", data: { section_id: section.id } }); setFormData({ content: "" }); }}
                      className="mt-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2 border border-dashed border-blue-200"
                    >
                      <Plus className="h-4 w-4" /> Add Item
                    </Button>
                  )}
                </div>
              ))}

              {token && (
                <div className="flex justify-center pt-8 border-t border-navy/5">
                  <Button 
                    onClick={() => { setSectionModal({ type: "addSection", data: null }); setFormData({ title: "" }); }}
                    className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 py-6 h-auto text-lg gap-2 shadow-lg"
                  >
                    <Plus className="h-5 w-5" /> Add New Regulation Section
                  </Button>
                </div>
              )}

              {/* Overdue Charges (Static for now as specified "dont remove any exiting ocnelike fines") */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="Overdue Charges" icon={Clock} />
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  {[
                    { days: "First 15 days", price: "₹2 per day" },
                    { days: "15–60 days", price: "₹3 per day" },
                    { days: "Above 60 days", price: "₹10 per day" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-navy/5 rounded-2xl text-center border border-navy/10">
                      <div className="text-navy font-bold text-xl mb-2">{item.price}</div>
                      <div className="text-muted-foreground text-sm uppercase tracking-wider">{item.days}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* No Dues Certificate (Static as per rules) */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="No Dues Certificate" icon={FileText} />
                <p className="text-muted-foreground text-lg mb-6">Students/faculty must meet the following criteria to receive a "No Due Certificate":</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {["Return all books", "Clear fines", "Submit RFID card"].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-blue-600/5 rounded-xl border border-blue-600/10">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <Scale className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-blue-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-navy text-white p-8 lg:p-12 rounded-3xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Clock3 className="h-48 w-48 text-white" />
                </div>
                <div className="relative z-10 grid gap-12 lg:grid-cols-2">
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <SectionHeader title="Library Timings" icon={Clock} />
                      {token && (
                        <button 
                          onClick={() => { setTimingModal({ type: "add", item: null }); setFormData({ category: "Library Timings" }); }}
                          className="mb-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {displayLibraryTimings.map((t, i) => (
                        <div key={t.id || i} className={`flex justify-between items-center ${i < displayLibraryTimings.length - 1 ? "border-b border-white/10 pb-4" : ""}`}>
                          <div className="flex flex-col">
                            <span className="text-white/70">{t.label}</span>
                            <span className={`font-bold ${t.value.toLowerCase() === "closed" ? "text-blue-400" : ""}`}>{t.value}</span>
                          </div>
                          {token && t.id && (
                            <div className="flex gap-2">
                              <button onClick={() => { setTimingModal({ type: "edit", item: t }); setFormData(t); }} className="p-1 hover:text-blue-400 transition-colors"><Pencil className="h-4 w-4" /></button>
                              <button onClick={() => deleteTiming(t.id)} className="p-1 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <SectionHeader title="Library Counter" icon={UserPlus} />
                      {token && (
                        <button 
                          onClick={() => { setTimingModal({ type: "add", item: null }); setFormData({ category: "Library Counter" }); }}
                          className="mb-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {displayCounterTimings.map((t, i) => (
                        <div key={t.id || i} className={`flex justify-between items-center ${i < displayCounterTimings.length - 1 ? "border-b border-white/10 pb-4" : ""}`}>
                          <div className="flex flex-col">
                            <span className="text-white/70">{t.label}</span>
                            <span className="font-bold">{t.value}</span>
                          </div>
                          {token && t.id && (
                            <div className="flex gap-2">
                               <button onClick={() => { setTimingModal({ type: "edit", item: t }); setFormData(t); }} className="p-1 hover:text-blue-400 transition-colors"><Pencil className="h-4 w-4" /></button>
                              <button onClick={() => deleteTiming(t.id)} className="p-1 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Timing Modal */}
      {timingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-navy">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold">{timingModal.type === "edit" ? "Edit Timing" : "Add Timing"}</h3>
              <button onClick={() => setTimingModal(null)}>✕</button>
            </div>
            <form onSubmit={saveTiming} className="p-8 space-y-4">
              <select className="w-full border-2 border-navy/10 rounded-xl px-4 py-2" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option>Library Timings</option>
                <option>Library Counter</option>
              </select>
              <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3" placeholder="Label" value={formData.label || ""} onChange={(e) => setFormData({ ...formData, label: e.target.value })} />
              <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3" placeholder="Value" value={formData.value || ""} onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setTimingModal(null)} className="flex-1 rounded-xl">Cancel</Button>
                <Button type="submit" className="flex-1 bg-navy text-white rounded-xl">Save</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Sections CRUD Modal */}
      {sectionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-navy">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold">
                {sectionModal.type.includes("Section") ? (sectionModal.type === "addSection" ? "Add Section" : "Edit Section") : (sectionModal.type === "addItem" ? "Add Item" : "Edit Item")}
              </h3>
              <button onClick={() => setSectionModal(null)}>✕</button>
            </div>
            <form onSubmit={saveSectionAction} className="p-8 space-y-4">
              {sectionModal.type.includes("Section") ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Section Title</label>
                  <input required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="e.g. Admission to the Library" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/60 pl-1">Instruction / Rule Content</label>
                  <textarea required className="w-full border-2 border-navy/10 rounded-xl px-4 py-3 min-h-[120px] outline-none focus:border-blue-600 transition-colors" placeholder="e.g. Silence must be maintained." value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setSectionModal(null)} className="flex-1 rounded-xl py-6 font-bold">Cancel</Button>
                <Button type="submit" className="flex-1 bg-navy text-white hover:bg-navy/90 rounded-xl py-6 font-bold shadow-lg">Save</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LibraryRegulations;
