import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const patientRouter = router({
  listAll: publicProcedure.query(async (opts) => {
    const patients = await opts.ctx.prisma.patient.findMany()
    return { patients }
  })
})
