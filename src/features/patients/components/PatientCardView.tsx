import React, { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { Link } from 'react-router-dom'
import { Patient } from '../entities'
import usePatientStore from '../PatientStore'

interface ICollapseState {
  collapseMenu: boolean
}

function PatientCardView (props: { patientJSON: Patient }): JSX.Element {
  const patient: Patient = props.patientJSON
  const addPatientEdit = usePatientStore((state) => state.addPatient)
  const [collapseState, toggleCollapse] = useState<ICollapseState>({
    collapseMenu: true
  })
  return (
        <div
            style={{ width: '16rem', margin: '0.1rem' }}
            className={
                'patient-container px-1 card h-100 ' +
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
                    <a
                        onClick={() => {
                          toggleCollapse((prevState) => {
                            return {
                              ...prevState,
                              ...{
                                collapseMenu: !prevState.collapseMenu
                              }
                            }
                          })
                        }}
                        href={'#' + patient.filenum}
                        role="button"
                        aria-expanded="false"
                        aria-controls={patient.filenum + '_'}
                    >
                        {patient.lastname + ' ' + patient.firstname}
                    </a>
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
                <Collapse in={!collapseState.collapseMenu}>
                    <div className="card-text">
                        <ul>
                            <li className="mobile bi bi-phone">
                                {patient.mobile}
                            </li>
                            <li className="landline bi bi-telephone">
                                {patient.landline}
                            </li>
                            <li className="address bi bi-house-door">
                                {patient.address + ' ' + patient.city}
                            </li>
                        </ul>
                        <Link className="card-link" to={'/patients/edit/' + patient.filenum} onClick={() => addPatientEdit(patient)}>
                            Editer
                        </Link>
                        <a className="card-link" href="#">
                            Sauvegarder
                        </a>
                    </div>
                </Collapse>
            </div>
        </div>
  )
}

export default PatientCardView
