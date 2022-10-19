import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import EncounterView from './EncounterViewComponent'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import NavBar from './NavBarComponent'
import PatientView from './PatientViewComponent'
import LookupView from './LookupViewComponent'
import AddEntityView from './AddViewComponent'

const patientJSONString =
    '{ "id": 999, "filenum": "D999", "cin": "M3928945", "lastname": "Thornhill", "firstname": "Leonanie", "landline": "0", "insured": true, "active": true, "mobile": "953-286-3891", "gender": "M", "job": null, "birthdate": "1966-07-17", "address": "540 Hagan Circle", "city": null, "postalcode": 70241, "createdby": null, "createdon": null, "_links": { "self": { "href": "http://localhost:8090/patients/999" }, "patients": { "href": "http://localhost:8090/patients{?filenum,firstname,lastname,page,size}", "templated": true } } }'
const devPatientState = JSON.parse(patientJSONString)

const Main: FunctionComponent = () => {
    return (
        <div className="app-container ">
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <NavBar />
                    <main
                        className="col-md-9 ms-sm-auto col-lg-10 px-4"
                        role="main"
                    >
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route
                                path="/patientView"
                                element={
                                    <PatientView patientJSON={devPatientState} />
                                }
                            />
                            <Route
                                path="/encounterView"
                                element={<EncounterView />}
                            />
                            <Route
                                path="/lookupView"
                                element={<LookupView />}
                            />
                            <Route
                                path="/AddEntityView"
                                element={<AddEntityView />}
                            />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Main
