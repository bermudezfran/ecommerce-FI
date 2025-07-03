import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";
import { Productos } from "../pages/Productos";
import { LoginRegistro } from "../pages/LoginRegistro";

export const IndexRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/carritos" element={<Carrito />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/auth" element={<LoginRegistro />} />
      </Routes>
    </Layout>
  );
};