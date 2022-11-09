import React from 'react'
import { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form'
import { Patient } from '../entities/patients';
import { EditPatientFormModel } from './EditPatientLogicComponent';

interface Props {
    form: UseFormReturn<EditPatientFormModel>;
    onSubmit: (data: EditPatientFormModel) => any;
}


function EditPatientView({ form, onSubmit }: Props) {
    const { formState, register, handleSubmit } = form;
    const { errors, isSubmitting } = formState;
    
    return (
        <form onSubmit={handleSubmit(onSubmit,(erros) =>{console.log(erros)})}>
            <div>
                <label>Numero De Dossier</label>
                <div>
                    <input
                        type="text"
                        placeholder="Numero de dossier"
                        {...register('filenum')}
                        readOnly
                    />
                </div>
                <div>{errors?.filenum?.message?.toString()}</div>
            </div>
            <div>
                <label>Nom de famille</label>
                <div>
                    <input
                        type="text"
                        placeholder="Saisir nom de famille"
                        {...register('lastname')}
                    />
                </div>
                <div>{errors?.lastname?.message?.toString()}</div>
            </div>
            <div>
                <label>Prénom</label>
                <div>
                    <input
                        type="text"
                        placeholder="Saisir prénom"
                        {...register('firstname')}
                    />
                </div>
                <div>{errors?.firstname?.message?.toString()}</div>
            </div>
            <div>
                <label>Sexe</label>
                <div>
                    <select {...register('gender')}>
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                    </select>
                </div>
                <div>{errors?.gender?.message?.toString()}</div>
            </div>
            <div>
                <label>Date de naissance</label>
                <div>
                    <input
                        type="date"
                        placeholder="date de naissance"
                        {...register('birthdate')}
                    />
                </div>
                <div>{errors?.lastname?.message?.toString()}</div>
            </div>
            <div>
                <label>Adresse</label>
                <div>
                    <input
                        type="text"
                        placeholder="Adresse"
                        {...register('address')}
                    />
                </div>
                <div>{errors?.address?.message?.toString()}</div>
            </div>
            <div>
                <label>Ville</label>
                <div>
                    <input
                        type="text"
                        placeholder="Ville"
                        {...register('city')}
                    />
                </div>
                <div>{errors?.city?.message?.toString()}</div>
            </div>
            <div>
                <label>Code Postale</label>
                <div>
                    <input
                        type="number"
                        placeholder="Code Postale"
                        {...register('postalcode')}
                    />
                </div>
                <div>{errors?.postalcode?.message?.toString()}</div>
            </div>
            <div>
                <label>Tel</label>
                <div>
                    <input
                        type="text"
                        placeholder="landline"
                        {...register('landline')}
                    />
                </div>
                <div>{errors?.landline?.message?.toString()}</div>
            </div>
            <div>
                <label>Mobile</label>
                <div>
                    <input
                        type="text"
                        placeholder="mobile"
                        {...register('mobile')}
                    />
                </div>
                <div>{errors?.mobile?.message?.toString()}</div>
            </div>
            <div>
                <label>Compte actif</label>
                <div>
                    <input
                        type="checkbox"
                        placeholder="Actif"
                        {...register('active')}
                    />
                </div>
                <div>{errors?.active?.message?.toString()}</div>
            </div>
            <div>
                <label>Mutualisé</label>
                <div>
                    <input
                        type="checkbox"
                        placeholder="Mutualisé"
                        {...register('insured')}
                    />
                </div>
                <div>{errors?.insured?.message?.toString()}</div>
            </div>
            <div>
                <label>Mêtier</label>
                <div>
                    <input
                        type="text"
                        placeholder="Mêtier"
                        {...register('job')}
                    />
                </div>
                <div>{errors?.job?.message?.toString()}</div>
            </div>


            {/* ... more fields here */}

            <button disabled={isSubmitting} type="submit" >
                Submit
            </button>
        </form>
    )
}

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


export default EditPatientView
