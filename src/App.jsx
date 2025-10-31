import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import './index.css';

// 1. Zaroori Imports
import Navbar from "./components/navbar/Navbar";
import Slider from "./components/slider/Slider";
import SpecialOffer from "./components/specialOffer/SpecialOffer";
import Products from "./components/products/Products";
// import Footer from "./components/footer/Footer"; // Assuming you have a Footer component

// Page Imports
import Shop from "./pages/Shop"; 
import CustomerReviewApp from "./components/customerReviews/CustomerRewiews";
// import Checkout from "./pages/Checkout"; 
// import MyAccount from "./pages/MyAccount"; 

// === HOME PAGE CONTENT ===
// Yeh component aapke home screen ke saare sections ko ek saath rakhega.
const HomePageContent = () => (
    <div>
        <Slider />
        <SpecialOffer />
        <Products />
       <CustomerReviewApp />
        {/* Agar aur sections hain to yahan aayenge */}
    </div>
);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen"> 
      
      {/* 2. HAMESHA DIKHNE WALE COMPONENTS (Routes ke Bahar) */}
      <Navbar />
      
     
      <main>
          <Routes>
              
              <Route path="/" element={<HomePageContent />} />
              
              
              <Route path="/shop" element={<Shop />} /> 

              {/* Other Pages */}
              {/* <Route path="/checkout" element={<Checkout />} /> */}
              {/* <Route path="/my-account" element={<MyAccount />} /> */}
          </Routes>
      </main>

      {/* 4. HAMESHA DIKHNE WALE COMPONENTS (Routes ke Bahar) */}
      {/* <Footer />  */}

    </div>
  );
}

export default App;
