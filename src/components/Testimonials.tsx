import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import FloatingStars from "@/components/3d/FloatingStars";

const testimonials = [
  {
    name: "Wei Zhang",
    role: "Import Manager, TechGear Nepal",
    location: "Kathmandu, Nepal",
    content: "SNLH transformed our supply chain from China. Their customs compliance expertise saved us from costly delays and their online booking system is incredibly efficient.",
    rating: 5,
    avatar: "WZ",
  },
  {
    name: "Rajesh Sharma",
    role: "CEO, Himalayan Traders",
    location: "Pokhara, Nepal",
    content: "We've been using SNLH for 2 years now. Their Nepal customs knowledge is unmatched, and the transparent pricing with duty calculations is a game-changer.",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Li Ming",
    role: "Export Director, GuangMei Corp",
    location: "Guangzhou, China",
    content: "Fast, reliable, and professional. SNLH handles all documentation flawlessly. Their team understands both Chinese and Nepali business cultures perfectly.",
    rating: 5,
    avatar: "LM",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* 3D Stars Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Scene3D>
          <FloatingStars />
        </Scene3D>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy">
            Trusted by Businesses Across Borders
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our clients say about our China-Nepal logistics services
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="relative p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-2 hover:border-teal animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-teal" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="w-12 h-12 rounded-full bg-gradient-card flex items-center justify-center text-white font-bold shadow-teal">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-navy">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-teal">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
