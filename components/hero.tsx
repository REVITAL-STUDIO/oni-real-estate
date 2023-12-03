"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo2 from "../public/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import HeroSection from "../public/herosection.jpeg";

const Hero = () => {
  //dropdown
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);
  const [isOpen4, setIsOpen4] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  };
  const toggleDropdown4 = () => {
    setIsOpen4(!isOpen4);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[url('/herosection.png')] bg-cover ">
      <div className=" flex flex-col justify-center items-center w-5/6 h-3/6">
        {/* Logo & Slogan */}
        <div className="flex w-300 h-1/2 justify-center items-center">
          <div className="w-5/6 h-fit">
            <Image src={Logo2} alt="sub-logo" />
          </div>
          <div className="w-2/3 h-full text-2xl text-center text-white flex justify-center items-center">
            <h2 className="font-source">Where Houston Finds Homes</h2>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex w-5/6 justify-center h-2/5">
          <form className="w-5/6 h-full rounded-lg border bg-black flex items-center ">
            <input
              className="bg-transparent w-full border-none text-white font-thin text-xl px-1 outline-none"
              type="text"
              placeholder="Enter Location"
            />
          </form>
          <button className="w-24 h-full shadow-lg shadow-black rounded-lg bg-royal ml-4 flex items-center justify-center">
            <span className="tracking-wide font-regular text-white">
              SEARCH
            </span>
          </button>
        </div>
        {/* Dropdown Menu */}
        <div className="w-5/6 h-2/3 flex justify-center items-center">
          {/* Min Beds */}
          <div className="border text-white tracking-wider flex justify-center items-center bg-black w-32 h-16 rounded-lg mx-4">
            <span>
              Min Beds
              <button
                onClick={toggleDropdown}
                className=" ml-2 cursor-pointer text-white"
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            </span>
          </div>
          {/* Max Beds */}
          <div className="border bg-black  text-white tracking-wider flex justify-center items-center w-32 h-16 rounded-lg mx-4">
            <span>
              Max Beds
              <button
                onClick={toggleDropdown2}
                className=" ml-2 cursor-pointer text-white"
              >
                {isOpen2 ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            </span>
          </div>
          {/* Price */}
          <div className="border bg-black  text-white tracking-wider flex justify-center items-center w-32 h-16 rounded-lg mx-4">
            <span>
              Price
              <button
                onClick={toggleDropdown3}
                className=" ml-2 cursor-pointer text-white"
              >
                {isOpen3 ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            </span>
          </div>
          {/* Location */}
          <div className="border bg-black  text-white tracking-wider flex justify-center items-center w-32 h-16 rounded-lg mx-4">
            <span>
              Location
              <button
                onClick={toggleDropdown4}
                className=" ml-2 cursor-pointer text-white"
              >
                {isOpen4 ? (
                  <span className="rotate-90 transition-transform ease-in-out duration-300">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
