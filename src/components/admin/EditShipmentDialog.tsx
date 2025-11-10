import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditShipmentDialogProps {
  shipment: any;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditShipmentDialog = ({ shipment, open, onClose, onSuccess }: EditShipmentDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase
        .from("shipments")
        .update({
          customer_name: formData.get("customer_name") as string,
          customer_email: formData.get("customer_email") as string,
          customer_phone: formData.get("customer_phone") as string,
          origin: formData.get("origin") as string,
          destination: formData.get("destination") as string,
          current_status: formData.get("status") as string,
          weight: parseFloat(formData.get("weight") as string),
          estimated_delivery: formData.get("estimated_delivery") as string,
        })
        .eq("id", shipment.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shipment updated successfully",
      });
      onSuccess();
      onClose();
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Shipment - {shipment.tracking_number}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input
                id="customer_name"
                name="customer_name"
                defaultValue={shipment.customer_name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_email">Customer Email</Label>
              <Input
                id="customer_email"
                name="customer_email"
                type="email"
                defaultValue={shipment.customer_email}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_phone">Customer Phone</Label>
              <Input
                id="customer_phone"
                name="customer_phone"
                type="tel"
                defaultValue={shipment.customer_phone || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                defaultValue={shipment.weight}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input id="origin" name="origin" defaultValue={shipment.origin} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                name="destination"
                defaultValue={shipment.destination}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={shipment.current_status} required>
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
              <Input
                id="estimated_delivery"
                name="estimated_delivery"
                type="date"
                defaultValue={shipment.estimated_delivery?.split("T")[0]}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Shipment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShipmentDialog;
