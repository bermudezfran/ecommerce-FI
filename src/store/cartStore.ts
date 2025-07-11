import { create } from 'zustand'
import type { Cart, CartType } from '../types/cart'
import type { Product } from '../types/product'

interface CartStore {
  carts: Cart[]
  currentCartId: string | null
  addCart: (type: CartType, userId: string) => void
  removeCart: (cartId: string) => void
  addProductToCart: (cartId: string, product: Product, quantity: number) => void
  removeProductFromCart: (cartId: string, productId: string) => void
  updateProductQuantity: (cartId: string, productId: string, quantity: number) => void
  completeCart: (cartId: string) => void
  getCartTotal: (cartId: string) => number
  getCartType: (cartId: string) => CartType | null
  setCurrentCart: (cartId: string) => void
  clearCarts: () => void
  clearCartId: (cartId: string) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],
  currentCartId: null,

  addCart: (type: CartType, userId: string) => {
    const newCart: Cart = {
      id: Date.now().toString(),
      type,
      items: [],
      createdAt: new Date(),
      userId,
      isCompleted: false
    }
    set(state => ({
      carts: [...state.carts, newCart],
      currentCartId: newCart.id
    }))
  },

  removeCart: (cartId: string) => {
    set(state => ({
      carts: state.carts.filter(cart => cart.id !== cartId),
      currentCartId: state.currentCartId === cartId ? null : state.currentCartId
    }))
  },

  addProductToCart: (cartId: string, product: Product, quantity: number) => {
    set(state => ({
      carts: state.carts.map(cart => {
        if (cart.id === cartId) {
          const existingItem = cart.items.find(item => item.product.id === product.id)
          if (existingItem) {
            return {
              ...cart,
              items: cart.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            return {
              ...cart,
              items: [...cart.items, { product, quantity }]
            }
          }
        }
        return cart
      })
    }))
  },

  removeProductFromCart: (cartId: string, productId: string) => {
    set(state => ({
      carts: state.carts.map(cart => {
        if (cart.id === cartId) {
          return {
            ...cart,
            items: cart.items.filter(item => item.product.id !== productId)
          }
        }
        return cart
      })
    }))
  },

  updateProductQuantity: (cartId: string, productId: string, quantity: number) => {
    set(state => ({
      carts: state.carts.map(cart => {
        if (cart.id === cartId) {
          return {
            ...cart,
            items: cart.items.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          }
        }
        return cart
      })
    }))
  },

  completeCart: (cartId: string) => {
    set(state => ({
      carts: state.carts.map(cart => {
        if (cart.id === cartId) {
          return {
            ...cart,
            isCompleted: true,
            completedAt: new Date()
          }
        }
        return cart
      })
    }))
  },

  getCartTotal: (cartId: string) => {
    const cart = get().carts.find(c => c.id === cartId)
    if (!cart) return 0

    let total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    
    if (totalItems === 4) {
      total = total * 0.75
    }
    
    if (totalItems > 10) {
      total = total - 100
    }
    
    if (cart.type === 'FECHA_ESPECIAL') {
      total = total - 300
    }
    
    if (cart.type === 'VIP' && cart.items.length > 0) {
      const minItemPrice = cart.items.reduce((min, item) => 
        item.product.price < min.product.price ? item : min
      )
      total = total - minItemPrice.product.price - 500;
    }
    
    return Math.max(total, 0)
  },

  getCartType: (cartId: string) => {
    const cart = get().carts.find(c => c.id === cartId)
    return cart ? cart.type : null
  },

  setCurrentCart: (cartId: string) => {
    set({ currentCartId: cartId })
  },

  clearCarts: () => {
    set({ carts: [], currentCartId: null })
  },

  clearCartId: (cartId: string) => {
    set(state => ({
      carts: state.carts.filter(cart => cart.id !== cartId),
      currentCartId: state.currentCartId === cartId ? null : state.currentCartId
    }))
  }
}))

export const resetCartStore = () => {
  useCartStore.setState({ carts: [], currentCartId: null })
} 