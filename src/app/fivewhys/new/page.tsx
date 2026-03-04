"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { WhyCard } from "@/components/fivewhys/WhyCard";
import { TutorModal } from "@/components/fivewhys/TutorModal";
import { ActionPlanModal } from "@/components/fivewhys/ActionPlanModal";
import { EvaluationPanel } from "@/components/fivewhys/EvaluationPanel";
import { ProgressStepper } from "@/components/fivewhys/ProgressStepper";
import { NotificationsPanel } from "@/components/fivewhys/NotificationsPanel";
import { RootCauseSection } from "@/components/fivewhys/RootCauseSection";
import { ActionPlanSection } from "@/components/fivewhys/ActionPlanSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-states";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Sparkles,
  Target,
  Lightbulb,
  Save,
  Bell,
} from "lucide-react";

const mockTutorOptions = [
  {
    id: 1,
    text: "Porque el cliente no pudo consignar y nadie le avisó de otra opción, y además no había un plan B para esas situaciones.",
  },
  {
    id: 2,
    text: "Porque los bancos cayeron y no había cómo avisar al cliente ni un protocolo para manejar pagos en efectivo.",
  },
  {
    id: 3,
    text: "Porque no hubo aviso de las plataformas caídas y no se planificó cómo manejar cobros alternativos en ruta.",
  },
];

const mockSuggestedActions = [
  {
    id: 1,
    title: "Crear un protocolo de cobro alternativo en caso de fallos",
    description: "Establece pasos claros para actuar cuando los bancos fallen",
    priority: "ALTA" as const,
    estimatedDays: 7,
  },
  {
    id: 2,
    title: "Capacitar a los empleados sobre el nuevo protocolo alternativo",
    description: "Asegura que todos sepan cómo actuar en caso de fallos",
    priority: "ALTA" as const,
    estimatedDays: 10,
  },
  {
    id: 3,
    title: "Implementar un sistema de alerta para fallos bancarios",
    description: "Prevé problemas futuros avisando a tiempo de los fallos",
    priority: "MEDIA" as const,
    estimatedDays: 15,
  },
];

const mockPlanActions = [
  {
    id: 1,
    title: "Crear un protocolo de cobro alternativo en caso de fallos",
    status: "PENDIENTE" as const,
    priority: "ALTA" as const,
    responsible: "Gerson Vanegas",
    dueDate: "6 de mar de 2026",
  },
];

