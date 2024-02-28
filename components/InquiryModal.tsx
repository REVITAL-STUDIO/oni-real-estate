"use client"

import React from "react";
import { useState } from "react";

interface Listing {
  id: number;
  address: string;
  description: string;
  pictures: string[];
  beds: number;
  baths: number;
  area: number;
  price: number;
}

const InquiryModal: React.FC<{ onClose: () => void, listingInquired: Listing }> = ({ onClose, listingInquired }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isError, setIsError] = useState(false)
  const [leadData, setLeadData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  })

  const createLead: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...leadData, source:`${listingInquired.address} Inquiry`}),
      })
      if (!response.ok) {

        throw new Error(`HTTP ERROR - Error creating lead. Status: ${response.status}`)
      } else {
        setIsSuccess(true)

      }
    }
    catch (error) {
      setIsError(true)
      setErrorMsg("A network issue occured. Please check your internet connection and try again.")
      console.error('NETWORK ERROR - Unable to reach the server or network issue. Error Message: ', error)

    }

  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-black/80  rounded-lg w-96 p-8">
        <button
          className="absolute top-4 right-4 text-gray-100 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {isSuccess ? <div className="flex justify-center items-center">Message Sent!</div> :
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Property Inquiry</h2>

            <form onSubmit={createLead} className="text-gray-800">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.name}
                  onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.email}
                  onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.message}
                  onChange={e => setLeadData({ ...leadData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-400 text-white rounded-md py-2 hover:bg-gray-600"
              >
                Submit
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default InquiryModal;