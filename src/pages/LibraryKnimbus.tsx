import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  Wifi, 
  ExternalLink,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Database,
  Globe,
  BookOpen,
  Library
} from "lucide-react";
import { Button } from "@/components/ui/button";

const eResources = [
  { name: "LexisNexis", icon: Database, color: "bg-red-50" },
  { name: "Westlaw", icon: Globe, color: "bg-blue-50" },
  { name: "SCC Online", icon: BookOpen, color: "bg-green-50" },
  { name: "HeinOnline", icon: Library, color: "bg-purple-50" },
  { name: "JSTOR", icon: Database, color: "bg-orange-50" },
  { name: "Manupatra", icon: CheckCircle2, color: "bg-indigo-50" },
];

const LibraryKnimbus = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="knimbus" />

        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container max-w-6xl">
            {/* Main Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[40px] shadow-elegant border border-navy/5 overflow-hidden mb-24"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-16 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm uppercase tracking-widest border border-blue-100">
                    <Wifi className="h-4 w-4" /> Off-Campus Access
                  </div>
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy leading-tight">
                    Remote Access <span className="text-blue-600">(Knimbus)</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Knimbus provides <span className="text-navy font-semibold">remote access</span> to subscribed e-resources, databases, journals, and digital materials of the DSNLU Library, ensuring learning continues beyond the campus.
                  </p>
                  
                  <div className="pt-4">
                    <a 
                      href="https://dsnlu.knimbus.com/portal/v2/default/home" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-navy hover:bg-navy/90 text-white rounded-xl px-12 py-8 h-auto text-xl font-bold group shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-navy/20">
                        Access Knimbus Portal <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="bg-blue-600 relative overflow-hidden flex items-center justify-center p-12 lg:p-16">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500" />
                   {/* Laptop Mock */}
                   <motion.div 
                     whileHover={{ scale: 1.05, rotate: 1 }}
                     transition={{ duration: 0.5 }}
                     className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 border-x-[8px] border-t-[8px] border-b-[30px] border-gray-100"
                   >
                     <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden relative">
                       <img 
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" 
                          alt="Remote Portal" 
                          className="w-full h-full object-cover opacity-80"
                       />
                       <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/50 w-full max-w-[200px]">
                             <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                             <div className="font-bold text-navy text-xs">Login to Portal</div>
                          </div>
                       </div>
                     </div>
                   </motion.div>
                </div>
              </div>
            </motion.div>

            {/* E-Resource Cards */}
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h3 className="font-serif text-3xl font-bold text-navy">Premium E-Resources</h3>
                <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
                <p className="text-muted-foreground">Available through the Knimbus remote access platform</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {eResources.map((resource, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`group ${resource.color} p-8 rounded-3xl text-center border border-navy/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                  >
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform shadow-lg">
                        <resource.icon className="h-8 w-8" />
                      </div>
                    <span className="font-bold text-navy text-sm tracking-tight">{resource.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Access Steps */}
            <div className="mt-24 grid md:grid-cols-2 gap-10">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-secondary/20 rounded-[40px] p-10 border border-navy/5"
               >
                 <h3 className="text-2xl font-serif font-bold text-navy mb-8">Access Instructions</h3>
                 <ul className="space-y-4">
                   {[
                     "Obtain login credentials from the library IT desk.",
                     "Visit the Knimbus portal via the button above.",
                     "Enter your registered university email and password.",
                     "Navigate through the dashboard to access databases.",
                     "Use the Knimbus mLibrary app for mobile access."
                   ].map((step, i) => (
                     <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-navy/5">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          {i + 1}
                        </div>
                        <span className="text-muted-foreground font-medium">{step}</span>
                     </li>
                   ))}
                 </ul>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-navy rounded-[40px] p-10 text-white relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck className="h-48 w-48 text-white" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-blue-400">Secure Connection</h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      All remote connections are secured via SSL. If you encounter any technical issues or need to reset your password, please reach out to our digital library team.
                    </p>
                    <div className="pt-4">
                      <div className="p-5 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                          <Globe className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-white/50 uppercase font-bold tracking-widest text-blue-400">Digital Support</p>
                          <p className="font-bold">it.library@dsnlu.ac.in</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LibraryKnimbus;
