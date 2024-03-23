import HomePage from "./pages/HomePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
function App() {
  return (
    <div>
       <BrowserRouter>
          <Routes>
              <Route element={<HomePage/>} path="/"/>
              <Route element={<CartPage/>} path="/cart"/>
              <Route element={<BillPage/>} path="/bills"/>
              <Route element={<CustomerPage/>} path="/customers"/>
              <Route element={<StatisticPage/>} path="/statistic"/>
              <Route element={<ProductPage/>} path="/products"/>
              <Route element={<Register/>} path="/register"/>
              <Route element={<Login/>} path="/login"/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
