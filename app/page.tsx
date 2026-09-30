import Hero from "@/components/Hero";
import SignalGrid from "@/components/SignalGrid";
import FeaturedKits from "@/components/FeaturedKits";
import FeatureBento from "@/components/FeatureBento";
import SpecsSection from "@/components/SpecsSection";
import StatementBand from "@/components/StatementBand";
import SchoolsSection from "@/components/SchoolsSection";
import ParentReviews from "@/components/ParentReviews";
import SignupBand from "@/components/SignupBand";

export default function Home() {
  return (
    <>
      <Hero />
      <SignalGrid />
      <FeaturedKits />
      <FeatureBento />
      <SpecsSection />
      <StatementBand />
      <SchoolsSection />
      <ParentReviews />
      <SignupBand />
    </>
  );
}
