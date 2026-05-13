-- 001_blockplain_init.sql

-- 1. Create PlaneXCounter
CREATE TABLE "PlaneXCounter" (
    "id" SERIAL NOT NULL,
    CONSTRAINT "PlaneXCounter_pkey" PRIMARY KEY ("id")
);

-- 2. Create User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT,
    "plane_x" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_plane_x_key" ON "User"("plane_x");

-- 3. Create Blueprint
CREATE TABLE "Blueprint" (
    "csn" TEXT NOT NULL,
    "sequenceNumber" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "plane_x" INTEGER NOT NULL,
    "plane_y" INTEGER NOT NULL,
    "prev_block_hash" TEXT,
    "mbti" TEXT NOT NULL,
    "archetype" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "verifyCode" TEXT NOT NULL,
    "reportData" JSONB NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Blueprint_pkey" PRIMARY KEY ("csn"),
    CONSTRAINT "Blueprint_blockplain_coordinate_unique" UNIQUE ("plane_x", "plane_y"),
    CONSTRAINT "Blueprint_plane_x_check" CHECK (plane_x >= 1),
    CONSTRAINT "Blueprint_plane_y_check" CHECK (plane_y >= 1)
);
CREATE UNIQUE INDEX "Blueprint_verifyCode_key" ON "Blueprint"("verifyCode");
CREATE INDEX "Blueprint_plane_y_idx" ON "Blueprint"("plane_y");
CREATE INDEX "Blueprint_mbti_plane_y_idx" ON "Blueprint"("mbti", "plane_y");
CREATE INDEX "Blueprint_archetype_plane_y_idx" ON "Blueprint"("archetype", "plane_y");

-- 4. Create Session
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blueprintCsn" TEXT,
    "messages" JSONB NOT NULL DEFAULT '[]',
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- Add Foreign Keys
ALTER TABLE "Blueprint" ADD CONSTRAINT "Blueprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_blueprintCsn_fkey" FOREIGN KEY ("blueprintCsn") REFERENCES "Blueprint"("csn") ON DELETE SET NULL ON UPDATE CASCADE;
