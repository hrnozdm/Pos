import HomePage from "./pages/HomePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
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
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
