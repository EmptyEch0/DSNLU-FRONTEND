import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LSCHeader } from "@/components/layout/LSCHeader";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  MessageSquare,
  Send,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const LSCContact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted",
      description: "We have received your message and will get back to you soon.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LSCHeader activeTab="contact" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Get In Touch</h2>
                  <div className="divider-gold" />
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    Have questions about legal aid services or want to participate in our outreach programs? Reach out to us.
                  </p>
                </div>

                {/* Address Card */}
                <div className="p-8 rounded-3xl border bg-card shadow-sm space-y-6 relative overflow-hidden group">
                   <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                      <MapPin className="h-6 w-6" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-navy text-lg">University Address</h4>
                      <address className="not-italic text-muted-foreground leading-relaxed">
                        Damodaram Sanjivayya National Law University<br />
                        NYAYAPRASTHA, Sabbavaram<br />
                        Visakhapatnam – 531035<br />
                        Andhra Pradesh, India
                      </address>
                   </div>
                </div>

                {/* Email Contacts */}
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gold" /> Email Contacts
                  </h4>
                  <div className="p-6 rounded-2xl border bg-card flex items-start gap-4 shadow-sm hover:border-gold/30 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gold/5 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-bold text-navy">Divya Shree Kamana</h5>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Student Coordinator</p>
                      <a href="mailto:divyasreekamana@dsnlu.ac.in" className="text-sm text-gold hover:underline mt-1 block">
                        divyasreekamana@dsnlu.ac.in
                      </a>
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
                      <HelpCircle className="h-4 w-4" /> Inquiry
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Online Enquiry Form</h3>
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
                        <HelpCircle className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Subject of inquiry" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Your Message</label>
                      <Textarea 
                        placeholder="How can we help you?" 
                        className="min-h-[140px] resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-14 bg-navy text-white hover:bg-gold hover:text-navy text-lg font-bold group transition-all duration-300">
                      Send Message
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

export default LSCContact;
