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
  const initialPrice: Price = { label: "Amount", min: 0, max: 0 };

  const togglePrice = (price: Price) => {
    // Clear existing selected prices
    setSelectedPrices([]);

    // Then add the newly clicked price
    setSelectedPrices((prev) => [...prev, price]);
  };

  useEffect(() => {
    // Set the initial price
    setSelectedPrices([initialPrice]);

    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []);

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

  const initialCity: City = { label: "City" };

  const toggleLocation = (location: City) => {
    // Clear existing selected prices
    setSelectedLocation([]);

    // Then add the newly clicked price
    setSelectedLocation((prev) => [...prev, location]);
  };

  useEffect(() => {
    // Set the initial price
    setSelectedLocation([initialCity]);

    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[url('/herosection.png')] bg-cover ">
      <div className=" flex flex-col justify-center items-center w-5/6 h-3/6">
        {/* Logo & Slogan */}
        <div className="flex w-300 h-1/3 justify-center items-center">
          <div className="w-5/6 h-fit">
            <Image src={Logo2} alt="sub-logo" />
          </div>
          <div className="w-2/3 h-full text-2xl text-center text-white flex justify-center items-center">
            <h2 className="font-source">Where Houston Finds Homes</h2>
          </div>
        </div>
        {/* search bar */}
        <div className="flex w-fit h-1/4  rounded-lg items-center justify-center">
          <div className="p-2">
            <button className="w-52 h-12 shadow-lg bg-gray-600/40 shadow-black  border-2 ml-4 flex items-center justify-center">
              <span className="tracking-wide uppercase font-regular flex gap-x-1 items-center justify-center text-sm text-white">
                Search
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
