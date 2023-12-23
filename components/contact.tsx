"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="h-400 w-full bg-[url('/contact.png')] bg-cover flex justify-center items-center">
      <div className="flex w-full h-[90%] justify-center items-center">
        <form className="flex flex-col bg-gradient-to-b from-black via-mint to-mint shadow-xl w-1/4 h-full items-center justify-center ">
          <h2 className=" uppercase  text-lg  w-4/5 text-center  relative top-2 font-bold bg-gradient-to-b from-white via-white to-pine bg-clip-text text-transparent p-3 tracking-wide">
            Get in Touch and Start Saving Time Today.
          </h2>
          <input
            className="bg-transparent m-2 p-2 w-2/3 bg-white shadow-lg rounded-full text-black font-medium text-sm outline-none"
            type="text"
            placeholder="NAME"
          />
          <input
            className="bg-transparent m-2 p-2 w-2/3 bg-white shadow-lg rounded-full text-black font-medium text-sm outline-none"
            type="text"
            placeholder="PHONE"
          />
          <input
            className="bg-transparent m-2 p-2 w-2/3 bg-white shadow-lg rounded-full text-black font-medium text-sm  outline-none"
            type="text"
            placeholder="EMAIL"
          />
          <button
            type="submit"
            className="text-black text-lg shadow-xl shadow-black cursor-pointer mt-8 tracking-wide bg-white  w-12 h-12 rounded-full"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              aria-hidden="true"
              className="text-pine w-6 h-6"
              size="lg"
            />
          </button>
        </form>
        <div className="bg-mint w-1/4 h-full bg-[url('/real-estate.png')] bg-cover"></div>
      </div>
    </div>
  );
};

export default Contact;
