import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const journals = [
  {
    name: "Cambridge Law Journal",
    url: "https://www.cambridge.org/core/journals/cambridge-law-journal",
    desc: "A leading legal journal publishing high-quality research across all areas of law.",
    image: "https://www.cambridge.org/core/services/aop-file-manager/live/repository/product/CLJ/logo.png"
  },
  {
    name: "Economic & Political Weekly",
    url: "https://www.epw.in/",
    desc: "A premier social science journal providing a platform for critical analysis of contemporary issues.",
    image: "https://www.epw.in/sites/all/themes/epw/logo.png"
  },
  {
    name: "ICSID Review (Oxford)",
    url: "https://academic.oup.com/icsidreview",
    desc: "Specialized journal on international investment law and dispute settlement.",
    image: "https://academic.oup.com/file-asset/icsidreview/icsidreview_logo.png"
  }
];

const LibraryEJournals = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="journals" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy">E-Journals</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Access a curated collection of world-class legal journals and academic publications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journals.map((journal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[32px] p-8 shadow-elegant border border-navy/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center"
                >
                  <div className="relative mb-8 w-32 h-32 rounded-3xl bg-secondary/20 flex items-center justify-center overflow-hidden border border-navy/5 group-hover:rotate-1 transition-transform duration-500">
                    <img 
                      src={journal.image} 
                      alt={journal.name}
                      className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${new URL(journal.url).hostname}&sz=128`;
                      }}
                    />
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{journal.name}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed">
                    {journal.desc}
                  </p>

                  <div className="mt-auto w-full">
                    <a href={journal.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-navy hover:bg-blue-600 text-white rounded-2xl py-6 h-auto font-bold shadow-lg transform group-hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                         Visit Journal <ExternalLink className="h-4 w-4" />
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

export default LibraryEJournals;
