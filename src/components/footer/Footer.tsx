import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">EcommerceFI</h3>
          <p className="footer-description">
            Tu tienda online de confianza con las mejores ofertas y promociones especiales.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="/productos" className="footer-link">Productos</a></li>
            <li><a href="/carritos" className="footer-link">Mis Carritos</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Información</h4>
          <ul className="footer-links">
            <li className="footer-link">Sobre Nosotros</li>
            <li className="footer-link">Términos y Condiciones</li>
            <li className="footer-link">Política de Privacidad</li>
            <li className="footer-link">Contacto</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Promociones Especiales</h4>
          <div className="promo-info">
            <p>🎉 25% de descuento en 4 productos</p>
            <p>⭐ Descuentos para usuarios VIP</p>
            <p>📅 Ofertas por fechas especiales</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 EcommerceFI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
