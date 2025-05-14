'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { Button } from '@/components/ui/button';
import { 
  Truck,
  Package,
  MessageSquare,
  DollarSign,
  MapPin,
  Star,
  Clock,
//  ToggleLeft
} from 'lucide-react';
import { LogisticsDashboardData, LogisticsJob } from '@/lib/types';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function LogisticsDashboard() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  
  if (!user || user.role !== 'logistics') {
    return null;
  }
  
  const dashboardData = user.dashboardData as LogisticsDashboardData;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Logistics Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-green-500"
              />
              <span className="text-sm font-medium">
                {isAvailable ? 'Available for Jobs' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.jobs.available}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.jobs.accepted} jobs accepted
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{dashboardData.earnings.today.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ₦{dashboardData.earnings.thisWeek.toLocaleString()} this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.deliveryStats.totalDistance}km</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.deliveryStats.totalDeliveries} deliveries completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.messages.unread}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.messages.unread > 0 ? 'From clients' : 'No new messages'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
              <CardDescription>
                Your delivery performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">Average Rating</span>
                  </div>
                  <span className="text-2xl font-bold">{dashboardData.deliveryStats.averageRating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">On-Time Delivery</span>
                  </div>
                  <span className="text-2xl font-bold">98%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">Successful Deliveries</span>
                  </div>
                  <span className="text-2xl font-bold">{dashboardData.deliveryStats.totalDeliveries}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Deliveries</CardTitle>
                <CardDescription>
                  Your scheduled deliveries
                </CardDescription>
              </div>
              <Link href="/dashboard/logistics/deliveries">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcomingDeliveries.length > 0 ? (
                  dashboardData.upcomingDeliveries.map((job) => (
                    <DeliveryItem key={job.id} job={job} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming deliveries</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>
                  Jobs matching your vehicle type and location
                </CardDescription>
              </div>
              <Link href="/dashboard/logistics/jobs">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.availableJobs.length > 0 ? (
                  dashboardData.availableJobs.map((job) => (
                    <JobItem key={job.id} job={job} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No available jobs</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DeliveryItem({ job }: { job: LogisticsJob }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Truck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {job.cropType} - {job.quantity} {job.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            {job.pickupLocation} → {job.dropoffLocation}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          ₦{job.offeredPayment.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {job.pickupTime ? formatDate(job.pickupTime) : 'Flexible'}
        </p>
      </div>
    </div>
  );
}

function JobItem({ job }: { job: LogisticsJob }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {job.cropType} - {job.quantity} {job.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            {job.pickupLocation} → {job.dropoffLocation} • {job.estimatedDistance}km
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">
          ₦{job.offeredPayment.toLocaleString()}
        </p>
        <p className={`text-xs ${getPhlRiskColorClass(job.phlRisk)}`}>
          {getPhlRiskLabel(job.phlRisk)} Risk
        </p>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function getPhlRiskLabel(risk: number): string {
  if (risk < 25) return 'Low';
  if (risk < 50) return 'Medium';
  if (risk < 75) return 'High';
  return 'Critical';
}

function getPhlRiskColorClass(risk: number): string {
  if (risk < 25) return 'text-green-600 dark:text-green-400';
  if (risk < 50) return 'text-yellow-600 dark:text-yellow-400';
  if (risk < 75) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}