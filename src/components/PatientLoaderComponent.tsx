import React from 'react'
import PatientView from './PatientViewComponent'
import { useQuery } from 'react-query'
import { globalConfig } from '../Configuration/config'
const URL = globalConfig.config.apiUrl + '/patients?exactFilenum={1}'

function PatientLoader(props: {filenum:string}){
    const { isLoading, error, data } = useQuery('fetchPatient'+props.filenum, () =>
        fetch(URL.replace('{1}',props.filenum)).then((res) =>
            res.json()
        )
    )
    if (isLoading) {
        console.log('Loading...')
        return <div className="row p-1">Loading...</div>
    }
    if (error) {
        console.log(
            'An error has occurred: ' + (error instanceof Error)
                ? error.message
                : 'error'
        )
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
    return (
                      <PatientView key={data.filenum} patientJSON={data} />

    )
}
export default PatientLoader
