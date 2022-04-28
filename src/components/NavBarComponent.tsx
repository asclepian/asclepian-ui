import React, { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const iconHome = String(require('../icons/browse-page-64-secondary.png'))
const iconLookup = String(require('../icons/search-64-secondary.png'))
// import iconHomeHover from '../icons/home-64-accent.png'
// import iconHomeSelected from '../icons/home-64-dominant.png'

const NavBarDiv = styled.div`
    grid-area: nav;
    background: ${(props) => props.theme.dominantDark};
    border-color: ${(props) => props.theme.secondaryDark};
    border-right-style: solid;
    display: flex;
    ul {
        padding-left: 0em;
        font-size: 1em;
        list-style: none;
        position: relative;
    }
    li .navItem {
        padding: 1px;
        margin: 5px;
        font-size: 0.85em;
        opacity: 0.8;
        color: ${(props) => props.theme.secondaryDark};
        font-family: ${(props) => props.theme.fonts.normal};
    }
    .navItem img {
        width: 2em;
    }
    .navItem:hover {
        color: ${(props) => props.theme.accent};
        /* background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0) 100%
        ); */
        border-color: ${(props) => props.theme.accent};
        font-family: ${(props) => props.theme.fonts.bold};
        border-left-style: solid;
        opacity: 1;
    }
    li a {
        //color: ${(props) => props.theme.secondaryDark};
        // background-color:  ${(props) => props.theme.dominantDark};
        padding-left: 0.2em;
    }
`
const Nav = styled.nav`
    width: 3em;
`

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
        <NavBarDiv>
            <Nav>
                <ul>
                    <li
                        className={className(home, selection)}
                        onClick={() => {
                            setSelection(home)
                        }}
                        id={home.id}
                    >
                        <Link to={home.link}>
                            <img src={iconHome} alt={home.text} />
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
                            <img src={iconLookup} alt={lookup.text} />
                        </Link>
                    </li>
                </ul>
            </Nav>
        </NavBarDiv>
    )
}
export default NavBar
