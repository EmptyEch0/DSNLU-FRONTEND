import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Search, GraduationCap, Calendar, Users, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { certificateVerificationData, Programme, Batch } from "@/data/certificateVerificationData";



// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}</span>;
};

// Search Text Highlighter Component
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-gold/30 text-navy font-bold rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const CertificateVerification = () => {
  const [activeProgrammeId, setActiveProgrammeId] = useState<string>(certificateVerificationData[0].id);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeProgramme = useMemo(() => 
    certificateVerificationData.find(p => p.id === activeProgrammeId) || certificateVerificationData[0],
  [activeProgrammeId]);

  // Sort and filter students
  const filteredStudents = useMemo(() => {
    if (!selectedBatch) return [];
    
    // Auto sort A-Z
    const sorted = [...selectedBatch.students].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    if (!searchQuery.trim()) return sorted;

    return sorted.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedBatch, searchQuery]);

  const handleProgrammeChange = (id: string) => {
    setActiveProgrammeId(id);
    setSelectedBatch(null);
    setSearchQuery("");
  };

  const handleBatchSelect = (batch: Batch) => {
    if (selectedBatch?.year === batch.year) {
      setSelectedBatch(null);
    } else {
      setSelectedBatch(batch);
      setSearchQuery("");
    }
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
            <span className="text-foreground">Academics</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Affairs & Examinations</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider">Certificate Verification</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050853063-bd80e29247f3?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-[#d4a017] md:text-4xl lg:text-5xl uppercase tracking-wider"
            >
              Certificate Verification
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Tabs - Programme Selection */}
        <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container">
            <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-2">
              <nav className="flex space-x-2 md:space-x-8">
                {certificateVerificationData.map((programme) => (
                  <button
                    key={programme.id}
                    onClick={() => handleProgrammeChange(programme.id)}
                    className={cn(
                      "relative px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                      activeProgrammeId === programme.id 
                        ? "text-gold" 
                        : "text-muted-foreground hover:text-gold/80"
                    )}
                  >
                    {programme.label}
                    {activeProgrammeId === programme.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Year Selection Section */}
        <section className="py-12 bg-secondary/20">
          <div className="container max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">Select Batch Year</h2>
              <p className="mt-2 text-muted-foreground italic font-medium">Verification lists available for {activeProgramme.shortLabel}</p>
            </div>

            <motion.div 
              key={activeProgrammeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
              {activeProgramme.batches.map((batch, index) => (
                <motion.button
                  key={batch.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleBatchSelect(batch)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/40 hover:-translate-y-1",
                    selectedBatch?.year === batch.year ? "border-gold bg-gold/5 ring-1 ring-gold" : "hover:bg-gold/5"
                  )}
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    selectedBatch?.year === batch.year ? "bg-gold text-navy" : "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy"
                  )}>
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-lg">{batch.year}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Student List Display Section */}
        <AnimatePresence mode="wait">
          {selectedBatch && (
            <motion.section 
              key={`${activeProgrammeId}-${selectedBatch.year}`}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="py-16 overflow-hidden"
            >
              <div className="container max-w-6xl">
                <div className="rounded-3xl border bg-card p-8 shadow-elegant relative">
                  <button 
                    onClick={() => setSelectedBatch(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b pb-8">
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-foreground">
                        {activeProgramme.label} – {selectedBatch.year} Batch
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Users className="h-4 w-4 text-gold" /> 
                          Total Students: <span className="text-foreground"><AnimatedCounter value={selectedBatch.students.length} /></span>
                        </span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="font-bold text-gold uppercase tracking-widest text-[10px]">Verification Official list</span>
                      </div>
                    </div>

                    <div className="relative w-full max-w-md">
                      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search Student Name..."
                        className="pl-10 h-12 rounded-xl bg-secondary/50 border-transparent focus:border-gold/50 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                      {filteredStudents.map((student, idx) => (
                        <motion.div
                          key={student.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.01 }}
                          className="py-2.5 px-4 rounded-xl hover:bg-gold/5 transition-all duration-300 group flex items-center gap-3 border border-transparent hover:border-gold/10"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                          <span className="text-foreground font-medium group-hover:text-gold transition-colors text-[15px]">
                            <HighlightedText text={student.name} highlight={searchQuery} />
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 bg-secondary/10 rounded-3xl border-2 border-dashed border-border/50">
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <Search className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">No results found</h4>
                      <p className="text-muted-foreground max-w-xs mx-auto mb-6">We couldn't find any students matching "<span className="font-bold text-gold">{searchQuery}</span>" in this batch.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                        className="rounded-xl border-gold text-gold hover:bg-gold hover:text-navy font-bold px-8"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {!selectedBatch && (
          <div className="container py-24 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto space-y-4"
            >
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground">
                  <GraduationCap className="h-10 w-10 opacity-50" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-muted-foreground">Select a batch year above to view the student verification list.</h3>
              <p className="text-sm text-muted-foreground">Detailed student records for graduation and certificate verification purposes.</p>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CertificateVerification;
