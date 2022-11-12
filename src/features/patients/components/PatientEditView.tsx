import React from 'react'
import  {useParams} from 'react-router-dom' 
import PatientAPI from './PatientAPI'
import { useQuery } from 'react-query'
import { globalConfig } from "../../../configuration/config";
const URL = globalConfig.config.apiUrl+'/patients?size={1}&page={2}'


function PatientEditView() {
    let {filenum} = useParams();

    const { isLoading, error, data } = useQuery('patient'+filenum, () =>
        fetch(globalConfig.config.apiUrl+'/patients?exactFilenum='+filenum).then((res) => res.json())
    )
    if (isLoading) {
        // console.log('Loading...');
        return <div className="row p-1">Loading...</div>
    }
    if (error){
        let errorMessage = (error instanceof Error)?error.message:'error';
        // console.log('An error has occurred: ' + errorMessage);
        return <div className="row p-1"> {errorMessage}</div>
    }

    // console.log('received data within: ' + PatientEditView.name+' => '+{data})
    return (
   <PatientAPI patient={data} /> 
    )
}
export default PatientEditView
