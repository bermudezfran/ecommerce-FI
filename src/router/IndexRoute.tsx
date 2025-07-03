import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Carrito } from "../pages/Carrito";

export const IndexRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
  );
};