'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Loader2, X } from 'lucide-react';

export default function NewListingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    cropType: '',
    variety: '',
    quantity: '',
    unit: 'kg',
    qualityGrade: 'A',
    harvestDate: '',
    location: '',
    askingPrice: '',
    storageMethod: '',
    description: ''
  });

  if (!user || user.role !== 'farmer') {
    return null;
  }

  // Update location after user is verified
  formData.location = user.location;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push('/dashboard/farmer/listings');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate image upload by using placeholder URLs
    const placeholderImages = [
      'https://images.pexels.com/photos/2255903/pexels-photo-2255903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2289652/pexels-photo-2289652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    setImages(prev => [...prev, ...placeholderImages.slice(0, 3 - prev.length)]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
            <CardDescription>
              List your produce to connect with potential buyers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, cropType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Tomatoes', 'Cassava', 'Yams', 'Maize', 'Rice', 'Peppers'].map((crop) => (
                          <SelectItem key={crop} value={crop.toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      value={formData.variety}
                      onChange={(e) => setFormData(prev => ({ ...prev, variety: e.target.value }))}
                      placeholder="e.g., Roma, Cherry"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="Enter quantity"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="crates">Crates</SelectItem>
                        <SelectItem value="bags">Bags</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="qualityGrade">Quality Grade</Label>
                    <Select
                      value={formData.qualityGrade}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, qualityGrade: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Grade A</SelectItem>
                        <SelectItem value="B">Grade B</SelectItem>
                        <SelectItem value="C">Grade C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="askingPrice">Asking Price (₦)</Label>
                    <Input
                      id="askingPrice"
                      type="number"
                      value={formData.askingPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, askingPrice: e.target.value }))}
                      placeholder="Enter price per unit"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="storageMethod">Storage Method</Label>
                  <Select
                    value={formData.storageMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, storageMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold_storage">Cold Storage</SelectItem>
                      <SelectItem value="ambient">Ambient Temperature</SelectItem>
                      <SelectItem value="traditional">Traditional Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Product Images (3 viewpoints required)</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                        {images[index] ? (
                          <>
                            <img
                              src={images[index]}
                              alt={`Product view ${index + 1}`}
                              className="absolute inset-0 h-full w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center absolute inset-0 cursor-pointer">
                            <Camera className="h-8 w-8 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              View {index + 1}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add any additional information about your produce..."
                    className="h-24"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || images.length < 3}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Listing...
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}