"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, 
 //   DollarSign, TrendingUp, TrendingDown,
     ArrowUpRight, ArrowDownRight, Download } from 'lucide-react'
import { cn } from "@/lib/utils"

// Mock data for earnings
const earningsData = {
  today: 12000,
  yesterday: 8500,
  thisWeek: 45000,
  lastWeek: 38000,
  thisMonth: 180000,
  lastMonth: 165000,
  totalEarnings: 1250000,
  pendingPayments: 35000,
  completedDeliveries: 85,
  averageRating: 4.8,
  totalDistance: 4250,
  monthlyChart: [
    { month: "Jan", earnings: 120000 },
    { month: "Feb", earnings: 135000 },
    { month: "Mar", earnings: 115000 },
    { month: "Apr", earnings: 140000 },
    { month: "May", earnings: 165000 },
    { month: "Jun", earnings: 180000 },
  ],
  weeklyChart: [
    { day: "Mon", earnings: 8500 },
    { day: "Tue", earnings: 7500 },
    { day: "Wed", earnings: 9000 },
    { day: "Thu", earnings: 12000 },
    { day: "Fri", earnings: 8000 },
    { day: "Sat", earnings: 0 },
    { day: "Sun", earnings: 0 },
  ],
  recentPayments: [
    {
      id: "pmt1",
      date: "2023-06-15",
      amount: 25000,
      deliveryId: "del1",
      cropType: "Cassava",
      status: "completed",
    },
    {
      id: "pmt2",
      date: "2023-06-14",
      amount: 15000,
      deliveryId: "del3",
      cropType: "Rice",
      status: "completed",
    },
    {
      id: "pmt3",
      date: "2023-06-13",
      amount: 18000,
      deliveryId: "del4",
      cropType: "Yam",
      status: "completed",
    },
    {
      id: "pmt4",
      date: "2023-06-10",
      amount: 22000,
      deliveryId: "del5",
      cropType: "Vegetables",
      status: "completed",
    },
    {
      id: "pmt5",
      date: "2023-06-08",
      amount: 30000,
      deliveryId: "del6",
      cropType: "Maize",
      status: "completed",
    },
  ],
  pendingPaymentsList: [
    {
      id: "pending1",
      date: "2023-06-16",
      amount: 30000,
      deliveryId: "del2",
      cropType: "Tomatoes",
      status: "pending",
      expectedDate: "2023-06-18",
    },
    {
      id: "pending2",
      date: "2023-06-17",
      amount: 5000,
      deliveryId: "del7",
      cropType: "Peppers",
      status: "pending",
      expectedDate: "2023-06-19",
    },
  ],
}

export default function LogisticsEarningsPage() {
  const [period, setPeriod] = useState("month")
  
  // Calculate percentage changes
  const weeklyChange = ((earningsData.thisWeek - earningsData.lastWeek) / earningsData.lastWeek) * 100
  const monthlyChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100
  
  // Find max value for chart scaling
  const maxMonthlyEarnings = Math.max(...earningsData.monthlyChart.map(item => item.earnings))
  const maxWeeklyEarnings = Math.max(...earningsData.weeklyChart.map(item => item.earnings))
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Earnings</h1>
            <p className="text-muted-foreground">
              Track your earnings, payments, and financial performance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">₦{earningsData.today.toLocaleString()}</div>
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  earningsData.today > earningsData.yesterday 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                )}>
                  {earningsData.today > earningsData.yesterday ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round(((earningsData.today - earningsData.yesterday) / earningsData.yesterday) * 100)}%
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.round(((earningsData.yesterday - earningsData.today) / earningsData.yesterday) * 100)}%
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to ₦{earningsData.yesterday.toLocaleString()} yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">₦{earningsData.thisWeek.toLocaleString()}</div>
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  weeklyChange > 0 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                )}>
                  {weeklyChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round(weeklyChange)}%
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.round(Math.abs(weeklyChange))}%
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to ₦{earningsData.lastWeek.toLocaleString()} last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">₦{earningsData.thisMonth.toLocaleString()}</div>
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  monthlyChange > 0 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                )}>
                  {monthlyChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round(monthlyChange)}%
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.round(Math.abs(monthlyChange))}%
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to ₦{earningsData.lastMonth.toLocaleString()} last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Earnings Overview</CardTitle>
                <Select defaultValue="month" onValueChange={setPeriod}>
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Your earnings over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                {period === "week" ? (
                  <div className="flex items-end justify-between h-[250px] gap-2">
                    {earningsData.weeklyChart.map((item) => (
                      <div key={item.day} className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full flex justify-center">
                          <div 
                            className="w-full max-w-[40px] bg-green-500 dark:bg-green-600 rounded-t-md"
                            style={{ 
                              height: `${(item.earnings / maxWeeklyEarnings) * 200}px`,
                              opacity: item.earnings === 0 ? 0.3 : 1
                            }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">{item.day}</div>
                        <div className="text-xs font-medium">
                          {item.earnings > 0 ? `₦${item.earnings.toLocaleString()}` : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-end justify-between h-[250px] gap-2">
                    {earningsData.monthlyChart.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full flex justify-center">
                          <div 
                            className="w-full max-w-[40px] bg-green-500 dark:bg-green-600 rounded-t-md"
                            style={{ height: `${(item.earnings / maxMonthlyEarnings) * 200}px` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">{item.month}</div>
                        <div className="text-xs font-medium">₦{(item.earnings / 1000).toFixed(0)}k</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>
                Your overall performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Total Earnings</div>
                  <div className="font-medium">₦{earningsData.totalEarnings.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Pending Payments</div>
                  <div className="font-medium">₦{earningsData.pendingPayments.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Completed Deliveries</div>
                  <div className="font-medium">{earningsData.completedDeliveries}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                  <div className="font-medium">{earningsData.averageRating}/5.0</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Total Distance</div>
                  <div className="font-medium">{earningsData.totalDistance.toLocaleString()} km</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList>
            <TabsTrigger value="recent">Recent Payments</TabsTrigger>
            <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>
                  Your most recent completed payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                    <div>Date</div>
                    <div>Delivery ID</div>
                    <div>Crop Type</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Status</div>
                  </div>
                  <div className="divide-y">
                    {earningsData.recentPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-5 p-4 text-sm">
                        <div>{new Date(payment.date).toLocaleDateString()}</div>
                        <div>#{payment.deliveryId.slice(-4)}</div>
                        <div>{payment.cropType}</div>
                        <div className="text-right font-medium">₦{payment.amount.toLocaleString()}</div>
                        <div className="text-right">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            Completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">Previous</Button>
                <Button variant="ghost" size="sm">Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>
                  Payments that are being processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                {earningsData.pendingPaymentsList.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending payments.</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                      <div>Date</div>
                      <div>Delivery ID</div>
                      <div>Crop Type</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Expected</div>
                    </div>
                    <div className="divide-y">
                      {earningsData.pendingPaymentsList.map((payment) => (
                        <div key={payment.id} className="grid grid-cols-5 p-4 text-sm">
                          <div>{new Date(payment.date).toLocaleDateString()}</div>
                          <div>#{payment.deliveryId.slice(-4)}</div>
                          <div>{payment.cropType}</div>
                          <div className="text-right font-medium">₦{payment.amount.toLocaleString()}</div>
                          <div className="text-right text-muted-foreground">
                            {new Date(payment.expectedDate).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
