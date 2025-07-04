import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAppStore } from '../store/appStore'
import { useApi } from '../hooks/useApi'
import { removeProductFromCart, updateCartQuantity, completePurchase } from '../services/mockApi'
import { LoadingSpinner } from './LoadingSpinner'
import type { CartType } from '../types/cart'
import './CartManager.css'

export const CartManager = () => {
  const { 
    carts, 
    addCart, 
    removeCart, 
    setCurrentCart, 
    currentCartId, 
    removeProductFromCart: removeProductFromStore, 
    updateProductQuantity, 
    completeCart,
    getCartTotal 
  } = useCartStore()
  const { currentUser, isCurrentDateSpecial } = useAppStore()
  const [selectedType, setSelectedType] = useState<CartType>('COMUN');
  const [openModalPurchase, setOpenModalPurchase] = useState(false);

  const { execute: executeRemoveProduct, loading: removingProduct, error: removeError } = useApi(removeProductFromCart)
  const { execute: executeUpdateQuantity, loading: updatingQuantity, error: updateError } = useApi(updateCartQuantity)
  const { execute: executeCompletePurchase, loading: completingPurchase, error: completeError } = useApi(completePurchase)

  const getAutoDetectedType = (): CartType => {
    if (currentUser.isVip) return 'VIP'
    if (isCurrentDateSpecial) return 'FECHA_ESPECIAL'
    return 'COMUN'
  }

  const handleCreateCart = () => {
    const autoType = getAutoDetectedType()
    addCart(autoType, currentUser.id)
  }

  const handleSelectCart = (cartId: string) => {
    setCurrentCart(cartId)
  }

  const handleRemoveCart = (cartId: string) => {
    removeCart(cartId)
  }

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (currentCartId) {
      if (quantity <= 0) {
        await executeRemoveProduct(currentCartId, productId)
        if (!removeError) {
          removeProductFromStore(currentCartId, productId)
        }
      } else {
        await executeUpdateQuantity(currentCartId, productId, quantity)
        if (!updateError) {
          updateProductQuantity(currentCartId, productId, quantity)
        }
      }
    }
  }

  const handleRemoveProduct = async (productId: string) => {
    if (currentCartId) {
      await executeRemoveProduct(currentCartId, productId)
      if (!removeError) {
        removeProductFromStore(currentCartId, productId)
      }
    }
  }

  const handleCompletePurchase = async () => {
    if (currentCartId) {
      const currentCart = carts.find(cart => cart.id === currentCartId)
      if (currentCart && currentCart.items.length > 0) {
        const total = getCartTotal(currentCartId)
        await executeCompletePurchase(currentCartId, total)
        if (!completeError) {
          completeCart(currentCartId)
          setOpenModalPurchase(false)
        }
      }
    }
  }

  const getCartTypeLabel = (type: CartType) => {
    switch (type) {
      case 'COMUN': return 'Común'
      case 'FECHA_ESPECIAL': return 'Fecha Especial'
      case 'VIP': return 'VIP'
      default: return type
    }
  }

  return (
    <div className="cart-manager">
      <div className="create-cart-section">
        <h3>Crear Nuevo Carrito</h3>
        <div className="auto-detection-info">
          <p><strong>Usuario actual:</strong> {currentUser.name} {currentUser.isVip ? '(VIP)' : ''}</p>
          <p><strong>Tipo detectado:</strong> {getAutoDetectedType()}</p>
          {isCurrentDateSpecial && <p><strong>Fecha especial activa</strong></p>}
        </div>
        <div className="cart-type-selector">
          <label>
            <input
              type="radio"
              value="COMUN"
              checked={selectedType === 'COMUN'}
              onChange={(e) => setSelectedType(e.target.value as CartType)}
            />
            Común
          </label>
          <label>
            <input
              type="radio"
              value="FECHA_ESPECIAL"
              checked={selectedType === 'FECHA_ESPECIAL'}
              onChange={(e) => setSelectedType(e.target.value as CartType)}
            />
            Fecha Especial
          </label>
          <label>
            <input
              type="radio"
              value="VIP"
              checked={selectedType === 'VIP'}
              onChange={(e) => setSelectedType(e.target.value as CartType)}
            />
            VIP
          </label>
        </div>
        <button className="create-cart-btn" onClick={handleCreateCart}>
          Crear Carrito
        </button>
      </div>

      <div className="carts-list-section">
        <h3>Carritos Activos</h3>
        {carts.length === 0 ? (
          <p className="no-carts">No hay carritos activos</p>
        ) : (
          <div className="carts-grid">
            {carts.map(cart => (
              <div 
                key={cart.id} 
                className={`cart-item ${currentCartId === cart.id ? 'active' : ''}`}
              >
                <div className="cart-info">
                  <span className="cart-type">{getCartTypeLabel(cart.type)}</span>
                  <span className="cart-id">ID: {cart.id.slice(-6)}</span>
                  <span style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}} className="cart-items" onClick={() => setOpenModalPurchase(true)}>{cart.items.length} productos</span>
                </div>
                <div className="cart-actions">
                  <button 
                    className="select-cart-btn"
                    onClick={() => handleSelectCart(cart.id)}
                  >
                    {currentCartId === cart.id ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                  <button 
                    className="remove-cart-btn"
                    onClick={() => handleRemoveCart(cart.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {openModalPurchase && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Productos en el carrito</h2>
              <button className="close-btn" onClick={() => setOpenModalPurchase(false)}>✕</button>
            </div>
            
            {currentCartId && (
              <>
                <div className="cart-summary">
                  <p><strong>Tipo:</strong> {getCartTypeLabel(carts.find(c => c.id === currentCartId)?.type || 'COMUN')}</p>
                  <p><strong>Total:</strong> ${getCartTotal(currentCartId).toFixed(2)}</p>
                </div>
                
                <div className="cart-items-list">
                  {carts.find(cart => cart.id === currentCartId)?.items.length === 0 ? (
                    <p className="empty-cart">No hay productos en el carrito</p>
                  ) : (
                    carts.find(cart => cart.id === currentCartId)?.items.map(item => (
                      <div key={item.product.id} className="cart-item-detail">
                        <div className="item-info">
                          <span className="item-name">{item.product.name}</span>
                          <span className="item-price">${item.product.price}</span>
                        </div>
                        <div className="item-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            disabled={updatingQuantity || removingProduct}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            disabled={updatingQuantity}
                          >
                            +
                          </button>
                          <button 
                            className="remove-item-btn"
                            onClick={() => handleRemoveProduct(item.product.id)}
                            disabled={removingProduct}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="complete-purchase-btn"
                    onClick={handleCompletePurchase}
                    disabled={completingPurchase || !carts.find(cart => cart.id === currentCartId)?.items.length}
                  >
                    {completingPurchase ? <LoadingSpinner size="small" /> : 'Completar Compra'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
  
      {(removeError || updateError || completeError) && (
        <div className="error-message">
          <p>Error en la operación: {removeError || updateError || completeError}</p>
        </div>
      )}
    </div>
  )
} 