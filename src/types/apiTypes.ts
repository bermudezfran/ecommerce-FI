export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface CartOperationResponse {
  cartId: string
  productId?: string
  quantity?: number
  total: number
  message: string
}

export interface PurchaseResponse {
  purchaseId: string
  cartId: string
  amountPaid: number
  date: Date
  message: string
}

export interface PurchaseHistory {
    cartId: string
    amountPaid: number
    date: Date
}

export interface User {
  id: string
  name: string
  isVip: boolean
  purchaseHistory: PurchaseHistory[]
}

export interface VipUserResponse {
  users: User[]
  totalVipUsers: number
  message: string
}

export interface SpecialDateResponse {
  dates: SpecialDate[]
  totalSpecialDates: number
  message: string
}

export interface SpecialDate {
  date: string
  name: string
  description: string
}

export interface ApiError {
  code: string
  message: string
  details?: string
}
