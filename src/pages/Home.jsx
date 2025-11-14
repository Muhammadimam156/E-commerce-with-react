import React, { useState, useEffect } from "react";
import Slider from "../components/slider/Slider";
import SpecialOffer from "../components/specialOffer/SpecialOffer";
import Products from "../components/products/Products";
import CartPopup from "../components/CartPopup";




const Home = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  // ✅ Add to Cart handler
  const handleAddToCart = (product) => {
    if (!user) {
      setShowPopup(true); // user not logged in → show popup
    } else {
      // add to cart logic (you can also store in backend or localStorage)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart ✅`);
    }
  };


  //nice

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Slider />
        <SpecialOffer />
        <section className="py-8 px-6">
          <h2 className="text-2xl font-bold mb-4">Our Products</h2>
          <Products products={products} onAddToCart={handleAddToCart} />
        </section>
      </main>

      {/* ✅ Login popup */}
      {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Home;
