import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import FloatingGeometry from "@/components/3d/FloatingGeometry";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Office",
      details: ["Kathmandu, Nepal", "Beijing, China"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+977 XXX-XXXXXXX", "+86 XXX-XXXXXXXX"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@snlh.com", "support@snlh.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
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
              Get In Touch
            </h1>
            <p className="text-xl text-white/90">
              We're here to help with all your logistics needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Scene3D>
            <FloatingGeometry position={[-3, 1, 0]} type="sphere" />
            <FloatingGeometry position={[3, -1, -1]} type="torus" />
            <FloatingGeometry position={[0, 2, -2]} type="octahedron" />
            <FloatingGeometry position={[-2, -2, 1]} type="sphere" />
          </Scene3D>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-navy mb-6 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Full Name
                    </label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Phone
                    </label>
                    <Input placeholder="+977 XXX-XXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Company
                    </label>
                    <Input placeholder="Your Company Name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your logistics needs..."
                    rows={6}
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
