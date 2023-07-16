import { FormEvent } from 'react'
import z from 'zod'
import { InputParams } from '../../../tools/formTools'
import { PatientSchema } from '../../../tools/formTools'
import { stringify } from 'querystring'

type PatientInferedType = z.infer<typeof PatientSchema>
const patientData: PatientInferedType = {
  id: 999,
  filenum: "D999",
  cin: "M3928945",
  lastname: "Thornhill",
  firstname: "Leonanie",
  landline: "0",
  insured: true,
  active: true,
  email: null,
  mobile: "953-286-3891",
  gender: "F",
  job: null,
  birthdate: "1966-07-17",
  address: "540 Hagan Circle",
  city: null,
  postalcode: 70241,
  createdby: null,
  createdon: null
}

const formFieldsParams: InputParams[] = [{ label: 'Numero de Dossier', id: 'filenum', readonly: true },
{ label: 'Nom de famille', id: 'lastname' },
{ label: 'Prénom', id: 'firstname' },
{ label: 'CIN', id: 'cin' },
{ label: 'Date de naissance', id: 'birthdate', type: 'date' },
{ label: 'Sexe', id: 'gender', type: 'option', options: [{ label: 'Homme', value: 'M' }, { label: 'Femme', value: 'F' }] },
{ label: 'Marie', id: 'maried', type: 'checkbox' },
{ label: 'Adresse', id: 'address', type: 'textarea', rows: 3 },
{ label: 'Ville', id: 'city' },
{ label: 'Code Postal', id: 'postal', type: 'number' },
{ label: 'Tél', id: 'landline', type: 'tel' },
{ label: 'Email', id: 'email', type: 'email' },
{ label: 'Mobile', id: 'mobile', type: 'tel' },
{ label: 'Compte actif', id: 'active', type: 'checkbox' },
{ label: 'Mutualiste', id: 'insured', type: 'checkbox' },
{ label: 'Profession', id: 'job' }]

function NewPatientEditForm(defaultValue: PatientInferedType | null) {
  defaultValue = patientData
  console.log('InputFormComponent',JSON.stringify(defaultValue))
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
      {
        formFieldsParams.map(ff => <InputFormComponent
          key={'inputField#' + ff.id}
          shape={formshape}
          value={typeof defaultValue == 'undefined' || defaultValue == null ? '' : (defaultValue[ff.id as keyof PatientInferedType])}
          {...ff} />)
      }
      <div className="flex justify-evenly">
        <button
          className="bg-secondary text-whit/>"
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
function InputFormComponent(props: InputParams) {
  props.shape?.set(props.id, typeof props.type === 'undefined' ? 'text' : props.type)
  let inputJSX: JSX.Element
  switch (props.type) {
    case 'option':
      console.log('InputFormComponent#option', JSON.stringify(props))
      inputJSX = <div className="col-sm-9 py-1 d-flex align-items-center">
        <select
          name={props.id}
          className="form-select"
          id={props.id}
          defaultValue={props.value}
        >
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      break;
    case 'checkbox':
      console.log('InputFormComponent#checkbox', JSON.stringify(props))
      inputJSX = <input
        name={props.id}
        id={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        type="checkbox"
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        defaultValue={props.value}
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        }
      />
      break;
    case 'textarea':
      console.log('InputFormComponent#textarea', JSON.stringify(props))
      inputJSX = <textarea
        name={props.id}
        id={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        rows={props.rows}
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        defaultValue={props.value}
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        }
      ></textarea>
      break;
    default:
      console.log('InputFormComponent#default', JSON.stringify(props))
      inputJSX = <input
        id={props.id}
        name={props.id}
        className="w-full px-2 pb-1.5 text-dark outline-none text-base rounded-md bg-white"
        type={typeof props.type === 'undefined' ? 'text' : props.type}
        placeholder={
          typeof props.placeholder === 'undefined'
            ? props.label
            : props.placeholder
        }
        defaultValue={props.value}
        readOnly={
          typeof props.readonly === 'undefined'
            ? false
            : props.readonly
        } />


  }
  return (
    <div className="mb-5 rounded-lg focus-within:border-secondary border-gray-gray4 bg-white shadow-md">
      <label
        htmlFor={props.id}
        className="text-xs text-dark placeholder-gray-gray4 px-2 pt-1.5"
      >
        {props.label}
      </label>
      {inputJSX}
      <div></div>
    </div>
  )
}

export default NewPatientEditForm
