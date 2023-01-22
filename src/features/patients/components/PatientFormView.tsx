import React, { KeyboardEvent, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Patient } from '../entities'
import usePatientStore from '../PatientStore'

interface Props {
  form: UseFormReturn<Patient>
  onSubmit: (data: Patient) => any
  isNew: boolean
}
interface InputParams {
  label: string
  id: string
  type?: string
  placeholder?: string
  readonly?: boolean
}
interface TextParams extends InputParams {
  rows: number
}
interface OptionParams extends InputParams {
  options: Array<{ label: string, value: string }>
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
  params: OptionParams,
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
                    {params.options.map((option) => (
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
  params: TextParams,
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

function PatientFormView ({ form, onSubmit, isNew }: Props): JSX.Element {
  const { formState, register, handleSubmit } = form
  const { errors, isSubmitting } = formState
  const removePatient = usePatientStore((state) => state.removePatient)
  const patchPatient = usePatientStore((state) => state.patchPatient)
  useEffect(() => {
    return () => patchPatient(form.getValues())
  }, [])
  const navigate = useNavigate()
  function checkKeyDown (e: KeyboardEvent): void {
    if (e.code === 'Enter') e.preventDefault()
  }
  //   console.log(`opened form view with ${JSON.stringify(form.getValues())}`)
  return (
        <form
            className="p-2 bg-dominant"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit, (erros) => {
              console.error(erros)
            })}
            onKeyDown={(e) => checkKeyDown(e)}
        >
            {generalInput(
              { label: 'Numero de Dossier', id: 'filenum', readonly: true },
              register,
              errors?.filenum?.message
            )}
            {generalInput(
              { label: 'Nom de famille', id: 'lastname' },
              register,
              errors?.lastname?.message
            )}
            {generalInput(
              { label: 'Prenom', id: 'firstname' },
              register,
              errors?.firstname?.message
            )}
            {generalInput(
              { label: 'CIN', id: 'cin' },
              register,
              errors?.cin?.message
            )}
            {optionInput(
              {
                label: 'Sexe',
                id: 'gender',
                options: [
                  { label: 'Homme', value: 'M' },
                  { label: 'Femme', value: 'F' }
                ]
              },
              register,
              errors?.cin?.message
            )}
            {generalInput(
              { label: 'Date de naissance', id: 'birthdate', type: 'Date' },
              register,
              errors?.birthdate?.message
            )}
            {textInput(
              { label: 'Adresse', id: 'address', rows: 3 },
              register,
              errors?.address?.message
            )}
            {generalInput(
              { label: 'Ville', id: 'city' },
              register,
              errors?.city?.message
            )}
            {generalInput(
              { label: 'Code Postale', id: 'postalcode', type: 'number' },
              register,
              errors?.postalcode?.message
            )}
            {generalInput(
              { label: 'Tel', id: 'landline' },
              register,
              errors?.landline?.message
            )}
            {generalInput(
              { label: 'Mobile', id: 'mobile' },
              register,
              errors?.mobile?.message
            )}
            {checkboxInput(
              { label: 'Compte actif', id: 'active' },
              register,
              errors?.active?.message
            )}
            {checkboxInput(
              { label: 'Mutualise', id: 'insured' },
              register,
              errors?.insured?.message
            )}
            {generalInput(
              { label: 'Metier', id: 'job' },
              register,
              errors?.job?.message
            )}

            <div className="flex justify-evenly">
                <button
                    className="bg-secondary text-white"
                    disabled={isSubmitting}
                    type="submit"
                >
                    Enregistrer
                </button>
                <button
                // FIXME: notify when succefull
                    className="bg-secondary text-white"
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => {
                      removePatient(form.getValues())
                      navigate('/patients')
                    }}
                >
                    Annuler
                </button>
            </div>
        </form>
  )
}

export default PatientFormView
