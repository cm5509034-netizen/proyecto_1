"use client";

import { useEffect, useState, useRef } from "react";
import { useOnboarding } from "./OnboardingContext";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Position {
  top: number;
  left: number;
  targetRect: DOMRect | null;
}

export function TourTooltip() {
  const {
    isActive,
    currentStep,
    steps,
    nextStep,
    prevStep,
    skipTour,
    endTour,
  } = useOnboarding();
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    targetRect: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (!isActive || !currentStepData) {
      setIsVisible(false);
      return;
    }

    const updatePosition = () => {
      const target = document.querySelector(currentStepData.target);
      if (!target) {
        // Try again after a short delay
        setTimeout(updatePosition, 100);
        return;
      }

      const rect = target.getBoundingClientRect();
      const tooltip = tooltipRef.current;
      const tooltipWidth = tooltip?.offsetWidth || 380;
      const tooltipHeight = tooltip?.offsetHeight || 200;
      const padding = 16;
      const arrowSize = 12;

      let top = 0;
      let left = 0;

      switch (currentStepData.position) {
        case "top":
          top = rect.top - tooltipHeight - arrowSize - padding;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top = rect.bottom + arrowSize + padding;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - arrowSize - padding;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + arrowSize + padding;
          break;
      }

      // Keep tooltip within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < padding) left = padding;
      if (left + tooltipWidth > viewportWidth - padding) {
        left = viewportWidth - tooltipWidth - padding;
      }
      if (top < padding) top = padding;
      if (top + tooltipHeight > viewportHeight - padding) {
        top = viewportHeight - tooltipHeight - padding;
      }

      setPosition({ top, left, targetRect: rect });
      setIsVisible(true);

      // Scroll target into view if needed
      if (rect.top < 0 || rect.bottom > viewportHeight) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    // Small delay to allow for DOM updates
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isActive, currentStep, currentStepData]);

  if (!isActive || !currentStepData) return null;

  const getArrowStyles = () => {
    const arrowSize = 12;
    const base = {
      position: "absolute" as const,
      width: 0,
      height: 0,
      borderStyle: "solid",
    };

    switch (currentStepData.position) {
      case "top":
        return {
          ...base,
          bottom: -arrowSize,
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
          borderColor: "rgb(30 41 59) transparent transparent transparent",
        };
      case "bottom":
        return {
          ...base,
          top: -arrowSize,
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
          borderColor: "transparent transparent rgb(30 41 59) transparent",
        };
      case "left":
        return {
          ...base,
          right: -arrowSize,
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
          borderColor: "transparent transparent transparent rgb(30 41 59)",
        };
      case "right":
        return {
          ...base,
          left: -arrowSize,
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
          borderColor: "transparent rgb(30 41 59) transparent transparent",
        };
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(2px)",
        }}
        onClick={skipTour}
      />

      {/* Spotlight */}
      {position.targetRect && currentStepData.spotlight && (
        <div
          className={`fixed z-[9999] rounded-xl transition-all duration-500 pointer-events-none ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: position.targetRect.top - 8,
            left: position.targetRect.left - 8,
            width: position.targetRect.width + 16,
            height: position.targetRect.height + 16,
            boxShadow: `
              0 0 0 9999px rgba(0, 0, 0, 0.6),
              0 0 30px rgba(234, 179, 8, 0.4),
              inset 0 0 20px rgba(234, 179, 8, 0.1)
            `,
            border: "2px solid rgba(234, 179, 8, 0.6)",
          }}
        >
          {/* Pulse animation */}
          <div
            className="absolute inset-0 rounded-xl animate-pulse"
            style={{
              border: "2px solid rgba(234, 179, 8, 0.4)",
              animation: "pulse-ring 2s ease-out infinite",
            }}
          />
        </div>
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`fixed z-[10000] w-[380px] transition-all duration-500 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }`}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <div className="relative bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Header gradient */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600" />

          {/* Content */}
          <div className="p-5">
            {/* Step indicator and close button */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-slate-900" />
                </div>
                <span className="text-sm font-medium text-slate-400">
                  Paso {currentStep + 1} de {steps.length}
                </span>
              </div>
              <button
                onClick={skipTour}
                className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">
              {currentStepData.title}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              {currentStepData.description}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentStep
                      ? "w-6 h-2 bg-yellow-400"
                      : index < currentStep
                        ? "w-2 h-2 bg-yellow-400/50"
                        : "w-2 h-2 bg-slate-600"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>
              )}
              <Button
                onClick={isLastStep ? endTour : nextStep}
                className={`flex-1 font-semibold ${
                  isLastStep
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600"
                    : "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600"
                }`}
              >
                {isLastStep ? (
                  <>
                    Comenzar
                    <Sparkles className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip link */}
            {!isLastStep && (
              <button
                onClick={skipTour}
                className="w-full mt-3 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Omitir tour
              </button>
            )}
          </div>

          {/* Arrow */}
          <div style={getArrowStyles()} />
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
