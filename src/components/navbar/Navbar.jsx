import React, { useState } from 'react';
import logo from '../../assets/logo/logo1.png';

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
                    <a href="/" className="hover:text-gray-300 transition duration-200">Home</a>
                    <a href="/Shop" className="hover:text-gray-300 transition duration-200">Shop</a>
                    <a href="/Cart" className="hover:text-gray-300 transition duration-200">Cart</a>
                    <a href="/Checkout" className="hover:text-gray-300 transition duration-200">Checkout</a>
                    <a href="/Account" className="hover:text-gray-300 transition duration-200">My Account</a>
                </nav>
            </header>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="w-full bg-gray-800 lg:hidden">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <a href="/" className="hover:text-gray-300 transition duration-200">Home</a>
                        <a href="/../pages/Shop" className="hover:text-gray-300 transition duration-200">Shop</a>
                        <a href="../../pages/Cart" className="hover:text-gray-300 transition duration-200">Cart</a>
                        <a href="../../pages/Checkout" className="hover:text-gray-300 transition duration-200">Checkout</a>
                        <a href="../../pages/Account" className="hover:text-gray-300 transition duration-200">My Account</a>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
