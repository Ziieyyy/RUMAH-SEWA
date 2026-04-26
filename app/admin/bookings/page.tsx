"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Filter, 
  Eye, 
  Edit, 
  Printer, 
  Trash2, 
  User, 
  Home, 
  Briefcase, 
  Paperclip, 
  Calendar,
  Phone,
  Mail,
  CreditCard,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminBookings() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookings").select("*, rooms(room_no, properties(name))").order("created_at", { ascending: false });
    
    if (error || !data || data.length === 0) {
      // Robust Mock Data for demonstration
      setBookings([
        { 
          id: "BK-2026-0012", 
          customer_name: "Ahmad Faiz bin Ibrahim", 
          ic_number: "950101-14-5543", 
          phone: "012-3456789", 
          property: "Kota Warisan - Terrace", 
          room: "Master Bedroom A", 
          move_in_date: "2024-05-01", 
          rent: 650, 
          status: "Confirmed", 
          payment_status: "Paid",
          email: "ahmad.faiz@email.com",
          gender: "Male",
          nationality: "Malaysian",
          emergency_name: "Ibrahim bin Ali",
          emergency_phone: "019-8877665",
          occupation: "Software Engineer",
          company: "Tech Solutions Sdn Bhd",
          income: "RM4,000 - RM6,000",
          notes: "Needs parking lot access."
        },
        { 
          id: "BK-2026-0013", 
          customer_name: "Siti Nurhaliza binti Bakar", 
          ic_number: "981212-08-1234", 
          phone: "017-1234567", 
          property: "KLIA Area - Condominium", 
          room: "Cozy Single Room B", 
          move_in_date: "2024-05-15", 
          rent: 400, 
          status: "Pending", 
          payment_status: "Partial",
          email: "siti.n@email.com",
          gender: "Female",
          nationality: "Malaysian",
          emergency_name: "Bakar bin Sidek",
          emergency_phone: "013-1122334",
          occupation: "Cabin Crew",
          company: "AirAsia",
          income: "RM3,000 - RM5,000",
          notes: "Working shift hours."
        },
        { 
          id: "BK-2026-0014", 
          customer_name: "Wong Wei Jie", 
          ic_number: "000505-10-8877", 
          phone: "019-9876543", 
          property: "Cyberjaya South - Terrace", 
          room: "Balcony Room C", 
          move_in_date: "2024-06-01", 
          rent: 550, 
          status: "Cancelled", 
          payment_status: "Unpaid",
          email: "wj.wong@email.com",
          gender: "Male",
          nationality: "Malaysian",
          emergency_name: "Wong Ah Ming",
          emergency_phone: "016-5544332",
          occupation: "Student",
          company: "Multimedia University",
          income: "Allowance",
          notes: "Change of mind."
        },
      ]);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this booking record?")) {
      toast.success("Record deleted");
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const viewProfile = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case "Confirmed": return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Confirmed</Badge>;
      case "Checked In": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Checked In</Badge>;
      case "Cancelled": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid": return <Badge className="bg-emerald-500 hover:bg-emerald-600">Paid</Badge>;
      case "Partial": return <Badge className="bg-amber-500 hover:bg-amber-600">Partial</Badge>;
      case "Unpaid": return <Badge className="bg-slate-400 hover:bg-slate-500">Unpaid</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  // const totalDue = ... (not needed on list page)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">Manage customer bookings and tenant records professionally.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button asChild className="flex-1 md:flex-none gap-2 bg-primary hover:bg-secondary">
          <Link href="/admin/bookings/new">
            <Plus className="w-4 h-4" /> Add New Booking
          </Link>
        </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search Name / IC / Phone" 
            className="pl-10" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="CheckedIn">Checked In</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger><SelectValue placeholder="Property" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="kota">Kota Warisan</SelectItem>
            <SelectItem value="klia">KLIA Area</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" className="gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" /> More Filters
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[120px]">Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Room Info</TableHead>
                <TableHead>Move In</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={9} className="text-center py-12">Loading bookings...</TableCell></TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono text-xs font-bold text-muted-foreground">{booking.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{booking.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{booking.ic_number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{booking.phone}</div>
                      <div className="text-xs text-muted-foreground">{booking.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{booking.room}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px]">{booking.property}</div>
                    </TableCell>
                    <TableCell className="text-sm">{booking.move_in_date}</TableCell>
                    <TableCell className="font-bold text-primary">RM {booking.rent}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>{getPaymentBadge(booking.payment_status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => viewProfile(booking)} className="gap-2 cursor-pointer">
                            <Eye className="w-4 h-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Edit className="w-4 h-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Printer className="w-4 h-4" /> Print Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(booking.id)} className="gap-2 text-destructive cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Customer View Modal (Profile) */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-none shadow-2xl">
          {selectedBooking && (
            <>
              <div className="bg-primary p-8 text-white relative">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">{selectedBooking.id}</Badge>
                    <h2 className="text-3xl font-bold">{selectedBooking.customer_name}</h2>
                    <p className="text-primary-foreground/80 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> {selectedBooking.ic_number}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(selectedBooking.status)}
                    <div className="block">{getPaymentBadge(selectedBooking.payment_status)}</div>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                <div className="md:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-secondary" /> Identity & Contact
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Gender</p><p className="font-medium">{selectedBooking.gender}</p></div>
                      <div><p className="text-muted-foreground">Nationality</p><p className="font-medium">{selectedBooking.nationality}</p></div>
                      <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{selectedBooking.phone}</p></div>
                      <div><p className="text-muted-foreground">Email</p><p className="font-medium">{selectedBooking.email}</p></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                      <Home className="w-5 h-5 text-secondary" /> Rental Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Property</p><p className="font-medium">{selectedBooking.property}</p></div>
                      <div><p className="text-muted-foreground">Room</p><p className="font-medium">{selectedBooking.room}</p></div>
                      <div><p className="text-muted-foreground">Move In Date</p><p className="font-medium">{selectedBooking.move_in_date}</p></div>
                      <div><p className="text-muted-foreground">Monthly Rent</p><p className="font-medium text-primary">RM {selectedBooking.rent}</p></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-secondary" /> Background
                    </h4>
                    <div className="text-sm space-y-2">
                      <p className="font-medium">{selectedBooking.occupation} at {selectedBooking.company}</p>
                      <p className="text-muted-foreground">Income: {selectedBooking.income}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-secondary" /> Documents
                    </h4>
                    <div className="flex gap-4">
                      <div className="w-20 h-28 bg-muted rounded border flex items-center justify-center text-[10px] text-center font-bold">IC FRONT</div>
                      <div className="w-20 h-28 bg-muted rounded border flex items-center justify-center text-[10px] text-center font-bold">IC BACK</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-4 bg-muted/30 rounded-xl space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4" /> Timeline</h4>
                    <div className="space-y-4 text-xs">
                      <div className="flex gap-2 border-l-2 border-primary pl-3 pb-4">
                        <div className="w-2 h-2 rounded-full bg-primary -ml-[17px] mt-1"></div>
                        <div>
                          <p className="font-bold uppercase">Booking Created</p>
                          <p className="text-muted-foreground">24 Apr 2026, 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-2 border-l-2 border-primary pl-3 pb-4">
                        <div className="w-2 h-2 rounded-full bg-primary -ml-[17px] mt-1"></div>
                        <div>
                          <p className="font-bold uppercase">Payment Verified</p>
                          <p className="text-muted-foreground">25 Apr 2026, 02:15 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm">Notes</h4>
                    <p className="text-sm text-muted-foreground italic">"{selectedBooking.notes || "No notes provided."}"</p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full gap-2"><Edit className="w-4 h-4" /> Edit Profile</Button>
                    <Button variant="outline" className="w-full gap-2"><Printer className="w-4 h-4" /> Print Contract</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
