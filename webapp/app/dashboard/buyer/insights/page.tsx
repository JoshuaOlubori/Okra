"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Overview } from "@/components/dashboard/overview";
import { TrendingUp, TrendingDown, Minus, Package, MapPin } from "lucide-react";
//import { PriceData } from "@/lib/types";
import { useState } from "react";
import { mockData } from "@/lib/mock-data";

export default function BuyerInsightsPage() {
  const { user } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");

  if (!user || user.role !== "buyer") {
    return null;
  }

  const priceData = mockData.priceData.filter((data) => {
    const matchesRegion =
      selectedRegion === "all" || data.region === selectedRegion;
    const matchesCrop =
      selectedCrop === "all" || data.cropType === selectedCrop;
    return matchesRegion && matchesCrop;
  });

  // Get unique regions and crops
  const regions = Array.from(new Set(mockData.priceData.map((d) => d.region)));
  const crops = Array.from(new Set(mockData.priceData.map((d) => d.cropType)));

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Market Insights
            </h2>
            <p className="text-muted-foreground mt-2">
              Track market trends and make informed purchasing decisions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Package className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {priceData.map((data) => (
            <Card key={`${data.cropType}-${data.region}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {data.cropType}
                </CardTitle>
                {data.trend === "rising" && (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                )}
                {data.trend === "falling" && (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                {data.trend === "stable" && (
                  <Minus className="h-4 w-4 text-blue-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{data.averagePrice.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{data.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{data.region}</p>
                  <p
                    className={`text-xs font-medium ${getTrendColorClass(
                      data.trend,
                      data.percentChange
                    )}`}
                  >
                    {data.percentChange > 0 && "+"}
                    {data.percentChange.toFixed(1)}%
                  </p>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                  <span>₦{data.minPrice.toLocaleString()} min</span>
                  <span>₦{data.maxPrice.toLocaleString()} max</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>
                Historical price trends over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Market Summary</CardTitle>
              <CardDescription>
                Current market conditions and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Market Summary Content */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Total Listings
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        mockData.listings.filter((l) => l.status === "active")
                          .length
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Avg. PHL Risk
                    </p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        mockData.listings.reduce(
                          (acc, l) => acc + l.phlRisk,
                          0
                        ) / mockData.listings.length
                      )}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Active Regions
                    </p>
                    <p className="text-2xl font-bold">{regions.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Crop Types
                    </p>
                    <p className="text-2xl font-bold">{crops.length}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Top Trending Crops
                  </h4>
                  <div className="space-y-2">
                    {priceData
                      .filter((d) => d.trend === "rising")
                      .slice(0, 3)
                      .map((data) => (
                        <div
                          key={`${data.cropType}-${data.region}-trend`}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{data.cropType}</span>
                          </div>
                          <span className="text-sm text-green-500">
                            +{data.percentChange.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function getTrendColorClass(
  trend: "rising" | "falling" | "stable",
  change: number
): string {
  if (trend === "rising") {
    return change >= 10 ? "text-green-600" : "text-green-500";
  }
  if (trend === "falling") {
    return change <= -10 ? "text-red-600" : "text-red-500";
  }
  return "text-blue-500";
}
