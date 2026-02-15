import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Award, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const regularFaculty = [
  { name: "Prof. Nandini C.P", designation: "Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Nandini.jpg" },
  { name: "Dr. Dayananda Murthy C.P", designation: "Associate Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Dayananda.jpg" },
  { name: "Dr. P. Jogi Naidu", designation: "Associate Professor", image: "https://dsnlu.ac.in/storage/2022/12/Mr.-Jogi-Naidu-2.jpg" },
  { name: "Dr. R. Bharat Kumar", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Bharat-Kumar.jpg" },
  { name: "Dr. Soma Battacharjya", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Soma.jpg" },
  { name: "Dr. N. Bhagya Lakshmi", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-N.-Bhagya-lakshmi.jpg" },
  { name: "Dr. Ch. Lakshmi", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Ch.Lakshmi.jpg" },
  { name: "Dr. A. Nageswara Rao", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2024/10/Dr.-A.-Nageswar-Rao-1.png" },
  { name: "Dr. Rifat Khan", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Rifat-Khan.png" },
  { name: "Dr. Viswachandra Nath Madasu", designation: "Lecturer", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Viswachandra.jpg" },
  { name: "Mr. Abhishek Sinha", designation: "Lecturer", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Abhiskek.jpg" },
  { name: "Dr. Deepthi R", designation: "Teaching Associate", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Deepthi.jpg" },
  { name: "Dr. Neelima Boghadi", designation: "Teaching Associate", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Neelima.jpg" },
  { name: "Ms. Sherley Hepsiba Dokiburra", designation: "Teaching Associate", image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Sherley-Hepsiba-Dokiburra-1.png" },
  { name: "Dr. Arvind Nath Tripathi", designation: "Research Assistant", image: "https://dsnlu.ac.in/storage/2022/12/arvind-tripathi-1.png" },
  { name: "Ms. D Aparna", designation: "Research Assistant", image: "https://dsnlu.ac.in/storage/2024/10/Ms.-D.-Aparna-2.png" },
  { name: "Ms. Gali Parivarthana", designation: "Research Assistant", image: "https://dsnlu.ac.in/storage/2024/10/Ms.-Gali-Parivarthana-1.png" },
  { name: "Dr. S. Kiran Kumari", designation: "Research Assistant", image: "https://dsnlu.ac.in/storage/2024/11/Dr.-S.-Kiran-Kumari.png" },
];

const contractFaculty = [
  { name: "Dr. K Sudha", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-K.Sudha_.jpg" },
  { name: "Dr. V. Sunitha", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-V.Sunitha.jpg" },
  { name: "Dr. Paramata Bhuvaneswari", designation: "Teaching Associate", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-P.Bhuvaneswari.jpg" },
  { name: "Dr. Durga Prasad Inturu", designation: "Teaching Associate", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Durga-Prasad.jpg" },
];

const adhocFaculty = [
  { name: "Prof. (Dr.) Bhavani Prasad Panda", designation: "Adjunct Professor", image: "https://dsnlu.ac.in/storage/2026/02/Prof.-Dr.-Bhavani-Prasad-Panda-2.jpg" },
  { name: "Dr. B. Surekha Reddy", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2026/01/Dr.-Surekha-Reddy.jpg" },
  { name: "Mr. R.V Vishnu Kumar", designation: "Assistant Professor", image: "https://dsnlu.ac.in/storage/2022/12/Mr.-Vishnu-Kumar.jpg" },
  { name: "Dr. T. Y. Nirmala Devi", designation: "Faculty (Political Science)", image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Nirmala.jpg" },
  { name: "Mr. R. V Prasad", designation: "Faculty (Sociology)", image: "https://dsnlu.ac.in/storage/2024/10/Mr.-R.V.-Prasad-1.png" },
  { name: "Dr. Sarita Rani Chukka", designation: "Faculty (English)", image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Saritha-Rani.png" },
];

const visitingFaculty = [
  { name: "Prof. (Dr.) David Ambrose", image: "https://dsnlu.ac.in/storage/2023/12/david.png" },
  { name: "Prof. (Dr.) A. Raghunadha Reddy", image: "https://dsnlu.ac.in/storage/2023/12/Prof-A-Raghunadha-Reddy.png" },
  { name: "Prof. (Dr.) Reddivari Revathi", image: "https://dsnlu.ac.in/storage/2023/12/Prof-Reddivari-Revathi-1-1.png" },
  { name: "Prof. (Dr.) Balraj Chauhan", image: "https://dsnlu.ac.in/storage/2023/04/Prof.-Balraj-Chauhan.jpg" },
  { name: "Prof. (Dr.) K.I. Vibhute", image: "https://dsnlu.ac.in/storage/2023/04/Prof.-K.I.Vibhute.jpg" },
  { name: "Prof. (Dr.) Mehraj Uddin Mir", image: "https://dsnlu.ac.in/storage/2023/04/Prof.-Mehraj-Uddin-Mir.jpg" },
  { name: "Prof. (Dr.) M. Prasada Rao", image: "https://dsnlu.ac.in/storage/2023/12/Dr-M-Prasada-Rao.png" },
];

interface FacultyMember {
  name: string;
  designation?: string;
  image: string;
}

const FacultyCard = ({ member, isVC = false }: { member: FacultyMember; isVC?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={isVC ? "max-w-xl mx-auto" : ""}
  >
    <div className={`group relative bg-white overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/30 border border-transparent flex flex-col items-center p-8 text-center ${isVC ? 'border-b-4 border-b-gold lg:p-12' : ''}`}>
      <div className={`relative mb-6 ${isVC ? 'w-48 h-48 lg:w-56 lg:h-56' : 'w-32 h-32'}`}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-inner pointer-events-none" />
      </div>
      <h3 className={`font-serif font-bold text-[#0f2d5c] mb-2 ${isVC ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
        {member.name}
      </h3>
      <p className={`text-muted-foreground font-medium ${isVC ? 'text-lg text-gold' : 'text-sm'}`}>
        {member.designation}
      </p>
      {!isVC && <div className="mt-4 h-1 w-8 rounded-full bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />}
    </div>
  </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-16 flex flex-col items-center">
    <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-widest text-center">
      {children}
    </h2>
    <div className="mt-4 h-1 w-24 rounded-full bg-gold" />
  </div>
);

const Faculty = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">People</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Faculty</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl uppercase tracking-wider"
            >
              Faculty Directory
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="py-24 space-y-32">
          
          {/* Head of Institution */}
          <section className="container">
            <SectionTitle>Hon’ble Vice-Chancellor</SectionTitle>
            <FacultyCard 
              member={{ 
                name: "Prof. (Dr.) D. Surya Prakasa Rao", 
                designation: "Hon'ble Vice Chancellor", 
                image: "https://dsnlu.ac.in/storage/2023/10/3-1-e1712994432753.jpeg" 
              }} 
              isVC={true} 
            />
          </section>

          {/* Regular Faculty */}
          <section className="container">
            <SectionTitle>Regular Faculty</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {regularFaculty.map((member, i) => (
                <FacultyCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* 5-Year Contract Faculty */}
          <section className="container">
            <SectionTitle>Faculty – 5 Year Contract</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {contractFaculty.map((member, i) => (
                <FacultyCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* Adhoc / Visiting Faculty */}
          <section className="container">
            <SectionTitle>Adhoc / Visiting Faculty</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {adhocFaculty.map((member, i) => (
                <FacultyCard key={i} member={member} />
              ))}
            </div>
          </section>

          {/* Visiting Faculty Subsection */}
          <section className="container">
            <SectionTitle>Visiting Faculty</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {visitingFaculty.map((member, i) => (
                <FacultyCard key={i} member={{ ...member, designation: "Visiting Faculty" }} />
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faculty;
