import {
  Listing,
  Request,
  Order,
  LogisticsJob,
  PhlRiskAdvisory,
  FarmerDashboardData,
  BuyerDashboardData,
  LogisticsDashboardData,
  LogisticsProvider,
  PriceData,
  Conversation,
  Message,
} from "./types";

// Helper to generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock crop types
const cropTypes = [
  "Tomatoes",
  "Cassava",
  "Yams",
  "Maize",
  "Rice",
  "Peppers",
  "Okra",
  "Plantains",
  "Oranges",
  "Mangoes",
];

// Mock locations
const locations = [
  "Lagos",
  "Kano",
  "Ibadan",
  "Abuja",
  "Port Harcourt",
  "Benin City",
  "Kaduna",
  "Enugu",
  "Calabar",
  "Jos",
];

// Mock storage methods
const storageMethods = [
  "Ambient Temperature",
  "Cold Storage",
  "Shade Storage",
  "Sack Storage",
  "Crate Storage",
  "Traditional Barn",
  "Modified Atmosphere",
];

// Mock farmer listings
export const generateMockListings = (count = 20): Listing[] => {
  return Array(count)
    .fill(0)
    .map((index) => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const harvestDate = randomDate(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        new Date()
      ).toISOString();

      return {
        id: generateId(),
        farmerId: generateId(),
        farmerName: `Farmer ${index + 1}`,
        cropType,
        variety: `${cropType} Variety ${Math.floor(Math.random() * 3) + 1}`,
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: Math.random() > 0.5 ? "kg" : "crates",
        qualityGrade: ["A", "B", "C"][Math.floor(Math.random() * 3)] as
          | "A"
          | "B"
          | "C",
        harvestDate,
        location: locations[Math.floor(Math.random() * locations.length)],
        askingPrice: Math.floor(Math.random() * 5000) + 500,
        priceUnit: "per unit",
        images: [
          `https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
          `https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
        ],
        storageMethod:
          storageMethods[Math.floor(Math.random() * storageMethods.length)],
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: ["active", "pending", "sold", "expired"][
          Math.floor(Math.random() * 4)
        ] as "active" | "pending" | "sold" | "expired",
        phlRisk: Math.floor(Math.random() * 100),
      };
    });
};

// Mock buyer requests
export const generateMockRequests = (count = 15): Request[] => {
  return Array(count)
    .fill(0)
    .map((index) => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const now = new Date();
      const start = new Date(
        now.getTime() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
      );
      const end = new Date(
        start.getTime() +
          Math.floor(Math.random() * 15 + 5) * 24 * 60 * 60 * 1000
      );

      return {
        id: generateId(),
        buyerId: generateId(),
        buyerName: `Buyer ${index + 1}`,
        cropType,
        variety:
          Math.random() > 0.3
            ? `${cropType} Variety ${Math.floor(Math.random() * 3) + 1}`
            : null,
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: Math.random() > 0.5 ? "kg" : "crates",
        qualitySpecs: `Grade ${
          ["A", "B", "C"][Math.floor(Math.random() * 3)]
        }, fresh harvest`,
        deliveryLocation:
          locations[Math.floor(Math.random() * locations.length)],
        deliveryDateRange: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
        priceOfferRange: {
          min: Math.floor(Math.random() * 2000) + 500,
          max: Math.floor(Math.random() * 3000) + 2500,
        },
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: ["active", "fulfilled", "expired"][
          Math.floor(Math.random() * 3)
        ] as "active" | "fulfilled" | "expired",
      };
    });
};

