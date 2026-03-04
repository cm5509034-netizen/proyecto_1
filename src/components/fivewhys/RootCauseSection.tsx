"use client";

import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface RootCauseSectionProps {
  rootCause: string;
  isVisible: boolean;
}

export function RootCauseSection({ rootCause, isVisible }: RootCauseSectionProps) {
  if (!isVisible || !rootCause) return null;

  return (
    <Card className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800 shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Causa Raíz Principal
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            {rootCause}
          </p>
        </div>
      </div>
    </Card>
  );
}
