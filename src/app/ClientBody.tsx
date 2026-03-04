"use client";

import { useEffect } from "react";
import {
  OnboardingProvider,
  TourTooltip,
  TourTrigger,
} from "@/components/onboarding";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <OnboardingProvider>
      <div className="antialiased">
        {children}
        <TourTooltip />
        <TourTrigger />
      </div>
    </OnboardingProvider>
  );
}
