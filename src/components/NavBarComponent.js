import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Collapse } from "react-collapse";
import { useState } from "react";

const NavBarDiv = styled.div`
grid-area: nav;
background:${props => props.theme.secondary};
padding: 5px;
border-radius: 25px 0px 25px 0px;
a{
    border-radius:15px;
    padding: 5px;
    color:${props => props.theme.dominant};
};
a:hover {
    color:${props => props.theme.dominant};
    background-color:${props => props.theme.accent};
    border-radius: 15px 0 15px 0;
}
`;
const Nav = styled.nav`

`;
const UL = styled.ul`
list-style-type:none;
padding-left:0;
border-radius: 15px 0 15px 0;
border-width: 2px;
font-family: ${props => props.theme.fonts.bold};
`;
const LI = styled.li`
border-radius: 15px 0 15px 0;
padding: 5px;
margin: 5px;
font-size: 1.5em;
opacity: 1;
`;
const Ul = styled.ul`
padding-left:1em;
font-size: 0.8em;
list-style: none;
position: relative;
`;
const Li = styled.li``;
let isPatientOpened = false;
let isEncounterOpened = false;

export default function NavBar() {
    const [isPatientOpened, setPatientOpened] = useState(false);
    const [isEncounterOpened, setEncounterOpened] = useState(false);
    return (<NavBarDiv>
        <Nav>
            <UL>
                <LI><Link to="/about">about</Link></LI>
                <LI><Link to="/home">home</Link></LI>
                <LI onMouseEnter={() => {setPatientOpened(true)}} onMouseLeave={() => setPatientOpened(false)}>
                    <Link to="/patientView">patient</Link>
                    <Collapse isOpened={isPatientOpened}>
                        <Ul>
                            <Li><a href="#">by id</a></Li>
                            <Li><a href="#">by name</a></Li>
                        </Ul>
                    </Collapse>
                </LI>

                <LI onMouseEnter={() => {setEncounterOpened(true)}} onMouseLeave={() => setEncounterOpened(false)}>
                    <Link to="/encounterView">encounter</Link>
                    <Collapse isOpened={isEncounterOpened}>
                        <Ul>
                            <Li><a href="#">by patient</a></Li>
                            <Li><a href="#">by date</a></Li>
                        </Ul>
                    </Collapse>
                </LI>

            </UL>
        </Nav>
    </NavBarDiv>)
}