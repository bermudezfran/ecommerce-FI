import { Link } from 'react-router-dom'
import './Header.css'
import { useCartStore } from '../../store/cartStore'
import { UserSelector } from '../ui/UserSelector'
import { DateSelector } from '../ui/DateSelector'
export const Header = () => {
  const { currentCartId } = useCartStore()

  return (
  
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">EcommerceFI</span>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Productos</Link>
          <Link to="/carritos" className="nav-link">Mis Carritos</Link>
        </nav>
        
        <div className="header-right">
          <div className="cart-icon">
            <span className="cart-icon-symbol">🛍️</span>
            <span className="cart-count">{currentCartId ? '1' : "0"}</span>
          </div>
          <DateSelector />
          <UserSelector />
        </div>
      </div>
    </header>
  )
}
