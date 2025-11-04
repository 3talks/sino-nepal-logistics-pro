import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Tracking", path: "/tracking" },
    { name: "Compliance", path: "/compliance" },
    { name: "About Us", path: "/about" },
  ];

  const services = [
    "Air Freight",
    "Sea Freight",
    "Road Transport",
    "Customs Clearance",
    "Warehousing",
    "Supply Chain",
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center shadow-teal">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SNLH</h3>
                <p className="text-sm text-teal">Sino-Nepal Logistics Hub</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Premier logistics solutions connecting China and Nepal with excellence, reliability, and full customs compliance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-navy-light hover:bg-teal rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-navy-light hover:bg-teal rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-navy-light hover:bg-teal rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-teal transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-6 h-0.5 bg-teal transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-6 text-gold">Contact Us</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                  <div>
                    <p>Beijing Office, China</p>
                    <p className="text-sm">Kathmandu Office, Nepal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal flex-shrink-0" />
                  <span>+86 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal flex-shrink-0" />
                  <span>info@snlh-logistics.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gold">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-navy-light border-navy-lighter text-white placeholder:text-gray-400"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 Sino-Nepal Logistics Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-teal transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-teal transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
