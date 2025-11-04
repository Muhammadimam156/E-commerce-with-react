import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import './index.css';

import Navbar from "./components/navbar/Navbar";
import Slider from "./components/slider/Slider";
import SpecialOffer from "./components/specialOffer/SpecialOffer";
import Products from "./components/products/Products";
import AdminProducts from "./pages/admin/products";
import AdminLayout from "./components/admin/AdminLayout";
import RequireAdmin from "./components/auth/RequireAdmin";

import Shop from "./pages/Shop"; 
import CustomerReviewApp from "./components/customerReviews/CustomerRewiews";
import AdminDashboard from "./pages/admin/dashboard";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Checkout from "./pages/Checkout.jsx";

const HomePageContent = () => (
  <div>
    <Slider />
    <SpecialOffer />
    <Products />
    <CustomerReviewApp />
  </div>
);

function App() {
  return (
  <div className=" min-h-screen"> 
    <Navbar />
    <main>
    <Routes>
      <Route path="/" element={<HomePageContent />} />
      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<AdminProducts />} />
      </Route>
      <Route path="/shop" element={<Shop />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    </main>
  </div>
  );
}

export default App;
