import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarDiv = styled.div`
grid-area: nav;
background:${props => props.theme.secondary};
background: linear-gradient(180deg,  ${props => props.theme.secondaryDark} 0%, ${props => props.theme.secondary} 78%, ${props => props.theme.secondaryLight} 100%);
// padding-top: 5em;
border-radius: 0em 0 0 0em;
display: flex;
ul {
    padding-left:1em;
    font-size: 1em;
    list-style: none;
    position: relative;
}
li navItem { 
    padding: 5px;
    margin: 5px;
    font-size: 0.85em;
    opacity: 0.8;
    color:${props => props.theme.dominant};
    font-family: ${props => props.theme.fonts.normal};
}
.navItem:hover {
    color:${props => props.theme.dominant};
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
    border-color: ${props => props.theme.accent};
    font-family: ${props => props.theme.fonts.bold};
    border-left-style: solid;
    opacity: 1;
}
li a {
    color:${props => props.theme.dominant};
    padding-left: 0.8em;
}
`;
const Nav = styled.nav`
width: 8em;
`;

enum EnumState {
    Selected = "selected",
    Unselected = "unselected"
}


interface NavigationItem {
    text: string;
    link: string;
    id: string;
}

let about: NavigationItem = { text: "about", link: "/about", id: "about" };
let home: NavigationItem = { text: "home", link: "/home", id: "home" };
let patientView: NavigationItem = { text: "patient", link: "/patientView", id: "patientView" };
let encounterView: NavigationItem = { text: "encounter", link: "/encounterView", id: "encounterView" };

function className(navItem: NavigationItem, currentSelection: NavigationItem | undefined): string {
    if(navItem == currentSelection) return EnumState.Selected + " navItem"; 
    else return "navItem";
}

const NavBar: FunctionComponent = () => {
    let [selection, setSelection] = useState<NavigationItem>();
    return (<NavBarDiv>
        <Nav>
            <ul>
                <li className={className(about, selection)} onClick={()=>{
                    setSelection(about);
                }} id={about.id}><Link to={about.link}>{about.text}</Link></li>
                <li className={className(home, selection)} onClick={()=>{
                    setSelection(home);
                }} id={home.id}><Link to={home.link}>{home.text}</Link></li>
                <li className={className(patientView, selection)} onClick={()=>{
                    setSelection(patientView);
                }} id={patientView.id}><Link to={patientView.link}>{patientView.text}</Link></li>
                <li className={className(encounterView, selection)} onClick={()=>{
                    setSelection(encounterView);
                }} id={encounterView.id}><Link to={encounterView.link}>{encounterView.text}</Link></li>

            </ul>
        </Nav>
    </NavBarDiv>)
}
export default NavBar;