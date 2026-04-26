export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">About SepangRooms</h1>
      
      <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
        <p>
          Founded in 2020, SepangRooms has grown to become the leading provider of premium room rentals in the Sepang, KLIA, and Kota Warisan areas. With over 150 rooms under our management, we specialize in providing clean, comfortable, and affordable accommodations for professionals, students, and travelers.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Our Mission</h2>
        <p>
          To simplify the room rental process while elevating the living standards for tenants in the Sepang district. We believe that everyone deserves a well-maintained, safe, and comfortable place to call home, without the hassle of traditional rental procedures.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Zero Hassle:</strong> We handle all maintenance and utility bills (for selected properties).</li>
          <li><strong>Quality Assured:</strong> Regular cleaning schedules for common areas and strict quality checks.</li>
          <li><strong>Strategic Locations:</strong> All our properties are within minutes of major expressways, KLIA, and commercial hubs.</li>
          <li><strong>Transparent Pricing:</strong> No hidden fees. What you see is what you pay.</li>
        </ul>
      </div>
    </div>
  );
}
