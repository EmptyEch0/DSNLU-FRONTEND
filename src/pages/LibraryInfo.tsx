import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Users, 
  Calendar, 
  ArrowRight,
  Send,
  Library
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80", title: "Reading Hall" },
  { url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80", title: "Reference Section" },
  { url: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80", title: "Digital Library" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80", title: "Stack Room" },
];

const teamMembers = [
  { name: "Dr. Rajesh Jampani", role: "Deputy Librarian & Librarian I/c", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
  { name: "Dr. R. Leela Mohana Kumari", role: "Assistant Librarian", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" },
  { name: "Dr. B. Manikya Rao", role: "Senior Consultant (Library)", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
  { name: "Mr. M. Dhanunjaya Naidu", role: "Assistant Librarian", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
  { name: "Mr. D.V.V.G. Muralidhar Rao", role: "Sr. Record Assistant", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" },
  { name: "Mr. E. Shanmukeswara Rao", role: "Record Assistant", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80" },
  { name: "Mr. D. Ram Prasad", role: "Attender", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80" },
  { name: "N. Eswar Rao", role: "Administrative Assistant", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80" },
];

const committeeMembers = [
  { role: "Chair Person", name: "Dr. B. Soma" },
  { role: "Members", names: ["Prof. Nandini C.P.", "Dr. P. Jogi Naidu", "Dr. Rifat Khan", "Ms. Sherley Hepsiba D"] },
  { role: "Convener", name: "Dr. J. Rajesh" },
  { role: "Co-Convener", name: "Dr. R. Leela Mohana Kumari" },
];

const LibraryInfo = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="info" />

        {/* About Library Section */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl font-bold text-blue-600 flex items-center gap-3">
                    <Library className="h-8 w-8 text-blue-600" /> About the Library
                  </h2>
                  <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </div>
                
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Library is the <span className="text-navy font-semibold">live nerve</span> of any academic institution of higher learning. Its importance increases many-fold in law institutions as it plays a significant role in the pursuit of academic excellence.
                  </p>
                  <p>
                    Keeping this in view, a constant effort is being made to enrich the library with a collection of a wide variety of books and journals from the perspective of law students and scholars.
                  </p>
                  <p>
                    Internet facilities through LAN and Wi-Fi and E-resources with Remotexs are also added to the law library. <span className="text-navy font-semibold">Open access system</span> is implemented for easy access to books and other materials.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 py-6 h-auto text-lg group">
                    Explore Resources <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-blue-600/10 rounded-2xl -rotate-2" />
                  <motion.img 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80" 
                    alt="Library Interior" 
                    className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
                  />
              </motion.div>
            </div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Infrastructure Gallery */}
        <section className="py-20 bg-secondary/30">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy">Library Infrastructure</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-[350px] overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.5 }}
                    src={img.url} 
                    alt={img.title}
                    className="h-full w-full object-cover transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-8">
                    <h3 className="text-white text-2xl font-serif font-bold transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      {img.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-0 group-hover:border-4 border-blue-600/30 transition-all duration-300 rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Library Team Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl font-bold text-navy">Our Library Team</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl p-8 text-center border-2 border-navy/5 shadow-elegant hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <User className="h-16 w-16 text-navy" />
                  </div>
                  <div className="relative mb-6 mx-auto w-32 h-32">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-navy opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 animate-pulse" />
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2 leading-tight">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Library Advisory Committee */}
        <section className="py-20 bg-secondary/30">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-navy/10"
            >
              <div className="bg-navy p-8 text-white text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h2 className="font-serif text-3xl font-bold">Library Advisory Committee</h2>
              </div>
              <div className="px-8 py-10 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-navy/5 hover:bg-navy/5">
                      <TableHead className="font-bold text-navy text-lg w-1/3 py-6">Designation</TableHead>
                      <TableHead className="font-bold text-navy text-lg py-6">Name of the Member</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {committeeMembers.map((item, idx) => (
                      <TableRow key={idx} className="hover:bg-gold/5 transition-colors border-b border-navy/5">
                        <TableCell className="font-semibold text-navy py-6 text-lg">
                          {item.role}
                        </TableCell>
                        <TableCell className="py-6 text-lg text-muted-foreground">
                          {item.names ? (
                            <ul className="space-y-2">
                              {item.names.map((name, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                                  {name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            item.name
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="container max-w-7xl"><div className="border-t border-navy/10" /></div>

        {/* Contact Librarian Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative bg-navy text-white rounded-3xl shadow-3xl p-10 lg:p-16 overflow-hidden border-2 border-blue-600/20"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Mail className="h-48 w-48 text-white" />
              </div>
              
              <div className="relative z-10 grid gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-serif text-4xl font-bold text-blue-400">Contact Librarian</h2>
                    <p className="text-white/80 text-lg">We are here to assist your research and academic needs.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <User className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">Dr. J. Rajesh</h4>
                        <p className="text-white/70">Deputy Librarian & Librarian In-Charge</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <MapPin className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white/80 leading-relaxed italic">
                          Damodaram Sanjivayya National Law University<br />
                          “NYAYAPRASTHA”, Sabbavaram<br />
                          Visakhapatnam – 531035
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="space-y-4">
                    <a href="mailto:library@dsnlu.ac.in" className="flex items-center gap-4 group/item hover:text-blue-400 transition-colors">
                      <Mail className="h-6 w-6 text-blue-600" />
                      <span className="text-lg">library@dsnlu.ac.in</span>
                    </a>
                    <a href="mailto:jampani.rajesh@dsnlu.ac.in" className="flex items-center gap-4 group/item hover:text-blue-400 transition-colors">
                      <Mail className="h-6 w-6 text-blue-600" />
                      <span className="text-lg">jampani.rajesh@dsnlu.ac.in</span>
                    </a>
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                      <span className="text-lg">08924-248216 (Ext: 321)</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-600/90 text-white font-bold py-7 text-lg rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all">
                      <Send className="mr-2 h-5 w-5" /> Email Librarian
                    </Button>
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

export default LibraryInfo;
