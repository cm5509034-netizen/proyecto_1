"use client";

import { useState, useCallback } from "react";
import type {
  Analysis,
  CreateAnalysisInput,
  UpdateAnalysisInput,
  CreateActionInput,
  ActionItem,
} from "@/lib/types";

export function useAnalysis(initialAnalysisId?: string) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all analyses
  const fetchAnalyses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyses");
      if (!response.ok) throw new Error("Error al obtener los análisis");
      const data = await response.json();
      setAnalyses(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single analysis
  const fetchAnalysis = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analyses/${id}`);
      if (!response.ok) throw new Error("Error al obtener el análisis");
      const data = await response.json();
      setAnalysis(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new analysis
  const createAnalysis = useCallback(async (input: CreateAnalysisInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error("Error al crear el análisis");
      const data = await response.json();
      setAnalysis(data);
      setAnalyses((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an analysis
  const updateAnalysis = useCallback(
    async (id: string, input: UpdateAnalysisInput) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/analyses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!response.ok) throw new Error("Error al actualizar el análisis");
        const data = await response.json();
        setAnalysis(data);
        setAnalyses((prev) =>
          prev.map((a) => (a.id === id ? data : a))
        );
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete an analysis
  const deleteAnalysis = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analyses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el análisis");
      setAnalysis(null);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add an action to the analysis
  const addAction = useCallback(
    async (analysisId: string, input: CreateActionInput) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/analyses/${analysisId}/actions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!response.ok) throw new Error("Error al crear la acción");
        const data = await response.json();

        // Update the local analysis state
        setAnalysis((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            actionItems: [...prev.actionItems, data],
          };
        });

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update action order
  const reorderActions = useCallback(
    async (analysisId: string, actions: ActionItem[]) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/analyses/${analysisId}/actions`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actions }),
        });
        if (!response.ok) throw new Error("Error al reordenar las acciones");
        const data = await response.json();

        setAnalysis((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            actionItems: data,
          };
        });

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update an action
  const updateAction = useCallback(
    async (actionId: string, input: Partial<ActionItem>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/actions/${actionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!response.ok) throw new Error("Error al actualizar la acción");
        const data = await response.json();

        setAnalysis((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            actionItems: prev.actionItems.map((a) =>
              a.id === actionId ? data : a
            ),
          };
        });

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete an action
  const deleteAction = useCallback(async (actionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/actions/${actionId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la acción");

      setAnalysis((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          actionItems: prev.actionItems.filter((a) => a.id !== actionId),
        };
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analysis,
    analyses,
    loading,
    error,
    setAnalysis,
    fetchAnalyses,
    fetchAnalysis,
    createAnalysis,
    updateAnalysis,
    deleteAnalysis,
    addAction,
    reorderActions,
    updateAction,
    deleteAction,
  };
}
