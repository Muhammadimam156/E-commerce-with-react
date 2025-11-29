
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Input = (props) => (
    <div className="relative">
        <input
            {...props}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
        />
    </div>
);

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("https://e-commerce-api-nine-navy.vercel.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                // Expecting data.user = { name, email, ... , token? }
                localStorage.setItem("user", JSON.stringify(data.user));
                setMessage("Login successful! Redirecting...");
                setTimeout(() => {
                    navigate("/"); // Home page redirect
                }, 800);
            } else {
                setMessage(data.msg || "Login failed. Invalid email or password.");
            }
        } catch {
            setMessage("Network Error: Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 font-sans">
            <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden min-h-[550px]">
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-2 text-gray-800">Sign In</h2>
                    <p className="text-gray-500 mb-6">Use your account credentials</p>

                    <form onSubmit={handleLogin} className="space-y-5">
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

                        <a
                            href="/forgot-password"
                            className="block text-sm text-gray-500 hover:text-gray-900 transition text-right"
                        >
                            Forgot your password?
                        </a>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full rounded-md py-3 text-lg font-bold text-white transition duration-200 shadow-lg ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 active:scale-[0.98]"
                            }`}
                            aria-busy={loading}
                        >
                            {loading ? "Signing In..." : "SIGN IN"}
                        </button>
                        <p className="text-sm mt-4">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-gray-900 hover:text-gray-800"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>

                    {message && (
                        <p
                            className={`text-center text-sm mt-4 font-medium ${
                                message.includes("successful") ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </div>

                <div className="hidden md:flex w-1/2 p-10 flex-col justify-center items-center text-center text-white bg-gray-900">
                    
                    <h2 className="text-4xl font-extrabold mb-4">WELCOME BACK!</h2>
                    <p className="text-lg mb-8 opacity-90">
                        To keep connected with us please login with your personal info.
                    </p>
                   
                    
                </div>
            </div>
        </div>
    );
}
