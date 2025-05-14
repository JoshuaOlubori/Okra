"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription,
   //  CardFooter, 
     CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, 
   // Package, Truck, 
    AlertTriangle, DollarSign, Clock, Filter } from 'lucide-react'
// import { cn } from "@/lib/utils"

// Mock data for available jobs
const availableJobs = [
  {
    id: "job1",
    farmerId: "farmer1",
    farmerName: "John Farmer",
    buyerId: "buyer1",
    buyerName: "Lagos Foods Ltd",
    pickupLocation: "Oyo State, Ibadan",
    dropoffLocation: "Lagos State, Ikeja",
    cropType: "Cassava",
    quantity: 500,
    unit: "kg",
    pickupTime: "2023-06-15T10:00:00",
    estimatedDistance: 120,
    estimatedDuration: 180,
    requiredVehicleType: "truck",
    requiresColdChain: true,
    offeredPayment: 25000,
    status: "available",
    phlRisk: 65,
  },
  {
    id: "job2",
    farmerId: "farmer2",
    farmerName: "Mary Grower",
    buyerId: "buyer2",
    buyerName: "Abuja Market Co.",
    pickupLocation: "Kaduna State, Zaria",
    dropoffLocation: "FCT, Abuja",
    cropType: "Tomatoes",
    quantity: 300,
    unit: "kg",
    pickupTime: "2023-06-16T08:00:00",
    estimatedDistance: 180,
    estimatedDuration: 240,
    requiredVehicleType: "van",
    requiresColdChain: true,
    offeredPayment: 30000,
    status: "available",
    phlRisk: 85,
  },
  {
    id: "job3",
    farmerId: "farmer3",
    farmerName: "Ibrahim Planter",
    buyerId: "buyer3",
    buyerName: "Kano Processors",
    pickupLocation: "Kano State, Kano",
    dropoffLocation: "Kano State, Dala",
    cropType: "Rice",
    quantity: 1000,
    unit: "kg",
    pickupTime: "2023-06-17T09:00:00",
    estimatedDistance: 25,
    estimatedDuration: 45,
    requiredVehicleType: "truck",
    requiresColdChain: false,
    offeredPayment: 15000,
    status: "available",
    phlRisk: 30,
  },
  {
    id: "job4",
    farmerId: "farmer4",
    farmerName: "Amina Harvest",
    buyerId: "buyer4",
    buyerName: "Port Harcourt Exports",
    pickupLocation: "Rivers State, Eleme",
    dropoffLocation: "Rivers State, Port Harcourt",
    cropType: "Yam",
    quantity: 800,
    unit: "kg",
    pickupTime: "2023-06-18T07:00:00",
    estimatedDistance: 35,
    estimatedDuration: 60,
    requiredVehicleType: "truck",
    requiresColdChain: false,
    offeredPayment: 18000,
    status: "available",
    phlRisk: 45,
  },
  {
    id: "job5",
    farmerId: "farmer5",
    farmerName: "David Crops",
    buyerId: "buyer5",
    buyerName: "Enugu Distributors",
    pickupLocation: "Enugu State, Nsukka",
    dropoffLocation: "Enugu State, Enugu",
    cropType: "Vegetables",
    quantity: 250,
    unit: "kg",
    pickupTime: "2023-06-19T11:00:00",
    estimatedDistance: 65,
    estimatedDuration: 90,
    requiredVehicleType: "van",
    requiresColdChain: true,
    offeredPayment: 22000,
    status: "available",
    phlRisk: 75,
  },
]

