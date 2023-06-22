import { PatientSchema } from '../../tools/formTools'
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
  }),
  updatePatient: publicProcedure.input(PatientSchema).mutation(async (opts) => {
    const input = opts.input
    await opts.ctx.prisma.patient.update({
      where: {
        filenum: input.filenum
      },
      data: {
        active: input.active,
        address: input.address,
        birthdate: input.birthdate,
        cin: input.cin,
        city: input.city,
        email: input.email,
        firstname: input.firstname,
        gender: input.gender,
        insured: input.insured,
        job: input.job,
        landline: input.landline,
        lastname: input.lastname,
        mobile: input.mobile,
        postalcode: input.postalcode
      }
    })
  })
})
