import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";
import { LoginRegistro } from "../pages/LoginRegistro";

export const IndexRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/auth" element={<LoginRegistro />} />
      </Routes>
    </Layout>
  );
};