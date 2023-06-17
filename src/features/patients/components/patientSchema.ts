
import z from 'zod'
const PatientSchema = z.object({
  filenum: z.string().min(1),
  email: z.string().email().nullable(),
  cin: z.string().min(5).nullable(),
  lastname: z.string().min(2),
  firstname: z.string().min(2),
  gender: z.string().regex(/(M|F)/).nullable(),
  birthdate: z.string().datetime(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  postalcode: z.number().nullable(),
  landline: z.string().nullable(),
  mobile: z.string().nullable(),
  active: z.boolean(),
  insured: z.boolean(),
  job: z.string().nullable(),
  id: z.number().nullable()
})

export default PatientSchema
