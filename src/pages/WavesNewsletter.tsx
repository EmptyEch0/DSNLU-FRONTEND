import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicationsHeader } from "@/components/layout/PublicationsHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const newsletterImages = [
  { url: "https://dsnlu.ac.in/storage/2023/01/waves_Vol.V-Issue-1-2-232x300-1.jpg", label: "Vol. V - Issue 1 & 2" },
  { url: "https://dsnlu.ac.in/storage/2023/01/waves-4-1.jpg", label: "Vol. IV - Issue 1" },
  { url: "https://dsnlu.ac.in/storage/2023/01/Waves-3-2.jpg", label: "Vol. III - Issue 2" },
  { url: "https://dsnlu.ac.in/storage/2023/01/waves-3-1.jpg", label: "Vol. III - Issue 1" },
  { url: "https://dsnlu.ac.in/storage/2023/01/waves-1-2.jpg", label: "Vol. I - Issue 2" },
  { url: "https://dsnlu.ac.in/storage/2023/01/Waves-4-2.jpg", label: "Vol. IV - Issue 2" },
];

export const WavesNewsletter = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % newsletterImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + newsletterImages.length) % newsletterImages.length);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="waves" />
      
      <main className="flex-1 py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-wide">
              WAVES – DSNLU NEWSLETTER
            </h2>
            <div className="h-1 w-20 bg-[#c9a227] mb-8" />
            <p className="text-gray-700 text-lg max-w-3xl italic">
              “WAVES is the official newsletter of DSNLU, capturing academic developments, research insights, student initiatives, and institutional milestones.”
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {newsletterImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedIndex(index)}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-[3/4] w-full mb-6">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={item.url} 
                      alt={item.label} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[#0f2d5c] font-bold uppercase tracking-widest text-xs group-hover:text-[#c9a227] transition-colors">
                    {item.label}
                  </p>
                  <div className="h-0.5 w-8 bg-[#c9a227]/30 mx-auto mt-2 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* INTERACTIVE VIEWER (MODAL) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-8"
            >
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative flex items-center justify-center w-full group">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="max-h-[70vh] md:max-h-[80vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1">
                  <img 
                    src={newsletterImages[selectedIndex].url} 
                    alt={`Viewer ${selectedIndex + 1}`} 
                    className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain"
                  />
                  <div className="bg-[#0f2d5c] p-4 text-center border-t border-[#c9a227]/30">
                    <p className="text-[#c9a227] font-bold uppercase tracking-widest text-[10px] md:text-xs">
                      {newsletterImages[selectedIndex].label}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <div className="bg-[#0f2d5c] px-6 py-2 rounded-full border border-[#c9a227]/30 text-white/80 font-bold uppercase tracking-widest text-xs">
                {selectedIndex + 1} / {newsletterImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default WavesNewsletter;
