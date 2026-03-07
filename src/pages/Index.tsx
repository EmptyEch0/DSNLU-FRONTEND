import { useLocation } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminBar } from "@/components/AdminBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VCMessageSection } from "@/components/sections/VCMessageSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { NoticesSection } from "@/components/sections/NoticesSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CampusSection } from "@/components/sections/CampusSection";
import { NotificationTicker } from "@/components/common/NotificationTicker";

const Index = () => {
  const location = useLocation();
  const { token } = useAdmin();

  const isAdminRoute = location.search.includes("admin=true");

  if (isAdminRoute && !token) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {token && <AdminBar />}
      <Header />
      <NotificationTicker />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <VCMessageSection />
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
