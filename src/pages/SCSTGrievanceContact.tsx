import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  MessageSquare,
  Send,
  HelpCircle,
  Inbox
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const SCSTGrievanceContact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "Your grievance has been successfully submitted to the SC/ST Cell.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="grievance" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Left Column - Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Grievance Redressal Mechanism</h2>
                  <div className="divider-gold" />
                  <p className="text-muted-foreground leading-relaxed">
                    The SC/ST Welfare Cell provides a transparent and accessible system for the redressal of grievances related to discrimination, exclusion, or any other welfare concerns. Students and staff are encouraged to report any issues they encounter within the university premises.
                  </p>
                  
                  <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 space-y-4">
                    <div className="flex items-center gap-3 text-gold">
                      <Inbox className="h-6 w-6" />
                      <h4 className="font-bold uppercase tracking-tight">Drop Box Information</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For those who prefer to submit grievances anonymously, a dedicated **SC/ST Cell Drop Box** is available in the Administrative Building (Ground Floor). You may drop your written complaints or suggestions at any time during university hours.
                    </p>
                  </div>
                </div>

                {/* Contact Information Cards */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold">Contact Personals</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-6 rounded-xl border bg-card shadow-sm hover:border-gold/30 transition-colors">
                      <h4 className="font-bold text-navy mb-1">Chairperson</h4>
                      <p className="text-sm text-foreground mb-4">Prof. (Dr.) D. Surya Prakasa Rao</p>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" /> vc@dsnlu.ac.in
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-xl border bg-card shadow-sm hover:border-gold/30 transition-colors">
                      <h4 className="font-bold text-navy mb-1">Covenor Secretary</h4>
                      <p className="text-sm text-foreground mb-4">Dr. B. Ravi Seva Naik</p>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" /> ravisenaik@dsnlu.ac.in
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border bg-card space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 text-navy">
                      <MapPin className="h-4 w-4 text-gold" />
                      <h4 className="font-bold">Cell Address</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      SC/ST Welfare Cell, Room No. 102,<br />
                      Damodaram Sanjivayya National Law University,<br />
                      Sabbavaram, Visakhapatnam – 531035, AP
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Complaint Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border bg-card p-8 shadow-elegant space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <MessageSquare className="h-32 w-32" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                      <HelpCircle className="h-4 w-4" /> Reach Out
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Online Complaint Form</h3>
                    <p className="text-sm text-muted-foreground">Feel free to share your concerns. Your privacy is our priority.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter your name" className="pl-10 h-12" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="email" placeholder="Enter your email" className="pl-10 h-12" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" placeholder="Enter phone" className="pl-10 h-12" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Department</label>
                        <Select required>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic Affairs</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="hostel">Hostel & Campus</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Reason for contact</label>
                      <Input placeholder="Brief subject of grievance" className="h-12" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Detailed Message</label>
                      <Textarea 
                        placeholder="Please describe your grievance in detail..." 
                        className="min-h-[150px] resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-14 bg-navy text-white hover:bg-navy-light text-lg font-bold group">
                      Submit Complaint
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

export default SCSTGrievanceContact;
