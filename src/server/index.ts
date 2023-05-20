
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { PrismaClient } from '@prisma/client'
import { createContext } from './trpc'
import { appRouter } from './routers/_app'

async function main () {
  const app = express()
  const port = 8090// default port to listen

  // load midleware
  /* app.use(express.json())
  app.use(express.urlencoded({ extended: false })) */

  /* const db = new Database('public/asclepian.db', { verbose: console.log })
  db.pragma('journal_mode = WAL') */

  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  })

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
