"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent,
    
    // CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Package,
  MapPin,
  AlertTriangle,
  MessageSquare,
  DollarSign,
} from "lucide-react";
//import { Listing } from "@/lib/types";
//import Link from "next/link";
import { useState } from "react";
import { mockData } from "@/lib/mock-data";

export default function BuyerListingsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [cropFilter, setCropFilter] = useState<string>("all");

  if (!user || user.role !== "buyer") {
    return null;
  }

  const listings = mockData.listings.filter((listing) => {
    const matchesSearch =
      listing.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || listing.location === locationFilter;
    const matchesCrop = cropFilter === "all" || listing.cropType === cropFilter;
    return (
      matchesSearch &&
      matchesLocation &&
      matchesCrop &&
      listing.status === "active"
    );
  });

  // Get unique locations and crop types for filters
  const locations = Array.from(
    new Set(mockData.listings.map((l) => l.location))
  );
  const cropTypes = Array.from(
    new Set(mockData.listings.map((l) => l.cropType))
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Browse Listings
            </h2>
            <p className="text-muted-foreground mt-2">
              Find and purchase fresh produce from farmers
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by crop or farmer..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {cropTypes.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <div className="aspect-[4/3] relative">
                <img
                  src={listing.images[0]}
                  alt={`${listing.cropType} main view`}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {listing.cropType}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {listing.farmerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    {listing.location}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">
                        {listing.quantity} {listing.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="font-medium">
                        Grade {listing.qualityGrade}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium">
                        {listing.askingPrice
                          ? `₦${listing.askingPrice.toLocaleString()} per ${
                              listing.priceUnit
                            }`
                          : "Negotiable"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Storage</p>
                      <p className="font-medium">{listing.storageMethod}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      PHL Risk
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPhlRiskColorClass(
                            listing.phlRisk
                          )}`}
                          style={{ width: `${listing.phlRisk}%` }}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${getPhlRiskTextColorClass(
                          listing.phlRisk
                        )}`}
                      >
                        {listing.phlRisk}%
                      </span>
                      {listing.phlRisk > 50 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 gap-2">
                      <DollarSign className="h-4 w-4" />
                      Make Offer
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {listings.length === 0 && (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No listings found</h3>
              <p className="text-muted-foreground">
                {searchTerm || locationFilter !== "all" || cropFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Check back later for new listings"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function getPhlRiskColorClass(risk: number): string {
  if (risk < 25) return "bg-green-500";
  if (risk < 50) return "bg-yellow-500";
  if (risk < 75) return "bg-orange-500";
  return "bg-red-500";
}

function getPhlRiskTextColorClass(risk: number): string {
  if (risk < 25) return "text-green-700 dark:text-green-400";
  if (risk < 50) return "text-yellow-700 dark:text-yellow-400";
  if (risk < 75) return "text-orange-700 dark:text-orange-400";
  return "text-red-700 dark:text-red-400";
}
