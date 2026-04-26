import { Card, CardContent } from "@/components/ui/card";

export default function FAQPage() {
  const faqs = [
    { q: "What is included in the rent?", a: "For most rooms, rent includes water bills and high-speed internet. Electricity is usually calculated by sub-metering for air-conditioning usage. Common area regular cleaning is also provided." },
    { q: "What is the minimum rental period?", a: "Our standard minimum rental period is 6 months. However, we do accept shorter stays (min 3 months) subject to availability and a revised rate." },
    { q: "How much is the deposit?", a: "Standard deposit is 2 months rental deposit + 0.5 month utility deposit. For example, if rent is RM500, the total deposit is RM1,250." },
    { q: "Can I bring guests over?", a: "Visitors are allowed in common areas until 10 PM. Overnight guests are strictly prohibited to ensure the security and privacy of other tenants." },
    { q: "Is cooking allowed?", a: "Light cooking is permitted in the shared kitchen. Tenants are expected to clean up immediately after use." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-2 text-center">Frequently Asked Questions</h1>
      <p className="text-center text-muted-foreground mb-12">Find answers to common questions about renting with us.</p>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
