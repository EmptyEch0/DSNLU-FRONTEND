import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { motion } from "framer-motion";
import { 
  FileCheck, 
  Scale, 
  Clock, 
  AlertCircle, 
  UserPlus, 
  Gavel, 
  FileText,
  Clock3
} from "lucide-react";

import { LucideIcon } from "lucide-react";

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: LucideIcon }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-navy/10 pb-4">
    <div className="p-2 bg-navy/5 rounded-lg">
      <Icon className="h-6 w-6 text-navy" />
    </div>
    <h2 className="font-serif text-2xl font-bold text-navy uppercase tracking-tight">{title}</h2>
  </div>
);

const RegulationItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-3 text-muted-foreground mb-4"
  >
    <div className="h-1.5 w-1.5 rounded-full bg-navy/40 mt-2.5 shrink-0" />
    <span className="text-lg leading-relaxed">{children}</span>
  </motion.li>
);

const LibraryRegulations = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LibraryHeader activeTab="regulations" />

        <section className="py-20 lg:py-28">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {/* Admission Section */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="Admission to the Library" icon={UserPlus} />
                <ul className="space-y-2">
                  <RegulationItem>Registration is mandatory to become a Library member.</RegulationItem>
                  <RegulationItem>Library membership cum RFID card must be shown when required.</RegulationItem>
                  <RegulationItem>Users must sign the Visitor Register at entrance.</RegulationItem>
                  <RegulationItem>Personal belongings must be kept at property counter (except laptops).</RegulationItem>
                  <RegulationItem>Only students, researchers and staff of DSNLU may access library.</RegulationItem>
                  <RegulationItem>Visitors require written permission from Vice-Chancellor/Registrar.</RegulationItem>
                </ul>
              </div>

              {/* General Regulations */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="General Regulations" icon={Gavel} />
                <ul className="space-y-2">
                  <RegulationItem>Silence must be maintained.</RegulationItem>
                  <RegulationItem>Taking books without permission amounts to theft.</RegulationItem>
                  <RegulationItem>Group discussions, sleeping, talking prohibited.</RegulationItem>
                  <RegulationItem>No eatables or drinks allowed.</RegulationItem>
                  <RegulationItem>
                    Mobile phones strictly prohibited. 
                    <span className="block mt-2 font-bold text-red-600">Fine: ₹100 first violation | Double fine for repeat violation</span>
                  </RegulationItem>
                  <RegulationItem>Library not responsible for loss of valuables.</RegulationItem>
                  <RegulationItem>Violations may lead to membership cancellation.</RegulationItem>
                  <RegulationItem>All documents must be returned before vacations.</RegulationItem>
                  <RegulationItem>Users must leave 10 minutes before closing time.</RegulationItem>
                </ul>
              </div>

              {/* Circulation Section */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="Circulation / Loan" icon={FileCheck} />
                <ul className="space-y-2">
                  <RegulationItem>Loan period: 10 days (students).</RegulationItem>
                  <RegulationItem>RFID card mandatory for transactions.</RegulationItem>
                  <RegulationItem>Books are non-transferable.</RegulationItem>
                  <RegulationItem>No books issued during vacations.</RegulationItem>
                  <RegulationItem>Renewal allowed once for 3 days (if not reserved).</RegulationItem>
                  <RegulationItem>Reference books require special permission.</RegulationItem>
                  <RegulationItem>Books may be recalled before due date.</RegulationItem>
                </ul>
              </div>

              {/* Overdue Charges */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="Overdue Charges" icon={Clock} />
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  {[
                    { days: "First 15 days", price: "₹2 per day" },
                    { days: "15–60 days", price: "₹3 per day" },
                    { days: "Above 60 days", price: "₹10 per day" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-navy/5 rounded-2xl text-center border border-navy/10">
                      <div className="text-navy font-bold text-xl mb-2">{item.price}</div>
                      <div className="text-muted-foreground text-sm uppercase tracking-wider">{item.days}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loss or Damage */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="Loss or Damage" icon={AlertCircle} />
                <ul className="space-y-2">
                  <RegulationItem>Borrower must report damage immediately.</RegulationItem>
                  <RegulationItem>Lost books must be replaced with same/latest edition.</RegulationItem>
                  <RegulationItem>If unavailable → double the cost payable.</RegulationItem>
                  <RegulationItem>Marking/tearing pages = damage.</RegulationItem>
                  <RegulationItem>Duplicate RFID card fee: ₹200</RegulationItem>
                  <RegulationItem>Action will be taken for non-return.</RegulationItem>
                </ul>
              </div>

              {/* No Dues Certificate */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-navy/5">
                <SectionHeader title="No Dues Certificate" icon={FileText} />
                <p className="text-muted-foreground text-lg mb-6">Students/faculty must meet the following criteria to receive a "No Due Certificate":</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {["Return all books", "Clear fines", "Submit RFID card"].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-blue-600/5 rounded-xl border border-blue-600/10">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <Scale className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-blue-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-navy text-white p-8 lg:p-12 rounded-3xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Clock3 className="h-48 w-48 text-white" />
                </div>
                <div className="relative z-10 grid gap-12 lg:grid-cols-2">
                  <div className="space-y-8">
                    <SectionHeader title="Library Timings" icon={Clock} />
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-white/70">Session</span>
                        <span className="font-bold">8:00 AM – 12:00 Midnight</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-white/70">Weekends/Holidays</span>
                        <span className="font-bold">9:00 AM – 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Public Holidays</span>
                        <span className="font-bold text-blue-600">Closed</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <SectionHeader title="Library Counter" icon={UserPlus} />
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-white/70">Mon–Fri</span>
                        <span className="font-bold">9:00 AM – 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Sat–Sun</span>
                        <span className="font-bold">10:00 AM – 4:00 PM</span>
                      </div>
                    </div>
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

export default LibraryRegulations;