export default function FiveWhysNewPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [whyAnswers, setWhyAnswers] = useState<string[]>(["", "", "", "", ""]);
  const [currentWhy, setCurrentWhy] = useState(1);
  const [completedWhys, setCompletedWhys] = useState<number[]>([]);
  const [showTutor, setShowTutor] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [activeTutorWhy, setActiveTutorWhy] = useState(1);
  const [showNotifications, setShowNotifications] = useState(true);

  // Mock evaluations
  const evaluations = [
    {
      level: "ANALIZAR",
      score: 3.0,
      maxScore: 4.0,
      feedback:
        "La respuesta identifica dos fallos: la falta de aviso sobre la caída de las plataformas y la falta de planificación para cobros alternativos. Sin embargo, no profundiza en las causas o fallas sistémicas más allá de estos dos puntos.",
    },
    null,
    null,
    null,
    null,
  ];

  const handleWhyChange = (index: number, value: string) => {
    const newAnswers = [...whyAnswers];
    newAnswers[index] = value;
    setWhyAnswers(newAnswers);
  };

  const handleRequestTutor = (whyNumber: number) => {
    setActiveTutorWhy(whyNumber);
    setShowTutor(true);
  };

  const handleSelectOption = (option: { id: number; text: string }) => {
    const newAnswers = [...whyAnswers];
    newAnswers[activeTutorWhy - 1] = option.text;
    setWhyAnswers(newAnswers);

    if (!completedWhys.includes(activeTutorWhy)) {
      setCompletedWhys([...completedWhys, activeTutorWhy]);
    }
    if (activeTutorWhy < 5) {
      setCurrentWhy(activeTutorWhy + 1);
    }
    setShowTutor(false);
  };

  const hasAnalysis = completedWhys.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Sidebar />

      <main className="pl-72 transition-all duration-300">
        <Header
          title="Nuevo Análisis de Causa Raíz"
          subtitle="Metodología 5 Porqués con asistencia de Kopp IA"
        />

        <div className="p-8">
          {/* Bloom requirements banner */}
          <Card data-tour="bloom-requirements" className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Requisitos de Nivel Bloom
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Niveles 1-2: Mínimo{" "}
                    <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
                      APLICAR (2.0+ pts)
                    </Badge>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Nivel 3: Mínimo{" "}
                    <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">
                      ANALIZAR (2.5+ pts)
                    </Badge>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Niveles 4-5: Mínimo{" "}
                    <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700">
                      EVALUAR (3.0+ pts)
                    </Badge>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                No podrás avanzar hasta que todas las respuestas alcancen el nivel Bloom requerido
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-4 gap-6">
            {/* Left Column - Form */}
            <div className="col-span-2 space-y-6">
              {/* Problem Definition */}
              <Card data-tour="problem-definition" className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                    <FileText className="w-5 h-5 text-navy-900" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      Definición del Problema
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Describe claramente el problema a analizar
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Título del Problema *
                    </label>
                    <Input
                      value={problemTitle}
                      onChange={(e) => setProblemTitle(e.target.value)}
                      placeholder="Ej: Retraso en entregas de producto"
                      className="border-gray-200 dark:border-gray-700 focus:border-yellow-400 focus:ring-yellow-100 dark:focus:ring-yellow-900/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Descripción del Problema *
                    </label>
                    <Textarea
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      placeholder="Describe detalladamente qué está sucediendo..."
                      className="min-h-[100px] border-gray-200 dark:border-gray-700 focus:border-yellow-400 focus:ring-yellow-100 dark:focus:ring-yellow-900/30"
                    />
                  </div>
                </div>
              </Card>

              {/* Progress Stepper */}
              <Card data-tour="progress" className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Progreso del Análisis</h3>
                  <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">
                    {completedWhys.length}/5 completados
                  </Badge>
                </div>
                <ProgressStepper
                  currentStep={currentWhy}
                  totalSteps={5}
                  completedSteps={completedWhys}
                />
              </Card>

              {/* Why Cards */}
              <div className="space-y-4">
                {whyAnswers.map((answer, index) => (
                  <WhyCard
                    key={index}
                    number={index + 1}
                    value={answer}
                    onChange={(value) => handleWhyChange(index, value)}
                    evaluation={evaluations[index] || undefined}
                    isActive={currentWhy === index + 1}
                    isCompleted={completedWhys.includes(index + 1)}
                    onRequestTutor={() => handleRequestTutor(index + 1)}
                  />
                ))}
              </div>

              {/* Root Cause Section */}
              <RootCauseSection
                rootCause="No hay protocolo para cobros alternativos en caso de fallos."
                isVisible={hasAnalysis}
              />

              {/* Action Plan Section - Always visible for drag & drop demo */}
              <ActionPlanSection
                onAddAction={() => setShowActionPlan(true)}
                onReorderActions={(reorderedActions) => {
                  console.log("Acciones reordenadas:", reorderedActions);
                }}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  Guardar Borrador
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowActionPlan(true)}
                    className="border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    disabled={!hasAnalysis}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Sugerencias de Plan
                  </Button>
                  <Button
                    className="gold-gradient text-navy-900 font-semibold shadow-lg shadow-yellow-500/25"
                    disabled={completedWhys.length < 2}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar y Evaluar
                  </Button>
                </div>
              </div>
            </div>

            {/* Middle Column - Evaluation */}
            <div className="space-y-6">
              {hasAnalysis ? (
                <EvaluationPanel
                  bloomLevel={3.0}
                  bloomLabel="ANALIZAR"
                  planningQuality={2.5}
                  planningLabel="Coherente y contextual"
                  viabilityScore={3.0}
                  viabilityLabel="Viable"
                  rootCause="No hay protocolo para cobros alternativos en caso de fallos."
                />
              ) : (
                <Card className="p-4 bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-200 dark:border-gray-700">
                  <EmptyState
                    type="evaluation-pending"
                    title="Evaluación Pendiente"
                    description="Completa al menos los primeros 2 porqués para ver la evaluación de Kopp IA."
                  />
                </Card>
              )}

              {/* Tips Card */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Consejos de Kopp
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        Sé específico en cada respuesta
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        Evita respuestas genéricas
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        Busca causas sistémicas, no personas
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        Cada "por qué" debe profundizar más
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Notifications */}
            <div className="space-y-6">
              <NotificationsPanel />
            </div>
          </div>
        </div>
      </main>

      {/* Tutor Modal */}
      <TutorModal
        isOpen={showTutor}
        onClose={() => setShowTutor(false)}
        currentLevel={activeTutorWhy}
        analysis="Estas opciones son más profundas porque conectan diferentes aspectos del problema: la falta de aviso al cliente, la ausencia de un plan alternativo, y la inexistencia de un protocolo para manejar situaciones imprevistas, mostrando cómo estas fallas se entrelazan y generan el desvío en el indicador."
        options={mockTutorOptions}
        onSelectOption={handleSelectOption}
        onWriteOwn={() => setShowTutor(false)}
      />

      {/* Action Plan Modal */}
      <ActionPlanModal
        isOpen={showActionPlan}
        onClose={() => setShowActionPlan(false)}
        analysis="Estas acciones juntas crean un plan claro para manejar fallos bancarios y aseguran que todos estén preparados y alertados para evitar cobros en efectivo no planificados."
        actions={mockSuggestedActions}
        onAddAction={(action) => console.log("Added:", action)}
        onAddAllActions={() => console.log("Added all")}
      />
    </div>
  );
}
