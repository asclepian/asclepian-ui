import { Patient } from '../../../entities'
import React, { useEffect, KeyboardEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import usePatientStore from '../PatientStore'
import { useNavigate, useParams } from 'react-router-dom'
import { checkboxInput, generalInput, optionInput, textInput, PatientSchema } from '../../../tools/formTools'
import { zodResolver } from '@hookform/resolvers/zod'

function PatientEditNewForm (): JSX.Element {
  const { filenum } = useParams()
  const openEdits = usePatientStore(state => state.openEdits)

  // load opened version with unsaved changes
  const [data, setData] = useState<Patient>()
  const form = useForm<Patient>({
    mode: 'onSubmit',
    defaultValues: data,
    resolver: zodResolver(PatientSchema)
  })
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

  if (typeof filenum !== 'undefined') {
    const openedPatient = openEdits.filter(p => { return p.filenum === filenum })
    if (openedPatient.length !== 0) {
      setData(openedPatient[0])
    }
  }

  const doHandleSubmit = async (data: Patient): Promise<void> => {
    console.log(`handling submit with data ${JSON.stringify(data)}`)
    await createPatient(data)
      .then((response) => {
        form.reset(data)
        if (response.status !== 200) alert('Erreur: Patient NON enregistré')
        else {
          alert('Patient enregistré')
          // navigate(`/patients/edit/${data.filenum}`)
          console.log(`Patient created with data ${JSON.stringify(data)}`)
        }
      }).catch((err) => console.error(err))
  }

  return (
    <form
            className="p-2 bg-dominant"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(doHandleSubmit, (erros) => {
              console.error(erros)
            })}
            onKeyDown={(k) => checkKeyDown(k)}
        >
            {generalInput(
              { label: 'Numero de Dossier', id: 'filenum' },
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

export { PatientEditNewForm }
