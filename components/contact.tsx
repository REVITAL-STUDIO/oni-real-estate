"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import realEstate from "public/teaser.jpeg";

const Contact = () => {
  return (
    <div className="h-700 w-full bg-[url('/contact.png')] bg-cover flex justify-center items-center">
      <div className="flex w-full h-[90%] justify-evenly items-center">
        <form className="flex flex-col  shadow-xl w-[30%] h-full  justify-center ">
          <h2 className=" uppercase  text-4xl    relative top-2 font-bold bg-gradient-to-b from-white via-white to-pine bg-clip-text text-transparent p-3 tracking-wide">
            Get in Touch and Start Saving Time Today.
          </h2>
          <input
            className="bg-transparent m-2 p-2 w-full  border-b border-white shadow-lg  text-white font-medium text-xs outline-none"
            type="text"
            placeholder="NAME"
          />
          <input
            className="bg-transparent m-2 p-2 w-full border-b border-white shadow-lg  text-white font-medium text-xs outline-none"
            type="text"
            placeholder="PHONE"
          />
          <input
            className="bg-transparent m-2 p-2 w-full border-b border-white  shadow-lg  text-white font-medium text-xs outline-none"
            type="text"
            placeholder="EMAIL"
          />
          <input
            className="bg-transparent m-2 p-2 w-full border-b border-white  shadow-lg  text-white font-medium text-xs outline-none"
            type="phone"
            placeholder="(XXX)-XXX-XXXX"
          />
          <button
            type="submit"
            className="text-black text-lg shadow-xl  shadow-black cursor-pointer mt-8 tracking-wide bg-white  w-12 h-12 rounded-full"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              aria-hidden="true"
              className="text-pine w-6 h-6"
              size="lg"
            />
          </button>
        </form>
        <div className="bg-mint w-1/2 h-3/4  ">
          <Image
            src={realEstate}
            alt="contact"
            className="w-[100%] h-[100%] shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
