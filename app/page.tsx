import Hero from "@/components/Hero";
import FeaturedKits from "@/components/FeaturedKits";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import SchoolsSection from "@/components/SchoolsSection";
import ParentReviews from "@/components/ParentReviews";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedKits />
      <HowItWorks />
      <WhyChoose />
      <SchoolsSection />
      <ParentReviews />
    </>
  );
}
