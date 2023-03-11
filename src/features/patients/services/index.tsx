import axios from 'axios'
import { globalConfig } from '../../../configuration/config'
import { Patient } from '../entities'
import { asyncRun } from '../../../tools/dbOps'
import { DBContext } from '../../../tools/contexts'
import { useContext } from 'react'

const db = useContext(DBContext)

const stmtPatients = db.prepare('SELECT * FROM patients')
const stmtPatientByFilenum = db.prepare('SELECT * FROM patients WHERE filenum = ?')
const stmtUpdatePatient = db.prepare('UPDATE patients SET cin=@cin, firstname=@firstname, lastname=@lastname, landline=@landline, insured=@insured, active=@active, mobile=@mobile, gender=@gender, job=@job, birthdate=@birthdate, address=@address, city=@city, postalcode=@postalcode WHERE filenum=@filenum')
const stmtEncountersByPatient = db.prepare('SELECT * FROM encounters WHERE patient = @filenum AND unixepoch(timestamp) > unixepoch(@startDate) AND unixepoch(timestamp) < unixepoch(@endDate)')
const stmtEncounters = db.prepare('SELECT * FROM encounters WHERE unixepoch(timestamp) > unixepoch(@startDate) AND unixepoch(timestamp) < unixepoch(@endDate)')
const stmtEncounterId = db.prepare('SELECT * FROM encounters WHERE id = ?')
const stmtPatientLastSeen = db.prepare("SELECT patient, datetime(max(unixepoch(timestamp)),'unixepoch') as lastseen from encounters WHERE unixepoch(timestamp) > unixepoch(?) GROUP BY patient")
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

function normalizePatient (patient: Patient) {
  const isActive = patient.active ? 1 : 0
  const isInsured = patient.insured ? 1 : 0
  return { ...patient, active: isActive, insured: isInsured }
}

/* async function updatePatient (p: Patient): Promise<Response> {
  // FIXME: switch to axios
  return await fetch(globalConfig.config.apiUrl + '/patients/' + p.filenum, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(p)
  })
} */

async function updatePatient (p: Patient): Promise<unknown> {
  const patient = normalizePatient(p)
  console.log(`updating patient ${JSON.stringify(patient)}`)
  return await asyncRun(stmtUpdatePatient, patient)
}

// FIXME: switch to direct DB access
async function getAllPatients (): Promise<PatientListPaginatedHAL> {
  const { data } = await axios.get<PatientListPaginatedHAL>(
    globalConfig.config.apiUrl + '/patients')
  return data
}

// FIXME: switch to direct DB access
async function getPatient (filenum: string): Promise<Patient> {
  const reqURL = globalConfig.config.apiUrl + '/patients/' + filenum
  console.log(`fetching patient with URL: ${reqURL}`)
  const { data } = await axios.get<Patient>(reqURL)
  return data
}

// FIXME: switch to direct DB access
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
