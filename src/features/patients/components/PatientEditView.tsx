import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PatientAPIWrappper from './PatientAPIWrapper'
import { getPatient } from '../services'
import { Patient } from '../entities'

function PatientEditView (): JSX.Element {
  const { filenum } = useParams()
  const [data, setData] = useState<Patient>()
  // console.log('editing patient ' + ((typeof filenum === 'undefined') ? 'with no param' : filenum))
  if (typeof filenum === 'undefined') return <PatientAPIWrappper patient={undefined} />
  useEffect(() => {
    getPatient(filenum).then((resp) => setData(resp)).catch((reason) => { console.error(reason) })
  }, [])
  if (typeof data === 'undefined') return <div>loading data for patient</div> // <PatientAPIWrappper patient={undefined} /> // <<div>loading data for patient</div>
  // console.log(`editing form with ${JSON.stringify(data)}`)
  return <PatientAPIWrappper patient={data} />
}
export default PatientEditView
