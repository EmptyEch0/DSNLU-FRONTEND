import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicationsHeader } from "@/components/layout/PublicationsHeader";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const PublicationsOverview = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="overview" />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-tight">
              Institutional Scholarship
            </h2>
            <div className="h-[3px] w-20 bg-[#c9a227] mb-12" />
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p className="leading-relaxed text-lg">
                An institution for higher learning must promote scholarship that engages with practical questions as well as the moral and philosophical dilemmas that arise in contemporary life. In addition to its full-time taught programmes and initiatives in proximate education, DSNLU University of Law provides an enabling environment for its faculty members, research scholars and students to actively contribute to the production of knowledge in legal studies as well as cognate disciplines such as political science, history, economics, sociology and business studies among others.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 items-center py-10 border-y border-gray-100 italic font-serif text-[#0f2d5c]/80 bg-gray-50/50 px-8 rounded-2xl">
                <div className="flex gap-4">
                  <Quote className="text-[#c9a227] w-10 h-10 flex-shrink-0 opacity-30" />
                  <p>Our faculty members have authored several book-length studies, chapters in longer compilations, scholarly articles in peer-reviewed journals, research-based surveys and opinion pieces in leading newspapers and magazines.</p>
                </div>
                <div className="flex gap-4">
                  <Quote className="text-[#c9a227] w-10 h-10 flex-shrink-0 opacity-30 transform rotate-180" />
                  <p>Our research scholars enrolled in the Ph.D. programme are encouraged to produce innovative and creative legal scholarship that blends methods and insights drawn from several disciplines.</p>
                </div>
              </div>

              <p className="leading-relaxed text-lg">
                The curricular design of the undergraduate and postgraduate courses gives students regular opportunities to hone their research and writing skills, with many of them successfully developing their written assignments into scholarly publications.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicationsOverview;
