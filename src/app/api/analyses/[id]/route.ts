import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/analyses/[id] - Get a single analysis
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        whyAnswers: {
          orderBy: { whyNumber: "asc" },
        },
        actionItems: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!analysis) {
      return NextResponse.json(
        { error: "Análisis no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return NextResponse.json(
      { error: "Error al obtener el análisis" },
      { status: 500 }
    );
  }
}

// PUT /api/analyses/[id] - Update an analysis
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      problemTitle,
      problemDescription,
      rootCause,
      status,
      bloomLevel,
      bloomLabel,
      planningQuality,
      viabilityScore,
      whyAnswers,
    } = body;

    // Update the analysis
    const analysis = await prisma.analysis.update({
      where: { id },
      data: {
        problemTitle,
        problemDescription,
        rootCause,
        status,
        bloomLevel,
        bloomLabel,
        planningQuality,
        viabilityScore,
      },
    });

    // Update why answers if provided
    if (whyAnswers && Array.isArray(whyAnswers)) {
      for (const why of whyAnswers) {
        await prisma.whyAnswer.upsert({
          where: {
            analysisId_whyNumber: {
              analysisId: id,
              whyNumber: why.whyNumber,
            },
          },
          update: {
            answer: why.answer,
            evaluationLevel: why.evaluationLevel,
            evaluationScore: why.evaluationScore,
            evaluationMaxScore: why.evaluationMaxScore,
            evaluationFeedback: why.evaluationFeedback,
            isCompleted: why.isCompleted,
          },
          create: {
            analysisId: id,
            whyNumber: why.whyNumber,
            answer: why.answer,
            evaluationLevel: why.evaluationLevel,
            evaluationScore: why.evaluationScore,
            evaluationMaxScore: why.evaluationMaxScore,
            evaluationFeedback: why.evaluationFeedback,
            isCompleted: why.isCompleted,
          },
        });
      }
    }

    // Fetch the updated analysis with relations
    const updatedAnalysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        whyAnswers: {
          orderBy: { whyNumber: "asc" },
        },
        actionItems: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    return NextResponse.json(updatedAnalysis);
  } catch (error) {
    console.error("Error updating analysis:", error);
    return NextResponse.json(
      { error: "Error al actualizar el análisis" },
      { status: 500 }
    );
  }
}

// DELETE /api/analyses/[id] - Delete an analysis
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.analysis.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting analysis:", error);
    return NextResponse.json(
      { error: "Error al eliminar el análisis" },
      { status: 500 }
    );
  }
}
