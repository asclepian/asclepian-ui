import React from 'react'
import { useParams } from 'react-router-dom'
import PatientAPIWrappper from './PatientAPIWrapper'
import { getPatient } from '../services'
import { useQuery } from 'react-query'
import { Patient } from '../entities'

function PatientEditView (): JSX.Element {
  const { filenum } = useParams()
  console.log('editing patient ' + ((typeof filenum === 'undefined') ? 'with no param' : filenum))
  if (typeof filenum === 'undefined') return <PatientAPIWrappper patient={undefined} />

  const { isLoading, error, data } = useQuery<Patient, Error>('patient' + filenum, async () =>
    await getPatient(filenum)
  )
  if (isLoading) {
    return <div className="row p-1">Loading...</div>
  }
  if (error != null) {
    return <div className="row p-1"> {error.message}</div>
  }
  return <PatientAPIWrappper patient={data} />
}
export default PatientEditView
