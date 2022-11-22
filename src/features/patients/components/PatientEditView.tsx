import React from 'react'
import { useParams } from 'react-router-dom'
import PatientAPIWrappper from './PatientAPIWrapper'
import { getPatientByFilenum } from '../services'
import { useQuery } from 'react-query'

function PatientEditView() {
    let { filenum } = useParams()
    console.log("editing patient "+filenum)
    if( typeof filenum === 'undefined') return  <PatientAPIWrappper patient={undefined} />

    const { isLoading, error, data } = useQuery('patient' + filenum, () =>
        getPatientByFilenum(filenum)
    )
    if (isLoading) {
        return <div className="row p-1">Loading...</div>
    }
    if (error) {
        let errorMessage = error instanceof Error ? error.message : 'error'
        return <div className="row p-1"> {errorMessage}</div>
    }
    // console.log('received data within: ' + PatientEditView.name+' => '+{data})
    console.log("new Edit view patient type: "+(typeof data)+data)
    return <PatientAPIWrappper patient={data} />
}
export default PatientEditView
