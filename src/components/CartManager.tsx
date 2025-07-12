import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAppStore } from '../store/appStore'
import { useApi } from '../hooks/useApi'
import { removeProductFromCart, updateCartQuantity, completePurchase } from '../services/mockApi'
import { LoadingSpinner } from './LoadingSpinner'
import type { CartType } from '../types/cart'
import './CartManager.css'
import { isSpecialDate } from '../data/mockDates'

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
    getCartTotal,
    clearCartId 
  } = useCartStore()

  const { 
    currentUser,
    currentUserId, 
    simulatedDate,
    addPurchaseToHistory, 
    updateUserVipStatus 
  } = useAppStore()
  const user = useAppStore(s => s.users.find(u => u.id === currentUserId))
  const [openModalPurchase, setOpenModalPurchase] = useState(false);
  const [showVipPopup, setShowVipPopup] = useState(false);

  const { execute: executeRemoveProduct, loading: removingProduct, error: removeError } = useApi(removeProductFromCart)
  const { execute: executeUpdateQuantity, loading: updatingQuantity, error: updateError } = useApi(updateCartQuantity)
  const { execute: executeCompletePurchase, loading: completingPurchase, error: completeError } = useApi(completePurchase)

  const getAutoDetectedType = (): CartType => {
    if (currentUser?.isVip) return 'VIP'
    if (isSpecialDate(simulatedDate)) return 'FECHA_ESPECIAL'
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

  const handleCompletePurchase = async (cartId: string) => {
    const currentCart = carts.find(cart => cart.id === cartId)
    if (currentCart && currentCart.items.length > 0 && user) {
      const totalPaid = getCartTotal(cartId)
      
      await executeCompletePurchase(cartId, totalPaid)
      
      if (!completeError) {
        addPurchaseToHistory(user.id, {
          cartId: cartId,
          amountPaid: totalPaid,
          date: simulatedDate
        })
        
        if (totalPaid > 10000 && !user.isVip) {
          updateUserVipStatus(user.id, true)
          setShowVipPopup(true)
        }
        
        completeCart(cartId)
        setOpenModalPurchase(false)
        clearCartId(cartId)
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
          <p><strong>Usuario actual:</strong> {user?.name}</p>
          {isSpecialDate(simulatedDate) && <p><strong>Fecha especial activa</strong></p>}
          <p><strong>Tipo detectado:</strong> {user?.isVip ? 'VIP' : 'Común'}</p>
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
      
      {showVipPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>¡Felicitaciones! 🥳</h2>
              <button className="close-btn" onClick={() => setShowVipPopup(false)}>✕</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Tu compra superó los $10.000.</p>
              <p><strong>¡Ahora es un cliente VIP!</strong></p>
              <p>Disfrutarás de beneficios exclusivos en tu próxima compra.</p>
              <button className="complete-purchase-btn" onClick={() => setShowVipPopup(false)}>
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}

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
                    onClick={() => handleCompletePurchase(currentCartId)}
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