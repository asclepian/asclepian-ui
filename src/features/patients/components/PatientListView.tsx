import React, { useEffect } from 'react'
import PatientCardView from './PatientCardView'
import { useQuery } from 'react-query'
import { Patient } from '../entities'
import { getAllPatients, PatientListPaginatedHAL } from '../services'
import usePatientStore from '../PatientStore'

function PatientListView (): JSX.Element {
  const { isLoading, error, data } = useQuery<PatientListPaginatedHAL, Error>(
    'allPatientsList',
    getAllPatients
  )
  useEffect(() => usePatientStore.subscribe(console.log), [])

  if (isLoading) {
    console.log('Loading...')
    return <div className="row p-1">Loading...</div>
  }
  if ((error != null) || typeof data === 'undefined') {
    const errorMessage = error instanceof Error ? error.message : 'error ' + String(error)
    console.log('An error has occurred: ' + errorMessage)
    return <div className="row p-1"> {errorMessage}</div>
  }
  console.log('received data')
  console.log({ data })

  return (
        <div className="row p-1">
            {
                (typeof data !== 'undefined')
                  ? data._embedded.patientList.map((p) => (
                      <PatientCardView key={p.filenum} patientJSON={p as Patient} />
                  ))
                  : 'Empty'}
        </div>
  )
}
export default PatientListView
