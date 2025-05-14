'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Filter,
  Package,
  Truck,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Order } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { mockData } from '@/lib/mock-data';

export default function FarmerOrdersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const orders = mockData.orders.filter(order => {
    const matchesSearch = 
      order.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending_confirmation">Pending Confirmation</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="awaiting_pickup">Awaiting Pickup</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
          {orders.length === 0 && (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your filters"
                    : "Create listings to start receiving orders"
                  }
                </p>
                <Link href="/dashboard/farmer/listings/new">
                  <Button>Create Listing</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {order.cropType}
          {order.variety && <span className="text-muted-foreground ml-2 text-sm">({order.variety})</span>}
        </CardTitle>
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusClass(order.status)}`}>
          {formatStatus(order.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
              <p className="text-lg font-semibold">{order.quantity} {order.unit}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Price</h4>
              <p className="text-lg font-semibold">₦{order.agreedPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Delivery Location</h4>
              <p className="text-lg font-semibold">{order.deliveryLocation}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Expected Delivery</h4>
              <p className="text-lg font-semibold">{formatDate(order.expectedDeliveryDate)}</p>
            </div>
          </div>
          
          {order.logisticsName && (
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Logistics Provider</h4>
                <p className="text-lg font-semibold">{order.logisticsName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatLogisticsStatus(order.logisticsStatus)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex gap-3">
          <Link href={`/dashboard/farmer/orders/${order.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          {order.status === 'pending_confirmation' && (
            <>
              <Button>Accept Order</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Decline Order
              </Button>
            </>
          )}
          {!order.logisticsId && order.status === 'confirmed' && (
            <Button>Book Logistics</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatStatus(status: string): string {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatLogisticsStatus(status: string | undefined): string {
  if (!status) return '';
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'pending_confirmation':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'confirmed':
    case 'awaiting_pickup':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'in_transit':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    case 'delivered':
    case 'completed':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
}