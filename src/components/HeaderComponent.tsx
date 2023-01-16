import React, { FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PatientOpenedList from '../features/patients/components/PatientOpenedList'

interface NavigationItem {
  text: string
  link: string
  id: string
}

const home: NavigationItem = { text: 'home', link: '/home', id: 'homeView' }
const lookup: NavigationItem = {
  text: 'rechercher',
  link: '/lookupView',
  id: 'lookupView'
}
const patientList: NavigationItem = {
  text: 'patients',
  link: '/patients',
  id: 'patientListView'
}

// const encounter: NavigationItem = {
//   text: 'enconter',
//   link: '/encounterView',
//   id: 'enconterView'
// }

// const queryPatient: NavigationItem = {
//   text: 'query patient',
//   link: '/patientViewQuery',
//   id: 'queryPatient'
// }

function className (
  navItem: NavigationItem,
  currentSelection: NavigationItem | undefined
): string {
  if (navItem === currentSelection) return 'text-secondary bg-dominant border-dominant px-3 rounded-full border-2 hover:bg-light'
  else return 'text-dominant px-3 rounded-full border-secondary border-2 hover:border-dominant hover:border-2'
}

const views = [home, lookup, patientList]

const Header: FunctionComponent = () => {
  const [selection, setSelection] = useState<NavigationItem>()
  return (
        // navbar navbar-expand-lg navbar-secondary fixed-top bg-secondary flex-md-nowrap p-0
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none bg-secondary">
            <div className="max-w-8xl max-auto">
                <div className="py-1 border-b border-dark/10 lg:px-2 lg:border-0">
                    <div className="relative flex items-center">
                    <a
                        className="text-dominant rounded-full px-2 mr-3 flex-none font-handfont text-5xl font-bold"
                        href="#"
                    >
                        Asclepian
                    </a>
                    <div className="relative flex items-center m-auto ">
                      <nav className="text-sm leading-6 font-semibold text-dark">
                      <ul className="flex space-x-0">
                            {views.map((element) => {
                              return (
                                    <li
                                        className={className(
                                          element,
                                          selection
                                        )}
                                        onClick={() => {
                                          setSelection(element)
                                        }}
                                        key={element.id}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to={element.link}
                                        >
                                            {element.text}
                                        </NavLink>
                                    </li>
                              )
                            })}
                            <li>
                              <PatientOpenedList/>
                            </li>
                        </ul>
                      </nav>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default Header
