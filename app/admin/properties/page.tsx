"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

export default function AdminProperties() {
  const supabase = createClient();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<any>(null);

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState("Terrace House");
  const [address, setAddress] = useState("");
  const [locationArea, setLocationArea] = useState("");
  const [description, setDescription] = useState("");

  const mockData = [
    { id: "1", name: "Cyberjaya Condominium", type: "Condominium", location_area: "Cyberjaya", rooms: [{count: 45}], image_url: "" },
    { id: "2", name: "Sepang Terrace House", type: "Terrace House", location_area: "Kota Warisan", rooms: [{count: 5}], image_url: "" },
    { id: "3", name: "KLIA Shoplot Suites", type: "Shoplot", location_area: "Salak Tinggi", rooms: [{count: 20}], image_url: "" },
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("properties").select("*, rooms(count)");
    
    if (error || !data || data.length === 0) {
      if (error) console.error(error);
      setProperties(mockData);
    } else {
      setProperties(data);
    }
    setLoading(false);
  };

  const handleOpenModal = (property: any = null) => {
    setCurrentProperty(property);
    if (property) {
      setName(property.name || "");
      setType(property.type || "Terrace House");
      setAddress(property.address || "");
      setLocationArea(property.location_area || "");
      setDescription(property.description || "");
    } else {
      setName("");
      setType("Terrace House");
      setAddress("");
      setLocationArea("");
      setDescription("");
    }
    setIsModalOpen(true);
  };

  const handleSaveProperty = async () => {
    const propertyData = {
      name,
      type,
      address,
      location_area: locationArea,
      description,
    };

    if (currentProperty) {
      const { error } = await supabase.from("properties").update(propertyData).eq("id", currentProperty.id);
      if (error) {
        toast.error("Failed to update property.");
        console.error(error);
      } else { 
        toast.success("Property updated!"); 
        fetchProperties(); 
        setIsModalOpen(false); 
      }
    } else {
      const { error } = await supabase.from("properties").insert([propertyData]);
      if (error) {
        toast.error("Failed to add property.");
        console.error(error);
      } else { 
        toast.success("Property added!"); 
        fetchProperties(); 
        setIsModalOpen(false); 
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (!error) { toast.success("Property deleted"); fetchProperties(); }
      else { toast.error("Delete failed"); }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your buildings and houses.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Property
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Rooms</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : properties.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No properties found</TableCell></TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.location_area}</TableCell>
                  <TableCell>{property.rooms?.[0]?.count || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(property)}>
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{currentProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Property Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Cyberjaya Condominium" />
            </div>
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Terrace House">Terrace House</SelectItem>
                  <SelectItem value="Condominium">Condominium</SelectItem>
                  <SelectItem value="Shoplot">Shoplot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Location Area</Label>
              <Input value={locationArea} onChange={e => setLocationArea(e.target.value)} placeholder="e.g. Cyberjaya" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Full Address</Label>
              <Textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} placeholder="Full building address..." />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Describe the property amenities..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProperty}>Save Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
