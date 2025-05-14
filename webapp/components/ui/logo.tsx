import { cn } from "@/lib/utils";
import logoBlack from "@/public/logo-black.png";
import logoWhite from "@/public/logo-white.png";
import Image from "next/image";
import { ComponentProps } from "react";

type LogoProps = {
  className?: string;
  logoType?: boolean;
} & Omit<ComponentProps<typeof Image>, "src" | "alt">;

export function Logo({ className, logoType = false, ...props }: LogoProps) {
  return (
    <div className="relative">
      <Image
        src={logoType ? logoWhite : logoBlack}
        alt="Okra Logo"
        className={cn(className)}
        {...props}
      />
      {/* <div className="absolute inset-0 bg-white/20 blur-sm rounded-full -z-10"></div> */}
    </div>
  );
}
