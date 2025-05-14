// import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingUserRoles } from "@/components/landing/landing-user-roles";
import { LandingCTA } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingUserRoles />
        <LandingCTA />
        <div className="fixed bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-green-100 dark:border-green-900">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            Powered by Okra AI
          </p>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
