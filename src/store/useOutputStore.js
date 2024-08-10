import { create } from 'zustand'

const useOutputStore = create((set) => ({
  doc: null,
  setDoc: (doc) => set({ doc }),
  currentView: '/index.html',
  setCurrentView: (view) => set({ currentView: view }),
}))

export default useOutputStore
