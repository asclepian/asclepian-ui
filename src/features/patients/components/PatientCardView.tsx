import React from 'react'
import { Link } from 'react-router-dom'
import { Patient } from '../entities'
import usePatientStore from '../PatientStore'

function PatientCardView (props: { patientJSON: Patient }): JSX.Element {
  const patient: Patient = props.patientJSON
  const addPatientEdit = usePatientStore((state) => state.addPatient)
  return (
        <div
            className={
                'border-black border-2 p-1 w-64 h-auto ' +
                (patient.active ? '' : ' text-muted')
            }
            id={'patient' + patient.filenum}
        >
            <div className="card-body p-3 position-relative">
                <span
                    className={
                        'badge rounded-pill position-absolute top-0 start-0 ' +
                        (patient.insured ? 'bg-danger' : '')
                    }
                >
                    {patient.insured ? 'A' : ''}
                </span>
                <h5 className="card-title">
                    <Link className="card-link" to={'/patients/' + patient.filenum}>{patient.lastname + ' ' + patient.firstname}</Link>
                </h5>
                <h6
                    className={
                        'card-subtitle mb-2 bi ' +
                        (patient.gender === 'M'
                          ? 'bi-gender-male'
                          : 'bi-gender-female')
                    }
                >
                    {patient.birthdate + '#' + patient.id.toString()}
                </h6>
                <div className="card-text">
                    <ul>
                        <li className="mobile bi bi-phone">{patient.mobile}</li>
                        <li className="landline bi bi-telephone">
                            {patient.landline}
                        </li>
                        <li className="address bi bi-house-door">
                            {patient.address + ' ' + patient.city}
                        </li>
                    </ul>
                    <Link
                        className="card-link"
                        to={'/patients/edit/' + patient.filenum}
                        onClick={() => addPatientEdit(patient)}
                    >
                        Editer
                    </Link>
                    <a className="card-link" href="#">
                        Sauvegarder
                    </a>
                </div>
            </div>
        </div>
  )
}

export default PatientCardView
