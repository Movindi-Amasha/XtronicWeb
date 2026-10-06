import Hero from "@/components/Hero";
import FeatureIconsRow from "@/components/FeatureIconsRow";
import ProductLineup from "@/components/ProductLineup";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import WorksGallery from "@/components/WorksGallery";
import WhyChooseRow from "@/components/WhyChooseRow";
import SpecialsSection from "@/components/SpecialsSection";
import SubscriptionBand from "@/components/SubscriptionBand";
import ParentReviews from "@/components/ParentReviews";
import SignupBand from "@/components/SignupBand";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureIconsRow />
      <ProductLineup />
      <HowItWorksSteps />
      <WorksGallery />
      <WhyChooseRow />
      <SpecialsSection />
      <SubscriptionBand />
      <ParentReviews />
      <SignupBand />
    </>
  );
}
