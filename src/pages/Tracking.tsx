import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, Ship, Plane, CheckCircle2, Clock, MapPin } from "lucide-react";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Mock tracking data
  const mockShipment = {
    id: "SNLH2024001234",
    status: "In Transit",
    origin: "Shanghai, China",
    destination: "Kathmandu, Nepal",
    estimatedDelivery: "March 15, 2024",
    currentLocation: "Tibet Border Checkpoint",
    type: "Road Freight",
    weight: "2500 kg",
    trackingHistory: [
      {
        status: "Order Confirmed",
        location: "Shanghai Warehouse",
        date: "March 1, 2024 10:30 AM",
        completed: true,
      },
      {
        status: "Customs Cleared - China",
        location: "Shanghai Customs",
        date: "March 2, 2024 2:15 PM",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Tibet Border Checkpoint",
        date: "March 10, 2024 8:00 AM",
        completed: true,
      },
      {
        status: "Pending Nepal Customs",
        location: "Rasuwagadhi Border",
        date: "Expected: March 12, 2024",
        completed: false,
      },
      {
        status: "Out for Delivery",
        location: "Kathmandu Hub",
        date: "Expected: March 14, 2024",
        completed: false,
      },
    ],
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Track Your Shipment
            </h1>
            <p className="text-lg text-navy-lighter max-w-2xl mx-auto">
              Real-time tracking from China to Nepal with customs compliance updates
            </p>
          </div>

          {/* Tracking Input */}
          <Card className="max-w-2xl mx-auto shadow-large animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-teal" />
                Enter Tracking Number
              </CardTitle>
              <CardDescription>
                Track your shipment using your order ID or tracking number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="flex gap-3">
                <Input
                  placeholder="e.g., SNLH2024001234"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-teal hover:bg-teal-light">
                  Track
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {isTracking && (
            <div className="mt-12 space-y-6 animate-fade-up">
              {/* Status Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-teal" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking ID</p>
                        <p className="font-semibold text-navy">{mockShipment.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Truck className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className="bg-teal text-white">{mockShipment.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Location</p>
                        <p className="font-semibold text-navy text-sm">{mockShipment.currentLocation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                        <p className="font-semibold text-navy text-sm">{mockShipment.estimatedDelivery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipment Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Route Information */}
                <Card className="lg:col-span-2 shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-teal" />
                      Shipment Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockShipment.trackingHistory.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                event.completed
                                  ? "bg-success text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {event.completed ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            {index < mockShipment.trackingHistory.length - 1 && (
                              <div
                                className={`w-0.5 h-16 ${
                                  event.completed ? "bg-success" : "bg-muted"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h4
                              className={`font-semibold ${
                                event.completed ? "text-navy" : "text-muted-foreground"
                              }`}
                            >
                              {event.status}
                            </h4>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                            <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipment Details */}
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ship className="w-5 h-5 text-teal" />
                      Shipment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-semibold text-navy">{mockShipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-semibold text-navy">{mockShipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transport Type</p>
                      <p className="font-semibold text-navy">{mockShipment.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold text-navy">{mockShipment.weight}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-gradient-card text-white hover:opacity-90">
                        Download Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Compliance Alert */}
              <Card className="border-teal bg-teal-lighter/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Nepal Customs Compliant</h4>
                      <p className="text-sm text-navy-lighter">
                        All required documents submitted. Your shipment meets Nepal customs regulations
                        and is cleared for entry upon arrival at Rasuwagadhi Border.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tracking;
