import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  GraduationCap, 
  ClipboardList, 
  Award,
  BookOpen,
  ChevronRight,
  Send,
  Heart,
  BadgeCheck,
  Star,
  UserCheck
} from "lucide-react";
import { Link } from "react-router-dom";
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
import { cn } from "@/lib/utils";

const objectives = [
  "Encourage alumni to take active interest in the progress and development of DSNLU.",
  "Undertake nation-building activities including charitable and not-for-profit initiatives.",
  "Conduct lawful activities aligned with the objectives of the Association.",
  "Generate corpus/donations/bequests/land/gifts (with DSNLU consent) to develop infrastructure and academic expansion.",
  "Organize conferences, seminars, workshops, and training programs in collaboration with DSNLU.",
  "Promote professional knowledge exchange and community service initiatives benefiting society and underprivileged sections."
];

const committee = [
  { name: "Dr. P. Jogi Naidu", role: "Convener" },
  { name: "Dr. Rifat Khan", role: "Member" },
  { name: "Dr. A. Nageswara Rao", role: "Member" },
  { name: "Dr. B. Soma", role: "Member" },
  { name: "Dr. K. Sudha", role: "Member" },
  { name: "Dr. N. Bhagya Lakshmi", role: "Member" },
  { name: "Ms. B. Madhuri", role: "Member" },
];

