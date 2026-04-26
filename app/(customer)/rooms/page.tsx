import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <div className="mb-12">
        <Card className="shadow-lg border-none bg-white text-primary overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x border-b lg:border-b-0 lg:border-r border-muted">
                <div className="p-4 space-y-1 hover:bg-muted/30 transition-colors">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 border-none bg-transparent shadow-none p-0 text-sm font-semibold focus:ring-0">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="kota-warisan">Kota Warisan</SelectItem>
                      <SelectItem value="klia">KLIA Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 space-y-1 hover:bg-muted/30 transition-colors">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Budget</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 border-none bg-transparent shadow-none p-0 text-sm font-semibold focus:ring-0">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Budget</SelectItem>
                      <SelectItem value="under-400">Under RM400</SelectItem>
                      <SelectItem value="400-600">RM400 - RM600</SelectItem>
                      <SelectItem value="over-600">RM600+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 space-y-1 hover:bg-muted/30 transition-colors">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 border-none bg-transparent shadow-none p-0 text-sm font-semibold focus:ring-0">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Type</SelectItem>
                      <SelectItem value="terrace">Terrace House</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 flex items-center justify-center bg-white">
                <Button className="h-10 lg:h-full w-full lg:w-32 bg-primary hover:bg-secondary text-white font-bold shadow-md transition-all rounded-lg">
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRooms.map((room: any, i: number) => (
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
