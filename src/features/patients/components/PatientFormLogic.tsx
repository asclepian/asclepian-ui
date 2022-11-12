import PatientFormView from './PatientFormView'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React from 'react'
import { parse, isDate } from 'date-fns'

/**
(
    id bigint NOT NULL,
    filenum character varying(255) COLLATE pg_catalog."default",

    cin character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    firstname character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default",
    birthdate date,

    address character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    postalcode integer NOT NULL,
    landline character varying(255) COLLATE pg_catalog."default",
    mobile character varying(255) COLLATE pg_catalog."default",
    
    active boolean NOT NULL,
    insured boolean NOT NULL,
    job character varying(255) COLLATE pg_catalog."default",
    createdon date,
    createdby integer,
 */
export interface PatientFormModel {
    id: number
    createdon: string
    createdby: string
    filenum: string
    email: string
    cin: string
    lastname: string
    firstname: string
    gender: string
    birthdate: Date
    address: string
    city: string
    postalcode: number
    landline: string
    mobile: string
    active: boolean
    insured: boolean
    job: string
    //... more fields here
}

const PatientFormSchema = yup.object().shape({
    filenum: yup.string().min(1).required(),
    email: yup.string().email().nullable(),
    cin: yup.string().min(5).required(),
    lastname: yup.string().min(2).required(),
    firstname: yup.string().min(2).required(),
    gender: yup.string().required().matches(/(M|F)/),
    birthdate: yup
        .string()
        .required()
        .transform((value, originalValue) => {
            return isDate(parse(originalValue, 'yyyy-MM-dd', new Date()))?originalValue:null;
        }),
    address: yup.string(),
    city: yup.string(),
    postalcode: yup.number(),
    landline: yup.string(),
    mobile: yup.string(),
    active: yup.boolean(),
    insured: yup.boolean(),
    job: yup.string(),
    //... more fields here
})

interface Props {
    defaultValues: PatientFormModel
    onSubmit: (data: PatientFormModel) => Promise<Response>
}

function PatientFormLogic({ defaultValues, onSubmit }: Props) {
    const form = useForm<PatientFormModel>({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(PatientFormSchema),
    })

    const handleSubmit = async (data: PatientFormModel) => {
        // console.log('received data in logic' + data)
        await onSubmit(data)
            .then(() => form.reset(data))
            .catch((err) => console.error(err))
    }

    return <PatientFormView form={form} onSubmit={handleSubmit} />
}

export default PatientFormLogic
