import { useState, useMemo, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ChevronRight, Search, GraduationCap, Calendar, Users, X,
  Plus, Trash2, Upload, Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Student { id: number; student_name: string; }
interface BatchMeta { id: number; year: string; }
interface Programme {
  id: number;
  programme_code: string;
  label: string;
  short_label: string;
  batches: BatchMeta[];
}

// Animated Counter
const AnimatedCounter = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, value, {
      duration: 1.2, ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [value]);
  return <span>{display}</span>;
};

// Highlighted search text
const Highlight = ({ text, q }: { text: string; q: string }) => {
  if (!q.trim()) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${q})`, "gi"));
  return (
    <span>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase()
          ? <mark key={i} className="bg-gold/30 text-navy font-bold rounded-sm px-0.5">{p}</mark>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
};

// Bulk Import Modal
const BulkImportModal = ({
  batchId, batchYear, onClose, onSuccess
}: { batchId: number; batchYear: string; onClose: () => void; onSuccess: () => void }) => {
  const { token } = useAdmin();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    const names = text.split("\n").map(n => n.trim()).filter(Boolean);
    if (!names.length) { toast.error("Enter at least one name"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/certificate-verification/batch/${batchId}/bulk-import`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ batch_id: batchId, names }),
      });
      if (res.ok) { toast.success(`${names.length} students imported`); onSuccess(); onClose(); }
      else toast.error("Import failed");
    } catch { toast.error("Import failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl font-bold text-navy">Bulk Import – {batchYear}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Paste student names — one per line. This will <strong>replace</strong> all existing students in this batch.</p>
        <textarea
          className="w-full h-64 border rounded-xl p-4 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-gold/40"
          placeholder={"Abhinav Tewari\nAditi Tomar\nAditya Shrivastava\n..."}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex gap-3 mt-4 justify-end">
          <Button variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button onClick={handleImport} disabled={loading}
            className="bg-gold text-navy hover:bg-gold/90 font-bold rounded-xl gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Import
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const CertificateVerification = () => {
  const { isAdminMode, token } = useAdmin();
  const isAdmin = !!token && isAdminMode;

  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [activeProgrammeId, setActiveProgrammeId] = useState<number | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchMeta | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProgrammes, setLoadingProgrammes] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [addingStudent, setAddingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");

  const fetchProgrammes = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/certificate-verification/programmes`);
      const data = await res.json();
      setProgrammes(data);
      if (data.length > 0 && !activeProgrammeId) setActiveProgrammeId(data[0].id);
    } catch { toast.error("Failed to load programmes"); }
    finally { setLoadingProgrammes(false); }
  }, []);

  const fetchStudents = useCallback(async (batchId: number) => {
    setLoadingStudents(true);
    try {
      const res = await fetch(`${API}/api/certificate-verification/batch/${batchId}/students`);
      const data = await res.json();
      setStudents(data);
    } catch { toast.error("Failed to load students"); }
    finally { setLoadingStudents(false); }
  }, []);

  useEffect(() => { fetchProgrammes(); }, [fetchProgrammes]);

  useEffect(() => {
    if (selectedBatch) fetchStudents(selectedBatch.id);
  }, [selectedBatch]);

  const activeProgramme = programmes.find(p => p.id === activeProgrammeId);

  const filteredStudents = useMemo(() => {
    const sorted = [...students].sort((a, b) => a.student_name.localeCompare(b.student_name));
    if (!searchQuery.trim()) return sorted;
    return sorted.filter(s => s.student_name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [students, searchQuery]);

  const handleProgrammeChange = (id: number) => {
    setActiveProgrammeId(id);
    setSelectedBatch(null);
    setStudents([]);
    setSearchQuery("");
  };

  const handleBatchSelect = (batch: BatchMeta) => {
    if (selectedBatch?.id === batch.id) { setSelectedBatch(null); setStudents([]); }
    else { setSelectedBatch(batch); setSearchQuery(""); }
  };

  const handleAddBatch = async () => {
    const year = prompt("Enter batch year (e.g., 2024 or 2023–24)");
    if (!year || !activeProgramme) return;
    try {
      const res = await fetch(`${API}/api/certificate-verification/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ programme_id: activeProgramme.id, batch_year: year, display_order: activeProgramme.batches.length + 1 }),
      });
      if (res.ok) { toast.success("Batch added"); fetchProgrammes(); }
      else toast.error("Failed to add batch");
    } catch { toast.error("Failed to add batch"); }
  };

  const handleDeleteBatch = async (batchId: number) => {
    if (!confirm("Delete this batch and ALL its students?")) return;
    try {
      const res = await fetch(`${API}/api/certificate-verification/batch/${batchId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Batch deleted");
        setSelectedBatch(null); setStudents([]);
        fetchProgrammes();
      } else toast.error("Failed to delete batch");
    } catch { toast.error("Failed to delete batch"); }
  };

  const handleAddStudent = async () => {
    if (!newStudentName.trim() || !selectedBatch) return;
    try {
      const res = await fetch(`${API}/api/certificate-verification/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ batch_id: selectedBatch.id, student_name: newStudentName.trim() }),
      });
      if (res.ok) {
        toast.success("Student added");
        setNewStudentName(""); setAddingStudent(false);
        fetchStudents(selectedBatch.id);
      } else toast.error("Failed to add student");
    } catch { toast.error("Failed to add student"); }
  };

  const handleDeleteStudent = async (studentId: number) => {
    if (!confirm("Delete this student?")) return;
    try {
      const res = await fetch(`${API}/api/certificate-verification/student/${studentId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) { toast.success("Student deleted"); fetchStudents(selectedBatch!.id); }
      else toast.error("Failed to delete student");
    } catch { toast.error("Failed to delete student"); }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Academics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Affairs & Examinations</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider">Certificate Verification</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050853063-bd80e29247f3?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-gold md:text-5xl uppercase tracking-wider">
              Certificate Verification
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" />
          </div>
        </section>

        {/* Programme Tabs */}
        <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container">
            <div className="flex items-center justify-center overflow-x-auto py-2">
              <nav className="flex space-x-2 md:space-x-8">
                {programmes.map((prog) => (
                  <button key={prog.id} onClick={() => handleProgrammeChange(prog.id)}
                    className={cn(
                      "relative px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                      activeProgrammeId === prog.id ? "text-gold" : "text-muted-foreground hover:text-gold/80"
                    )}>
                    {prog.label}
                    {activeProgrammeId === prog.id && (
                      <motion.div layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"
                        initial={false} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Batch Selection */}
        <section className="py-12 bg-secondary/20">
          <div className="container max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl font-bold">Select Batch Year</h2>
              <p className="mt-2 text-muted-foreground italic font-medium">
                Verification lists available for {activeProgramme?.short_label}
              </p>
            </div>

            {loadingProgrammes ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <motion.div key={activeProgrammeId}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {activeProgramme?.batches.map((batch, i) => (
                  <motion.div key={batch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }} className="relative group/batch">
                    <button onClick={() => handleBatchSelect(batch)}
                      className={cn(
                        "w-full flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/40 hover:-translate-y-1",
                        selectedBatch?.id === batch.id ? "border-gold bg-gold/5 ring-1 ring-gold" : "hover:bg-gold/5"
                      )}>
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        selectedBatch?.id === batch.id ? "bg-gold text-navy" : "bg-gold/10 text-gold group-hover/batch:bg-gold group-hover/batch:text-navy"
                      )}>
                        <Calendar className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-lg">{batch.year}</span>
                    </button>
                    {isAdmin && (
                      <button onClick={() => handleDeleteBatch(batch.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover/batch:opacity-100 transition-opacity hover:bg-red-600">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </motion.div>
                ))}

                {isAdmin && (
                  <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    onClick={handleAddBatch}
                    className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-gold/30 bg-gold/5 p-6 hover:border-gold hover:bg-gold/10 transition-all duration-300 text-gold">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                      <Plus className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-sm">Add Batch</span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Student List */}
        <AnimatePresence mode="wait">
          {selectedBatch && (
            <motion.section key={`${activeProgrammeId}-${selectedBatch.id}`}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="py-16 overflow-hidden">
              <div className="container max-w-6xl">
                <div className="rounded-3xl border bg-card p-8 shadow-lg relative">
                  <button onClick={() => { setSelectedBatch(null); setStudents([]); }}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b pb-8">
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-foreground">
                        {activeProgramme?.label} – {selectedBatch.year} Batch
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Users className="h-4 w-4 text-gold" />
                          Total: <span className="text-foreground ml-1"><AnimatedCounter value={students.length} /></span>
                        </span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="font-bold text-gold uppercase tracking-widest text-[10px]">Verification Official List</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Button onClick={() => setAddingStudent(true)} size="sm"
                            className="bg-gold text-navy hover:bg-gold/90 font-bold rounded-xl gap-1">
                            <Plus className="h-4 w-4" /> Add Student
                          </Button>
                          <Button onClick={() => setShowBulkImport(true)} size="sm" variant="outline"
                            className="border-gold text-gold hover:bg-gold hover:text-navy font-bold rounded-xl gap-1">
                            <Upload className="h-4 w-4" /> Bulk Import
                          </Button>
                        </div>
                      )}
                      <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search student..."
                          className="pl-10 h-10 rounded-xl bg-secondary/50 border-transparent focus:border-gold/50 font-medium"
                          value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Add single student inline */}
                  <AnimatePresence>
                    {addingStudent && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-3 mb-8 p-4 bg-gold/5 rounded-2xl border border-gold/20">
                        <Input placeholder="Student full name..." value={newStudentName}
                          onChange={e => setNewStudentName(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && handleAddStudent()}
                          className="rounded-xl border-gold/30 focus:border-gold font-medium" autoFocus />
                        <Button onClick={handleAddStudent}
                          className="bg-gold text-navy hover:bg-gold/90 font-bold rounded-xl shrink-0">Add</Button>
                        <Button variant="outline" onClick={() => { setAddingStudent(false); setNewStudentName(""); }}
                          className="rounded-xl shrink-0">Cancel</Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {loadingStudents ? (
                    <div className="flex justify-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-gold" />
                    </div>
                  ) : filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                      {filteredStudents.map((student, idx) => (
                        <motion.div key={student.id}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.01 }}
                          className="py-2.5 px-4 rounded-xl hover:bg-gold/5 transition-all group/row flex items-center gap-3 border border-transparent hover:border-gold/10">
                          <div className="h-1.5 w-1.5 rounded-full bg-gold/30 group-hover/row:bg-gold transition-colors shrink-0" />
                          <span className="text-foreground font-medium group-hover/row:text-gold transition-colors text-[15px] flex-1">
                            <Highlight text={student.student_name} q={searchQuery} />
                          </span>
                          {isAdmin && (
                            <button onClick={() => handleDeleteStudent(student.id)}
                              className="opacity-0 group-hover/row:opacity-100 transition-opacity text-red-400 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed">
                      <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">No results found</h4>
                      <p className="text-muted-foreground mb-6">
                        No students matching "<span className="font-bold text-gold">{searchQuery}</span>"
                      </p>
                      <Button variant="outline" onClick={() => setSearchQuery("")}
                        className="rounded-xl border-gold text-gold hover:bg-gold hover:text-navy font-bold px-8">
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {!selectedBatch && !loadingProgrammes && (
          <div className="container py-24 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="max-w-md mx-auto space-y-4">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-muted-foreground">Select a batch year above to view the student verification list.</h3>
              <p className="text-sm text-muted-foreground">Detailed student records for graduation and certificate verification purposes.</p>
            </motion.div>
          </div>
        )}
      </main>

      {showBulkImport && selectedBatch && (
        <BulkImportModal
          batchId={selectedBatch.id}
          batchYear={selectedBatch.year}
          onClose={() => setShowBulkImport(false)}
          onSuccess={() => fetchStudents(selectedBatch.id)}
        />
      )}

      <Footer />
    </div>
  );
};

export default CertificateVerification;
