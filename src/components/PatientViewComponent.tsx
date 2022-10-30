import React from 'react'

export interface Patient {
    id: number
    filenum: string
    cin: string
    lastname: string
    firstname: string
    landline: string
    insured: boolean
    active: boolean
    mobile: string
    gender: string
    job: any
    birthdate: string
    address: string
    city: any
    postalcode: number
    createdby: any
    createdon: any
    _links?: any
}

function PatientView(patientJSON: { patientJSON: Patient }) {
    let patient: Patient = patientJSON.patientJSON
    return (
        <div
            style={{ width: '16rem' }}
            className={
                'patient-container px-1 card h-100 ' +
                (patient.active ? '' : ' text-muted')
            }
        >
            <div className="card-body p-3 position-relative">
            <span className={"badge rounded-pill position-absolute top-0 end-0 "+(patient.gender=='M'?"bg-info":"bg-warning")}>{patient.gender}</span>
            <span className={"badge rounded-pill position-absolute top-0 start-0 "+(patient.insured?"bg-danger":"bg-secondary")}>{patient.insured?"Mut":"Non"}</span>
                <h5 /*className={"card-title"+(patient.insured?" bi bi-bookmark-fill":"")}*/
                >
                    {patient.lastname + ' ' + patient.firstname}
                </h5>
                <h6 className="card-subtitle  mb-2 ">
                    {patient.birthdate} #{patient.id}
                </h6>
                <div className="card-text">
                    <ul>
                        <li className="mobile bi bi-phone">{patient.mobile}</li>
                        <li className="landline bi bi-telephone">
                            {patient.landline}
                        </li>
                        <li className="address bi bi-house-door">
                            {patient.address} {patient.city}
                        </li>
                    </ul>
                </div>
                <a className="card-link" href="#">
                    Editer
                </a>
                <a className="card-link" href="#">
                    Sauvegarder
                </a>
            </div>
        </div>
    )
}

export default PatientView
