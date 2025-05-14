import { 
  BarChart3, 
  TruckIcon, 
  Users, 
  ArrowDownUp, 
  Navigation, 
  ShieldCheck,
  ThermometerIcon,
  DollarSign
} from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Connect with the Right People",
      description: "Link farmers directly with buyers and logistics providers to eliminate middlemen and increase profits."
    },
    {
      icon: <TruckIcon className="h-10 w-10 text-green-600" />,
      title: "Optimize Logistics",
      description: "Book transport with cold chain options to preserve your produce quality during transit."
    },
    {
      icon: <ThermometerIcon className="h-10 w-10 text-green-600" />,
      title: "Reduce Spoilage Risk",
      description: "Get real-time PHL risk assessments based on crop type, weather, and logistics data."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-green-600" />,
      title: "Data-Driven Insights",
      description: "Access predictive analytics for market prices and spoilage risks to make informed decisions."
    },
    {
      icon: <ArrowDownUp className="h-10 w-10 text-green-600" />,
      title: "Transparent Marketplace",
      description: "View and compare prices, quality, and ratings to get the best deals for your business."
    },
    {
      icon: <Navigation className="h-10 w-10 text-green-600" />,
      title: "Real-Time Tracking",
      description: "Monitor your orders and shipments with live updates from pickup to delivery."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-green-600" />,
      title: "Quality Assurance",
      description: "Rate and review transactions to build a trusted network of reliable partners."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-green-600" />,
      title: "Increased Profitability",
      description: "Maximize returns by reducing losses and connecting to premium markets."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Powerful Features to Transform Agriculture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform provides all the tools needed to reduce post-harvest losses and build successful agribusinesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}