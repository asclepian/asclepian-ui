import { globalConfig } from '../Configuration/config'
import EditPatientLogic, {
    EditPatientFormModel,
} from './EditPatientLogicComponent'
import {Patient} from '../entities/patients'
import React from 'react'

interface Props { 
    patient: Patient
}
function EditPatientAPI({patient}:Props){
    async function handleSubmit(data: EditPatientFormModel) {
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
            active: data.active,
            insured: data.insured,
            job: data.job,
        }
        return fetch(globalConfig.config.apiUrl+'/patients', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
        })
    }
    const defaultValues : EditPatientFormModel = patient ;
    return <EditPatientLogic defaultValues={patient} onSubmit={handleSubmit}/>
}

export default EditPatientAPI;
