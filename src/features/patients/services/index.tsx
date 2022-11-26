import axios from 'axios'
import { globalConfig } from '../../../configuration/config'
import { Patient } from '../entities'

interface PatientListPaginatedHAL {
  _embedded: Embedded
  _links: any
  page: any
}
interface Embedded {
  patientList: PatientHAL[]
}
interface PatientHAL extends Patient {
  _links: any
}

// FIXME: switch to axios
async function updatePatient (p: Patient): Promise<Response> {
  return await fetch(globalConfig.config.apiUrl + '/patients/' + p.filenum, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(p)
  })
}
async function getAllPatients (): Promise<PatientListPaginatedHAL> {
  const { data } = await axios.get<PatientListPaginatedHAL>(
    globalConfig.config.apiUrl + '/patients')
  return data
}

async function getPatient (filenum: string): Promise<Patient> {
  const { data } = await axios.get<Patient>(globalConfig.config.apiUrl + '/patients/' + filenum)
  return data
}

// FIXME: switch to axios
async function createPatient (p: Patient): Promise<Response> {
  return await fetch(globalConfig.config.apiUrl + '/patients', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(p)
  })
}

export {
  updatePatient,
  getPatient,
  getAllPatients,
  createPatient
}
export type { PatientListPaginatedHAL }
