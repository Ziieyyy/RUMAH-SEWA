"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, UploadCloud, Check } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const COMMON_FACILITIES = [
  "Attached Bathroom", "Air Conditioning", "Queen Bed", "Single Bed", 
  "Wardrobe", "Study Desk", "Free WiFi", "Washing Machine", 
  "Fridge", "Water Heater", "Cooking Allowed", "Cleaning Service"
];

export default function NewRoomPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // Form states
  const [roomNo, setRoomNo] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("Available");
  const [size, setSize] = useState("");
  const [furnished, setFurnished] = useState("Yes");
  const [genderPref, setGenderPref] = useState("Any");
  const [description, setDescription] = useState("");
  const [rentalTerms, setRentalTerms] = useState("Minimum rental period is 6 months. Price excludes individual electricity usage if sub-metered.");
  
  // Facilities
  const [facilities, setFacilities] = useState<string[]>([]);

  // Images
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  
  const [image1, setImage1] = useState<File | null>(null);
  const [image1Preview, setImage1Preview] = useState<string | null>(null);
  
  const [image2, setImage2] = useState<File | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);

  // MOCK properties since we removed the actual properties section for now
  const mockProperties = [
    { id: "1", name: "Kota Warisan Terrace" },
    { id: "2", name: "KLIA Area Condominium" },
    { id: "3", name: "Cyberjaya South Terrace" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'img1' | 'img2') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'main') { setMainImage(file); setMainPreview(url); }
      if (type === 'img1') { setImage1(file); setImage1Preview(url); }
      if (type === 'img2') { setImage2(file); setImage2Preview(url); }
    }
  };

  const toggleFacility = (facility: string) => {
    setFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('room-images')
      .upload(`public/${fileName}`, file);
      
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('room-images')
      .getPublicUrl(`public/${fileName}`);
    return data.publicUrl;
  };

  const handleSaveRoom = async () => {
    setLoading(true);
    let mainImageUrl = "";
    let image1Url = "";
    let image2Url = "";
    
    try {
      if (mainImage) mainImageUrl = await uploadFile(mainImage);
      if (image1) image1Url = await uploadFile(image1);
      if (image2) image2Url = await uploadFile(image2);

      const roomData = {
        room_no: roomNo,
        price: parseFloat(price) || 0,
        deposit: parseFloat(deposit) || 0,
        status,
        size,
        furnished: furnished === "Yes",
        gender_preference: genderPref,
        description,
        rental_terms: rentalTerms,
        facilities, // JSONB array
        image_url: mainImageUrl,
        image_1_url: image1Url,
        image_2_url: image2Url,
      };

      const { error } = await supabase.from("rooms").insert([roomData]);
      
      if (error) {
        console.error("DB Error", error);
        toast.error("Failed to save room to database.");
      } else {
        toast.success("Room added successfully!");
        router.push("/admin/rooms");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload or save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/rooms">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Add New Room</h1>
          <p className="text-muted-foreground mt-1">Create a comprehensive listing for your customers.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Room Title *</Label>
                  <Input 
                    value={roomNo} 
                    onChange={e => setRoomNo(e.target.value)} 
                    placeholder="e.g. Master Bedroom Suite" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Location</Label>
                  <Select value={propertyId} onValueChange={setPropertyId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProperties.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Rent (RM) *</Label>
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="650" />
                </div>
                <div className="space-y-2">
                  <Label>Security Deposit (RM)</Label>
                  <Input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="1300" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Reserved">Reserved</SelectItem>
                      <SelectItem value="Occupied">Occupied</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Furnished</Label>
                  <Select value={furnished} onValueChange={setFurnished}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Fully Furnished</SelectItem>
                      <SelectItem value="Partially">Partially Furnished</SelectItem>
                      <SelectItem value="No">Not Furnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows={4} 
                  placeholder="A spacious master bedroom with attached bathroom. Fully furnished with air conditioning..."
                />
              </div>

              <div className="space-y-2">
                <Label>Rental Terms / Note</Label>
                <Textarea 
                  value={rentalTerms} 
                  onChange={e => setRentalTerms(e.target.value)} 
                  rows={2} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facilities Included</CardTitle>
              <CardDescription>Select all amenities provided with this room.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COMMON_FACILITIES.map(facility => {
                  const isSelected = facilities.includes(facility);
                  return (
                    <div 
                      key={facility}
                      onClick={() => toggleFacility(facility)}
                      className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors text-sm ${
                        isSelected ? "bg-primary/10 border-primary text-primary font-medium" : "bg-card hover:bg-muted"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary" : ""}`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      {facility}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Images</CardTitle>
              <CardDescription>Upload up to 3 images for the listing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Main Image (Thumbnail)</Label>
                {mainPreview ? (
                  <div className="relative rounded-md overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mainPreview} alt="Main Preview" className="w-full h-40 object-cover" />
                    <Button variant="secondary" size="sm" className="absolute top-2 right-2" onClick={() => { setMainImage(null); setMainPreview(null); }}>Remove</Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 border-muted-foreground/25">
                    <UploadCloud className="w-6 h-6 mb-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Upload Main Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageChange(e, 'main')} />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Additional Image 1</Label>
                {image1Preview ? (
                  <div className="relative rounded-md overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image1Preview} alt="Preview 1" className="w-full h-32 object-cover" />
                    <Button variant="secondary" size="sm" className="absolute top-2 right-2" onClick={() => { setImage1(null); setImage1Preview(null); }}>Remove</Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 border-muted-foreground/25">
                    <UploadCloud className="w-5 h-5 mb-1 text-muted-foreground" />
                    <span className="text-xs font-medium">Upload Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageChange(e, 'img1')} />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Additional Image 2</Label>
                {image2Preview ? (
                  <div className="relative rounded-md overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image2Preview} alt="Preview 2" className="w-full h-32 object-cover" />
                    <Button variant="secondary" size="sm" className="absolute top-2 right-2" onClick={() => { setImage2(null); setImage2Preview(null); }}>Remove</Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 border-muted-foreground/25">
                    <UploadCloud className="w-5 h-5 mb-1 text-muted-foreground" />
                    <span className="text-xs font-medium">Upload Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageChange(e, 'img2')} />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
        <Button variant="outline" asChild>
          <Link href="/admin/rooms">Cancel</Link>
        </Button>
        <Button onClick={handleSaveRoom} disabled={loading || !roomNo || !price} className="gap-2">
          {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Room</>}
        </Button>
      </div>
    </div>
  );
}
