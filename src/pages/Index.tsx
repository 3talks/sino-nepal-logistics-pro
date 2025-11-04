import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import ComplianceHighlight from "@/components/ComplianceHighlight";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesPreview />
      <ComplianceHighlight />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
