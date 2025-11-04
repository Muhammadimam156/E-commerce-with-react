import React from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-lg">
        {title && (
          <div className="border-b px-5 py-3 text-base font-semibold">{title}</div>
        )}
        <div className="px-5 py-4 text-sm text-gray-700">{children}</div>
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t">
          {footer}
        </div>
      </div>
    </div>
  );
}
