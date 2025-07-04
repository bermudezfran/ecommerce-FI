import type { 
  ApiResponse, 
  CartOperationResponse, 
  PurchaseResponse, 
  VipUserResponse, 
  SpecialDateResponse 
} from '../types/apiTypes'
import type { Product } from '../types/product'
import { mockUsers } from '../data/mockUsers'
import { specialDates } from '../data/mockDates'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const simulateError = (probability: number = 0.1) => {
  return Math.random() < probability
}

export const addProductToCart = async (
  cartId: string, 
  product: Product, 
  quantity: number
): Promise<ApiResponse<CartOperationResponse>> => {
  await delay(800)
  
  if (simulateError(0.05)) {
    throw new Error('Error al agregar producto al carrito')
  }

  return {
    success: true,
    data: {
      cartId,
      productId: product.id,
      quantity,
      total: product.price * quantity,
      message: 'Producto agregado exitosamente'
    }
  }
}

export const removeProductFromCart = async (
  cartId: string, 
  productId: string
): Promise<ApiResponse<CartOperationResponse>> => {
  await delay(500)
  
  if (simulateError(0.03)) {
    throw new Error('Error al eliminar producto del carrito')
  }

  return {
    success: true,
    data: {
      cartId,
      productId,
      total: 0,
      message: 'Producto eliminado del carrito'
    }
  }
}

export const updateCartQuantity = async (
  cartId: string, 
  productId: string, 
  quantity: number
): Promise<ApiResponse<CartOperationResponse>> => {
  await delay(600)
  
  if (simulateError(0.04)) {
    throw new Error('Error al actualizar cantidad')
  }

  return {
    success: true,
    data: {
      cartId,
      productId,
      quantity,
      total: 0,
      message: 'Cantidad actualizada correctamente'
    }
  }
}

export const completePurchase = async (
  cartId: string, 
  amountPaid: number
): Promise<ApiResponse<PurchaseResponse>> => {
  await delay(1200)
  
  if (simulateError(0.02)) {
    throw new Error('Error al completar la compra')
  }

  return {
    success: true,
    data: {
      purchaseId: `purchase-${Date.now()}`,
      cartId,
      amountPaid,
      date: new Date(),
      message: 'Compra completada exitosamente'
    }
  }
}

export const getVipUsers = async (): Promise<ApiResponse<VipUserResponse>> => {
  await delay(1000)
  
  if (simulateError(0.05)) {
    throw new Error('Error al obtener usuarios VIP')
  }

  const vipUsers = mockUsers.filter(user => user.isVip)
  
  return {
    success: true,
    data: {
      users: vipUsers,
      totalVipUsers: vipUsers.length,
      message: `${vipUsers.length} usuarios VIP encontrados`
    }
  }
}

export const getSpecialDates = async (): Promise<ApiResponse<SpecialDateResponse>> => {
  await delay(800)
  
  if (simulateError(0.03)) {
    throw new Error('Error al obtener fechas especiales')
  }

  return {
    success: true,
    data: {
      dates: specialDates,
      totalSpecialDates: specialDates.length,
      message: `${specialDates.length} fechas especiales encontradas`
    }
  }
}

export const getUsersByVipStatus = async (
  month: string,
  year: string
): Promise<ApiResponse<VipUserResponse>> => {
  await delay(900)
  
  if (simulateError(0.04)) {
    throw new Error('Error al obtener usuarios por estado VIP')
  }

  const filteredUsers = mockUsers.filter(user => {
    const hasPurchaseInMonth = user.purchaseHistory.some(purchase => {
      const purchaseDate = new Date(purchase.date)
      return purchaseDate.getMonth() === parseInt(month) - 1 && 
             purchaseDate.getFullYear() === parseInt(year)
    })
    return hasPurchaseInMonth
  })

  return {
    success: true,
    data: {
      users: filteredUsers,
      totalVipUsers: filteredUsers.filter(u => u.isVip).length,
      message: `${filteredUsers.length} usuarios con actividad en ${month}/${year}`
    }
  }
}
