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
          <h2
            className=" uppercase  text-4xl  font-cinzel  relative top-2 font-regular bg-gradient-to-b from-white via-white to-pine bg-clip-text text-transparent p-3 tracking-wide"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Get in Touch and Start Saving Time Today.
          </h2>
          <label
            className="block text-white font-montserrat ml-2  text-sm font-medium mb-2"
            placeholder="name"
          >
            Name
          </label>
          <input
            className=" m-2 p-2 w-3/4  border h-12 border-white shadow-lg  text-white font-medium text-sm  bg-gray-400/30 rounded-xl"
            type="text"
            placeholder="Name"
          />
          <label
            className="block text-white font-montserrat ml-2  text-sm font-medium mb-2"
            placeholder="Phone"
          >
            Phone
          </label>
          <input
            className=" m-2 p-2 w-3/4  border h-12 border-white shadow-lg  text-white font-medium text-sm  bg-gray-400/30 rounded-xl"
            type="text"
            placeholder="Phone"
          />
          <label
            className="block text-white font-montserrat ml-2  text-sm font-medium mb-2"
            placeholder="Email"
          >
            Email
          </label>
          <input
            className="  m-2 p-2 w-3/4  border h-12 border-white shadow-lg  text-white font-medium text-sm  bg-gray-400/30 rounded-xl"
            type="text"
            placeholder="Email"
          />

          <button
            type="submit"
            className="text-black text-lg shadow-xl flex justify-center items-center shadow-black cursor-pointer mt-8 tracking-wide bg-forest/75  w-3/4 h-16 rounded-full"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              aria-hidden="true"
              className="text-pine w-6 h-6 mr-2"
              size="lg"
            />{" "}
            <h2 className="font-bold text-white">Sign Up.</h2>
          </button>
        </form>
        <div className="bg-mint w-1/2 h-3/4  rounded-lg">
          <Image
            src={realEstate}
            alt="contact"
            className="w-[100%] h-[100%] shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
