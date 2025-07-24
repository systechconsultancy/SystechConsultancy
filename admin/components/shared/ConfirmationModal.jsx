"use client";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-start gap-4">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-0 text-left">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} type="button" className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={onConfirm} type="button" className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}