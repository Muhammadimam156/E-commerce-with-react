import React, { useState } from "react";

export default function MyAccount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        // expire token (remove)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowConfirm(false);
        window.location.href = "/";
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="bg-gray-800 p-6 rounded-lg shadow w-full max-w-sm text-center">
                    <p className="mb-4 text-gray-200">Please login to view your account</p>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded w-full"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
                <div className="space-y-3 mb-6">
                        <div>
                            <span className="text-gray-400 text-sm">Name</span>
                            <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                            <span className="text-gray-400 text-sm">Email</span>
                            <p className="font-medium break-all">{user.email}</p>
                        </div>
                </div>
                <button
                    onClick={() => setShowConfirm(true)}
                    className="w-full bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="text-sm text-gray-300 mb-6">
                            Do you really want to logout?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 transition px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
