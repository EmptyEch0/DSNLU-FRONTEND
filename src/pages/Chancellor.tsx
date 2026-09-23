import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Calendar, Award, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { ChancellorEditModal } from "@/components/admin/ChancellorEditModal";

const API = import.meta.env.VITE_API_URL;

interface ChancellorProfile {
  id?: number;
  name: string;
  title_tag?: string;
  designation: string;
  university_designation: string;
  dob?: string;
  biography: string;
  image_url: string;
  start_date?: string;
  end_date?: string | null;
  is_current?: number | boolean;
}

interface ChancellorHistoryItem {
  id?: number;
  name: string;
  title_tag?: string;
  start_date: string;
  end_date?: string | null;
  is_founder?: boolean | number;
}

const DEFAULT_CURRENT_CHANCELLOR: ChancellorProfile = {
  id: 11,
  name: "Lisa Gill",
  title_tag: "Hon'ble Smt. Justice",
  designation: "The Hon'ble The Chief Justice",
  university_designation: "Chancellor, DSNLU",
  dob: "17-11-1966",
  biography: `Date of Birth :  17-11-1966

Her Lordship completed schooling at Carmel Convent School, Sector 9, Chandigarh, graduated in the discipline of humanities from GCG, Sector 11, Chandigarh and is an alumni of the Department of Laws, Panjab University having pursued B.A. LL.B. (three years) and LL.M. from there. Enrolled as an Advocate in the year 1990 and practiced at the Punjab and Haryana High Court. Dealt with cases of various kinds including criminal, civil, service, revenue and constitutional. Represented Union Territory, Chandigarh for a number of years as well as some of the Boards and Corporations. Elevated to the Bench of the Punjab and Haryana High Court on 31.03.2014.

Transferred to the High Court of Andhra Pradesh and sworn in as such on 13.03.2026.

Appointed as Chief Justice of High Court of Andhra Pradesh and sworn in as such on 25.04.2026.`,
  image_url: "https://dsnlu.ac.in/wp-content/uploads/2026/04/CJ-AP-Smt.-Justice-Lisa-Gill.webp",
  start_date: "2026-04-25",
  end_date: null,
  is_current: 1,
};

const DEFAULT_FOUNDER_CHANCELLOR = {
  name: "Prof. A. Lakshminath",
  from: "05.11.2008",
  to: "04.11.2014",
  description: "Professor A. Lakshminath served as the Founder Chancellor of Damodaram Sanjivayya National Law University. His foundational vision and pioneering leadership were instrumental in establishing DSNLU as a premier institution for legal education in Andhra Pradesh and India.",
};

const DEFAULT_CHANCELLORS_HISTORY: ChancellorHistoryItem[] = [
  {
    id: 1,
    name: "Dilip Babasaheb Bhosale",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "12.05.2016",
    end_date: "30.07.2016",
  },
  {
    id: 2,
    name: "Ramesh Ranganathan",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "31.07.2016",
    end_date: "06.07.2018",
  },
  {
    id: 3,
    name: "T. B. Radha Krishnan",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "07.07.2018",
    end_date: "31.12.2018",
  },
  {
    id: 4,
    name: "C. Praveen Kumar",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "01.01.2019",
    end_date: "06.10.2019",
  },
  {
    id: 5,
    name: "J. K. Maheshwari",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "07.10.2019",
    end_date: "04.01.2021",
  },
  {
    id: 6,
    name: "Arup Kumar Goswami",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "06.01.2021",
    end_date: "10.10.2021",
  },
  {
    id: 7,
    name: "Prashant Kumar Mishra",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "13.10.2021",
    end_date: "18.05.2023",
  },
  {
    id: 8,
    name: "A.V. Sesha Sai",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "19.05.2023",
    end_date: "27.07.2023",
  },
  {
    id: 9,
    name: "Dhiraj Singh Thakur",
    title_tag: "Hon’ble Mr. Justice",
    start_date: "28.07.2023",
    end_date: "24.04.2026",
  },
  {
    id: 10,
    name: "Lisa Gill",
    title_tag: "Hon’ble Smt. Justice",
    start_date: "25.04.2026",
    end_date: null,
  },
];

