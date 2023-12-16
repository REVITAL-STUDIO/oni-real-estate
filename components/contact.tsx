"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="h-400 w-full bg-[url('/contact.png')] bg-cover flex">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <form className="flex flex-col bg-white/40 shadow-xl w-1/4 h-full items-center justify-center rounded-md m-4 gap-x-2">
          <h2 className="text-white text-xl  w-4/5 text-center  relative top-2  font-regular p-3 tracking-wide">
            Get in Touch and Start Saving Time Today.
          </h2>
          <input
            className="bg-transparent mb-2 p-2 w-3/4 border-b border-white text-white font-medium text-md px-1 outline-none"
            type="text"
            placeholder="NAME"
          />
          <input
            className="bg-transparent mb-2 p-2 w-3/4 border-b border-white text-white font-medium text-md px-1 outline-none"
            type="text"
            placeholder="PHONE"
          />
          <input
            className="bg-transparent mb-2 p-2 w-3/4 border-b border-white text-white font-medium text-md px-1 outline-none"
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
              className="text-royal"
              size="lg"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
