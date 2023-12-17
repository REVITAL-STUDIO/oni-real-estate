"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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

const Listing = () => {
  //For sale for rent
  const [selectedOption, setSelectedOption] = useState<"For Sale" | "For Rent">(
    "For Sale"
  );

  const handleOptionClick = (option: "For Sale" | "For Rent") => {
    setSelectedOption(option);
  };

  //Toggle Dropdown State

  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);

  // Toggle functions
  const togglePricesDropdown = () => {
    setOpenDropdown((prev) => (prev === 1 ? null : 1));
  };

  const toggleBedDropdown = () => {
    setOpenDropdown((prev) => (prev === 2 ? null : 2));
  };

  const toggleBathDropdown = () => {
    setOpenDropdown((prev) => (prev === 3 ? null : 3));
  };

  const toggleLocationDropdown = () => {
    setOpenDropdown((prev) => (prev === 4 ? null : 4));
  };

  //Price
  const [selectedPrice, setSelectedPrices] = useState<Price[]>([]);
  const prices: Price[] = [
    { label: "$100,000 - $150,000", min: 100000, max: 150000 },
    { label: "$150,000 - $300,000", min: 150000, max: 300000 },
    { label: "$300,000 - $750,000", min: 300000, max: 750000 },
    { label: "$750,000 - $1,000,000", min: 150000, max: 300000 },
    { label: "$1,000,000 - $5,000,000", min: 1000000, max: 5000000 },
    { label: "$5,000,000 - $15,000,000", min: 5000000, max: 15000000 },
  ];

  const initialPrice: Price = { label: "Price Amount", min: 0, max: 0 };

  const togglePrices = (price: Price) => {
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

  //Bed
  const [selectedBeds, setSelectedBeds] = useState<BedType>();
  const initialBedsState = 0;

  const numOfBeds = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    return () => setSelectedBeds(initialBedsState);
  }, []);

  //Bath
  const [selectedBaths, setSelectedBaths] = useState<BathType>();
  const initialBathState = 0;

  const numOfBaths = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    return () => setSelectedBeds(initialBathState);
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

  useEffect(() => {
    // Set the initial price
    setSelectedLocation([initialCity]);

    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []);

  return (
    <div className="w-full flex h-16  bg-white">
      {/* Search Bar */}
      <form className="w-80 border border-r-black h-16  flex justify-between items-center ">
        <div className="w-6 h-6 ml-4">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
        </div>

        <input
          className="bg-transparent w-full ml-2 text-black font-thin text-md flex justify-center items-center  outline-none"
          type="text"
          placeholder="Address, City, Neighborhood"
        />
      </form>
      {/* Toggle Button RENT and SALE */}
      <div className="w-80 border-r-black border flex justify-center items-center transition-all">
        <div className="w-2/3 h-11 relative bg-gray-600 rounded-full text-xs flex justify-around items-center shadow-sm shadow-black">
          <span
            className={`text-white cursor-pointer ${
              selectedOption === "For Sale" ? "font-bold z-10 " : ""
            }`}
            onClick={() => handleOptionClick("For Sale")}
          >
            For Sale
          </span>
          <span
            className={`text-white cursor-pointer ${
              selectedOption === "For Rent" ? "font-bold z-10 " : ""
            }`}
            onClick={() => handleOptionClick("For Rent")}
          >
            For Rent
          </span>
          <div
            className="w-[50%] h-11 shadow-md bg-black absolute rounded-full top-1/2 transform -translate-y-1/2
                      duration-200 ease-in"
            style={{ left: selectedOption === "For Rent" ? "50%" : "0%" }}
          />
        </div>
      </div>
      {/* filters */}
      <div className="border w-2/3 h-full flex justify-evenly items-center">
        {/* Prices */}
        <div className="relative">
          <div className="w-48 h-10  border rounded-lg flex justify-around items-center">
            <span className="text-xs  w-5/6 text-center">
              {selectedPrice.length === 0
                ? "Price Amount"
                : selectedPrice.map((p) => p.label).join(", ")}{" "}
            </span>
            <button onClick={togglePricesDropdown} className="w-1/6">
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>{" "}
          </div>
          {openDropdown === 1 && (
            <div className="bg-white w-48 h-auto absolute top-full rounded-lg shadow-lg transition-all ease-in-out duration-200">
              {prices.map((price) => (
                <div
                  key={price.label}
                  className="p-2 cursor-pointer hover:bg-royal shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                  onClick={() => togglePrices(price)}
                >
                  {price.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Beds */}
        <div className="relative">
          <div className="w-48 h-10 border rounded-lg flex justify-around items-center">
            {" "}
            <span className="text-xs w-5/6 text-center">{`${
              selectedBeds || "0"
            }+ Beds`}</span>{" "}
            <button onClick={toggleBedDropdown} className="w-1/6">
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>{" "}
          </div>
          {openDropdown === 2 && (
            <div className="bg-white w-48 h-auto absolute top-full rounded-lg shadow-lg transition-all ease-in-out duration-200">
              {numOfBeds.map((bed) => (
                <div
                  key={bed}
                  className="p-2 cursor-pointer hover:bg-royal shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                  onClick={() => setSelectedBeds(bed)}
                >
                  {bed}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Baths */}
        <div className="relative">
          <div className="w-48 h-10 border rounded-lg flex justify-around items-center">
            {" "}
            <span className="text-xs w-5/6 text-center">{`${
              selectedBaths || "0"
            }+ Baths`}</span>{" "}
            <button onClick={toggleBathDropdown} className="w-1/6">
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>{" "}
          </div>
          {openDropdown === 3 && (
            <div className="bg-white w-48 h-auto absolute top-full rounded-lg shadow-lg transition-all ease-in-out duration-200">
              {numOfBaths.map((baths) => (
                <div
                  key={baths}
                  className="p-2 cursor-pointer hover:bg-royal shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                  onClick={() => setSelectedBaths(baths)}
                >
                  {baths}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Location */}
        <div className="relative">
          <div className="w-48 h-10 border rounded-lg flex justify-around items-center">
            {" "}
            <span className="text-xs w-5/6 text-center">
              {setLocation.length === 0 ? "City" : setLocation[0].label}
            </span>{" "}
            <button onClick={toggleLocationDropdown} className="w-1/6">
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>{" "}
          </div>
          {openDropdown === 4 && (
            <div className="bg-white w-48 h-auto absolute top-full rounded-lg shadow-lg transition-all ease-in-out duration-200">
              {locations.map((location) => (
                <div
                  key={location.label}
                  className="p-2 cursor-pointer hover:bg-royal shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                  onClick={() => setSelectedLocation([location])}
                >
                  {location.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
