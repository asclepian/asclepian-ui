import React, { FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'

const enum EnumState {
  Selected = 'selected',
  Unselected = 'unselected',
}

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
const encounter: NavigationItem = {
  text: 'enconter',
  link: '/encounterView',
  id: 'enconterView'
}

const queryPatient: NavigationItem = {
  text: 'query patient',
  link: '/patientViewQuery',
  id: 'queryPatient'
}

function className (
  navItem: NavigationItem,
  currentSelection: NavigationItem | undefined
): string {
  if (navItem === currentSelection) return EnumState.Selected + ' nav-item'
  else return 'nav-item'
}

const views = [home, lookup, patientList, encounter, queryPatient]

const Header: FunctionComponent = () => {
  const [selection, setSelection] = useState<NavigationItem>()
  return (
    // navbar navbar-expand-lg navbar-secondary fixed-top bg-secondary flex-md-nowrap p-0
    <nav className="bg-violet-800 flex p-0">
      <a className="navbar-brand col-sm-3 col-md-1 col-lg-1 mr-0" href="#">
        Company name
      </a>
      {/* <input
                className="form-control form-control-dark w-100"
                type="text"
                placeholder="Search"
                aria-label="Search"
            /> */}
      <div className=" collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {views.map((element) => {
            return (
              <li
                className={className(element, selection)}
                onClick={() => {
                  setSelection(element)
                }}
                key={element.id}
              >
                <NavLink className="nav-link" to={element.link}>
                  {element.text}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default Header
