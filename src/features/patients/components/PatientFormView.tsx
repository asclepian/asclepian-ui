import React, { KeyboardEvent, useEffect } from 'react'
import { UseFormRegister, UseFormReturn } from 'react-hook-form'
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

const generalInput = (params: InputParams, register: UseFormRegister<Patient>, errors: (() => string) | undefined): JSX.Element => {
  return (<div className="rounded-sm transition duration-150 ease-in-out focus-within:border-secondary border-gray-gray4 bg-light shadow-md">
    <label htmlFor="filenum" className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5">
        Numero De Dossier
    </label>
        <input
            id={params.id}
            className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-light"
            type={typeof params.type === 'undefined' ? 'text' : params.type}
            placeholder= {typeof params.placeholder === 'undefined' ? params.label : params.placeholder}
            readOnly= {typeof params.readonly === 'undefined' ? false : params.readonly}
            {...register('filenum')}
        />
    <div>{typeof errors === 'undefined' ? '' : errors() }</div>
</div>)
}

function PatientFormView ({ form, onSubmit, isNew }: Props): JSX.Element {
  const { formState, register, handleSubmit } = form
  const { errors, isSubmitting } = formState
  const removePatient = usePatientStore((state) => (state.removePatient))
  const patchPatient = usePatientStore((state) => (state.patchPatient))
  useEffect(() => {
    return () => patchPatient(form.getValues())
  }, [])
  const navigate = useNavigate()
  function checkKeyDown (e: KeyboardEvent): void {
    if (e.code === 'Enter') e.preventDefault()
  };
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
            {generalInput({ label: 'Numero de Dossier', id: 'filenum', readonly: false }, register, errors?.filenum?.message?.toString)}
            <div className="mb-3 row">
                <label htmlFor="lastname" className="col-sm-3 col-form-label">
                    Nom de famille
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="lastname"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="Saisir nom de famille"
                        {...register('lastname')}
                    />
                </div>
                <div>{errors?.lastname?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="firstname" className="col-sm-3 col-form-label">
                    Prénom
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="firstname"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="Saisir prénom"
                        {...register('firstname')}
                    />
                </div>
                <div>{errors?.firstname?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="cin" className="col-sm-3 col-form-label">
                    CIN
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="cin"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="Saisir CIN"
                        {...register('cin')}
                    />
                </div>
                <div>{errors?.cin?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="gender" className="col-sm-3 col-form-label">
                    Sexe
                </label>
                <div className="col-sm-9 py-12 d-flex align-items-center">
                    <select className='form-select' id="gender" {...register('gender')}>
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                    </select>
                </div>
                <div>{errors?.gender?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="birthdate" className="col-sm-3 col-form-label">
                    Date de naissance
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="birthdate"
                        className="shadow-sm form-control"
                        type="Date"
                        placeholder="date de naissance"
                        {...register('birthdate')}
                    />
                </div>
                <div>{errors?.birthdate?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="address" className="col-sm-3 col-form-label">
                    Adresse
                </label>
                <div className="col-sm-9 py-12">
                    <textarea
                        id="address"
                        className="shadow-sm form-control"
                        rows={3}
                        placeholder="Adresse"
                        {...register('address')}
                    ></textarea>
                </div>
                <div>{errors?.address?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="city" className="col-sm-3 col-form-label">
                    Ville
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="city"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="Ville"
                        {...register('city')}
                    />
                </div>
                <div>{errors?.city?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="postalcode" className="col-sm-3 col-form-label">
                    Code Postale
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="postalecode"
                        className="shadow-sm form-control"
                        type="number"
                        placeholder="Code Postale"
                        {...register('postalcode')}
                    />
                </div>
                <div>{errors?.postalcode?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="landline" className="col-sm-3 col-form-label">
                    Tel
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="landline"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="landline"
                        {...register('landline')}
                    />
                </div>
                <div>{errors?.landline?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="mobile" className="col-sm-3 col-form-label">
                    Mobile
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="mobile"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="mobile"
                        {...register('mobile')}
                    />
                </div>
                <div>{errors?.mobile?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="active" className="col-sm-3 col-form-label">
                    Compte actif
                </label>
                <div className="col-sm-9 py-12 d-flex align-items-center form-check form-switch">
                    <input className='form-check-input'
                        id="active"
                        // className="shadow-sm form-control"
                        type="checkbox"
                        placeholder="Actif"
                        {...register('active')}
                    />
                </div>
                <div>{errors?.active?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="insured" className="col-sm-3 col-form-label">
                    Mutualisé
                </label>
                <div className="col-sm-9 py-12 d-flex align-items-center form-check form-switch">
                    <input className="form-check-input"
                        id="insured"
                        // className="shadow-sm form-control"
                        type="checkbox"
                        placeholder="Mutualisé"
                        {...register('insured')}
                    />
                </div>
                <div>{errors?.insured?.message?.toString()}</div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="job" className="col-sm-3 col-form-label">
                    Mêtier
                </label>
                <div className="col-sm-9 py-12">
                    <input
                        id="job"
                        className="shadow-sm form-control"
                        type="text"
                        placeholder="Mêtier"
                        {...register('job')}
                    />
                </div>
                <div>{errors?.job?.message?.toString()}</div>
            </div>

            <div className="d-flex justify-content-between">
            <button className='bg-secondary text-white' disabled={isSubmitting} type="submit">
                Enregistrer
            </button>
            {
            // FIXME: cancelling should send to another view
            }
            <button className='bg-secondary text-white' disabled={isSubmitting} type="button" onClick={() => {
              removePatient(form.getValues())
              navigate('/patients')
            }}>
                Annuler
            </button>
            </div>
        </form>
  )
}

export default PatientFormView
