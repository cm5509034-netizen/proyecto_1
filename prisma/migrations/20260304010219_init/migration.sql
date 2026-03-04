-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "problemTitle" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "rootCause" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "bloomLevel" REAL,
    "bloomLabel" TEXT,
    "planningQuality" REAL,
    "viabilityScore" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WhyAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "whyNumber" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "evaluationLevel" TEXT,
    "evaluationScore" REAL,
    "evaluationMaxScore" REAL,
    "evaluationFeedback" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "analysisId" TEXT NOT NULL,
    CONSTRAINT "WhyAnswer_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'MEDIA',
    "status" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "responsible" TEXT,
    "dueDate" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "analysisId" TEXT NOT NULL,
    CONSTRAINT "ActionItem_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WhyAnswer_analysisId_whyNumber_key" ON "WhyAnswer"("analysisId", "whyNumber");
