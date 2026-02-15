import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, MapPin, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SeminarsConferences = () => {
  const [activeYear, setActiveYear] = useState("2025");

  const seminarsData = {
    "2025": [
      {
        title: "Three Day Residential Legal Refreshing Programme",
        organizer: "Bar Council of A.P in Collaboration with DSNLU",
        days: [
          {
            label: "12th June 2025 – Day 1",
            images: Array(10).fill("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800")
          },
          {
            label: "13th June 2025 – Day 2",
            images: Array(10).fill("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800")
          },
          {
            label: "14th June 2025 – Day 3",
            images: Array(10).fill("https://images.unsplash.com/photo-1540575861501-7ad060e39fe6?auto=format&fit=crop&q=80&w=800")
          }
        ]
      }
    ],
    "2024": [
      {
        title: "Bharatiya Nyaya Sanhita (BNS) Seminar",
        location: "Seminar Hall, DSNLU",
        date: "28th September 2024",
        subjects: ["BNS", "BNSS", "BSA"],
        images: Array(6).fill("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800")
      },
      {
        title: "Interaction Session – Legal Education & Profession",
        date: "6th September 2024",
        images: Array(6).fill("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800")
      },
      {
        title: "NHRC-DSNLU Rights of Fisher Men",
        date: "31 August 2024",
        images: Array(6).fill("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800")
      },
      {
        title: "One Day Seminar – National Commission for Women",
        date: "27 April 2024",
        guests: {
          chiefGuest: "Hon’ble Justice Venkata Jyothirmai Pratapa",
          guestsOfHonour: [
            "Sri A. Asholi Chalai",
            "Shri B. Lavan Kumar",
            "Smt. Sudha Rani Relangi",
            "Prof. James Stephen Meka",
            "Prof. D. Surya Prakasa Rao"
          ]
        },
        images: Array(8).fill("https://images.unsplash.com/photo-1573163273838-892175766217?auto=format&fit=crop&q=80&w=800")
      },
      {
        title: "Contribution of Indian Judiciary Seminar",
        date: "24 January 2024",
        details: "Guest and speaker structured list provides unique perspectives on Judicial history.",
        images: Array(8).fill("https://images.unsplash.com/photo-1589c39776580-c1e7a63d91cf?auto=format&fit=crop&q=80&w=800")
      }
    ]
  };

  const years = ["2025", "2024"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Programs
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Seminars & Conferences
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Year Tabs */}
        <div className="border-b bg-secondary/30 sticky top-[72px] z-20 backdrop-blur-md">
          <div className="container flex items-center justify-center gap-12 py-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`relative py-2 text-xl font-serif font-bold transition-all duration-300 ${
                  activeYear === year ? "text-gold scale-110" : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                {year}
                {activeYear === year && (
                  <motion.div
                    layoutId="activeSeminarYear"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Seminars List */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-20"
              >
                {activeYear === "2025" ? (
                  seminarsData["2025"].map((seminar, idx) => (
                    <div key={idx} className="space-y-12">
                      <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">{seminar.title}</h2>
                        <p className="text-gold font-medium text-lg italic">By {seminar.organizer}</p>
                      </div>

                      {seminar.days.map((day, dayIdx) => (
                        <div key={dayIdx} className="space-y-8">
                          <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-lg border-l-4 border-gold">
                            <Calendar className="h-6 w-6 text-gold" />
                            <h3 className="text-xl font-bold text-foreground">{day.label}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {day.images.map((img, imgIdx) => (
                              <motion.div
                                key={imgIdx}
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-elegant bg-muted cursor-zoom-in"
                              >
                                <img
                                  src={img}
                                  alt={`Seminar Image ${imgIdx + 1}`}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  seminarsData["2024"].map((seminar, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="space-y-8 bg-card p-8 rounded-3xl border shadow-premium hover:shadow-2xl transition-all"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gold/10 pb-6">
                        <div className="space-y-2">
                          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">{seminar.title}</h2>
                          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-medium">
                            {seminar.date && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" /> {seminar.date}</span>}
                            {seminar.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {seminar.location}</span>}
                          </div>
                        </div>
                        {seminar.subjects && (
                          <div className="flex gap-2">
                            {seminar.subjects.map((sub, sidx) => (
                              <span key={sidx} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-wider">
                                {sub}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {seminar.guests && (
                        <div className="grid md:grid-cols-2 gap-8 bg-secondary/10 p-6 rounded-2xl">
                          <div>
                            <h4 className="flex items-center gap-2 font-bold text-primary mb-3">
                              <Users className="h-5 w-5 text-gold" />
                              Chief Guest:
                            </h4>
                            <p className="text-foreground font-semibold">{seminar.guests.chiefGuest}</p>
                          </div>
                          <div>
                            <h4 className="flex items-center gap-2 font-bold text-primary mb-3">
                              <Users className="h-5 w-5 text-gold" />
                              Guests of Honour:
                            </h4>
                            <ul className="space-y-1">
                              {seminar.guests.guestsOfHonour.map((g, gi) => (
                                <li key={gi} className="text-foreground text-sm flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                                  {g}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {seminar.details && (
                        <div className="flex gap-3 text-muted-foreground italic bg-gold/5 p-4 rounded-xl border border-gold/10">
                          <Info className="h-5 w-5 text-gold flex-shrink-0" />
                          <p>{seminar.details}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pt-4">
                        {seminar.images.map((img, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            className="group aspect-video overflow-hidden rounded-xl shadow-md bg-muted"
                          >
                            <img
                              src={img}
                              alt="Seminar Highlights"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SeminarsConferences;
