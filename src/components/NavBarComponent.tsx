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

const views = [home, lookup, patientList, encounter, queryPatient]

function className (
  navItem: NavigationItem,
  currentSelection: NavigationItem | undefined
): string {
  if (navItem === currentSelection) return EnumState.Selected + ' nav-item'
  else return 'nav-item'
}

const NavBar: FunctionComponent = () => {
  const [selection, setSelection] = useState<NavigationItem>()
  return (
        <nav className="col-md-1 d-none d-md-block sidebar bg-light">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    {views.map((element) => {
                      return (
                            <li
                                className={className(element, selection)}
                                onClick={() => {
                                  setSelection(element)
                                }}
                                key = {element.id}
                            >
                                <NavLink className="nav-link" to={element.link}>
                                    {element.text}
                                </NavLink>
                            </li>
                      )
                    })}
                </ul>
                <ul className="nav flex-column mb-2" id="openedItemsMenu"></ul>
            </div>
        </nav>
  )
}
export default NavBar
