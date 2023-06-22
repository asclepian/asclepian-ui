import { Patient } from '../../../entities'
import React, { useEffect, useState } from 'react'
import usePatientStore from '../PatientStore'
import { PatientEditForm } from './PatientEditForm'
import { PatientEditNewForm } from './PatientEditNewForm'
import { useParams } from 'react-router-dom'
import { trpc } from '../../../utils/trpc'

// type PatientByFilenumOptions = ReactQueryOptions['patients']['listAll']

function PatientEdit (): JSX.Element {
  const { filenum } = useParams()
  console.log('PatientEdit', `editing filenum: ${filenum ?? ''}`)

  const openEdits = usePatientStore(state => state.openEdits)
  const [patient, setPatient] = useState<Patient>()
  if (typeof filenum === 'undefined' || filenum === '') return <PatientEditNewForm/>
  useEffect(() => {
    if (typeof filenum !== 'undefined') {
      const openedPatient = openEdits.filter(p => { return p.filenum === filenum })
      console.log('PatientEdit', `found this in the store ${JSON.stringify(openedPatient)}`)
      if (openedPatient.length !== 0) {
        console.log('PatientEdit', `loading from store ${JSON.stringify(openedPatient[0])} type of ${typeof openedPatient[0].birthdate}`)
        setPatient(openedPatient[0])
      } else {
        const p = trpc.patients.byFilenum.useQuery(filenum).data
        console.log('PatientEdit', `loaded from api patient ${JSON.stringify(p)}`)
        if (p?.patient != null) setPatient(p.patient)
      }
    }
  }, [])
  if (typeof patient === 'undefined') return <div>loading data for patient</div>
  else return <PatientEditForm patient={patient}/>
}

export { PatientEdit }
