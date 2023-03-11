import { type Statement } from 'better-sqlite3'

async function asyncGet<T> (stmt: Statement, params: T): Promise<unknown> {
  return await new Promise((resolve, reject) => {
    try {
      resolve(stmt.get(params))
    } catch (error) {
      console.error(`error ${JSON.stringify(error)} getting ${JSON.stringify(stmt)} with params ${JSON.stringify(params)}`)
      reject(error)
    }
  })
}
async function asyncGetAll<T> (stmt: Statement, params?: T | undefined) {
  return await new Promise((resolve, reject) => {
    try {
      typeof params === 'undefined' ? resolve(stmt.all()) : resolve(stmt.all(params))
    } catch (error) {
      console.error(`error ${JSON.stringify(error)} getting all ${stmt.source} with params ${JSON.stringify(params)}`)
      reject(error)
    }
  })
}
async function asyncRun<T> (stmt: Statement, params?: T | undefined) {
  return await new Promise((resolve, reject) => {
    try {
      typeof params === 'undefined' ? resolve(stmt.run()) : resolve(stmt.run(params))
    } catch (error) {
      console.error(`error ${JSON.stringify(error)} running ${JSON.stringify(stmt)} with params ${JSON.stringify(params)}`)
      reject(error)
    }
  })
}

export { asyncGet, asyncRun, asyncGetAll }
