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


const patientJSONString = '{ "id": 999, "filenum": "D999", "cin": "M3928945", "lastname": "Thornhill", "firstname": "Leonanie", "landline": "0", "insured": true, "active": true, "mobile": "953-286-3891", "gender": "M", "job": null, "birthdate": "1966-07-17", "address": "540 Hagan Circle", "city": null, "postalcode": 70241, "createdby": null, "createdon": null, "_links": { "self": { "href": "http://localhost:8090/patients/999" }, "patients": { "href": "http://localhost:8090/patients{?filenum,firstname,lastname,page,size}", "templated": true } } }';
const devPatientState = JSON.parse(patientJSONString);

const BackgroundColor = "#FBF8F3";
const SecondaryColor = " #464D78";
const AccentColor = "#4AB097";

const Container = styled.div`
display: grid;
height: 100vh;
background: ${BackgroundColor};
grid-template-rows: 0.2fr 1fr 1fr 0.2fr
grid-template-areas:
    "header header header header"
    "nav main main sidebar"
    "nav main main sidebar"
    "nav footer footer footer";
text-align: left;
grid-gap: 0.25rem;

`;

export default function Main() {
    return (
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
    )
};