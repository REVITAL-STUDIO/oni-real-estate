"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from "../public/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faMoneyBillWave,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeroSection from "../public/herosection.jpeg";

type BedType = number;
type BathType = number;
interface Price {
  label: string;
  min: number;
  max: number;
}
interface City {
  label: string;
}

type DropdownId = 1 | 2 | 3 | 4 | null;

const Hero = () => {
  //dropdown
  // State
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);

  // Toggle functions
  const toggleDropdown = () => {
    setOpenDropdown((prev) => (prev === 1 ? null : 1));
  };

  const toggleDropdown2 = () => {
    setOpenDropdown((prev) => (prev === 2 ? null : 2));
  };

  const toggleDropdown3 = () => {
    setOpenDropdown((prev) => (prev === 3 ? null : 3));
  };

  const toggleDropdown4 = () => {
    setOpenDropdown((prev) => (prev === 4 ? null : 4));
  };

  //# of beds
  const [selectedBeds, setSelectedBeds] = useState<BedType>();
  const initialBedsState = 1;

  useEffect(() => {
    return () => setSelectedBeds(initialBedsState);
  }, []);

  //# of baths
  const [selectedBaths, setSelectedBaths] = useState<BathType>();
  const initialBathsState = 1;

  useEffect(() => {
    return () => setSelectedBaths(initialBathsState);
  }, []);

  //set price
  const [selectedPrices, setSelectedPrices] = useState<Price[]>([]);
  const prices: Price[] = [
    { label: "$100,000 - $150,000", min: 100000, max: 150000 },
    { label: "$150,000 - $300,000", min: 150000, max: 300000 },
    { label: "$300,000 - $750,000", min: 300000, max: 750000 },
    { label: "$750,000 - $1,000,000", min: 150000, max: 300000 },
    { label: "$1,000,000 - $5,000,000", min: 1000000, max: 5000000 },
    { label: "$5,000,000 - $15,000,000", min: 5000000, max: 15000000 },
  ];

  const togglePrice = (price: Price) => {
    // Clear existing selected prices
    setSelectedPrices([]);

    // Then add the newly clicked price
    setSelectedPrices((prev) => [...prev, price]);
  };

  //Location
  const [setLocation, setSelectedLocation] = useState<City[]>([]);
  const locations: City[] = [
    { label: "Montrose" },
    { label: "Heights" },
    { label: "Katy" },
    { label: "Fort Bend" },
    { label: "Missouri City" },
    { label: "Pearland" },
    { label: "Cinco Ranch" },
  ];

  const toggleLocation = (location: City) => {
    // Clear existing selected prices
    setSelectedLocation([]);

    // Then add the newly clicked price
    setSelectedLocation((prev) => [...prev, location]);
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
          <form className="w-5/6 max-h-16 rounded-lg  bg-black flex items-center ">
            <input
              className="bg-transparent w-full border-none text-white font-thin text-xl px-8 outline-none"
              type="text"
              placeholder="Enter Location"
            />
          </form>
          <button className="w-24 max-h-16 shadow-lg shadow-black rounded-lg bg-royal ml-4 flex items-center justify-center">
            <span className="tracking-wide font-regular flex gap-x-1 items-center justify-center text-sm text-white">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              SEARCH
            </span>
          </button>
        </div>
        {/* Dropdown Menu */}
        <div className="w-5/6 h-2/3 flex justify-evenly items-center ">
          {/* Beds */}
          <div className="relative max-w-48">
            <button
              onClick={toggleDropdown}
              className="ml-0 w-[100%] cursor-pointer text-white "
            >
              <div
                className={`text-center min-w-[100px] justify-center items-center flex  h-fit whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium text-xs ml-2">
                  Beds: {selectedBeds || " "}{" "}
                </span>
              </div>
            </button>
            {openDropdown === 1 && (
              <div
                className={`absolute top-full left-0 mt-1  bg-black/50  w-[100%] max-h-48 shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                style={{
                  opacity: openDropdown === 1 ? 1 : 0,
                  transform:
                    openDropdown === 1 ? "translateY(0)" : "translateY(-10px)",
                  transition: "  300ms ease-in-out",
                }}
              >
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center text-sm cursor-pointer font-regular">
                  <li
                    onClick={() => setSelectedBeds(1)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    1
                  </li>
                  <li
                    onClick={() => setSelectedBeds(2)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    2
                  </li>
                  <li
                    onClick={() => setSelectedBeds(3)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    3
                  </li>
                  <li
                    onClick={() => setSelectedBeds(4)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    4
                  </li>
                  <li
                    onClick={() => setSelectedBeds(5)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    5
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Bathroom */}
          <div className="relative max-w-48 h-auto">
            <button
              onClick={toggleDropdown2}
              className="ml-0 w-[100%] cursor-pointer text-white"
            >
              <div
                className={`text-center min-w-[100px] justify-center items-center flex  h-fit whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium text-xs ml-2">
                  Baths: {selectedBaths || " "}{" "}
                </span>
              </div>
            </button>
            {openDropdown === 2 && (
              <div
                className={`absolute top-full left-0 mt-1 transition duration-300 bg-black/50  w-[100%] max-h-48 shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                style={{
                  opacity: openDropdown === 2 ? 1 : 0,
                  transform:
                    openDropdown === 2 ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center text-sm  cursor-pointer font-regular">
                  <li
                    onClick={() => setSelectedBaths(1)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    1
                  </li>
                  <li
                    onClick={() => setSelectedBaths(2)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    2
                  </li>
                  <li
                    onClick={() => setSelectedBaths(3)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    3
                  </li>
                  <li
                    onClick={() => setSelectedBaths(4)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    4
                  </li>
                  <li
                    onClick={() => setSelectedBaths(5)}
                    className="p-2  hover:bg-royal/40  transition duration-200 ease-in-out"
                  >
                    5
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Price */}
          <div className="relative max-w-48 h-auto">
            <button
              onClick={toggleDropdown3}
              className="ml-0 cursor-pointer w-[100%] text-white"
            >
              <div
                className={`text-center min-w-[100px] justify-center items-center flex  h-fit whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <span className="font-medium ml-2">
                  Price: {selectedPrices.map((p) => p.label).join(", ")}
                </span>
              </div>
            </button>
            {openDropdown === 3 && (
              <div
                className="absolute overflow-y-auto top-full transition-opacity duration-300 ease-in-out left-0 mt-1 bg-black/50 w-[100%] max-h-48 shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] "
                style={{
                  opacity: openDropdown === 3 ? 1 : 0,
                  transform:
                    openDropdown === 3 ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {/* Your dropdown content goes here */}
                <ul className="text-white text-center font-regular">
                  {prices.map((price) => (
                    <li
                      onClick={() => togglePrice(price)}
                      key={price.label}
                      className="p-2 text-sm cursor-pointer hover:bg-royal/40  transition duration-200 ease-in-out"
                    >
                      {price.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Location */}
          <div className="relative max-w-36 h-auto">
            <button
              onClick={toggleDropdown4}
              className="ml-0 cursor-pointer w-[100%] text-white"
            >
              <div
                className={`text-center min-w-[100px]  justify-center items-center flex   whitespace-nowrap rounded bg-black px-8 pb-2 pt-2.5 text-xs font-light uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
              >
                <div></div>
                <span className="font-medium ml-2">
                  Location: {setLocation.map((p) => p.label).join(", ")}
                </span>
              </div>
            </button>
            {openDropdown === 4 && (
              <div
                className={`absolute top-full overflow-y-auto left-0 mt-1 bg-black/50 w-[100%] max-h-48 shadow-[0_4px_9px_-4px_#3b71ca]  hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] `}
                style={{
                  opacity: openDropdown === 4 ? 1 : 0,
                  transform:
                    openDropdown === 4 ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {/* Your dropdown content goes here */}
                <ul className="text-white cursor-pointer text-center font-regular uppercase tracking-wide">
                  {locations.map((location) => (
                    <li
                      onClick={() => toggleLocation(location)}
                      key={location.label}
                      className="p-2 text-sm hover:bg-royal/40  transition duration-200 ease-in-out"
                    >
                      {location.label}
                    </li>
                  ))}
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
