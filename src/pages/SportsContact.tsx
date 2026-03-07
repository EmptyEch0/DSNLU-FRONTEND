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
  ShieldCheck,
  Pencil,
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

interface SportsContactInfo {
  id: number;
  title: string;
  description: string;
  official_email: string;
  official_email_note: string;
  physical_director_name: string;
  physical_director_note: string;
}

const SportsContact = () => {
  const { token } = useAdmin();
  const [contact, setContact] = useState<SportsContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<SportsContactInfo>>({});

  const fetchContact = async () => {
    try {
      const res = await fetch(`${API}/api/sports/contact`);
      const data = await res.json();
      setContact(data);
      setEditForm(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contact info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const res = await fetch(`${API}/api/sports/contact/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.get("full_name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message")
        }),
      });

      if (res.ok) {
        toast.success("Enquiry submitted successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to submit enquiry.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    try {
      const res = await fetch(`${API}/api/admin/sports/contact/${contact.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        toast.success("Contact info updated");
        setIsEditing(false);
        fetchContact();
      } else {
        toast.error("Failed to update contact info");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

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
                <div className="space-y-4 relative group">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-serif text-3xl font-bold text-foreground">
                      {contact?.title || "Contact Committee"}
                    </h2>
                    {token && !isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg bg-navy/5 text-navy hover:bg-gold hover:text-navy transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="divider-gold" />
                  <p className="text-muted-foreground leading-relaxed">
                    {contact?.description || "Have questions regarding upcoming fests, selection trials, or sports facility availability? Get in touch with our team."}
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
                            <p className="text-muted-foreground">{contact?.official_email_note || "For formal inquiries and administrative matters:"}</p>
                            <a href={`mailto:${contact?.official_email}`} className="text-xl font-serif font-bold text-navy hover:text-gold transition-colors block">
                              {contact?.official_email || "sports@dsnlu.ac.in"}
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
                            <p className="text-muted-foreground">{contact?.physical_director_note || "Direct contact for facility management and coaching:"}</p>
                            <div className="text-xl font-serif font-bold text-navy">
                              {contact?.physical_director_name || "Mr. O. Manga Raju"}
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
                        <Input name="full_name" placeholder="Enter your name" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input name="email" type="email" placeholder="Enter email" className="pl-10 h-12" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input name="phone" type="tel" placeholder="Enter phone" className="pl-10 h-12" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Subject</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="subject" placeholder="Fest / Selection / Equipment" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Your Message</label>
                      <Textarea 
                        name="message"
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

      {/* Admin Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden my-auto shadow-2xl">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" /> Edit Contact Info
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateContact} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Section Title</label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full rounded-xl border bg-secondary/30 p-3 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Hero Description</label>
                <textarea
                  rows={3}
                  value={editForm.description || ""}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full rounded-xl border bg-secondary/30 p-3 text-sm resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Official Email</label>
                  <input
                    type="email"
                    value={editForm.official_email || ""}
                    onChange={e => setEditForm({ ...editForm, official_email: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Physical Director Name</label>
                  <input
                    type="text"
                    value={editForm.physical_director_name || ""}
                    onChange={e => setEditForm({ ...editForm, physical_director_name: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Label Note</label>
                  <input
                    type="text"
                    value={editForm.official_email_note || ""}
                    onChange={e => setEditForm({ ...editForm, official_email_note: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Director Label Note</label>
                  <input
                    type="text"
                    value={editForm.physical_director_note || ""}
                    onChange={e => setEditForm({ ...editForm, physical_director_note: e.target.value })}
                    className="w-full rounded-xl border bg-secondary/30 p-3 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="flex-1 h-12 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 h-12 rounded-xl bg-navy text-gold hover:bg-gold hover:text-navy">
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SportsContact;
