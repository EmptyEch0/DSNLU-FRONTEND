
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CAROUSEL_DATA = [
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    title: "World-Class Campus",
    subtitle: "State-of-the-art infrastructure for holistic learning",
  },
  {
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    title: "Moot Court Excellence",
    subtitle: "Practicing advocacy in realistic court settings",
  },
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
    title: "Extensive Library",
    subtitle: "A vast repository of legal knowledge & research",
  },
  {
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=1000&auto=format&fit=crop",
    title: "Legal Research",
    subtitle: "Contributing to the future of Indian jurisprudence",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 4000); // 4s auto-slide

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="group relative mx-auto h-[240px] w-full max-w-[600px] overflow-hidden rounded-[18px] border border-gold/30 shadow-gold-glow transition-all duration-500 hover:shadow-gold md:h-[300px] lg:h-[380px] hover:scale-[1.01]"
      style={{ animation: "float 6s ease-in-out infinite" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background/Backdrop */}
      <div className="absolute inset-0 bg-navy/20 backdrop-blur-sm" />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={CAROUSEL_DATA[currentIndex].image}
            alt={CAROUSEL_DATA[currentIndex].title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Custom Dark Gradient Overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Caption Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-1"
          >
            <h3 className="font-serif text-xl font-bold text-gold md:text-2xl drop-shadow-md">
              {CAROUSEL_DATA[currentIndex].title}
            </h3>
            <p className="line-clamp-2 text-sm text-ivory/90 md:text-base drop-shadow-sm">
              {CAROUSEL_DATA[currentIndex].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {CAROUSEL_DATA.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-6 bg-gold" : "w-1.5 bg-ivory/40"
            }`}
          />
        ))}
      </div>
      
      {/* Glassmorphism Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-ivory/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
    </div>
  );
}
