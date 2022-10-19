import React from 'react'


function PatientView(patientJSON) {
    let patient = patientJSON.patientJSON;
    return (
        <div id={patient.filenum} className="patient-container">
            <div className='patient-data' gender={patient.gender}>
                {patient.lastname} {patient.firstname}
                <div>Dossier: {patient.id}</div>
                <div id="birthdate">{patient.birthdate}</div>
            </div>
            <div className='patient-contact'>
                <div id="landline">{patient.landline}</div>
                <div id="mobile">{patient.mobile}</div>
                <div id="address">{patient.address}</div>
                <div id="city">{patient.city}</div>
            </div>
            <div className="patient-control">
                <div><a href='#'>Rafraichire</a></div>
                <div><a href='#'>Editer</a></div>
                <div><a href='#'>Sauvegarder</a></div>
            </div>
        </div>
    )
}

export default PatientView;