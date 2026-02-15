import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const BCIAffiliation = () => {
  const pdfUrl = "https://dsnlu.ac.in/storage/2022/12/BCI-Affiliation-Approval.pdf";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compliance & Media</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">BCI Affiliation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
            >
              Compliance & Media
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              BCI AFFILIATION
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold text-foreground">Bar Council of India – Affiliation Approval</h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
              </div>

              {/* PDF Preview Card (consistent with DSNLU Act page) */}
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="flex flex-col items-center justify-between border-b bg-secondary/30 p-6 sm:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">Affiliation Approval Document</h3>
                      <p className="text-sm text-muted-foreground">Official BCI Certification</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
                    <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-navy">
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open
                      </a>
                    </Button>
                    <Button asChild className="bg-gold text-navy hover:bg-gold-dark">
                      <a href={pdfUrl} download>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </a>
                    </Button>
                  </div>
                </div>
                {/* PDF Viewer Embed */}
                <div className="aspect-[1/1.4] w-full bg-muted/20">
                  <iframe 
                    src={`${pdfUrl}#toolbar=0`} 
                    className="h-full w-full"
                    title="BCI Affiliation Document"
                  />
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

export default BCIAffiliation;
