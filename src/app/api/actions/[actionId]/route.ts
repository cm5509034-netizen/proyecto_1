import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/actions/[actionId] - Update an action
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> }
) {
  try {
    const { actionId } = await params;
    const body = await request.json();
    const { title, description, priority, status, responsible, dueDate } = body;

    const action = await prisma.actionItem.update({
      where: { id: actionId },
      data: {
        title,
        description,
        priority,
        status,
        responsible,
        dueDate,
      },
    });

    return NextResponse.json(action);
  } catch (error) {
    console.error("Error updating action:", error);
    return NextResponse.json(
      { error: "Error al actualizar la acción" },
      { status: 500 }
    );
  }
}

// DELETE /api/actions/[actionId] - Delete an action
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> }
) {
  try {
    const { actionId } = await params;

    await prisma.actionItem.delete({
      where: { id: actionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting action:", error);
    return NextResponse.json(
      { error: "Error al eliminar la acción" },
      { status: 500 }
    );
  }
}
