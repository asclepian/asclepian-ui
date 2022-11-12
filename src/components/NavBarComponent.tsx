import React, { FunctionComponent, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


enum EnumState {
    Selected = 'selected',
    Unselected = 'unselected',
}

interface NavigationItem {
    text: string
    link: string
    id: string
}

let home: NavigationItem = { text: 'home', link: '/home', id: 'homeView' }
let lookup: NavigationItem = {
    text: 'rechercher',
    link: '/lookupView',
    id: 'lookupView',
}
let patient: NavigationItem = {
    text: 'patient',
    link: '/patientView',
    id: 'patientView',
}
let patientList: NavigationItem = {
    text: 'patients',
    link: '/patientListView',
    id: 'patientListView',
}
let encounter: NavigationItem = {
    text: 'enconter',
    link: '/encounterView',
    id: 'enconterView',
}

let queryPatient:NavigationItem = {
    text: 'query patient',
    link: '/patientViewQuery',
    id: 'queryPatient',
}

let views = [ home, lookup, patient, patientList, encounter, queryPatient];

function className(
    navItem: NavigationItem,
    currentSelection: NavigationItem | undefined
): string {
    if (navItem == currentSelection) return EnumState.Selected + ' nav-item'
    else return 'nav-item'
}

const NavBar: FunctionComponent = () => {
    let [selection, setSelection] = useState<NavigationItem>()
    return (
        <nav className="col-md-2 d-none d-md-block sidebar bg-light">
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