import { create } from 'zustand'
import { mockUsers } from '../data/mockUsers'
import type { User, PurchaseRecord } from '../types/user' 
import { isSpecialDate, getSpecialDateInfo } from '../data/mockDates'

interface AppStore {
  users: User[] 
  currentUserId: string
  simulatedDate: Date
  currentUser: User
  setCurrentUser: (userId: string) => void
  setSimulatedDate: (date: Date) => void
  addPurchaseToHistory: (userId: string, purchase: PurchaseRecord) => void
  updateUserVipStatus: (userId: string, isVip: boolean) => void
  isCurrentDateSpecial: boolean
  getCurrentSpecialDateInfo: () => { date: string; name: string; description: string } | undefined
}

export const useAppStore = create<AppStore>((set, get) => ({
  users: mockUsers, 
  currentUserId: '',
  simulatedDate: new Date(),
  
  get currentUser() {
    const state = get()
    return state.users.find(user => user.id === state.currentUserId) || state.users[0]
  },

  setCurrentUser: (userId: string) => {
    set({ currentUserId: userId })
  },

  setSimulatedDate: (newDate: Date) => {
    const { simulatedDate: currentDate, users } = get()
    let updatedUsers = [...users]

    if (newDate.getMonth() !== currentDate.getMonth() || newDate.getFullYear() !== currentDate.getFullYear()) {
      const prevMonth = currentDate.getMonth()
      const prevYear = currentDate.getFullYear()
      
      updatedUsers = users.map(user => {
        if (user.isVip) {
          const hasPurchasedLastMonth = user.purchaseHistory.some(p => 
            new Date(p.date).getMonth() === prevMonth && new Date(p.date).getFullYear() === prevYear
          );
          if (!hasPurchasedLastMonth) {
            console.log(`El usuario ${user.name} ha perdido su estado VIP por inactividad.`);
            return { ...user, isVip: false };
          }
        }
        return user;
      });
    }
    
    set({ simulatedDate: newDate, users: updatedUsers });
  },

  addPurchaseToHistory: (userId: string, purchase: PurchaseRecord) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === userId 
          ? { ...user, purchaseHistory: [...user.purchaseHistory, purchase] }
          : user
      )
    }));
  },

  updateUserVipStatus: (userId: string, isVip: boolean) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === userId ? { ...user, isVip } : user
      )
    }));
  },

  get isCurrentDateSpecial() {
    return isSpecialDate(get().simulatedDate)
  },

  getCurrentSpecialDateInfo: () => {
    return getSpecialDateInfo(get().simulatedDate)
  }
}));