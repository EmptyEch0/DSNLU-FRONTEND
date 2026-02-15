import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { Book, Globe, Database, BookOpen, ExternalLink, Scale, FileText, Newspaper, BookMarked, Hash, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const LibraryResources = () => {
  const [activeResTab, setActiveResTab] = useState("print");

  const resourceTabs = [
    { id: "print", label: "Print Resources", icon: Book },
    { id: "journals", label: "E-Journals", icon: Globe },
    { id: "books", label: "E-Books", icon: BookOpen },
    { id: "databases", label: "E-Databases", icon: Database },
  ];

  const scrollToSection = (id: string) => {
    setActiveResTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 220; // Header + Subnav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const printResources = [
    { title: "Primary Sources of Law", icon: Scale, description: "Authoritative publications like Legislation and Judgements." },
    { title: "Secondary Sources", icon: BookOpen, description: "Commentaries and analysis of legal provisions." },
    { title: "Commentaries", icon: FileText, description: "Detailed legal analysis and academic reviews." },
    { title: "Textbooks & Treaties", icon: Book, description: "Comprehensive books on specific legal subjects." },
    { title: "Law Reports", icon: Newspaper, description: "SCC, AIR, and other judicial reports." },
    { title: "Legal Dictionaries", icon: Languages, description: "Definitions of legal terminology (e.g., Black's)." },
    { title: "Digests", icon: Hash, description: "Summarized case law and statutory summaries." },
  ];

  const eJournals = [
    { name: "Cambridge Law Journal", url: "https://www.cambridge.org/core/journals/cambridge-law-journal", image: "https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=400" },
    { name: "Economic and Political Weekly (EPW)", url: "https://www.epw.in/", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400" },
    { name: "ICSID Review", url: "https://academic.oup.com/icsidreview", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400" },
  ];

  const eBooks = [
    { name: "Cambridge Core", url: "https://www.cambridge.org/core", icon: BookMarked },
    { name: "EBC Reader", url: "https://www.ebcreader.in/", icon: BookOpen },
    { name: "LexisNexis Store", url: "https://www.lexisnexis.in/", icon: Database },
  ];

  const databases = [
    { name: "Jus Mundi", desc: "Search engine for international law and arbitration.", url: "https://jusmundi.com/", logo: "J" },
    { name: "HeinOnline", desc: "Premium online legal database with over 200 million pages.", url: "https://heinonline.org/", logo: "H" },
    { name: "Bar & Bench", desc: "The premier news and analysis portal for the legal community.", url: "https://www.barandbench.com/", logo: "B" },
    { name: "LiveLaw", desc: "Comprehensive legal news reporting and case analysis.", url: "https://www.livelaw.in/", logo: "L" },
    { name: "LexisNexis", desc: "World-leading provider of legal and regulatory intelligence.", url: "https://www.lexisnexis.com/", logo: "LN" },
    { name: "OPIL", desc: "Oxford Public International Law resource portal.", url: "https://opil.ouplaw.com/", logo: "O" },
    { name: "Westlaw Asia", desc: "Extensive legal research platform for Asian jurisdictions.", url: "https://asia.thomsonreuters.com/en/legal/westlaw.html", logo: "W" },
    { name: "Taxmann", desc: "The most trusted source of information on Indian laws.", url: "https://www.taxmann.com/", logo: "T" },
    { name: "SCC Online", desc: "India's premier legal research database.", url: "https://www.scconline.com/", logo: "S" },
    { name: "Manupatra", desc: "India's leading law search and analytics platform.", url: "https://www.manupatrafast.com/", logo: "M" },
    { name: "JSTOR", desc: "Digital library of academic journals, books, and primary sources.", url: "https://www.jstor.org/", logo: "JS" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />

        {/* Resources Sub-Navigation (Tertiary) */}
        <div className="sticky top-[172px] z-[39] bg-white border-b shadow-sm">
          <div className="container overflow-x-auto no-scrollbar">
            <div className="flex justify-center min-w-max gap-8 py-4">
              {resourceTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`group relative flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeResTab === tab.id ? "text-blue-600" : "text-navy/60 hover:text-blue-600"
                  }`}
                >
                  <tab.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${activeResTab === tab.id ? "text-blue-600" : "text-navy/20 group-hover:text-blue-600"}`} />
                  {tab.label}
                  {activeResTab === tab.id && (
                    <motion.div
                      layoutId="resourceTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Print Resources */}
        <section id="print" className="py-24 bg-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="font-serif text-3xl font-bold text-navy mb-6">Print Resources</h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed">
                The library houses a comprehensive collection of printed legal materials, serving as the cornerstone for deep legal research and academic exploration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {printResources.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ rotate: 2, scale: 1.03 }}
                  className="group relative bg-card p-8 rounded-[2rem] border shadow-elegant hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <item.icon className="h-20 w-20" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-6 p-4 bg-gold/10 rounded-2xl w-fit group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-500">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: E-Journals */}
        <section id="journals" className="py-24 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="font-serif text-3xl font-bold text-navy mb-6">E-Journals</h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full mb-8" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {eJournals.map((journal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                  className="group bg-card rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img src={journal.image} alt={journal.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-bold text-sm uppercase tracking-widest">Visit Publication</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-navy mb-6 flex-1">{journal.name}</h3>
                    <a 
                      href={journal.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gold hover:text-navy transition-all duration-300"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: E-Books */}
        <section id="books" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-navy opacity-50" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">E-Books</h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full mb-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {eBooks.map((book, idx) => (
                <motion.a
                  key={idx}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -10, boxShadow: "0 0 30px rgba(212,175,55,0.3)", borderColor: "rgba(212,175,55,1)" }}
                  className="group flex flex-col items-center p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 transition-all duration-500"
                >
                  <div className="mb-8 p-6 bg-gold/10 rounded-full group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                    <book.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{book.name}</h3>
                  <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Access Platform</div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Databases */}
        <section id="databases" className="py-24 bg-secondary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto mb-20 text-center">
              <h2 className="font-serif text-3xl font-bold text-navy mb-6">Online Databases</h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full mb-8" />
              <p className="text-muted-foreground text-lg">Access world-class legal research platforms anywhere, anytime.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {databases.map((db, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5, rotate: 1 }}
                  className="bg-card p-1 border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group min-h-[320px]"
                >
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-navy text-gold rounded-2xl flex items-center justify-center font-serif text-2xl font-black group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-lg">
                        {db.logo}
                      </div>
                      <h3 className="text-2xl font-black text-navy tracking-tight">{db.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{db.desc}</p>
                    <a 
                      href={db.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#f5f5f7] text-[#1d1d1f] rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-gold hover:text-navy"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Access Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default LibraryResources;
