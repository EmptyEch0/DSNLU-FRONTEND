import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LSCHeader } from "@/components/layout/LSCHeader";
import { motion } from "framer-motion";
import { UserCheck, GraduationCap, Medal } from "lucide-react";

const facultyCoordinator = {
  name: "Smt. Namballa Bhagyalakshmi",
  designation: "Faculty Coordinator",
  role: "LSC Faculty Lead"
};

const studentMembers = [
  "Divya Sree K", "Charisma G", "Shehnaz Khaleel", "Madhavi K", 
  "Mihira Chakravarthy", "Manasa Raj", "Kovid Tripathi", 
  "Manoj Rahul M", "Saaketh J", "Vrithav V", 
  "Pavan Krishna", "Harsha Vardhan R", "Sahithi K", 
  "Eswar T", "Amrutha M"
];

const LSCMembers = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LSCHeader activeTab="members" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="space-y-20">
              
              {/* Faculty Coordinator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="text-center space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Legal Services Committee Members</h2>
                  <div className="divider-gold mx-auto" />
                </div>

                <div className="flex justify-center">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="max-w-md w-full p-8 rounded-3xl border-2 border-gold/10 bg-white shadow-elegant text-center space-y-4 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-gold">
                      <Medal className="h-24 w-24" />
                    </div>
                    <div className="h-20 w-20 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
                      <UserCheck className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">{facultyCoordinator.name}</h3>
                    <p className="text-gold font-bold uppercase tracking-widest text-sm">{facultyCoordinator.designation}</p>
                    <div className="pt-4 flex justify-center">
                      <span className="inline-flex items-center rounded-full bg-navy/5 px-4 py-1 text-xs font-bold text-navy uppercase tracking-tighter">
                        {facultyCoordinator.role}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Student Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 flex-shrink-0 bg-gold rounded-full" />
                  <h3 className="font-serif text-2xl font-bold">Student Members</h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {studentMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group p-6 rounded-2xl border bg-card hover:border-gold/30 hover:shadow-md transition-all flex items-center gap-4"
                    >
                      <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-foreground group-hover:text-gold transition-colors">
                        {member}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recruitment Note */}
              <div className="mt-12 p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30 text-center">
                <p className="text-muted-foreground italic leading-relaxed">
                  Student members are selected through a rigorous process of interviews and academic standing, ensuring the committee remains composed of dedicated and ethical individuals.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LSCMembers;
