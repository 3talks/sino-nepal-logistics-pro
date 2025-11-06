import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ParallaxScene3D from "@/components/3d/ParallaxScene3D";
import FloatingBox from "@/components/3d/FloatingBox";
import ParticleField from "@/components/3d/ParticleField";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import { useScroll } from "@/hooks/use-scroll";

const Hero = () => {
  const { scrollY } = useScroll();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background with Parallax */}
      <div className="absolute inset-0 opacity-30">
        <ParallaxScene3D scrollY={scrollY} parallaxStrength={1.5}>
          <ParticleField scrollOffset={scrollY} />
          <FloatingGeometry position={[-3, 1, 0]} type="sphere" scrollOffset={scrollY} />
          <FloatingGeometry position={[3, -1, -2]} type="torus" scrollOffset={scrollY * 0.8} />
          <FloatingGeometry position={[0, 2, -3]} type="octahedron" scrollOffset={scrollY * 1.2} />
        </ParallaxScene3D>
      </div>
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTQgMTRjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      {/* Animated mountains silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-navy-light/40 to-transparent pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,150 L200,50 L400,120 L600,30 L800,100 L1000,60 L1200,140 L1200,300 L0,300 Z" fill="rgba(0,31,63,0.3)" />
          <path d="M0,180 L300,100 L500,150 L700,80 L900,130 L1200,110 L1200,300 L0,300 Z" fill="rgba(0,31,63,0.5)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 animate-fade-in">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-white font-medium">Nepal Customs Compliant</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-up">
            Seamless Logistics from
            <span className="block bg-gradient-gold bg-clip-text text-transparent">
              China to Nepal
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Efficient cross-border transportation, customs clearance, and supply chain solutions for your business
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/services">
              <Button variant="hero" size="lg" className="group">
                Shop Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-navy">
                Track Shipment
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Zap className="w-5 h-5 text-gold" />
              <span className="text-white font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Package className="w-5 h-5 text-teal" />
              <span className="text-white font-medium">Secure Handling</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-white font-medium">Full Compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
