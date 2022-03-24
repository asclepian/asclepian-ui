import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const UL = styled.ul`
`;
const NavBarDiv = styled.div`
`;
export default function NavBar() {
    return (<NavBarDiv>
        <nav>
            <UL>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/patientView">patient</Link>
                <ul>
                    <li>lookup by id</li>
                    <li>lookup by name</li>
                </ul>
                </li>

                <li><Link to="/encounterView">encounter</Link>
                <ul>
                    <li>lookup by patient</li>
                    <li>lookup by date</li>
                </ul>
                </li>
   
            </UL>            
        </nav>
    </NavBarDiv>)
}