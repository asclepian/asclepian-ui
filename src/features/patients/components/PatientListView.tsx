import React, { useEffect } from 'react'
import PatientCardView from './PatientCardView'
import usePatientStore from '../PatientStore'
import { trpc } from '../../../utils/trpc'

function PatientListView (): JSX.Element {
  console.log('PatientListView entered function, running useQuery hook')
  const { isLoading, error, data } = trpc.patients.listAll.useQuery()
  useEffect(() => usePatientStore.subscribe(console.log), [])
  console.log('PatientListView testing useQuery return value')
  if (isLoading) {
    console.log('PatientListView Loading ...')
    return <div className="row p-1">Loading...</div>
  }
  if ((error != null) || typeof data === 'undefined') {
    const errorMessage = error instanceof Error ? error.message : 'error ' + String(error)
    console.error('An error has occurred: ' + errorMessage)
    return <div className="row p-1"> {errorMessage}</div>
  }
  console.log('PatientListView showing data')
  return (
        <div className="flex flex-wrap gap-1 p-1">
            {
                (typeof data !== 'undefined')
                  ? data.patients.map((p) => (
                      <PatientCardView key={p.filenum} patientJSON={p} />
                  ))
                  : 'Empty'}
        </div>
  )
}
export default PatientListView
