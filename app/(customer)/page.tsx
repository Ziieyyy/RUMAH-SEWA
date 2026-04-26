import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Star, ShieldCheck, Clock, Home, CheckCircle2, BedDouble, ChevronRight } from "lucide-react";

export default function HomePage() {
  const waLink = "https://wa.me/60166798900?text=Hi,%20saya%20berminat%20mencari%20bilik%20sewa%20di%20Sepang.%20Boleh%20bantu%20saya?";

  const featuredRooms = [
    { id: "1", name: "Master Bedroom Suite", loc: "Kota Warisan", price: 650, type: "Terrace", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800", fac: ["Attached Bath", "A/C", "Queen Bed"] },
    { id: "3", name: "Spacious Balcony Room", loc: "Cyberjaya South", price: 550, type: "Terrace", img: "https://www.thespruce.com/thmb/Afg3IVBq0tV-7DHBME5woSNCZxQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg", fac: ["Balcony", "A/C", "Queen Bed"] },
    { id: "4", name: "Budget Single Room", loc: "Kota Warisan", price: 350, type: "Shoplot", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", fac: ["Single Bed", "Fan", "WiFi"] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Premium Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-6 backdrop-blur-sm px-4 py-1.5 text-sm" data-aos="fade-down" data-aos-delay="200">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
              #1 Room Rental in Sepang
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]" data-aos="fade-right" data-aos-delay="400">
              Cari Bilik Sewa <span className="text-accent">Selesa</span> di Sepang
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl" data-aos="fade-right" data-aos-delay="600">
              Bilik fully furnished, lokasi strategik, harga berpatutan berhampiran KLIA, Kota Warisan & kawasan sekitar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="800">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-base h-14 px-8 shadow-lg transition-transform hover:-translate-y-1 font-bold" asChild>
                <Link href="/rooms">Lihat Bilik Available</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur-sm text-base h-14 px-8 transition-transform hover:-translate-y-1" asChild>
                <Link href={waLink} target="_blank">WhatsApp Sekarang</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20" data-aos="fade-up" data-aos-delay="1000">
              <div><h4 className="text-2xl font-bold text-accent">150+</h4><p className="text-sm text-white/80">Rooms Managed</p></div>
              <div><h4 className="text-2xl font-bold text-accent">3</h4><p className="text-sm text-white/80">Strategic Locations</p></div>
              <div><h4 className="text-2xl font-bold text-accent">24/7</h4><p className="text-sm text-white/80">Fast Response</p></div>
              <div><h4 className="text-2xl font-bold text-accent">100%</h4><p className="text-sm text-white/80">Trusted</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - QUICK SEARCH */}
      <section className="py-12 bg-cream/50 container mx-auto px-4">
        <Card className="shadow-xl border-none bg-[#F5EFE6] text-primary">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/70">Location</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-12 border-primary/10 bg-white/50 text-primary focus:ring-primary/20 transition-colors"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="kota-warisan">Kota Warisan</SelectItem>
                    <SelectItem value="klia">KLIA Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/70">Budget</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-12 border-primary/10 bg-white/50 text-primary focus:ring-primary/20 transition-colors"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Budget</SelectItem>
                    <SelectItem value="under-400">Under RM400</SelectItem>
                    <SelectItem value="400-600">RM400 - RM600</SelectItem>
                    <SelectItem value="over-600">RM600+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/70">Property Type</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-12 border-primary/10 bg-white/50 text-primary focus:ring-primary/20 transition-colors"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Type</SelectItem>
                    <SelectItem value="terrace">Terrace House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-12 w-full bg-primary hover:bg-secondary text-white font-bold shadow-md transition-all hover:shadow-lg" asChild>
                <Link href="/rooms"><Search className="w-4 h-4 mr-2" /> Cari Sekarang</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SECTION 4 - WHY CHOOSE US */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Kenapa Pilih Kami?</h2>
            <p className="text-muted-foreground">Kami menyediakan perkhidmatan pengurusan bilik sewa yang terbaik demi keselesaan anda.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: MapPin, title: "Lokasi Strategik", desc: "Berhampiran KLIA, stesen ERL, dan pusat perniagaan." },
              { icon: ShieldCheck, title: "Harga Berpatutan", desc: "Sewa mampu milik tanpa cas tersembunyi." },
              { icon: BedDouble, title: "Bilik Selesa & Bersih", desc: "Perabot lengkap dan selesa untuk didiami terus." },
              { icon: Clock, title: "Pengurusan Profesional", desc: "Penyelenggaraan pantas dan layanan pelanggan 24/7." }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay={i * 100}>
                <CardContent className="p-4 sm:p-8 text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary mb-2 sm:mb-6">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-primary">{feature.title}</h3>
                  <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - FEATURED ROOMS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12" data-aos="fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Bilik Pilihan Kami</h2>
              <p className="text-muted-foreground">Unit terhad yang baru sahaja dikosongkan.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-secondary hover:bg-transparent" asChild>
              <Link href="/rooms">View All Rooms <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <Card key={room.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="h-64 relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm px-3 py-1 font-medium">Available</Badge>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{room.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-secondary" /> {room.loc} • {room.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6 mt-2">
                    {room.fac.map(f => (
                      <Badge key={f} variant="secondary" className="bg-muted text-muted-foreground font-normal">{f}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Bulanan</p>
                      <p className="font-bold text-2xl text-primary">RM {room.price}</p>
                    </div>
                    <Button asChild className="bg-primary hover:bg-secondary rounded-full px-6">
                      <Link href={`/rooms/${room.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-8 md:hidden text-primary border-primary" asChild>
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </section>

      {/* SECTION 5 - LOCATIONS */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Lokasi Kami</h2>
            <p className="text-muted-foreground">Kawasan tumpuan berhampiran tempat kerja anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Kota Warisan", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800" },
              { name: "KLIA / Salak Tinggi", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" },
              { name: "Cyberjaya South", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" }
            ].map((loc, i) => (
              <Link href="/rooms" key={i} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg" data-aos="zoom-in" data-aos-delay={i * 200}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={loc.img} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{loc.name}</h3>
                  <p className="text-white/80 text-sm font-medium flex items-center gap-1 group-hover:text-accent transition-colors">
                    Lihat Bilik <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - HOW IT WORKS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Cara Menyewa</h2>
            <p className="text-muted-foreground">Proses yang ringkas dan mudah dalam 3 langkah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-muted-foreground/20 z-0"></div>

            {[
              { step: "01", title: "Cari Bilik", desc: "Lihat senarai bilik kosong yang sesuai dengan bajet & lokasi anda." },
              { step: "02", title: "WhatsApp Admin", desc: "Hubungi kami untuk temujanji viewing atau pertanyaan lanjut." },
              { step: "03", title: "Pindah Masuk", desc: "Selesaikan bayaran, dapat kunci dan pindah masuk segera!" }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-8 shadow-xl border-8 border-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - STRONG CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nak Cari Bilik Sekarang?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk semak unit available hari ini. Staff kami sedia membantu anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-base h-14 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 font-bold" asChild>
              <Link href={waLink} target="_blank">WhatsApp Admin</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-accent border-transparent text-base h-14 px-8 rounded-full transition-transform hover:-translate-y-1 font-bold" asChild>
              <Link href="/rooms">Browse Rooms</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
