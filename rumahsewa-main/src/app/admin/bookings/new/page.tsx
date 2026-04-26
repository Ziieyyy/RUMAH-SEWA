"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Save, 
  User, 
  Home, 
  Briefcase, 
  Paperclip, 
  CreditCard,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function NewBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    icNumber: "",
    phone: "",
    whatsapp: "",
    email: "",
    gender: "",
    nationality: "Malaysian",
    emergencyName: "",
    emergencyPhone: "",
    property: "",
    roomNo: "",
    roomType: "",
    rent: "",
    deposit: "",
    utilityDeposit: "200",
    startDate: "",
    moveInDate: "",
    duration: "6 months",
    occupation: "",
    company: "",
    employmentStatus: "Working",
    incomeRange: "",
    status: "Pending",
    paymentStatus: "Unpaid",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Customer booking registered successfully!");
      router.push("/admin/bookings");
    }, 1500);
  };

  const totalDue = (parseFloat(formData.rent) || 0) + (parseFloat(formData.deposit) || 0) + (parseFloat(formData.utilityDeposit) || 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/bookings">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Add New Customer</h1>
          <p className="text-muted-foreground">Register a new tenant and create a booking record.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION A — CUSTOMER IDENTITY */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-primary font-bold">
              <User className="w-5 h-5" />
              <CardTitle>SECTION A — CUSTOMER IDENTITY</CardTitle>
            </div>
            <CardDescription>Official identification and contact details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="As per IC / Passport" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icNumber">IC / Passport Number</Label>
                <Input id="icNumber" value={formData.icNumber} onChange={handleInputChange} placeholder="e.g. 950101-14-XXXX" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. 012-3456789" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="If different from phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tenant@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(v) => handleSelectChange("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" value={formData.nationality} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                <Input id="emergencyName" value={formData.emergencyName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input id="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION B — RENTAL DETAILS */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Home className="w-5 h-5" />
              <CardTitle>SECTION B — RENTAL DETAILS</CardTitle>
            </div>
            <CardDescription>Property assignment and pricing</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Select Property</Label>
                <Select onValueChange={(v) => handleSelectChange("property", v)}>
                  <SelectTrigger><SelectValue placeholder="Property" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kota Warisan">Kota Warisan - Terrace</SelectItem>
                    <SelectItem value="KLIA Area">KLIA Area - Condominium</SelectItem>
                    <SelectItem value="Cyberjaya South">Cyberjaya South - Terrace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Room</Label>
                <Select onValueChange={(v) => handleSelectChange("roomNo", v)}>
                  <SelectTrigger><SelectValue placeholder="Room" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Master A">Master Bedroom A</SelectItem>
                    <SelectItem value="Medium B">Medium Room B</SelectItem>
                    <SelectItem value="Single C">Single Room C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Input id="roomType" value={formData.roomType} onChange={handleInputChange} placeholder="e.g. Master with Bath" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (RM)</Label>
                <Input id="rent" type="number" value={formData.rent} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit Amount (RM)</Label>
                <Input id="deposit" type="number" value={formData.deposit} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="utilityDeposit">Utility Deposit (RM)</Label>
                <Input id="utilityDeposit" type="number" value={formData.utilityDeposit} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moveInDate">Move In Date</Label>
                <Input id="moveInDate" type="date" value={formData.moveInDate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Contract Duration</Label>
                <Select onValueChange={(v) => handleSelectChange("duration", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="12 months">12 months</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-6 bg-accent/20 rounded-xl flex flex-col justify-center border border-accent/30 shadow-inner">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Initial Payment</span>
                <span className="text-3xl font-bold text-primary">RM {totalDue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION C — BACKGROUND */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Briefcase className="w-5 h-5" />
              <CardTitle>SECTION C — EMPLOYMENT / BACKGROUND</CardTitle>
            </div>
            <CardDescription>Tenant's professional background</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" value={formData.occupation} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company / University Name</Label>
                <Input id="company" value={formData.company} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Employment Status</Label>
                <Select onValueChange={(v) => handleSelectChange("employmentStatus", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Working">Working</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly Income Range</Label>
                <Select onValueChange={(v) => handleSelectChange("incomeRange", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under RM2k">Under RM2,000</SelectItem>
                    <SelectItem value="RM2k-RM4k">RM2,000 - RM4,000</SelectItem>
                    <SelectItem value="RM4k-RM6k">RM4,000 - RM6,000</SelectItem>
                    <SelectItem value="RM6k+">RM6,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION D — DOCUMENTS */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Paperclip className="w-5 h-5" />
              <CardTitle>SECTION D — DOCUMENTS</CardTitle>
            </div>
            <CardDescription>Upload identification and proof of income</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {["IC Front", "IC Back", "Offer Letter", "Payslip", "Student Card"].map(doc => (
                <div key={doc} className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 cursor-pointer transition-all hover:border-primary/50 group">
                  <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <span className="text-xs font-bold text-center uppercase text-muted-foreground group-hover:text-primary">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SECTION E — STATUS */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-primary font-bold">
              <CreditCard className="w-5 h-5" />
              <CardTitle>SECTION E — STATUS & NOTES</CardTitle>
            </div>
            <CardDescription>Internal administration details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Booking Status</Label>
                  <Select onValueChange={(v) => handleSelectChange("status", v)}>
                    <SelectTrigger><SelectValue placeholder="Pending" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Checked In">Checked In</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Status</Label>
                  <Select onValueChange={(v) => handleSelectChange("paymentStatus", v)}>
                    <SelectTrigger><SelectValue placeholder="Unpaid" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea id="notes" className="min-h-[100px]" value={formData.notes} onChange={handleInputChange} placeholder="Special requests, background check info, etc." />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button size="lg" className="bg-primary hover:bg-secondary gap-2 px-8" disabled={loading}>
            {loading ? "Registering..." : <><Save className="w-5 h-5" /> Register Customer</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
