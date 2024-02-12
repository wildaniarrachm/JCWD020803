import { api } from '../../libs/server.api';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const PaymentProof = ({ orderId, onClose }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setFilePreview(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('Please select an image to upload.', { autoClose: 3000 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('paymentProof', file);

      const token = localStorage.getItem('token');

      await api.patch(`transaction/upload-proof/${orderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('File uploaded successfully.', { autoClose: 3000 });
      onClose();
    } catch (err) {
      return err;
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
              Are you sure you want to upload the payment proof?
            </p>
            <label htmlFor="fileInput" className="cursor-pointer">
              {filePreview ? (
                <div className="flex justify-center w-full h-[30vh]">
                  <img
                    className="w-auto h-full"
                    src={filePreview}
                    alt="File Preview"
                  />
                </div>
              ) : (
                <div className="w-full h-[30vh] border-dashed border-2 border-gray-300 flex items-center justify-center">
                  Click here to select an image
                </div>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex justify-end mt-2">
              <button className="mr-2" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="bg-main-red text-white px-4 py-2 rounded-md"
                onClick={handleFileUpload}
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
