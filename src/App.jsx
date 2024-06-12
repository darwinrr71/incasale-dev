/* eslint-disable react-refresh/only-export-components */
/** Company: INCA DEVELOPMENT AB
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-03-11
 *     Program : App.jsx
 *   Path Name : incasale-dev/frontend/src
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * - Calls website pages through routes.
 * - Variabler
 *   Routes, Route  : true/false
 *   navArrayLinks  : This variable is export as PROPS to Navbar.jsx component
 *              sx  : Includes properties to a component
 *
 */
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material"; /**de esta forma la pagina se actualiza mas rapido */
import { navArrayLinks } from "./components/functions/Functions";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import AllCategories from "./components/views/AllCategories";
import NewNow from "./components/views/NewNow";
import Products from "./components/views/Products";
import HomeHeader from "./components/views/HomeHeader";
import DetailProduct from "./components/views/DetailProduct";
import ShoppingCart from "./components/views/ShoppingCart";
import Payment from "./components/views/Payment";
import Sale from "./components/views/Sale";


export const shoppingCartContext = createContext([]);

export default function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <>
      <shoppingCartContext.Provider
        value={{
          shoppingCart,
          setShoppingCart,
        }}
      >
        <Navbar navArrayLinks={navArrayLinks} />
        <HomeHeader />
        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allcategories" element={<AllCategories />} />
            <Route path="/newnow" element={<NewNow />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/products/:title" element={<Products />} />
            <Route path="/detailproduct/:title" element={<DetailProduct />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/payment/:names/:address/:email/:telefon/:delivery/:payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </shoppingCartContext.Provider>
    </>
  );
}