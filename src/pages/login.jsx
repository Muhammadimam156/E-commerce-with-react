import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password, role }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setMessage("Login successful!");
                const userRole = data?.user?.role || role;
                if (userRole === "admin") {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/";
                }
            } else {
                setMessage(data.msg || "Login failed.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error logging in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <form
                onSubmit={handleLogin}
                className="bg-gray-800/80 backdrop-blur p-8 rounded-lg shadow-lg w-80 border border-gray-700"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <select
                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={loading}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed`}
                        aria-busy={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>
                {message && (
                    <p className="text-center text-sm mt-4">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
