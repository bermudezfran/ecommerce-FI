import { create } from 'zustand'
import { mockUsers } from '../data/mockUsers'
import type { User } from '../types/user'
import { isSpecialDate, getSpecialDateInfo } from '../data/mockDates'

interface AppStore {
  currentUserId: string
  simulatedDate: Date
  currentUser: User
  setCurrentUser: (userId: string) => void
  setSimulatedDate: (date: Date) => void
  isCurrentDateSpecial: boolean
  getCurrentSpecialDateInfo: () => { date: string; name: string; description: string } | undefined
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentUserId: 'user-2', // aclaración: aca se puede cambiar por cualquier userId para testear cualquiera de los usuarios que estan mockeados en el archivo,
  simulatedDate: new Date(),
  
  get currentUser() {
    return mockUsers.find(user => user.id === get().currentUserId) || mockUsers[0]
  },

  setCurrentUser: (userId: string) => {
    set({ currentUserId: userId })
  },

  setSimulatedDate: (date: Date) => {
    set({ simulatedDate: date })
  },

  get isCurrentDateSpecial() {
    return isSpecialDate(get().simulatedDate)
  },

  getCurrentSpecialDateInfo: () => {
    return getSpecialDateInfo(get().simulatedDate)
  }
})) 