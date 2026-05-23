-- 001_blockplain_init.sql
-- Blockplain schema migration for Spiritual AI
-- Compatible with Neon (Postgres serverless)

BEGIN;

-- 1. PlaneXCounter table (must be created before User)
CREATE TABLE IF NOT EXISTS "PlaneXCounter" (
    "id" SERIAL PRIMARY KEY
);

-- 2. User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "uid" TEXT NOT NULL UNIQUE,
    "email" TEXT UNIQUE,
    "plane_x" INTEGER UNIQUE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "User_plane_x_check" CHECK ("plane_x" IS NULL OR "plane_x" >= 1)
);

-- 3. Blueprint table (the "blocks" of the blockplain)
CREATE TABLE IF NOT EXISTS "Blueprint" (
    "csn" TEXT PRIMARY KEY,
    "sequence_number" SERIAL NOT NULL UNIQUE,
    "user_id" TEXT NOT NULL,
    "plane_x" INTEGER NOT NULL,
    "plane_y" INTEGER NOT NULL,
    "prev_block_hash" TEXT,
    "mbti" TEXT NOT NULL,
    "archetype" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "verify_code" TEXT NOT NULL UNIQUE,
    "report_data" JSONB NOT NULL DEFAULT '{}',
    "is_complete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

    -- Foreign keys
    CONSTRAINT "Blueprint_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE,

    -- Blockplain coordinate constraint (sacred)
    CONSTRAINT "Blueprint_blockplain_coordinate_unique" UNIQUE ("plane_x", "plane_y"),

    -- Check constraints
    CONSTRAINT "Blueprint_plane_y_check" CHECK ("plane_y" >= 1),
    CONSTRAINT "Blueprint_plane_x_check" CHECK ("plane_x" >= 1)
);

-- 4. Session table
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "blueprint_csn" TEXT,
    "messages" JSONB NOT NULL DEFAULT '[]',
    "completion_percent" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "last_active_at" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "Session_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Session_blueprint_fk" FOREIGN KEY ("blueprint_csn") REFERENCES "Blueprint"("csn") ON DELETE SET NULL
);

-- 5. Indexes (performance for blockplain queries)
CREATE INDEX IF NOT EXISTS "Blueprint_plane_y_idx" ON "Blueprint"("plane_y");
CREATE INDEX IF NOT EXISTS "Blueprint_mbti_plane_y_idx" ON "Blueprint"("mbti", "plane_y");
CREATE INDEX IF NOT EXISTS "Blueprint_archetype_plane_y_idx" ON "Blueprint"("archetype", "plane_y");
CREATE INDEX IF NOT EXISTS "Blueprint_user_id_idx" ON "Blueprint"("user_id");
CREATE INDEX IF NOT EXISTS "Blueprint_verify_code_idx" ON "Blueprint"("verify_code");
CREATE INDEX IF NOT EXISTS "Session_user_id_idx" ON "Session"("user_id");
CREATE INDEX IF NOT EXISTS "Session_blueprint_csn_idx" ON "Session"("blueprint_csn");
CREATE INDEX IF NOT EXISTS "User_uid_idx" ON "User"("uid");
CREATE INDEX IF NOT EXISTS "User_plane_x_idx" ON "User"("plane_x");

COMMIT;
