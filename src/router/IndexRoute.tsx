import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";

export const IndexRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/carritos" element={<Carrito />} />
        <Route path="/productos" element={<div>Página de Productos</div>} />
        <Route path="/promociones" element={<div>Página de Promociones</div>} />
        <Route path="/ayuda" element={<div>Página de Ayuda</div>} />
        <Route path="/sobre-nosotros" element={<div>Sobre Nosotros</div>} />
        <Route path="/terminos" element={<div>Términos y Condiciones</div>} />
        <Route path="/privacidad" element={<div>Política de Privacidad</div>} />
        <Route path="/contacto" element={<div>Contacto</div>} />
      </Routes>
    </Layout>
  );
};