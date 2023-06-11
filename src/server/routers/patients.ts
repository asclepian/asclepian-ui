import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const patientRouter = router({
  listAll: publicProcedure.query(async (opts) => {
    const patients = await opts.ctx.prisma.patient.findMany()
    return { patients }
  }),
  byFilenum: publicProcedure.input(z.string()).query(async (opts) => {
    const result = await opts.ctx.prisma.patient.findUnique({
      where: {
        filenum: opts.input
      }
    })
    return { patient: result }
  })
})
