import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function LandingHero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative bg-gradient-to-b from-green-600 to-green-800 lg:bg-none lg:before:absolute lg:before:inset-0 lg:before:bg-[url('/hero-background-overlay.avif')] lg:before:bg-cover lg:before:bg-center lg:before:opacity-90 lg:after:absolute lg:after:inset-0 lg:after:bg-gradient-to-b lg:after:from-green-600/80 lg:after:to-green-800/80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 z-[1]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6 animate-fade-in">
              <span className="text-sm font-medium">
                Reducing Post-Harvest Losses in Nigeria
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up">
              Connect, Trade, and Grow with Okra
            </h1>

            <p
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              We dynamically connect farmers, buyers, and logistics providers to
              minimize post-harvest losses and maximize agricultural potential.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-white/90 w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className=" w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 animate-fade-left"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden p-2">
                {/* <img
                  src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Farmers working with produce"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                /> */}

                <Image
                  src="/maize_phl.jpg"
                  alt="Maize post harvest loss"
                  width={800}
                  height={450}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-medium text-sm">
                    Post-Harvest Loss Reduction
                  </p>
                </div>
                <p className="text-xs text-gray-600">
                  Our platform has helped reduce PHL by up to 40% for connected
                  farmers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
