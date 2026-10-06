import Hero from "@/components/Hero";
import FeatureIconsRow from "@/components/FeatureIconsRow";
import ProductLineup from "@/components/ProductLineup";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import WhyChooseRow from "@/components/WhyChooseRow";
import ParentReviews from "@/components/ParentReviews";
import SignupBand from "@/components/SignupBand";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureIconsRow />
      <ProductLineup />
      <HowItWorksSteps />
      <WhyChooseRow />
      <ParentReviews />
      <SignupBand />
    </>
  );
}
