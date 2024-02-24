"use client"

import React from "react";



const InquiryModal: React.FC<{ onClose: () => void }> = ({onClose}) => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      // Handle inquiry submission logic here
      // You can access form data using e.target.elements
      onClose(); // Close the modal after submission
    };
  
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg w-96 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">Property Inquiry</h2>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default InquiryModal;