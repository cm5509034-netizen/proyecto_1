"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-states";
import { DraggableActionCard } from "./DraggableActionCard";
import {
  Plus,
  GripVertical,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

interface Action {
  id: number;
  title: string;
  status: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
  priority: "ALTA" | "MEDIA" | "BAJA";
  responsible: string;
  dueDate: string;
}

interface ActionPlanSectionProps {
  actions?: Action[];
  onAddAction: () => void;
  onEditAction?: (action: Action) => void;
  onDeleteAction?: (actionId: number) => void;
  onReorderActions?: (actions: Action[]) => void;
}

const defaultActions: Action[] = [
  {
    id: 1,
    title: "Crear un protocolo de cobro alternativo en caso de fallos",
    status: "PENDIENTE",
    priority: "ALTA",
    responsible: "Gerson Vanegas",
    dueDate: "6 de mar de 2026",
  },
  {
    id: 2,
    title: "Capacitar a los empleados sobre el nuevo protocolo alternativo",
    status: "EN_PROGRESO",
    priority: "ALTA",
    responsible: "María López",
    dueDate: "12 de mar de 2026",
  },
  {
    id: 3,
    title: "Implementar un sistema de alerta para fallos bancarios",
    status: "PENDIENTE",
    priority: "MEDIA",
    responsible: "Carlos Ruiz",
    dueDate: "20 de mar de 2026",
  },
];

export function ActionPlanSection({
  actions: initialActions = defaultActions,
  onAddAction,
  onEditAction,
  onDeleteAction,
  onReorderActions,
}: ActionPlanSectionProps) {
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hasReordered, setHasReordered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Notify parent of reorder
        onReorderActions?.(newItems);
        setHasReordered(true);

        return newItems;
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeAction = activeId ? actions.find((a) => a.id === activeId) : null;

  return (
    <Card data-tour="action-plan" className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">
            Plan de Acción ({actions.length})
          </h3>
          {hasReordered && (
            <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Prioridad actualizada
            </Badge>
          )}
        </div>
        <Button
          onClick={onAddAction}
          size="sm"
          className="gold-gradient text-navy-900 font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-4 h-4 mr-1" />
          Nueva Acción
        </Button>
      </div>

      {/* Drag hint */}
      {actions.length > 1 && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <ArrowUpDown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-amber-700 dark:text-amber-300">
            Arrastra las acciones para cambiar su prioridad
          </span>
        </div>
      )}

      {/* Actions List with DnD */}
      {isMounted ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={actions.map((a) => a.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {actions.map((action, index) => (
                <div key={action.id} className="relative">
                  {/* Priority number indicator */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-xs font-bold text-navy-900 shadow-md z-10">
                    {index + 1}
                  </div>

                  <div className="ml-4">
                    <DraggableActionCard
                      action={action}
                      isHovered={hoveredAction === action.id}
                      onMouseEnter={() => setHoveredAction(action.id)}
                      onMouseLeave={() => setHoveredAction(null)}
                      onEdit={onEditAction}
                      onDelete={onDeleteAction}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeAction && (
              <div className="p-4 rounded-xl border-2 border-yellow-400 shadow-2xl bg-white dark:bg-gray-800 opacity-95 scale-105">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {activeAction.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Suelta para cambiar la prioridad
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      ) : (
        /* Server-side fallback without DnD */
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div key={action.id} className="relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-xs font-bold text-navy-900 shadow-md z-10">
                {index + 1}
              </div>
              <div className="ml-4">
                <DraggableActionCard
                  action={action}
                  isHovered={false}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  onEdit={onEditAction}
                  onDelete={onDeleteAction}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {actions.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <EmptyState
            type="no-actions"
            title="Sin acciones definidas"
            description="Completa el análisis de los 5 porqués y agrega acciones para resolver la causa raíz."
            actionLabel="Agregar primera acción"
            onAction={onAddAction}
          />
        </div>
      )}
    </Card>
  );
}
