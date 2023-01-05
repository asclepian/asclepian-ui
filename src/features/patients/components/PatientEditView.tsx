import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PatientAPIWrappper from './PatientAPIWrapper'
import { getPatient } from '../services'
import { Patient } from '../entities'
import usePatientStore from '../PatientStore'

interface Props { patient?: Patient}

function PatientEditView (props: Props): JSX.Element {
  const { filenum } = useParams()
  // console.log('editing patient ' + ((typeof filenum === 'undefined') ? 'with no param' : filenum))
  if (typeof props?.patient !== 'undefined') {
    return <PatientAPIWrappper patient={props.patient} />
  } else if (typeof filenum === 'undefined') return <PatientAPIWrappper patient ={undefined}/>
  // check if the pqtient was already opened for edit, if yes resume the edit
  const openEdits = usePatientStore(state => state.openEdits)
  const openedPatient = openEdits.filter(p => { return p.filenum === filenum })
  if (openedPatient.length !== 0) {
    console.log(`found patient already opened: ${JSON.stringify(openedPatient[0])}`)
    return <PatientAPIWrappper patient={openedPatient[0]} />
  }
  // else load it from API
  const [data, setData] = useState<Patient>()
  useEffect(() => {
    getPatient(filenum).then((resp) => setData(resp)).catch((reason) => { console.error(reason) })
  }, [])
  if (typeof data === 'undefined') return <div>loading data for patient</div> // <PatientAPIWrappper patient={undefined} /> // <<div>loading data for patient</div>
  // console.log(`editing form with ${JSON.stringify(data)}`)
  return <PatientAPIWrappper patient={data} />
}
export default PatientEditView
