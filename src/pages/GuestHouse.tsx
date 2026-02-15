import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, Home, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const GuestHouse = () => {
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
            <span className="uppercase font-bold text-gray-400">Infrastructure</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold uppercase font-bold">Guest House</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-24 overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d5c] via-[#1a3d7c] to-[#0f2d5c] opacity-90" />
          <div 
            className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"
            aria-hidden="true"
          />
          
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-[0.3em] text-[#c9a227] text-sm"
            >
              Accommodation at DSNLU
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight mb-8"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              GUEST HOUSE
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto h-1 w-32 rounded-full bg-[#c9a227] shadow-lg" 
            />
          </div>
        </section>

        {/* Booking & Contact Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Information */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">Bookings & Reservation</h2>
                  <div className="h-1 w-20 bg-[#c9a227]" />
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Damodaram Sanjivayya National Law University provides state-of-the-art guest house facilities designed to accommodate visiting faculty, delegates, and official guests of the University. Our guest house offers a prestigious and comfortable environment reflecting our institutional excellence.
                </p>

                <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 flex gap-4">
                  <Info className="h-6 w-6 text-[#c9a227] shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#0f2d5c]">Important Note</h4>
                    <p className="text-gray-600 text-sm">
                      Bookings are subject to availability and institutional priority. We recommend initiating your booking request at least 72 hours in advance for official visits.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-[#0f2d5c]/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Home className="h-24 w-24 text-[#0f2d5c]" />
                  </div>
                  
                  <h3 className="font-bold text-[#0f2d5c] text-xl mb-8 uppercase tracking-wider flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#c9a227]" />
                    For bookings contact
                  </h3>

                  <div className="space-y-6 relative z-10">
                    <motion.a 
                      href="tel:08924-248216"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#0f2d5c]/5 transition-colors group/item"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#0f2d5c] flex items-center justify-center text-white shadow-lg shadow-[#0f2d5c]/20">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Telephone</p>
                        <p className="text-lg font-bold text-[#0f2d5c] group-hover/item:text-[#c9a227] transition-colors">08924-248216</p>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="mailto:accommodation@dsnlu.ac.in"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#0f2d5c]/5 transition-colors group/item"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#c9a227] flex items-center justify-center text-white shadow-lg shadow-[#c9a227]/20">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Email Address</p>
                        <p className="text-lg font-bold text-[#0f2d5c] group-hover/item:text-[#c9a227] transition-colors break-all">accommodation@dsnlu.ac.in</p>
                      </div>
                    </motion.a>

                    <Button className="w-full h-14 bg-[#0f2d5c] hover:bg-[#1a3d7c] text-white font-bold tracking-widest uppercase text-xs rounded-xl shadow-lg mt-4" asChild>
                      <a href="mailto:accommodation@dsnlu.ac.in">
                        Compose Booking Request
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                    Official University Contact Channel
                  </p>
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

export default GuestHouse;
