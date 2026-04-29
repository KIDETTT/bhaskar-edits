import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CtaVideoSection from "@/components/CtaVideoSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import StatsSection from "@/components/StatsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Marquee />
      <HeroSection />
      <ServicesSection />
      <CtaVideoSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <StatsSection />
      <ReviewsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
