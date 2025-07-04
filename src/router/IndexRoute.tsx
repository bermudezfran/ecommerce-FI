import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";
import { Productos } from "../pages/Productos";
import { ConsultasVip } from "../pages/ConsultasVip";

export const IndexRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/carritos" element={<Carrito />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/consultas-vip" element={<ConsultasVip />} />
      </Routes>
    </Layout>
  );
};