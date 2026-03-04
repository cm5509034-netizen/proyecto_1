"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Target, TrendingUp, CheckCircle2, Award, Zap } from "lucide-react";

interface GaugeProps {
  value: number;
  maxValue: number;
  label: string;
  sublabel: string;
  color: string;
  icon: React.ReactNode;
}

function Gauge({ value, maxValue, label, sublabel, color, icon }: GaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const percentage = (animatedValue / maxValue) * 100;
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
      if (value >= maxValue * 0.7) {
        setShowGlow(true);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [value, maxValue]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { stroke: string; text: string; bg: string; glow: string; gradient: string }> = {
      gold: {
        stroke: "stroke-yellow-500",
        text: "text-yellow-600 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        glow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]",
        gradient: "from-yellow-400 to-orange-500",
      },
      green: {
        stroke: "stroke-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
        glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
        gradient: "from-emerald-400 to-teal-500",
      },
      blue: {
        stroke: "stroke-blue-500",
        text: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
        gradient: "from-blue-400 to-indigo-500",
      },
    };
    return colors[color] || colors.gold;
  };

  const colorClasses = getColorClasses(color);
  const isHighScore = value >= maxValue * 0.7;

  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-500 ${colorClasses.bg} ${showGlow ? 'scale-105' : ''}`}>
      <div className="relative w-24 h-24">
        {/* Background glow */}
        {isHighScore && (
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorClasses.gradient} opacity-20 blur-xl`} />
        )}

        <svg className={`w-full h-full -rotate-90 ${showGlow ? colorClasses.glow : ''}`} viewBox="0 0 100 100">
          {/* Background circle with subtle pattern */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={`${colorClasses.stroke} gauge-fill`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
          {/* Inner decorative circle */}
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            strokeWidth="1"
            className="stroke-gray-100 dark:stroke-gray-800"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${colorClasses.text}`}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">/{maxValue}</span>
        </div>

        {/* Icon badge */}
        <div className={`absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-br ${colorClasses.gradient} flex items-center justify-center shadow-lg ${isHighScore ? 'bounce-in' : ''}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{label}</p>
        <p className={`text-xs font-bold mt-0.5 ${colorClasses.text}`}>{sublabel}</p>
      </div>
    </div>
  );
}

interface EvaluationPanelProps {
  bloomLevel: number;
  bloomLabel: string;
  planningQuality: number;
  planningLabel: string;
  viabilityScore: number;
  viabilityLabel: string;
  rootCause: string;
}

export function EvaluationPanel({
  bloomLevel,
  bloomLabel,
  planningQuality,
  planningLabel,
  viabilityScore,
  viabilityLabel,
  rootCause,
}: EvaluationPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const overallScore = ((bloomLevel + planningQuality + viabilityScore) / 12) * 100;
  const isExcellent = overallScore >= 70;

  return (
    <Card className={`p-6 bg-gradient-to-br from-white to-yellow-50/50 dark:from-gray-900 dark:to-yellow-900/10 border-yellow-100 dark:border-yellow-900/30 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/20 dark:bg-yellow-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/20 dark:bg-orange-700/10 rounded-full blur-2xl" />

      {/* Root Cause - Enhanced */}
      <div className="relative mb-6 p-5 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-800/30 overflow-hidden">
        {/* Animated accent */}
        <div className="absolute top-0 left-0 w-1 h-full gold-gradient-animated" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/25">
            <Target className="w-6 h-6 text-navy-900" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Causa Raíz Principal</h3>
              {isExcellent && <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{rootCause}</p>
          </div>
        </div>
      </div>

      {/* Header with overall score */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Evaluación Kopp</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Análisis con IA</p>
          </div>
        </div>

        {/* Overall score badge */}
        <div className={`px-4 py-2 rounded-xl ${isExcellent ? 'gold-gradient shadow-lg shadow-yellow-500/30' : 'bg-gray-100 dark:bg-gray-800'} transition-all duration-500`}>
          <span className={`text-lg font-bold ${isExcellent ? 'text-navy-900' : 'text-gray-600 dark:text-gray-300'}`}>
            {Math.round(overallScore)}%
          </span>
        </div>
      </div>

      {/* Gauges */}
      <div className="relative grid grid-cols-3 gap-3">
        <Gauge
          value={bloomLevel}
          maxValue={4}
          label="Nivel Bloom"
          sublabel={bloomLabel}
          color="gold"
          icon={<Zap className="w-3.5 h-3.5 text-white" />}
        />
        <Gauge
          value={planningQuality}
          maxValue={4}
          label="Planteamiento"
          sublabel={planningLabel}
          color="green"
          icon={<TrendingUp className="w-3.5 h-3.5 text-white" />}
        />
        <Gauge
          value={viabilityScore}
          maxValue={4}
          label="Viabilidad"
          sublabel={viabilityLabel}
          color="blue"
          icon={<CheckCircle2 className="w-3.5 h-3.5 text-white" />}
        />
      </div>

      {/* Legend - Enhanced */}
      <div className="relative mt-6 pt-4 border-t border-yellow-100 dark:border-yellow-900/30">
        <div className="grid grid-cols-3 gap-3 text-[10px] text-gray-500 dark:text-gray-400">
          <div className="flex flex-col gap-1">
            <div className="w-4 h-1 rounded gold-gradient" />
            <p>Identifica el problema raíz</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-4 h-1 rounded bg-gradient-to-r from-emerald-400 to-teal-500" />
            <p>Plan ataca la raíz directamente</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-4 h-1 rounded bg-gradient-to-r from-blue-400 to-indigo-500" />
            <p>Alta probabilidad de éxito</p>
          </div>
        </div>
      </div>

      {/* Excellence badge */}
      {isExcellent && (
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-green-700 dark:text-green-300">Excelente análisis</p>
            <p className="text-[10px] text-green-600 dark:text-green-400">Tu análisis cumple con los estándares de calidad</p>
          </div>
        </div>
      )}
    </Card>
  );
}
