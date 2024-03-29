"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Price {
  label: string;
  min: number;
  max: number;
}

interface Filters {
  option: string;
  price: Price;
  beds: number;
  baths: number;
  location: string;
  property: string;
}

type DropdownId = 1 | 2 | 3 | 4 | 5 | null;

interface ListingProps {
  onFiltersChange: (filters: Filters) => void;
}

const Listing: React.FC<ListingProps> = ({ onFiltersChange }) => {
  //For sale for rent
  const [selectedOption, setSelectedOption] = useState("Sale");

  const handleOptionClick = (option: string) => {
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
  const [selectedPrice, setSelectedPrices] = useState<Price>({
    label: "",
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  });
  const prices: Price[] = [
    { label: "$100,000 - $150,000", min: 100000, max: 150000 },
    { label: "$150,000 - $300,000", min: 150000, max: 300000 },
    { label: "$300,000 - $750,000", min: 300000, max: 750000 },
    { label: "$750,000 - $1,000,000", min: 750000, max: 1000000 },
    { label: "$1,000,000+", min: 1000000, max: 15000000 },
  ];


  const togglePrices = (price: Price) => {
    // Then add the newly clicked price
    setSelectedPrices(price);
  };

  //Bed
  const [selectedBeds, setSelectedBeds] = useState<number>(0);

  const numOfBeds = [1, 2, 3, 4, 5, 6];

  //Bath
  const [selectedBaths, setSelectedBaths] = useState<number>(0);

  const numOfBaths = [1, 2, 3, 4, 5, 6];


  //Location
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const locations: string[] = [
    "Montrose",
    "Heights",
    "Katy",
    "Fort Bend",
    "Missouri City",
    "Pearland",
    "Cinco Ranch",
  ];


  //Property
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const properties: string[] = ["Duplex", "Apartment", "House", "Townhouse"];
  useEffect(() => {
    applyFilters();
  }, [
    selectedOption,
    selectedPrice,
    selectedBeds,
    selectedBaths,
    selectedLocation,
    selectedProperty,
  ]);

  // Function to apply filters and pass them to parent component
  const applyFilters = () => {
    const filters = {
      option: selectedOption,
      price: selectedPrice,
      beds: selectedBeds,
      baths: selectedBaths,
      location: selectedLocation,
      property: selectedProperty,
    };

    // Pass the selected filters to the parent component
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSelectedPrices({ label: "", min: 0, max: Number.MAX_SAFE_INTEGER });
    setSelectedBeds(0);
    setSelectedBaths(0);
    setSelectedLocation("");
    setSelectedProperty("");
  };

  return (
    <div className="">
      <div className="font-agrandir h-1/2 text-black w-[95%]  ">
        <h2 className="p-4 text-2xl tracking-wide xl:text-6xl">
          Featured Properties
        </h2>
        <p className="font-montserrat  text-xs  p-4 md:text-base xl:w-1/2">
          Crafting exceptional real estate investments grounded in creativity,
          expert craftsmanship, and an unparalleled commitment to meticulous
          attention to detail.
        </p>
      </div>
      <div className="relative w-full flex flex-col xl:flex-row xl:h-16 h-1/3 font-montserrat shadow-lg border-t border-gray-200 z-20">
        {/* Toggle Button RENT and SALE */}
        <div className=" w-52  flex justify-center items-center transition-all">
          <div className="w-5/6 h-16 relative text-sm font-montserrat tracking-wider flex justify-around items-center ">
            <span
              className={` cursor-pointer ${
                selectedOption === "Sale" ? "font-bold  text-black" : ""
              }`}
              onClick={() => handleOptionClick("Sale")}
            >
              Sale
            </span>
            <span
              className={`cursor-pointer ${
                selectedOption === "Rent" ? "font-bold  text-black" : ""
              }`}
              onClick={() => handleOptionClick("Rent")}
            >
              Rent
            </span>
            <div
              className="w-[50%] h-11  border border-black/50 rounded-full absolute  top-1/2 transform -translate-y-1/2
                      duration-200 ease-in"
              style={{ left: selectedOption === "Rent" ? "50%" : "0%" }}
            />
          </div>
        </div>
        {/* filters */}
        <div className=" w-full h-full xl:flex justify-evenly items-center hidden z-40">
          {/* Prices */}
          <div className="relative">
            <button
              onClick={togglePricesDropdown}
              className="hover:bg-[#fafafa]"
            >
              <div className="w-52 h-12 border border-gray-300   rounded-md flex justify-center items-center">
                <span className="text-xs  w-[100%] text-center">
                  {selectedPrice.min == 0
                    ? "Price Amount"
                    : selectedPrice.label}{" "}
                </span>
                <div className="w-1/6 mr-2">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="w-1/2"
                  />
                </div>
              </div>
            </button>{" "}
            <div
              className={` ${
                openDropdown === 1
                  ? "h-[165px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-52 absolute top-full rounded-md`}
            >
              {prices.map((price) => (
                <div
                  key={price.label}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    togglePrices(price);
                    togglePricesDropdown();
                  }}
                >
                  {price.label}
                </div>
              ))}
            </div>
          </div>
          {/* Beds */}
          <div className="relative">
            <button onClick={toggleBedDropdown} className="hover:bg-[#fafafa]">
              <div className="w-52 h-12  border border-gray-300  flex justify-center rounded-md items-center">
                {" "}
                <span className="text-xs w-5/6 text-center">{`${
                  selectedBeds || "0"
                }+ Beds`}</span>{" "}
                <div className="w-1/6 mr-2">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="text-black w-1/2"
                  />
                </div>
              </div>
            </button>{" "}
            <div
              className={` ${
                openDropdown === 2
                  ? "h-[200px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-52 absolute top-full rounded-md`}
            >
              {numOfBeds.map((bed) => (
                <div
                  key={bed}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedBeds(bed);
                    toggleBedDropdown();
                  }}
                >
                  {bed}
                </div>
              ))}
            </div>
          </div>
          {/* Baths */}
          <div className="relative">
            <button onClick={toggleBathDropdown} className="hover:bg-[#fafafa]">
              <div className="w-52 h-12 border border-gray-300   rounded-md flex justify-center items-center">
                <span className="text-xs w-5/6 text-center">{`${
                  selectedBaths || "0"
                }+ Baths`}</span>{" "}
                <div className="w-1/6 mr-2">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="w-1/2"
                  />
                </div>
              </div>
            </button>
            <div
              className={` ${
                openDropdown === 3
                  ? "h-[200px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-52 absolute top-full rounded-md`}
            >
              {numOfBaths.map((bath) => (
                <div
                  key={bath}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedBaths(bath);
                    toggleBathDropdown();
                  }}
                >
                  {bath}
                </div>
              ))}
            </div>
          </div>
          {/* Location */}
          <div className="relative">
            <button
              onClick={toggleLocationDropdown}
              className="hover:bg-[#fafafa]"
            >
              <div className="w-52 h-12 border border-gray-300   rounded-md flex justify-center items-center">
                <span className="text-xs w-5/6 text-center">
                  {!selectedLocation ? "Location" : selectedLocation}
                </span>{" "}
                <div className="w-1/6 mr-2">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="w-1/2"
                  />
                </div>
              </div>
            </button>
            <div
              className={` ${
                openDropdown === 4
                  ? "h-[230px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-52 absolute top-full rounded-md`}
            >
              {locations.map((location) => (
                <div
                  key={location}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedLocation(location);
                    toggleLocationDropdown();
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          </div>
          {/* Property Type */}
          <div className="relative">
            <button onClick={togglePropertyDropdown}>
              <div className="w-52 h-12 border border-gray-300  rounded-md flex  justify-around items-center">
                <span className="text-xs w-5/6 text-center">
                  {!selectedProperty ? "Type" : selectedProperty}
                </span>{" "}
                <div className="w-1/6 mr-2">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="w-1/2"
                  />
                </div>
              </div>
            </button>
            <div
              className={` ${
                openDropdown === 5
                  ? "h-[140px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-52 absolute top-full rounded-md`}
            >
              {properties.map((property) => (
                <div
                  key={property}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedProperty(property);
                    togglePropertyDropdown();
                  }}
                >
                  {property}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={clearFilters}
            className=" w-40 h-12 text-white text-xs tracking-wider font-montserrat transition ease-in-out duration-150 bg-black hover:bg-black/60  rounded-xl  hover:shadow-lg active:bg-black"
          >
            Reset Filters
          </button>
        </div>

        {/* Mobile Responsive filters */}
        <div className=" w-[100%] h-full flex flex-wrap gap-4 justify-center md:justify-start xl:justify-center items-center  xl:hidden p-4 ">
          {/* Prices */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300   rounded-md flex justify-center items-center">
              <span className="text-xs text-black w-[100%] text-center">
                {selectedPrice.min == 0 ? "Price Amount" : selectedPrice.label}{" "}
              </span>
              <div className="w-1/6 mr-2">
                <button onClick={togglePricesDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>

            <div
              className={` ${
                openDropdown === 1
                  ? "h-[175px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-40 absolute top-full rounded-md z-50`}
            >
              {prices.map((price) => (
                <div
                  key={price.label}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    togglePrices(price);
                    togglePricesDropdown();
                  }}
                >
                  {price.label}
                </div>
              ))}
            </div>
          </div>
          {/* Beds */}
          <div className="relative">
            <div className="w-40 h-12  border border-gray-300  flex justify-center rounded-md items-center">
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
            <div
              className={` ${
                openDropdown === 2
                  ? "h-[200px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-40 absolute top-full rounded-md z-50`}
            >
              {numOfBeds.map((bed) => (
                <div
                  key={bed}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedBeds(bed);
                    toggleBedDropdown();
                  }}
                >
                  {bed}
                </div>
              ))}
            </div>
          </div>
          {/* Baths */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300   rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">{`${
                selectedBaths || "0"
              }+ Baths`}</span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleBathDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            <div
              className={` ${
                openDropdown === 3
                  ? "h-[200px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-40 absolute top-full rounded-md z-50`}
            >
              {numOfBaths.map((bath) => (
                <div
                  key={bath}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedBaths(bath);
                    toggleBathDropdown();
                  }}
                >
                  {bath}
                </div>
              ))}
            </div>
          </div>
          {/* Location */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300   rounded-md flex justify-center items-center">
              <span className="text-xs w-5/6 text-center">
                {!selectedLocation ? "Location" : selectedLocation}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={toggleLocationDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            <div
              className={` ${
                openDropdown === 4
                  ? "h-[230px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-40 absolute top-full rounded-md z-50`}
            >
              {locations.map((location) => (
                <div
                  key={location}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedLocation(location);
                    toggleLocationDropdown();
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          </div>
          {/* Property Type */}
          <div className="relative">
            <div className="w-40 h-12 border border-gray-300  rounded-md flex  justify-around items-center">
              <span className="text-xs w-5/6 text-center">
                {!selectedProperty ? "Type" : selectedProperty}
              </span>{" "}
              <div className="w-1/6 mr-2">
                <button onClick={togglePropertyDropdown}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </button>{" "}
              </div>
            </div>
            <div
              className={` ${
                openDropdown === 5
                  ? "h-[140px] transition-all duration-500 ease-in-out"
                  : "h-0 transition-all duration-500 ease-in-out"
              } bg-[#fbfbfb] overflow-hidden w-40 absolute top-full rounded-md z-50`}
            >
              {properties.map((property) => (
                <div
                  key={property}
                  className="p-2 cursor-pointer hover:bg-pine shadow-black hover:rounded-sm hover:text-white font-regular tracking-wider text-xs text-center"
                  onClick={() => {
                    setSelectedProperty(property);
                    togglePropertyDropdown();
                  }}
                >
                  {property}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={clearFilters}
            className=" w-40 h-12 text-white text-xs tracking-wider font-montserrat transition ease-in-out duration-150 bg-black hover:bg-black/90  rounded-md  hover:shadow-lg active:opacity-100"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
