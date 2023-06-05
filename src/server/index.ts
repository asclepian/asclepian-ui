import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
// import { PrismaClient } from '@prisma/client'
import { createContext } from './trpc'
import { appRouter } from './routers/_app'

async function main () {
  const app = express()
  const port = 8090// default port to listen
  app.use((req, res, next) => {
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)
    next()
  })

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
  })
}
void main()
