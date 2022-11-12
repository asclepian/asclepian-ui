import { globalConfig } from '../../../configuration/config'
import PatientFormLogic, { PatientFormModel } from './PatientFormLogic'
import { Patient } from '../../../entities/patients'
import React from 'react'

interface Props {
    patient: Patient
}
function PatientAPI({ patient }: Props) {
    async function handleSubmit(data: PatientFormModel) {
        console.log('received submit in API ' + { data })
        const submitData = {
            filenum: data.filenum,
            cin: data.cin,
            lastname: data.lastname,
            firstname: data.firstname,
            gender: data.gender,
            birthdate: data.birthdate,
            address: data.address,
            city: data.city,
            postalcode: data.postalcode,
            landline: data.landline,
            mobile: data.mobile,
            email: data.email,
            active: data.active,
            insured: data.insured,
            job: data.job,
        }
        return fetch(globalConfig.config.apiUrl + '/patients/' + patient.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
        })
    }
    return (
        <PatientFormLogic defaultValues={patient} onSubmit={handleSubmit} />
    )
}

export default PatientAPI