// Helper to format dates to DD.MM.YYYY format
const formatDisplayDate = (dateStr?: string | null): string => {
  if (!dateStr) return "";
  const trimmed = String(dateStr).trim();
  // If already in DD.MM.YYYY format
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  // If in YYYY-MM-DD or ISO format
  const dateOnly = trimmed.split("T")[0];
  const parts = dateOnly.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }
  return trimmed;
};

const Chancellor = () => {
  const [current, setCurrent] = useState<ChancellorProfile>(DEFAULT_CURRENT_CHANCELLOR);
  const [history, setHistory] = useState<ChancellorHistoryItem[]>(DEFAULT_CHANCELLORS_HISTORY);
  const { token } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      if (API) {
        const res = await fetch(`${API}/api/chancellors/current`);
        const json = await res.json();
        if (json.success && json.data) {
          setCurrent(json.data);
        }

        const historyRes = await fetch(`${API}/api/chancellors`);
        const historyData = await historyRes.json();
        if (Array.isArray(historyData) && historyData.length > 0) {
          const nonFounder = historyData.filter((item: any) => !item.is_founder);
          if (nonFounder.length > 0) {
            setHistory(nonFounder);
          }
        }
      }
    } catch (error) {
      console.warn("Chancellor Fetch Error, using default verified data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Leadership & Governance</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">Chancellor</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-medium uppercase tracking-widest text-gold"
            >
              Leadership & Governance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Chancellor
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Chancellor Profile Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            {token && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-gold shadow-lg hover:bg-navy/90 transition-all cursor-pointer"
                >
                  Edit Chancellor
                </button>
              </div>
            )}
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              {/* Left Side: Image & Title Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col items-center"
              >
                <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white bg-card">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    src={current.image_url}
                    alt={`${current.title_tag || ""} ${current.name}`}
                    className="aspect-[3/4] w-64 md:w-full max-w-sm object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://dsnlu.ac.in/wp-content/uploads/2026/04/CJ-AP-Smt.-Justice-Lisa-Gill.webp";
                    }}
                  />
                </div>
                <div className="mt-6 text-center space-y-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {current.title_tag ? `${current.title_tag} ` : ""}
                    {current.name}
                  </h2>
                  <div className="inline-block rounded-full bg-gold/15 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-gold">
                    {current.designation}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {current.university_designation || "Chancellor, DSNLU"}
                  </p>
                </div>
              </motion.div>

              {/* Right Side: Biography & Date of Birth */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6"
              >
                {/* Date of Birth Badge */}
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-gold/30 bg-gold/5 px-4 py-2.5 text-navy font-semibold">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="text-foreground">
                    <strong className="text-gold">Date of Birth :</strong> 17-11-1966
                  </span>
                </div>

                {/* Biography Paragraphs */}
                <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg text-justify">
                  <p>
                    Her Lordship completed schooling at Carmel Convent School, Sector 9, Chandigarh, graduated in the discipline of humanities from GCG, Sector 11, Chandigarh and is an alumni of the Department of Laws, Panjab University having pursued B.A. LL.B. (three years) and LL.M. from there. Enrolled as an Advocate in the year 1990 and practiced at the Punjab and Haryana High Court. Dealt with cases of various kinds including criminal, civil, service, revenue and constitutional. Represented Union Territory, Chandigarh for a number of years as well as some of the Boards and Corporations. Elevated to the Bench of the Punjab and Haryana High Court on 31.03.2014.
                  </p>
                  <p>
                    Transferred to the High Court of Andhra Pradesh and sworn in as such on 13.03.2026.
                  </p>
                  <p>
                    Appointed as Chief Justice of High Court of Andhra Pradesh and sworn in as such on 25.04.2026.
                  </p>
                </div>

                {/* Key Highlights Card */}
                <div className="mt-8 rounded-xl border border-border/80 bg-secondary/20 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-navy font-bold">
                    <Award className="h-5 w-5 text-gold" />
                    <span>Office of the Chancellor</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By virtue of the office of the Chief Justice of the High Court of Andhra Pradesh, Her Lordship serves as the Chancellor of Damodaram Sanjivayya National Law University, guiding the university towards academic distinction, research excellence, and high constitutional ideals.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Chancellor Section */}
        <section className="bg-secondary/30 py-16 lg:py-24 border-y border-border/50">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">Foundation & Heritage</span>
                  <h2 className="font-serif text-3xl font-bold text-foreground mt-1 uppercase">FOUNDER CHANCELLOR</h2>
                  <div className="h-1 w-16 rounded-full bg-gold mt-3" />
                </div>
                
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">
                  {DEFAULT_FOUNDER_CHANCELLOR.description}
                </p>

                {/* Founder Chancellor Table */}
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm mt-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy text-gold uppercase text-xs font-bold tracking-wider">
                        <th className="px-6 py-3.5">NAME</th>
                        <th className="px-6 py-3.5">From</th>
                        <th className="px-6 py-3.5">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-gold/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">{DEFAULT_FOUNDER_CHANCELLOR.name}</td>
                        <td className="px-6 py-4 text-muted-foreground font-medium">{DEFAULT_FOUNDER_CHANCELLOR.from}</td>
                        <td className="px-6 py-4 text-muted-foreground font-medium">{DEFAULT_FOUNDER_CHANCELLOR.to}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex justify-center"
              >
                <div className="relative p-6 rounded-2xl border border-gold/30 bg-card shadow-elegant text-center space-y-4 max-w-sm">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Building2 className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">{DEFAULT_FOUNDER_CHANCELLOR.name}</h3>
                    <p className="text-xs uppercase font-semibold text-gold tracking-widest mt-1">Founder Chancellor</p>
                    <p className="text-xs text-muted-foreground mt-2">Tenure: 05.11.2008 – 04.11.2014</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* List of Chancellors Table */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
                  CHANCELLOR
                </h2>
                <p className="mt-2 font-serif text-lg font-medium text-gold uppercase tracking-wider">
                  CHIEF JUSTICE- HIGH COURT OF ANDHRA PRADESH, AMARAVATHI
                </p>
                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold" />
                <p className="mt-3 text-sm text-muted-foreground">Historical list of the Hon'ble Chancellors of DSNLU</p>
              </div>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gold text-navy uppercase text-xs md:text-sm font-bold tracking-wider">
                        <th className="px-6 py-4">NAME</th>
                        <th className="px-6 py-4">From</th>
                        <th className="px-6 py-4">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm md:text-base">
                      {history.map((chancellor, index) => {
                        const fullName = `${chancellor.title_tag ? chancellor.title_tag + " " : ""}${chancellor.name}`;
                        const formattedFrom = formatDisplayDate(chancellor.start_date);
                        const formattedTo = chancellor.end_date ? formatDisplayDate(chancellor.end_date) : "";

                        return (
                          <tr 
                            key={chancellor.id || index} 
                            className={`transition-colors hover:bg-gold/5 group ${!chancellor.end_date ? "bg-gold/5" : ""}`}
                          >
                            <td className="px-6 py-4 font-bold text-foreground group-hover:text-gold transition-colors">
                              {fullName}
                              {chancellor.is_founder && " (Founder Chancellor)"}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground group-hover:text-foreground font-medium">
                              {formattedFrom}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground group-hover:text-foreground font-medium">
                              {formattedTo ? (
                                formattedTo
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold text-green-800 border border-green-300">
                                  Present
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChancellorEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chancellorData={current}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default Chancellor;
