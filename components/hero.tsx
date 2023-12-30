"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from "../public/logo-real.png";
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
        <div className="w-full h-full  text-center text-white flex justify-center items-center">
          <Image src={Logo2} alt="logo" className="w-56 h-auto invert" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
