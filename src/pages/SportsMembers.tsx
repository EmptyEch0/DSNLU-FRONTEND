import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { UserCheck, ShieldCheck } from "lucide-react";

const members = [
  { name: "Dr. Dayananda Murthy C.P.", role: "Convener" },
  { name: "Dr. P. Jogi Naidu", role: "Member" },
  { name: "Dr. R. Bharat Kumar", role: "Member" },
  { name: "Dr. A. Nageswara Rao", role: "Member" },
  { name: "Mr. A.N.N. Gopi Kumar", role: "Member" },
  { name: "Mr. O. Manga Raju", role: "Member" },
];

const SportsMembers = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="members" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-2">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Sports Committee Members
                </h2>
                <div className="divider-gold mx-auto" />
              </div>

              {/* Convener Highlight Card */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md p-8 rounded-3xl border-2 border-gold bg-white shadow-elegant text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-navy">
                    <ShieldCheck className="h-24 w-24" />
                  </div>
                  <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy">{members[0].name}</h3>
                  <div className="mt-2 text-gold font-bold uppercase tracking-widest text-sm">
                    {members[0].role}
                  </div>
                </div>
              </div>

              {/* Professional Table */}
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-navy text-white text-sm uppercase tracking-wider">
                      <th className="px-8 py-5 font-bold">Name</th>
                      <th className="px-8 py-5 font-bold text-right">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {members.map((member, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="hover:bg-muted/50 transition-colors group"
                      >
                        <td className="px-8 py-5 font-bold text-foreground group-hover:text-gold transition-colors">
                          {member.name}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={member.role === "Convener" 
                            ? "inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold uppercase tracking-tighter"
                            : "inline-flex items-center rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-muted-foreground uppercase tracking-tighter"
                          }>
                            {member.role}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30 text-center">
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  The committee includes representation from both faculty and administrative staff, ensuring a balance between academic requirements and student welfare in sports.
                </p>
              </div>

            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SportsMembers;
