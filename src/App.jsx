import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import './index.css';

import Navbar from "./components/navbar/Navbar";
import Slider from "./components/slider/Slider";
import SpecialOffer from "./components/specialOffer/SpecialOffer";
import Products from "./components/products/Products";


import Shop from "./pages/Shop"; 
import CustomerReviewApp from "./components/customerReviews/CustomerRewiews";

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
      {/* <Route path="/admin" element={<AdminLayout />}> */}
      {/* <Route index element={<AdminDashboard />} />
      <Route path="products" element={<AdminProducts />} />
      </Route> */}
      <Route path="/shop" element={<Shop />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/account" element={<Account />} /> */}
      {/* <Route path="/checkout" element={<Checkout />} /> */}
    </Routes>
    </main>
  </div>
  );
}

export default App;
