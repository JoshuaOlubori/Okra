"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin,
   //  Calendar, Clock, Truck
     Package,
       CheckCircle2,  ArrowRight, Phone, MessageSquare, AlertTriangle, Search } from 'lucide-react'
// import { cn } from "@/lib/utils"

// Mock data for deliveries
const deliveries = [
  {
    id: "del1",
    orderId: "order123",
    farmerId: "farmer1",
    farmerName: "John Farmer",
    farmerPhone: "+234 801 234 5678",
    buyerId: "buyer1",
    buyerName: "Lagos Foods Ltd",
    buyerPhone: "+234 802 345 6789",
    pickupLocation: "Oyo State, Ibadan",
    dropoffLocation: "Lagos State, Ikeja",
    cropType: "Cassava",
    quantity: 500,
    unit: "kg",
    pickupTime: "2023-06-15T10:00:00",
    estimatedDeliveryTime: "2023-06-15T16:00:00",
    estimatedDistance: 120,
    estimatedDuration: 180,
    vehicleType: "truck",
    coldChain: true,
    payment: 25000,
    status: "in_progress",
    currentLocation: "Ogun State, Sagamu",
    progress: 60,
    phlRisk: 65,
    notes: "Call buyer 30 minutes before arrival",
  },
  {
    id: "del2",
    orderId: "order456",
    farmerId: "farmer2",
    farmerName: "Mary Grower",
    farmerPhone: "+234 803 456 7890",
    buyerId: "buyer2",
    buyerName: "Abuja Market Co.",
    buyerPhone: "+234 804 567 8901",
    pickupLocation: "Kaduna State, Zaria",
    dropoffLocation: "FCT, Abuja",
    cropType: "Tomatoes",
    quantity: 300,
    unit: "kg",
    pickupTime: "2023-06-16T08:00:00",
    estimatedDeliveryTime: "2023-06-16T14:00:00",
    estimatedDistance: 180,
    estimatedDuration: 240,
    vehicleType: "van",
    coldChain: true,
    payment: 30000,
    status: "pending",
    currentLocation: null,
    progress: 0,
    phlRisk: 85,
    notes: "Fragile cargo, handle with care",
  },
  {
    id: "del3",
    orderId: "order789",
    farmerId: "farmer3",
    farmerName: "Ibrahim Planter",
    farmerPhone: "+234 805 678 9012",
    buyerId: "buyer3",
    buyerName: "Kano Processors",
    buyerPhone: "+234 806 789 0123",
    pickupLocation: "Kano State, Kano",
    dropoffLocation: "Kano State, Dala",
    cropType: "Rice",
    quantity: 1000,
    unit: "kg",
    pickupTime: "2023-06-14T09:00:00",
    estimatedDeliveryTime: "2023-06-14T11:00:00",
    estimatedDistance: 25,
    estimatedDuration: 45,
    vehicleType: "truck",
    coldChain: false,
    payment: 15000,
    status: "completed",
    currentLocation: "Kano State, Dala",
    progress: 100,
    phlRisk: 30,
    notes: "",
  },
  {
    id: "del4",
    orderId: "order101",
    farmerId: "farmer4",
    farmerName: "Amina Harvest",
    farmerPhone: "+234 807 890 1234",
    buyerId: "buyer4",
    buyerName: "Port Harcourt Exports",
    buyerPhone: "+234 808 901 2345",
    pickupLocation: "Rivers State, Eleme",
    dropoffLocation: "Rivers State, Port Harcourt",
    cropType: "Yam",
    quantity: 800,
    unit: "kg",
    pickupTime: "2023-06-13T07:00:00",
    estimatedDeliveryTime: "2023-06-13T09:00:00",
    estimatedDistance: 35,
    estimatedDuration: 60,
    vehicleType: "truck",
    coldChain: false,
    payment: 18000,
    status: "completed",
    currentLocation: "Rivers State, Port Harcourt",
    progress: 100,
    phlRisk: 45,
    notes: "",
  },
]

// Define the Delivery interface
interface Delivery {
  id: string
  orderId: string
  farmerId: string
  farmerName: string
  farmerPhone: string
  buyerId: string
  buyerName: string
  buyerPhone: string
  pickupLocation: string
  dropoffLocation: string
  cropType: string
  quantity: number
  unit: string
  pickupTime: string
  estimatedDeliveryTime: string
  estimatedDistance: number
  estimatedDuration: number
  vehicleType: string
  coldChain: boolean
  payment: number
  status: string
  currentLocation: string | null
  progress: number
  phlRisk: number
  notes: string
}

