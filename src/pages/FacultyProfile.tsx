import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Users,
  Search, 
  Globe,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "@/lib/api";

interface FacultyProfileData {
  id: number;
  name: string;
  slug: string;
  designation: string;
  image_url: string;
  phone: string;
  email: string;
  total_teaching_experience: string;
  education_summary: string;
  present_position: string;
  areas_of_interest: string;
  education: any[];
  experience: any[];
  awards: any[];
  publications: any[];
  conferences: any[];
  research: any[];
}

const FacultyProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<FacultyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch<FacultyProfileData>(`/api/faculty/profile/${slug}`);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching faculty profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 container py-32 text-center">
          <h1 className="text-4xl font-serif font-bold text-navy mb-4">Faculty Not Found</h1>
          <Link to="/people/faculty" className="text-gold hover:underline">Return to Directory</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "about", label: "About", icon: GraduationCap },
    { id: "publications", label: "Publications", icon: BookOpen },
    { id: "conferences", label: "Conferences", icon: Globe },
    { id: "research", label: "Research & Projects", icon: Search },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/faculty" className="hover:text-gold">Faculty</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">{profile.name}</span>
          </div>
        </div>

        {/* Profile Header */}
        <section className="bg-navy relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Image - Circular Premium Style */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-8 border-white/20 p-2 overflow-hidden bg-white/10 backdrop-blur-sm relative z-20">
                  <img 
                    src={profile.image_url} 
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110 shadow-2xl"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -inset-4 border border-gold/30 rounded-full animate-spin-slow opacity-50" />
                <div className="absolute -inset-8 border border-white/10 rounded-full animate-reverse-spin-slow opacity-30" />
              </motion.div>

              {/* Bio Highlights */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center lg:text-left text-white max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-md border border-gold/30 uppercase tracking-widest">
                  <Star className="w-4 h-4 fill-gold" />
                  {profile.designation}
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight uppercase tracking-wide">
                  {profile.name}
                </h1>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed font-light italic">
                  {profile.present_position}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <Mail className="w-5 h-5 text-gold" />
                    <span>{profile.email || "Contact University"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <Phone className="w-5 h-5 text-gold" />
                    <span>{profile.phone || "+91 (University Line)"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Tabs Navigation */}
        <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container">
            <div className="flex overflow-x-auto no-scrollbar gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-6 px-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-all duration-300 ${
                    activeTab === tab.id 
                    ? "border-gold text-navy" 
                    : "border-transparent text-slate-400 hover:text-navy hover:border-slate-200"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-gold" : ""}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="container py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100"
            >
              {activeTab === "about" && (
                <div className="space-y-16">
                  {/* Bio HTML if exists, otherwise summary */}
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-navy mb-8 flex items-center gap-4">
                      <span className="w-12 h-1.5 bg-gold rounded-full" />
                      Academic Profile
                    </h2>
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                      {profile.education_summary && <p className="font-medium text-lg text-slate-800">{profile.education_summary}</p>}
                      <p className="leading-relaxed whitespace-pre-wrap">{profile.present_position}</p>
                    </div>
                  </div>

                  {/* Experience Grid */}
                  {profile.experience && profile.experience.length > 0 && (
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-gold" />
                          Teaching Experience
                        </h3>
                        <div className="space-y-6">
                          {profile.experience.filter(e => e.type === 'teaching').map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold" />
                              <h4 className="font-bold text-slate-800">{exp.title}</h4>
                              <p className="text-sm text-slate-500">{exp.institution}</p>
                              <p className="text-xs font-semibold text-gold mt-1 uppercase tracking-wider">{exp.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {profile.experience.some(e => e.type === 'administrative') && (
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                            <Users className="w-6 h-6 text-gold" />
                            Administrative Roles
                          </h3>
                          <div className="space-y-6">
                            {profile.experience.filter(e => e.type === 'administrative').map((exp, i) => (
                              <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-navy/20" />
                                <h4 className="font-bold text-slate-800">{exp.title}</h4>
                                <p className="text-sm text-slate-500">{exp.institution}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Areas of Interest */}
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h3 className="font-serif text-2xl font-bold text-navy mb-6">Areas of Specialization</h3>
                    <div className="flex flex-wrap gap-3">
                      {profile.areas_of_interest.split(',').map((area, i) => (
                        <span key={i} className="bg-white border text-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                          {area.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  {profile.awards && profile.awards.length > 0 && (
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-navy mb-8 flex items-center gap-3">
                        <Award className="w-6 h-6 text-gold" />
                        Galleries & Recognitions
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {profile.awards.map((award, i) => (
                          <div key={i} className="flex gap-4 p-6 rounded-xl border-b-4 border-gold bg-slate-50 transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                              <Award className="text-gold w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 leading-tight">{award.title}</h4>
                                <p className="text-sm text-slate-500 mt-1">{award.organization} {award.year && `• ${award.year}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "publications" && (
                <div className="space-y-12">
                   <h2 className="font-serif text-3xl font-bold text-navy mb-8 flex items-center gap-4">
                      <span className="w-12 h-1.5 bg-gold rounded-full" />
                      Scholarly Work
                   </h2>
                   
                   <div className="space-y-10">
                      {/* Books */}
                      {profile.publications.some(p => p.type === 'book') && (
                        <div>
                          <h3 className="text-xl font-bold text-navy mb-6 uppercase tracking-wider">Books & Authored Works</h3>
                          <div className="grid gap-6">
                            {profile.publications.filter(p => p.type === 'book').map((pub, i) => (
                              <div key={i} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                                <h4 className="font-bold text-slate-800 lg:text-lg mb-2 group-hover:text-gold transition-colors">{pub.title}</h4>
                                <p className="text-sm text-slate-500 italic">{pub.journal_book_name}</p>
                                <span className="inline-block mt-4 text-xs font-bold bg-navy/5 text-navy px-3 py-1 rounded-full uppercase tracking-widest">{pub.year}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Articles */}
                      {profile.publications.some(p => p.type === 'article') && (
                        <div>
                          <h3 className="text-xl font-bold text-navy mb-6 uppercase tracking-wider">Research Papers & Articles</h3>
                          <div className="grid gap-4">
                            {profile.publications.filter(p => p.type === 'article').map((pub, i) => (
                              <div key={i} className="flex gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors border-l-4 border-transparent hover:border-gold">
                                <span className="text-slate-300 font-serif text-3xl tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                                <div>
                                  <h4 className="font-semibold text-slate-800 leading-snug">{pub.title}</h4>
                                  <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">{pub.journal_book_name} | {pub.year}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                   </div>
                </div>
              )}

              {activeTab === "conferences" && (
                <div className="space-y-10">
                   <h2 className="font-serif text-3xl font-bold text-navy mb-8 flex items-center gap-4">
                      <span className="w-12 h-1.5 bg-gold rounded-full" />
                      Global Engagements
                   </h2>
                   <div className="grid gap-8">
                     {profile.conferences.map((conf, i) => (
                       <div key={i} className="relative pl-8 border-l-2 border-slate-100 pb-8 last:pb-0">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gold shadow-sm" />
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${conf.type === 'international' ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-navy/5 text-navy border border-navy/10'}`}>
                              {conf.type}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 font-mono">{conf.date}</span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 mb-2">{conf.title}</h4>
                          <p className="text-slate-500 text-sm italic">{conf.details}</p>
                          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-gold" />
                            Role: {conf.role}
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {activeTab === "research" && (
                <div className="space-y-12">
                   <h2 className="font-serif text-3xl font-bold text-navy mb-8 flex items-center gap-4">
                      <span className="w-12 h-1.5 bg-gold rounded-full" />
                      Impact & Leadership
                   </h2>
                   
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {profile.research.map((item, i) => (
                        <div key={i} className="flex flex-col p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all h-full">
                          <span className={`mb-6 text-2xl group-hover:scale-110 transition-transform ${item.type === 'guidance' ? 'text-blue-500' : 'text-gold'}`}>
                            {item.type === 'guidance' ? <GraduationCap /> : <Globe />}
                          </span>
                          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{item.meta_key}</h4>
                          <p className="text-navy text-2xl font-serif font-bold mb-4">{item.meta_value}</p>
                          <div className="mt-auto pt-4 border-t border-slate-200">
                             <div className="w-8 h-1 bg-gold rounded-full" />
                          </div>
                        </div>
                      ))}
                   </div>

                   {/* Add dummy projects if none found for visual completeness on this premium page */}
                   {profile.research.length === 0 && (
                     <div className="text-center py-12 text-slate-400">
                       <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                       <p>Detailed research projects coming soon.</p>
                     </div>
                   )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FacultyProfile;
