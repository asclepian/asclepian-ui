import React from 'react'
import { FunctionComponent } from 'react'
import EncounerLookup from './EncounterLookupComponent'
import PatientLookup from './PatientLookupComponent'

const Lookup: FunctionComponent = () => {
    return (
        <div>
            <PatientLookup />
            <EncounerLookup />
        </div>
    )
}
export default Lookup
