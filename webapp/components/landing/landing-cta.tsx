import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, Sprout, Tractor } from "lucide-react";

export function LandingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <Sprout className="absolute h-96 w-96 -top-20 -left-20 text-white rotate-12" />
        <Tractor className="absolute h-96 w-96 -bottom-20 -right-20 text-white -rotate-12" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm font-medium">
              Join the agricultural revolution
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Reduce Post-Harvest Losses & Grow Your Agri-Business?
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, buyers, and logistics providers who are
            already using Okra to transform their agricultural operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-white/90 w-full sm:w-auto"
              >
                Login Now
              </Button>
            </Link>
            <Link
              href="https://wa.me/23408050771951?text=Hello%20Okra%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
