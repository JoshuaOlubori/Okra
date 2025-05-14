"use client";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="animate-[pulse_3s_ease-in-out_infinite] transition-all duration-300">
        <Logo className="h-20 w-20 mb-8" logoType={false} />
      </div>
      <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Under Development
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        This part of the application is currently under development. Please
        check back later.
      </p>
      <Button
        onClick={() => router.push("/dashboard")}
        className="px-6 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
      >
        Return to Dashboard
      </Button>
    </div>
  );
}
