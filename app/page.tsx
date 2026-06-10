import HeroSlider from "@/components/home/PremiumHero.tsx";
import AboutSection from "@/components/home/AboutSection";
// import ServicesSection from "@/components/home/PremiumServices";
// import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
// import PartnersSection from "@/components/home/PartnerSection";
import WorkFlowSection from "@/components/home/StatsSection";
import GrowthSection from "@/components/home/GrowthSection";
import CalculatorSection from "@/components/home/CalculatorSection";
import SuccessStories from "@/components/home/SuccessSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSlider />
        <AboutSection />
        <WorkFlowSection />
        <GrowthSection />
        <WhyChooseUs />
        <CalculatorSection />
        <SuccessStories />
        
      </main>
    </>
  );
}