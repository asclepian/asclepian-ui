
import * as yup from 'yup'
import { parse, isDate } from 'date-fns'
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

export default PatientFormSchema
