"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

interface Property {
  label: string;
}

type DropdownId = 1 | 2 | 3 | 4 | 5 | null;

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

  const togglePropertyDropdown = () => {
    setOpenDropdown((prev) => (prev === 5 ? null : 5));
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

  const initialCity: City = { label: "Location" };

  useEffect(() => {
    // Set the initial price
    setSelectedLocation([initialCity]);

    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []);

  //Property
  const [setProperty, setSelectedProperty] = useState<Property[]>([]);
  const property: Property[] = [
    { label: "Duplex" },
    { label: "Apartment" },
    { label: "House" },
    { label: "Condo" },
  ];

  const initialProperty: Property = { label: "Type" };

  useEffect(() => {
    // Set the initial price
    setSelectedProperty([initialProperty]);

    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []);

  return (
    <div className="">
      <div className="font-agrandir h-1/2 text-black w-[95%]  ">
        <h2 className="p-4 text-4xl tracking-wide xl:text-6xl">Properties</h2>
        <p className="font-montserrat text-sm p-4 xl:text-base xl:w-1/2">
          Crafting exceptional real estate investments grounded in creativity,
          expert craftsmanship, and an unparalleled commitment to meticulous
          attention to detail.
        </p>
      </div>
      <div className="w-full flex flex-col xl:flex-row xl:h-16 h-1/3 font-montserrat bg-white">
        {/* Toggle Button RENT and SALE */}
        <div className="xl:w-80 w-60 flex justify-center items-center transition-all">
          <div className="w-5/6 h-11 relative text-xl xl:text-2xl uppercase tracking-wider flex justify-around items-center ">
            <span
              className={` cursor-pointer ${
                selectedOption === "For Sale" ? "font-bold z-10 text-black" : ""
              }`}
              onClick={() => handleOptionClick("For Sale")}
            >
              Sale
            </span>
            <span
              className={`cursor-pointer ${
                selectedOption === "For Rent" ? "font-bold z-10 text-black" : ""
              }`}
              onClick={() => handleOptionClick("For Rent")}
            >
              Rent
            </span>
            <div
              className="w-[50%] h-11  border-b border-black absolute  top-1/2 transform -translate-y-1/2
                      duration-200 ease-in"
              style={{ left: selectedOption === "For Rent" ? "50%" : "0%" }}
            />
          </div>
        </div>
        {/* filters */}
        <div className=" w-5/6 h-full xl:flex justify-evenly items-center hidden ">
          {/* Prices */}
          <div className="relative">
            <div className="w-52 h-12 border border-gray-300 z-50  rounded-md flex justify-center items-center">
              <span className="text-xs  w-[100%] text-center">
                {selectedPrice.length === 0
                  ? "Price Amount"
                  : selectedPrice.map((p) => p.label).join(", ")}{" "}
              </span>
              <div className="w-1/6 mr-2">
                <button onClick={togglePricesDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 1 && (
              <div className="bg-white w-52 h-auto absolute top-full z-30  transition-all ease-in-out duration-200">
                {prices.map((price) => (
                  <div
                    key={price.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
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
            <div className="w-52 h-12 z-50 border border-gray-300  flex justify-center rounded-md items-center">
              {" "}
              <span className="text-xs w-5/6 text-center">{`${
                selectedBeds || "0"
              }+ Beds`}</span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleBedDropdown} className="">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="text-black"
                  />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 2 && (
              <div className="bg-white w-52 h-auto absolute top-full z-30   transition-all ease-in-out duration-200">
                {numOfBeds.map((bed) => (
                  <div
                    key={bed}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
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
            <div className="w-52 h-12 border border-gray-300 z-10  rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">{`${
                selectedBaths || "0"
              }+ Baths`}</span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleBathDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 3 && (
              <div className="bg-white w-52 h-auto absolute z-30 top-full   transition-all ease-in-out duration-200">
                {numOfBaths.map((baths) => (
                  <div
                    key={baths}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
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
            <div className="w-52 h-12 border border-gray-300  z-10 rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">
                {setLocation.length === 0 ? "Location" : setLocation[0].label}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleLocationDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 4 && (
              <div className="bg-white w-52 h-auto absolute z-30 top-full  transition-all ease-in-out duration-200">
                {locations.map((location) => (
                  <div
                    key={location.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                    onClick={() => setSelectedLocation([location])}
                  >
                    {location.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Property Type */}
          <div className="relative">
            <div className="w-52 h-12 border border-gray-300 z-10 rounded-md flex  justify-around items-center">
              <span className="text-xs w-5/6 text-center">
                {setProperty.length === 0 ? "Type" : setProperty[0].label}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={togglePropertyDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 5 && (
              <div className="bg-white w-52 h-auto absolute z-30 top-full  ">
                {property.map((properties) => (
                  <div
                    key={properties.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                    onClick={() => setSelectedProperty([properties])}
                  >
                    {properties.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Responsive filters */}
        <div className=" w-full h-full flex flex-wrap gap-4 items-center  xl:hidden p-4">
          {/* Prices */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300 z-50  rounded-md flex justify-center items-center">
              <span className="text-xs  w-[100%] text-center">
                {selectedPrice.length === 0
                  ? "Price Amount"
                  : selectedPrice.map((p) => p.label).join(", ")}{" "}
              </span>
              <div className="w-1/6 mr-2">
                <button onClick={togglePricesDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 1 && (
              <div className="bg-white w-40 h-auto absolute top-full z-30  transition-all ease-in-out duration-200">
                {prices.map((price) => (
                  <div
                    key={price.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
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
            <div className="w-40 h-12 z-50 border border-gray-300  flex justify-center rounded-md items-center">
              {" "}
              <span className="text-xs w-5/6 text-center">{`${
                selectedBeds || "0"
              }+ Beds`}</span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleBedDropdown} className="">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="text-black"
                  />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 2 && (
              <div className="bg-white w-40 h-auto absolute top-full z-30   transition-all ease-in-out duration-200">
                {numOfBeds.map((bed) => (
                  <div
                    key={bed}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
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
            <div className="w-40 h-12 border border-gray-300 z-10  rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">{`${
                selectedBaths || "0"
              }+ Baths`}</span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleBathDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 3 && (
              <div className="bg-white w-40 h-auto absolute z-30 top-full   transition-all ease-in-out duration-200">
                {numOfBaths.map((baths) => (
                  <div
                    key={baths}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
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
            <div className="w-40 h-12 border border-gray-300  z-10 rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">
                {setLocation.length === 0 ? "Location" : setLocation[0].label}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleLocationDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 4 && (
              <div className="bg-white w-40 h-auto absolute z-30 top-full  transition-all ease-in-out duration-200">
                {locations.map((location) => (
                  <div
                    key={location.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                    onClick={() => setSelectedLocation([location])}
                  >
                    {location.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Property Type */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300 z-10 rounded-md flex  justify-around items-center">
              <span className="text-xs w-5/6 text-center">
                {setProperty.length === 0 ? "Type" : setProperty[0].label}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={togglePropertyDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            {openDropdown === 5 && (
              <div className="bg-white w-40 h-auto absolute z-30 top-full  ">
                {property.map((properties) => (
                  <div
                    key={properties.label}
                    className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white tracking-wider text-xs text-center transition ease-in-out duration-150"
                    onClick={() => setSelectedProperty([properties])}
                  >
                    {properties.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
