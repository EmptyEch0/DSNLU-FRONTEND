import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { LibraryResourcesHeader } from "@/components/layout/LibraryResourcesHeader";
import { motion } from "framer-motion";
import { BookCopy, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Cambridge Core",
    url: "https://www.cambridge.org/core",
    desc: "A wide range of high-quality academic content from Cambridge University Press.",
    icon: BookOpen
  },
  {
    name: "EBC Reader",
    url: "https://www.ebcreader.com/",
    desc: "India's leading legal e-book platform with a vast collection of authoritative legal texts.",
    icon: BookCopy
  },
  {
    name: "LexisNexis Store",
    url: "https://store.lexisnexis.com/en-in",
    desc: "Global legal database and e-book collection for legal professionals and students.",
    icon: BookOpen
  }
];

const LibraryEBooks = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />
        <LibraryResourcesHeader activeTab="books" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy uppercase tracking-tight">E-Books</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Access a digital library of legal monographs, research papers, and classical law texts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {platforms.map((platform, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[32px] p-8 shadow-elegant border border-navy/5 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-600 transition-all group-hover:w-full" />
                  
                  <div className="mb-8 mx-auto w-20 h-20 rounded-2xl bg-blue-600/5 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <platform.icon className="h-10 w-10 flex-shrink-0" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-navy mb-4 uppercase tracking-tight">{platform.name}</h3>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                    {platform.desc}
                  </p>

                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-navy hover:bg-blue-600 text-white rounded-2xl py-6 h-auto font-bold shadow-lg transform group-hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                       Access Platform <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
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

export default LibraryEBooks;
