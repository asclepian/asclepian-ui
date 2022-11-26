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
  gender: string
  job: string
  birthdate: string
  address: string
  city: string
  postalcode: number
  createdby: number
  createdon: Date
  _links?: any
}

export type { Patient }
