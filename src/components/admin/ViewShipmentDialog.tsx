import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, Clock } from "lucide-react";

interface ViewShipmentDialogProps {
  shipment: any;
  open: boolean;
  onClose: () => void;
}

const ViewShipmentDialog = ({ shipment, open, onClose }: ViewShipmentDialogProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("shipment_events")
        .select("*")
        .eq("shipment_id", shipment.id)
        .order("event_date", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (open) {
      fetchEvents();
    }
  }, [open, shipment.id]);

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("shipment_events").insert({
        shipment_id: shipment.id,
        status: formData.get("status") as string,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        event_date: formData.get("event_date") as string,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event added successfully",
      });
      setShowAddEvent(false);
      fetchEvents();
      e.currentTarget.reset();
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shipment Details - {shipment.tracking_number}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Shipment Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Customer</p>
              <p className="font-medium">{shipment.customer_name}</p>
              <p className="text-sm text-muted-foreground">{shipment.customer_email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge>{shipment.current_status.replace("_", " ").toUpperCase()}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Route</p>
              <p className="font-medium">
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Weight</p>
              <p className="font-medium">{shipment.weight} kg</p>
            </div>
          </div>

          {/* Events Timeline */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tracking Events</h3>
              <Button size="sm" onClick={() => setShowAddEvent(!showAddEvent)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            {showAddEvent && (
              <Card className="p-4 mb-4">
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input id="status" name="status" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" required />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event_date">Event Date & Time</Label>
                      <Input id="event_date" name="event_date" type="datetime-local" required />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddEvent(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Adding..." : "Add Event"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="space-y-3">
              {events.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No events yet. Add the first tracking event.
                </p>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="p-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <div className="w-0.5 h-full bg-border mt-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{event.status}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                              <Clock className="w-3 h-3 ml-2" />
                              <span>{new Date(event.event_date).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewShipmentDialog;
