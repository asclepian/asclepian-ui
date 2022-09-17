import React from 'react';


export default class PatientView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { patient: props.patient };
    }
    render() {
        return <div id={this.state.patient.filenum} className="patient container">
            <ul className='patientData'>
                <li><span>Dossier: {this.state.patient.filenum}</span></li>
                <li><span>{this.state.patient.lastname} {this.state.patient.firstname}</span></li>
                <li><span id="gender">{this.state.patient.gender}</span> <span id="birthdate">{this.state.patient.birthdate}</span></li>
                <li><span id="landline">{this.state.patient.landline}</span></li>
                <li><span id="mobile">{this.state.patient.mobile}</span></li>
                <li><span id="address">{this.state.patient.address}</span></li>
                <li><span id="city">{this.state.patient.city}</span></li>
            </ul>
            <Interaction>
                <Item><a href='.'>Rafraichire</a></Item>
                <Item><a href='.'>Editer</a></Item>
                <Item><a href='.'>Sauvegarder</a></Item>
            </Interaction>

        </div>
    }
}