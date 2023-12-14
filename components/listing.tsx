"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Listing = () => {
  const [selectedOption, setSelectedOption] = useState<"For Sale" | "For Rent">(
    "For Sale"
  );

  const handleOptionClick = (option: "For Sale" | "For Rent") => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full flex h-16  bg-white">
      {/* Search Bar */}
      <form className="w-80 border border-r-black h-16  flex justify-between items-center ">
        <div className="w-6 h-6">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="md" />
        </div>

        <input
          className="bg-transparent w-full ml-2 text-black font-thin text-md flex justify-center items-center  outline-none"
          type="text"
          placeholder="Address, City, Neighborhood"
        />
      </form>
      {/* Toggle Button */}
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
        <div className="w-32 h-10  border rounded-lg flex justify-evenly items-center">
          <span className="text-xs">Any Price</span>
          <div>
            <FontAwesomeIcon icon={faChevronDown} size="md" />
          </div>{" "}
        </div>
        <div className="w-32 h-10  border rounded-lg flex justify-evenly items-center">
          {" "}
          <span className="text-xs">Beds</span>{" "}
          <div>
            <FontAwesomeIcon icon={faChevronDown} size="md" />
          </div>{" "}
        </div>
        <div className="w-32 h-10  border rounded-lg flex justify-evenly items-center">
          <span className="text-xs">Bath</span>{" "}
          <div>
            <FontAwesomeIcon icon={faChevronDown} size="md" />
          </div>{" "}
        </div>
        <div className="w-32 h-10  border rounded-lg flex justify-evenly items-center">
          <span className="text-xs">Location</span>{" "}
          <div>
            <FontAwesomeIcon icon={faChevronDown} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
