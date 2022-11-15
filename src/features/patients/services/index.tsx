import { globalConfig } from '../../../configuration/config'
import {Patient} from '../entities'

interface PatientListPaginatedHAL {
    _embedded: Embedded
    _links: any
    page: any
  }
  interface Embedded {
    patientList: PatientHAL[]
  }
  interface PatientHAL {
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
    job?: string
    birthdate: Date
    address: string
    email: string
    city?: string
    postalcode: number
    createdby: number
    createdon: Date
    _links: any
  }

async function updatePatient(p:Patient): Promise<Response> {
    return await fetch(globalConfig.config.apiUrl + '/patients/' + p.id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(p),
    })
}
async function getAllPatients(): Promise<Response> {
    return await fetch(globalConfig.config.apiUrl + '/patients?size=100').then((res) => res.json())
}

async function getPatientByFilenum(filenum:string|undefined): Promise<Patient> {
    return await fetch(globalConfig.config.apiUrl+'/patients?exactFilenum='+filenum).then((res) => res.json())
}

async function postPatient(p:Patient): Promise<Response> {
    return await fetch(globalConfig.config.apiUrl + '/patients', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(p),
    })
}


export { updatePatient, getPatientByFilenum, getAllPatients, postPatient }
export type { PatientListPaginatedHAL }
