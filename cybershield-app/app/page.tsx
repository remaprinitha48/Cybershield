import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import ContactSection from "@/components/landing/ContactSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <main>
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <LandingFooter />
    </main>
  );
}
