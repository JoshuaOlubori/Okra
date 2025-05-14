export type UserRole = 'farmer' | 'buyer' | 'logistics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  phoneNumber: string;
  createdAt: string;
  profileComplete: boolean;
  avatarUrl: string | null;
  dashboardData: FarmerDashboardData | BuyerDashboardData | LogisticsDashboardData; // Type-specific based on user role
}

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  cropType: string;
  variety: string;
  quantity: number;
  unit: string;
  qualityGrade: 'A' | 'B' | 'C';
  harvestDate: string;
  location: string;
  askingPrice: number | null;
  priceUnit: string;
  images: string[];
  storageMethod: string;
  createdAt: string;
  status: 'active' | 'pending' | 'sold' | 'expired';
  phlRisk: number; // 0-100
}

export interface Request {
  id: string;
  buyerId: string;
  buyerName: string;
  cropType: string;
  variety: string | null;
  quantity: number;
  unit: string;
  qualitySpecs: string;
  deliveryLocation: string;
  deliveryDateRange: {
    start: string;
    end: string;
  };
  priceOfferRange: {
    min: number | null;
    max: number | null;
  };
  createdAt: string;
  status: 'active' | 'fulfilled' | 'expired';
}

export interface Order {
  id: string;
  listingId?: string;
  requestId?: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  cropType: string;
  variety: string;
  quantity: number;
  unit: string;
  agreedPrice: number;
  priceUnit: string;
  deliveryLocation: string;
  expectedDeliveryDate: string;
  createdAt: string;
  status: 'pending_confirmation' | 'confirmed' | 'awaiting_pickup' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';
  logisticsId?: string;
  logisticsName?: string;
  logisticsStatus?: 'not_booked' | 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered';
}

export interface LogisticsProvider {
  id: string;
  name: string;
  vehicleType: 'truck' | 'van' | 'bike';
  capacity: number;
  capacityUnit: string;
  hasColdChain: boolean;
  registrationNumber: string;
  serviceAreas: string[];
  pricingModel: 'per_km' | 'per_hour' | 'flat_rate';
  baseRate: number;
  rating: number;
  totalDeliveries: number;
}

export interface LogisticsJob {
  id: string;
  orderId: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  cropType: string;
  quantity: number;
  unit: string;
  pickupTime: string | null;
  estimatedDistance: number;
  estimatedDuration: number;
  requiredVehicleType: 'truck' | 'van' | 'bike';
  requiresColdChain: boolean;
  offeredPayment: number;
  status: 'available' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  phlRisk: number; // 0-100
  acceptedById?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: UserRole;
  }[];
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}

export interface PhlRiskAdvisory {
  id: string;
  region: string;
  cropType: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  description: string;
  recommendations: string[];
  timestamp: string;
  weatherFactor: number; // 0-100, how much weather contributes to the risk
  storageFactor: number; // 0-100, how much storage contributes 
  transportFactor: number; // 0-100, how much transport contributes
}

export interface PriceData {
  cropType: string;
  region: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  unit: string;
  trend: 'rising' | 'falling' | 'stable';
  percentChange: number;
}

export interface FarmerDashboardData {
  listings: {
    active: number;
    pending: number;
    sold: number;
  };
  orders: {
    pendingConfirmation: number;
    awaitingPickup: number;
    inTransit: number;
    completed: number;
  };
  messages: {
    unread: number;
  };
  phlRisk: {
    overall: number; // 0-100
    cropSpecific: {
      cropType: string;
      risk: number; // 0-100
    }[];
  };
  recentOrders: Order[];
  recentListings: Listing[];
}

export interface BuyerDashboardData {
  requests: {
    active: number;
    fulfilled: number;
  };
  orders: {
    pendingAcceptance: number;
    awaitingDelivery: number;
    completed: number;
  };
  messages: {
    unread: number;
  };
  recentOrders: Order[];
  recentRequests: Request[];
  nearbyListings: number;
}

export interface LogisticsDashboardData {
  jobs: {
    available: number;
    accepted: number;
    inProgress: number;
    completed: number;
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  messages: {
    unread: number;
  };
  upcomingDeliveries: LogisticsJob[];
  availableJobs: LogisticsJob[];
  deliveryStats: {
    totalDistance: number;
    totalDeliveries: number;
    averageRating: number;
  };
}