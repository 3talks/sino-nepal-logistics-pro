import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const CreateShipmentDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const trackingNumber = `TRK${Date.now()}`;

    try {
      const { error } = await supabase.from("shipments").insert({
        tracking_number: trackingNumber,
        customer_name: formData.get("customer_name") as string,
        customer_email: formData.get("customer_email") as string,
        customer_phone: formData.get("customer_phone") as string,
        origin: formData.get("origin") as string,
        destination: formData.get("destination") as string,
        current_status: formData.get("status") as string,
        weight: parseFloat(formData.get("weight") as string),
        estimated_delivery: formData.get("estimated_delivery") as string,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Shipment created with tracking number: ${trackingNumber}`,
      });
      setOpen(false);
      window.location.reload();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Shipment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input id="customer_name" name="customer_name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_email">Customer Email</Label>
              <Input id="customer_email" name="customer_email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_phone">Customer Phone</Label>
              <Input id="customer_phone" name="customer_phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" step="0.01" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input id="origin" name="origin" placeholder="e.g., Beijing, China" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" name="destination" placeholder="e.g., Kathmandu, Nepal" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="pending" required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="customs">Customs</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
              <Input id="estimated_delivery" name="estimated_delivery" type="date" required />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Shipment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShipmentDialog;
