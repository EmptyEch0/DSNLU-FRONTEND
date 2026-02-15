import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  FileSearch, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LibraryTurnitin = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="turnitin" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-6xl">
            {/* Main Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[40px] shadow-elegant border border-navy/5 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-16 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 text-navy rounded-full font-bold text-sm uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4" /> Research Integrity
                  </div>
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy leading-tight">
                    Anti-Plagiarism Software <span className="text-navy/60">(Turnitin)</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Turnitin is the university's primary <span className="text-navy font-semibold">plagiarism detection software</span>, essential for ensuring the originality of research papers, dissertations, and academic assignments. It compares submissions against a vast global database of research materials.
                  </p>
                  
                  <div className="pt-4">
                    <a 
                      href="https://www.turnitin.com/login_page.asp?lang=en_us" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-navy hover:bg-navy/90 text-white rounded-xl px-12 py-8 h-auto text-xl font-bold group shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-navy/20">
                        Access Turnitin <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="bg-navy relative overflow-hidden flex items-center justify-center p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <ShieldCheck className="h-[500px] w-[500px] text-white" />
                  </motion.div>
                  
                  <div className="relative z-10 space-y-6 w-full max-w-sm">
                    {[
                      { title: "Originality Check", icon: FileSearch },
                      { title: "Global Database", icon: Search },
                      { title: "Academic Standards", icon: ShieldAlert }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
                        <item.icon className="h-6 w-6 text-blue-400" />
                        <span className="font-bold tracking-wide">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Info Sections */}
            <div className="mt-20 grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Similarity Index",
                  content: "Detailed reports highlighting overlapping text with percentage scores.",
                  icon: CheckCircle2
                },
                {
                  title: "Credential Access",
                  content: "Credentials provided to students and faculty by the library staff.",
                  icon: ShieldCheck
                },
                {
                  title: "Research Support",
                  content: "Helping scholars refine their writing and maintain high ethical standards.",
                  icon: FileSearch
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-secondary/20 p-8 rounded-3xl border border-navy/5 group hover:bg-navy transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/70 transition-colors leading-relaxed">
                    {item.content}
                  </p>
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

export default LibraryTurnitin;
