
export interface Patient {
    id: number
    filenum: string
    cin: string
    lastname: string
    firstname: string
    landline: string
    insured: boolean
    active: boolean
    mobile: string
    gender: string
    job: any
    birthdate: Date
    address: string
    city: any
    postalcode: number
    createdby: any
    createdon: any
    _links?: any
}