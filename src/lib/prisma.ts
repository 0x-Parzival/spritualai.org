import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Set up WebSocket for Node.js environment
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const connectionString = process.env.DATABASE_URL

// Lazy singleton — only creates PrismaClient on first access
// This prevents crashes at import time when the Neon adapter has compatibility issues
let _prisma: PrismaClient | undefined

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_prisma) {
      if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
      }
      const pool = new Pool({ connectionString })
      const adapter = new PrismaNeon(pool)
      _prisma = new PrismaClient({ adapter, log: ['error'] })
      if (process.env.NODE_ENV !== 'production') {
        (globalThis as any).__prisma = _prisma
      }
    }
    return (prisma as any)[prop]
  }
})

// Also set the global for hot reload compatibility
declare global {
  var __prisma: undefined | PrismaClient
}

if (process.env.NODE_ENV !== 'production' && (globalThis as any).__prisma) {
  _prisma = (globalThis as any).__prisma
}
