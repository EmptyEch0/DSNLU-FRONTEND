import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Scale, 
  Users, 
  MessageSquare,
  Send,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const committeeMembers = [
  { name: "Dr. A. Nageswara Rao", role: "Convener" },
  { name: "Dr. K. Sudha", role: "Member" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
  { name: "Dr. I. Durga Prasad", role: "Member" },
  { name: "Dr. R. Deepthi", role: "Member" },
];

const ComplaintsRedressal = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint sent successfully!");
  };

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
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Complaints Redressal</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/95 z-0" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider leading-tight">
                Complaints Redressal <br />
                <span className="text-gold">– Caste Based Discrimination</span>
              </h1>
              <div className="mt-6 h-1 w-24 bg-gold rounded-full" />
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Left Side: Authority & Committee */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Contact Authority */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl border shadow-xl overflow-hidden relative"
                >
                  <div className="bg-navy p-1 absolute top-0 left-0 w-full h-2" />
                  <div className="p-8 lg:p-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-navy ring-4 ring-secondary/50">
                        <User className="h-8 w-8 text-gold" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Contact Authority</h3>
                        <p className="text-gold font-bold text-xs uppercase tracking-widest">DSNLU Registrar</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-navy">Dr. Viswachandra Nath M</p>
                          <p className="text-sm font-medium text-muted-foreground">Registrar – In Charge</p>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                          Damodaram Sanjivayya National Law University, <br />
                          NYAYPRASTHA, Visakhapatnam
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <a href="tel:08924248212" className="flex items-center gap-3 text-navy font-bold hover:text-gold transition-colors">
                           <Phone className="h-5 w-5 text-gold" />
                           08924 248212
                        </a>
                        <a href="mailto:registrar@dsnlu.ac.in" className="flex items-center gap-3 text-navy font-bold hover:text-gold transition-colors">
                           <Mail className="h-5 w-5 text-gold" />
                           registrar@dsnlu.ac.in
                        </a>
                        <div className="flex items-center gap-3 text-navy font-bold">
                           <Building2 className="h-5 w-5 text-gold" />
                           Office Section
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Committee Members Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                     <Users className="h-6 w-6 text-gold" />
                     <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Committee Members</h3>
                  </div>
                  
                  <div className="rounded-2xl border overflow-hidden shadow-lg bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-navy text-white text-xs uppercase tracking-[0.2em]">
                          <th className="px-8 py-5 font-bold">Name</th>
                          <th className="px-8 py-5 font-bold">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {committeeMembers.map((member, i) => (
                          <tr key={i} className="hover:bg-gold/5 transition-colors group">
                            <td className="px-8 py-5 font-bold text-navy group-hover:text-gold transition-colors">{member.name}</td>
                            <td className="px-8 py-5">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                member.role === "Convener" ? "bg-navy text-white" : "bg-secondary text-navy"
                              )}>
                                {member.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Complaint Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-[2rem] border-t-4 border-gold shadow-2xl overflow-hidden sticky top-28">
                  <div className="p-8 border-b">
                     <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Complaint Box</h3>
                     <p className="text-sm text-muted-foreground mt-1">Submit your complaint confidentially.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Name (Required)</label>
                      <Input required className="rounded-xl border-navy/5 focus:ring-gold focus:border-gold h-12" />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Email</label>
                        <Input type="email" className="rounded-xl border-navy/5 focus:ring-gold focus:border-gold h-12" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Phone</label>
                        <Input className="rounded-xl border-navy/5 focus:ring-gold focus:border-gold h-12" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Reason for Contact</label>
                      <Select>
                        <SelectTrigger className="rounded-xl border-navy/5 focus:ring-gold focus:border-gold h-12">
                          <SelectValue placeholder="Select Reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discrimination">Caste Discrimination</SelectItem>
                          <SelectItem value="academic">Academic Issue</SelectItem>
                          <SelectItem value="hostel">Hostel Issue</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Select Department</label>
                      <Select>
                        <SelectTrigger className="rounded-xl border-navy/5 focus:ring-gold focus:border-gold h-12">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ug">Undergraduate (B.A. LL.B.)</SelectItem>
                          <SelectItem value="pg">Postgraduate (LL.M.)</SelectItem>
                          <SelectItem value="staff">Staff/Faculty</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Message</label>
                      <Textarea placeholder="How can we help?" className="rounded-2xl border-navy/5 focus:ring-gold focus:border-gold min-h-[100px]" />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-navy text-white font-bold hover:bg-gold hover:text-navy group transition-all duration-300">
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Button>
                    
                    <div className="text-center pt-2">
                       <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1.5 uppercase font-bold tracking-widest">
                          <ShieldCheck className="h-3 w-3 text-gold" /> ISO 9001:2015 Information Security
                       </p>
                    </div>
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

export default ComplaintsRedressal;
