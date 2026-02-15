import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintsHeader } from "@/components/layout/ComplaintsHeader";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  UserPlus, 
  Scale, 
  Building2, 
  Phone, 
  Mail 
} from "lucide-react";

export const UGCGrievance = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <ComplaintsHeader activeTab="ugc-grievance" />
      
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[#0f2d5c]">
                    <ShieldCheck className="h-8 w-8 text-[#c9a227]" />
                    <h3 className="font-serif text-3xl font-bold">University Grants Commission (UGC)</h3>
                  </div>
                  <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">Redressal of Grievance of Students of DSNLU</p>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  DSNLU has appointed an Ombudsperson to oversee all matters related to institutional service standards and student welfare. This official channel ensures fairness, objectivity, and timely resolution to all submitted grievances.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-10 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Scale size={200} />
                </div>
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="h-20 w-20 rounded-3xl bg-[#0f2d5c] flex items-center justify-center text-white">
                      <UserPlus className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#c9a227]">Ombudsperson</p>
                      <h4 className="font-serif text-3xl font-bold text-[#0f2d5c]">Prof. A.B.S.V. Ranga Rao</h4>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Building2 className="h-4 w-4 text-[#c9a227]" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium leading-relaxed">
                        Damodaram Sanjivayya National Law University<br />
                        Nyayaprastha, Sabbavaram, Visakhapatnam – 531035, AP
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 pt-4">
                      <a href="tel:+918924248216" className="flex items-center gap-3 text-[#0f2d5c] font-bold text-sm hover:text-[#c9a227] transition-colors">
                        <Phone className="h-4 w-4 text-[#c9a227]" /> 08924 248216
                      </a>
                      <a href="mailto:rangarao_ausw@yahoo.com" className="flex items-center gap-3 text-[#0f2d5c] font-bold text-sm hover:text-[#c9a227] transition-colors">
                        <Mail className="h-4 w-4 text-[#c9a227]" /> rangarao_ausw@yahoo.com
                      </a>
                    </div>
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

export default UGCGrievance;
