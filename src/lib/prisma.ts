import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Set up WebSocket for Node.js environment
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@host/dbname?sslmode=require'

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

declare global {
  var __prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.__prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma
