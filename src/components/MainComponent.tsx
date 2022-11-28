import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'

import EncounterView from './EncounterViewComponent'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import NavBar from './NavBarComponent'
import {
  PatientEditView,
  PatientListView,
  PatientLoader
} from '../features/patients'
import LookupView from './LookupViewComponent'

const Main: FunctionComponent = () => (
    <div className="app-container ">
        <Header />
        <div className="container-fluid">
            <div className="row">
                <NavBar />
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
                                path=":filenum"
                                element={<PatientLoader filenum="" />}
                            />
                            <Route
                                path="edit/:filenum"
                                element={<PatientEditView />}
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
