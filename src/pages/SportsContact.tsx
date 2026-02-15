import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SportsHeader } from "@/components/layout/SportsHeader";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare,
  Send,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SportsContact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Query Submitted",
      description: "Your enquiry has been successfully sent to the Sports Committee.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SportsHeader activeTab="contact" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Contact Committee</h2>
                  <div className="divider-gold" />
                  <p className="text-muted-foreground leading-relaxed">
                    Have questions regarding upcoming fests, selection trials, or sports facility availability? Get in touch with our team.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="grid gap-6">
                   <div className="p-8 rounded-3xl border bg-card shadow-sm hover:border-gold/30 transition-all group">
                      <div className="flex gap-6 items-start">
                         <div className="h-14 w-14 rounded-2xl bg-navy text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                            <Mail className="h-7 w-7" />
                         </div>
                         <div className="space-y-2">
                            <h4 className="font-bold text-navy text-lg">Official Email</h4>
                            <p className="text-muted-foreground">For formal inquiries and administrative matters:</p>
                            <a href="mailto:sports@dsnlu.ac.in" className="text-xl font-serif font-bold text-navy hover:text-gold transition-colors block">
                              sports@dsnlu.ac.in
                            </a>
                         </div>
                      </div>
                   </div>

                   <div className="p-8 rounded-3xl border bg-card shadow-sm hover:border-gold/30 transition-all group">
                      <div className="flex gap-6 items-start">
                         <div className="h-14 w-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                            <ShieldCheck className="h-7 w-7" />
                         </div>
                         <div className="space-y-2">
                            <h4 className="font-bold text-navy text-lg">Physical Director</h4>
                            <p className="text-muted-foreground">Direct contact for facility management and coaching:</p>
                            <div className="text-xl font-serif font-bold text-navy">
                              Mr. O. Manga Raju
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Right Column - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-elegant space-y-8 relative overflow-hidden">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                      <HelpCircle className="h-4 w-4" /> Message Us
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Sports Inquiry Form</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your name" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input type="email" placeholder="Enter email" className="pl-10 h-12" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" placeholder="Enter phone" className="pl-10 h-12" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Subject</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Fest / Selection / Equipment" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Your Message</label>
                      <Textarea 
                        placeholder="Please describe your enquiry in detail..." 
                        className="min-h-[140px] resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-14 bg-navy text-white hover:bg-gold hover:text-navy text-lg font-bold group transition-all duration-300">
                      Submit Inquiry
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

export default SportsContact;
