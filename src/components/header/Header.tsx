import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
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
            <span className="cart-count">0</span>
          </div>
          <div className="user-menu">
            <Link to="/auth" className="user-avatar">👤</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
