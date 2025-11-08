import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo1.png';
import { Button } from "../ui/button";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []); // page load pe check

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };
    const [user, setUser] = useState(null);

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center">
            <header className="flex items-center justify-between p-6 border-b border-gray-800 w-full max-w-7xl">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img style={{ width: '75px', height: 'auto' }} src={logo} alt="Logo" />
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="hidden lg:flex space-x-8 items-center">
                    <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                    <Link to="/shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                    <Link to="/cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                    <Link to="/checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>
                    <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">👋 {user.name}</span>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline">
              <Link to="/login">
              Login
            </Link></Button>
              <Button variant="destructive">  <Link
              to="/signup"
             
            >
              Signup
            </Link></Button>
          </div>
        )}
      </div>
                </nav>
            </header>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="w-full bg-gray-800 lg:hidden">
                    <nav className="flex flex-col items-start space-y-2 p-4">
                        <Link onClick={toggleMenu} to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                        <Link onClick={toggleMenu} to="/shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                        <Link onClick={toggleMenu} to="/cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                        <Link onClick={toggleMenu} to="/checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>
                        <Link onClick={toggleMenu} to="/account" className="hover:text-gray-300 transition duration-200">My Account</Link>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
