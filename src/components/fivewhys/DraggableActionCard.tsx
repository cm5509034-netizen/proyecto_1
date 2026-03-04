"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  User,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

interface Action {
  id: number;
  title: string;
  status: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
  priority: "ALTA" | "MEDIA" | "BAJA";
  responsible: string;
  dueDate: string;
}

interface DraggableActionCardProps {
  action: Action;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onEdit?: (action: Action) => void;
  onDelete?: (actionId: number) => void;
  onView?: (action: Action) => void;
}

export function DraggableActionCard({
  action,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onEdit,
  onDelete,
  onView,
}: DraggableActionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusStyle = (status: Action["status"]) => {
    switch (status) {
      case "PENDIENTE":
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
      case "EN_PROGRESO":
        return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600";
      case "COMPLETADA":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600";
    }
  };

  const getPriorityStyle = (priority: Action["priority"]) => {
    switch (priority) {
      case "ALTA":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600";
      case "MEDIA":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600";
      case "BAJA":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600";
    }
  };

  const getStatusEmoji = (status: Action["status"]) => {
    switch (status) {
      case "PENDIENTE":
        return "⏳";
      case "EN_PROGRESO":
        return "🔄";
      case "COMPLETADA":
        return "✓";
    }
  };

  const getPriorityEmoji = (priority: Action["priority"]) => {
    switch (priority) {
      case "ALTA":
        return "🔥";
      case "MEDIA":
        return "⚡";
      case "BAJA":
        return "📌";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group p-4 rounded-xl border transition-all duration-200 ${
        isDragging
          ? "border-yellow-400 shadow-xl bg-yellow-50 dark:bg-yellow-900/20 scale-[1.02] z-50 ring-2 ring-yellow-400/50"
          : isHovered
          ? "border-yellow-300 dark:border-yellow-700 shadow-md bg-yellow-50/30 dark:bg-yellow-900/10"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className={`flex-shrink-0 p-1.5 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 ${
            isDragging
              ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300"
              : isHovered
              ? "bg-gray-100 dark:bg-gray-700 text-gray-500"
              : "bg-transparent text-gray-300 group-hover:text-gray-500"
          }`}
          aria-label="Arrastrar para reordenar"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusStyle(action.status)}`}
            >
              {getStatusEmoji(action.status)}
              <span className="ml-1">{action.status.replace("_", " ")}</span>
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs ${getPriorityStyle(action.priority)}`}
            >
              {getPriorityEmoji(action.priority)}
              <span className="ml-1">{action.priority}</span>
            </Badge>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {action.title}
          </h4>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {action.responsible}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Vence: {action.dueDate}
            </span>
          </div>
        </div>

        {/* Actions menu */}
        <div
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            isHovered && !isDragging ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => onView?.(action)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => onEdit?.(action)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => onDelete?.(action.id)}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Drag indicator line */}
      {isDragging && (
        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-full" />
      )}
    </div>
  );
}
