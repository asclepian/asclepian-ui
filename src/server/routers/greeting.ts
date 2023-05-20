import { router, publicProcedure } from '../trpc'
export const greetingRouter = router({
  greeting: publicProcedure.query(() => {
    return 'hellp tRPC v10'
  })
})
