'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag,
  Package,
  MessageSquare,
  Search,
  Plus,
  TrendingUp
} from 'lucide-react';
import { BuyerDashboardData, Order, Request } from '@/lib/types';
import Link from 'next/link';

export default function BuyerDashboard() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'buyer') {
    return null;
  }
  
  const dashboardData = user.dashboardData as BuyerDashboardData;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h2>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/buyer/requests/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.requests.active}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.requests.fulfilled} requests fulfilled
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.orders.pendingAcceptance + dashboardData.orders.awaitingDelivery}
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.orders.completed} orders completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Nearby Listings</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.nearbyListings}</div>
              <p className="text-xs text-muted-foreground">
                Available in your area
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
                {dashboardData.messages.unread > 0 ? 'From farmers and logistics' : 'No new messages'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>
                Price trends for your most requested crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Tomatoes', 'Yams', 'Cassava'].map((crop) => (
                  <div key={crop} className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{crop}</p>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        {Math.floor(Math.random() * 15 + 5)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your recent purchase orders
                </CardDescription>
              </div>
              <Link href="/dashboard/buyer/orders">
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
                <CardTitle>Active Requests</CardTitle>
                <CardDescription>
                  Your current produce requests
                </CardDescription>
              </div>
              <Link href="/dashboard/buyer/requests">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentRequests.length > 0 ? (
                  dashboardData.recentRequests.map((request) => (
                    <RequestItem key={request.id} request={request} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No active requests</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function OrderItem({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {order.cropType} - {order.quantity} {order.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            Farmer: {order.farmerName}
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

function RequestItem({ request }: { request: Request }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <ShoppingBag className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {request.cropType} - {request.quantity} {request.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            Delivery: {formatDate(request.deliveryDateRange.start)} - {formatDate(request.deliveryDateRange.end)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          {request.priceOfferRange.min && request.priceOfferRange.max
            ? `₦${request.priceOfferRange.min.toLocaleString()} - ₦${request.priceOfferRange.max.toLocaleString()}`
            : 'Negotiable'
          }
        </p>
        <p className={`text-xs ${getRequestStatusColorClass(request.status)}`}>
          {capitalize(request.status)}
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
      return 'text-yellow-600 dark:text-yellow-400';
    case 'confirmed':
    case 'awaiting_pickup':
      return 'text-blue-600 dark:text-blue-400';
    case 'in_transit':
      return 'text-purple-600 dark:text-purple-400';
    case 'delivered':
    case 'completed':
      return 'text-green-600 dark:text-green-400';
    case 'cancelled':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

function getRequestStatusColorClass(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-600 dark:text-green-400';
    case 'fulfilled':
      return 'text-blue-600 dark:text-blue-400';
    case 'expired':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}