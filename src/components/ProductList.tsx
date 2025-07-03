import { useCartStore } from '../store/cartStore'
import { mockProducts } from '../data/mockProducts'
import './ProductList.css'

export const ProductList = () => {
  const { addProductToCart, currentCartId } = useCartStore()

  const handleAddToCart = (productId: string) => {
    if (!currentCartId) return
    
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      addProductToCart(currentCartId, product, 1)
    }
  }

  return (
    <div className="product-list">
      <h2 className="product-list-title">Productos Disponibles</h2>
      <div className="product-list-message">
        {
          !currentCartId ? "No hay carrito seleccionado, por favor seleccione un carrito" : ""
        }</div>
      <div className="product-grid">
        {mockProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span className="product-emoji">{product.imageUrl}</span>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product.id)}
                disabled={!currentCartId}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 