import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Users, 
  UserCheck, 
  GraduationCap,
  ShieldCheck,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const facultyMembers = [
  { name: "Dr. B. Soma", designation: "", role: "Chair Person" },
  { name: "Dr. K. Sudha", designation: "", role: "Member" },
  { name: "Dr. V. Sunitha", designation: "", role: "Member" },
  { name: "Dr. N. Bhagyalakshmi", designation: "", role: "Member" },
  { name: "Dr. Aienaparthi Nageswara Rao", designation: "", role: "Member" },
  { name: "Dr. Satyanarayana (Retd.) APTransco", designation: "", role: "Member" },
];

const studentMembers = [
  { name: "Ms. Aarna Narag (24LLB003)", designation: "Student Member" },
  { name: "Mr. P. Jagan Balaji (23LLB086)", designation: "Student Member" },
  { name: "Ms. B.V.L.N. Bhuvaneshwaree (22LLB021)", designation: "Student Member" },
  { name: "Ms. Ch. I. Satya Divya Sri (21LLB060)", designation: "Student Member" },
  { name: "Mr. M. Surya Chaitanya Krishna (243YLLB043)", designation: "Student Member" },
  { name: "Ms. Aabha Jai (23Ph.D./FT/001)", designation: "Student Member" },
];

const ICCMembers = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold text-xs sm:text-sm">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground text-xs sm:text-sm">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground text-xs sm:text-sm">ICC</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">Members</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight">
                ICC <br />
                <span className="text-gold">Committee Members</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Faculty Members */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="space-y-12">
               <div className="flex items-center gap-4 border-b-2 border-gold/20 pb-4">
                  <ShieldCheck className="h-8 w-8 text-gold" />
                  <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Faculty & Staff Members</h2>
               </div>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facultyMembers.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-8 rounded-3xl bg-white border border-navy/5 shadow-xl hover:shadow-2xl hover:border-gold/30 transition-all text-center flex flex-col items-center"
                    >
                       <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-all ring-4 ring-gold/20">
                          <UserCheck className="h-8 w-8" />
                       </div>
                       <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors">{member.name}</h3>
                       <p className="mt-2 text-gold font-black uppercase tracking-widest text-xs">{member.role || "Member"}</p>
                       <div className="mt-6 pt-6 border-t border-secondary w-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          University Administration
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Student Members */}
        <section className="py-20 lg:py-32 bg-secondary/30">
          <div className="container">
            <div className="space-y-12">
               <div className="flex items-center gap-4 border-b-2 border-navy/10 pb-4 justify-end">
                  <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider">Student Members</h2>
                  <GraduationCap className="h-8 w-8 text-gold" />
               </div>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {studentMembers.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-6 rounded-2xl bg-white border shadow-md hover:shadow-xl transition-all border-l-4 border-l-gold"
                    >
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-navy flex items-center justify-center text-white">
                             <Users className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                             <h4 className="font-bold text-navy text-sm leading-tight">{member.name}</h4>
                             <p className="text-[10px] font-black uppercase tracking-wider text-gold">Student Representative</p>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-20">
          <div className="container text-center">
             <div className="max-w-2xl mx-auto p-10 rounded-full bg-navy text-white font-serif italic text-lg shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gold/5 opacity-50" />
                <span className="relative z-10">"Ensuring a safe, equitable, and empowered university community for all."</span>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ICCMembers;
