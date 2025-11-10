import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, Ship, Plane, CheckCircle2, Clock, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setNotFound(false);
    setShipment(null);
    setEvents([]);

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", trackingNumber.trim())
        .single();

      if (shipmentError || !shipmentData) {
        setNotFound(true);
        return;
      }

      setShipment(shipmentData);

      const { data: eventsData, error: eventsError } = await supabase
        .from("shipment_events")
        .select("*")
        .eq("shipment_id", shipmentData.id)
        .order("event_date", { ascending: false });

      if (eventsError) throw eventsError;
      setEvents(eventsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
                  placeholder="e.g., TRK1234567890"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading} className="bg-teal hover:bg-teal-light">
                  {loading ? "Searching..." : "Track"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Not Found Message */}
          {notFound && (
            <Card className="max-w-2xl mx-auto mt-8 border-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Tracking number not found</p>
                    <p className="text-sm text-muted-foreground">
                      Please check your tracking number and try again.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tracking Results */}
          {shipment && (
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
                        <p className="font-semibold text-navy">{shipment.tracking_number}</p>
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
                        <Badge className="bg-teal text-white">{shipment.current_status.replace("_", " ").toUpperCase()}</Badge>
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
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-semibold text-navy text-sm">{shipment.origin} → {shipment.destination}</p>
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
                        <p className="font-semibold text-navy text-sm">{new Date(shipment.estimated_delivery).toLocaleDateString()}</p>
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
                    {events.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No tracking events yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event, index) => (
                          <div key={event.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-success text-white">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              {index < events.length - 1 && (
                                <div className="w-0.5 h-16 bg-success" />
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <h4 className="font-semibold text-navy">{event.status}</h4>
                              <p className="text-sm text-muted-foreground">{event.location}</p>
                              {event.description && (
                                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(event.event_date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-semibold text-navy">{shipment.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{shipment.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-semibold text-navy">{shipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-semibold text-navy">{shipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold text-navy">{shipment.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-semibold text-navy">{new Date(shipment.created_at).toLocaleDateString()}</p>
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
