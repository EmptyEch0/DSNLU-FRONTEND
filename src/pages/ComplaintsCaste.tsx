import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  Scale, 
  Send,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ComplaintsCaste = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint submitted successfully! An official will contact you shortly.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <ComplaintsHeader activeTab="complaints" />
      
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">
                COMPLAINTS FOR LODGING CASTE-BASED DISCRIMINATION (SC/ST/OBC)
              </h2>
              <div className="mt-2 h-1 w-20 bg-[#c9a227]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Side: Information Block */}
              <div className="lg:col-span-7 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#f8f9fa] p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-[#0f2d5c] flex items-center justify-center text-white shadow-lg">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#c9a227]">Registrar - In Charge</p>
                      <h3 className="font-serif text-2xl font-bold text-[#0f2d5c]">Dr. Viswachandra Nath M</h3>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-1" />
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Damodaram Sanjivayya National Law University<br />
                          Nyayaprastha, Sabbavaram, Visakhapatnam – 531035
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <a href="tel:08924248212" className="flex items-center gap-3 text-[#0f2d5c] font-bold hover:text-[#c9a227] transition-colors group">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Phone className="h-4 w-4 text-[#c9a227]" />
                        </div>
                        08924 248212
                      </a>
                      <a href="mailto:registrar@dsnlu.ac.in" className="flex items-center gap-3 text-[#0f2d5c] font-bold hover:text-[#c9a227] transition-colors group">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Mail className="h-4 w-4 text-[#c9a227]" />
                        </div>
                        registrar@dsnlu.ac.in
                      </a>
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <h4 className="font-serif text-xl font-bold text-[#0f2d5c] flex items-center gap-3">
                    <Users className="h-6 w-6 text-[#c9a227]" />
                    Complaints Redressal Cell Members
                  </h4>
                  <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-elegant bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0f2d5c] text-white text-[10px] uppercase font-black tracking-[0.2em]">
                            <th className="px-8 py-5">Name</th>
                            <th className="px-8 py-5">Role</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {[
                            { name: "Dr. A. Nageswara Rao", role: "Convener" },
                            { name: "Dr. K. Sudha", role: "Member" },
                            { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
                            { name: "Dr. I. Durga Prasad", role: "Member" },
                            { name: "Dr. R. Deepthi", role: "Member" },
                          ].map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-8 py-5 font-bold text-[#0f2d5c]">{item.name}</td>
                              <td className="px-8 py-5">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                  item.role === "Convener" ? "bg-[#0f2d5c] text-white" : "bg-gray-100 text-gray-600"
                                )}>
                                  {item.role}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Complaint Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden sticky top-28">
                  <div className="bg-[#0f2d5c] p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Scale size={100} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight">Complaint Box</h3>
                    <p className="text-gray-300 text-xs mt-1 font-medium tracking-wide uppercase">Submit your complaint confidentially</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name (Required)</label>
                      <Input required className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" />
                    </div>
                    
                    <div className="space-y-1.5 text-left uppercase">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Student', 'Teacher', 'Staff'].map((cat) => (
                          <div key={cat} className="relative">
                            <input type="radio" name="category" id={cat} className="peer hidden" />
                            <label htmlFor={cat} className="flex items-center justify-center p-3 text-[10px] font-bold border rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-[#0f2d5c] peer-checked:bg-[#0f2d5c] peer-checked:text-white transition-all">
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <Input type="email" className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile</label>
                        <Input className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                      <Input className="rounded-xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] h-12" />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complaint Description</label>
                      <Textarea placeholder="Provide detailed information regarding the incident..." className="rounded-2xl border-gray-100 focus:ring-[#c9a227] focus:border-[#c9a227] min-h-[120px]" />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Supporting Document</label>
                      <div className="relative group/file">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="p-4 border-2 border-dashed rounded-2xl flex items-center justify-center gap-3 text-gray-400 group-hover/file:bg-gray-50 group-hover/file:border-[#c9a227] transition-all">
                          <FileText className="h-5 w-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">Select PDF / Image</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-[#0f2d5c] text-white font-bold hover:bg-[#1a3d7c] group shadow-lg mt-4">
                      Submit Official Complaint
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Button>
                  </form>
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

export default ComplaintsCaste;
