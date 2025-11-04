import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";

export default function Checkout() {
  const { user } = useAuth();
  const isLogged = !!user;
  const [showPrompt, setShowPrompt] = useState(!isLogged);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/checkout";

  const handleLogin = () => {
    navigate(`/login?redirect=${encodeURIComponent(next)}`);
  };

  const handleCancel = () => {
    setShowPrompt(false);
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      {!isLogged && (
        <p className="mt-2 text-sm text-gray-600">
          You need to be logged in to continue.
        </p>
      )}

      {isLogged ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <p>Checkout content goes here...</p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p>
            Please login to continue. You can also go back to the {" "}
            <Link className="underline" to="/shop">Shop</Link>.
          </p>
        </div>
      )}

      <Modal
        open={showPrompt}
        onClose={handleCancel}
        title="Login required"
        footer={
          <>
            <button
              onClick={handleCancel}
              className="rounded-md border border-gray-300 px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white"
            >
              Login
            </button>
          </>
        }
      >
        You must be logged in to proceed to checkout.
      </Modal>
    </div>
  );
}
