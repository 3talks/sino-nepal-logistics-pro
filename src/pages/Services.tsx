import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plane, Ship, Truck, FileText, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping solutions for large cargo volumes from China to Nepal.",
      price: "From $500/container",
      color: "text-blue-500",
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable air cargo services for time-sensitive shipments.",
      price: "From $5/kg",
      color: "text-teal",
    },
    {
      icon: Truck,
      title: "Land Transport",
      description: "Door-to-door delivery services across Nepal with full tracking.",
      price: "Custom quotes",
      color: "text-orange-500",
    },
    {
      icon: Package,
      title: "Warehousing",
      description: "Secure storage facilities in both China and Nepal for your goods.",
      price: "From $100/month",
      color: "text-purple-500",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Complete handling of all shipping documentation and paperwork.",
      price: "Included",
      color: "text-green-500",
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive insurance coverage for your shipments.",
      price: "From 0.5%",
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Logistics Services
            </h1>
            <p className="text-xl text-white/90">
              Comprehensive shipping and logistics solutions tailored for China-Nepal trade
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-card flex items-center justify-center mb-6 ${service.color}`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-lg font-semibold text-teal">{service.price}</span>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us for personalized logistics solutions tailored to your specific needs
          </p>
          <Button variant="hero" size="lg">Get a Quote</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
