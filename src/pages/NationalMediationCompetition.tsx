import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Calendar, Mail, Linkedin, Instagram, Phone, User, ExternalLink, Download, Trophy, Users, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NMCPage = () => {
  const timeline = [
    { date: "15 January 2026", event: "Provisional Registration Opens" },
    { date: "15 February 2026", event: "Provisional Registration Closes" },
    { date: "16 February 2026", event: "Final Registration Opens" },
    { date: "28 February 2026", event: "Final Registration Closes" },
    { date: "March 2026", event: "Competition Dates (TBA)" },
  ];

  const firstEditionImages = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    url: `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&index=${i}`,
  }));

  const secondEditionImages = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    url: `https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=800&index=${i}`,
  }));

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 text-sm text-gray-500">
          <span className="hover:text-[#0f2d5c] cursor-pointer">Programs</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#0f2d5c] cursor-pointer">Competitions</span>
          <span className="mx-2">/</span>
          <span className="text-[#0f2d5c] font-semibold">NMC</span>
        </div>
      </div>

      <main className="flex-1">
        {/* 1️⃣ ABOUT NMC */}
        <section id="nmc-about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
              <img 
                src="https://dsnlu.ac.in/storage/2026/01/logo.webp" 
                alt="NMC Logo" 
                className="w-32 h-auto object-contain"
              />
              <div className="flex-1">
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#0f2d5c] uppercase leading-tight mb-4">
                  SHRI D. V. SUBBA RAO NATIONAL MEDIATION COMPETITION
                </h1>
                <div className="h-1 w-32 bg-[#c9a227] rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div {...fadeIn}>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    This competition is designed to provide law students with an immersive experience in mediation, a vital skill in the legal profession. Participants will engage in realistic mediation scenarios, helping them develop crucial negotiation and conflict resolution skills. The competition features seasoned judges and mediation experts from across the country, offering participants invaluable insights and feedback.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mt-4">
                    This competition aims to foster and nurture a new generation of budding mediators and negotiators who will be well-equipped to handle the complexities of ADR. Additionally, this competition offers an enriching opportunity for participants to connect with distinguished ADR experts from around the country.
                  </p>
                </motion.div>

                {/* Timeline */}
                <motion.div {...fadeIn} className="mt-12">
                  <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] mb-8 uppercase tracking-wide">Timeline</h3>
                  <div className="relative pl-8 space-y-8">
                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200" />
                    {timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[24px] top-1 w-4 h-4 rounded-full bg-[#c9a227] shadow-sm z-10" />
                        <div>
                          <p className="text-[#c9a227] font-bold text-sm uppercase mb-1">{item.date}</p>
                          <p className="text-[#0f2d5c] font-bold text-lg">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar - Registration & Contact */}
              <div className="space-y-8">
                <motion.div 
                  {...fadeIn}
                  className="bg-[#0f2d5c] text-white p-8 rounded-2xl shadow-xl border-t-8 border-[#c9a227]"
                >
                  <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-[#c9a227]" />
                    Registration Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Provisional Registration</p>
                      <p className="text-lg">15 Jan 2026 – 15 Feb 2026</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Final Registration</p>
                      <p className="text-lg">16 Feb 2026 – 28 Feb 2026</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Registration Fee</p>
                      <p className="text-3xl font-bold text-[#c9a227]">Rs. 9,000 /-</p>
                    </div>
                    <Button className="w-full bg-[#c9a227] hover:bg-[#b08e22] text-[#0f2d5c] font-bold py-6 rounded-xl mt-4">
                      REGISTER NOW
                    </Button>
                  </div>
                </motion.div>

                <motion.div 
                  {...fadeIn}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h3 className="font-serif text-xl font-bold text-[#0f2d5c] mb-6 border-b border-gray-100 pb-4">
                    Contact Us
                  </h3>
                  <div className="space-y-6">
                    <a href="mailto:nationalmediation@dsnlu.ac.in" className="flex items-center gap-4 text-gray-600 hover:text-[#0f2d5c] group transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] group-hover:bg-[#0f2d5c] group-hover:text-white transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">nationalmediation@dsnlu.ac.in</span>
                    </a>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/company/damodaram-sanjivayya-national-mediation-competition/" target="_blank" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://www.instagram.com/dsnlu.nmc" target="_blank" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white transition-all">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[#c9a227] text-xs font-bold uppercase mb-4 tracking-widest">Faculty Coordinator</p>
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-bold text-[#0f2d5c]">Dr. Kavuri Sudha</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> 9492535618</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 whitespace-nowrap"><Mail className="w-3 h-3" /> sudhakavuri@dsnlu.ac.in</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[#c9a227] text-xs font-bold uppercase mb-4 tracking-widest">Student Coordinators</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-xs font-bold text-[#0f2d5c]">Arjit Mishra</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-xs font-bold text-[#0f2d5c]">Kartikey Bansal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2️⃣ 1ST NMC – 2024 (ARCHIVAL) */}
        <section id="nmc-2024" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0f2d5c] mb-4 uppercase">
                1ST SHRI D. V. SUBBA RAO NATIONAL MEDIATION COMPETITION – 2024
              </h2>
              <div className="h-1 w-24 bg-[#c9a227] rounded-full mb-8" />
              <motion.div {...fadeIn}>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  The inaugural edition, held from 20th to 22nd September 2024, witnessed enthusiastic participation from 24 teams from across the country and was widely appreciated for its practical and immersive approach to mediation training.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  The Brochure and Rule Book for the First Edition were unveiled on 19th August 2024 at the DSNLU campus by the Hon’ble Justice Shri J.K. Maheshwari of the Supreme Court of India.
                </p>
              </motion.div>
            </div>

            <h3 className="text-sm font-bold text-[#c9a227] uppercase tracking-[0.2em] mb-8">1st Edition Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {firstEditionImages.map((img) => (
                <motion.div
                  key={img.id}
                  {...fadeIn}
                  whileHover={{ y: -5 }}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img src={img.url} alt={`1st NMC Gallery ${img.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d5c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3️⃣ 2ND NMC – 2025–26 */}
        <section id="nmc-2025" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0f2d5c] mb-4 uppercase">
                2ND SHRI D. V. SUBBA RAO NATIONAL MEDIATION COMPETITION – 2025–26
              </h2>
              <div className="h-1 w-24 bg-[#c9a227] rounded-full mb-8" />
              <motion.p {...fadeIn} className="text-gray-700 leading-relaxed text-lg italic">
                Get ready for the second edition of DSNLU's flagship mediation competition. Building on the success of our inaugural event, we aim to scale higher with a more diverse judge panel and globally-touched problem scenarios.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div {...fadeIn} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                   <Users className="text-[#c9a227] w-8 h-8" />
                   <h4 className="font-serif text-xl font-bold text-[#0f2d5c]">Registration Summary</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Total Capacity: 32 Teams | Allotment on First-Come-First-Serve Basis</p>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Provisional Window</span>
                  <span className="font-bold text-[#0f2d5c]">15 Jan - 15 Feb</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Final Window</span>
                  <span className="font-bold text-[#0f2d5c]">16 Feb - 28 Feb</span>
                </div>
              </motion.div>

              <motion.div {...fadeIn} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                   <Clock className="text-[#c9a227] w-8 h-8" />
                   <h4 className="font-serif text-xl font-bold text-[#0f2d5c]">Quick Timeline</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" /> Release of Problem: 1st March 2026</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" /> Orientation Session: 5th March 2026</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" /> Main Event: March 2026 (Mid)</p>
                </div>
                <Button variant="outline" className="mt-6 border-[#0f2d5c] text-[#0f2d5c] hover:bg-[#0f2d5c] hover:text-white flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download Brochure Soon
                </Button>
              </motion.div>
            </div>

            <h3 className="text-sm font-bold text-[#c9a227] uppercase tracking-[0.2em] mb-8">2nd Edition Gallery Placeholders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondEditionImages.map((img) => (
                <motion.div
                  key={img.id}
                  {...fadeIn}
                  whileHover={{ y: -5 }}
                  className="group relative h-64 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center transition-all duration-300"
                >
                  <img src={img.url} alt={`2nd NMC Placeholder ${img.id}`} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-gray-100 group-hover:opacity-0 transition-opacity">
                      <p className="text-[10px] font-bold text-[#0f2d5c] uppercase tracking-widest leading-none">Awaiting Memories</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NMCPage;
