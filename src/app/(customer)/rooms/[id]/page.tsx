import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

export default async function RoomDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  const { data: dbRoom, error } = await supabase
    .from("rooms")
    .select("*, properties(name, type, location_area)")
    .eq("id", id)
    .single();

  // Fallback to mock data if not found or DB not ready
  const mockDataMap: Record<string, any> = {
    "1": { name: "Master Bedroom Suite", price: 650, images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"] },
    "2": { name: "Cozy Single Room", price: 400, images: ["https://www.thespruce.com/thmb/Yaz6mR23IBvAPvkviKYi1N6clLU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg"] },
    "3": { name: "Spacious Balcony Room", price: 550, images: ["https://www.thespruce.com/thmb/Afg3IVBq0tV-7DHBME5woSNCZxQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"] },
    "4": { name: "Budget Single Room", price: 350, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"] },
    "5": { name: "Medium Room (Sharing)", price: 300, images: ["https://www.livehome3d.com/assets/img/articles/rooms-in-house/old-money-style-bedroom@2x.jpg"] },
    "6": { name: "Premium Studio Room", price: 800, images: ["https://www.livehome3d.com/assets/img/articles/rooms-in-house/stylish-bedroom@2x.jpg"] },
  };
  const mock = mockDataMap[id] || mockDataMap["1"];

  const room = !error && dbRoom ? {
    id: dbRoom.id,
    name: dbRoom.room_no || "Room",
    price: dbRoom.price || 0,
    deposit: dbRoom.deposit || 0,
    location: dbRoom.properties?.location_area || dbRoom.properties?.name || "Unknown Location",
    type: dbRoom.properties?.type || "Property",
    status: dbRoom.status || "Unknown",
    description: dbRoom.description || "",
    facilities: dbRoom.facilities || [],
    images: [
      dbRoom.image_url || "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
      ...(dbRoom.image_1_url ? [dbRoom.image_1_url] : []),
      ...(dbRoom.image_2_url ? [dbRoom.image_2_url] : [])
    ],
    rental_terms: dbRoom.rental_terms || "* Minimum rental period is 6 months. Price excludes individual electricity usage if sub-metered."
  } : {
    id,
    name: mock.name,
    price: mock.price,
    deposit: mock.price * 2,
    location: "Kota Warisan",
    type: "Terrace House",
    status: "Available",
    description: "A spacious room fully furnished with air conditioning, comfortable bed, wardrobe, and study table. High-speed WiFi included.",
    facilities: ["Air Conditioning", "Bed", "Wardrobe", "Free WiFi"],
    images: mock.images,
    rental_terms: "* Minimum rental period is 6 months. Price excludes individual electricity usage if sub-metered."
  };

  const textForWa = `Hi, saya berminat dengan bilik ini: %0A%0A${room.name}%0ARM ${room.price}/bulan%0A%0AMasih available?`;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-4">
        <Link href="/rooms" className="text-secondary hover:text-primary text-sm font-medium">
          ← Back to Rooms
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={room.images[0]} alt="Room main" className="w-full h-full object-cover" />
          </div>
          {/* Gallery */}
          {room.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {room.images.slice(1).map((img, idx) => (
                <div key={idx} className="h-24 md:h-32 rounded-lg overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Room image ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {room.description && (
            <div className="p-6 bg-card rounded-xl border shadow-sm mt-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {room.description}
              </p>
            </div>
          )}

          {room.facilities && room.facilities.length > 0 && (
            <div className="p-6 bg-card rounded-xl border shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Facilities Included</h2>
              <ul className="grid grid-cols-2 gap-4">
                {room.facilities.map((fac: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground bg-secondary/10 px-3 py-2 rounded-md">
                    <span className="text-secondary font-bold">✓</span> {fac}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <Card className="sticky top-24 border shadow-lg border-primary/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6 border-b pb-6">
                <div>
                  <Badge className="mb-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{room.status}</Badge>
                  <h1 className="text-2xl font-bold text-primary mb-1">{room.name}</h1>
                  <p className="text-muted-foreground text-sm">{room.location} • {room.type}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Rent</span>
                  <span className="font-bold text-lg text-primary">RM {room.price}</span>
                </div>
                {room.deposit > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold">RM {room.deposit}</span>
                  </div>
                )}
                {room.rental_terms && (
                  <div className="text-xs text-muted-foreground pt-4 border-t whitespace-pre-line">
                    {room.rental_terms}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button size="lg" className="w-full self-start bg-[#25D366] hover:bg-[#20bd5a] text-white flex gap-2" asChild>
                  <Link href={`https://wa.me/60166798900?text=${textForWa}`}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp Sekarang
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
