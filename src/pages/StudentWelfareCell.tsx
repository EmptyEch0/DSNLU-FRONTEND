import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Phone, 
  Mail, 
  GraduationCap, 
  FileText, 
  Home, 
  Trophy,
  ArrowRight,
  ShieldQuestion,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const officials = [
  {
    name: "Dr. K. Sudha",
    designation: "Dean Examinations",
    concern: "Examination Matters",
    icon: FileText,
    phone: "9492535618",
    email: "sudhakavuri@dsnlu.ac.in",
  },
  {
    name: "Dr. Soma Battacharjya",
    designation: "Associate Dean, Academics (U.G)",
    concern: "Academic Matters",
    icon: GraduationCap,
    phone: "7032328648",
    email: "academics@dsnlu.ac.in",
  },
  {
    name: "Dr. P. Jogi Naidu",
    designation: "Assistant Professor",
    concern: "Hostel (Boys)",
    icon: Home,
    subRole: "Chief Warden – Boys Hostel",
    phone: "9910927182",
    email: "pjoginaidu1@dsnlu.ac.in",
  },
  {
    name: "Dr. N. Bhagya Lakshmi",
    designation: "Teaching Associate",
    concern: "Hostel (Girls)",
    icon: Home,
    subRole: "Chief Warden – Girls Hostel",
    phone: "9849528129",
    email: "bhagyasri.n@dsnlu.ac.in",
  },
  {
    name: "Mr. O. Manga Raju",
    designation: "Physical Director",
    concern: "Sports Matters",
    icon: Trophy,
    phone: "9985861116",
    email: "pd@dsnlu.ac.in",
  },
];

export default function StudentWelfareCell() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      
      <main className="flex-grow">
        {/* Institutional Hero Section */}
        <section className="relative overflow-hidden bg-navy py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy to-navy" />
          
          <div className="container relative z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex items-center gap-2 text-gold/80">
                <Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Students</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Student Welfare Cell</span>
              </div>
              
              <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl uppercase">
                Student Welfare Cell
              </h1>
              <div className="h-1 w-24 bg-gold rounded-full mb-8 shadow-gold/20 shadow-lg" />
              <p className="max-w-2xl text-lg font-medium text-white/80 leading-relaxed italic">
                "Students are advised to contact the concerned authority for their grievance."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grievance Contact Section */}
        <section className="py-20 lg:py-28">
          <div className="container px-4">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {officials.map((official, index) => (
                  <motion.div
                    key={official.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-elegant transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-l-4 border-transparent hover:border-gold"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-gold">
                        <official.icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white transition-colors">
                        {official.concern}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mb-6">
                      <h3 className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                        {official.name}
                      </h3>
                      <p className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
                        {official.designation}
                      </p>
                      {official.subRole && (
                        <p className="text-[13px] font-medium text-navy/60">
                          {official.subRole}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-4 border-t border-navy/5 pt-6">
                      <a 
                        href={`tel:+91${official.phone}`}
                        className="flex items-center gap-3 text-sm font-medium text-navy/80 transition-colors hover:text-gold"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 group-hover:bg-navy/20">
                          <Phone className="h-4 w-4" />
                        </div>
                        +91 {official.phone}
                      </a>
                      <a 
                        href={`mailto:${official.email}`}
                        className="flex items-center gap-3 text-sm font-medium text-navy/80 transition-colors hover:text-gold"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 group-hover:bg-navy/20">
                          <Mail className="h-4 w-4" />
                        </div>
                        {official.email}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Still Need Help Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 rounded-3xl bg-navy p-10 lg:p-16 text-center relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 bg-gold/5 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-gold backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <ShieldQuestion className="h-10 w-10" />
                  </div>
                  
                  <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
                    Still Need Help?
                  </h2>
                  <p className="mb-10 max-w-xl text-lg text-white/70">
                    If your concern isn't addressed above, please contact the University Administration for further assistance.
                  </p>
                  
                  <Link to="/contact-us">
                    <Button 
                      size="lg" 
                      className="bg-gold text-navy hover:bg-white hover:text-navy px-10 h-14 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-gold/20 transition-all duration-300 group-hover:translate-x-1"
                    >
                      Contact Administration
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
