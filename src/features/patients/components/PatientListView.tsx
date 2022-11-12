import React from 'react'
import PatientCardView from './PatientCardView'
import { useRef } from 'react'
import { useQuery } from 'react-query'
import { Patient } from '../../../entities/patients'
import { globalConfig } from "../../../configuration/config";
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
        let errorMessage = (error instanceof Error)?error.message:'error';
        console.log('An error has occurred: ' + errorMessage);
        return <div className="row p-1"> {errorMessage}</div>
    }
    //let patientList = patientListJSON.patientListJSON
    console.log('received data')
    console.log({ data })
    return (
        <div className="row p-1">
            {data instanceof Object
                ? data._embedded.patientList.map((p) => (
                      <PatientCardView key={p.filenum} patientJSON={p} />
                  ))
                : 'Empty'}
        </div>
    )
}
export default PatientListView
