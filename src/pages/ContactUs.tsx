import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-gold/80 font-medium"
            >
              Get in Touch With Us
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Contact</span>
          </div>
        </div>

        {/* Contact Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2">
              
              {/* Left Column: Address & Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                {/* Main Address */}
                <div className="space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl font-bold text-foreground uppercase tracking-tight">
                      DAMODARAM SANJIVAYYA NATIONAL LAW UNIVERSITY (DSNLU)
                    </h2>
                    <div className="text-muted-foreground leading-relaxed text-lg">
                      <p>NYAYAPRASTHA, Sabbavaram</p>
                      <p>Visakhapatnam – 531 035</p>
                      <p>Andhra Pradesh, India</p>
                    </div>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <span>Fax:</span>
                      <span>08924 248212</span>
                    </div>
                  </div>
                </div>

                {/* Specific Enquiries */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="p-6 rounded-2xl border border-gold/10 bg-secondary/20 space-y-4">
                    <h3 className="font-bold text-foreground border-b border-gold/20 pb-2">Administration</h3>
                    <div className="space-y-2">
                      <a href="tel:08924248216" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Phone className="h-4 w-4" /> 08924 248216
                      </a>
                      <a href="mailto:dsnluvsp@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Mail className="h-4 w-4" /> dsnluvsp@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-gold/10 bg-secondary/20 space-y-4">
                    <h3 className="font-bold text-foreground border-b border-gold/20 pb-2">Academics</h3>
                    <div className="space-y-2">
                      <a href="tel:08924248216" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Phone className="h-4 w-4" /> 08924 248216 Ext. 315
                      </a>
                      <a href="mailto:academics@dsnlu.ac.in" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Mail className="h-4 w-4" /> academics@dsnlu.ac.in
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-gold/10 bg-secondary/20 space-y-4">
                    <h3 className="font-bold text-foreground border-b border-gold/20 pb-2">Examinations</h3>
                    <div className="space-y-2">
                      <a href="tel:08924248272" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Phone className="h-4 w-4" /> 08924 248272
                      </a>
                      <a href="mailto:exams@dsnlu.ac.in" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
                        <Mail className="h-4 w-4" /> exams@dsnlu.ac.in
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl border bg-card p-8 shadow-elegant relative overflow-hidden group"
              >
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-gold/5 blur-3xl rounded-full" />
                
                <h3 className="font-serif text-2xl font-bold text-foreground mb-8">Get in Touch With Us</h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="relative">
                      <label className={cn(
                        "absolute left-4 transition-all duration-300 pointer-events-none",
                        isFocused === "firstName" || formData.firstName ? "-top-2.5 text-xs font-bold text-gold bg-card px-2" : "top-3.5 text-muted-foreground"
                      )}>
                        First Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("firstName")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-xl border-2 border-border bg-transparent px-4 py-3 text-foreground outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/5"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                      <label className={cn(
                        "absolute left-4 transition-all duration-300 pointer-events-none",
                        isFocused === "lastName" || formData.lastName ? "-top-2.5 text-xs font-bold text-gold bg-card px-2" : "top-3.5 text-muted-foreground"
                      )}>
                        Last Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("lastName")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-xl border-2 border-border bg-transparent px-4 py-3 text-foreground outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/5"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-300 pointer-events-none",
                      isFocused === "email" || formData.email ? "-top-2.5 text-xs font-bold text-gold bg-card px-2" : "top-3.5 text-muted-foreground"
                    )}>
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setIsFocused("email")}
                      onBlur={() => setIsFocused(null)}
                      className="w-full rounded-xl border-2 border-border bg-transparent px-4 py-3 text-foreground outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/5"
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-300 pointer-events-none",
                      isFocused === "subject" || formData.subject ? "-top-2.5 text-xs font-bold text-gold bg-card px-2" : "top-3.5 text-muted-foreground"
                    )}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setIsFocused("subject")}
                      onBlur={() => setIsFocused(null)}
                      className="w-full rounded-xl border-2 border-border bg-transparent px-4 py-3 text-foreground outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/5"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-300 pointer-events-none",
                      isFocused === "message" || formData.message ? "-top-2.5 text-xs font-bold text-gold bg-card px-2" : "top-3.5 text-muted-foreground"
                    )}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setIsFocused("message")}
                      onBlur={() => setIsFocused(null)}
                      className="w-full rounded-xl border-2 border-border bg-transparent px-4 py-3 text-foreground outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/5 resize-none"
                    />
                  </div>

                  <Button className="w-full h-14 bg-gold text-navy font-bold uppercase tracking-widest text-base hover:bg-[#3d2920] hover:text-gold transition-all duration-500 rounded-xl group/btn group-hover:shadow-gold/20">
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="bg-secondary/20 py-16">
          <div className="container">
            <div className="h-96 w-full rounded-3xl overflow-hidden border-4 border-white shadow-elegant">
              {/* Using a placeholder for map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m10!1m3!1d15197.640103608153!2d83.125637!3d17.771963!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39158c89420077%3A0x633190fc5060f589!2sDamodaram%20Sanjivayya%20National%20Law%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className="h-full w-full border-none grayscale contrast-125"
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
