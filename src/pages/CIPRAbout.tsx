import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Target, Users, Lightbulb, ShieldCheck, Scale, Microscope, BookOpen, Handshake, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CIPRAbout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/#research" className="transition-colors hover:text-gold">Centres</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">CIPR&T - About Centre</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              CENTRE FOR INTELLECTUAL PROPERTY RIGHTS & TECHNOLOGY (CIPR&T)
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-24">
            
            {/* Introduction Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed text-justify"
            >
              <p>
                Intellectual Property refers to the creations of the human mind like inventions, literary and artistic works, and symbols, names, images and designs used in commerce. The evolution of Intellectual Property Rights (IPR) as a distinct field of law is a response to the need for rewarding innovation and creativity while balancing the public's right to access knowledge.
              </p>
              <p>
                In the Indian context, the impact of the TRIPS Agreement has been profound, leading to significant amendments in our IP laws to align with international standards. This evolution has created a complex interplay between traditional legal concepts and the rapid pace of technological advancement.
              </p>
              <p>
                The relationship between IPR and Technology is symbiotic. Technology provides the tools for innovation, while IPR provides the legal framework to protect and commercialize these innovations. As technology continues to disrupt traditional industries, the legal frameworks governing IP and IT must also adapt.
              </p>
              <p>
                Recent amendments to IP and Information Technology laws in India reflect a commitment to creating an ecosystem that encourages digital innovation while protecting data privacy and security. These laws now serve as critical policy instruments for economic growth and national development.
              </p>
              <p>
                IPRs are no longer just legal protections; they are strategic assets that drive competition and market dominance. Understanding the nuances of IP valuation, enforcement, and policy is essential for researchers, practitioners, and policymakers alike.
              </p>
              <p>
                The Centre for Intellectual Property Rights & Technology (CIPR&T) at DSNLU stands as a testament to our institutional commitment to fostering excellence in this field. We aim to bridge the gap between academic research and industry practice through a multidisciplinary approach.
              </p>
            </motion.div>

            {/* Rationale Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Rationale for Establishment
              </h2>
              <div className="rounded-2xl border bg-card p-10 shadow-sm space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  IPR and Technology Law represent a rapidly developing field with immense impact on industries ranging from Pharmaceuticals to Startups. The need for a dedicated centre arises from the growing demand for specialized research, training, and awareness in these areas.
                </p>
                <p>
                  By incentivizing cutting-edge research and conducting extension activities, CIPR&T aims to create an environment where innovation is celebrated and protected. Our rationale is rooted in the belief that a robust IP framework is crucial for a knowledge-based economy.
                </p>
              </div>
            </motion.div>

            {/* Objectives Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Objectives of CIPR&T
              </h2>
              <div className="grid gap-4">
                {[
                  "Act as a platform for creation, protection, valuation & policy formulation in IPR",
                  "Serve as a think tank for providing national & international policy inputs",
                  "Encourage interdisciplinary research involving all stakeholders",
                  "Facilitate dissemination of social, ethical & economic aspects of IP",
                  "Capacity building for the judiciary, legal professionals & policy makers",
                  "Support the Government in international negotiations at WTO, UN, WIPO, and ITU"
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border bg-card p-5 group hover:border-gold/30 hover:shadow-md transition-all">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                      <Target className="h-3 w-3" />
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      {obj}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-12">
               <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border-l-[6px] border-gold bg-[#0f2d5c] p-10 text-white shadow-xl"
               >
                 <ShieldCheck className="absolute -top-4 -right-4 h-12 w-12 text-gold opacity-20" />
                 <h3 className="font-serif text-2xl font-bold text-gold mb-6 uppercase tracking-widest">Vision</h3>
                 <p className="text-lg italic leading-relaxed">
                   “To foster innovation and encourage Intellectual Property Rights (IPR) and technology law related activities….”
                 </p>
               </motion.div>
               
               <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border-l-[6px] border-gold bg-secondary/30 p-10 shadow-lg"
               >
                 <Lightbulb className="absolute -top-4 -right-4 h-12 w-12 text-gold opacity-10" />
                 <h3 className="font-serif text-2xl font-bold text-[#0f2d5c] mb-6 uppercase tracking-widest">Mission</h3>
                 <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                   “To provide effective research and policy inputs in the field of IPRs and Technology.”
                 </p>
               </motion.div>
            </div>

            {/* Functions Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Functions
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Handshake, text: "Consultancy services for industry and innovators" },
                  { icon: BookOpen, text: "Support for patent filing and commercialization" },
                  { icon: Target, text: "Research collaboration agreements with global partners" },
                  { icon: Microscope, text: "Execution of Government & NGO research projects" },
                  { icon: Scale, text: "Publishing specialized books and monographs" },
                  { icon: Users, text: "Organising seminars, workshops and training programs" },
                  { icon: GraduationCap, text: "Training for judges and enforcement professionals" },
                  { icon: Lightbulb, text: "Creation of a comprehensive domain knowledge resource" },
                  { icon: BookOpen, text: "Ph.D., LL.M., certificate & PG diploma programs" }
                ].map((func, i) => (
                  <div key={i} className="flex flex-col p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md hover:border-gold/30 transition-all group">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#0f2d5c] transition-colors">
                      <func.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-[#0f2d5c] leading-snug">
                      {func.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verticals Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Verticals of CIPR&T
              </h2>
              <div className="grid gap-8">
                {/* (i) Training Centre */}
                <div className="p-8 rounded-3xl border bg-secondary/10 shadow-sm border-l-8 border-gold">
                  <h3 className="font-serif text-xl font-bold text-[#0f2d5c] mb-6 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gold" />
                    (i) Training Centre on IPRs & Technology
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {["Awareness programs", "Law enforcement training", "Government officer capacity building"].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl text-sm font-bold text-muted-foreground shadow-sm text-center border">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* (ii) Cell on IPRs & Technology */}
                <div className="p-8 rounded-3xl border bg-secondary/10 shadow-sm border-l-8 border-gold">
                  <h3 className="font-serif text-xl font-bold text-[#0f2d5c] mb-6 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gold" />
                    (ii) Cell on IPRs & Technology
                  </h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    {["Patent filing", "Technology transfer", "Research collaboration", "Legal opinions"].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl text-xs font-bold text-muted-foreground shadow-sm text-center border uppercase tracking-wider">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* (iv) IPR & Technology Clinic */}
                <div className="p-10 rounded-3xl border bg-[#0f2d5c] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Scale className="h-40 w-40" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gold mb-8 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gold" />
                    (iv) IPR & Technology Clinic
                  </h3>
                  <div className="space-y-8 relative z-10">
                    <p className="text-lg leading-relaxed text-white/90">
                      The Clinic provides free legal counseling for startups and innovators, bridging the gap between innovative ideas and their legal protection. Our students, supervised by expert faculty, engage in practical legal practice through client counseling and research.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        "Free counseling for Startups",
                        "Patent & Trademark searches",
                        "Drafting application support",
                        "Supervised student practice",
                        "No professional fees (Only statutory charges)"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-semibold">
                          <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Committee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider">
                Committee
              </h2>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f2d5c] text-white">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted-foreground">
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20">Honorary Chair Person</td>
                      <td className="px-6 py-4">Dr. Dayananda Murthy C.P.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-[#0f2d5c] bg-secondary/20" rowSpan={4}>Faculty Members</td>
                      <td className="px-6 py-4">Dr. P. Jogi Naidu</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. B. Neelima</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Ms. Sherley Hepsiba D</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dr. Kiran Kumari</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CIPRAbout;
