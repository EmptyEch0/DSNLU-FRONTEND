import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, Image as ImageIcon, Video, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const News = () => {
  const [activeTab, setActiveTab] = useState("Images");
  const [activeYear, setActiveYear] = useState("2024");

  const years = ["2026", "2025", "2024", "2023"];
  const newsItems = [
    {
      id: 1,
      title: "DSNLU Signs MoU with NALSAR for Academic Collaboration",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
      category: "Academic",
    },
    {
      id: 2,
      title: "Student Team Wins National Moot Court Competition",
      date: "February 28, 2024",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80",
      category: "Achievement",
    },
    {
      id: 3,
      title: "DSNLU Organizes International Seminar on Environmental Law",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1523240715639-9a671398108a?auto=format&fit=crop&q=80",
      category: "Events",
    },
    {
      id: 4,
      title: "New Research Center Inaugurated at Nyayaprastha Campus",
      date: "December 15, 2023",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      category: "Infrastructure",
    },
  ];

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
            <span className="font-medium text-gold">DSNLU in News</span>
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
              DSNLU IN NEWS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Filters & Tabs Section */}
        <section className="py-12 border-b bg-secondary/20">
          <div className="container">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Tabs: Images | Video */}
              <div className="flex p-1 bg-muted rounded-xl w-fit">
                {["Images", "Video"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${
                      activeTab === tab ? "text-navy" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeNewsTab"
                        className="absolute inset-0 bg-gold rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {tab === "Images" ? <ImageIcon className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      {tab}
                    </span>
                  </button>
                ))}
              </div>

              {/* Year Buttons */}
              <div className="flex flex-wrap gap-3">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 border ${
                      activeYear === year 
                        ? "bg-navy text-gold border-navy" 
                        : "bg-background text-muted-foreground border-border hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeYear}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {newsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-elegant transition-all duration-500"
                  >
                    {/* Image Placeholder with Hover Zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                          <Search className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-lg italic">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wider font-bold">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        {item.date}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground leading-tight group-hover:text-gold transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="mt-auto pt-6">
                        <div className="h-0.5 w-8 bg-gold/30 group-hover:w-full group-hover:bg-gold transition-all duration-500 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State / Coming Soon */}
            {activeTab === "Video" && (
              <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed border-border/50">
                <Video className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Video coverage for {activeYear} will be available shortly.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
