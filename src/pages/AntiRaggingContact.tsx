import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  AlertOctagon, 
  Phone, 
  Mail, 
  Building2, 
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AntiRaggingContact = () => {
  const antiRaggingCommittee = [
    { type: "Chairman", name: "Prof. D. Surya Prakasa Rao", designation: "Vice-Chancellor", mobile: "-", email: "vc@dsnlu.ac.in" },
    { type: "Convenor", name: "Prof. Nandini C.P.", designation: "Professor", mobile: "-", email: "nandini@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Dayanand Murthy C.P.", designation: "Associate Professor", mobile: "-", email: "dmurthy@dsnlu.ac.in" },
    { type: "Member", name: "Dr. P. Jogi Naidu", designation: "Assistant Professor", mobile: "-", email: "joginaidu@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Bharat Kumar .R", designation: "Assistant Professor", mobile: "-", email: "bharat@dsnlu.ac.in" },
    { type: "Member", name: "Dr. N. Bhagya Lakshmi", designation: "Assistant Professor", mobile: "-", email: "bhagya@dsnlu.ac.in" },
    { type: "Member", name: "Dr. Ch. Lakshmi", designation: "Assistant Professor", mobile: "-", email: "lakshmi@dsnlu.ac.in" },
    { type: "Member", name: "Dr. A. Nageswara Rao", designation: "Assistant Professor", mobile: "-", email: "nagesh@dsnlu.ac.in" },
    { type: "External", name: "Police Officials", designation: "Law Enforcement", mobile: "-", email: "-" },
    { type: "Hostel", name: "Wardens", designation: "Residential Oversight", mobile: "-", email: "-" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <ComplaintsHeader activeTab="anti-ragging" />
      
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {/* Helpline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f2d5c] p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Phone size={120} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9a227] mb-4">National Helpline</h4>
                <div className="space-y-6">
                  <p className="text-2xl font-bold leading-tight">24×7 Toll Free Helpline</p>
                  <p className="text-4xl font-serif font-bold text-[#c9a227]">1800-180-5522</p>
                  <div className="space-y-2 text-sm font-medium">
                    <a href="mailto:helpline@antiragging.in" className="flex items-center gap-2 hover:text-[#c9a227] transition-colors">
                      <Mail className="h-4 w-4" /> helpline@antiragging.in
                    </a>
                    <a href="https://www.antiragging.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#c9a227] transition-colors">
                      <ShieldCheck className="h-4 w-4" /> www.antiragging.in
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Monitoring Agency */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#f8f9fa] p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8"
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">UGC Monitoring Agency</h4>
                <div className="space-y-6">
                  <p className="text-2xl font-serif font-bold text-[#0f2d5c]">Centre for Youth (C4Y)</p>
                  <div className="space-y-3 text-sm font-bold">
                    <a href="mailto:antiragging@c4yindia.org" className="flex items-center gap-3 text-gray-600 hover:text-[#0f2d5c] transition-colors">
                      <Mail className="h-4 w-4 text-[#c9a227]" /> antiragging@c4yindia.org
                    </a>
                    <a href="https://www.c4yindia.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#0f2d5c] transition-colors">
                      <Building2 className="h-4 w-4 text-[#c9a227]" /> www.c4yindia.org
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Warning Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 p-10 rounded-[2.5rem] border-2 border-dashed border-red-200 shadow-xl space-y-6 flex flex-col justify-center text-center"
              >
                <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2">
                  <AlertOctagon className="h-8 w-8" />
                </div>
                <p className="font-serif text-lg font-bold text-red-700 leading-tight uppercase">
                  RAGGING IS A CRIMINAL OFFENCE AND THE CULPRITS WILL ATTRACT PUNITIVE ACTION AS PER UGC REGULATIONS.
                </p>
                <a 
                  href="https://www.antiragging.in/assets/pdf/annexure/Annexure-I.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors pt-4 border-t border-red-100"
                >
                  <FileText className="h-4 w-4" /> View UGC Regulations
                </a>
              </motion.div>
            </div>

            <div className="space-y-8">
              <div className="text-left">
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">ANTI-RAGGING COMMITTEE (ARC)</h2>
                <div className="mt-2 h-1 w-20 bg-[#c9a227]" />
              </div>
              
              <div className="rounded-[2rem] border border-gray-100 overflow-hidden shadow-elegant bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#0f2d5c] text-white text-[10px] uppercase font-black tracking-[0.1em]">
                        <th className="px-6 py-5">Type / Position</th>
                        <th className="px-6 py-5">Hon'ble Member</th>
                        <th className="px-6 py-5">Designation</th>
                        <th className="px-6 py-5">Mobile</th>
                        <th className="px-6 py-5">Official Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {antiRaggingCommittee.map((m, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-5">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                              m.type === "Chairman" || m.type === "Convenor" ? "bg-[#c9a227] text-white" : "bg-gray-100 text-gray-500"
                            )}>
                              {m.type}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-bold text-[#0f2d5c] group-hover:text-[#c9a227] transition-colors">{m.name}</td>
                          <td className="px-6 py-5 text-gray-500 text-sm font-medium">{m.designation}</td>
                          <td className="px-6 py-5 text-gray-600 text-sm font-mono">{m.mobile}</td>
                          <td className="px-6 py-5 text-gray-400">
                            {m.email !== "-" ? (
                              <a href={`mailto:${m.email}`} className="hover:text-[#0f2d5c] transition-colors">
                                <Mail className="h-4 w-4" />
                              </a>
                            ) : "-"}
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
      </main>

      <Footer />
    </div>
  );
};

export default AntiRaggingContact;
