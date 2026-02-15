import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  AlertTriangle, 
  Phone, 
  Mail, 
  Globe, 
  ShieldAlert, 
  Users, 
  FileText,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const committeeMembers = [
  { type: "Chairman", name: "Prof. D. Surya Prakasa Rao", designation: "Vice Chancellor", mobile: "08924 248234", email: "vc@dsnlu.ac.in" },
  { type: "Convenor", name: "Prof. Nandini C.P.", designation: "Professor of Law", mobile: "+91 91772 37622", email: "nandinicp@dsnlu.ac.in" },
  { type: "Member", name: "Dr. Dayanand Murthy C.P.", designation: "Associate Professor", mobile: "+91 98485 23789", email: "dayanand@dsnlu.ac.in" },
  { type: "Member", name: "Dr. P. Jogi Naidu", designation: "Associate Professor", mobile: "+91 94401 24707", email: "joginaidu@dsnlu.ac.in" },
  { type: "Member", name: "Dr. Bharat Kumar R.", designation: "Assistant Professor", mobile: "+91 99661 14455", email: "bharatkumar@dsnlu.ac.in" },
  { type: "Member", name: "Dr. N. Bhagya Lakshmi", designation: "Assistant Professor", mobile: "+91 94403 64246", email: "bhagyalakshmi@dsnlu.ac.in" },
  { type: "Member", name: "Dr. Ch. Lakshmi", designation: "Assistant Professor", mobile: "+91 94403 14567", email: "lakshmi@dsnlu.ac.in" },
  { type: "Member", name: "Dr. A. Nageswara Rao", designation: "Assistant Professor", mobile: "+91 83418 71919", email: "nageswararao@dsnlu.ac.in" },
  { type: "Police Rep", name: "Circle Inspector of Police", designation: "Sabbavaram PS", mobile: "08924 248210", email: "-" },
  { type: "Warden", name: "Dr. Rifat Khan", designation: "Girls Hostel", mobile: "+91 94943 14567", email: "rifat@dsnlu.ac.in" },
];

