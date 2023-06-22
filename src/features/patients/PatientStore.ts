import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Patient } from '../../entities'

interface PatientState {
  openEdits: Patient[]
}

interface PatientAction {
  addPatient: (p: Patient) => void
  removePatient: (p: Patient) => void
  patchPatient: (p: Patient) => void
}

const usePatientStore = create<PatientState & PatientAction>()(
  devtools(
    persist(
      immer<PatientState & PatientAction>((set) => ({
        openEdits: [],
        addPatient: (p: Patient) => set((state) => {
          console.log('usePatientStore', `adding ${JSON.stringify(p)} type of date ${typeof p.birthdate} to the current state ${JSON.stringify(state.openEdits)}`)
          const index = state.openEdits.findIndex((value: Patient) => { return value.filenum === p.filenum })
          if (index !== -1) { return state }
          state.openEdits.push(p)
          return state
        }),
        removePatient: (p) => set((state) => {
          console.log('usePatientStore', `removing ${JSON.stringify(p)} from current state ${JSON.stringify(state.openEdits)}`)
          return { openEdits: state.openEdits.filter((patient: Patient) => { return p.filenum !== patient.filenum }) }
        }),
        patchPatient: (p) => set((state) => {
          console.log('usePatientStore', `patching  ${JSON.stringify(p)} in the current state ${JSON.stringify(state.openEdits)}`)
          const index = state.openEdits.findIndex((value: Patient) => { return value.filenum === p.filenum })
          if (index === -1) { return state }
          state.openEdits[index] = p
          return state
        })
      })), { name: 'patient-store' })
  )
)

export default usePatientStore
