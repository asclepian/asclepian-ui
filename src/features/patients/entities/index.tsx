
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
    job: any
    birthdate: Date
    address: string
    city: any
    postalcode: number
    createdby: number
    createdon: Date
    _links?: any
}

export {Patient}