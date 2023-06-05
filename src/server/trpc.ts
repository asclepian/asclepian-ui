import { type inferAsyncReturnType, initTRPC } from '@trpc/server'
import type * as trpcExpress from '@trpc/server/adapters/express'
import { PrismaClient } from '@prisma/client'
export const createContext = (
  {
    req,
    res
  }: trpcExpress.CreateExpressContextOptions) => {
  const prisma = new PrismaClient()
  return { prisma }
}
export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()
export const middleware = t.middleware
export const router = t.router
export const publicProcedure = t.procedure
export const mergeRouters = t.mergeRouters
