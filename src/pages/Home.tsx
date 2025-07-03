import { Link } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Bienvenido a <span className="hero-highlight">EcommerceFI</span>
            </h1>
            <p className="hero-subtitle">
              Descubre nuestras increíbles ofertas y promociones especiales.
            </p>
            <div className="hero-buttons">
              <Link to="/productos" className="btn btn-primary">
                Ver Productos
              </Link>
              <Link to="/carritos" className="btn btn-secondary">
                Mis Carritos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Características</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Carritos Inteligentes</h3>
              <p className="feature-description">
                Nuestro sistema detecta automáticamente las mejores promociones.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Descuentos Especiales</h3>
              <p className="feature-description">
                25% de descuento al comprar exactamente 4 productos.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Usuarios VIP</h3>
              <p className="feature-description">
                Beneficios exclusivos para nuestros clientes más fieles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
