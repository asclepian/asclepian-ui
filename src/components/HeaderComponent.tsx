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
        <div className="sticky top-0 z-40 h-screen w-fit backdrop-blur bg-secondary rounded-r-3xl flex">
            <div className="max-h-full max-w-fit">
                <div className="py-1 border-b border-dark/10 lg:px-2 lg:border-0 flex flex-col">
                    <div className="relative flex flex-col items-center ml-0 w-32">
                    <a
                        className="text-dominant font-handfont text-5xl font-bold mb-24 ml-0"
                        href="#"
                    >
                        Asclepian
                    </a>
                    <div className="relative items-center ml-0 ">
                      <nav className="text-sm leading-6 font-semibold text-dark">
                      <ul className="space-x-0">
                            {views.map((element) => {
                              return (
                                    <li
                                        className={className(
                                          element,
                                          selection
                                        )}
                                        key={element.id}
                                    >
                                        <NavLink
                                        onClick={() => {
                                          setSelection(element)
                                        }}
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
