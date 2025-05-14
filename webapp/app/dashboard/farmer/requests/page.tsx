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
  ShoppingBag,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Request } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { mockData } from '@/lib/mock-data';

export default function FarmerRequestsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const requests = mockData.requests.filter(request => {
    const matchesSearch = request.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Buyer Requests</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
          
          {requests.length === 0 && (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your filters"
                    : "Check back later for new buyer requests"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function RequestCard({ request }: { request: Request }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {request.cropType}
          {request.variety && <span className="text-muted-foreground ml-2 text-sm">({request.variety})</span>}
        </CardTitle>
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusClass(request.status)}`}>
          {capitalize(request.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <ShoppingBag className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
              <p className="text-lg font-semibold">{request.quantity} {request.unit}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Price Range</h4>
              <p className="text-lg font-semibold">
                {request.priceOfferRange.min && request.priceOfferRange.max
                  ? `₦${request.priceOfferRange.min.toLocaleString()} - ₦${request.priceOfferRange.max.toLocaleString()}`
                  : 'Negotiable'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Delivery Location</h4>
              <p className="text-lg font-semibold">{request.deliveryLocation}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Delivery Window</h4>
              <p className="text-lg font-semibold">
                {formatDate(request.deliveryDateRange.start)} - {formatDate(request.deliveryDateRange.end)}
              </p>
            </div>
          </div>
          
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Quality Requirements</h4>
            <p className="text-lg font-semibold">{request.qualitySpecs}</p>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <Link href={`/dashboard/farmer/requests/${request.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          {request.status === 'active' && (
            <Button>Make Offer</Button>
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'fulfilled':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'expired':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
}