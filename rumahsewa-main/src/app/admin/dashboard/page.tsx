"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, CheckCircle, Users, BookOpen, UserPlus } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your rental properties and leads.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 space-y-0 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">150</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 space-y-0 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-emerald-600">Available Rooms</CardTitle>
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-emerald-600">42</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 space-y-0 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-destructive">Occupied Rooms</CardTitle>
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-destructive">96</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 space-y-0 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-amber-600">Reserved Rooms</CardTitle>
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-amber-600">12</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 space-y-0 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-600">New Leads</CardTitle>
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">8</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Ahmad Faiz", phone: "012-3456789", status: "New" },
                    { name: "Sarah Lee", phone: "017-1234567", status: "Contacted" },
                    { name: "John Doe", phone: "019-9876543", status: "Viewing" },
                  ].map((lead, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Name</th>
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Siti Nurhaliza", room: "Master Bedroom A", status: "Pending" },
                    { name: "Muhammad Ali", room: "Medium Room C", status: "Confirmed" },
                    { name: "Wong Wei Jie", room: "Single Room B", status: "Confirmed" },
                  ].map((booking, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{booking.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{booking.room}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
