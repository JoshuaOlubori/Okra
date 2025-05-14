'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { RecentSales } from '@/components/dashboard/recent-sales';
import { Button } from '@/components/ui/button';
import { 
  // BarChart, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  MessageSquare,
  Plus 
} from 'lucide-react';
import { FarmerDashboardData, Order, Listing } from '@/lib/types';
import Link from 'next/link';

export default function FarmerDashboard() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const dashboardData = user.dashboardData as FarmerDashboardData;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h2>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/farmer/listings/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Listing
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.listings.active}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.listings.pending > 0 && `+${dashboardData.listings.pending} pending`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.orders.pendingConfirmation + dashboardData.orders.awaitingPickup}
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.orders.inTransit > 0 && `${dashboardData.orders.inTransit} in transit`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">PHL Risk Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getRiskLabel(dashboardData.phlRisk.overall)}
              </div>
              <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getRiskColorClass(dashboardData.phlRisk.overall)}`} 
                  style={{ width: `${dashboardData.phlRisk.overall}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Overall risk assessment for your crops
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.messages.unread}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.messages.unread > 0 ? 'From buyers and logistics' : 'No new messages'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Your Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You sold {dashboardData.listings.sold} products recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Orders from the last 30 days
                </CardDescription>
              </div>
              <Link href="/dashboard/farmer/orders">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.length > 0 ? (
                  dashboardData.recentOrders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent orders</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Listings</CardTitle>
                <CardDescription>
                  Your recently added produce listings
                </CardDescription>
              </div>
              <Link href="/dashboard/farmer/listings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentListings.length > 0 ? (
                  dashboardData.recentListings.map((listing) => (
                    <ListingItem key={listing.id} listing={listing} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent listings</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>PHL Risk Assessment by Crop</CardTitle>
            <CardDescription>
              Review spoilage risks for your crops and take action to reduce losses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData.phlRisk.cropSpecific.map((crop) => (
                <div key={crop.cropType} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{crop.cropType}</span>
                    <span className={`text-sm ${getRiskTextColorClass(crop.risk)}`}>
                      {getRiskLabel(crop.risk)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getRiskColorClass(crop.risk)}`} 
                      style={{ width: `${crop.risk}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getRiskAdvice(crop.cropType, crop.risk)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function OrderItem({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {order.cropType} - {order.quantity} {order.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            Buyer: {order.buyerName}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          ₦{order.agreedPrice.toLocaleString()}
        </p>
        <p className={`text-xs ${getStatusColorClass(order.status)}`}>
          {formatOrderStatus(order.status)}
        </p>
      </div>
    </div>
  );
}

function ListingItem({ listing }: { listing: Listing }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {listing.cropType} - {listing.quantity} {listing.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            Grade: {listing.qualityGrade} • {formatDate(listing.harvestDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          {listing.askingPrice ? `₦${listing.askingPrice.toLocaleString()}` : 'Negotiable'}
        </p>
        <p className={`text-xs ${getListingStatusColorClass(listing.status)}`}>
          {capitalize(listing.status)}
        </p>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatOrderStatus(status: string): string {
  return status.split('_').map(capitalize).join(' ');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusColorClass(status: string): string {
  switch (status) {
    case 'pending_confirmation':
      return 'text-yellow-600';
    case 'confirmed':
    case 'awaiting_pickup':
      return 'text-blue-600';
    case 'in_transit':
      return 'text-purple-600';
    case 'delivered':
    case 'completed':
      return 'text-green-600';
    case 'cancelled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

function getListingStatusColorClass(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-600';
    case 'pending':
      return 'text-yellow-600';
    case 'sold':
      return 'text-blue-600';
    case 'expired':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

function getRiskLabel(risk: number): string {
  if (risk < 25) return 'Low';
  if (risk < 50) return 'Medium';
  if (risk < 75) return 'High';
  return 'Critical';
}

function getRiskColorClass(risk: number): string {
  if (risk < 25) return 'bg-green-500';
  if (risk < 50) return 'bg-yellow-500';
  if (risk < 75) return 'bg-orange-500';
  return 'bg-red-500';
}

function getRiskTextColorClass(risk: number): string {
  if (risk < 25) return 'text-green-600';
  if (risk < 50) return 'text-yellow-600';
  if (risk < 75) return 'text-orange-600';
  return 'text-red-600';
}

function getRiskAdvice(cropType: string, risk: number): string {
  if (risk < 25) {
    return `Your ${cropType} are at low risk. Continue good storage practices.`;
  }
  if (risk < 50) {
    return `Consider moving ${cropType} to market within 3-5 days.`;
  }
  if (risk < 75) {
    return `Use cold storage for ${cropType} or sell within 1-2 days.`;
  }
  return `Urgent: ${cropType} at critical risk. Immediate action required.`;
}