import { FormEvent } from 'react'
import z from 'zod'
import { InputParams, InputFormComponent, PatientFormType, PatientSchema } from '../../../tools/formTools'

const patientData: PatientFormType = {
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

function NewPatientEditForm(defaultValue: PatientFormType | null) {
  defaultValue = patientData
  console.log('InputFormComponent', JSON.stringify(defaultValue))
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const patientFormData =  Object.fromEntries(data)
    console.log('handleSubmit#formData', patientFormData)
    console.log('handleSubmit#formShape', Object.fromEntries(formshape))  
    console.log('handleSubmit#zodParse', PatientSchema.safeParse(patientFormData))
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
        formFieldsParams.map(ff => {
          const value = defaultValue === null ? '' : defaultValue[ff.id as keyof PatientFormType]
          return <InputFormComponent
            key={'inputField#' + ff.id}
            shape={formshape}
            value={value?.toString()}
              { ...ff } 
              />})
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

export default NewPatientEditForm
