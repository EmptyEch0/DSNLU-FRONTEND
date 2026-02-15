import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SCSTHeader } from "@/components/layout/SCSTHeader";
import { motion } from "framer-motion";
import { 
  Scale, 
  FileText, 
  Globe,
  ScrollText,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SCSTSafeguards = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SCSTHeader activeTab="safeguards" />

        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy mb-2">
                  <Scale className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Constitutional Safeguards & Legislation</h2>
                <div className="divider-gold mx-auto" />
                <p className="text-muted-foreground text-lg italic">"Upholding the dignity and rights of Scheduled Castes and Scheduled Tribes through legal empowerment."</p>
              </div>

              {/* Constitutional Highlights */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="p-8 rounded-2xl border-l-4 border-l-gold bg-card shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-gold">
                    <ShieldCheck className="h-6 w-6" />
                    <span className="font-bold tracking-tight uppercase">Social Justice</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy">Article 17</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Abolition of Untouchability: The practice of untounchability is forbidden and its practice in any form is an offence punishable in accordance with law.
                  </p>
                </div>
                <div className="p-8 rounded-2xl border-l-4 border-l-navy bg-navy text-white shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-gold">
                    <Scale className="h-6 w-6" />
                    <span className="font-bold tracking-tight uppercase">Equal Opportunity</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gold">Article 46</h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    Promotion of Educational & Economic Interests: The State shall promote with special care the interests of the weaker sections of the people.
                  </p>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                   <FileText className="h-6 w-6 text-gold" />
                   <h3 className="text-2xl font-serif font-bold">Legislative Framework</h3>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="caste-atst" className="border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline hover:text-gold transition-colors font-bold text-lg py-6">
                      The SC and ST (Prevention of Atrocities) Act, 1989
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      The Act was enacted by the Parliament of India to prevent atrocities and hate crimes against Scheduled Castes and Scheduled Tribes. It provides for Special Courts for the trial of such offences and the rehabilitation of the victims. The University maintains a zero-tolerance policy towards any violations listed under this Act.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="provision-education" className="border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline hover:text-gold transition-colors font-bold text-lg py-6">
                      Post-Matric Scholarship Schemes
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      Centrally sponsored schemes implemented by State Governments/UT Administrations to provide financial assistance to SC/ST students. DSNLU facilitates the application process and ensures that eligible students receive these benefits promptly to support their legal education.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ugc-guidelines" className="border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline hover:text-gold transition-colors font-bold text-lg py-6">
                      UGC Guidelines for Safeguarding Welfare
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      The University Grants Commission (UGC) issued specific guidelines for the establishment of SC/ST cells in universities. These guidelines mandate monitoring of student enrollment, implementation of remedial classes, and oversight of the university's compliance with constitutional reservation policies.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manual-atst" className="border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline hover:text-gold transition-colors font-bold text-lg py-6">
                      Protection of Civil Rights Act, 1955
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      An Act to prescribe punishment for the preaching and practice of "untouchability" and for the enforcement of any disability arising therefrom and for matters connected therewith.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="p-8 rounded-2xl bg-gold/5 border border-gold/20 flex flex-col md:flex-row items-center gap-6">
                 <div className="h-16 w-16 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Globe className="h-8 w-8" />
                 </div>
                 <div className="space-y-2 text-center md:text-left">
                    <h4 className="font-bold text-lg">National Commission for SC / ST</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                       For broader jurisdictional matters, the Cell coordinates with the National Commission for Scheduled Castes and the National Commission for Scheduled Tribes to ensure institutional compliance with statutory regulations.
                    </p>
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

export default SCSTSafeguards;
