import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FlaskConical, Calendar, GraduationCap, Archive, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const timelineEvents = [
  { year: "2023", events: [
    "National Conference on Commercial Courts (18 March 2023)",
    "National Seminar on Air Transport & Aviation Law (11 Feb 2023)"
  ]},
  { year: "2022", events: [
    "4th A.P.J Abdul Kalam Memorial National IPR Quiz (22 Oct 2022)",
    "Round Table Conference (30 July 2022)",
    "TK Protection Conference (9-10 April 2022)"
  ]},
  { year: "2021", events: [
    "Filed Geographical Indication Application for Atreyapuram Putarekulu (13-12-2021)",
    "3rd IPR Quiz (19 Oct 2021)",
    "DSNLU Model WTO Ministerial Conference (6-7 Aug 2021)",
    "Sports Law Governance Seminar (10 April 2021)"
  ]},
  { year: "2020", events: [
    "International Webinar (16 Dec 2020)",
    "2nd IPR Quiz (20 Nov 2020)"
  ]},
  { year: "2019", events: [
    "Roving Conference on PCT (27 Nov 2019)",
    "1st IPR Quiz (19 Oct 2019)",
    "Copyright Seminar (10 Aug 2019)",
    "National Essay Competition (April 2019)"
  ]},
  { year: "2018", events: [
    "Geographical Indications Symposium (8 Sept 2018)",
    "Inauguration of Centre for IPR (22 Sept 2018)",
    "Model Assembly (16-17 March 2018)"
  ]},
  { year: "2017", events: [
    "Model Conference of Parties (7-8 Oct 2017)"
  ]}
];

const galleryImages = [
  "https://dsnlu.ac.in/storage/2023/06/research-activities-1.png",
  "https://dsnlu.ac.in/storage/2023/06/research-activities-2.png"
];

const CLRResearch = () => {
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
            <span className="font-medium text-gold">CLR - Research Activities</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-3xl font-bold text-white md:text-5xl lg:text-5xl"
            >
              RESEARCH COLLABORATIONS & ACADEMIC ACTIVITIES
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-center"
            >
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] mb-8">IP Education at DSNLU</h2>
              <p className="text-muted-foreground leading-relaxed">
                DSNLU adopts a comprehensive and unique approach to Intellectual Property (IP) education. By integrating science and management inputs, our curriculum provides a well-rounded perspective that goes beyond traditional legal teaching. Our focus includes comparative jurisprudence, policy implications, and the managerial aspects of IP, ensuring our researchers and students are prepared for the dynamic global landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Activities */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-4 mb-16">
              <FlaskConical className="h-8 w-8 text-gold" />
              <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">MAJOR EVENTS & INITIATIVES</h2>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
              {timelineEvents.map((group, groupIdx) => (
                <div key={group.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Calendar className="h-4 w-4 text-[#0f2d5c]" />
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-gold/30">
                    <div className="flex items-center justify-between mb-2">
                        <time className="font-serif font-bold text-2xl text-gold">{group.year}</time>
                    </div>
                    <ul className="space-y-3">
                      {group.events.map((event, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                           <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                           {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Contribution */}
        <section className="py-20 bg-[#0f2d5c]/5">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-[#0f2d5c] text-white p-10 md:p-16 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <GraduationCap className="h-48 w-48" />
               </div>
               <div className="relative z-10 space-y-8">
                 <h2 className="font-serif text-3xl font-bold border-l-4 border-gold pl-6">ACADEMIC CONTRIBUTION</h2>
                 <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gold text-lg uppercase tracking-wider">Curricula Focus</h4>
                      <p className="text-white/80 leading-relaxed">
                        IPR is offered as a core Undergraduate course (4 credits). Our doctoral and post-doctoral programs also emphasize specialized IP research.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-gold text-lg uppercase tracking-wider">Specialized Papers</h4>
                      <p className="text-white/80 leading-relaxed">
                        We offer an optional paper on Biotechnology Law in the 8th semester, focusing on practical litigation aspects across Patents, Trademarks, and Copyrights.
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* IP Repository */}
        <section className="py-24">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">
                   <Archive className="h-3.5 w-3.5" /> Research Library
                 </div>
                 <h2 className="font-serif text-3xl font-bold text-[#0f2d5c]">IP REPOSITORY</h2>
                 <p className="text-muted-foreground leading-relaxed">
                    Our repository enables qualitative research in IP and interdisciplinary areas. We house an extensive collection of specialized literature and resources.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    {["Copyright", "Patents", "Geographical Indications", "Industrial Designs", "IP & Technology", "IP Taxation", "EU IP Law", "International IP"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {item}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Repository Card */}
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((src, i) => (
                   <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="aspect-square relative group overflow-hidden rounded-2xl bg-muted shadow-md"
                   >
                     <img 
                       src={src} 
                       alt="Research Activity" 
                       className="h-full w-full object-cover transition-transform group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-[#0f2d5c]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="h-8 w-8 text-white" />
                     </div>
                   </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CLRResearch;
