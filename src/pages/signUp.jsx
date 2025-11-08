import React, { useState } from "react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Signup successful! Please login now.");
                setTimeout(() => (window.location.href = "/login"), 1500);
            } else {
                setMessage(data.msg || "Signup failed.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error during signup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <form
                onSubmit={handleSignup}
                className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800/70 p-6 shadow-2xl"
            >
                <h2 className="text-3xl font-semibold mb-6 text-center">Create an Account</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-5 w-full rounded-lg py-3 font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                        loading ? "bg-green-500 cursor-not-allowed opacity-70" : "bg-green-600 hover:bg-green-500"
                    }`}
                    aria-busy={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="h-5 w-5 animate-spin text-white"
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
                            Signing Up...
                        </span>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                {message && (
                    <p className="text-center text-sm mt-3 text-gray-300">{message}</p>
                )}
            </form>
        </div>
    );
}
