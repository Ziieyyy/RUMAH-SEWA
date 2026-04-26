"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminLeads() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    
    if (error) {
      console.error(error);
      setLeads([
        { id: "1", name: "Khairul", phone: "601112345678", preferred_location: "Cyberjaya", budget: "RM 500", message: "Looking for single room", status: "New" }
      ]);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", id);
    if (!error) {
      toast.success("Lead status updated!");
      fetchLeads();
    } else {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this lead?")) {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (!error) { toast.success("Lead deleted"); fetchLeads(); }
      else { toast.error("Delete failed"); }
    }
  };

  const handleWhatsApp = (phone: string, name: string) => {
    // Strip non-numeric characters for WhatsApp link
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi ${name}, saya dari admin bilik sewa. Saya nak follow up inquiry anda.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700";
      case "Contacted": return "bg-purple-100 text-purple-700";
      case "Viewing": return "bg-amber-100 text-amber-700";
      case "Booked": return "bg-emerald-100 text-emerald-700";
      case "Lost": return "bg-slate-100 text-slate-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage inquiries from potential tenants.</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Preferred Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : leads.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No leads found</TableCell></TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.preferred_location}</TableCell>
                  <TableCell>{lead.budget}</TableCell>
                  <TableCell className="max-w-xs truncate" title={lead.message}>{lead.message}</TableCell>
                  <TableCell>
                    <Select defaultValue={lead.status} onValueChange={(val) => handleStatusChange(lead.id, val)}>
                      <SelectTrigger className={`h-8 w-32 border-none font-semibold ${getStatusBadge(lead.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Viewing">Viewing</SelectItem>
                        <SelectItem value="Booked">Booked</SelectItem>
                        <SelectItem value="Lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleWhatsApp(lead.phone, lead.name)} className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-transparent">
                      WhatsApp
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}>
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
