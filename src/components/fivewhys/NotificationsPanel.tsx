"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-states";
import {
  Bell,
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";

interface Notification {
  id: number;
  type: "kopp" | "overdue" | "upcoming" | "completed";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

type FilterType = "all" | "kopp" | "overdue" | "upcoming" | "completed";
type ReadFilter = "all" | "unread" | "read";

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "kopp",
    title: "Kopp",
    description: "Se te han asignado 1 nuevas acciones desde las sugerencias de Kopp.",
    time: "Hace alrededor de 5 horas",
    read: false,
  },
  {
    id: 2,
    type: "overdue",
    title: "Acción VENCIDA",
    description: 'Tu acción "Configurar alerta diaria para rechazos pendientes" venció hace 96...',
    time: "Hace 1 día",
    read: false,
  },
  {
    id: 3,
    type: "overdue",
    title: "Acción VENCIDA",
    description: 'Tu acción "Crear un calendario de tareas con tiempos de adaptación" venció hac...',
    time: "Hace 1 día",
    read: false,
  },
  {
    id: 4,
    type: "upcoming",
    title: "Acción Vence en 1 Día",
    description: 'Tu acción "Reforzar estándar en charla de 5 minutos (seguridad y calidad)" está...',
    time: "Hace 1 día",
    read: false,
  },
  {
    id: 5,
    type: "completed",
    title: "Acción Completada",
    description: 'Tu acción "Revisar protocolo de seguridad" fue completada exitosamente.',
    time: "Hace 2 días",
    read: true,
  },
  {
    id: 6,
    type: "overdue",
    title: "Acción VENCIDA",
    description: 'Tu acción "Crear un calendario de tareas con tiempos de adaptación" venció hac...',
    time: "Hace 1 día",
    read: true,
  },
];

const filterOptions: { value: FilterType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "all", label: "Todas", icon: <Bell className="w-3 h-3" />, color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
  { value: "kopp", label: "Kopp", icon: <Sparkles className="w-3 h-3" />, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" },
  { value: "overdue", label: "Vencidas", icon: <AlertCircle className="w-3 h-3" />, color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  { value: "upcoming", label: "Próximas", icon: <Clock className="w-3 h-3" />, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
  { value: "completed", label: "Completadas", icon: <CheckCircle className="w-3 h-3" />, color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter notifications based on active filters
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesType = activeFilter === "all" || n.type === activeFilter;
      const matchesRead =
        readFilter === "all" ||
        (readFilter === "unread" && !n.read) ||
        (readFilter === "read" && n.read);
      return matchesType && matchesRead;
    });
  }, [notifications, activeFilter, readFilter]);

  // Count notifications by type
  const countByType = useMemo(() => {
    return {
      all: notifications.length,
      kopp: notifications.filter((n) => n.type === "kopp").length,
      overdue: notifications.filter((n) => n.type === "overdue").length,
      upcoming: notifications.filter((n) => n.type === "upcoming").length,
      completed: notifications.filter((n) => n.type === "completed").length,
    };
  }, [notifications]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "kopp":
        return <Sparkles className="w-4 h-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "upcoming":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getNotificationDot = (type: Notification["type"]) => {
    switch (type) {
      case "kopp":
        return "bg-yellow-500";
      case "overdue":
        return "bg-red-500";
      case "upcoming":
        return "bg-orange-500";
      case "completed":
        return "bg-green-500";
    }
  };

  return (
    <Card data-tour="notifications" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Notificaciones
          </h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="text-xs text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-medium"
          >
            Marcar todas leídas
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Filter Buttons */}
          <div className="mb-3 space-y-2">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-1.5">
              {filterOptions.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeFilter === filter.value
                      ? `${filter.color} ring-2 ring-offset-1 ring-gray-300 dark:ring-gray-600 shadow-sm`
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                  {countByType[filter.value] > 0 && (
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                      activeFilter === filter.value
                        ? "bg-white/50 dark:bg-black/20"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}>
                      {countByType[filter.value]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Read/Unread Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-gray-400" />
              <div className="flex gap-1">
                <button
                  onClick={() => setReadFilter("all")}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                    readFilter === "all"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setReadFilter("unread")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-all ${
                    readFilter === "unread"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <EyeOff className="w-3 h-3" />
                  No leídas
                </button>
                <button
                  onClick={() => setReadFilter("read")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-all ${
                    readFilter === "read"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  Leídas
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {(activeFilter !== "all" || readFilter !== "all") && (
            <div className="mb-2 px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Mostrando {filteredNotifications.length} de {notifications.length} notificaciones
              </span>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-3 rounded-lg border transition-all duration-200 ${
                  notification.read
                    ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-70"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
                }`}
              >
                {/* Unread indicator */}
                {!notification.read && (
                  <div
                    className={`absolute top-3 left-0 w-1 h-8 rounded-r-full ${getNotificationDot(
                      notification.type
                    )}`}
                  />
                )}

                <div className="flex items-start gap-3 pl-2">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === "kopp"
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : notification.type === "overdue"
                        ? "bg-red-100 dark:bg-red-900/30"
                        : notification.type === "upcoming"
                        ? "bg-orange-100 dark:bg-orange-900/30"
                        : "bg-green-100 dark:bg-green-900/30"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {notification.type === "overdue" && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                      {notification.type === "upcoming" && (
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                      )}
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state when no results match filter */}
          {filteredNotifications.length === 0 && (activeFilter !== "all" || readFilter !== "all") && (
            <EmptyState
              type="no-results"
              title="Sin resultados"
              description="No hay notificaciones que coincidan con los filtros seleccionados."
              actionLabel="Limpiar filtros"
              onAction={() => {
                setActiveFilter("all");
                setReadFilter("all");
              }}
            />
          )}

          {/* Empty state when no notifications at all */}
          {notifications.length === 0 && (
            <EmptyState
              type="no-notifications"
              title="Todo tranquilo por aquí"
              description="No tienes notificaciones pendientes. Las alertas de Kopp y tus acciones aparecerán aquí."
            />
          )}
        </>
      )}
    </Card>
  );
}
