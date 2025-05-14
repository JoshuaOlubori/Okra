'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle
} from 'lucide-react';
import { Listing } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { mockData } from '@/lib/mock-data';

export default function FarmerListingsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const listings = mockData.listings.filter(listing => {
    const matchesSearch = listing.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Listings</h2>
          <Link href="/dashboard/farmer/listings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
          
          {listings.length === 0 && (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your filters"
                    : "Create your first produce listing"
                  }
                </p>
                <Link href="/dashboard/farmer/listings/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {listing.cropType}
          {listing.variety && <span className="text-muted-foreground ml-2 text-sm">({listing.variety})</span>}
        </CardTitle>
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusClass(listing.status)}`}>
          {capitalize(listing.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
            <img 
              src={listing.images[0]} 
              alt={`${listing.cropType} main view`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Quantity & Grade</h4>
              <p className="text-lg font-semibold">
                {listing.quantity} {listing.unit} • Grade {listing.qualityGrade}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Price</h4>
              <p className="text-lg font-semibold">
                {listing.askingPrice 
                  ? `₦${listing.askingPrice.toLocaleString()} per ${listing.priceUnit}`
                  : 'Negotiable'
                }
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Storage Method</h4>
              <p className="text-lg font-semibold">{listing.storageMethod}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Harvest Date</h4>
              <p className="text-lg font-semibold">{formatDate(listing.harvestDate)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
              <p className="text-lg font-semibold">{listing.location}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">PHL Risk</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPhlRiskColorClass(listing.phlRisk)}`}
                    style={{ width: `${listing.phlRisk}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getPhlRiskTextColorClass(listing.phlRisk)}`}>
                  {listing.phlRisk}%
                </span>
                {listing.phlRisk > 50 && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <Link href={`/dashboard/farmer/listings/${listing.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          {listing.status === 'active' && (
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              Deactivate Listing
            </Button>
          )}
          {listing.status === 'pending' && (
            <Button>Publish Listing</Button>
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
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'sold':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'expired':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
}

function getPhlRiskColorClass(risk: number): string {
  if (risk < 25) return 'bg-green-500';
  if (risk < 50) return 'bg-yellow-500';
  if (risk < 75) return 'bg-orange-500';
  return 'bg-red-500';
}

function getPhlRiskTextColorClass(risk: number): string {
  if (risk < 25) return 'text-green-700 dark:text-green-400';
  if (risk < 50) return 'text-yellow-700 dark:text-yellow-400';
  if (risk < 75) return 'text-orange-700 dark:text-orange-400';
  return 'text-red-700 dark:text-red-400';
}