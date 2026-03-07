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
  HelpCircle,
  Pencil,
  ShieldCheck,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

interface LSCContactData {
  id: number;
  university_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  pincode?: string;
  country?: string;
  contact_person?: string;
  contact_designation?: string;
  contact_email: string;
}

const LSCContact = () => {
  const { token } = useAdmin();
  const [contact, setContact] = useState<LSCContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Admin states
  const [modal, setModal] = useState<{ type: "editContact" } | null>(null);
  const [formData, setFormData] = useState<Partial<LSCContactData>>({});

  const fetchContact = async () => {
    try {
      const res = await fetch(`${API}/api/lsc/contact`);
      const data = await res.json();
      setContact(data);
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

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API}/api/lsc/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success("Enquiry submitted successfully");
        form.reset();
      } else {
        toast.error("Failed to submit enquiry");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact?.id) return;

    try {
      const res = await fetch(`${API}/api/admin/lsc/contact/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Contact info updated");
        setModal(null);
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
        <LSCHeader activeTab="contact" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="flex justify-end mb-8">
              {token && (
                <button
                  onClick={() => {
                    setModal({ type: "editContact" });
                    setFormData(contact || {});
                  }}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2 text-xs font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Contact Page
                </button>
              )}
            </div>
            
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
                      <address className="not-italic text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {contact?.university_name || "Damodaram Sanjivayya National Law University"}<br />
                        {contact?.address_line1 || "NYAYAPRASTHA, Sabbavaram"}<br />
                        {contact?.address_line2 && <>{contact.address_line2}<br /></>}
                        {contact?.city || "Visakhapatnam – 531035, Andhra Pradesh, India"}<br />
                        {contact?.state && <>{contact.state}<br /></>}
                        {contact?.pincode && <>{contact.pincode}<br /></>}
                        {contact?.country}
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
                      <h5 className="font-bold text-navy">{contact?.contact_person || "LSC Coordinator"}</h5>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                        {contact?.contact_designation || "LSC Team"}
                      </p>
                      <a href={`mailto:${contact?.contact_email || "lsc@dsnlu.ac.in"}`} className="text-sm text-gold hover:underline mt-1 block">
                        {contact?.contact_email || "lsc@dsnlu.ac.in"}
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

                  <form onSubmit={handleSubmitEnquiry} className="space-y-5">
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
                        <HelpCircle className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="subject" placeholder="Subject of inquiry" className="pl-10 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Your Message</label>
                      <Textarea 
                        name="message"
                        placeholder="How can we help you?" 
                        className="min-h-[140px] resize-none"
                        required
                      />
                    </div>

                    <Button 
                      disabled={submitting}
                      type="submit" 
                      className="w-full h-14 bg-navy text-white hover:bg-gold hover:text-navy text-lg font-bold group transition-all duration-300"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      {!submitting && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </Button>
                  </form>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      {/* Admin Modal */}
      {modal?.type === "editContact" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-navy p-6 text-white flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-serif text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                Edit LSC Contact Info
              </h3>
              <button 
                onClick={() => setModal(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveContact} className="p-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gold border-b pb-2">Institution Details</h4>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">University Name</label>
                  <Input
                    value={formData.university_name || ""}
                    onChange={(e) => setFormData({ ...formData, university_name: e.target.value })}
                    className="rounded-xl border bg-secondary/30 h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Line 1</label>
                    <Input
                      value={formData.address_line1 || ""}
                      onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Line 2</label>
                    <Input
                      value={formData.address_line2 || ""}
                      onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</label>
                    <Input
                      value={formData.city || ""}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">State</label>
                    <Input
                      value={formData.state || ""}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pincode</label>
                    <Input
                      value={formData.pincode || ""}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Country</label>
                    <Input
                      value={formData.country || ""}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gold border-b pb-2">Contact Person Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Person</label>
                    <Input
                      value={formData.contact_person || ""}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Designation</label>
                    <Input
                      value={formData.contact_designation || ""}
                      onChange={(e) => setFormData({ ...formData, contact_designation: e.target.value })}
                      className="rounded-xl border bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Official Email</label>
                  <Input
                    type="email"
                    value={formData.contact_email || ""}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="rounded-xl border bg-secondary/30"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-xl border-2 border-secondary p-3 text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-navy p-3 text-xs font-black uppercase tracking-widest text-gold hover:bg-gold hover:text-navy transition-all shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LSCContact;