// Mock orders
export const generateMockOrders = (count = 25): Order[] => {
  const statusOptions = [
    "pending_confirmation",
    "confirmed",
    "awaiting_pickup",
    "in_transit",
    "delivered",
    "completed",
    "cancelled",
  ] as const;

  const logisticsStatusOptions = [
    "not_booked",
    "pending",
    "confirmed",
    "picked_up",
    "in_transit",
    "delivered",
  ] as const;

  return Array(count)
    .fill(0)
    .map((_, index) => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const status =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const hasLogistics =
        status !== "pending_confirmation" &&
        status !== "cancelled" &&
        Math.random() > 0.3;

      return {
        id: generateId(),
        listingId: Math.random() > 0.5 ? generateId() : undefined,
        requestId: Math.random() > 0.5 ? generateId() : undefined,
        buyerId: generateId(),
        buyerName: `Buyer ${index + 1}`,
        farmerId: generateId(),
        farmerName: `Farmer ${index + 1}`,
        cropType,
        variety: `${cropType} Variety ${Math.floor(Math.random() * 3) + 1}`,
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: Math.random() > 0.5 ? "kg" : "crates",
        agreedPrice: Math.floor(Math.random() * 5000) + 500,
        priceUnit: "per unit",
        deliveryLocation:
          locations[Math.floor(Math.random() * locations.length)],
        expectedDeliveryDate: new Date(
          Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        status,
        logisticsId: hasLogistics ? generateId() : undefined,
        logisticsName: hasLogistics
          ? `Logistics Provider ${index + 1}`
          : undefined,
        logisticsStatus: hasLogistics
          ? logisticsStatusOptions[
              Math.floor(Math.random() * logisticsStatusOptions.length)
            ]
          : undefined,
      };
    });
};

// Mock logistics jobs
export const generateMockLogisticsJobs = (count = 18): LogisticsJob[] => {
  return Array(count)
    .fill(0)
    .map((_, index) => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const pickupLocation =
        locations[Math.floor(Math.random() * locations.length)];

      let dropoffLocation;
      do {
        dropoffLocation =
          locations[Math.floor(Math.random() * locations.length)];
      } while (dropoffLocation === pickupLocation);

      return {
        id: generateId(),
        orderId: generateId(),
        farmerId: generateId(),
        farmerName: `Farmer ${index + 1}`,
        buyerId: generateId(),
        buyerName: `Buyer ${index + 1}`,
        pickupLocation,
        dropoffLocation,
        cropType,
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: Math.random() > 0.5 ? "kg" : "crates",
        pickupTime:
          Math.random() > 0.3
            ? new Date(
                Date.now() + Math.floor(Math.random() * 72) * 60 * 60 * 1000
              ).toISOString()
            : null,
        estimatedDistance: Math.floor(Math.random() * 300) + 20,
        estimatedDuration: Math.floor(Math.random() * 10) + 1,
        requiredVehicleType: ["truck", "van", "bike"][
          Math.floor(Math.random() * 3)
        ] as "truck" | "van" | "bike",
        requiresColdChain: Math.random() > 0.7,
        offeredPayment: Math.floor(Math.random() * 50000) + 10000,
        status: [
          "available",
          "accepted",
          "in_progress",
          "completed",
          "cancelled",
        ][Math.floor(Math.random() * 5)] as
          | "available"
          | "accepted"
          | "in_progress"
          | "completed"
          | "cancelled",
        phlRisk: Math.floor(Math.random() * 100),
        acceptedById: undefined,
      };
    });
};

// Mock PHL risk advisories
export const generateMockPhlRiskAdvisories = (
  count = 10
): PhlRiskAdvisory[] => {
  const riskLevels = ["low", "medium", "high", "critical"] as const;

  return Array(count)
    .fill(0)
    .map(() => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const region = locations[Math.floor(Math.random() * locations.length)];
      const riskLevel =
        riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const riskScore =
        riskLevel === "low"
          ? Math.floor(Math.random() * 25)
          : riskLevel === "medium"
          ? Math.floor(Math.random() * 25) + 25
          : riskLevel === "high"
          ? Math.floor(Math.random() * 25) + 50
          : Math.floor(Math.random() * 25) + 75;

      return {
        id: generateId(),
        region,
        cropType,
        riskLevel,
        riskScore,
        description: `Risk of post-harvest losses for ${cropType} in ${region} is ${riskLevel} due to current weather conditions and transportation challenges.`,
        recommendations: [
          "Use cold chain logistics where available",
          "Harvest during cooler hours of the day",
          "Ensure proper packaging to prevent bruising",
          "Minimize time between harvest and market",
          "Consider value-added processing options",
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        timestamp: new Date().toISOString(),
        weatherFactor: Math.floor(Math.random() * 100),
        storageFactor: Math.floor(Math.random() * 100),
        transportFactor: Math.floor(Math.random() * 100),
      };
    });
};

