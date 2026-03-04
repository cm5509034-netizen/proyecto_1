"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Check,
  AlertCircle,
  RefreshCw,
  Lightbulb,
  TrendingUp,
  Award,
} from "lucide-react";

interface WhyCardProps {
  number: number;
  value: string;
  onChange: (value: string) => void;
  evaluation?: {
    level: string;
    score: number;
    maxScore: number;
    feedback: string;
  };
  isActive: boolean;
  isCompleted: boolean;
  onRequestTutor: () => void;
}

export function WhyCard({
  number,
  value,
  onChange,
  evaluation,
  isActive,
  isCompleted,
  onRequestTutor,
}: WhyCardProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Animation when card is completed
  useEffect(() => {
    if (isCompleted && !justCompleted) {
      setJustCompleted(true);
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, justCompleted]);

  const getLevelColor = (level: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      RECORDAR: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300", border: "border-gray-300 dark:border-gray-600", glow: "" },
      COMPRENDER: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-300 dark:border-blue-600", glow: "shadow-blue-500/20" },
      APLICAR: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-300 dark:border-green-600", glow: "shadow-green-500/20" },
      ANALIZAR: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-300 dark:border-yellow-600", glow: "shadow-yellow-500/20" },
      EVALUAR: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-300 dark:border-orange-600", glow: "shadow-orange-500/20" },
      CREAR: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-300 dark:border-purple-600", glow: "shadow-purple-500/20" },
    };
    return colors[level] || colors.RECORDAR;
  };

  const confettiColors = ["#fde047", "#eab308", "#22c55e", "#3b82f6", "#f97316"];

  return (
    <div data-tour={`why-card-${number}`} className={`relative why-connector ${number === 5 ? "last-why" : ""}`}>
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 30}%`,
                backgroundColor: confettiColors[i % confettiColors.length],
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card
        className={`relative p-7 transition-all duration-500 rounded-2xl overflow-hidden ${
          isActive
            ? "ring-2 ring-yellow-400 shadow-xl shadow-yellow-500/15 bg-white dark:bg-gray-900 focus-ring-animated"
            : isCompleted
            ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg shadow-green-500/10"
            : "bg-white dark:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 card-hover-glow"
        }`}
      >
        {/* Gradient background for active state */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-transparent to-orange-50/30 dark:from-yellow-900/10 dark:to-orange-900/10 pointer-events-none" />
        )}

        <div className="relative flex items-start gap-5">
          {/* Number indicator with enhanced styling */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-500 ${
              isCompleted
                ? "gold-gradient text-navy-900 shadow-xl shadow-yellow-500/30 celebration"
                : isActive
                ? "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-700 dark:text-yellow-300 ring-4 ring-yellow-100 dark:ring-yellow-900/50 pulse-gold"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }`}
          >
            {isCompleted ? (
              <Check className="w-7 h-7" />
            ) : (
              <span>{number}</span>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {/* Label with badge */}
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-gray-800 dark:text-gray-100">
                ¿Por qué {number}?
                {(number <= 2 || isActive) && <span className="text-red-500 ml-1">*</span>}
              </label>
              {evaluation && (
                <Badge
                  variant="outline"
                  className={`${getLevelColor(evaluation.level).bg} ${getLevelColor(evaluation.level).text} ${getLevelColor(evaluation.level).border} font-semibold px-3 py-1 shadow-md ${getLevelColor(evaluation.level).glow} transition-all duration-300 bounce-in`}
                >
                  <Award className="w-3 h-3 mr-1.5" />
                  {evaluation.level} ({evaluation.score}/{evaluation.maxScore})
                </Badge>
              )}
            </div>

            {/* Enhanced Textarea */}
            <div className="relative group">
              <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={`Explica por qué ocurrió... (Por qué ${number})`}
                className={`min-h-[120px] resize-none transition-all duration-300 text-base rounded-xl border-2 p-4 ${
                  isFocused
                    ? "border-yellow-400 ring-4 ring-yellow-100/50 dark:ring-yellow-900/30 shadow-lg shadow-yellow-500/10"
                    : "border-gray-200 dark:border-gray-700 group-hover:border-yellow-200 dark:group-hover:border-yellow-700"
                } ${isCompleted ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800" : "bg-white dark:bg-gray-900"}`}
              />
              {value.length > 0 && (
                <span className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-900/80 px-2 py-0.5 rounded-full">
                  {value.length} caracteres
                </span>
              )}
            </div>

            {/* Enhanced evaluation feedback */}
            {evaluation && (
              <div
                className={`p-5 rounded-2xl border-2 transition-all duration-500 slide-in-right ${
                  evaluation.score >= evaluation.maxScore * 0.7
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg shadow-green-500/10"
                    : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-500/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    evaluation.score >= evaluation.maxScore * 0.7
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/25"
                      : "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25"
                  }`}>
                    {evaluation.score >= evaluation.maxScore * 0.7 ? (
                      <TrendingUp className="w-5 h-5 text-white" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      Nivel Bloom: {evaluation.level}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        ({evaluation.score}/{evaluation.maxScore} pts)
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{evaluation.feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                data-tour={number === 1 ? "tutor-button" : undefined}
                variant="outline"
                size="sm"
                onClick={onRequestTutor}
                className="text-yellow-700 dark:text-yellow-300 border-2 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 rounded-xl px-4 py-2"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Pedir Opciones al Tutor
              </Button>
              {evaluation && (
                <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-xl">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-evaluar
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
