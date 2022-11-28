import { Patient } from '../entities'
import { createPatient, updatePatient } from '../services'
import PatientFormLogic from './PatientFormLogic'
import React from 'react'

interface Props {
  patient: Patient | undefined
}
function PatientAPIWrapper ({ patient }: Props): JSX.Element {
  const isNewClient = typeof patient === 'undefined'
  async function handleSubmit (data: Patient): Promise<Response> {
    // console.log('received submit in API ' + JSON.stringify({ data }))
    return isNewClient ? await createPatient(data) : await updatePatient(data)
  }
  // console.log(`calling PatientAPIWrapper with Patient ${JSON.stringify(patient)}`)
  return <PatientFormLogic defaultValues={patient} onSubmit={handleSubmit} isNew={isNewClient} />
}

export default PatientAPIWrapper
