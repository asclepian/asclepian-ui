import { Prisma } from '@prisma/client'

/* const patientWithoutRelations = Prisma.validator<Prisma.patientArgs>()({
  include: {
    area_area_patientTopatient: false,
    encounter_encounter_patientTopatient: false
  }
}) */
type Patient = Prisma.patientGetPayload<Prisma.patientArgs>

interface PatientAllergy {
  type: 'allergy' | 'intolerance'
  category: 'food' | 'medication' | 'environment' | 'biologic'
  criticality: 'low' | 'high' | 'unable-to-assess'
  substance: string
  onset: string
  comment: string
}

export type { Patient, PatientAllergy }
