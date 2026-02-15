import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, History, Image as ImageIcon } from "lucide-react";

const SportsAchievements = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="achievements" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="space-y-24">
              
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">Achievements & Milestones</h2>
                <div className="divider-gold mx-auto" />
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                  "Celebrating the spirit of victory and the dedication of our athletes across national stages."
                </p>
              </div>

              {/* Achievement 1 - INVICTA'25 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <Medal className="h-8 w-8 text-gold" />
                  <h3 className="font-serif text-3xl font-bold">NUJS Kolkata – INVICTA’25</h3>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[21/9]">
                   <img 
                    src="https://dsnlu.ac.in/storage/2025/03/NUJS-Kolkata-Sports-Fest-2025-scaled.webp" 
                    alt="NUJS Kolkata sports fest team" 
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-8">
                     <span className="bg-gold text-navy px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase">
                       🏆 Best Runner-Up Contingent
                     </span>
                   </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-4">
                    <h4 className="font-bold text-xl text-navy flex items-center gap-2">
                       <Trophy className="h-5 w-5 text-gold" /> Participation Overview
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      With a strong contingent of **65 participants**, DSNLU showcased remarkable dominance across various sporting disciplines, eventually securing the title of **Best Runner-Up Contingent**.
                    </p>
                  </div>
                  <div className="bg-navy text-white p-8 rounded-2xl shadow-sm space-y-6">
                    <h4 className="font-bold text-xl text-gold">Medal Tally</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                       <div className="space-y-1">
                          <div className="text-3xl font-bold text-gold">Gold</div>
                          <div className="text-[10px] uppercase tracking-tighter opacity-60">Basketball, Volleyball, Throwball, Badminton, Track</div>
                       </div>
                       <div className="space-y-1">
                          <div className="text-3xl font-bold text-slate-300">Silver</div>
                          <div className="text-[10px] uppercase tracking-tighter opacity-60">Cricket, TT, Tennis, Athletics</div>
                       </div>
                       <div className="space-y-1">
                          <div className="text-3xl font-bold text-orange-400">Bronze</div>
                          <div className="text-[10px] uppercase tracking-tighter opacity-60">Shot Put, Long Jump, High Jump</div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Achievement 2 - Magnus */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <Medal className="h-8 w-8 text-gold" />
                  <h3 className="font-serif text-3xl font-bold">Magnus – O.P. Jindal Global University (2022–23)</h3>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                   <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group">
                     <img 
                      src="https://dsnlu.ac.in/storage/2023/08/dsnluwi.png" 
                      alt="Magnus victory" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Star className="text-white fill-current h-6 w-6" />
                     </div>
                   </div>
                   <div className="space-y-6">
                      <div className="bg-gold/10 p-4 rounded-xl inline-block">
                        <span className="text-gold font-bold uppercase tracking-widest text-sm">Ranked Second Best Contingent</span>
                      </div>
                      <div className="space-y-6">
                        <div className="flex gap-4 items-center">
                           <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center text-3xl font-bold shrink-0">22</div>
                           <div className="font-bold text-foreground text-xl">Total Medals Won</div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                           {[
                             { label: 'Gold', val: '4', color: 'text-gold' },
                             { label: 'Silver', val: '10', color: 'text-slate-500' },
                             { label: 'Bronze', val: '8', color: 'text-orange-600' }
                           ].map((m, i) => (
                             <div key={i} className="text-center p-4 rounded-xl border bg-card">
                               <div className={`text-2xl font-bold ${m.color}`}>{m.val}</div>
                               <div className="text-[10px] uppercase font-bold tracking-widest">{m.label}</div>
                             </div>
                           ))}
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Past Participation - Timeline style */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="flex items-center gap-4">
                  <History className="h-8 w-8 text-navy" />
                  <h3 className="font-serif text-3xl font-bold">Legacy of Participation</h3>
                </div>

                <div className="relative pl-12 border-l-2 border-dashed border-gold space-y-12">
                   {[
                     { year: '2016 – 2018', title: 'VIRAJ – NLU Orissa', desc: 'Consistent participation and commendable performance in various team and individual events over three editions.' },
                     { year: '2015', title: 'YUVARDHA – NLU Jodhpur', desc: 'Participated in the prestigious inter-university sports fest, marking DSNLU presence on the national stage.' }
                   ].map((item, i) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[60px] top-0 h-6 w-6 rounded-full bg-navy border-4 border-white shadow-md flex items-center justify-center">
                           <div className="h-2 w-2 rounded-full bg-gold" />
                        </div>
                        <div className="p-8 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow space-y-2">
                           <span className="text-gold font-bold text-sm tracking-widest">{item.year}</span>
                           <h4 className="text-xl font-bold text-navy">{item.title}</h4>
                           <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SportsAchievements;
