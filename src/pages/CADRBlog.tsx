import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CADRBlog = () => {
  const blogUrl = "https://adrcell.wixsite.com/cadrdsnlu";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">CADR Blog</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl"
            >
              CADR BLOG
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Explore insights, articles, and updates from the Centre for Alternative Dispute Resolution.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <Button 
                asChild
                className="h-14 px-10 text-lg font-bold uppercase tracking-widest bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-[#0f2d5c] shadow-lg transition-all duration-300"
              >
                <a href={blogUrl} target="_blank" rel="noopener noreferrer">
                  Visit Blog <ExternalLink className="ml-3 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20">
          <div className="container max-w-4xl text-center">
            <div className="rounded-3xl border-2 border-dashed border-gold/20 p-12 bg-secondary/10">
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-6">Redirecting to CADR Portal</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our official blog is hosted on a dedicated platform where we share regular updates on ADR practices, case studies, and student achievements. Click the button above to access the full portal in a new tab.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CADRBlog;
