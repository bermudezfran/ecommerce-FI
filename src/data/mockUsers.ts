import type { User } from '../types/user'

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Juan Pérez',
    isVip: false,
    purchaseHistory: []
  },
  {
    id: 'user-2',
    name: 'María García',
    isVip: true,
    purchaseHistory: [
      {
        cartId: 'cart-001',
        amountPaid: 1500,
        date: new Date('2024-01-15')
      },
      {
        cartId: 'cart-002',
        amountPaid: 800,
        date: new Date('2024-02-20')
      }
    ]
  },
  {
    id: 'user-3',
    name: 'Carlos López',
    isVip: false,
    purchaseHistory: [
      {
        cartId: 'cart-003',
        amountPaid: 300,
        date: new Date('2024-03-10')
      }
    ]
  },
  {
    id: 'user-4',
    name: 'Ana Rodríguez',
    isVip: true,
    purchaseHistory: [
      {
        cartId: 'cart-004',
        amountPaid: 2000,
        date: new Date('2024-01-05')
      },
      {
        cartId: 'cart-005',
        amountPaid: 1200,
        date: new Date('2024-02-15')
      },
      {
        cartId: 'cart-006',
        amountPaid: 900,
        date: new Date('2024-03-01')
      }
    ]
  },
  {
    id: 'user-5',
    name: 'Luis Martínez',
    isVip: false,
    purchaseHistory: []
  }
]

export const getCurrentUser = (): User => {
  return mockUsers[0]
}

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId)
} 