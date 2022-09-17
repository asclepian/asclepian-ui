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
    if (navItem == currentSelection) return EnumState.Selected + ' navItem'
    else return 'navItem'
}

const NavBar: FunctionComponent = () => {
    let [selection, setSelection] = useState<NavigationItem>()
    return (
            <div>
                <ul>
                    <li
                        className={className(home, selection)}
                        onClick={() => {
                            setSelection(home)
                        }}
                        id={home.id}
                    >
                        <Link to={home.link}>
                            <img
                                src={
                                    home == selection
                                        ? iconHomeSelected
                                        : iconHome
                                }
                                alt={home.text}
                            />
                        </Link>
                    </li>
                   <li
                        className={className(lookup, selection)}
                        onClick={() => {
                            setSelection(lookup)
                        }}
                        id={lookup.id}
                    >
                        <Link to={lookup.link}>
                            <img
                                src={
                                    lookup == selection
                                        ? iconLookupSelected
                                        : iconLookup
                                }
                                alt={lookup.text}
                            />
                        </Link>
                    </li> 
                </ul>
                <ul id="openedItemsMenu"></ul>
            </div>
    )
}
export default NavBar
