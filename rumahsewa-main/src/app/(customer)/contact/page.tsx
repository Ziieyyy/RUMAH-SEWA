import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12">Get in touch with our team for inquiries or support.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-primary font-bold">Our Office</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-primary">Headquarters</h4>
                  <p>123, Jalan Mutiara, Sepang 43900<br/>Selangor, Malaysia</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Phone & WhatsApp</h4>
                  <p>+60 16 6798900</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Email</h4>
                  <p>hello@sepangrooms.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                    <Input placeholder="+601..." type="tel" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <textarea 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help?"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
