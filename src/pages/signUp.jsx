//okkk
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

// Hoist Input component so its identity stays stable (focus not lost)
const Input = (props) => (
    <div className="relative">
        <input
            {...props}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
        />
    </div>
);

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const maxRetries = 3;
        let attempts = 0;
        let success = false;

        while (attempts < maxRetries && !success) {
            try {
                const res = await fetch("https://e-commerce-api-nine-navy.vercel.app/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    setMessage("Signup successful! Please login now.");
                    setTimeout(() => (window.location.href = "/login"), 1500);
                    success = true;
                } else {
                    setMessage(data.msg || "Signup failed. Please check your details.");
                }
            } catch (err) {
                attempts++;
                if (attempts < maxRetries) {
                    const delay = Math.pow(2, attempts) * 1000;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    console.error("API Call Error:", err);
                    setMessage("Network Error: Could not connect to the server.");
                }
            } finally {
                if (success || attempts === maxRetries) {
                    setLoading(false);
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 font-sans">
            <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden min-h-[550px]">
                <div className="hidden md:flex w-1/2 p-10 flex-col justify-center items-center text-center text-white bg-gray-900">
                    <h2 className="text-4xl font-extrabold mb-4">HELLO, FRIEND!</h2>
                    <p className="text-lg mb-8 opacity-90">
                        Enter your personal details and start journey with us.
                    </p>
                   
                </div>

                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-2 text-gray-800">Create Account</h2>
                        <p className="text-gray-500 mb-6">Join our platform today</p>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full rounded-md py-3 text-lg font-bold text-white transition duration-200 shadow-lg mt-8 ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 active:scale-[0.98]"
                            }`}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="h-5 w-5 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>
                        <p className="text-sm mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-gray-900 hover:text-gray-800"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>

                    {message && (
                        <p
                            className={`text-center text-sm mt-4 font-medium ${
                                message.includes("successful")
                                    ? "text-green-600"
                                    : "text-gray-900"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
