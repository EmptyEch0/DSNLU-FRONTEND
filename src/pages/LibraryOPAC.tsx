import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  Search, 
  Monitor, 
  ExternalLink,
  BookCopy,
  Database,
  SearchCode
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LibraryOPAC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="opac" />

        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/5 text-blue-700 rounded-full font-bold text-sm uppercase tracking-widest border border-blue-600/10">
                  <Monitor className="h-4 w-4" /> Digital Catalogue
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy leading-tight">
                  Online Public Access <span className="text-navy/60">Catalogue (OPAC)</span>
                </h2>
                <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
                  <p>
                    The OPAC system allows students and faculty to <span className="text-navy font-semibold">search library holdings</span> including books, journals, and reference materials. It provides a real-time view of the library's physical collection.
                  </p>
                </div>
                
                <div className="pt-4">
                  <a 
                    href="http://14.139.208.19/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-navy hover:bg-navy/90 text-white rounded-xl px-12 py-8 h-auto text-xl font-bold group shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-navy/20">
                      Access OPAC <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-8">
                  {[
                    { label: "Book Status", icon: BookCopy },
                    { label: "Search by ISBN", icon: SearchCode }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10">
                      <item.icon className="h-5 w-5 text-blue-600/60" />
                      <span className="font-bold text-blue-700 text-sm uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[40px] rotate-3 transition-transform group-hover:rotate-6" />
                <div className="relative overflow-hidden rounded-[30px] shadow-2xl border-4 border-white">
                  <motion.img 
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.5 }}
                    src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80" 
                    alt="OPAC Interface" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 border-0 group-hover:border-4 border-blue-600/30 transition-all duration-300 rounded-[30px]" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600 text-white rounded-xl">
                        <Database className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy">Library Database</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Updated Daily</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features Row */}
            <div className="mt-24 grid md:grid-cols-3 gap-10">
               {[
                 { title: "Universal Search", desc: "Search across all library categories with a single query.", icon: Search },
                 { title: "Shelf Location", desc: "Locate physical books precisely within the stack rooms.", icon: SearchCode },
                 { title: "Real-time Update", desc: "Instantly see if a book is available or currently on loan.", icon: Monitor }
               ].map((feature, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="text-center space-y-4"
                 >
                   <div className="mx-auto w-16 h-16 bg-blue-600/5 rounded-2xl flex items-center justify-center text-blue-600">
                     <feature.icon className="h-8 w-8" />
                   </div>
                   <h3 className="text-xl font-bold text-navy">{feature.title}</h3>
                   <p className="text-muted-foreground">{feature.desc}</p>
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

export default LibraryOPAC;
