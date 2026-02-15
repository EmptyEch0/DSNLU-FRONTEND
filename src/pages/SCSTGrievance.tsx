import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Scale, 
  FileText, 
  Mail,
  Phone,
  MessageSquare,
  ClipboardList,
  Inbox,
  Send,
  AlertCircle
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

const SCSTGrievance = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Grievance submitted successfully!");
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
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">SC/ST Grievance</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/90 z-0" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
            >
              SC/ST <span className="text-gold">Grievance Redressal</span>
            </motion.h1>
            <div className="mt-4 h-1 w-24 bg-gold mx-auto rounded-full" />
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Info & Procedure */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-tight relative inline-block">
                    Introduction
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold/30 rounded-full" />
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                    SC/ST students and employees may approach the Coordinator of the SC/ST Cell for redressal of any grievances related to academic, administrative, or social issues. The Coordinator regularly interacts with the concerned individuals to understand their concerns and takes appropriate action or provides necessary guidance and support.
                  </p>
                </div>

                <div className="bg-secondary/30 p-8 rounded-[2rem] border-l-8 border-gold space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-navy flex items-center justify-center text-gold">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">Procedure to File a Complaint</h3>
                  </div>
                  <ul className="space-y-4 font-medium text-navy/80">
                    <li className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">1</div>
                      <p>A written complaint may be submitted to the Coordinator, SC/ST Cell.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">2</div>
                      <div className="space-y-2">
                        <p>A Drop Box is available in the SC/ST Cell office for physical submissions.</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50 border border-navy/5 text-xs text-navy font-bold">
                           <Inbox className="h-3 w-3 text-gold" /> SC/ST Cell Office, DSNLU
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Right Column: Grievance Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-white rounded-[2.5rem] shadow-2xl border overflow-hidden">
                  <div className="bg-navy p-8 text-white">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-6 w-6 text-gold" />
                      <h3 className="text-xl font-bold uppercase tracking-wider">Grievance Form</h3>
                    </div>
                    <p className="text-white/60 text-sm mt-2">Please fill in the details below to submit your grievance.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Name</label>
                        <Input required placeholder="Your Full Name" className="rounded-xl border-navy/10 focus:ring-gold focus:border-gold h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Email</label>
                        <Input type="email" placeholder="email@example.com" className="rounded-xl border-navy/10 focus:ring-gold focus:border-gold h-12" />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Phone</label>
                        <Input placeholder="+91 00000 00000" className="rounded-xl border-navy/10 focus:ring-gold focus:border-gold h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Reason For Contact</label>
                        <Select>
                          <SelectTrigger className="rounded-xl border-navy/10 focus:ring-gold focus:border-gold h-12">
                            <SelectValue placeholder="Select Reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic Grievance</SelectItem>
                            <SelectItem value="administrative">Administrative Grievance</SelectItem>
                            <SelectItem value="social">Social Issues</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Select Department</label>
                      <Select>
                        <SelectTrigger className="rounded-xl border-navy/10 focus:ring-gold focus:border-gold h-12">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="law">School of Law</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                          <SelectItem value="hostel">Hostel Affairs</SelectItem>
                          <SelectItem value="exams">Examination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy uppercase tracking-widest ml-1">Message</label>
                      <Textarea placeholder="Describe your grievance in detail..." className="rounded-2xl border-navy/10 focus:ring-gold focus:border-gold min-h-[120px]" />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-navy text-white font-bold text-lg hover:bg-gold hover:text-navy group transition-all duration-300 shadow-lg hover:shadow-gold/20">
                      Submit Grievance
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

export default SCSTGrievance;
