import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAppStore } from '../store/appStore'
import type { CartType } from '../types/cart'
import './CartManager.css'

export const CartManager = () => {
  const { carts, addCart, removeCart, setCurrentCart, currentCartId } = useCartStore()
  const { currentUser, isCurrentDateSpecial } = useAppStore()
  const [selectedType, setSelectedType] = useState<CartType>('COMUN');
  const [openModalPurchase, setOpenModalPurchase] = useState(false);

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
            <h2>Productos en el carrito</h2>
            <button onClick={() => setOpenModalPurchase(false)}>Cerrar</button>
            <div className="cart-items-list">
              {carts.find(cart => cart.id === currentCartId)?.items.map(item => (
                <div key={item.product.id} className="cart-item">
                  <span>{item.product.name}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 