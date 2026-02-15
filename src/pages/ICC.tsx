import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  FileText, 
  Download, 
  Scale,
  UserCheck,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const committeeMembers = [
  { name: "Dr. B. Soma", designation: "", role: "Chair Person" },
  { name: "Dr. K. Sudha", designation: "", role: "Member" },
  { name: "Dr. V. Sunitha", designation: "", role: "Member" },
  { name: "Dr. N. Bhagyalakshmi", designation: "", role: "Member" },
  { name: "Dr. Aienaparthi Nageswara Rao", designation: "", role: "Member" },
  { name: "Dr. Satyanarayana (Retd.) APTransco", designation: "", role: "Member" },
  { name: "Ms. Aarna Narag (24LLB003)", designation: "Student Member", role: "" },
  { name: "Mr. P. Jagan Balaji (23LLB086)", designation: "Student Member", role: "" },
  { name: "Ms. B.V.L.N. Bhuvaneshwaree (22LLB021)", designation: "Student Member", role: "" },
  { name: "Ms. Ch. I. Satya Divya Sri (21LLB060)", designation: "Student Member", role: "" },
  { name: "Mr. M. Surya Chaitanya Krishna (243YLLB043)", designation: "Student Member", role: "" },
  { name: "Ms. Aabha Jai (23Ph.D./FT/001)", designation: "Student Member", role: "" },
];

const ICC = () => {
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
            <span className="font-medium text-gold uppercase tracking-wider text-[10px] sm:text-[11px]">ICC</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight">
                Internal Complaints <br />
                <span className="text-gold">Committee (ICC)</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-wider relative inline-block">
                    About the ICC
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold/30 rounded-full" />
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed text-justify pt-4">
                    The Internal Complaints Committee (ICC) of DSNLU is constituted in accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. The Committee ensures a safe and dignified environment for students and staff and addresses complaints related to sexual harassment with fairness, confidentiality, and sensitivity.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-navy flex items-center justify-center text-gold">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-navy font-bold uppercase tracking-wider text-sm">Statutory Compliance</p>
                    <p className="text-muted-foreground text-sm">Strictly following Act of 2013 guidelines.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-navy p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/5 transition-all duration-500" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Scale className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">ICC Rules</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Access the complete regulations and guidelines governing the Internal Complaints Committee.
                  </p>
                  <div className="pt-4">
                    <a 
                      href="https://dsnlu.ac.in/storage/2022/12/DSNLU-ICC-Rules_1-1.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full h-16 rounded-2xl bg-gold text-navy font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all group flex items-center justify-center gap-3">
                        <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                        Download ICC Rules (PDF)
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Committee Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy uppercase tracking-wider">
                Committee <span className="text-gold">Members</span>
              </h2>
              <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-[2.5rem] border shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy text-white text-[11px] font-black uppercase tracking-[0.2em]">
                        <th className="px-8 py-6">Name</th>
                        <th className="px-8 py-6">Designation</th>
                        <th className="px-8 py-6">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {committeeMembers.map((member, i) => (
                        <tr key={i} className="hover:bg-gold/5 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <UserCheck className="h-4 w-4 text-gold/50 group-hover:text-gold transition-colors" />
                              <span className="font-bold text-navy tracking-tight">{member.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-muted-foreground font-medium text-sm">
                              {member.designation || "Faculty / Staff"}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            {member.role && (
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                member.role === "Chair Person" ? "bg-gold text-navy" : "bg-secondary text-navy"
                              )}>
                                {member.role}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statutory Note */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto p-10 rounded-[3rem] bg-secondary/30 border-l-8 border-navy flex items-start gap-8">
              <Info className="h-12 w-12 text-gold shrink-0 mt-1" />
              <div className="space-y-4">
                <h4 className="text-navy font-black uppercase tracking-[0.1em] text-lg italic">Important Guidance</h4>
                <p className="text-muted-foreground leading-relaxed">
                  The ICC maintains strict confidentiality regarding all complaints. Any person who has been subjected to sexual harassment or has knowledge of such an incident in the university is encouraged to contact the committee. The redressal process is designed to be supportive, fair, and timely.
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

export default ICC;
