import { type Application } from 'express'
// import { type Statement, type Database } from 'better-sqlite3'
import { PatientSchema } from '../entities'
import { type PrismaClient } from '@prisma/client'

/* const loadPatient = (patientJSON: string): PatientList => {
  const rawPatients = readFileSync(patientJSON, { encoding: 'utf8' })
  return JSON.parse(rawPatients)
} */

// watch(PATIENT_JSON_PATH, (eventType: string, filename: string) => {
//     if (eventType === 'change') {
//         console.log("file changed, reloading")
//         patientList = loadPatient(PATIENT_JSON_PATH)
//     }
// })

/* async function asyncGet<T> (stmt: Statement, params: T) {
  return await new Promise((resolve, reject) => {
    try {
      resolve(stmt.get(params))
    } catch (error) {
      console.error(`error ${JSON.stringify(error)} getting ${JSON.stringify(stmt)} with params ${JSON.stringify(params)}`)
      reject(error)
    }
  })
}
async function asyncAll<T> (stmt: Statement, params?: T | undefined) {
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
} */

export const register = (app: Application, prisma: PrismaClient): void => {
  /* const stmtPatients = db.prepare('SELECT * FROM patients')
  const stmtPatientByFilenum = db.prepare('SELECT * FROM patients WHERE filenum = ?')
  const stmtUpdatePatient = db.prepare('UPDATE patients SET cin=@cin, firstname=@firstname, lastname=@lastname, landline=@landline, insured=@insured, active=@active, mobile=@mobile, gender=@gender, job=@job, birthdate=@birthdate, address=@address, city=@city, postalcode=@postalcode WHERE filenum=@filenum')
  const stmtInsertPatient = db.prepare('INSERT INTO patients (filenum, cin, firstname, lastname, landline, insured, active, mobile, gender, job, birthdate, address, city, postalcode) VALUES (@filenum, @cin, @firstname, @lastname, @landline, @insured, @active, @mobile, @gender, @job, @birthdate, @address, @city, @postalcode)')

  const stmtEncountersByPatient = db.prepare('SELECT * FROM encounters WHERE patient = @filenum AND unixepoch(timestamp) > unixepoch(@startDate) AND unixepoch(timestamp) < unixepoch(@endDate)')
  const stmtEncounters = db.prepare('SELECT * FROM encounters WHERE unixepoch(timestamp) > unixepoch(@startDate) AND unixepoch(timestamp) < unixepoch(@endDate)')
  const stmtEncounterId = db.prepare('SELECT * FROM encounters WHERE id = ?')
  const stmtPatientLastSeen = db.prepare("SELECT patient, datetime(max(unixepoch(timestamp)),'unixepoch') as lastseen from encounters WHERE unixepoch(timestamp) > unixepoch(?) GROUP BY patient") */
  app.get('/', (_, res) => {
    res.type('application/json')
    res.send({ message: 'Hello World' })
  }
  )

  app.get('/patients', (req, res) => {
    console.log(`get /patients ${JSON.stringify({ method: req.method, headers: req.headers, body: req.body })}`)
    res.type('application/json')
    prisma.patient.findMany().then(patients => {
      typeof patients === 'undefined'
        ? res.status(404).send({ message: 'not found' })
        : res.status(200).send({ _embedded: { patientList: patients } })
    }).catch(error => {
      console.error(error)
      res.status(500).send({ message: error })
    })
  })

  app.get('/patients/:filenum', (req, res) => {
    const filenum = req.params.filenum
    console.log(`get /patients/:filenum ${filenum}`)
    res.type('application/json')
    prisma.patient.findUnique({
      where: {
        filenum
      }
    }).then(patient => {
      typeof patient === 'undefined' ? res.status(404).send({ message: 'not found' }) : res.status(200).send(patient)
    }).catch(error => {
      console.error(error)
      res.status(500).send({ message: error })
    })
  })

  app.post('/patients/:filenum', (req, res) => {
    try {
      res.type('application/json')
      const patient = PatientSchema.parse(req.body)
      console.log(`post /patients/:filenum ${req.params.filenum} patient: ${JSON.stringify(req.body)}`)

      prisma.patient.update({
        where: {
          filenum: req.params.filenum
        },
        data:
        {
          cin: patient.cin,
          lastname: patient.lastname,
          firstname: patient.firstname,
          landline: patient.landline,
          insured: patient.insured,
          active: patient.active,
          mobile: patient.mobile,
          gender: patient.gender,
          job: patient.job,
          birthdate: patient.birthdate,
          address: patient.address,
          city: patient.city,
          postalcode: patient.postalcode,
          createdby: patient.createdby?.toString(),
          createdon: patient.createdon
        }
      }).then(
        (result) => res.status(200).send({ message: result })
      ).catch((error) => {
        console.error(`error updating ${JSON.stringify(error)}`)
        res.status(400).send({ message: error })
      })
    } catch (error) {
      console.error(`update patient req: error parsing ${JSON.stringify(req.body)}`)
      res.status(400).send({ message: error })
    }
  })

  app.post('/patients/', (req, res) => {
    res.type('application/json')
    try {
      const patient = PatientSchema.parse(req.body)
      console.log(`post /patients/ patient: ${JSON.stringify(patient)}`)

      prisma.patient.create({
        data:
        {
          filenum: patient.filenum,
          cin: patient.cin,
          lastname: patient.lastname,
          firstname: patient.firstname,
          landline: patient.landline,
          insured: patient.insured,
          active: patient.active,
          mobile: patient.mobile,
          gender: patient.gender,
          job: patient.job,
          birthdate: patient.birthdate,
          address: patient.address,
          city: patient.city,
          postalcode: patient.postalcode,
          createdby: patient.createdby?.toString(),
          createdon: patient.createdon
        }
      }
      ).then(
        (result) => res.status(200).send({ message: result })
      ).catch((error) => {
        console.error(`error inserting ${JSON.stringify(error)}`)
        res.status(400).send({ message: error })
      })
    } catch (error) {
      console.error(`post patient req: error parsing ${JSON.stringify(req.body)}`)
      res.status(400).send({ message: error })
    }
  })
  /*
    app.get('/patients/:filenum/encounters', (req, res) => {
      const startDate = typeof req.query.startDate === 'string' ? req.query.startDate : '0001-01-01'
      const endDate = typeof req.query.endDate === 'string' ? req.query.endDate : '9999-12-31'
      console.log(`get /patients/:filenum/encounters ${req.params.filenum} start: ${startDate} end: ${endDate}`)
      asyncAll(stmtEncountersByPatient, { filenum: req.params.filenum, startDate, endDate }).then(encounters => {
        typeof encounters === 'undefined'
          ? res.status(404).send({ message: 'not found' })
          : res.status(200).send({ _embedded: { encounterList: encounters } })
      }).catch(error => {
        console.error(error)
        res.status(500).send({ message: error })
      })
    }) */

  /*  app.get('/encounters', (req, res) => {
    const startDate = typeof req.query.startDate === 'string' ? req.query.startDate : '0001-01-01'
    const endDate = typeof req.query.endDate === 'string' ? req.query.endDate : '9999-12-31'
    console.log(`get /encounters start: ${startDate} end: ${endDate}`)
    asyncAll(stmtEncounters, { startDate, endDate }).then(encounters => {
      typeof encounters === 'undefined'
        ? res.status(404).send({ message: 'not found' })
        : res.status(200).send({ _embedded: { encounterList: encounters } })
    }).catch(error => {
      console.error(error)
      res.status(500).send({ message: error })
    })
  })
 */
  /*   app.get('/encounters/:id', (req, res) => {
    const id = req.params.id
    console.log(`get /encounters/:id ${id}`)
    res.type('application/json')
    asyncGet(stmtEncounterId, id).then(encounter => {
      typeof encounter === 'undefined' ? res.status(404).send({ message: 'not found' }) : res.status(200).send(encounter)
    }).catch(error => {
      console.error(error)
      res.status(500).send({ message: error })
    })
  }) */

  /*   app.get('/views/patients/lastseen', (req, res) => {
      const after = typeof req.query.after === 'string' ? req.query.after : '0001-01-01'
      console.log(`get /views/patients/lastseen' ${after}`)
      res.type('application/json')
      asyncAll(stmtPatientLastSeen, after).then(data => {
        typeof data === 'undefined' ? res.status(404).send({ message: 'not found' }) : res.status(200).send(data)
      }).catch(error => {
        console.error(error)
        res.status(500).send({ message: error })
      })
    })
  */
}
