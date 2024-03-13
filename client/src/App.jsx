import HomePage from "./pages/HomePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <div>
       <BrowserRouter>
          <Routes>
              <Route element={<HomePage/>} path="/"/>
              <Route element={<CartPage/>} path="/cart"/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
