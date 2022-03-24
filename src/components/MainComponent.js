import React from "react";
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import About from './AboutComponent';
import EncounterView from "./EncounterViewComponent";
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import NavBar from "./NavBarComponent";
import PatientView from "./PatientViewComponent";
import theme from "../styles/theme"
import { ThemeProvider } from "styled-components";
import '../index.css'


const patientJSONString = '{ "id": 999, "filenum": "D999", "cin": "M3928945", "lastname": "Thornhill", "firstname": "Leonanie", "landline": "0", "insured": true, "active": true, "mobile": "953-286-3891", "gender": "M", "job": null, "birthdate": "1966-07-17", "address": "540 Hagan Circle", "city": null, "postalcode": 70241, "createdby": null, "createdon": null, "_links": { "self": { "href": "http://localhost:8090/patients/999" }, "patients": { "href": "http://localhost:8090/patients{?filenum,firstname,lastname,page,size}", "templated": true } } }';
const devPatientState = JSON.parse(patientJSONString);
    
const Container = styled.div`
display: grid;
height: 100vh;
background: ${props => props.theme.dominant};
font-family: ${props => props.theme.fonts.normal};
grid-template-rows: 1fr 10fr 10fr 1fr;
grid-template-columns: 0.2fr 10fr 10fr;
grid-template-areas:
    "header header header"
    "nav main main"
    "nav main main"
    "footer footer footer";
text-align: left;
grid-gap: 0.25rem;
.ReactCollapse--collapse {
    transition: height 500ms;
}

`;

export default function Main() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header />
                <NavBar />
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/patientView' element={<PatientView patient={devPatientState} />} />
                    <Route path='/encounterView' element={<EncounterView />} />
                </Routes>
                <Footer />
            </Container>
        </ThemeProvider>
    )
};