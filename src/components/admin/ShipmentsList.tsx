import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import EditShipmentDialog from "./EditShipmentDialog";
import ViewShipmentDialog from "./ViewShipmentDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Shipment {
  id: string;
  tracking_number: string;
  customer_name: string;
  customer_email: string;
  origin: string;
  destination: string;
  current_status: string;
  weight: number;
  estimated_delivery: string;
  created_at: string;
}

const ShipmentsList = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editShipment, setEditShipment] = useState<Shipment | null>(null);
  const [viewShipment, setViewShipment] = useState<Shipment | null>(null);
  const { toast } = useToast();

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setShipments(data || []);
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

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("shipments")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shipment deleted successfully",
      });
      fetchShipments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500",
      in_transit: "bg-blue-500",
      customs: "bg-purple-500",
      delivered: "bg-green-500",
      delayed: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  if (loading) {
    return <div className="text-center py-8">Loading shipments...</div>;
  }

  return (
    <>
      <div className="grid gap-4">
        {shipments.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No shipments found. Create your first shipment to get started.
          </Card>
        ) : (
          shipments.map((shipment) => (
            <Card key={shipment.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">
                      {shipment.tracking_number}
                    </h3>
                    <Badge className={getStatusColor(shipment.current_status)}>
                      {shipment.current_status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Customer</p>
                      <p className="font-medium">{shipment.customer_name}</p>
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
                    <div>
                      <p className="text-muted-foreground">Est. Delivery</p>
                      <p className="font-medium">
                        {new Date(shipment.estimated_delivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewShipment(shipment)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditShipment(shipment)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(shipment.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {editShipment && (
        <EditShipmentDialog
          shipment={editShipment}
          open={!!editShipment}
          onClose={() => setEditShipment(null)}
          onSuccess={fetchShipments}
        />
      )}

      {viewShipment && (
        <ViewShipmentDialog
          shipment={viewShipment}
          open={!!viewShipment}
          onClose={() => setViewShipment(null)}
        />
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Shipment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this shipment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShipmentsList;
