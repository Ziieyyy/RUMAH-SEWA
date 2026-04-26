"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
  const [ogMain, setOgMain] = useState<string | null>(null);
  
  const [image1, setImage1] = useState<File | null>(null);
  const [image1Preview, setImage1Preview] = useState<string | null>(null);
  const [ogImg1, setOgImg1] = useState<string | null>(null);
  
  const [image2, setImage2] = useState<File | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);
  const [ogImg2, setOgImg2] = useState<string | null>(null);

  // MOCK properties
  const mockProperties = [
    { id: "1", name: "Kota Warisan Terrace" },
    { id: "2", name: "KLIA Area Condominium" },
    { id: "3", name: "Cyberjaya South Terrace" }
  ];

  useEffect(() => {
    if (roomId) fetchRoomDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const fetchRoomDetails = async () => {
    setFetching(true);
    const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId).single();
    
    if (data && !error) {
      setRoomNo(data.room_no || "");
      setPropertyId(data.property_id || "");
      setPrice(data.price?.toString() || "");
      setDeposit(data.deposit?.toString() || "");
      setStatus(data.status || "Available");
      setSize(data.size || "");
      setFurnished(data.furnished ? "Yes" : "No");
      setGenderPref(data.gender_preference || "Any");
      setDescription(data.description || "");
      if (data.rental_terms) setRentalTerms(data.rental_terms);
      if (data.facilities) setFacilities(data.facilities);

      if (data.image_url) { setMainPreview(data.image_url); setOgMain(data.image_url); }
      if (data.image_1_url) { setImage1Preview(data.image_1_url); setOgImg1(data.image_1_url); }
      if (data.image_2_url) { setImage2Preview(data.image_2_url); setOgImg2(data.image_2_url); }
    } else {
      // Mock data if no DB record found
      setRoomNo("Master Bedroom Suite");
      setPrice("650");
      setDeposit("1300");
      setDescription("A spacious master bedroom with attached bathroom. Fully furnished with air conditioning, queen size bed, wardrobe, and study table. House includes high-speed WiFi, washing machine, fridge, and weekly cleaning service for common areas.");
      setFacilities(["Attached Bathroom", "Air Conditioning", "Queen Bed", "Wardrobe", "Study Desk", "Free WiFi"]);
    }
    setFetching(false);
  };

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
    let mainImageUrl = ogMain || "";
    let image1Url = ogImg1 || "";
    let image2Url = ogImg2 || "";
    
    try {
      if (mainImage) mainImageUrl = await uploadFile(mainImage);
      else if (!mainPreview) mainImageUrl = "";

      if (image1) image1Url = await uploadFile(image1);
      else if (!image1Preview) image1Url = "";

      if (image2) image2Url = await uploadFile(image2);
      else if (!image2Preview) image2Url = "";

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
        facilities,
        image_url: mainImageUrl,
        image_1_url: image1Url,
        image_2_url: image2Url,
      };

      const { error } = await supabase.from("rooms").update(roomData).eq("id", roomId);
      
      if (error) {
        toast.error("Failed to update room.");
      } else {
        toast.success("Room updated successfully!");
        router.push("/admin/rooms");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during save.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-muted-foreground">Loading room details...</div>;

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/rooms">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Room</h1>
          <p className="text-muted-foreground mt-1">Update the listing details and images.</p>
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
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Location</Label>
                  <Select value={propertyId} onValueChange={setPropertyId}>
                    <SelectTrigger><SelectValue placeholder="Select Property" /></SelectTrigger>
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
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Security Deposit (RM)</Label>
                  <Input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} />
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
          {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
        </Button>
      </div>
    </div>
  );
}
