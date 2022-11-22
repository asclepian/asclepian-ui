import PatientFormLogic from './PatientFormLogic'
import { postPatient, updatePatient } from '../services'
import { Patient } from '../entities'
import React from 'react'

interface Props {
    patient: Patient|undefined
}
function PatientAPIWrapper({ patient }: Props) {
    let isNewClient = typeof patient === 'undefined'
    async function handleSubmit(data: Patient) {
        console.log('received submit in API ' + { data })
        return isNewClient?postPatient(data):updatePatient(data)
    }
    return <PatientFormLogic defaultValues={patient} onSubmit={handleSubmit} isNew={isNewClient} />
}

export default PatientAPIWrapper
