import React from 'react';
import styled from 'styled-components'

const UL = styled.ul``;
const LI = styled.li``;

const Interaction = styled.ul``;
const Item = styled.li`
background: #9FC131
`;



export default class PatientView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { patient: props.patient };
    }
    render() {
        return <div id={this.state.patient.filenum} className="patient">
            <UL className='patientData'>
                <LI><span>Dossier: {this.state.patient.filenum}</span></LI>
                <LI><span>{this.state.patient.lastname} {this.state.patient.firstname}</span></LI>
                <LI><span id="gender">{this.state.patient.gender}</span> <span id="birthdate">{this.state.patient.birthdate}</span></LI>
                <LI><span id="landline">{this.state.patient.landline}</span></LI>
                <LI><span id="mobile">{this.state.patient.mobile}</span></LI>
                <LI><span id="address">{this.state.patient.address}</span></LI>
                <LI><span id="city">{this.state.patient.city}</span></LI>
            </UL>
            <Interaction>
                <Item><a href='.'>Rafraichire</a></Item>
                <Item><a href='.'>Editer</a></Item>
                <Item><a href='.'>Sauvegarder</a></Item>
            </Interaction>

        </div>
    }
}