import { describe, expect, test } from 'vitest'
import { appRouter } from './_app'
import { Context } from '../trpc'
import { PrismaClient } from '@prisma/client'

describe('patient router test', async () => {
  test('test list all patients', async () => {
    const prisma = new PrismaClient()
    const ctx: Context = { prisma }
    const patientListExpected = await prisma.patient.findMany()
    const caller = appRouter.createCaller(ctx)
    const patientListReceived = await caller.patients.listAll()
    expect(patientListReceived).not.toBeNull()
    const receivedIdList = patientListReceived.patients.map((p) => p.id)
    const expectedIdList = patientListExpected.map((p) => p.id)
    expect([...receivedIdList].sort((a, b) => a - b)).toEqual([...expectedIdList].sort((a, b) => a - b))
  })
})