const DSNLUAlumni = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Details Submitted",
      description: "Thank you for connecting with DSNLU Alumni Association.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link to="/" className="transition-colors hover:text-maroon">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Alumni</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-maroon">DSNLU Alumni</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#800000] py-20 lg:py-32 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-152305085306e-8c3d3efcd35f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm md:text-base">
                  DSNLU Alumni Association
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight">
                  DSNLU Alumni
                </h1>
              </div>
              <p className="text-gold/80 font-medium tracking-widest text-sm md:text-lg italic">
                "Strengthening Bonds Beyond Graduation."
              </p>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mx-auto h-1 w-32 rounded-full bg-gold" 
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10 text-center"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#800000]">DSNLU Alumni Association</h2>
                <div className="divider-gold mx-auto" />
              </div>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The DSNLU Alumni Association has been formed to promote and foster mutually beneficial interaction between the Alumni and Alma Mater and to increase active participation of alumni in the growth and development of the University.
                </p>
                <p>
                  The Association acts as a bridge between past and present students, strengthening institutional legacy and professional networks.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-navy uppercase tracking-widest">Aims and Objectives</h2>
              <div className="divider-gold mx-auto" />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border bg-card shadow-sm hover:shadow-maroon/10 hover:border-maroon/20 hover:scale-[1.02] transition-all duration-300 relative group"
                >
                  <div className="absolute top-4 right-4 text-maroon/10 group-hover:text-gold/20 transition-colors">
                    <Target className="h-10 w-10 shrink-0" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                      {obj}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-3xl font-bold text-[#800000] uppercase tracking-widest">Membership</h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Eligibility */}
              <div className="p-8 rounded-3xl border bg-card shadow-elegant border-maroon/10 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <BadgeCheck className="h-24 w-24" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4 border-b border-gold/30 pb-2">Eligibility</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  All Alumni of DSNLU are eligible for membership of the Association.
                </p>
              </div>

              {/* Subscriptions */}
              <div className="lg:col-span-2 p-8 rounded-3xl border bg-navy text-white shadow-elegant relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                  <ClipboardList className="h-32 w-32" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-xl font-bold text-gold border-b border-white/10 pb-2">Subscription Structure</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="text-4xl font-serif font-bold text-gold">₹ 200/-</div>
                      <div className="text-xs uppercase font-bold tracking-widest opacity-70">Annual Membership</div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-4xl font-serif font-bold text-gold">₹ 2000/-</div>
                      <div className="text-xs uppercase font-bold tracking-widest opacity-70">Life Membership</div>
                      <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-[10px] font-bold rounded-full border border-gold/30">
                        Become a Life Member
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-primary-foreground/50 italic pt-4">
                    *Subject to enhancement by Executive Committee
                  </p>
                </div>
              </div>

              {/* Honorary Members */}
              <div className="lg:col-span-3 p-8 rounded-3xl border bg-secondary/30 border-dashed border-gold/50 flex flex-col md:flex-row items-center gap-8 group">
                <div className="h-16 w-16 rounded-full bg-navy text-gold flex items-center justify-center shrink-0">
                   <Award className="h-8 w-8" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold text-navy">Honorary Members</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    The Chancellor, Vice Chancellor, and Registrar of DSNLU are Honorary and Ex-Officio Members. (Note: Honorary members are not eligible for voting or contesting elections.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Committee Section */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container max-w-6xl">
            <div className="text-center space-y-4 mb-20">
              <h2 className="font-serif text-3xl font-bold text-[#800000] uppercase tracking-widest">Alumni Committee</h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {committee.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-8 rounded-2xl border bg-background transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group shadow-sm",
                    member.role === "Convener" ? "border-maroon/30 shadow-md" : "hover:border-maroon/20"
                  )}
                >
                  <div className="space-y-4 text-center">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mx-auto transition-colors",
                      member.role === "Convener" ? "bg-maroon text-white shadow-lg" : "bg-navy/5 text-navy group-hover:bg-maroon group-hover:text-white"
                    )}>
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy group-hover:text-maroon transition-colors">{member.name}</h3>
                      <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16 lg:py-24 bg-secondary/10">
          <div className="container max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Connect With Us</h2>
                  <div className="divider-maroon" />
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We invite all alumni to stay connected with DSNLU and contribute towards academic excellence, mentorship, and institutional growth.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4 p-6 rounded-2xl border bg-card shadow-sm group hover:border-maroon/30 transition-all">
                    <div className="h-12 w-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy capitalize">Institutional Mail</h4>
                      <p className="text-sm text-muted-foreground">alumni@dsnlu.ac.in</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 rounded-2xl border bg-card shadow-sm group hover:border-maroon/30 transition-all">
                    <div className="h-12 w-12 rounded-xl bg-gold/10 text-maroon flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy capitalize">Postal Address</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">DSNLU, NYAYAPRASTHA, Sabbavaram, Visakhapatnam, AP.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-2xl space-y-8 relative overflow-hidden border-maroon/10">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                     <Heart className="h-32 w-32 text-maroon fill-current" />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-serif font-bold text-maroon flex items-center gap-2">
                       Alumni Registration Form
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest border-b border-gold/30 pb-2">
                      Submit your current details
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Full Name</label>
                        <div className="relative group/input">
                          <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:text-maroon transition-colors" />
                          <Input placeholder="Enter your name" className="pl-10 h-12 focus-visible:ring-maroon/30" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Course</label>
                        <div className="relative group/input">
                          <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:maroon transition-colors" />
                          <Input placeholder="e.g. LL.B (Hons.)" className="pl-10 h-12 focus-visible:ring-maroon/30" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Passout Year</label>
                        <div className="relative group/input">
                          <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:text-maroon transition-colors" />
                          <Input placeholder="2024" className="pl-10 h-12 focus-visible:ring-maroon/30" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Roll No</label>
                        <div className="relative group/input">
                          <ClipboardList className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:text-maroon transition-colors" />
                          <Input placeholder="DS23-001" className="pl-10 h-12 focus-visible:ring-maroon/30" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Gender</label>
                        <Select>
                          <SelectTrigger className="h-12 focus:ring-maroon/30">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Date of Birth</label>
                        <Input type="date" className="h-12 focus-visible:ring-maroon/30" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Email Address</label>
                        <div className="relative group/input">
                          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:text-maroon transition-colors" />
                          <Input type="email" placeholder="email@example.com" className="pl-10 h-12 focus-visible:ring-maroon/30" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Phone Number</label>
                        <div className="relative group/input">
                          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within/input:text-maroon transition-colors" />
                          <Input type="tel" placeholder="+91 00000 00000" className="pl-10 h-12 focus-visible:ring-maroon/30" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground px-1">Say Something...</label>
                      <Textarea 
                        placeholder="Current profession, location, or message to Alma Mater..." 
                        className="min-h-[120px] resize-none focus-visible:ring-maroon/30"
                      />
                    </div>

                    <Button type="submit" className="w-full h-14 bg-[#800000] text-white hover:bg-[#a00000] text-lg font-bold group transition-all duration-300 shadow-xl hover:shadow-maroon/20 hover:scale-[1.01] active:scale-[0.98]">
                      Submit Details
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

export default DSNLUAlumni;
