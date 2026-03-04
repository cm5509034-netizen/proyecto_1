"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  ChevronRight,
  PenLine,
  Check,
  Brain,
  Zap,
  Star,
} from "lucide-react";

interface TutorOption {
  id: number;
  text: string;
}

interface TutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  analysis: string;
  options: TutorOption[];
  onSelectOption: (option: TutorOption) => void;
  onWriteOwn: () => void;
}

export function TutorModal({
  isOpen,
  onClose,
  currentLevel,
  analysis,
  options,
  onSelectOption,
  onWriteOwn,
}: TutorModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setShowContent(false);
      const animTimer = setTimeout(() => setIsAnimating(false), 1500);
      const contentTimer = setTimeout(() => setShowContent(true), 300);
      return () => {
        clearTimeout(animTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [isOpen]);

  const handleSelect = (option: TutorOption) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      onSelectOption(option);
      setSelectedOption(null);
    }, 400);
  };

  const levelIcons = [Brain, Zap, Star, Sparkles, Lightbulb];
  const LevelIcon = levelIcons[currentLevel - 1] || Sparkles;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-3xl border-0 shadow-2xl modal-enter">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header with enhanced gradient */}
        <div className="relative gold-gradient-animated p-8 pb-10">
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full float"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <div className="relative flex items-start gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <LevelIcon className="w-8 h-8 text-navy-900" />
              </div>
              {isAnimating && (
                <div className="absolute inset-0 rounded-2xl shimmer" />
              )}
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md -z-10" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-navy-900 flex items-center gap-3">
                Kopp - Tu Tutor de Análisis
                <Badge className="bg-navy-900/20 text-navy-900 border-none px-3 py-1 text-xs font-semibold tracking-wide">
                  IA
                </Badge>
              </DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-navy-800/80 text-sm">
                  Nivel {currentLevel} de 5
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        level <= currentLevel
                          ? "bg-navy-900 scale-110"
                          : "bg-navy-900/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-navy-800/70 text-xs mt-1">
                Opciones guiadas hacia Bloom superior
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-8 space-y-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Analysis section with enhanced card */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-800/30">
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Brain className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="pr-10">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Análisis Tutorial de Kopp</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {analysis}
                </p>
              </div>
            </div>
          </div>

          {/* Options section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <Lightbulb className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Opciones de Respuesta
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Selecciona la más apropiada o úsalas como inspiración
                </p>
              </div>
            </div>

            <div className="space-y-3 stagger-in">
              {options.map((option, index) => (
                <Card
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`group p-5 cursor-pointer transition-all duration-300 rounded-2xl border-2 card-hover-glow ${
                    selectedOption === option.id
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-xl shadow-yellow-500/20 scale-[1.02]"
                      : "border-gray-100 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        selectedOption === option.id
                          ? "gold-gradient text-navy-900 shadow-lg shadow-yellow-500/30 celebration"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 group-hover:text-yellow-700"
                      }`}
                    >
                      {selectedOption === option.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-lg">{option.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {option.text}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 transition-all duration-300 ${
                      selectedOption === option.id
                        ? "text-yellow-500 translate-x-1"
                        : "group-hover:text-yellow-400 group-hover:translate-x-1"
                    }`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced guide section */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/30 dark:bg-amber-700/20 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                  Guía Tutorial de Kopp
                  <Star className="w-3 h-3 text-amber-500" />
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-300/80 mt-1.5 leading-relaxed">
                  En el siguiente paso, busca entender qué procesos podrías implementar para prevenir este tipo de situaciones en el futuro...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced footer */}
        <div className="flex items-center justify-between px-8 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
          <Button variant="ghost" onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Cancelar
          </Button>
          <Button
            onClick={onWriteOwn}
            className="gold-gradient text-navy-900 font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 rounded-xl px-6"
          >
            <PenLine className="w-4 h-4 mr-2" />
            Escribir mi propia respuesta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
