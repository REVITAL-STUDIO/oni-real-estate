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
        <div className="w-5/6 h-2/3  flex justify-evenly items-center ">
          {/* Beds */}
          <div className="relative w-32">
            <button
              onClick={toggleDropdown}
              className="ml-0 w-[100%] cursor-pointer text-white"
            >
              <div
                className={`text-center whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium">Beds </span>
              </div>
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 bg-black/50  w-[100%] h-42 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center font-regular">
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    1
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    2
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    3
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    4
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    5
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Bathroom */}
          <div className="relative w-32 h-auto">
            <button
              onClick={toggleDropdown2}
              className="ml-0 w-[100%] cursor-pointer text-white"
            >
              <div
                className={`text-center whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium">Baths</span>
              </div>
            </button>
            {isOpen2 && (
              <div className="absolute top-full left-0 mt-1 bg-black/50  w-[100%] h-42 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center font-regular">
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    1
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    2
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    3
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    4
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    5 +
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Price */}
          <div className="relative w-44 h-auto">
            <button
              onClick={toggleDropdown3}
              className="ml-0 cursor-pointer w-[100%] text-white"
            >
              <div
                className={`text-center whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium">Price</span>
              </div>
            </button>
            {isOpen3 && (
              <div className="absolute top-full left-0 mt-1 bg-black/50  w-[100%] h-42 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center font-regular">
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    $50,000 - $75,000
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    $75,000 - $150,000
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    $150,000 - $300,000
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    $300,000 - $750,000
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    $1,000,000 - $5,000,000
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Location */}
          <div className="relative w-44 h-auto">
            <button
              onClick={toggleDropdown4}
              className="ml-0 cursor-pointer w-[100%] text-white"
            >
              <div
                className={`text-center whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium">Location</span>
              </div>
            </button>
            {isOpen4 && (
              <div
                className={`absolute top-full left-0 mt-1 bg-black/50 w-[100%] h-42 shadow-[0_4px_9px_-4px_#3b71ca] transition-opacity duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] ${
                  isOpen4 ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center font-regular uppercase tracking-wide">
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    Montrose
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    Heights
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    Katy
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    Fort Bend
                  </li>
                  <li className="p-2 text-xs hover:bg-royal/40  transition duration-200 ease-in-out">
                    Missouri City
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
