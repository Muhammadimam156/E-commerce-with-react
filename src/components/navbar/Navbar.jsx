import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo1.png';
import { Button } from "../ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleMenu = () => setIsOpen((v) => !v);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            setUser(raw ? JSON.parse(raw) : null);
        } catch {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center">
            <header className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-800 w-full max-w-7xl">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" aria-label="Go to home">
                        <img
                            style={{ width: '75px', height: 'auto' }}
                            src={logo}
                            alt="Brand logo"
                            className="hover:opacity-90 transition-opacity"
                        />
                    </Link>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none p-2 rounded-md hover:bg-gray-800"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-8 items-center">
                    <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                    <Link to="/shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                    <Link to="/cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                    <Link to="/checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>

                    {user ? (
                        <div className="flex items-center">
                            <Link to="/profile" aria-label="My Account" className="group">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold uppercase ring-2 ring-gray-600 group-hover:ring-gray-400 transition">
                                    {user?.name?.trim()?.charAt(0) ||
                                     user?.username?.trim()?.charAt(0) ||
                                     user?.email?.trim()?.charAt(0) ||
                                     'U'}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-2 ml-2">
                            <Button variant="outline" size="lg">
                                <Link to="/signup">Signup</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </header>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="w-full bg-gray-800 lg:hidden border-b border-gray-700">
                    <div className="w-full max-w-7xl mx-auto">
                        <nav className="flex flex-col items-start space-y-2 p-4">
                            <Link onClick={toggleMenu} to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                            <Link onClick={toggleMenu} to="/shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
                            <Link onClick={toggleMenu} to="/cart" className="hover:text-gray-300 transition duration-200">Cart</Link>
                            <Link onClick={toggleMenu} to="/checkout" className="hover:text-gray-300 transition duration-200">Checkout</Link>

                             {user ? (
                        <div className="flex items-center">
                            <Link to="/profile" aria-label="My Account" className="group">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold uppercase ring-2 ring-gray-600 group-hover:ring-gray-400 transition">
                                    {user?.name?.trim()?.charAt(0) ||
                                     user?.username?.trim()?.charAt(0) ||
                                     user?.email?.trim()?.charAt(0) ||
                                     'U'}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-2 ml-2">
                            <Button variant="outline" size="lg">
                                <Link to="/signup">Signup</Link>
                            </Button>
                        </div>
                    )}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
