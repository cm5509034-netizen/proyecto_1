"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Plus,
  Check,
  Clock,
  AlertTriangle,
  Target,
  X,
  Calendar,
} from "lucide-react";

interface SuggestedAction {
  id: number;
  title: string;
  description: string;
  priority: "ALTA" | "MEDIA" | "BAJA";
  estimatedDays: number;
}

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  actions: SuggestedAction[];
  onAddAction: (action: SuggestedAction) => void;
  onAddAllActions: () => void;
}

export function ActionPlanModal({
  isOpen,
  onClose,
  analysis,
  actions,
  onAddAction,
  onAddAllActions,
}: ActionPlanModalProps) {
  const [addedActions, setAddedActions] = useState<number[]>([]);
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  const handleAddAction = (action: SuggestedAction) => {
    if (!addedActions.includes(action.id)) {
      setAddedActions([...addedActions, action.id]);
      onAddAction(action);
    }
  };

  const getPriorityStyle = (priority: string) => {
    const styles: Record<string, { badge: string; icon: React.ReactNode }> = {
      ALTA: {
        badge: "bg-red-100 text-red-700 border-red-200",
        icon: <AlertTriangle className="w-3 h-3" />,
      },
      MEDIA: {
        badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: <Target className="w-3 h-3" />,
      },
      BAJA: {
        badge: "bg-green-100 text-green-700 border-green-200",
        icon: <Clock className="w-3 h-3" />,
      },
    };
    return styles[priority] || styles.MEDIA;
  };

  const progress = (addedActions.length / actions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white rounded-2xl">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 gold-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAyMGMtNC40MTggMC04LTMuNTgyLTgtOHMzLjU4Mi04IDgtOCA4IDMuNTgyIDggOC0zLjU4MiA4LTggOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl font-bold text-navy-900">
                  Sugerencias de Plan de Acción
                </DialogTitle>
                <p className="text-navy-800/70 text-sm mt-1">
                  Kopp analizó tu problema y causa raíz
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-navy-900" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-navy-800/70 mb-2">
                <span>Progreso de adopción</span>
                <span>{addedActions.length}/{actions.length} acciones agregadas</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/30" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Analysis */}
          <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Análisis del Plan
              </h3>
              <p className="text-sm text-gray-600 mt-1">{analysis}</p>
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Acciones Sugeridas ({actions.length})
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Puedes agregar las acciones individualmente o todas a la vez.
                </p>
              </div>
              <Button
                onClick={onAddAllActions}
                size="sm"
                className="gold-gradient text-navy-900 font-semibold"
                disabled={addedActions.length === actions.length}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Todas
              </Button>
            </div>

            <div className="space-y-3">
              {actions.map((action, index) => {
                const isAdded = addedActions.includes(action.id);
                const isHovered = hoveredAction === action.id;
                const priorityStyle = getPriorityStyle(action.priority);

                return (
                  <Card
                    key={action.id}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                    className={`p-4 transition-all duration-200 ${
                      isAdded
                        ? "bg-green-50 border-green-200"
                        : isHovered
                        ? "border-yellow-300 shadow-md"
                        : "border-gray-100"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isAdded
                            ? "bg-green-500 text-white"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge
                            variant="outline"
                            className={priorityStyle.badge}
                          >
                            {priorityStyle.icon}
                            <span className="ml-1">{action.priority}</span>
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50">
                            <Calendar className="w-3 h-3 mr-1" />
                            {action.estimatedDays} días
                          </Badge>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={isAdded ? "ghost" : "default"}
                        onClick={() => handleAddAction(action)}
                        disabled={isAdded}
                        className={
                          isAdded
                            ? "text-green-600"
                            : "gold-gradient text-navy-900"
                        }
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Agregada
                          </>
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-yellow-300 text-yellow-700">
              + Agregar Acción Manual
            </Button>
            <Button
              className="gold-gradient text-navy-900 font-semibold"
              disabled={addedActions.length === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              Guardar y Evaluar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