const AntiRagging = () => {
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
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Anti-Ragging</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay z-1" />
          <div className="container relative z-10 text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 rounded-full bg-red-600/20 border border-red-600/30 text-red-500 font-bold text-xs uppercase tracking-[0.2em] mb-4"
            >
              Zero Tolerance Policy
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight">
              National Ragging <br />
              <span className="text-gold">Prevention Programme</span>
            </h1>
            <div className="mt-6 h-1 w-32 bg-gold mx-auto rounded-full" />
          </div>
        </section>

        <section className="py-16">
          <div className="container space-y-16">
            
            {/* Warning Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-[2.5rem] border-4 border-dashed border-red-400 bg-red-50 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-red-600/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="h-20 w-20 bg-red-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl animate-pulse">
                  <AlertTriangle className="h-10 w-10" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-700 uppercase tracking-tight">
                    Ragging is a Criminal Offence
                  </h2>
                  <p className="text-lg sm:text-xl text-red-900 font-medium max-w-2xl mx-auto leading-relaxed italic">
                    "Ragging in any form is strictly prohibited on the campus and is a punishable offence under the UGC Regulations."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Helpline Section */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-navy text-white rounded-[2rem] p-10 space-y-8 relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80')] opacity-5 bg-cover grayscale" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold ring-1 ring-gold/30 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                      <Phone className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">National Helpline</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">National Anti-Ragging Helpline</p>
                       <p className="text-3xl font-black text-gold">1800-180-5522</p>
                       <p className="text-sm font-bold text-white/70 mt-1">24×7 Toll Free Service</p>
                    </div>

                    <div className="grid gap-4">
                       <a href="mailto:helpline@antiragging.in" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy transition-all duration-300 font-bold group/link">
                          <Mail className="h-5 w-5 text-gold group-hover/link:text-navy" />
                          helpline@antiragging.in
                       </a>
                       <a href="https://www.antiragging.in" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy transition-all duration-300 font-bold group/link">
                          <Globe className="h-5 w-5 text-gold group-hover/link:text-navy" />
                          www.antiragging.in
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-secondary rounded-[2rem] p-10 space-y-8 relative overflow-hidden group"
              >
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-navy ring-1 ring-navy/10 group-hover:bg-navy group-hover:text-white transition-all duration-500">
                      <ShieldAlert className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy uppercase tracking-tight">Monitoring Agency</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-secondary/40 border border-navy/5">
                       <p className="text-navy/50 text-xs font-bold uppercase tracking-widest mb-2 font-['Inter']">UGC Monitoring Agency</p>
                       <p className="text-xl font-bold text-navy leading-tight">Centre for Youth (C4Y)</p>
                    </div>

                    <div className="grid gap-4">
                       <a href="mailto:antiragging@c4yindia.org" className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-navy/5 hover:bg-navy hover:text-white transition-all duration-300 font-bold group/link text-navy">
                          <Mail className="h-5 w-5 text-gold" />
                          antiragging@c4yindia.org
                       </a>
                       <a href="https://www.c4yindia.org" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-navy/5 hover:bg-navy hover:text-white transition-all duration-300 font-bold group/link text-navy">
                          <Globe className="h-5 w-5 text-gold" />
                          www.c4yindia.org
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Committee Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-secondary pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-gold" />
                    <h2 className="text-3xl font-serif font-bold text-navy uppercase tracking-tight">Anti-Ragging Committee</h2>
                  </div>
                  <p className="text-muted-foreground font-medium">Statutory committee ensuring a ragging-free campus environment.</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold uppercase tracking-widest border-b-4 border-gold">
                   Academic Year 2025-26
                </div>
              </div>

              <div className="rounded-[2.5rem] border shadow-2xl bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy text-white text-xs uppercase tracking-[0.2em] font-black">
                        <th className="px-8 py-6">Type</th>
                        <th className="px-8 py-6">Person Name</th>
                        <th className="px-8 py-6">Designation</th>
                        <th className="px-8 py-6 whitespace-nowrap">Mobile No.</th>
                        <th className="px-8 py-6">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {committeeMembers.map((member, i) => (
                        <tr key={i} className="hover:bg-gold/5 transition-colors group">
                          <td className="px-8 py-5">
                             <span className={cn(
                               "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                               member.type === "Chairman" ? "bg-red-600 text-white" : 
                               member.type === "Convenor" ? "bg-gold text-navy" : "bg-secondary text-navy"
                             )}>
                               {member.type}
                             </span>
                          </td>
                          <td className="px-8 py-5 font-bold text-navy tracking-tight">{member.name}</td>
                          <td className="px-8 py-5 text-muted-foreground font-medium">{member.designation}</td>
                          <td className="px-8 py-5 font-bold text-navy">
                             {member.mobile !== "-" ? (
                               <a href={`tel:${member.mobile.replace(/\s/g, "")}`} className="hover:text-gold transition-colors flex items-center gap-2">
                                 <Phone className="h-3.5 w-3.5 text-gold/50" />
                                 {member.mobile}
                               </a>
                             ) : "-"}
                          </td>
                          <td className="px-8 py-5 font-medium text-foreground/70 italic">
                             {member.email !== "-" ? (
                               <a href={`mailto:${member.email}`} className="hover:text-gold transition-colors flex items-center gap-2">
                                 <Mail className="h-3.5 w-3.5 text-gold/50" />
                                 {member.email}
                               </a>
                             ) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Statutory Note */}
            <div className="bg-secondary/30 p-8 rounded-3xl flex items-start gap-6 border-l-8 border-navy">
               <Info className="h-10 w-10 text-gold shrink-0" />
               <div className="space-y-2">
                  <h4 className="text-navy font-bold uppercase tracking-wider text-sm">Statutory Regulations</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     As per the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, DSNLU has zero tolerance towards ragging. Students are required to submit anti-ragging affidavits at the time of admission.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                     <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-navy bg-white px-4 py-2 rounded-lg border border-navy/5 hover:border-gold hover:text-gold transition-all">
                        <FileText className="h-4 w-4" /> Download UGC Regs
                     </button>
                     <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-navy bg-white px-4 py-2 rounded-lg border border-navy/5 hover:border-gold hover:text-gold transition-all">
                        <FileText className="h-4 w-4" /> Anti-Ragging Affidavit
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AntiRagging;
