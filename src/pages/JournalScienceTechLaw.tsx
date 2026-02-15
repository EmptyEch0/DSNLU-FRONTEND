import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  FileText, 
  Info, 
  Users, 
  BookOpen, 
  Archive, 
  Download, 
  ExternalLink,
  Mail,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const tabs = [
  { id: "about", label: "ABOUT THE JOURNAL", icon: Info },
  { id: "guidelines", label: "SUBMISSION GUIDELINES", icon: FileText },
  { id: "board", label: "EDITORIAL BOARD & ADVISORY BOARD", icon: Users },
  { id: "current", label: "CURRENT ISSUES", icon: BookOpen },
  { id: "archives", label: "ARCHIVES", icon: Archive },
];

export const JournalScienceTechLaw = () => {
  const [activeTab, setActiveTab] = useState("about");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-[#f8f9fa]">
          <div className="container flex items-center gap-2 py-4 text-[11px] text-gray-500 font-sans tracking-tight">
            <Link to="/" className="transition-colors hover:text-[#0f2d5c] uppercase font-bold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase font-bold">Publications</span>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase font-bold">Journals</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold uppercase font-bold">Journal of Science, Technology & Law</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d5c] via-[#1a3d7c] to-[#0f2d5c] opacity-90" />
          <div 
            className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"
            aria-hidden="true"
          />
          
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              DSNLU JOURNAL OF SCIENCE, TECHNOLOGY & LAW
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto h-1 w-32 rounded-full bg-[#c9a227] shadow-lg" 
            />
          </div>
        </section>

        {/* Sub-Navigation */}
        <div className="sticky top-[72px] md:top-[100px] z-[40] border-b bg-white shadow-sm">
          <div className="container">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar scroll-smooth">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group relative flex items-center gap-2.5 px-6 py-5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                    activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-500 hover:text-[#0f2d5c]"
                  )}
                >
                  <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-[#0f2d5c]" : "text-gray-400 group-hover:text-[#0f2d5c]")} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="journalTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c9a227]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-16 lg:py-24">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.section key="about" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">ABOUT THE JOURNAL</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                    <p>
                      The DSNLU Journal of Science, Technology & Law published by the Centre for Intellectual Property Rights and Technology, bearing ISSN No- 2583-1208, is a peer-reviewed, double-blind, and open-access journal. It allows papers discussing seminal themes of IP & Technology aspects of contemporary relevance.
                    </p>
                    <p>
                      The issues explore a wide spectrum of thoughts and through its varied articulations attempt to open up dialogues in diverse domains of application of intellectual property laws and Technology.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-[#0f2d5c]/5 flex items-center justify-center text-[#0f2d5c]">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f2d5c] text-lg">Faculty Convenor</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-serif text-xl font-bold">Dr. Dayananda Murthy C.P</p>
                      <a href="mailto:dmurthy@dsnlu.ac.in" className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors text-sm">
                        <Mail className="h-4 w-4" /> dmurthy@dsnlu.ac.in
                      </a>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-[#0f2d5c]/5 flex items-center justify-center text-[#0f2d5c]">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f2d5c] text-lg">Student Convenors</h3>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-serif font-bold">Ms. Jotsna Chalamcharla</p>
                        <a href="mailto:jssjotsnachalamcharla@dsnlu.ac.in" className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors text-xs">
                          <Mail className="h-3 w-3" /> jssjotsnachalamcharla@dsnlu.ac.in
                        </a>
                      </div>
                      <div>
                        <p className="font-serif font-bold">Ms. Ch. L. Satya Divya Sri</p>
                        <a href="mailto:divyasrichandakanna@dsnlu.ac.in" className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors text-xs">
                          <Mail className="h-3 w-3" /> divyasrichandakanna@dsnlu.ac.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-[#0f2d5c]/5 flex items-center justify-center text-[#0f2d5c]">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f2d5c] text-lg">Student Co-Convenor</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-serif text-xl font-bold">Ms. Samskruthi Kurra Yadav</p>
                      <a href="mailto:kurrasamskruthi@dsnlu.ac.in" className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors text-sm">
                        <Mail className="h-4 w-4" /> kurrasamskruthi@dsnlu.ac.in
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === "guidelines" && (
              <motion.section key="guidelines" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">SUBMISSION GUIDELINES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Eligibility</h3>
                    <p className="text-gray-700 leading-relaxed">Accepting original and unpublished submissions from academicians, professionals, research scholars and students.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Theme</h3>
                    <p className="text-gray-700 leading-relaxed">High quality articles pertaining to Intellectual Property Law & Technology Law.</p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Submission Requirements</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Cover letter in separate document with author details",
                        "Maximum two authors",
                        "Manuscript without author identity",
                        "Abstract under 300 words (first page)",
                        "Similarity below 10%",
                        "MS Word (.doc) submission",
                        "Deadline: 31st May, 2023 – 11:59 PM",
                        "Review period: minimum 12 weeks",
                        "Decision after completion of review"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#c9a227] mt-[6px] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Formatting Guidelines</h3>
                    <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100">
                      <ul className="space-y-4 text-sm text-gray-700">
                        <li className="flex justify-between border-b border-gray-100 pb-2"><span>Body Text</span> <span>Times New Roman, Size 12, 1.5 spacing</span></li>
                        <li className="flex justify-between border-b border-gray-100 pb-2"><span>Title</span> <span>Size 14, Bold</span></li>
                        <li className="flex justify-between border-b border-gray-100 pb-2"><span>Headings</span> <span>Roman numeral main headings</span></li>
                        <li className="flex justify-between border-b border-gray-100 pb-2"><span>Citation Style</span> <span>Harvard Bluebook (21st edition)</span></li>
                        <li className="flex justify-between border-b border-gray-100 pb-2"><span>Footnotes</span> <span>Size 10</span></li>
                        <li className="pt-2 italic text-red-600">Strict adherence mandatory</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Word Limits</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                        <p className="text-[#0f2d5c] font-bold text-lg">5000–8000</p>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Long Articles</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                        <p className="text-[#0f2d5c] font-bold text-lg">3000–5000</p>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Short Articles</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                        <p className="text-[#0f2d5c] font-bold text-lg">2000–3000</p>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Legislative Comment</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <Button variant="outline" className="border-[#0f2d5c] text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white" asChild>
                      <a href="mailto:ipr@dsnlu.ac.in"><Mail className="mr-2 h-4 w-4" /> Contact ipr@dsnlu.ac.in</a>
                    </Button>
                    <Button className="bg-[#c9a227] text-white hover:bg-[#b08d20]" asChild>
                      <a href="https://dsnlu.ac.in/dsnlu-journal-of-science-technology-and-law/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Previous Issues Link
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === "board" && (activeTab === "board") && (
              <motion.section key="board" {...fadeIn} className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">EDITORIAL BOARD & ADVISORY BOARD</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-[#c9a227] uppercase tracking-[0.2em] text-xs">Honorary Editor</h3>
                      <div>
                        <p className="font-serif text-2xl font-bold text-[#0f2d5c]">Prof. (Dr.) D. Surya Prakasa Rao</p>
                        <p className="text-gray-600">Vice-Chancellor, DSNLU</p>
                        <a href="mailto:vc@dsnlu.ac.in" className="text-sm text-gray-400 hover:text-[#c9a227]">vc@dsnlu.ac.in</a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-[#c9a227] uppercase tracking-[0.2em] text-xs">Chief Editor</h3>
                      <div>
                        <p className="font-serif text-2xl font-bold text-[#0f2d5c]">Dr. Dayananda Murthy C.P</p>
                        <p className="text-gray-600 font-medium">Associate Professor, Chair Person, CIPR & T</p>
                        <a href="mailto:dmurthy@dsnlu.ac.in" className="text-sm text-gray-400 hover:text-[#c9a227]">dmurthy@dsnlu.ac.in</a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                     <div className="space-y-6">
                        <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Advisory Board</h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                          {[
                            "Prof. (Dr.) R. Venkata Rao - Former Vice-Chancellor, NLSIU, Bangalore",
                            "Prof. (Dr.) V. Vijayakumar - Vice-Chancellor, NLIU, Bhopal",
                            "Prof. (Dr.) T. Ramakrishna - Chair Professor, IPR, NLSIU, Bangalore",
                            "Prof. (Dr.) G.B. Reddy - Professor of Law, Osmania University",
                            "Prof. (Dr.) V.K. Ahuja - Professor, Faculty of Law, University of Delhi"
                          ].map((name, i) => (
                            <li key={i} className="pb-2 border-b border-gray-50 flex items-start gap-2">
                               <div className="h-1 w-1 bg-[#c9a227] mt-2 rounded-full" />
                               {name}
                            </li>
                          ))}
                        </ul>
                     </div>

                     <div className="space-y-6">
                        <h3 className="font-bold text-[#0f2d5c] uppercase tracking-wider text-sm border-l-4 border-[#c9a227] pl-4">Editorial Board</h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                          {[
                            "Dr. P. Sri Devi - Associate Professor, DSNLU",
                            "Dr. S. Sumitranath - Assistant Professor, DSNLU",
                            "Dr. B. Nilima - Assistant Professor, DSNLU",
                            "Dr. Poosarla Bayola Kiran - Assistant Professor, DSNLU",
                            "Dr. B. Ramesh Kumar - Assistant Professor, DSNLU"
                          ].map((name, i) => (
                            <li key={i} className="pb-2 border-b border-gray-50 flex items-start gap-2">
                               <div className="h-1 w-1 bg-[#c9a227] mt-2 rounded-full" />
                               {name}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === "current" && (
              <motion.section key="current" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">CURRENT ISSUES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-[#0f2d5c]/5 rounded-xl border-2 border-white flex items-center justify-center p-6 text-[#0f2d5c]/20">
                    <BookOpen className="h-24 w-24" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                       <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">DSNLU Journal of Science, Technology & Law</h3>
                       <p className="text-gold font-bold uppercase tracking-widest text-sm">DJSTL_Vol. 3_Issue 2</p>
                    </div>
                    <p className="text-gray-500 leading-relaxed italic">
                      Explore the latest issue featuring seminal research on IP and Technology Law.
                    </p>
                    <Button className="w-full md:w-auto bg-[#0f2d5c] text-white hover:bg-[#1a3d7c] border border-[#c9a227] h-12 px-10 transition-transform active:scale-95" asChild>
                      <a href="https://dsnlu.ac.in/storage/2024/11/DJSTL_Vol-3_-issue-_2-1-2.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-5 w-5" /> VIEW FILE
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === "archives" && (
              <motion.section key="archives" {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase">ARCHIVES</h2>
                  <div className="h-1 w-16 bg-[#c9a227]" />
                </div>

                <div className="grid gap-6">
                  {[
                    { title: "Vol. 2 Issue 1 (2022)", url: "https://dsnlu.ac.in/storage/2023/03/DJSTL_Vol.-2_Issue-1-2022.pdf" },
                    { title: "Vol. 1 Issue 1 (2021)", url: "https://dsnlu.ac.in/storage/2023/03/DJSTL_Vol.-1_Issue-1-2021.pdf" }
                  ].map((issue, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#0f2d5c]/5 flex items-center justify-center text-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-white transition-colors">
                          <Archive className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-[#0f2d5c]">{issue.title}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#0f2d5c] hover:text-[#c9a227] hover:bg-transparent font-bold uppercase tracking-widest text-[10px]" asChild>
                        <a href={issue.url} target="_blank" rel="noopener noreferrer">
                           VIEW FILE <ChevronRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JournalScienceTechLaw;
