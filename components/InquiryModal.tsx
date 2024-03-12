"use client";

import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const InquiryModal: React.FC<{
  onClose: () => void;
  listingInquired: Listing;
}> = ({ onClose, listingInquired }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const createLead: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...leadData,
            source: `${listingInquired.address} Inquiry`,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `HTTP ERROR - Error creating lead. Status: ${response.status}`
        );
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMsg(
        "A network issue occured. Please check your internet connection and try again."
      );
      console.error(
        "NETWORK ERROR - Unable to reach the server or network issue. Error Message: ",
        error
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="relative bg-black  rounded-lg w-[90%] md:w-5/6 xl:w-1/3 h-3/4 p-8 font-agrandir tracking-wider"
      >
        <button
          className="absolute w-8 h-8 top-2 right-2 text-gray-100 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          <span
            className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
          ></span>
          <span
            className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
          ></span>
        </button>
        {isSuccess ? (
          <div className="flex justify-center items-center">Message Sent!</div>
        ) : (
          <div className="w-full h-full ">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Property Inquiry
            </h2>

            <form
              onSubmit={createLead}
              className="text-gray-800 h-5/6 flex flex-col gap-y-2"
            >
              <div className="mb-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border bg-transparent text-white font-montserrat font-light rounded focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData({ ...leadData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border bg-transparent text-white font-montserrat  rounded focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData({ ...leadData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4 h-1/2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 w-full border rounded bg-transparent text-white font-montserrat h-5/6 focus:outline-none focus:ring ring-gray-300 focus:border-gray-300"
                  required
                  value={leadData.message}
                  onChange={(e) =>
                    setLeadData({ ...leadData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-forest text-white tracking-wider rounded-xl p-4 hover:bg-forest/80 transition duration-200 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InquiryModal;
