import React, { useState } from 'react';
import axios from 'axios';

export const CancelOrder = ({ orderId, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const token = localStorage.getItem('token');

  const handleCancelOrder = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/transaction/cancel/${orderId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onClose();
    } catch (err) {
      console.error('Error cancelling order:', err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl">
            <p className="text-lg font-semibold mb-3">
              Are you sure you want to cancel the order?
            </p>
            <div className="flex justify-end mt-2">
              <button className="mr-2" onClick={closeModal}>
                Close
              </button>
              <button
                className="bg-main-red text-white px-4 py-2 rounded-md"
                onClick={handleCancelOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
