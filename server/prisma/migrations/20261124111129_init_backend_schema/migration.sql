-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FARMER', 'VETERINARIAN', 'AUTHORITY');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('ACTIVE', 'SICK', 'QUARANTINED', 'DECEASED', 'SOLD');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('REPORTED', 'UNDER_REVIEW', 'TRIAGED', 'UNDER_TREATMENT', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "CasePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'AUDIO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'MISSED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'FARMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "location" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "tagNumber" TEXT NOT NULL,
    "name" TEXT,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "approximateAgeMonths" INTEGER,
    "status" "AnimalStatus" NOT NULL DEFAULT 'ACTIVE',
    "farmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases" (
    "id" TEXT NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "status" "CaseStatus" NOT NULL DEFAULT 'REPORTED',
    "priority" "CasePriority" NOT NULL DEFAULT 'MEDIUM',
    "animalId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "assignedVetId" TEXT,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observations" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "symptoms" TEXT[],
    "bodyTemperature" DOUBLE PRECISION,
    "heartRate" INTEGER,
    "respiratoryRate" INTEGER,
    "generalCondition" TEXT,
    "notes" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_attachments" (
    "id" TEXT NOT NULL,
    "observationId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "storageKey" TEXT NOT NULL,
    "url" TEXT,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triage_reports" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "urgencyCategory" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION,
    "summary" TEXT NOT NULL,
    "potentialIndicators" TEXT[],
    "differentialNotes" TEXT,
    "modelVersion" TEXT NOT NULL DEFAULT 'vetguard-triage-v1.0',
    "isDisclaimed" BOOLEAN NOT NULL DEFAULT true,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "triage_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "veterinarianId" TEXT NOT NULL,
    "clinicalObservations" TEXT,
    "diagnosis" TEXT,
    "treatmentPlan" TEXT,
    "prescription" TEXT,
    "notes" TEXT,
    "conductedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow_ups" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "observationId" TEXT,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "status" "FollowUpStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "recommendations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_ups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "farms_ownerId_idx" ON "farms"("ownerId");

-- CreateIndex
CREATE INDEX "farms_location_idx" ON "farms"("location");

-- CreateIndex
CREATE INDEX "animals_farmId_idx" ON "animals"("farmId");

-- CreateIndex
CREATE INDEX "animals_species_idx" ON "animals"("species");

-- CreateIndex
CREATE INDEX "animals_status_idx" ON "animals"("status");

-- CreateIndex
CREATE UNIQUE INDEX "animals_farmId_tagNumber_key" ON "animals"("farmId", "tagNumber");

-- CreateIndex
CREATE UNIQUE INDEX "cases_caseNumber_key" ON "cases"("caseNumber");

-- CreateIndex
CREATE INDEX "cases_caseNumber_idx" ON "cases"("caseNumber");

-- CreateIndex
CREATE INDEX "cases_status_idx" ON "cases"("status");

-- CreateIndex
CREATE INDEX "cases_priority_idx" ON "cases"("priority");

-- CreateIndex
CREATE INDEX "cases_farmerId_idx" ON "cases"("farmerId");

-- CreateIndex
CREATE INDEX "cases_assignedVetId_idx" ON "cases"("assignedVetId");

-- CreateIndex
CREATE INDEX "cases_animalId_idx" ON "cases"("animalId");

-- CreateIndex
CREATE INDEX "cases_createdAt_idx" ON "cases"("createdAt");

-- CreateIndex
CREATE INDEX "observations_caseId_idx" ON "observations"("caseId");

-- CreateIndex
CREATE INDEX "observations_reporterId_idx" ON "observations"("reporterId");

-- CreateIndex
CREATE INDEX "observations_recordedAt_idx" ON "observations"("recordedAt");

-- CreateIndex
CREATE INDEX "media_attachments_observationId_idx" ON "media_attachments"("observationId");

-- CreateIndex
CREATE INDEX "media_attachments_mediaType_idx" ON "media_attachments"("mediaType");

-- CreateIndex
CREATE UNIQUE INDEX "triage_reports_caseId_key" ON "triage_reports"("caseId");

-- CreateIndex
CREATE INDEX "triage_reports_caseId_idx" ON "triage_reports"("caseId");

-- CreateIndex
CREATE INDEX "triage_reports_urgencyCategory_idx" ON "triage_reports"("urgencyCategory");

-- CreateIndex
CREATE INDEX "consultations_caseId_idx" ON "consultations"("caseId");

-- CreateIndex
CREATE INDEX "consultations_veterinarianId_idx" ON "consultations"("veterinarianId");

-- CreateIndex
CREATE INDEX "consultations_conductedAt_idx" ON "consultations"("conductedAt");

-- CreateIndex
CREATE INDEX "follow_ups_caseId_idx" ON "follow_ups"("caseId");

-- CreateIndex
CREATE INDEX "follow_ups_observationId_idx" ON "follow_ups"("observationId");

-- CreateIndex
CREATE INDEX "follow_ups_scheduledDate_idx" ON "follow_ups"("scheduledDate");

-- CreateIndex
CREATE INDEX "follow_ups_status_idx" ON "follow_ups"("status");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_assignedVetId_fkey" FOREIGN KEY ("assignedVetId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_attachments" ADD CONSTRAINT "media_attachments_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "observations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triage_reports" ADD CONSTRAINT "triage_reports_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_ups" ADD CONSTRAINT "follow_ups_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_ups" ADD CONSTRAINT "follow_ups_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "observations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
