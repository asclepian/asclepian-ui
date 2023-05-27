import { z } from 'zod'
export interface Patient {
  id: number
  filenum: string
  cin: string
  lastname: string
  firstname: string
  landline: string
  insured: number
  active: number
  mobile: string
  gender: string
  job?: string
  birthdate: string
  address: string
  city?: string
  postalcode: number
  createdby?: string
  createdon?: string
  _links?: any
}

export const PatientSchema = z.object({
  id: z.optional(z.number()),
  filenum: z.string(),
  cin: z.string(),
  lastname: z.string(),
  firstname: z.string(),
  landline: z.string(),
  insured: z.boolean(),
  active: z.boolean(),
  mobile: z.string(),
  gender: z.string().regex(/^(M|F)$/),
  job: z.optional(z.string()),
  birthdate: z.date(),
  address: z.string(),
  city: z.optional(z.string()),
  postalcode: z.number().positive(),
  createdby: z.optional(z.number()),
  createdon: z.optional(z.string().datetime())
})
export interface PatientList {
  _embedded: {
    patientList: Patient[]
  }

}

export interface Encounter {
  id: number
  timestamp: string
  patient: number
  status: string
  createdby?: string
  end_timestamp: string
  start_timestamp: string
}

export interface EncounterFlat {
  id: number
  timestamp: string
  patient?: Patient
  status: string
  createdby?: string
  end_timestamp: string
  start_timestamp: string
}
