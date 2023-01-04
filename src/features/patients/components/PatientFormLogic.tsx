import PatientFormView from './PatientFormView'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React from 'react'
import { parse, isDate } from 'date-fns'
import { Patient } from '../entities'

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
      return isDate(parse(originalValue, 'yyyy-MM-dd', new Date())) ? originalValue : null
    }),
  address: yup.string(),
  city: yup.string(),
  postalcode: yup.number(),
  landline: yup.string(),
  mobile: yup.string(),
  active: yup.boolean(),
  insured: yup.boolean(),
  job: yup.string()
  // ... more fields here
})

interface Props {
  defaultValues: Patient | undefined
  onSubmit: (data: Patient) => Promise<Response>
  isNew: boolean
}

function PatientFormLogic ({ defaultValues, onSubmit, isNew }: Props): JSX.Element {
  const form = useForm<Patient>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(PatientFormSchema)
  })

  // console.log(`loading form logic with ${JSON.stringify(defaultValues)}`)

  const handleSubmit = async (data: Patient): Promise<void> => {
    // console.log(`handliing submit witth data ${JSON.stringify(data)}`)
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err))
  }
  // console.log(`calling form view with form ${JSON.stringify(form.getValues())}`)
  return <PatientFormView form={form} onSubmit={handleSubmit} isNew={isNew} />
}

export default PatientFormLogic
