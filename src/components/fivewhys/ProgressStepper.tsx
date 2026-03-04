"use client";

import { Check, HelpCircle, ChevronRight, Sparkles } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  completedSteps,
}: ProgressStepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progress = (completedSteps.length / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Overall progress bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>Progreso del análisis</span>
          <span className="font-semibold text-yellow-600 dark:text-yellow-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full gold-gradient transition-all duration-700 ease-out rounded-full progress-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps visualization */}
      <div className="flex items-center justify-between w-full relative">
        {/* Background connector line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-100 dark:bg-gray-800 rounded-full mx-6" />

        {/* Completed connector line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 gold-gradient rounded-full mx-6 transition-all duration-700 ease-out"
          style={{
            width: `calc(${((Math.max(...completedSteps, 0)) / (totalSteps - 1)) * 100}% - 48px)`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = currentStep === step;
          const isLast = index === steps.length - 1;
          const isUpcoming = !isCompleted && !isCurrent;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              {/* Step indicator */}
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isCompleted
                    ? "gold-gradient text-navy-900 shadow-xl shadow-yellow-500/30 scale-105"
                    : isCurrent
                    ? "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-700 dark:text-yellow-300 ring-4 ring-yellow-100/50 dark:ring-yellow-900/30 shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 celebration" />
                ) : isCurrent ? (
                  <div className="relative">
                    <HelpCircle className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  </div>
                ) : (
                  <span className="text-lg">{step}</span>
                )}

                {/* Pulse ring for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 dark:border-yellow-600/50 animate-ping" />
                )}

                {/* Glow effect for completed */}
                {isCompleted && (
                  <div className="absolute inset-0 rounded-2xl bg-yellow-400/20 blur-md" />
                )}
              </div>

              {/* Step label */}
              <div className="mt-3 text-center">
                <span
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    isCompleted
                      ? "text-yellow-600 dark:text-yellow-400"
                      : isCurrent
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? "Completado" : isCurrent ? "Actual" : `Por qué ${step}`}
                </span>
              </div>

              {/* Celebration sparkle for completed */}
              {isCompleted && (
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-500 bounce-in" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mini status badges */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 rounded gold-gradient" />
          <span>Completado</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 rounded bg-yellow-100 dark:bg-yellow-900/40 ring-2 ring-yellow-400/50" />
          <span>Actual</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800" />
          <span>Pendiente</span>
        </div>
      </div>
    </div>
  );
}
