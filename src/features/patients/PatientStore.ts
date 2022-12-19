import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Patient } from './entities'

interface PatientState {
  openEdits: Patient[]
}

interface PatientAction {
  addPatient: (p: Patient) => void
  removePatient: (p: Patient) => void
}

const usePatientStore = create<PatientState & PatientAction>()(
  devtools(
    persist(
      immer<PatientState & PatientAction>((set) => ({
        openEdits: [],
        addPatient: (p: Patient) => set((state) => {
          console.log(`adding ${JSON.stringify(p)} to the current state ${JSON.stringify(state.openEdits)}`)
          const index = state.openEdits.findIndex((value: Patient) => { return value.filenum === p.filenum })
          if (index !== -1) { return { openEdits: state.openEdits } }
          state.openEdits.push(p)
          return { openEdits: state.openEdits }
        }),
        removePatient: (p) => set((state) => {
          console.log(`removing ${JSON.stringify(p)} from current state ${JSON.stringify(state.openEdits)}`)
          return { openEdits: state.openEdits.filter((patient: Patient) => { return p.filenum !== patient.filenum }) }
        })
      })), { name: 'patient-store' })
  )
)

export default usePatientStore
