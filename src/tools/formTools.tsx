import React from 'react'
import { z } from 'zod'
import { Patient } from '../entities'
import { format } from 'date-fns'
interface InputParams {
    label: string
    id: string
    type?: string
    placeholder?: string
    readonly?: boolean
    value?: string
    shape?: Map<string, string>
    rows?: number
    options?: Array<{ label: string, value: string }>
}

const generalInput = (
    params: InputParams,
    register: any,
    errors: string | undefined
): JSX.Element => {
    return (
        <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
            <label
                htmlFor={params.id}
                className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
            >
                {params.label}
            </label>
            <input
                id={params.id}
                className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
                type={typeof params.type === 'undefined' ? 'text' : params.type}
                placeholder={
                    typeof params.placeholder === 'undefined'
                        ? params.label
                        : params.placeholder
                }
                readOnly={
                    typeof params.readonly === 'undefined'
                        ? false
                        : params.readonly
                }
                {...register(params.id)}
            />
            <div>{typeof errors === 'undefined' ? '' : errors}</div>
        </div>
    )
}

const optionInput = (
    params: InputParams,
    register: any,
    errors: string | undefined
): JSX.Element => {
    return (
        <div className="flex mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
            <label
                htmlFor={params.id}
                className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
            >
                {params.label}
            </label>
            <div className="col-sm-9 py-1 d-flex align-items-center">
                <select
                    className="form-select"
                    id={params.id}
                    {...register(params.id)}
                >
                    {params.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>{typeof errors === 'undefined' ? '' : errors}</div>
        </div>
    )
}

const textInput = (
    params: InputParams,
    register: any,
    errors: string | undefined
): JSX.Element => {
    return (
        <div className="mb-5 row rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
            <label
                htmlFor={params.id}
                className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
            >
                {params.label}
            </label>
            <textarea
                id={params.id}
                className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
                type="text"
                placeholder={
                    typeof params.placeholder === 'undefined'
                        ? params.label
                        : params.placeholder
                }
                rows={params.rows}
                readOnly={
                    typeof params.readonly === 'undefined'
                        ? false
                        : params.readonly
                }
                {...register(params.id)}
            ></textarea>
            <div>{typeof errors === 'undefined' ? '' : errors}</div>
        </div>
    )
}

const checkboxInput = (
    params: InputParams,
    register: any,
    errors: string | undefined
): JSX.Element => {
    return (
        <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
            <label
                htmlFor={params.id}
                className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
            >
                {params.label}
            </label>
            <input
                id={params.id}
                className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
                type="checkbox"
                placeholder={
                    typeof params.placeholder === 'undefined'
                        ? params.label
                        : params.placeholder
                }
                readOnly={
                    typeof params.readonly === 'undefined'
                        ? false
                        : params.readonly
                }
                {...register(params.id)}
            />
            <div>{typeof errors === 'undefined' ? '' : errors}</div>
        </div>
    )
}
const PatientSchema = z.object({
    filenum: z.string().min(1),
    email: z.string().email().nullable(),
    cin: z.string().min(5).nullable(),
    lastname: z.string().min(2),
    firstname: z.string().min(2),
    gender: z.string().regex(/(M|F)/).nullable(),
    birthdate: z.string(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    postalcode: z.number().nullable(),
    landline: z.string().nullable(),
    mobile: z.string().nullable(),
    active: z.boolean(),
    insured: z.boolean(),
    job: z.string().nullable(),
    id: z.number().nullable()
})

type PatientFormType = z.infer<typeof PatientSchema>

function encodePatientToFormType(patient: Patient): PatientFormType {
    console.log('encodePatientToFormType', JSON.stringify(patient.birthdate))
    return { ...patient, birthdate: format(patient.birthdate, 'yyyy-MM-dd') }
}

function decodePatientFromFormType(patient: PatientFormType): Patient {
    console.log('decodePatientFromFormType', JSON.stringify(patient.birthdate))
    return { ...patient, birthdate: new Date(patient.birthdate), id: 0, createdon: new Date(), createdby: null }
}
export { generalInput, optionInput, textInput, checkboxInput, type InputParams }
export { encodePatientToFormType, decodePatientFromFormType, type PatientFormType, PatientSchema }
