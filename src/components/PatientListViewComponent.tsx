import React from 'react';
import PatientView,{Patient} from './PatientViewComponent';

function PatientListView(patientListJSON:{patientListJSON: Patient[]}){
    let patientList = patientListJSON.patientListJSON;
    return  <div className="row p-0">
        {patientList.map(p => <PatientView key= {p.id} patientJSON={p}/>)}
    </div>
}
export default PatientListView