export default function LogisticsJobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(availableJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")
  const [coldChainFilter, setColdChainFilter] = useState(false)
  const [distanceRange, setDistanceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterJobs(term, vehicleFilter, coldChainFilter, distanceRange)
  }

  const handleVehicleFilter = (value: string) => {
    setVehicleFilter(value)
    filterJobs(searchTerm, value, coldChainFilter, distanceRange)
  }

  const handleColdChainFilter = (checked: boolean) => {
    setColdChainFilter(checked)
    filterJobs(searchTerm, vehicleFilter, checked, distanceRange)
  }

  const handleDistanceRange = (value: number[]) => {
    setDistanceRange(value)
    filterJobs(searchTerm, vehicleFilter, coldChainFilter, value)
  }

  const filterJobs = (
    term: string,
    vehicle: string,
    coldChain: boolean,
    distance: number[]
  ) => {
    const filtered = availableJobs.filter((job) => {
      // Search term filter
      const searchMatch =
        term === "" ||
        job.cropType.toLowerCase().includes(term.toLowerCase()) ||
        job.pickupLocation.toLowerCase().includes(term.toLowerCase()) ||
        job.dropoffLocation.toLowerCase().includes(term.toLowerCase()) ||
        job.farmerName.toLowerCase().includes(term.toLowerCase()) ||
        job.buyerName.toLowerCase().includes(term.toLowerCase())

      // Vehicle type filter
      const vehicleMatch = vehicle === "all" || job.requiredVehicleType === vehicle

      // Cold chain filter
      const coldChainMatch = !coldChain || job.requiresColdChain === coldChain

      // Distance range filter
      const distanceMatch =
        job.estimatedDistance >= distance[0] && job.estimatedDistance <= distance[1]

      return searchMatch && vehicleMatch && coldChainMatch && distanceMatch
    })

    setFilteredJobs(filtered)
  }

  const handleAcceptJob = (jobId: string) => {
    // In a real app, this would call an API to accept the job
    console.log(`Accepting job ${jobId}`)
    // Then update the UI accordingly
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Available Jobs</h1>
            <p className="text-muted-foreground">
              Browse and accept transport jobs that match your capabilities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="payment-high">Highest Payment</SelectItem>
                <SelectItem value="distance-low">Shortest Distance</SelectItem>
                <SelectItem value="phl-low">Lowest PHL Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showFilters && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filter Jobs</CardTitle>
              <CardDescription>Narrow down jobs based on your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by crop, location, etc."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <Select value={vehicleFilter} onValueChange={handleVehicleFilter}>
                    <SelectTrigger id="vehicle-type">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance-range">Distance Range (km)</Label>
                  <div className="pt-4">
                    <Slider
                      id="distance-range"
                      defaultValue={[0, 200]}
                      max={200}
                      step={5}
                      value={distanceRange}
                      onValueChange={handleDistanceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{distanceRange[0]} km</span>
                      <span>{distanceRange[1]} km</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cold-chain">Cold Chain Required</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="cold-chain"
                      checked={coldChainFilter}
                      onCheckedChange={handleColdChainFilter}
                    />
                    <Label htmlFor="cold-chain">Only show cold chain jobs</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="available" className="w-full">
          <TabsList>
            <TabsTrigger value="available">Available ({filteredJobs.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted (2)</TabsTrigger>
            <TabsTrigger value="completed">Completed (15)</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No jobs match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchTerm("")
                  setVehicleFilter("all")
                  setColdChainFilter(false)
                  setDistanceRange([0, 200])
                  setFilteredJobs(availableJobs)
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{job.cropType} Transport</CardTitle>
                          <CardDescription>
                            {job.quantity} {job.unit} • {job.estimatedDistance} km
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={job.phlRisk > 70 ? "destructive" : job.phlRisk > 40 ? "default" : "outline"}
                          className="ml-2"
                        >
                          {job.phlRisk > 70 ? "High Risk" : job.phlRisk > 40 ? "Medium Risk" : "Low Risk"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Pickup</p>
                              <p className="text-sm text-muted-foreground">{job.pickupLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Dropoff</p>
                              <p className="text-sm text-muted-foreground">{job.dropoffLocation}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Farmer</span>
                            <span className="text-sm font-medium truncate">{job.farmerName}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Buyer</span>
                            <span className="text-sm font-medium truncate">{job.buyerName}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Vehicle</span>
                            <span className="text-sm font-medium capitalize">{job.requiredVehicleType}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Cold Chain</span>
                            <span className="text-sm font-medium">{job.requiresColdChain ? "Required" : "Not Required"}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(job.pickupTime).toLocaleDateString()} at {new Date(job.pickupTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{Math.floor(job.estimatedDuration / 60)}h {job.estimatedDuration % 60}m</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-2 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-bold text-green-600">₦{job.offeredPayment.toLocaleString()}</span>
                        </div>
                        <Button onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
                      </div>
                    </div>
                    {job.phlRisk > 70 && (
                      <div className="px-6 py-2 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">High PHL risk - Cold chain transport required</span>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="accepted">
            <div className="text-center py-10">
              <p className="text-muted-foreground">You have 2 accepted jobs. View them in the Deliveries section.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/dashboard/logistics/deliveries">Go to Deliveries</a>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="text-center py-10">
              <p className="text-muted-foreground">You have completed 15 jobs. View your delivery history.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/dashboard/logistics/deliveries">View History</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
