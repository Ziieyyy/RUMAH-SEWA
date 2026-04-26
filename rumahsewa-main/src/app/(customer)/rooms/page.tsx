import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Ensure data is always fresh

export default async function RoomsPage() {
  const supabase = await createClient();

  // Only fetch available rooms
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*, properties(name, type, location_area)")
    .eq("status", "Available")
    .order("created_at", { ascending: false });

  // Fallback if no db
  const displayRooms = !error && rooms && rooms.length > 0 ? rooms : [
    { id: "1", room_no: "Master Bedroom Suite", properties: { name: "Kota Warisan", type: "Terrace" }, price: 650, status: "Available", image_url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" },
    { id: "2", room_no: "Cozy Single Room", properties: { name: "KLIA Area", type: "Condominium" }, price: 400, status: "Occupied", image_url: "https://www.thespruce.com/thmb/Yaz6mR23IBvAPvkviKYi1N6clLU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg" },
    { id: "3", room_no: "Spacious Balcony Room", properties: { name: "Cyberjaya South", type: "Terrace" }, price: 550, status: "Available", image_url: "https://www.thespruce.com/thmb/Afg3IVBq0tV-7DHBME5woSNCZxQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" },
    { id: "4", room_no: "Budget Single Room", properties: { name: "Kota Warisan", type: "Shoplot" }, price: 350, status: "Available", image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
    { id: "5", room_no: "Medium Room (Sharing)", properties: { name: "KLIA Area", type: "Condominium" }, price: 300, status: "Maintenance", image_url: "https://www.livehome3d.com/assets/img/articles/rooms-in-house/old-money-style-bedroom@2x.jpg" },
    { id: "6", room_no: "Premium Studio Room", properties: { name: "Cyberjaya South", type: "Condominium" }, price: 800, status: "Reserved", image_url: "https://www.livehome3d.com/assets/img/articles/rooms-in-house/stylish-bedroom@2x.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Our Available Rooms</h1>
          <p className="text-muted-foreground">Find the perfect room that fits your needs and budget.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input placeholder="Search location or room..." className="bg-background w-full md:w-64" />
          <Button variant="secondary">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRooms.map((room, i) => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative bg-secondary/20">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {room.status}
                </Badge>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.image_url || `https://images.unsplash.com/photo-1598928506311-c55dd77cd18a?w=500&auto=format&fit=crop&q=60`}
                alt={room.room_no}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl mb-1">{room.room_no}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    {room.properties?.name || "Unknown Property"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">RM {room.price}</p>
                  <p className="text-xs text-muted-foreground">/ mon</p>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                asChild
              >
                <Link href={`/rooms/${room.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
