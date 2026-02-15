import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Users, 
  ShieldCheck, 
  UserRound, 
  Scale, 
  Building2,
  ChevronDown,
  Contact
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const scstCommittee = [
  { name: "Dr. A. Nageswara Rao", role: "Chairperson", dept: "Administration" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member", dept: "Faculty" },
  { name: "Dr. Rifat Khan", role: "Member", dept: "Faculty" },
  { name: "Dr. R. Deepthi", role: "Member", dept: "Faculty" },
  { name: "Ms. Sherley Hepsiba Dokiburra", role: "Member", dept: "Faculty" },
  { name: "Ms. D. Aparna", role: "Member", dept: "Staff" },
  { name: "Dr. Viswachandra Nath. M", role: "Secretary", dept: "Faculty" },
];

const complaintCommittee = [
  { name: "Dr. A. Nageswara Rao", role: "Convener" },
  { name: "Dr. K. Sudha", role: "Member" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
  { name: "Dr. I. Durga Prasad", role: "Member" },
  { name: "Dr. R. Deepthi", role: "Member" },
];

const antiRaggingCommittee = [
  { name: "Prof. D. Surya Prakasa Rao", role: "Chairman / Vice Chancellor" },
  { name: "Prof. Nandini C.P.", role: "Convenor" },
  { name: "Dr. Dayanand Murthy C.P.", role: "Member" },
  { name: "Dr. P. Jogi Naidu", role: "Member" },
  { name: "Dr. Bharat Kumar R.", role: "Member" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
  { name: "Dr. Ch. Lakshmi", role: "Member" },
];

const wardens = [
  { name: "Dr. P. Jogi Naidu", role: "Chief Warden" },
  { name: "Dr. Dayanand Murthy C.P.", role: "Warden (Boys Hostel)" },
  { name: "Dr. Rifat Khan", role: "Warden (Girls Hostel)" },
  { name: "Dr. R. Deepthi", role: "Warden (Girls Hostel)" },
];

const GrievanceCommittees = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Grievance Redressal</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Committee Members</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
            >
              Grievance <span className="text-gold">Committees</span>
            </motion.h1>
            <div className="mt-6 h-1 w-24 bg-gold mx-auto rounded-full" />
            <p className="mt-4 text-white/60 font-medium max-w-2xl mx-auto">
              DSNLU maintains dedicated committees to ensure fair treatment and swift resolution of all student and campus-related grievances.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-5xl">
            <Accordion type="single" collapsible className="space-y-6">
              
              {/* SC/ST Cell Committee */}
              <AccordionItem value="scst" className="border rounded-3xl px-8 bg-white overflow-hidden shadow-elegant hover:border-gold/30 transition-all group">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="h-7 w-7 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">SC/ST Cell Committee</h3>
                      <p className="text-xs font-bold text-gold uppercase tracking-[0.2em]">7 Members</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    {scstCommittee.map((member, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-navy/5 space-y-3 group/card hover:bg-white hover:shadow-xl transition-all duration-300">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-navy shadow-sm group-hover/card:bg-navy group-hover/card:text-white transition-all">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-navy leading-tight">{member.name}</p>
                          <p className="text-xs text-gold font-bold uppercase tracking-wider mt-1">{member.role}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2">{member.dept}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Complaints Redressal Committee */}
              <AccordionItem value="complaints" className="border rounded-3xl px-8 bg-white overflow-hidden shadow-elegant hover:border-gold/30 transition-all group">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <Scale className="h-7 w-7 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Complaints Redressal Committee</h3>
                      <p className="text-xs font-bold text-gold uppercase tracking-[0.2em]">5 Members</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-4">
                   <div className="rounded-2xl border overflow-hidden">
                      <table className="w-full text-left">
                        <tr className="bg-navy text-white text-[10px] font-black uppercase tracking-[0.2em]">
                          <th className="px-8 py-5">Name</th>
                          <th className="px-8 py-5">Role</th>
                        </tr>
                        {complaintCommittee.map((m, i) => (
                          <tr key={i} className="border-t hover:bg-gold/5 transition-colors">
                            <td className="px-8 py-5 font-bold text-navy">{m.name}</td>
                            <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-black uppercase tracking-widest text-navy">
                                {m.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </table>
                   </div>
                </AccordionContent>
              </AccordionItem>

              {/* Anti-Ragging Committee */}
              <AccordionItem value="antiragging" className="border rounded-3xl px-8 bg-white overflow-hidden shadow-elegant hover:border-gold/30 transition-all group">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <Users className="h-7 w-7 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Anti-Ragging Committee</h3>
                      <p className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Policy Oversight</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-4">
                  <div className="space-y-4 max-w-2xl">
                     {antiRaggingCommittee.map((m, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-navy/5">
                         <span className="font-bold text-navy">{m.name}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-gold text-right">{m.role}</span>
                       </div>
                     ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Wardens */}
              <AccordionItem value="wardens" className="border rounded-3xl px-8 bg-white overflow-hidden shadow-elegant hover:border-gold/30 transition-all group font-serif">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left font-['Inter']">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <Building2 className="h-7 w-7 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">University Wardens</h3>
                      <p className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Hostel Oversight</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-4">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {wardens.map((w, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-secondary/30 rounded-[2rem] border border-navy/5 shadow-sm group/w hover:bg-navy hover:text-white transition-all duration-500">
                         <div className="h-12 w-12 rounded-full border-2 border-gold flex items-center justify-center bg-white group-hover/w:bg-white/10 group-hover/w:border-white transition-all">
                            <Contact className="h-6 w-6 text-navy group-hover/w:text-gold" />
                         </div>
                         <div>
                            <p className="font-black uppercase tracking-tight leading-tight">{w.name}</p>
                            <p className="text-xs font-bold text-gold uppercase tracking-widest mt-1">{w.role}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GrievanceCommittees;
