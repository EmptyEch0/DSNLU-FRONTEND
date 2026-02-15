import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Users, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GuestLectures = () => {
  const [activeYear, setActiveYear] = useState("2025");

  const lecturesData = {
    "2025": [
      {
        name: "Acharya Venkatesh Chakkilam",
        designation: "Scholar in Sanskrit, Vedanta, and Shad-Darshana",
        topic: "Nyaya",
        date: "2025",
        description: "Lecture on: 'Nyaya'",
        videos: ["Guest lecture 'Nyaya' by Acharya Venkatesh Chakkilam"],
        image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800"
      },
      { name: "Dr. Debasree Debnath", designation: "Expert Speaker", topic: "Legal Research", date: "2025", description: "Guest Lecture session", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof. (Dr.) Jeet Singh Mann", designation: "Professor of Law", topic: "Constitutional Law", date: "2025", description: "Expert insights on constitutional developments", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof. Dr. A. Lakshminath", designation: "Distinguished Academician", topic: "Jurisprudence", date: "2025", description: "Special lecture on Legal Theory", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr. Jagdish W. Khobragade", designation: "Legal Expert", topic: "Criminal Law", date: "2025", description: "Session on Criminal Justice System", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof. (Dr.) David Ambrose", designation: "Professor", topic: "International Law", date: "2025", description: "Global perspectives on International Relations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr. Poosarla Bayola Kiran", designation: "Academician", topic: "Corporate Law", date: "2025", description: "Updates in Corporate Governance", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof. (Dr.) Kondaiah Jonnalagadda", designation: "Professor", topic: "IPR", date: "2025", description: "Lecture on Intellectual Property Rights", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof. Anand Prakash Mishra", designation: "Dean", topic: "Legal Education", date: "2025", description: "Future of Legal Education in India", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
      { name: "Sri. V. Kalyana Rama Rao", designation: "Legal Practitioner", topic: "Civil Procedure", date: "2025", description: "Practical aspects of CPC", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr. Rajesh Kumar Ramnandan Singh", designation: "Academic Expert", topic: "Family Law", date: "2025", description: "Dimensions of Personal Laws", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800" },
      { name: "Mr. Shubhank Khare", designation: "Legal Professional", topic: "Arbitration", date: "2025", description: "ADR mechanisms and trends", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
      { name: "Mr. Samuel Nagdesi", designation: "Expert Speaker", topic: "Human Rights", date: "2025", description: "Contemporary issues in Human Rights", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr. Ketan Piyushbhai Desai", designation: "Academician", topic: "Taxation Law", date: "2025", description: "Principles of Direct and Indirect Taxes", image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr. Ruchi Tiwari", designation: "Legal Scholar", topic: "Environmental Law", date: "2025", description: "Sustainable Development and Law", image: "https://images.unsplash.com/photo-1573163273838-892175766217?auto=format&fit=crop&q=80&w=800" }
    ],
    "2024": [
      { name: "Sri Ramana Kompella", designation: "Legal Expert", topic: "Advanced Legal Theory", date: "2024", description: "Special Guest Session", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
      { name: "CIPR&T", designation: "Organizational Session", topic: "Intellectual Property", date: "2024", description: "Interactive Session on IPR", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof T Ramakrishna", designation: "Academician", topic: "Property Law", date: "2024", description: "Foundations of Property Jurisprudence", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr J K Pradhan", designation: "Legal Scholar", topic: "Administrative Law", date: "2024", description: "Principles of Natural Justice", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
      { name: "Ms. Disha Chaudhari", designation: "Expert Practitioner", topic: "Cyber Law", date: "2024", description: "Challenges in Digital Space", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof R Venkata Rao", designation: "Former Vice-Chancellor", topic: "Future of Law", date: "2024", description: "Evolving Legal Landscapes", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr G.S. Chauhan", designation: "Legal Academic", topic: "Media Law", date: "2024", description: "Rights and Responsibilities of Media", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr Nitu Kumari", designation: "Professor", topic: "Gender Justice", date: "2024", description: "Equality and Social Justice", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr Debasree Debnath", designation: "Expert Speaker", topic: "Legal Writing", date: "2024", description: "Art of Drafting", image: "https://images.unsplash.com/photo-1573163273838-892175766217?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof V. Kesava Rao", designation: "Distinguished Professor", topic: "Evidence Law", date: "2024", description: "Admissibility and Relevancy", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr Payal Thaorey", designation: "Legal Scholar", topic: "Commercial Law", date: "2024", description: "Business and Legal Frameworks", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
      { name: "Mr Ravi Kiran Edara", designation: "Legal Professional", topic: "Technology Law", date: "2024", description: "Emerging Tech and Law", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof Y. Vishnu Priya", designation: "Academic Expert", topic: "Constitutional Theory", date: "2024", description: "Democratic Values and Law", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr Sudhakara Babu", designation: "Professor", topic: "Judicial Activism", date: "2024", description: "Role of Judiciary in Democracy", image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=800" },
      { name: "Dr K.V Kumar", designation: "Academician", topic: "Legal Ethics", date: "2024", description: "Professional Conduct in Law", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof A Raghunadha Reddy", designation: "Expert Guest", topic: "Labour Law", date: "2024", description: "Social Security and Labour Rights", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof Reddivari Revathi", designation: "Distinguished Academic", topic: "Personal Laws", date: "2024", description: "Codification vs. Custom", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
      { name: "Mr Samuel Nagadesi", designation: "Expert Speaker", topic: "International Humanitarian Law", date: "2024", description: "War and Law", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
      { name: "Ms Preeti", designation: "Legal Researcher", topic: "Juvenile Justice", date: "2024", description: "Protection of Child Rights", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
      { name: "Justice DVSS Somayajulu", designation: "Former Judge, High Court of A.P.", topic: "Justice System", date: "2024", description: "Judicial Decision Making", image: "https://dsnlu.ac.in/storage/2024/01/DVVS.jpg" },
      { name: "Dr Poosarla Bayola Kiran", designation: "Academician", topic: "Corporate Finance", date: "2024", description: "Financial Regulations", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof M V R Raju", designation: "Psychology & Law", topic: "Forensic Psychology", date: "2024", description: "Criminology and Mental Health", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
      { name: "Sri Alapati Giridhar", designation: "Legal Practitioner", topic: "Trial Advocacy", date: "2024", description: "Art of Cross Examination", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof David Ambrose", designation: "Professor", topic: "Public International Law", date: "2024", description: "Treaty Obligations", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
      { name: "Mr Amitava Majumdar", designation: "Senior Advocate", topic: "Maritime Law", date: "2024", description: "Shipping and Trade Laws", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800" }
    ],
    "2023": [
      { name: "Prof Kondaiah Jonnalagadda", designation: "Professor", topic: "General Jurisprudence", date: "2023", description: "Legal Philosophy", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof Lakshminath", designation: "Distinguished Professor", topic: "Constitutional Law", date: "2023", description: "Democratic Institutions", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof David Ambrose", designation: "Professor", topic: "International Trade Law", date: "2023", description: "WTO and Global Trade", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
      { name: "Prof N Venkateshwarlu", designation: "Academic Expert", topic: "Criminal Jurisprudence", date: "2023", description: "Substantive Criminal Law", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" }
    ]
  };

  const years = ["2025", "2024", "2023"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
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
              Guest Lectures
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Year Selection Tabs */}
        <div className="border-b bg-secondary/30 sticky top-[72px] z-20 backdrop-blur-md">
          <div className="container flex items-center justify-center gap-8 py-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`relative py-2 text-lg font-semibold transition-colors duration-300 ${
                  activeYear === year ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {year}
                {activeYear === year && (
                  <motion.div
                    layoutId="activeYearUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid gap-12 lg:gap-16"
              >
                {lecturesData[activeYear as keyof typeof lecturesData].map((lecture, index) => (
                  <motion.div
                    key={`${activeYear}-${lecture.name}`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group relative flex flex-col md:flex-row gap-8 lg:gap-12"
                  >
                    {/* Left: Image Placeholder (16:9) */}
                    <div className="md:w-2/5 aspect-video overflow-hidden rounded-2xl shadow-elegant bg-muted">
                      <img
                        src={lecture.image}
                        alt={lecture.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Right: Speaker Info */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-foreground mb-1">{lecture.name}</h3>
                        <p className="text-gold font-medium text-lg italic">{lecture.designation}</p>
                      </div>
                      
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <div>
                          <span className="font-bold text-foreground">Topic(s): </span>
                          {lecture.topic}
                        </div>
                        <div>
                          <span className="font-bold text-foreground">Date(s): </span>
                          {lecture.date}
                        </div>
                        <p>{lecture.description}</p>
                        
                        {lecture.videos && (
                          <div className="mt-6 pt-6 border-t border-gold/20">
                            <h4 className="flex items-center gap-2 font-bold text-foreground mb-3">
                              <PlayCircle className="h-5 w-5 text-gold" />
                              Videos Section:
                            </h4>
                            <ul className="list-disc list-inside space-y-2">
                              {lecture.videos.map((vid, i) => (
                                <li key={i} className="hover:text-gold transition-colors cursor-pointer">
                                  {vid}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Divider for all except last */}
                    {index !== lecturesData[activeYear as keyof typeof lecturesData].length - 1 && (
                      <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:hidden lg:block lg:opacity-50" />
                    )}
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

export default GuestLectures;
