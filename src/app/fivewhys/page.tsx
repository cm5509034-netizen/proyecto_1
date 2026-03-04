"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-states";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { Analysis } from "@/lib/types";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  Trash2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function FiveWhysListPage() {
  const router = useRouter();
  const { analyses, loading, error, fetchAnalyses, deleteAnalysis } = useAnalysis();
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("¿Estás seguro de que deseas eliminar este análisis?")) return;

    setDeleting(id);
    await deleteAnalysis(id);
    setDeleting(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completado
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            En Progreso
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            <FileText className="w-3 h-3 mr-1" />
            Borrador
          </Badge>
        );
    }
  };

  const getCompletedWhys = (analysis: Analysis) => {
    return analysis.whyAnswers.filter((w) => w.isCompleted).length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Sidebar />

      <main className="pl-72 transition-all duration-300">
        <Header
          title="Mis Análisis de Causa Raíz"
          subtitle="Gestiona todos tus análisis de 5 Porqués"
        />

        <div className="p-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {analyses.length} análisis en total
              </p>
            </div>
            <Link href="/fivewhys/new">
              <Button className="gold-gradient text-navy-900 font-semibold shadow-lg shadow-yellow-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Análisis
              </Button>
            </Link>
          </div>

          {/* Error State */}
          {error && (
            <Card className="p-4 mb-6 bg-red-50 border-red-200">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </Card>
          )}

          {/* Loading State */}
          {loading && analyses.length === 0 && (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && analyses.length === 0 && (
            <Card className="p-12 text-center">
              <EmptyState
                type="evaluation-pending"
                title="Sin análisis todavía"
                description="Crea tu primer análisis de 5 Porqués para empezar a identificar causas raíz de problemas."
              />
              <Link href="/fivewhys/new" className="inline-block mt-6">
                <Button className="gold-gradient text-navy-900 font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primer Análisis
                </Button>
              </Link>
            </Card>
          )}

          {/* Analyses List */}
          <div className="grid gap-4">
            {analyses.map((analysis) => (
              <Link
                key={analysis.id}
                href={`/fivewhys/${analysis.id}`}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-navy-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {analysis.problemTitle || "Sin título"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {analysis.problemDescription || "Sin descripción"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusBadge(analysis.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDelete(analysis.id, e)}
                            disabled={deleting === analysis.id}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Badge variant="outline" className="font-normal">
                            {getCompletedWhys(analysis)}/5 Por Qués
                          </Badge>
                        </div>

                        {analysis.rootCause && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Causa raíz identificada
                          </Badge>
                        )}

                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          {analysis.actionItems.length} acciones
                        </div>

                        <div className="text-gray-400 dark:text-gray-500 ml-auto">
                          {formatDate(analysis.updatedAt)}
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
