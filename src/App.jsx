import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import './index.css';
import Navbar from "./components/navbar/Navbar";
import Slider from "./components/slider/Slider";
import SpecialOffer from "./components/specialOffer/SpecialOffer";
import Products from "./components/products/Products";
import Shop from "./pages/Shop"; 
import CustomerReviewApp from "./components/customerReviews/CustomerRewiews";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import Signup from "./pages/signUp";
import Profile from "./pages/myAccount";


const HomePageContent = () => (
  <div>
    <Slider />
    <SpecialOffer />
    <Products />
    <CustomerReviewApp />
  </div>
);

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
  <div className=" min-h-screen"> 
    <Navbar />
    <main>
    <Routes>
      <Route path="/" element={<HomePageContent />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
          <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
          <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
          <Route path="*" element={<Navigate to="/" />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
    </main>
  </div>
  );
}

export default App;
