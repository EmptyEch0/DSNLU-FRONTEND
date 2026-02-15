import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Briefcase, 
  Mail, 
  Phone, 
  Users, 
  UserCircle, 
  FileText, 
  GraduationCap,
  Calendar,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const PlacementInternship = () => {
  const rccFaculty = [
    { name: "Dr. Dayananda Murthy C.P.", designation: "Convener" },
    { name: "Dr. P. Jogi Naidu", designation: "Member" },
    { name: "Dr. R. Bharat Kumar", designation: "Member" },
    { name: "Dr. B. Neelima", designation: "Member" },
    { name: "Dr. K. Sudha", designation: "Member" },
    { name: "Dr. A. Nageswara Rao", designation: "Member" },
    { name: "Dr. N. Bhagya Lakshmi", designation: "Member" },
    { name: "Mr. M. Naresh Kumar", designation: "Member" },
  ];

  const rccStudents = [
    { 
      role: "Student Convenor", 
      name: "Mr. VISWANADHAM VALLURI", 
      email: "vvrkcs@dsnlu.ac.in", 
      phone: "+91 89199 71228" 
    },
    { 
      role: "Student Co-Convenor", 
      name: "Ms. CHHAVI SINGHAL", 
      email: "chhavisinghal@dsnlu.ac.in", 
      phone: "+91 8815514923" 
    }
  ];

  const iccContacts = [
    {
      role: "Placement Officer",
      name: "Mr. M. Naresh Kumar",
      email: "nareshmadiki@dsnlu.ac.in",
      phone: "+91-9866592269"
    },
    {
      role: "Student Convenor",
      name: "Ms. Urvashi Ojha",
      email: "urvashiojha@dsnlu.ac.in",
      phone: "+91 9508397280"
    },
    {
      role: "Student Co-Convenor",
      name: "Mr. Siddhi Vinayak",
      email: "siddhivinayak@dsnlu.ac.in",
      phone: "+91 8084267783"
    }
  ];

  const iccFacultySection = [
    {
      role: "Faculty Convener",
      name: "Dr. Dayananda Murthy C.P.",
      email: "dmurthy@dsnlu.ac.in",
      phone: "+91 9393719745"
    },
    {
      role: "Faculty Member",
      name: "Dr. R. Bharat Kumar",
      email: "rbharat87@dsnlu.ac.in",
      phone: "+91 8500056969"
    },
    {
      role: "Faculty Member",
      name: "Dr. Neelima Boghadi",
      email: "neelimaboghadi@dsnlu.ac.in",
      phone: "+91 7207357989"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            <span className="text-foreground">Students</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold uppercase tracking-wider text-[11px]">Placement & Internship</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-15 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/70" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-gold md:text-5xl lg:text-6xl uppercase tracking-wider"
            >
              Placement & Internship
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-white/80 font-medium"
            >
              Recruitment & Internship Coordination at DSNLU
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-8 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Section 1: RCC */}
        <section className="py-20 bg-secondary/10">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <motion.h2 
                  variants={itemVariants}
                  className="font-serif text-3xl font-bold text-navy mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-16 after:bg-gold after:rounded-full"
                >
                  Recruitment Coordination Committee (RCC)
                </motion.h2>
                <div className="grid gap-12 lg:grid-cols-2 items-start">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="rounded-3xl border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
                      <p className="text-foreground leading-relaxed text-lg">
                        The Recruitment Coordination Committee (RCC) of Damodaram Sanjivayya National Law University, Visakhapatnam, is the designated body responsible for facilitating the recruitment process for the graduating batch.
                      </p>
                      <p className="text-foreground leading-relaxed mt-4 text-lg">
                        As a student-run organization, the committee helps students reach their full potential through various projects. The RCC ensures smooth interaction between recruiting organizations and aspiring legal professionals and works towards securing premier opportunities for emerging legal talents.
                      </p>
                      <p className="text-foreground leading-relaxed mt-4 text-lg">
                        The committee organizes mock interviews, CV drafting sessions, skill-training workshops, mentorship programs, and networking events to prepare students for successful careers.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
                      <div className="bg-navy px-6 py-4">
                        <h3 className="text-white font-bold flex items-center gap-2">
                          <Users className="h-5 w-5 text-gold" />
                          Internship & Placements Committee (Faculty)
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b bg-muted/30">
                              <th className="px-6 py-4 text-sm font-bold text-navy uppercase tracking-wider">Name</th>
                              <th className="px-6 py-4 text-sm font-bold text-navy uppercase tracking-wider">Designation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {rccFaculty.map((member, idx) => (
                              <tr key={idx} className="hover:bg-gold/5 transition-colors group">
                                <td className="px-6 py-4 text-foreground font-medium group-hover:text-navy">{member.name}</td>
                                <td className="px-6 py-4 text-muted-foreground">{member.designation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Student Office Bearers */}
              <div>
                <motion.h3 variants={itemVariants} className="text-xl font-bold text-navy mb-8 flex items-center gap-3">
                  <div className="h-8 w-1 bg-gold rounded-full" />
                  Student Office Bearers
                </motion.h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {rccStudents.map((student, idx) => (
                    <ContactCard key={idx} contact={student} variants={itemVariants} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: ICC */}
        <section className="py-20">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <motion.h2 
                  variants={itemVariants}
                  className="font-serif text-3xl font-bold text-navy mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-16 after:bg-gold after:rounded-full"
                >
                  Internship Co-ordination Committee (ICC)
                </motion.h2>
                <motion.div variants={itemVariants} className="max-w-4xl rounded-3xl border-l-4 border-l-gold bg-card p-8 shadow-sm">
                  <p className="text-foreground leading-relaxed text-lg">
                    DSNLU provides two months of summer and one month of winter internship breaks during each academic year. The ICC facilitates students' professional networking and ensures practical exposure with advocates, law firms, companies, judicial officials, government and non-government organizations, and research institutions.
                  </p>
                </motion.div>
              </div>

              {/* ICC Contacts */}
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <motion.h3 variants={itemVariants} className="text-xl font-bold text-navy mb-8 flex items-center gap-3">
                    <div className="h-8 w-1 bg-gold rounded-full" />
                    Committee Contacts
                  </motion.h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {iccContacts.map((contact, idx) => (
                      <ContactCard key={idx} contact={contact} variants={itemVariants} />
                    ))}
                  </div>
                </div>

                <div>
                  <motion.h3 variants={itemVariants} className="text-xl font-bold text-navy mb-8 flex items-center gap-3">
                    <div className="h-8 w-1 bg-gold rounded-full" />
                    Faculty Committee
                  </motion.h3>
                  <div className="space-y-6">
                    {iccFacultySection.map((faculty, idx) => (
                      <ContactCard key={idx} contact={faculty} variants={itemVariants} compact />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper Components
interface Contact {
  role: string;
  name: string;
  email: string;
  phone: string;
}


const ContactCard = ({ contact, variants, compact = false }: { contact: Contact; variants: Variants; compact?: boolean }) => {
  return (
    <motion.div 
      variants={variants}
      className={cn(
        "group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-md hover:border-gold/30 hover:-translate-y-1 overflow-hidden",
        !compact && "lg:p-8"
      )}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
          <UserCircle className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold italic">
              {contact.role}
            </span>
            <h4 className="mt-1 text-lg font-bold text-foreground leading-tight">{contact.name}</h4>
          </div>
          
          <div className="space-y-2">
            <a 
              href={`mailto:${contact.email}`}
              className="group/link flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <Mail className="h-4 w-4 text-gold/60 group-hover/link:text-gold" />
              <span className="border-b border-transparent group-hover/link:border-gold/30 transition-all font-medium">
                {contact.email}
              </span>
            </a>
            <a 
              href={`tel:${contact.phone.replace(/[\s-]/g, '')}`}
              className="group/link flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <Phone className="h-4 w-4 text-gold/60 group-hover/link:text-gold" />
              <span className="font-bold tracking-tight">
                {contact.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementInternship;
