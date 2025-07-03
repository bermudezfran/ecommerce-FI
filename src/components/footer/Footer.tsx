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
            <li><a href="/promociones" className="footer-link">Promociones</a></li>
            <li><a href="/ayuda" className="footer-link">Ayuda</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Información</h4>
          <ul className="footer-links">
            <li><a href="/sobre-nosotros" className="footer-link">Sobre Nosotros</a></li>
            <li><a href="/terminos" className="footer-link">Términos y Condiciones</a></li>
            <li><a href="/privacidad" className="footer-link">Política de Privacidad</a></li>
            <li><a href="/contacto" className="footer-link">Contacto</a></li>
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
