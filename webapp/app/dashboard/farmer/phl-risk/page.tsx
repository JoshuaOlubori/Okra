'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AlertTriangle,
  Thermometer,
  CloudRain,
  Truck,
  Package,
  ArrowRight
} from 'lucide-react';
// import { PhlRiskAdvisory } from '@/lib/types';
import { mockData } from '@/lib/mock-data';

export default function PhlRiskPage() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const advisories = mockData.phlRiskAdvisories;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">PHL Risk Advisory</h2>
            <p className="text-muted-foreground mt-2">
              Monitor and manage post-harvest loss risks for your crops
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Risk Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Medium</div>
              <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weather Impact</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
           
            <CardContent>
              <div className="text-2xl font-bold">High</div>
              <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '65%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Storage Conditions</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Critical</div>
              <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '85%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Risk Advisories</CardTitle>
              <CardDescription>
                Latest post-harvest loss risk assessments for your crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisories.map((advisory) => (
                  <div
                    key={advisory.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{advisory.cropType}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskColorClass(advisory.riskScore)}`}>
                          {advisory.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{advisory.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4" />
                          <span>Storage: {advisory.storageFactor}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CloudRain className="h-4 w-4" />
                          <span>Weather: {advisory.weatherFactor}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          <span>Transport: {advisory.transportFactor}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-muted-foreground">
                        {new Date(advisory.timestamp).toLocaleDateString()}
                      </div>
                      <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Suggested actions to minimize post-harvest losses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisories.slice(0, 1)[0]?.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {index + 1}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function getRiskColorClass(risk: number): string {
  if (risk < 25) return 'bg-green-100 text-green-700';
  if (risk < 50) return 'bg-yellow-100 text-yellow-700';
  if (risk < 75) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}