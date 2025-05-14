"use client";

import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, CircleCheck } from "lucide-react";

export function LandingUserRoles() {
  const [activeTab, setActiveTab] = useState("farmer");

  const roles = {
    farmer: {
      title: "For Farmers & Cooperatives",
      image: "/farmer.avif",
      benefits: [
        "Create listings for your produce in minutes",
        "Get fair market prices with price comparison",
        "Reduce spoilage with PHL risk advisories",
        "Connect directly with serious buyers",
        "Book quality-preserving transport options",
        "Access data insights to improve farm operations",
      ],
    },
    buyer: {
      title: "For Produce Buyers",
      image: "/buyer.avif",
      benefits: [
        "Browse verified farmer listings in your area",
        "Create specific requests for the produce you need",
        "Ensure quality with transparent ratings and reviews",
        "Track your orders from farm to destination",
        "Reduce waste with optimized logistics",
        "Build reliable supply chains with trusted farmers",
      ],
    },
    logistics: {
      title: "For Logistics Providers",
      image: "/logistics.avif",
      benefits: [
        "Find transport jobs matching your vehicle type",
        "Get optimized route suggestions and risk warnings",
        "Increase utilization of your vehicle fleet",
        "Build a reputation with ratings and reviews",
        "Track earnings and manage deliveries easily",
        "Grow your transport business with regular clients",
      ],
    },
  };

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white dark:bg-gray-950 overflow-hidden"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AgriLink Works for Everyone
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform is tailored to the specific needs of each participant
            in the agricultural value chain.
          </p>
        </div>

        <Tabs
          defaultValue="farmer"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="farmer">Farmers</TabsTrigger>
              <TabsTrigger value="buyer">Buyers</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(roles).map(([key, role]) => (
            <TabsContent
              key={key}
              value={key}
              className="mt-6 sm:mt-10 animate-fade-up space-y-8"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {role.title}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {role.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CircleCheck className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link href={`/auth/login?role=${key}`}>
                    <Button size="lg" className="group">
                      Log in as a {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-green-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                      <Image
                        src={role.image}
                        alt={`${key} using AgriLink`}
                        width={800}
                        height={450}
                        className="w-full h-auto aspect-video object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
