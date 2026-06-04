-- Migration: Add sheet-sync columns to existing tables
-- Run this against your Neon PostgreSQL database
-- You can run it from the Neon SQL editor or via psql

-- ============================================
-- User table: add sheet-sync columns
-- ============================================
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "name" TEXT,
  ADD COLUMN IF NOT EXISTS "country" TEXT,
  ADD COLUMN IF NOT EXISTS "city" TEXT,
  ADD COLUMN IF NOT EXISTS "deviceType" TEXT,
  ADD COLUMN IF NOT EXISTS "browser" TEXT,
  ADD COLUMN IF NOT EXISTS "referralSource" TEXT,
  ADD COLUMN IF NOT EXISTS "referralCsn" TEXT,
  ADD COLUMN IF NOT EXISTS "entryTag" TEXT,
  ADD COLUMN IF NOT EXISTS "totalSessions" INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "totalReports" INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "totalRevenue" DOUBLE PRECISION DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "subscriptionActive" BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS "optedInEmail" BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS "lastSeen" TIMESTAMP DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT NOW();

-- ============================================
-- Session table: add sheet-sync columns  
-- ============================================
ALTER TABLE "Session"
  ADD COLUMN IF NOT EXISTS "startedAt" TIMESTAMP DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS "endedAt" TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "durationSeconds" INTEGER,
  ADD COLUMN IF NOT EXISTS "exchangeCount" INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "dropOffExchange" INTEGER,
  ADD COLUMN IF NOT EXISTS "completionStatus" TEXT,
  ADD COLUMN IF NOT EXISTS "entryEmotionTag" TEXT,
  ADD COLUMN IF NOT EXISTS "detectedEmotions" TEXT,
  ADD COLUMN IF NOT EXISTS "dominantEmotion" TEXT,
  ADD COLUMN IF NOT EXISTS "confidenceScoreFinal" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "triggerReason" TEXT,
  ADD COLUMN IF NOT EXISTS "inputMode" TEXT,
  ADD COLUMN IF NOT EXISTS "reportGenerated" BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS "emailCapturedAtExchange" INTEGER,
  ADD COLUMN IF NOT EXISTS "rawTranscriptUrl" TEXT;

-- ============================================
-- Blueprint table: add sheet-sync columns
-- ============================================
ALTER TABLE "Blueprint"
  ADD COLUMN IF NOT EXISTS "consciousnessIdentity" TEXT,
  ADD COLUMN IF NOT EXISTS "corePattern" TEXT,
  ADD COLUMN IF NOT EXISTS "jungianComplex" TEXT,
  ADD COLUMN IF NOT EXISTS "rootBelief" TEXT,
  ADD COLUMN IF NOT EXISTS "rootAge" INTEGER,
  ADD COLUMN IF NOT EXISTS "secondaryGain" TEXT,
  ADD COLUMN IF NOT EXISTS "spiritualPath" TEXT,
  ADD COLUMN IF NOT EXISTS "hawkinsLevelCurrent" INTEGER,
  ADD COLUMN IF NOT EXISTS "hawkinsLevelTarget" INTEGER,
  ADD COLUMN IF NOT EXISTS "urgencyPercent" INTEGER,
  ADD COLUMN IF NOT EXISTS "dharmaPhase" TEXT,
  ADD COLUMN IF NOT EXISTS "dob" TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "birthTimeApprox" TEXT,
  ADD COLUMN IF NOT EXISTS "birthPlace" TEXT,
  ADD COLUMN IF NOT EXISTS "lagnaSign" TEXT,
  ADD COLUMN IF NOT EXISTS "moonSign" TEXT,
  ADD COLUMN IF NOT EXISTS "currentDasha" TEXT,
  ADD COLUMN IF NOT EXISTS "witnessLevel" TEXT,
  ADD COLUMN IF NOT EXISTS "timesShared" INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "referralsGenerated" INTEGER DEFAULT 0;

-- ============================================
-- Purchase table: add sheet-sync columns
-- ============================================
ALTER TABLE "Purchase"
  ADD COLUMN IF NOT EXISTS "purchasedAt" TIMESTAMP DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS "productName" TEXT,
  ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT;

-- ============================================
-- Create SheetSync tracking table
-- ============================================
CREATE TABLE IF NOT EXISTS "SheetSync" (
  id TEXT PRIMARY KEY,
  "sheetType" TEXT NOT NULL UNIQUE,
  "spreadsheetId" TEXT NOT NULL,
  "sheetName" TEXT NOT NULL,
  "lastSyncedAt" TIMESTAMP DEFAULT NOW(),
  "lastRowSynced" INTEGER DEFAULT 0,
  "syncStatus" TEXT DEFAULT 'active',
  "errorMessage" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
