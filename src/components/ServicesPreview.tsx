import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Ship, Truck, FileCheck, Warehouse, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Scene3D from "@/components/3d/Scene3D";
import RotatingServiceIcon from "@/components/3d/RotatingServiceIcon";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast and reliable air cargo services from major Chinese cities to Kathmandu with priority customs handling.",
    price: "From $5.50/kg",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Cost-effective ocean shipping solutions with full container and LCL options, customs pre-clearance included.",
    price: "From $850/20ft",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Truck,
    title: "Road Transport",
    description: "Direct overland routes through Tibet with experienced drivers and Nepal border expertise.",
    price: "From $2,200/truck",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Expert Nepal customs brokerage ensuring HTS compliance, duty optimization, and documentation support.",
    price: "From $180",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure storage facilities in Kathmandu with inventory management and distribution services.",
    price: "From $95/m³/month",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Network,
    title: "Supply Chain",
    description: "End-to-end supply chain solutions with real-time tracking and compliance monitoring.",
    price: "Custom Quote",
    color: "from-pink-500 to-pink-600",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* 3D Service Icons Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Scene3D enableControls={false}>
          {services.map((service, index) => (
            <RotatingServiceIcon 
              key={index}
              color={service.color.split(' ')[0].replace('from-', '#')}
              index={index}
            />
          ))}
        </Scene3D>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy">
            Our Premium Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive logistics solutions tailored for China-Nepal trade with full customs compliance
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden hover:shadow-large transition-all duration-500 hover:-translate-y-2 border-2 hover:border-teal animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
              
              <div className="p-8 space-y-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-navy group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold text-teal">{service.price}</span>
                  <Button variant="ghost" size="sm" className="group-hover:bg-teal group-hover:text-white transition-colors">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/0 to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/services">
            <Button variant="premium" size="lg">
              View All Services & Shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
