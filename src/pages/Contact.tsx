import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-navy">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-navy">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-navy">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+977 XXX-XXXXXXX"
                      className="mt-2"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-navy">
                      Company
                    </Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Your Company Name"
                      className="mt-2"
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-navy">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us about your logistics needs..."
                    rows={6}
                    className="mt-2"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
