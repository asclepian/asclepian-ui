import * as React from 'react'
import { Link } from 'react-router-dom'
import usePatientStore from '../PatientStore'

export default function PatientOpenedList (): JSX.Element {
  const openedPatients = usePatientStore((state) => state.openEdits)
  return (
        <div className="group relative block text-dominant px-3 rounded-full border-secondary border-2 hover:border-dominant hover:border-2">
            Dossiers Ouverts
            <div className="dropdown-content absolute p-1 hidden group-hover:block">
                <ul className='bg-secondary mt-2 border-2 border-light rounded-md p-2'>
                  {
                    openedPatients.map((p) => <li className ="w-60" key={p.filenum}><Link to={'/patients/edit/' + p.filenum}> #{p.filenum} {p.lastname} {p.firstname}</Link> </li>)
                  }
                </ul>
            </div>
        </div>
  )
}
