interface Patient {
  id: number
  filenum: string
  cin: string
  lastname: string
  firstname: string
  landline: string
  insured: boolean
  active: boolean
  mobile: string
  email: string
  gender: 'f' | 'm' | 'F' | 'M'
  job: string
  birthdate: string
  address: string
  city: string
  postalcode: number
  createdby: number
  createdon: Date
}

interface PatientAllergy {
  type: 'allergy' | 'intolerance'
  category: 'food' | 'medication' | 'environment' | 'biologic'
  criticality: 'low' | 'high' | 'unable-to-assess'
  substance: string
  onset: string
  comment: string
}

export type { Patient, PatientAllergy }
