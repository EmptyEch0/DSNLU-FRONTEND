import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicationsHeader } from "@/components/layout/PublicationsHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const bookImages = [
  "https://dsnlu.ac.in/storage/2023/01/2.jpg",
  "https://dsnlu.ac.in/storage/2023/01/1.jpg",
  "https://dsnlu.ac.in/storage/2023/01/5.jpg",
  "https://dsnlu.ac.in/storage/2023/01/3.jpg",
  "https://dsnlu.ac.in/storage/2023/01/15.jpg",
  "https://dsnlu.ac.in/storage/2023/01/4.jpg",
  "https://dsnlu.ac.in/storage/2023/01/6.jpg",
  "https://dsnlu.ac.in/storage/2023/01/7.jpg",
  "https://dsnlu.ac.in/storage/2023/01/9.jpg",
  "https://dsnlu.ac.in/storage/2023/01/8.jpg",
  "https://dsnlu.ac.in/storage/2023/01/10.jpg",
  "https://dsnlu.ac.in/storage/2023/01/11.jpg",
  "https://dsnlu.ac.in/storage/2023/01/12.jpg",
  "https://dsnlu.ac.in/storage/2023/01/13.jpg",
  "https://dsnlu.ac.in/storage/2023/01/14.jpg",
];

export const PublicationsBooks = () => {
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedBookIndex !== null) {
      setSelectedBookIndex((selectedBookIndex + 1) % bookImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedBookIndex !== null) {
      setSelectedBookIndex((selectedBookIndex - 1 + bookImages.length) % bookImages.length);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="books" />
      
      <main className="flex-1 py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-wide">
              BOOKS & SCHOLARLY PUBLICATIONS
            </h2>
            <div className="h-1 w-20 bg-[#c9a227]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {bookImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedBookIndex(index)}
                className="group cursor-pointer bg-white p-3 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
                  <img 
                    src={src} 
                    alt={`Publication ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0f2d5c]/0 group-hover:bg-[#0f2d5c]/5 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* INTERACTIVE BOOK VIEWER (MODAL) */}
      <AnimatePresence>
        {selectedBookIndex !== null && (
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
                onClick={() => setSelectedBookIndex(null)}
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
                    src={bookImages[selectedBookIndex]} 
                    alt={`Viewer ${selectedBookIndex + 1}`} 
                    className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain"
                  />
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <div className="bg-[#0f2d5c] px-6 py-2 rounded-full border border-[#c9a227]/30 text-white/80 font-bold uppercase tracking-widest text-xs">
                {selectedBookIndex + 1} / {bookImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PublicationsBooks;
