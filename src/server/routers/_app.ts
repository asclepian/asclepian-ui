import { router } from '../trpc'
import { greetingRouter } from './greeting'
import { patientRouter } from './patients'

export const appRouter = router({
  greeting: greetingRouter,
  patients: patientRouter
})
export type AppRouter = typeof appRouter
