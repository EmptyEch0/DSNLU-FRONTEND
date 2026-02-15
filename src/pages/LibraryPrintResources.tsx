import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { 
  BookCopy, 
  Scale, 
  FileText, 
  Gavel, 
  Book,
  Search,
  BookOpen,
  Newspaper,
  BookMarked,
  Languages,
  Hash,
  Globe
} from "lucide-react";

const LibraryPrintResources = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="print" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {/* Introduction */}
              <div className="space-y-6">
                <h2 className="font-serif text-4xl font-bold text-navy">Print Resources</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Damodaram Sanjivayya National Law University Library has a vast collection of print resources categorized into Primary and Secondary sources of law.
                </p>
              </div>

              {/* Primary Sources */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    <Scale className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Primary Sources of Law</h3>
                </div>
                <p className="text-lg text-muted-foreground">Authoritative publications produced by law-making bodies:</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Legislation", icon: FileText },
                    { title: "Judgements", icon: Gavel },
                    { title: "Government Reports", icon: BookCopy },
                    { title: "Law Reports", icon: Newspaper }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-2xl border border-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <item.icon className="h-10 w-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-navy text-lg">{item.title}</h4>
                    </div>
                  ))}
                </div>

                <div className="bg-navy text-white p-10 lg:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BookMarked className="h-32 w-32" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-400 mb-8 uppercase tracking-widest">Key Law Reports</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      "Supreme Court Reports",
                      "All India Reporter",
                      "Supreme Court Cases",
                      "All England Law Reports",
                      "Commonwealth Reports",
                      "U.S. Supreme Court Reports"
                    ].map((report, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/10">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                        <span className="font-bold text-sm tracking-tight">{report}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-navy/10" />

              {/* Secondary Sources */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Secondary Sources of Law</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Secondary sources provide commentary and help locate binding or persuasive authorities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Commentaries", icon: FileText, desc: "Detailed analysis of legal provisions." },
                    { title: "Textbooks & Treaties", icon: Book, desc: "Academic depth on specific legal subjects." },
                    { title: "Legal Periodicals", icon: Newspaper, desc: "Journals and reviews on current legal thought." },
                    { title: "Legal Encyclopedias", icon: Globe, desc: "Comprehensive legal overviews." },
                    { title: "Digests & Abridgements", icon: Hash, desc: "Summarized case law and statutes." },
                    { title: "Legal Dictionaries", icon: Languages, desc: "Definitions of legal terminology." }
                  ].map((cat, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-navy/5 shadow-sm hover:shadow-lg transition-all border-l-4 border-l-blue-600">
                      <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                        <cat.icon className="h-5 w-5 text-blue-600" /> {cat.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Section */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-navy">Resource Categories</h3>
                <div className="overflow-x-auto rounded-3xl border border-navy/10 shadow-lg">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="p-6 font-serif text-lg tracking-wide border-b border-navy/20">Category</th>
                        <th className="p-6 font-serif text-lg tracking-wide border-b border-navy/20">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/5 bg-white">
                      {[
                        { cat: "Legal Periodicals", ex: "Law Reviews, Journal Articles" },
                        { cat: "Law Reports", ex: "SCC, AIR, SCR" },
                        { cat: "Legal Encyclopedias", ex: "Halsbury’s Laws of England, Halsbury’s Laws of India" },
                        { cat: "Digests & Abridgements", ex: "Supreme Court Yearly Digest" },
                        { cat: "Legal Dictionaries", ex: "Black’s Law Dictionary, P. Ramanatha Aiyar" }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-6 font-bold text-navy">{row.cat}</td>
                          <td className="p-6 text-muted-foreground">{row.ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LibraryPrintResources;
