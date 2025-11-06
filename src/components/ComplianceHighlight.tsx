import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Calculator, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Scene3D from "@/components/3d/Scene3D";
import FloatingShield from "@/components/3d/FloatingShield";
import FloatingGeometry from "@/components/3d/FloatingGeometry";

const features = [
  {
    icon: Shield,
    title: "HTS Classification",
    description: "Expert guidance on Harmonized Tariff System codes for accurate duty calculation (0-80% range)",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    description: "Complete assistance with invoices, bills of lading, MSDS, and all required Nepal customs paperwork",
  },
  {
    icon: Calculator,
    title: "Duty Calculator",
    description: "Interactive tool to estimate import duties, VAT, and fees based on your shipment details",
  },
  {
    icon: CheckCircle2,
    title: "Regulatory Expertise",
    description: "Stay compliant with PAN/VAT registration, import permits, and Nepal customs procedures",
  },
];

const ComplianceHighlight = () => {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      {/* 3D Shield Background */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-15 pointer-events-none">
        <Scene3D>
          <FloatingShield />
          <FloatingGeometry position={[-2, -1, 0]} type="octahedron" />
          <FloatingGeometry position={[2, 2, -1]} type="torus" />
        </Scene3D>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0zNiAxOGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bS00IDE0Yy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] " />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-success/20 backdrop-blur-sm border border-success/30 rounded-full px-6 py-2 mb-4">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-success font-semibold">Nepal Customs Made Easy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Full Compliance,
              <span className="block bg-gradient-gold bg-clip-text text-transparent">
                Zero Hassle
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Navigate Nepal's import regulations with confidence. Our expert team ensures your shipments meet all customs requirements from HTS codes to documentation.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-navy-light border-navy-lighter hover:border-teal p-8 group hover:shadow-teal transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-card flex items-center justify-center shadow-teal group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Key Facts */}
          <div className="bg-navy-light border border-navy-lighter rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Key Nepal Import Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gold">0-80%</div>
                <p className="text-gray-400">Duty Rate Range</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-teal">PAN/VAT</div>
                <p className="text-gray-400">Required Registration</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">HTS</div>
                <p className="text-gray-400">Classification System</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/compliance">
              <Button variant="hero" size="lg">
                Explore Compliance Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceHighlight;
