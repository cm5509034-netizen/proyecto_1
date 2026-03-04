import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/analyses - List all analyses
export async function GET() {
  try {
    const analyses = await prisma.analysis.findMany({
      include: {
        whyAnswers: {
          orderBy: { whyNumber: "asc" },
        },
        actionItems: {
          orderBy: { orderIndex: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("Error fetching analyses:", error);
    return NextResponse.json(
      { error: "Error al obtener los análisis" },
      { status: 500 }
    );
  }
}

// POST /api/analyses - Create a new analysis
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problemTitle, problemDescription } = body;

    if (!problemTitle || !problemDescription) {
      return NextResponse.json(
        { error: "El título y la descripción del problema son requeridos" },
        { status: 400 }
      );
    }

    const analysis = await prisma.analysis.create({
      data: {
        problemTitle,
        problemDescription,
        status: "DRAFT",
        whyAnswers: {
          create: [
            { whyNumber: 1, answer: "" },
            { whyNumber: 2, answer: "" },
            { whyNumber: 3, answer: "" },
            { whyNumber: 4, answer: "" },
            { whyNumber: 5, answer: "" },
          ],
        },
      },
      include: {
        whyAnswers: {
          orderBy: { whyNumber: "asc" },
        },
        actionItems: true,
      },
    });

    return NextResponse.json(analysis, { status: 201 });
  } catch (error) {
    console.error("Error creating analysis:", error);
    return NextResponse.json(
      { error: "Error al crear el análisis" },
      { status: 500 }
    );
  }
}