export default function LogisticsDeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  const filteredDeliveries = deliveries.filter(delivery => {
    // Filter by search term
    const searchMatch = 
      delivery.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter by status tab
    if (activeTab === "all") return searchMatch
    if (activeTab === "pending") return searchMatch && delivery.status === "pending"
    if (activeTab === "in_progress") return searchMatch && delivery.status === "in_progress"
    if (activeTab === "completed") return searchMatch && delivery.status === "completed"
    
    return searchMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending Pickup</Badge>
      case "in_progress":
        return <Badge variant="default">In Transit</Badge>
      case "completed":
        return <Badge variant="secondary">Delivered</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleUpdateStatus = (deliveryId: string, newStatus: string) => {
    // In a real app, this would call an API to update the status
    console.log(`Updating delivery ${deliveryId} to status ${newStatus}`)
    // Then update the UI accordingly
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Deliveries</h1>
            <p className="text-muted-foreground">
              Manage and track your current and past deliveries.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deliveries..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="distance">By Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Deliveries ({deliveries.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({deliveries.filter(d => d.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Transit ({deliveries.filter(d => d.status === "in_progress").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({deliveries.filter(d => d.status === "completed").length})</TabsTrigger>
          </TabsList>
  <TabsContent value="all" className="mt-6">
    <DeliveryList 
      deliveries={filteredDeliveries} 
      getStatusBadge={getStatusBadge} 
      handleUpdateStatus={handleUpdateStatus} 
    />
  </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <DeliveryList 
              deliveries={filteredDeliveries} 
              getStatusBadge={getStatusBadge} 
              handleUpdateStatus={handleUpdateStatus} 
            />
          </TabsContent>
          <TabsContent value="in_progress" className="mt-6">
            <DeliveryList 
              deliveries={filteredDeliveries} 
              getStatusBadge={getStatusBadge} 
              handleUpdateStatus={handleUpdateStatus} 
            />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <DeliveryList 
              deliveries={filteredDeliveries} 
              getStatusBadge={getStatusBadge} 
              handleUpdateStatus={handleUpdateStatus} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

interface DeliveryListProps {
  deliveries: Delivery[]
  getStatusBadge: (status: string) => React.ReactNode
  handleUpdateStatus: (deliveryId: string, newStatus: string) => void
}

function DeliveryList({ deliveries, getStatusBadge, handleUpdateStatus }: DeliveryListProps) {
  if (deliveries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No deliveries found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {deliveries.map((delivery) => (
        <Card key={delivery.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{delivery.cropType} Delivery</CardTitle>
                <CardDescription>
                  {delivery.quantity} {delivery.unit} • Order #{delivery.orderId.slice(-4)}
                </CardDescription>
              </div>
              {getStatusBadge(delivery.status)}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm truncate">{delivery.pickupLocation}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm truncate">{delivery.dropoffLocation}</div>
                </div>
              </div>
              
              {delivery.status === "in_progress" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pickup</span>
                    <span>Current Location</span>
                    <span>Dropoff</span>
                  </div>
                  <Progress value={delivery.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-center">
                    {delivery.currentLocation}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Farmer</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-sm">{delivery.farmerName}</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{delivery.farmerPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Buyer</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-sm">{delivery.buyerName}</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{delivery.buyerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Distance</span>
                  <span className="text-sm font-medium">{delivery.estimatedDistance} km</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Duration</span>
                  <span className="text-sm font-medium">{Math.floor(delivery.estimatedDuration / 60)}h {delivery.estimatedDuration % 60}m</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Payment</span>
                  <span className="text-sm font-medium text-green-600">₦{delivery.payment.toLocaleString()}</span>
                </div>
              </div>
              
              {delivery.notes && (
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="text-xs text-muted-foreground">{delivery.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </Button>
              {delivery.phlRisk > 70 && (
                <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-medium">High PHL Risk</span>
                </div>
              )}
            </div>
            
            {delivery.status === "pending" && (
              <Button size="sm" onClick={() => handleUpdateStatus(delivery.id, "in_progress")}>
                Start Delivery
              </Button>
            )}
            
            {delivery.status === "in_progress" && (
              <Button size="sm" onClick={() => handleUpdateStatus(delivery.id, "completed")}>
                Mark as Delivered
              </Button>
            )}
            
            {delivery.status === "completed" && (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
