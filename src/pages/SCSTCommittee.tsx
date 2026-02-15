import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface CommitteeMember {
  sNo: number;
  name: string;
  designation: string;
  role: string;
  contact: string;
}

const committeeMembers: CommitteeMember[] = [
  { sNo: 1, name: "Prof. (Dr.) D. Surya Prakasa Rao", designation: "Vice-Chancellor", role: "Chairperson", contact: "vc@dsnlu.ac.in" },
  { sNo: 2, name: "Dr. B. Ravi Seva Naik", designation: "Associate Professor", role: "Member Secretary", contact: "ravisenaik@dsnlu.ac.in" },
  { sNo: 3, name: "Dr. K. Sudha", designation: "Associate Professor", role: "Member", contact: "sudhak@dsnlu.ac.in" },
  { sNo: 4, name: "Dr. P. Sree Sudha", designation: "Associate Professor", role: "Member", contact: "sreesudha@dsnlu.ac.in" },
  { sNo: 5, name: "Dr. R. Bharat Kumar", designation: "Assistant Professor", role: "Member", contact: "bharat@dsnlu.ac.in" },
  { sNo: 6, name: "Mrs. S. Manjula", designation: "Assistant Professor", role: "Member", contact: "manjula@dsnlu.ac.in" },
];

const SCSTCommittee = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="committee" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Advisory Committee – SC / ST Cell
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The committee is responsible for policy decisions and monitoring the welfare initiatives for members of the Scheduled Castes and Scheduled Tribes.
                </p>
              </div>

              {/* Styled Table Container */}
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-navy text-white text-sm uppercase tracking-wider">
                        <th className="px-6 py-5 font-bold">S.No</th>
                        <th className="px-6 py-5 font-bold">Name</th>
                        <th className="px-6 py-5 font-bold">Designation</th>
                        <th className="px-6 py-5 font-bold">Role</th>
                        <th className="px-6 py-5 font-bold">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm md:text-base">
                      {committeeMembers.map((member, index) => (
                        <motion.tr 
                          key={member.sNo}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="hover:bg-muted/50 transition-colors group"
                        >
                          <td className="px-6 py-4 font-bold text-gold">{member.sNo}</td>
                          <td className="px-6 py-4 font-bold text-foreground group-hover:text-gold transition-colors">{member.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{member.designation}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">{member.contact}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-12 p-8 rounded-2xl bg-secondary/30 border border-dashed border-gold/30">
                <h4 className="font-serif text-xl font-bold text-navy mb-4">Committee Responsibilities</h4>
                <ul className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Monitor the implementation of reservation policies in admissions and appointments.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Review welfare programs and suggest improvements for student success.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Ensure timely redressal of grievances related to discrimination or exclusion.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Facilitate communication between the SC/ST community and university administration.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SCSTCommittee;
