import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { Database, ExternalLink, ShieldCheck, Globe, SearchCode, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const databases = [
  { name: "Jus Mundi", url: "https://jusmundi.com/en", desc: "Comprehensive international law and arbitration database." },
  { name: "HeinOnline", url: "https://heinonline.org/HOL/login-hol?redirect_url=%2FHOL%2FWelcome", desc: "Premier online database containing more than 180 million pages of legal history." },
  { name: "Bar & Bench", url: "https://www.barandbench.com/", desc: "Leading news portal for the legal fraternity in India." },
  { name: "LiveLaw", url: "https://www.livelaw.in/", desc: "Comprehensive legal news portal in India." },
  { name: "LexisNexis", url: "https://signin.lexisnexis.com/lnaccess/mip/authn?aci=in&identityprofileid=96VGBH58174&request_id=1", desc: "Global legal research platform for legal professionals." },
  { name: "Oxford Public International Law", url: "https://opil.ouplaw.com/", desc: "The home of Oxford's public international law services." },
  { name: "Westlaw Asia", url: "https://launch.westlawasia.com/signon?sp=inapu-1", desc: "Leading provider of legal research for the Asian market." },
  { name: "Taxmann Research", url: "https://www.taxmann.com/research", desc: "India's largest database on taxation, corporate laws, and more." },
  { name: "SCC Online", url: "https://www.scconline.com/", desc: "The most trusted source for case law, statutes, and articles in India." },
  { name: "Manupatra", url: "https://www.manupatra.ai/", desc: "India's pioneer legal search engine and database." },
  { name: "JSTOR", url: "https://www.jstor.org/", desc: "Digital library of academic journals, books, and primary sources." }
];

const LibraryEDatabases = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="databases" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy uppercase tracking-tight">E-Databases</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Premium digital repositories providing global access to case law, legislation, and research materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {databases.map((db, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white p-8 rounded-[32px] border border-navy/5 shadow-sm hover:shadow-2xl hover:border-blue-600/30 transition-all duration-300 flex flex-col items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Database className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-navy mb-3 uppercase tracking-tight">{db.name}</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    {db.desc}
                  </p>

                  <div className="mt-auto w-full">
                    <a href={db.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full border-blue-600/20 text-blue-600 hover:bg-navy hover:text-white hover:border-navy rounded-2xl py-6 h-auto font-bold transition-all flex items-center justify-center gap-2">
                         Access Database <ExternalLink className="h-4 w-4" />
                      </Button>
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

export default LibraryEDatabases;
