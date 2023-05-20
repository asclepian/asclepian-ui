import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const patientRouter = router({
  patients: publicProcedure.input(z.object({ filenum: z.string() }).nullish())
    .query((opts) => {
      const filenum = opts.input?.filenum
      return { filenum }
    })
})
