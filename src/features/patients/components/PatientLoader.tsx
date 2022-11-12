import { globalConfig } from '../../../configuration/config'
import React from 'react'
import PatientCardView from './PatientCardView'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
const URL = globalConfig.config.apiUrl + '/patients?exactFilenum={1}'

function PatientLoader(props: { filenum: string }) {
    let filenum = (props.filenum.length == 0)? useParams().filenum : props.filenum;
    const { isLoading, error, data } = useQuery(
        'fetchPatient' + filenum + '',
        () => fetch(URL.replace('{1}', filenum)).then((res) => res.json())
    )
    if (isLoading) {
        console.log('Loading...')
        return <div className="row p-1">Loading...</div>
    }
    if (error) {
        let errorMessage = error instanceof Error ? error.message : 'error'
        console.log('An error has occurred: ' + errorMessage)
        return (
            <div className="row p-1">
                {' '}
                {error instanceof Error ? error.message : 'error'}
            </div>
        )
    }
    //let patientList = patientListJSON.patientListJSON
    console.log('received data')
    console.log({ data })
    return <PatientCardView key={data.filenum} patientJSON={data} />
}
export default PatientLoader
