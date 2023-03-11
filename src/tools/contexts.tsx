import Database from 'better-sqlite3'
import { createContext } from 'react'

const DBContext = createContext(new Database(':memory:', { verbose: console.log }))

export { DBContext }
