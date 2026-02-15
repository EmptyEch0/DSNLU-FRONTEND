import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Building2, 
  Wifi, 
  Sun, 
  Droplets, 
  Library, 
  Users, 
  Coffee, 
  Trophy, 
  Home, 
  School, 
  Bus, 
  HeartPulse,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const InfrastructureSection = ({ 
  title, 
  description, 
  images, 
  highlights 
}: { 
  title: string; 
  description: string; 
  images: string[]; 
  highlights?: string[] 
}) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="py-16 lg:py-24 border-b border-gray-100 last:border-0"
  >
    <div className="container">
      <div className="max-w-4xl mb-12">
        <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-tight">{title}</h2>
        <div className="h-1 w-20 bg-[#c9a227] mb-8" />
        <p className="text-gray-600 text-lg leading-relaxed mb-6">{description}</p>
        
        {highlights && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#c9a227]" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-200"
          >
            <img
              src={img}
              alt={`${title} - Gallery Image ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export const Infrastructure = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-[#f8f9fa]">
          <div className="container flex items-center gap-2 py-4 text-[11px] text-gray-500 font-sans tracking-tight">
            <Link to="/" className="transition-colors hover:text-[#0f2d5c] uppercase font-bold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase font-bold text-gray-400">Compliance & Infrastructure</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold uppercase font-bold">Campus Infrastructure</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d5c] via-[#1a3d7c] to-[#0f2d5c] opacity-90" />
          <div 
            className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"
            aria-hidden="true"
          />
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
                CAMPUS INFRASTRUCTURE
              </h1>
              <div className="h-1 w-32 bg-[#c9a227] mb-8" />
              <p className="text-xl text-gray-200 leading-relaxed font-light">
                DSNLU state-of-the-art, technologically advanced and eco-friendly campus is situated in 45.5 acres abutting the hill. The campus is fully air-conditioned, Wi-Fi enabled with LAN facility, and connected through the National Knowledge Network with 1 GBPS connectivity provided by the Government of India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Campus Overview Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase tracking-tight">Campus Overview</h2>
                <div className="h-1 w-16 bg-[#c9a227]" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>45.5-acre eco-friendly campus</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>Academic Block fully air-conditioned</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>Wi-Fi + LAN connectivity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>11 KV Sub-station & 2 × 320 KVA generators</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>1.5 KLD Sewage Treatment Plant</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>350 Kwp Rooftop Solar Power Plant</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>Andhra Bank ATM facility</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a227] shrink-0 mt-0.5" />
                    <p>RemoteXs & Turnitin access</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="bg-[#0f2d5c] p-10 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Building2 size={200} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#c9a227]" />
                    Campus Highlights
                  </h3>
                  <ul className="space-y-6">
                    {[
                      { icon: Wifi, text: "1 GBPS NKN Connectivity" },
                      { icon: Sun, text: "Solar Power Plant" },
                      { icon: Droplets, text: "Sewage Treatment Facility" },
                      { icon: Library, text: "Advanced Library Access" },
                      { icon: School, text: "Technology Enabled Classrooms" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group/item">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-[#c9a227] group-hover/item:bg-[#c9a227] group-hover/item:text-white transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium tracking-wide">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Sections */}
        <section className="bg-white">
          <InfrastructureSection 
            title="Academic Block"
            description="Fully air-conditioned and disabled-friendly infrastructure with fire & safety equipment. The block serves as the heart of academic activities at DSNLU."
            highlights={[
              "11 Smart Classrooms",
              "400-Seater Seminar Hall",
              "2 Modern Conference Halls",
              "Grand Moot Court Hall",
              "Integrated Modern Library",
              "Public Address Systems",
              "LCD Projectors & Interactive Boards",
              "1GBPS NKN Wi-Fi & LAN"
            ]}
            images={[
              "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Boys & Girls Hostels"
            description="Separate residential facilities for boys and girls with 160 rooms each (twin sharing). The hostels provide a secure and healthy living environment."
            highlights={[
              "Twin Sharing Accommodation",
              "Solar-powered Hot Water",
              "RO Drinking Water Facility",
              "High-speed Wi-Fi & LAN",
              "In-house Gym & Fitness",
              "Common Recreational Areas"
            ]}
            images={[
              "https://images.unsplash.com/photo-1555854817-2b226021d25c?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Mess & Canteen"
            description="Two expansive mess halls managed by student committee, ensuring quality and variety in nutrition with North and South Indian cuisines."
            highlights={[
              "350 Students Capacity",
              "Student-led Menu Planning",
              "Hygienic Kitchen Facilities",
              "Diverse Multi-cuisine Menu"
            ]}
            images={[
              "https://images.unsplash.com/photo-1567521464027-f127cb161991?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1574966770771-fde453cd4679?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1550966841-3ee7adac1668?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Sports & Gym Facility"
            description="Promoting holistic development through wide-ranging sports facilities and a modern fitness center."
            highlights={[
              "Professional Football Field",
              "2 Turf Cricket Pitches",
              "Synthetic Basketball Court",
              "Lawn Tennis & Volleyball",
              "Badminton & Table Tennis",
              "Fully Equipped Gym"
            ]}
            images={[
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="VC Residence & Judicial Officers Rest House"
            description="Elegant residential facilities for the Vice-Chancellor and prestigious rest houses for visiting judicial dignitaries."
            images={[
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600607687940-47a000df359c?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Training Centre"
            description="Dedicated space for workshops, professional training sessions, and institutional development programs."
            images={[
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Transport Facility"
            description="Institutional transport services providing safe and convenient commuting for students and faculty."
            images={[
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1590605272619-3f82cb33cc88?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=800"
            ]}
          />

          <InfrastructureSection 
            title="Medical Center & Ambulance"
            description="Campus health facility and 24/7 ambulance support ensuring the well-being of the DSNLU community."
            highlights={[
              "Registered Resident Medical Staff",
              "24/7 Dedicated Ambulance Service",
              "Emergency Care & First Aid",
              "Regular Health Check-up Camps"
            ]}
            images={[
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1587350859718-183049ac8678?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800"
            ]}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Infrastructure;
