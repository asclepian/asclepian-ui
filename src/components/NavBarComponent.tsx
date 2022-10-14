import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const iconHome = String(require('../icons/browse-page-64-secondary.png'));
const iconLookup = String(require('../icons/search-64-secondary.png'));
const iconHomeSelected = String(require('../icons/browse-page-64-accent.png'));
const iconLookupSelected = String(require('../icons/search-64-accent.png'));
// import iconHomeHover from '../icons/home-64-accent.png';
// import iconHomeSelected from '../icons/home-64-dominant.png'


enum EnumState {
    Selected = 'selected',
    Unselected = 'unselected',
}

interface NavigationItem {
    text: string
    link: string
    id: string
}

let home: NavigationItem = { text: 'home', link: '/home', id: 'home' }
let lookup: NavigationItem = {
    text: 'rechercher',
    link: '/lookupView',
    id: 'lookupView',
}

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
                    <li
                        className={className(home, selection)}
                        onClick={() => {
                            setSelection(home)
                        }}
                        id={home.id}
                    >
                        <Link className="nav-link" to={home.link}>
                            home
                        </Link>
                    </li>
                    <li
                        className={className(lookup, selection)}
                        onClick={() => {
                            setSelection(lookup)
                        }}
                        id={lookup.id}
                    >
                        <Link className="nav-link" to={lookup.link}>
                            lookup
                        </Link>
                    </li>
                </ul>
                <ul className="nav flex-column mb-2" id="openedItemsMenu"></ul>
            </div>
        </nav>
    )
}
export default NavBar
