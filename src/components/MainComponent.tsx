import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'

import EncounterView from './EncounterViewComponent'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import {
  NewPatientEditForm,
  PatientListView,
  PatientLoader
} from '../features/patients'
import LookupView from './LookupViewComponent'
import { PatientEdit, New } from '../features/patients/components/PatientEdit'

const Main: FunctionComponent = () => (
    <div className="antialiased text-dark bg-light flex flex-row">
        <Header />
        <div className="container-fluid">
            <div className="row">
                <main
                    className="col-md-11 ms-sm-auto col-lg-11 px-2"
                    role="main"
                >
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />

                        <Route path="patients">
                            <Route index element={<PatientListView />} />
                            <Route
                                path="edit/:filenum"
                                element={<PatientEdit/>}
                            />
                            <Route
                                path="new"
                                element={<PatientEdit/>}
                            />
                            <Route
                                path="newEdit"
                                element={<NewPatientEditForm/>}
                            />
                            <Route
                                path=":filenum"
                                element={<PatientLoader filenum="" />}
                            />
                        </Route>
                        <Route
                            path="/encounterView"
                            element={<EncounterView />}
                        />
                        <Route path="/lookupView" element={<LookupView />} />
                    </Routes>
                </main>
            </div>
        </div>
    </div>
)

export default Main
