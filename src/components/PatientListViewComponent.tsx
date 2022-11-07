import React from 'react'
import PatientView from './PatientViewComponent'
import { useRef } from 'react'
import { useQuery } from 'react-query'
import { Patient } from '../entities/patients'
import { globalConfig } from "../Configuration/config";
const URL = globalConfig.config.apiUrl+'/patients?size={1}&page={2}'

interface Props { 
    patientListJSON:Patient[]
}

function PatientListView({ patientListJSON}:Props) {
    const sizeRef = useRef<HTMLInputElement>(null)
    const pageRef = useRef<HTMLInputElement>(null)
    
    const { isLoading, error, data } = useQuery('allPatientsList', () =>
        fetch(globalConfig.config.apiUrl+'/patients?size=100').then((res) => res.json())
    )
    if (isLoading) {
        console.log('Loading...');
        return <div className="row p-1">Loading...</div>
    }
    if (error){
        console.log('An error has occurred: ' + (error instanceof Error)?error.message:'error');
        return <div className="row p-1"> {(error instanceof Error) ? error.message : 'error'}</div>
    }
    //let patientList = patientListJSON.patientListJSON
    console.log('received data')
    console.log({ data })
    return (
        <div className="row p-1">
            {data instanceof Object
                ? data._embedded.patientList.map((p) => (
                      <PatientView key={p.filenum} patientJSON={p} />
                  ))
                : 'Empty'}
        </div>
    )
}
export default PatientListView
