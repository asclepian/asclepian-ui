import React from 'react'
import PatientCardView from './PatientCardView'
import { useQuery } from 'react-query'
import { Patient } from '../entities'
import { getAllPatients, PatientListPaginatedHAL } from '../services'

interface Props {
    patientListJSON: Patient[]
}

function PatientListView({ patientListJSON }: Props) {
    const { isLoading, error, data } = useQuery(
        'allPatientsList',
        getAllPatients
    )

    if (isLoading) {
        console.log('Loading...')
        return <div className="row p-1">Loading...</div>
    }
    if (error || typeof data === 'undefined') {
        let errorMessage = error instanceof Error ? error.message : 'error '+String(error)
        console.log('An error has occurred: ' + errorMessage)
        return <div className="row p-1"> {errorMessage}</div>
    }
    console.log('received data')
    console.log({ data })

    return (
        <div className="row p-1">
            {
                (typeof data != 'undefined' )?data._embedded.patientList.map((p) => (
                      <PatientCardView key={p.filenum} patientJSON={p as Patient} />
                  ))
                : 'Empty'}
        </div>
    )
}
export default PatientListView
