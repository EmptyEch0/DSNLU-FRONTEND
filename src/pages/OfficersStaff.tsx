import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Briefcase, UserCircle, ShieldCheck, Headphones, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface StaffMember {
  name: string;
  designation: string;
  image: string;
}

const universityOfficers: StaffMember[] = [
  { 
    name: "Dr. Viswachandra Nath Madasu", 
    designation: "Registrar-In Charge", 
    image: "https://dsnlu.ac.in/storage/2024/08/Dr.-Viswachandra-Nath-M-.png" 
  },
  { 
    name: "C.Venkateswarlu", 
    designation: "Finance Officer", 
    image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" 
  },
  { 
    name: "Dr. P. Jogi Naidu", 
    designation: "Controller of Examinations (I/c)", 
    image: "https://dsnlu.ac.in/storage/2022/12/Mr.-Jogi-Naidu-2.jpg" 
  }
];

const administrativeStaff: StaffMember[] = [
  { name: "Mr. K. Santosh Kumar", designation: "Assistant Registrar", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. B. Prasada Rao", designation: "Section Officer", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Ms. V. Lavanya", designation: "Section Officer", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. S. Rajesh", designation: "Assistant", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. P. Rambabu", designation: "Assistant", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Ms. K. Satyawathi", designation: "Junior Assistant", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
];

const libraryStaff: StaffMember[] = [
  { name: "Mr. B. Srinivasa Rao", designation: "Assistant Librarian", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. D. Simhachalam", designation: "Library Assistant", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
];

const supportStaff: StaffMember[] = [
  { name: "Mr. G. Apparao", designation: "System Administrator", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. K. Vinay", designation: "Office Assistant", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
  { name: "Mr. P. Satish", designation: "Driver", image: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" },
];

const StaffCard = ({ member }: { member: StaffMember }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl p-6 shadow-sm border border-transparent transition-all duration-300 hover:shadow-xl hover:border-gold/20 flex flex-col items-center text-center"
  >
    <div className="relative w-32 h-32 mb-4">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover rounded-full border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
    </div>
    <h3 className="font-serif font-bold text-[#0f2d5c] text-lg mb-1 group-hover:text-gold transition-colors">
      {member.name}
    </h3>
    <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
      {member.designation}
    </p>
    <div className="mt-4 h-0.5 w-8 rounded-full bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
  </motion.div>
);

const SectionHeading = ({ title, icon: Icon }: { title: string; icon: LucideIcon }) => (
  <div className="relative mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gold/10 rounded-xl">
        <Icon className="h-6 w-6 text-gold" />
      </div>
      <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] tracking-tight truncate">
        {title}
      </h2>
    </div>
    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-full bg-gold"
      />
    </div>
  </div>
);

const OfficersStaff = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Officers & Staff</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 inline-block"
            >
              Academic Administration
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Officers & Staff
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-gold/50 via-gold to-gold/50" 
            />
          </div>
        </section>

        {/* Directory Content */}
        <div className="container py-24 space-y-24">
          
          {/* University Officers */}
          <section>
            <SectionHeading title="University Officers" icon={ShieldCheck} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {universityOfficers.map((member, i) => (
                <StaffCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* Administrative Staff */}
          <section>
            <SectionHeading title="Administrative Staff" icon={Briefcase} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {administrativeStaff.map((member, i) => (
                <StaffCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* Library Staff */}
          <section>
            <SectionHeading title="Library Staff" icon={UserCircle} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {libraryStaff.map((member, i) => (
                <StaffCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* Technical & Support Staff */}
          <section>
            <SectionHeading title="Technical & Support Staff" icon={Headphones} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {supportStaff.map((member, i) => (
                <StaffCard key={i} member={member} />
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfficersStaff;
