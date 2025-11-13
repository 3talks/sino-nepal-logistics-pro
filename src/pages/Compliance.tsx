import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileCheck, Shield, AlertCircle } from "lucide-react";
import DutyCalculator from "@/components/DutyCalculator";

const Compliance = () => {
  const complianceServices = [
    {
      icon: FileCheck,
      title: "Customs Clearance",
      description: "Expert handling of all customs procedures and documentation for smooth clearance.",
    },
    {
      icon: Shield,
      title: "Import Regulations",
      description: "Stay compliant with Nepal's import regulations and restrictions.",
    },
    {
      icon: CheckCircle,
      title: "Documentation Support",
      description: "Complete assistance with bills of lading, certificates of origin, and more.",
    },
  ];

  const importGuidelines = [
    "All imports must comply with Nepal Trade and Export Promotion Centre regulations",
    "Proper documentation including invoice, packing list, and certificate of origin required",
    "Customs duties vary based on product category (5% to 30%)",
    "Restricted items include weapons, narcotics, and certain electronics",
    "Environmental clearance required for specific industrial goods",
    "Quality standards certification needed for food and pharmaceutical products",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Customs & Compliance
            </h1>
            <p className="text-xl text-white/90">
              Navigate Nepal's customs regulations with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Our Compliance Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceServices.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Duty Calculator Section */}
      <section className="py-16 bg-navy/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy text-center mb-4">
              Duty Calculator
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Calculate accurate customs duties based on HS codes and current exchange rates
            </p>
            <DutyCalculator />
          </div>
        </div>
      </section>

      {/* Import Guidelines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy text-center mb-12">
              Nepal Import Guidelines
            </h2>
            <Card className="p-8">
              <ul className="space-y-4">
                {importGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{guideline}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Need Compliance Assistance?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts are ready to help you navigate customs regulations
          </p>
          <Button variant="hero" size="lg">Contact Us</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
