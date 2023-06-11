import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Patient } from '../../../entities'
import PatientView from './PatientView'

/**
 * loads a a Patient from the APi using the provided filenum either via the props if not via the useParams
 * @param props the filnum of the patiient
 * @returns the PatientCardView popuulateds by the loaded patient
 */

function PatientLoader (props: { filenum: string }): JSX.Element {
  const filenum = (props.filenum.length === 0) ? useParams().filenum : props.filenum
  if (typeof filenum === 'undefined') {
    // FIXME: handle erro fallback
    return <div>No Patient Specified</div>
  }
  const { isLoading, error, data } = useQuery<Patient, Error>([`fetchPatient${filenum}`], async () => await getPatient(filenum))
  if (isLoading) {
    // console.log('Loading...')
    return <div className="row p-1">Loading...</div>
  }
  if (error != null) {
    // console.log('An error has occurred: ' + errorMessage)
    return (
            <div className="row p-1">
                {error instanceof Error ? error.message : 'error'}
            </div>
    )
  }
  // let patientList = patientListJSON.patientListJSON
  // console.log('received data')
  // console.log({ data })
  if (typeof data === 'undefined') {
    // console.error('data received is undefined')
    return <div className="row p-1">{'data received is undefined'}</div>
  }
  return <PatientView patient={data} />
}
export default PatientLoader
