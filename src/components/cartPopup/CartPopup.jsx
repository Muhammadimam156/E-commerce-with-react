import React from "react";

const CartPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-3">Login Required</h2>
        <p className="text-gray-600 mb-4">
          Please login to add items to your cart.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
