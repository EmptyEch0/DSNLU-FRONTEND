import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { NoticesSection } from "@/components/sections/NoticesSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CampusSection } from "@/components/sections/CampusSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <LeadershipSection />
        <ProgramsSection />
        <NoticesSection />
        <ResearchSection />
        <GallerySection />
        <CampusSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;