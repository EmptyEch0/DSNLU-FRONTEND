import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, Download, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Archives = () => {
  const [activeTab, setActiveTab] = useState("Notifications");
  const [activeYear, setActiveYear] = useState("2024");

  const tabs = ["Notifications", "Examination Results", "Events", "Seminar/Conferences", "Centers & Journals", "Others"];
  const years = ["2025", "2024", "2023", "2022"];

  const archiveItems = [
    { id: 1, title: "Notification for Semester Exams - Spring 2024", date: "Jan 12, 2024" },
    { id: 2, title: "List of Holidays for the Academic Year 2024", date: "Jan 05, 2024" },
    { id: 3, title: "Provisional Result of LL.B. III Semester", date: "Dec 20, 2023" },
    { id: 4, title: "Notice regarding PhD Entrance Examination 2024", date: "Dec 10, 2023" },
    { id: 5, title: "Extension of last date for Payment of Semester Fee", date: "Dec 05, 2023" },
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
            <span className="font-medium text-gold">Archives</span>
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
              ARCHIVES
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Interactive Tabs Section */}
        <section className="py-12 bg-secondary/20 border-b">
          <div className="container overflow-x-auto">
            <div className="flex flex-col gap-8">
              {/* Category Tabs */}
              <div className="flex flex-nowrap gap-2 pb-4 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                      activeTab === tab 
                        ? "bg-gold text-navy border-gold shadow-lg" 
                        : "bg-background text-muted-foreground border-border hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Year Filter Buttons */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground tracking-widest mr-2">
                  <Calendar className="h-4 w-4 text-gold" /> Filter by Year:
                </span>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      activeYear === year 
                        ? "bg-navy text-gold" 
                        : "bg-muted text-muted-foreground hover:bg-gold/10 hover:text-gold"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* List Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeYear}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {activeTab} <span className="text-gold">({activeYear})</span>
                  </h2>
                  <p className="text-sm text-muted-foreground font-medium">Showing {archiveItems.length} records</p>
                </div>

                {archiveItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 flex items-center gap-4"
                  >
                    {/* PDF Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                      <FileText className="h-6 w-6" />
                    </div>
                    
                    {/* Title and Date */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground group-hover:text-gold transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Published on {item.date}
                      </p>
                    </div>

                    {/* View File Button */}
                    <Button asChild variant="ghost" className="hidden sm:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm tracking-wide gap-2 group/btn">
                      <a href="#">
                        View File <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </Button>

                    {/* Mobile Download Icon only */}
                    <button className="sm:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                      <Download className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Archives;
