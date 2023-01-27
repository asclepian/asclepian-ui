import React from 'react'

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

export { generalInput, optionInput, textInput, checkboxInput }
