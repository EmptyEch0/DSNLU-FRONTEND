import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProfessorEmeritusBio = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold text-xs sm:text-sm">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/professor-emeritus" className="transition-colors hover:text-gold text-xs sm:text-sm">People</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/professor-emeritus" className="transition-colors hover:text-gold text-xs sm:text-sm">Professor Emeritus</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold truncate text-xs sm:text-sm lg:max-w-none max-w-[150px]">
              Hon'ble Justice D.V.S.S. Somayajulu
            </span>
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
              Professor Emeritus
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl max-w-4xl mx-auto leading-tight"
            >
              Hon'ble Justice D.V.S.S. Somayajulu
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Profile Details Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              {/* Left Column: Profile Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="relative group overflow-hidden rounded-2xl shadow-elegant border-4 border-white bg-white">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    src="https://dsnlu.ac.in/storage/2024/01/DVVS.jpg"
                    alt="Hon'ble Justice D.V.S.S. Somayajulu"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                
                <div className="bg-card p-6 rounded-2xl border-l-4 border-gold shadow-sm">
                  <p className="font-serif text-xl font-bold text-foreground">
                    Hon'ble Justice D.V.S.S. Somayajulu
                  </p>
                  <p className="mt-2 text-gold font-medium uppercase tracking-wider text-sm">
                    Former Judge, High Court of A.P.
                  </p>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Member – General Council, Executive Council & Academic Council, DSNLU
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Bio Data */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-8"
              >
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Bio Data</h2>
                  <div className="h-1 w-16 bg-gold rounded-full mb-8" />
                  
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6 text-justify">
                    <p>
                      Hon'ble Justice D.V.S.S. Somayajulu is a distinguished legal professional with a notable career as a High Court Judge and a strong association with Damodaram Sanjivayya National Law University (DSNLU). Born on September 26, 1961, he is a fourth-generation lawyer, following in the footsteps of his father, late Sri D.V. Subba Rao, a respected advocate, Chairman of the Bar Council of India, and former Mayor of Visakhapatnam.
                    </p>
                    <p>
                      Justice Somayajulu received his early education in Visakhapatnam, completing his B.Com at Dr. L.B. College and his B.L. from Andhra University. He was enrolled as an Advocate on the Roll of the Bar Council of Andhra Pradesh and practiced law extensively in Visakhapatnam. His practice specialized in civil, commercial, and arbitration matters, and he represented numerous Public Sector Undertakings, private companies, and banks. He has also appeared before legal luminaries in arbitrations both within India and internationally.
                    </p>
                    <p>
                      Beyond his legal practice, Justice Somayajulu has held various leadership positions, including President of the Andhra Cricket Association and a Member of the Legal Committee of the Board of Cricket Control (BCCI). He also served as President of the Bar Association, Visakhapatnam, and as a General Trustee for several cultural and educational institutions in Visakhapatnam. He was also nominated as a 'Swatchh Bharat Ambassador' for Visakhapatnam.
                    </p>
                    <p>
                      On September 21, 2017, he was appointed as a Judge of the High Court of Judicature at Hyderabad for the State of Telangana and the State of Andhra Pradesh, becoming the first advocate from a mofussil Bar in Andhra Pradesh to be directly elevated as a High Court Judge. He laid down office on September 25, 2023, upon attaining the age of superannuation. Following his retirement, he was designated as a Senior Advocate by the Supreme Court of India in October 2023.
                    </p>
                    <p>
                      Justice D.V.S.S. Somayajulu maintains a significant connection with Damodaram Sanjivayya National Law University (DSNLU). He is a Member of its General Council, Executive Council, and Academic Council. Furthermore, he has been appointed as Professor Emeritus at DSNLU. He has also delivered lectures at the university, including the first Justice E. Venkatesam endowment lecture on "judicial activism - boon or bane," where he encouraged DSNLU students to consider careers as trial court judges.
                    </p>
                  </div>
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

export default ProfessorEmeritusBio;
