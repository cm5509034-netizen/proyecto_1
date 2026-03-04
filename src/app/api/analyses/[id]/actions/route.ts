import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/analyses/[id]/actions - Get all actions for an analysis
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const actions = await prisma.actionItem.findMany({
      where: { analysisId: id },
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json(actions);
  } catch (error) {
    console.error("Error fetching actions:", error);
    return NextResponse.json(
      { error: "Error al obtener las acciones" },
      { status: 500 }
    );
  }
}

// POST /api/analyses/[id]/actions - Create a new action for an analysis
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, priority, responsible, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: "El título de la acción es requerido" },
        { status: 400 }
      );
    }

    // Get the highest orderIndex
    const lastAction = await prisma.actionItem.findFirst({
      where: { analysisId: id },
      orderBy: { orderIndex: "desc" },
    });

    const newOrderIndex = lastAction ? lastAction.orderIndex + 1 : 0;

    const action = await prisma.actionItem.create({
      data: {
        analysisId: id,
        title,
        description,
        priority: priority || "MEDIA",
        responsible,
        dueDate,
        orderIndex: newOrderIndex,
      },
    });

    return NextResponse.json(action, { status: 201 });
  } catch (error) {
    console.error("Error creating action:", error);
    return NextResponse.json(
      { error: "Error al crear la acción" },
      { status: 500 }
    );
  }
}

// PUT /api/analyses/[id]/actions - Update multiple actions (for reordering)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { actions } = body;

    if (!actions || !Array.isArray(actions)) {
      return NextResponse.json(
        { error: "Se requiere un array de acciones" },
        { status: 400 }
      );
    }

    // Update each action's orderIndex
    for (let i = 0; i < actions.length; i++) {
      await prisma.actionItem.update({
        where: { id: actions[i].id },
        data: { orderIndex: i },
      });
    }

    const updatedActions = await prisma.actionItem.findMany({
      where: { analysisId: id },
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json(updatedActions);
  } catch (error) {
    console.error("Error updating actions:", error);
    return NextResponse.json(
      { error: "Error al actualizar las acciones" },
      { status: 500 }
    );
  }
}
