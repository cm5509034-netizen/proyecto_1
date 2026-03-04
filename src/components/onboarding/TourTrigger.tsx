"use client";

import { useOnboarding } from "./OnboardingContext";
import { Button } from "@/components/ui/button";
import { HelpCircle, PlayCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TourTrigger() {
  const { startTour, isActive } = useOnboarding();

  if (isActive) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={startTour}
            variant="ghost"
            size="icon"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="bg-slate-800 text-white border-slate-700"
        >
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-yellow-400" />
            <span>Iniciar Tour Guiado</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
