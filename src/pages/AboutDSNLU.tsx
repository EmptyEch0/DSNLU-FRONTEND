import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Play, Download, ExternalLink, FileText, Eye, Target, Award, Building2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LeadershipSection } from "@/components/sections/LeadershipSection";

const tabs = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "vision", label: "Vision", icon: Eye },
  { id: "objectives", label: "Objectives", icon: Target },
  { id: "logo-motto", label: "Logo & Motto", icon: Award },
  { id: "dsnlu-act", label: "DSNLU Act", icon: Scale },
  { id: "service-regulations", label: "Service Regulations", icon: FileText },
];

const AboutDSNLU = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "overview");

  useEffect(() => {
    if (tabParam && tabs.find(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
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
            <span className="text-foreground">About DSNLU</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold capitalize">{activeTab.replace("-", " ")}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Institutional Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              About DSNLU
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-[72px] z-40 border-b bg-background/80 backdrop-blur-md">
          <div className="container">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-6 py-5 text-sm font-medium transition-colors hover:text-gold whitespace-nowrap",
                    activeTab === tab.id ? "text-gold" : "text-muted-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  <div className="prose prose-lg max-w-none">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                      ABOUT DAMODARAM SANJIVAYYA NATIONAL LAW UNIVERSITY (DSNLU)
                    </h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                      <p>
                        Damodaram Sanjivayya National Law University (DSNLU) was established in 2008 by the Government of Andhra Pradesh. Named after the illustrious Shri Damodaram Sanjivayya, former Chief Minister of Andhra Pradesh and Union Minister, the university embodies his vision of social justice and legal empowerment.
                      </p>
                      <p>
                        Born on February 14, 1921, Shri Damodaram Sanjivayya was a man of exceptional character and brilliance. He rose from humble beginnings to become the second Chief Minister of Andhra Pradesh and the first Dalit Chief Minister of any Indian state. His tenure was marked by administrative reform, social justice, and an unwavering commitment to the upliftment of the underprivileged.
                      </p>
                      <p>
                        Located in the picturesque city of Visakhapatnam, DSNLU is committed to excellence in legal education, research, and public service. The university offers a holistic learning environment that prepares students for distinguished careers in law and justice, ensuring they become ethical professionals and responsible citizens.
                      </p>
                    </div>
                  </div>

                  {/* YouTube Preview Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-elegant transition-all hover:shadow-gold-glow cursor-pointer"
                    onClick={() => window.open("https://youtu.be/h7zG5DbABzA?si=XnJ3oc0s-CMpWmm5", "_blank")}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src="https://img.youtube.com/vi/h7zG5DbABzA/maxresdefault.jpg" 
                        alt="DSNLU Campus Video"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">Experience DSNLU Campus Life</h3>
                      <p className="text-muted-foreground">Take a virtual tour of our state-of-the-art facilities and vibrant university atmosphere.</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="grid gap-12">
                    <div className="relative border-l-4 border-gold pl-8 py-2">
                       <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Vision & Mission</h2>
                       <div className="space-y-8">
                         <section>
                           <h3 className="text-xl font-bold text-gold mb-4 uppercase tracking-wider">Vision</h3>
                           <p className="text-lg leading-relaxed text-muted-foreground">
                             To be a globally recognized institution for legal education and research, known for its academic excellence, innovative teaching, and the development of skilled and ethical legal professionals who significantly contribute to society and the rule of law.
                           </p>
                         </section>
                         <section>
                           <h3 className="text-xl font-bold text-gold mb-4 uppercase tracking-wider">Mission</h3>
                           <p className="text-lg leading-relaxed text-muted-foreground">
                             To impart comprehensive legal education at all levels to achieve excellence and to organize advanced studies and promote research in all branches of Law. The University strives to instill a sense of responsibility among students and researchers to serve society in the field of law by developing skills in regard to advocacy, legal services, and reforms.
                           </p>
                         </section>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "objectives" && (
                <motion.div
                  key="objectives"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">University Objectives</h2>
                  <div className="grid gap-4">
                    {[
                      "Provide quality multi-disciplinary legal education considering global demands.",
                      "Evolve and impart comprehensive legal education at all levels to achieve excellence.",
                      "Organize advanced studies and promote research across all branches of Law.",
                      "Conduct seminars, workshops, and conferences to disseminate legal knowledge.",
                      "Promote cultural, legal, and ethical values to foster the rule of law.",
                      "Enhance the ability to analyze legal implications of current public concerns.",
                      "Publish legal literature including periodicals, treatises, and journals.",
                      "Promote legal awareness for social and economic justice.",
                      "Foster interdisciplinary study of Law in relation to management and technology.",
                      "Instill responsibility to serve society through advocacy and law reforms."
                    ].map((obj, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:border-gold/30 hover:shadow-md"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                          <div className="h-2 w-2 rounded-full bg-gold" />
                        </div>
                        <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {obj}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "logo-motto" && (
                <motion.div
                  key="logo-motto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center text-center space-y-12"
                >
                  <div className="space-y-6">
                    <h2 className="font-serif text-4xl font-bold text-foreground uppercase tracking-widest">
                      YATO DHARMAS TATO JAYAH
                    </h2>
                    <p className="text-xl italic text-gold font-medium">
                      "Where there is Dharma, there is Victory"
                    </p>
                  </div>

                  <div className="grid gap-12 lg:grid-cols-2 lg:items-center text-left">
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        The motto of Damodaram Sanjivayya National Law University is derived from the Mahabharata, encapsulating the core essence of justice and righteousness. 
                      </p>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        The University's logo features the "Poorna Kumbha" (sacred pitcher), symbolizing abundance, purity, and an openness to new thoughts and ideas. It represents the holistic development of the human mind and the university's commitment to nurturing legal minds that are grounded in ethics and dedicated to the service of the nation.
                      </p>
                    </div>
                    <div className="flex justify-center flex-col items-center">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-2xl bg-white p-8 shadow-elegant border border-gold/10"
                      >
                        <img 
                          src="https://dsnlu.ac.in/storage/2022/12/DSNLU_Logo-1-300x291-1.png" 
                          alt="DSNLU Logo"
                          className="h-64 w-64 object-contain"
                        />
                      </motion.div>
                      <p className="mt-4 text-sm text-muted-foreground">Official University Seal</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "dsnlu-act" && (
                <motion.div
                  key="dsnlu-act"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="prose prose-lg max-w-none">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-6">The DSNLU Act</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Damodaram Sanjivayya National Law University was established under the Damodaram Sanjivayya National Law University Act, 2008 (Act No. 32 of 2008), passed by the Andhra Pradesh Legislative Assembly. The Act provides the legislative framework for the university's operations, governance, and academic autonomy.
                    </p>
                  </div>

                  {/* PDF Viewer Section */}
                  <div className="rounded-2xl border bg-card overflow-hidden shadow-elegant">
                    <div className="flex items-center justify-between border-b bg-muted/50 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">DSNLU Act Document</h4>
                          <p className="text-xs text-muted-foreground">Official PDF Publication</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-navy">
                          <a href="https://dsnlu.ac.in/storage/2023/02/DSNLU-Act.pdf" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Open
                          </a>
                        </Button>
                        <Button asChild size="sm" className="bg-gold text-navy hover:bg-gold-dark">
                          <a href="https://dsnlu.ac.in/storage/2023/02/DSNLU-Act.pdf" download>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-[4/5] w-full bg-muted/20">
                      <iframe 
                        src="https://dsnlu.ac.in/storage/2023/02/DSNLU-Act.pdf#toolbar=0" 
                        className="h-full w-full border-none"
                        title="DSNLU Act PDF"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "service-regulations" && (
                <motion.div
                  key="service-regulations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="prose prose-lg max-w-none">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Service Regulations</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      This section contains the DSNLU Service Regulations document for staff and governance. These regulations outline the framework for professional conduct, administrative procedures, and institutional governance at Damodaram Sanjivayya National Law University.
                    </p>
                  </div>

                  {/* PDF Viewer Section */}
                  <div className="rounded-2xl border bg-card overflow-hidden shadow-elegant">
                    <div className="flex items-center justify-between border-b bg-muted/50 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Service Regulations Document</h4>
                          <p className="text-xs text-muted-foreground">Official PDF Publication</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-navy">
                          <a href="https://dsnlu.ac.in/storage/2024/07/DSNLU-SERVICE-REGULATIONS-1.pdf" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Open
                          </a>
                        </Button>
                        <Button asChild size="sm" className="bg-gold text-navy hover:bg-gold-dark">
                          <a href="https://dsnlu.ac.in/storage/2024/07/DSNLU-SERVICE-REGULATIONS-1.pdf" download>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-[4/5] w-full bg-muted/20">
                      <iframe 
                        src="https://dsnlu.ac.in/storage/2024/07/DSNLU-SERVICE-REGULATIONS-1.pdf#toolbar=0" 
                        className="h-full w-full border-none"
                        title="DSNLU Service Regulations PDF"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Leadership & Governance Section */}
        <section id="leadership-governance">
          <LeadershipSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutDSNLU;
