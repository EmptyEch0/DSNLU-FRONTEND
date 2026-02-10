import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const vcImageUrl = "https://dsnlu.ac.in/storage/2024/04/vcdsnlu.jpeg";
const vcCvUrl = "https://dsnlu.ac.in/storage/2024/07/Prof_-D_S_Prakasa-Rao_CV.pdf";

const ViceChancellor = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Vice-Chancellor's Message</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-primary py-16">
          <div className="container text-center">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              Vice-Chancellor's Message
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </div>
        </div>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid items-start gap-12 lg:grid-cols-5">
              {/* Portrait */}
              <div className="flex flex-col items-center lg:col-span-2">
                <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={vcImageUrl}
                    alt="Prof. (Dr.) Dasari Surya Prakasa Rao"
                    className="aspect-[3/4] w-full max-w-xs object-cover"
                  />
                </div>
                <h2 className="text-center font-serif text-xl font-bold text-foreground">
                  Prof. (Dr.) Dasari Surya Prakasa Rao
                </h2>
                <p className="text-sm font-medium text-gold">Vice-Chancellor</p>
                <p className="text-sm text-muted-foreground">
                  Damodaram Sanjivayya National Law University
                </p>
                <Button asChild variant="outline" className="mt-4 border-gold/30 text-gold hover:bg-gold hover:text-navy">
                  <a href={vcCvUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </a>
                </Button>
              </div>

              {/* Full Message */}
              <div className="space-y-5 text-muted-foreground leading-relaxed lg:col-span-3">
                <p>
                  It gives me immense pleasure to welcome you to the Damodaram Sanjivayya National Law University, 
                  Visakhapatnam — an institution established by the Government of Andhra Pradesh to create a centre 
                  of excellence in legal education and research.
                </p>
                <p>
                  Named after the great visionary and former Chief Minister of Andhra Pradesh, Shri Damodaram 
                  Sanjivayya, our university carries forward his legacy of social justice, equality, and 
                  empowerment through the transformative power of legal education.
                </p>
                <p>
                  We are committed to producing legal professionals who are not only academically 
                  distinguished but are also ethically grounded, socially aware, and capable of contributing 
                  meaningfully to the justice delivery system of our nation.
                </p>
                <p>
                  Our faculty comprises distinguished scholars, and our curriculum is designed to meet 
                  global standards while remaining rooted in the Indian constitutional framework. Through 
                  moot courts, legal aid clinics, internships, and research centres, we provide a holistic 
                  learning experience.
                </p>
                <p>
                  The university's research centres focus on critical areas such as Constitutional Law, 
                  Intellectual Property Rights, Environmental Law, and International Humanitarian Law, 
                  enabling students and faculty to contribute original scholarship to the legal discourse.
                </p>
                <p>
                  I invite aspiring legal minds to join our community and become part of a tradition of 
                  excellence that shapes the future of legal education in India. Together, let us build 
                  a just and equitable society.
                </p>
                <p className="font-serif italic text-foreground">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ViceChancellor;
