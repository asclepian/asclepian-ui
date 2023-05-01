import React from 'react'
import { Patient } from '../entities'

const PatientView = (props: { patient: Patient }) => {
  return (<pre>{JSON.stringify(props.patient, null, 3)}</pre>)
}
export default PatientView
