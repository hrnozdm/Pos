import HomePage from "./pages/HomePage";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
export const AuthGuard = ({children})=>{
  const isLogin = localStorage.getItem("posUser");
  if (isLogin){
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
function App() {
  return (
    <div>
       <BrowserRouter>
          <Routes>
              <Route element={
                <AuthGuard>
                  <HomePage/>
                </AuthGuard>
              } path="/"/>
              <Route element={
                <AuthGuard>
                  <CartPage/>
                </AuthGuard>
              } path="/cart"/>
              <Route element={
                <AuthGuard>
                  <BillPage/>
                </AuthGuard>
              } path="/bills"/>
              <Route element={
                <AuthGuard>
                  <CustomerPage/>
                </AuthGuard>
              } path="/customers"/>
              <Route element={
                <AuthGuard>
                  <StatisticPage/>
                </AuthGuard>
              } path="/statistic"/>
              <Route element={
                <AuthGuard>
                  <ProductPage/>
                </AuthGuard>
              } path="/products"/>
              <Route element={<Register/>} path="/register"/>
              <Route element={<Login/>} path="/login"/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}



export default App;