// Mock logistics providers
export const generateMockLogisticsProviders = (
  count = 12
): LogisticsProvider[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => {
      const vehicleType = ["truck", "van", "bike"][
        Math.floor(Math.random() * 3)
      ] as "truck" | "van" | "bike";
      const capacity =
        vehicleType === "truck"
          ? Math.floor(Math.random() * 15000) + 5000
          : vehicleType === "van"
          ? Math.floor(Math.random() * 3000) + 1000
          : Math.floor(Math.random() * 300) + 100;

      const serviceAreaCount = Math.floor(Math.random() * 5) + 1;
      const serviceAreas: string[] = [];
      for (let j = 0; j < serviceAreaCount; j++) {
        let area;
        do {
          area = locations[Math.floor(Math.random() * locations.length)];
        } while (serviceAreas.includes(area));
        serviceAreas.push(area);
      }

      return {
        id: generateId(),
        name: `Logistics Provider ${i + 1}`,
        vehicleType,
        capacity,
        capacityUnit: "kg",
        hasColdChain: Math.random() > 0.6,
        registrationNumber: `VH${Math.floor(
          Math.random() * 10000
        )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        serviceAreas,
        pricingModel: ["per_km", "per_hour", "flat_rate"][
          Math.floor(Math.random() * 3)
        ] as "per_km" | "per_hour" | "flat_rate",
        baseRate: Math.floor(Math.random() * 5000) + 1000,
        rating: Math.floor(Math.random() * 50) / 10 + 3,
        totalDeliveries: Math.floor(Math.random() * 200),
      };
    });
};

// Mock price data
export const generateMockPriceData = (count = 15): PriceData[] => {
  return Array(count)
    .fill(0)
    .map(() => {
      const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
      const region = locations[Math.floor(Math.random() * locations.length)];
      const minPrice = Math.floor(Math.random() * 2000) + 500;
      const maxPrice = minPrice + Math.floor(Math.random() * 1500);
      const averagePrice = Math.floor((minPrice + maxPrice) / 2);
      const trends = ["rising", "falling", "stable"] as const;
      const trend = trends[Math.floor(Math.random() * trends.length)];
      const percentChange =
        trend === "stable"
          ? Math.random() * 2 - 1
          : trend === "rising"
          ? Math.random() * 15 + 1
          : -(Math.random() * 15 + 1);

      return {
        cropType,
        region,
        date: new Date().toISOString().split("T")[0],
        minPrice,
        maxPrice,
        averagePrice,
        unit: Math.random() > 0.5 ? "kg" : "crate",
        trend,
        percentChange,
      };
    });
};

// Mock conversations
export const generateMockConversations = (count = 10): Conversation[] => {
  return Array(count)
    .fill(0)
    .map(() => {
      const isFarmerBuyer = Math.random() > 0.3;
      const participants = isFarmerBuyer
        ? [
            {
              id: generateId(),
              name: `Farmer ${Math.floor(Math.random() * 10) + 1}`,
              role: "farmer" as const,
            },
            {
              id: generateId(),
              name: `Buyer ${Math.floor(Math.random() * 10) + 1}`,
              role: "buyer" as const,
            },
          ]
        : [
            {
              id: generateId(),
              name: `Farmer ${Math.floor(Math.random() * 10) + 1}`,
              role: "farmer" as const,
            },
            {
              id: generateId(),
              name: `Logistics Provider ${Math.floor(Math.random() * 10) + 1}`,
              role: "logistics" as const,
            },
          ];

      return {
        id: generateId(),
        participants,
        lastMessage: {
          content: [
            "Thank you for your offer. I'll consider it.",
            "When can you deliver the produce?",
            "Is the price negotiable?",
            "I'll prepare the shipment for tomorrow.",
            "Can you provide more details about storage conditions?",
          ][Math.floor(Math.random() * 5)],
          timestamp: new Date(
            Date.now() - Math.floor(Math.random() * 72) * 60 * 60 * 1000
          ).toISOString(),
          senderId: participants[Math.floor(Math.random() * 2)].id,
        },
        unreadCount: Math.floor(Math.random() * 5),
      };
    });
};

// Mock messages
export const generateMockMessages = (count = 50): Message[] => {
  const conversations = generateMockConversations(5);

  return Array(count)
    .fill(0)
    .map(() => {
      const conversation =
        conversations[Math.floor(Math.random() * conversations.length)];
      const sender = conversation.participants[Math.floor(Math.random() * 2)];
      const receiver = conversation.participants.find(
        (p) => p.id !== sender.id
      )!;

      return {
        id: generateId(),
        conversationId: conversation.id,
        senderId: sender.id,
        senderName: sender.name,
        receiverId: receiver.id,
        content: [
          "Hello, I'm interested in your produce.",
          "What's your best price?",
          "Can we arrange delivery for next week?",
          "The quality looks good from the photos.",
          "I'll need cold chain storage for this shipment.",
          "Please confirm the pickup location.",
          "The produce is ready for pickup.",
          "Payment has been processed.",
          "Thank you for your business!",
          "Let me know when you're available.",
        ][Math.floor(Math.random() * 10)],
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 72) * 60 * 60 * 1000
        ).toISOString(),
        read: Math.random() > 0.3,
      };
    });
};

// Mock dashboard data
export const getFarmerDashboardData = (): FarmerDashboardData => {
  return {
    listings: {
      active: Math.floor(Math.random() * 10) + 1,
      pending: Math.floor(Math.random() * 5),
      sold: Math.floor(Math.random() * 20) + 5,
    },
    orders: {
      pendingConfirmation: Math.floor(Math.random() * 5),
      awaitingPickup: Math.floor(Math.random() * 3),
      inTransit: Math.floor(Math.random() * 2),
      completed: Math.floor(Math.random() * 15) + 5,
    },
    messages: {
      unread: Math.floor(Math.random() * 10),
    },
    phlRisk: {
      overall: Math.floor(Math.random() * 100),
      cropSpecific: cropTypes.slice(0, 3).map((cropType) => ({
        cropType,
        risk: Math.floor(Math.random() * 100),
      })),
    },
    recentOrders: generateMockOrders(5),
    recentListings: generateMockListings(5),
  };
};

export const getBuyerDashboardData = (): BuyerDashboardData => {
  return {
    requests: {
      active: Math.floor(Math.random() * 8) + 1,
      fulfilled: Math.floor(Math.random() * 15) + 5,
    },
    orders: {
      pendingAcceptance: Math.floor(Math.random() * 5),
      awaitingDelivery: Math.floor(Math.random() * 3),
      completed: Math.floor(Math.random() * 15) + 5,
    },
    messages: {
      unread: Math.floor(Math.random() * 10),
    },
    recentOrders: generateMockOrders(5),
    recentRequests: generateMockRequests(5),
    nearbyListings: Math.floor(Math.random() * 30) + 5,
  };
};

export const getLogisticsDashboardData = (): LogisticsDashboardData => {
  return {
    jobs: {
      available: Math.floor(Math.random() * 15) + 3,
      accepted: Math.floor(Math.random() * 5),
      inProgress: Math.floor(Math.random() * 3),
      completed: Math.floor(Math.random() * 25) + 10,
    },
    earnings: {
      today: Math.floor(Math.random() * 10000) + 2000,
      thisWeek: Math.floor(Math.random() * 50000) + 20000,
      thisMonth: Math.floor(Math.random() * 200000) + 80000,
    },
    messages: {
      unread: Math.floor(Math.random() * 10),
    },
    upcomingDeliveries: generateMockLogisticsJobs(4).map((job) => ({
      ...job,
      status: "accepted",
    })),
    availableJobs: generateMockLogisticsJobs(5).map((job) => ({
      ...job,
      status: "available",
    })),
    deliveryStats: {
      totalDistance: Math.floor(Math.random() * 5000) + 1000,
      totalDeliveries: Math.floor(Math.random() * 100) + 20,
      averageRating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    },
  };
};

// Export all mock data generators
export const mockData = {
  listings: generateMockListings(),
  requests: generateMockRequests(),
  orders: generateMockOrders(),
  logisticsJobs: generateMockLogisticsJobs(),
  phlRiskAdvisories: generateMockPhlRiskAdvisories(),
  logisticsProviders: generateMockLogisticsProviders(),
  priceData: generateMockPriceData(),
  conversations: generateMockConversations(),
  messages: generateMockMessages(),
};
