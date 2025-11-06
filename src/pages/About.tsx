import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Users, Award, Globe } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import ParticleField from "@/components/3d/ParticleField";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To simplify China-Nepal trade through reliable, efficient logistics solutions.",
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Experienced logistics professionals dedicated to your success.",
    },
    {
      icon: Award,
      title: "Our Commitment",
      description: "Excellence in service delivery and customer satisfaction.",
    },
    {
      icon: Globe,
      title: "Our Network",
      description: "Extensive partnerships across China and Nepal for seamless operations.",
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
              About SNLH
            </h1>
            <p className="text-xl text-white/90">
              Your trusted partner in China-Nepal logistics
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">Our Story</h2>
            <Card className="p-8">
              <p className="text-lg text-gray-700 mb-4">
                Sino-Nepal Logistics Hub (SNLH) was founded with a vision to bridge the gap between Chinese manufacturers and Nepali businesses. With years of experience in international logistics, we understand the unique challenges of cross-border trade in the region.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our team combines deep knowledge of customs regulations, efficient supply chain management, and a commitment to transparency. We've successfully facilitated thousands of shipments, helping businesses grow through reliable logistics solutions.
              </p>
              <p className="text-lg text-gray-700">
                Today, SNLH stands as a trusted partner for businesses of all sizes, offering comprehensive logistics services from sourcing to delivery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-navy/5 relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Scene3D>
            <ParticleField />
            <FloatingGeometry position={[-3, 1, 0]} type="torus" />
            <FloatingGeometry position={[3, -1, -1]} type="sphere" />
            <FloatingGeometry position={[0, 2, -2]} type="octahedron" />
          </Scene3D>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-teal mb-2">5000+</h3>
              <p className="text-gray-600">Shipments Delivered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-teal mb-2">200+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-teal mb-2">15+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-teal mb-2">99%</h3>
              <p className="text-gray-600">On-Time Delivery</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
