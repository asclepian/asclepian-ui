import React, { FormEvent } from 'react'
import { InputParams, OptionParams, TextParams } from '../../../tools/formTools'

function NewPatientEditForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    console.log('handleSubmit#formData', Object.fromEntries(data))
    console.log('handleSubmit#formShape', Object.fromEntries(formshape))
  }
  const formshape = new Map<string, string>()
  return (
    <form className="p-2 bg-dominant"
      onKeyDown={k => {
        if (k.code === 'enter') k.preventDefault()
      }}
      onSubmit={handleSubmit}
    >
      <InputFormComponent label='Numero de Dossier' id='filenum' readonly={true} shape={formshape}/>
      <InputFormComponent label='Nom de famille' id='lastname' shape={formshape}/>
      <InputFormComponent label='Prénom' id='firstname' shape={formshape}/>
      <InputFormComponent label='CIN' id='cin' shape={formshape}/>
      <InputFormComponent label='Date de naissance' id='birthdate' type='date' shape={formshape}/>
      <OptionFormComponent label='Sexe' id='gender' shape={formshape} options={[
        { label: 'Homme', value: 'M' },
        { label: 'Femme', value: 'F' }
      ]} />
      <CheckboxFormComponent label='Marie' id='active' shape={formshape}/>
      <TextInputFormComponent label='Adresse' id='address' rows={3} shape={formshape}/>
      <InputFormComponent label='Ville' id='city' shape={formshape}/>
      <InputFormComponent label='Code Postal' id='postal' type='number' shape={formshape} />
      <InputFormComponent label='Tél' id='landline' shape={formshape}/>
      <InputFormComponent label='Email' id='email' shape={formshape}/>
      <InputFormComponent label='Téléphone' id='phone' shape={formshape}/>
      <InputFormComponent label='Mobile' id='mobile' shape={formshape}/>
      <CheckboxFormComponent label='Compte actif' id='active' shape={formshape}/>
      <CheckboxFormComponent label='Mutualiste' id='insured' shape={formshape}/>
      <InputFormComponent label='Profession' id='job' shape={formshape}/>
      <div className="flex justify-evenly">
        <button
          className="bg-secondary text-white"
          type="submit"
        >
          Enregistrer
        </button>
        <button
          // FIXME: notify when succefull
          className="bg-secondary text-white"
        >
          Annuler
        </button>
      </div>
    </form>)
}
function InputFormComponent(props: InputParams ) {
  props.shape?.set(props.id, typeof props.type === 'undefined' ? 'text' : props.type)
  
  return (
    <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
      <label
        htmlFor={props.id}
        className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
      >
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        type={typeof props.type === 'undefined' ? 'text' : props.type}
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        }
      />
      <div></div>
    </div>
  )
}
function TextInputFormComponent(props: TextParams) {
  props.shape?.set(props.id, typeof props.type === 'undefined' ? 'text' : props.type)
  
  return (
    <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
      <label
        htmlFor={props.id}
        className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
      >
        {props.label}
      </label>
      <textarea
        name={props.id}
        id={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        rows={props.rows}
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        }
      ></textarea>
      <div></div>
    </div>
  )
}

function OptionFormComponent(props: OptionParams) {
  props.shape?.set(props.id, typeof props.type === 'undefined' ? 'text' : props.type)
  
  return (
    <div className="flex mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
      <label
        htmlFor={props.id}
        className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
      >
        {props.label}
      </label>
      <div className="col-sm-9 py-1 d-flex align-items-center">
        <select
          name={props.id}
          className="form-select"
          id={props.id}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div></div>
    </div>)
}

function CheckboxFormComponent(props: InputParams) {
  props.shape?.set(props.id,'checkbox')
  
  return (
    <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
      <label
        htmlFor={props.id}
        className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
      >
        {props.label}
      </label>
      <input
        name={props.id}
        id={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        type="checkbox"
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        }
      />
    </div>
  )
}
export default NewPatientEditForm
