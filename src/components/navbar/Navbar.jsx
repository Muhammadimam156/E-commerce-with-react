import React, { useState } from 'react';
import logo from '../../assets/logo/logo1.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

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
                    <Link to="/Shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                    <Link to="/Cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                    <Link to="/Checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>
                    <Link to="/Account" className="hover:text-gray-300 transition duration-200">My Account</Link>
                </nav>
            </header>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="w-full bg-gray-800 lg:hidden">
                    
                    <nav className="hidden lg:flex space-x-8 items-center">
                        <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                        <Link to="/Shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                        <Link to="/Cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                        <Link to="/Checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>
                        <Link to="/Account" className="hover:text-gray-300 transition duration-200">My Account</Link>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
