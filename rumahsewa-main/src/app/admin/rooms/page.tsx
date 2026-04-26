"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminRooms() {
  const supabase = createClient();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rooms")
      .select("*, properties(name)");

    if (error || !data || data.length === 0) {
      if (error) console.error(error);
      setRooms([
        { id: "1", room_no: "Master Bedroom Suite", properties: { name: "Kota Warisan - Terrace" }, price: 650, status: "Available", image_url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" },
        { id: "2", room_no: "Cozy Single Room", properties: { name: "KLIA Area - Condominium" }, price: 400, status: "Occupied", image_url: "https://www.thespruce.com/thmb/Yaz6mR23IBvAPvkviKYi1N6clLU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg" },
        { id: "3", room_no: "Spacious Balcony Room", properties: { name: "Cyberjaya South - Terrace" }, price: 550, status: "Available", image_url: "https://www.thespruce.com/thmb/Afg3IVBq0tV-7DHBME5woSNCZxQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" },
        { id: "4", room_no: "Budget Single Room", properties: { name: "Kota Warisan - Shoplot" }, price: 350, status: "Available", image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
        { id: "5", room_no: "Medium Room (Sharing)", properties: { name: "KLIA Area - Condominium" }, price: 300, status: "Maintenance", image_url: "https://www.livehome3d.com/assets/img/articles/rooms-in-house/old-money-style-bedroom@2x.jpg" },
        { id: "6", room_no: "Premium Studio Room", properties: { name: "Cyberjaya South - Condominium" }, price: 800, status: "Reserved", image_url: "https://www.livehome3d.com/assets/img/articles/rooms-in-house/stylish-bedroom@2x.jpg" },
      ]);
    } else {
      setRooms(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("rooms").update({ status: newStatus }).eq("id", id);
    if (!error) {
      toast.success("Status updated!");
      fetchRooms();
    } else {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      const { error } = await supabase.from("rooms").delete().eq("id", id);
      if (!error) {
        toast.success("Room deleted");
        fetchRooms();
      } else {
        toast.error("Delete failed");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available": return "bg-emerald-100 text-emerald-700";
      case "Reserved": return "bg-amber-100 text-amber-700";
      case "Occupied": return "bg-red-100 text-red-700";
      case "Maintenance": return "bg-slate-100 text-slate-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filter === "All" || room.status === filter;
    const matchesSearch = room.room_no?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.properties?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Rooms</h1>
          <p className="text-muted-foreground mt-1">Manage your room listings and availability.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/rooms/new">
            <Plus className="w-4 h-4" /> Add Room
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <Tabs defaultValue="All" className="w-full sm:w-auto" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Available">Available</TabsTrigger>
            <TabsTrigger value="Occupied">Occupied</TabsTrigger>
            <TabsTrigger value="Reserved">Reserved</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by room no or property..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Room No</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : filteredRooms.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No rooms found</TableCell></TableRow>
            ) : (
              filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    {room.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={room.image_url} alt="Room" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{room.room_no}</TableCell>
                  <TableCell>{room.properties?.name || "Unknown"}</TableCell>
                  <TableCell>RM {room.price}</TableCell>
                  <TableCell>
                    <Select defaultValue={room.status} onValueChange={(val) => handleStatusChange(room.id, val)}>
                      <SelectTrigger className={`h-8 w-32 border-none font-semibold ${getStatusBadge(room.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Reserved">Reserved</SelectItem>
                        <SelectItem value="Occupied">Occupied</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/rooms/${room.id}`}>
                        <Edit className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(room.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
