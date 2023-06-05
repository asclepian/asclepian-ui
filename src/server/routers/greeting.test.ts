import { expect, test } from 'vitest'
import { appRouter } from './_app'
import { Context } from '../trpc'
import { PrismaClient } from '@prisma/client'

test('test test', () => {
  expect(true).toBe(true)
})
test('test greeting router', async () => {
  const prisma = new PrismaClient()
  const ctx: Context = { prisma }
  const caller = appRouter.createCaller(ctx)
  const greeting = await caller.test.greeting()
  expect(greeting).toBe('hello')
})
