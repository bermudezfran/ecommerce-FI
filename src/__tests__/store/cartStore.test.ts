import { renderHook, act } from '@testing-library/react'
import { useCartStore, resetCartStore } from '../../store/cartStore'

const mockProduct = {
  id: 'producto-1',
  name: 'Producto de Prueba',
  price: 100,
  description: 'Descripción de prueba',
  category: 'prueba',
  image: 'prueba.jpg',
  imageUrl: 'prueba.jpg'
}

describe('CartStore', () => {
  beforeEach(() => {
    resetCartStore()
  })

  describe('addCart', () => {
    it('debería agregar un nuevo carrito con las propiedades correctas', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('VIP', 'usuario-1')
      })

      expect(result.current.carts).toHaveLength(1)
      expect(result.current.carts[0]).toMatchObject({
        type: 'VIP',
        userId: 'usuario-1',
        items: [],
        isCompleted: false
      })
      expect(result.current.currentCartId).toBe(result.current.carts[0].id)
    })

    it('debería setear el currentCartId al nuevo carrito', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('COMUN', 'usuario-2')
      })

      expect(result.current.currentCartId).toBe(result.current.carts[0].id)
    })
  })

  describe('removeCart', () => {
    it('debería eliminar un carrito por su id', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('VIP', 'usuario-1')
      })
      
      const cartId = result.current.carts[0].id
      
      act(() => {
        result.current.removeCart(cartId)
      })

      expect(result.current.carts).toHaveLength(0)
      expect(result.current.currentCartId).toBeNull()
    })
  })

  describe('addProductToCart', () => {
    it('debería agregar un producto al carrito existente', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('VIP', 'usuario-1')
      })
      
      const cartId = result.current.carts[0].id
      
      act(() => {
        result.current.addProductToCart(cartId, mockProduct, 2)
      })

      expect(result.current.carts[0].items).toHaveLength(1)
      expect(result.current.carts[0].items[0]).toMatchObject({
        product: mockProduct,
        quantity: 2
      })
    })

    it('debería actualizar la cantidad si el producto ya existe', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('VIP', 'usuario-1')
      })
      
      const cartId = result.current.carts[0].id
      
      act(() => {
        result.current.addProductToCart(cartId, mockProduct, 2)
        result.current.addProductToCart(cartId, mockProduct, 3)
      })

      expect(result.current.carts[0].items).toHaveLength(1)
      expect(result.current.carts[0].items[0].quantity).toBe(5)
    })
  })

  describe('getCartTotal', () => {
    it('debería calcular el total correctamente', () => {
      const { result } = renderHook(() => useCartStore())
      let cartId = ''
      let total = 0

      act(() => {
        result.current.addCart('COMUN', 'usuario-1')
      })
      cartId = result.current.carts[0].id

      act(() => {
        result.current.addProductToCart(cartId, mockProduct, 2)
      })
      total = result.current.getCartTotal(cartId)

      expect(result.current.carts[0].items).toHaveLength(1)
      expect(result.current.carts[0].items[0].quantity).toBe(2)
      expect(total).toBe(200)
    })  
  })

  describe('completeCart', () => {
    it('debería marcar el carrito como completado', () => {
      const { result } = renderHook(() => useCartStore())
      
      act(() => {
        result.current.addCart('VIP', 'usuario-1')
      })
      
      const cartId = result.current.carts[0].id
      
      act(() => {
        result.current.completeCart(cartId)
      })

      expect(result.current.carts[0].isCompleted).toBe(true)
    })
  })
})
