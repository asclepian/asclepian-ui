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
  const openEdits = usePatientStore(state => state.openEdits)
  const [patient, setPatient] = useState<Patient>()
  if (typeof filenum === 'undefined' || filenum === '') return <PatientEditNewForm/>
  useEffect(() => {
    if (typeof filenum !== 'undefined') {
      const openedPatient = openEdits.filter(p => { return p.filenum === filenum })
      if (openedPatient.length !== 0) {
        setPatient(openedPatient[0])
      } else {
        const p = trpc.patients.byFilenum.useQuery(filenum).data
        if (p?.patient != null) setPatient(p.patient)
      }
    }
  }, [])
  if (typeof patient === 'undefined') return <div>loading data for patient</div>
  else return <PatientEditForm patient={patient}/>
}

export { PatientEdit }
