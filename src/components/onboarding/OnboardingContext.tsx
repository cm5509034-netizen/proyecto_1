"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface TourStep {
  id: string;
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  spotlight?: boolean;
}

interface OnboardingContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  skipTour: () => void;
  hasSeenTour: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    target: "[data-tour='sidebar']",
    title: "Bienvenido a Kopp",
    description:
      "Esta es tu barra de navegación principal. Aquí encontrarás acceso rápido a todas las herramientas de análisis de causa raíz.",
    position: "right",
    spotlight: true,
  },
  {
    id: "problem-definition",
    target: "[data-tour='problem-definition']",
    title: "Define tu Problema",
    description:
      "Comienza describiendo claramente el problema que deseas analizar. Un buen título y descripción son clave para un análisis efectivo.",
    position: "right",
    spotlight: true,
  },
  {
    id: "progress",
    target: "[data-tour='progress']",
    title: "Progreso del Análisis",
    description:
      "Aquí puedes ver tu avance en los 5 porqués. Cada paso completado te acerca más a la causa raíz.",
    position: "bottom",
    spotlight: true,
  },
  {
    id: "why-cards",
    target: "[data-tour='why-card-1']",
    title: "Los 5 Porqués",
    description:
      "Responde cada 'Por qué' para profundizar en las causas del problema. Kopp IA evaluará tus respuestas según la taxonomía de Bloom.",
    position: "right",
    spotlight: true,
  },
  {
    id: "tutor",
    target: "[data-tour='tutor-button']",
    title: "Asistente de Kopp IA",
    description:
      "¿Necesitas ayuda? Pide opciones al Tutor y recibirás sugerencias inteligentes para mejorar tus respuestas.",
    position: "top",
    spotlight: true,
  },
  {
    id: "bloom-requirements",
    target: "[data-tour='bloom-requirements']",
    title: "Requisitos de Bloom",
    description:
      "Tus respuestas deben alcanzar ciertos niveles cognitivos. Aquí puedes ver los requisitos mínimos para cada porqué.",
    position: "bottom",
    spotlight: true,
  },
  {
    id: "notifications",
    target: "[data-tour='notifications']",
    title: "Centro de Notificaciones",
    description:
      "Mantente al día con las acciones pendientes, vencidas y próximas. Filtra por tipo para encontrar lo que necesitas.",
    position: "left",
    spotlight: true,
  },
  {
    id: "action-plan",
    target: "[data-tour='action-plan']",
    title: "Plan de Acción",
    description:
      "Una vez identificada la causa raíz, crea y prioriza acciones. Puedes arrastrar y soltar para cambiar prioridades.",
    position: "top",
    spotlight: true,
  },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem("kopp-onboarding-seen");
    if (!seen) {
      setHasSeenTour(false);
      // Auto-start tour after a short delay for first-time users
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const endTour = () => {
    setIsActive(false);
    setHasSeenTour(true);
    localStorage.setItem("kopp-onboarding-seen", "true");
  };

  const skipTour = () => {
    endTour();
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < TOUR_STEPS.length) {
      setCurrentStep(step);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isActive,
        currentStep,
        steps: TOUR_STEPS,
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
        skipTour,
        hasSeenTour,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
