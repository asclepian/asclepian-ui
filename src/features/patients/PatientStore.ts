import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Patient } from './entities'

interface PatientState {
  openEdits: Patient[]
  addPatient: (p: Patient) => void
  removePatient: (p: Patient) => void
}

const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({
      openEdits: [],
      addPatient: (p) => set((state) => {
        state.openEdits.push(p)
        return { openEdits: state.openEdits }
      }),
      removePatient: (p) => set((state) => {
        return { openEdits: state.openEdits.filter(patient => (patient.filenum !== p.filenum)) }
      })
    }), { name: 'patient-store' })
  )
)

export default usePatientStore
