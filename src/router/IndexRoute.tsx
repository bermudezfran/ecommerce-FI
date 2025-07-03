import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";
import { LoginRegistro } from "../pages/LoginRegistro";

export const IndexRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/auth" element={<LoginRegistro />} />
    </Routes>
  );
};