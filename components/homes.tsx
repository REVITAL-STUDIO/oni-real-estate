"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookBookmark,
  faClose,
  faXmark,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Homes
import home1 from "public/home1.jpg";
import home2 from "public/home2.jpg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";

// Home Info

type Bookmark = 1 | 2 | 3 | 4 | 5 | 6 | null;

interface RealEstate {
  id: number;
  address: string;
  price: number; // Use a specific type for price if it's always a number
  bed: number; // Use a specific type for bed if it's always a number
  bath: number; // Use a specific type for bath if it's always a number
  sqft: number; // Use a specific type for sqft if it's always a number
}

const Homes = () => {
  const homes = [home1, home2, home3, home4, home5, home6];

  const [realEstate, setRealEstate] = useState<RealEstate>({
    address: "",
    price: 0,
    bed: 0,
    bath: 0,
    sqft: 0,
    id: 0,
  });

  //addresses
  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "789 Meadowbrook Avenue, Houston, TX 77003",
    "101 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  //prices
  const prices = [
    "$500,000",
    "$800,000",
    "$600,000",
    "$350,000",
    "$1,500,000",
    "$2,000,000",
  ];

  //Detailed Info
  const infoEstate = [
    { beds: 5, baths: 3, sqft: 8500 },
    { beds: 4, baths: 2, sqft: 10000 },
    { beds: 6, baths: 4, sqft: 7500 },
    { beds: 3, baths: 2, sqft: 12000 },
    { beds: 4, baths: 3, sqft: 13000 },
    { beds: 5, baths: 4, sqft: 15000 },
  ];

  //bookmark items
  const [bookmarked, setBookmark] = useState<number[]>([]);

  const handleBookmarkToggle = (index: number) => {
    setBookmark((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const isBookmarked = (index: number): boolean => {
    return bookmarked.includes(index);
  };

  //Open Info Page & close
  const [propertyInfo, openPropertyInfo] = useState(false);

  const handlePropertyInfo = () => {
    openPropertyInfo((prevOpen) => !prevOpen);

    // If propertyInfo is open, prevent scrolling by adding a class to the body
    if (!propertyInfo) {
      document.body.style.overflow = "hidden";
    } else {
      // If propertyInfo is closed, allow scrolling by removing the class
      document.body.style.overflow = "auto";
    }
  };

  const handleClose = () => {
    openPropertyInfo(false);
  };

  return (
    <div className="w-[60%] h-full flex gap-4 relative justify-center flex-wrap overflow-y-auto">
      {homes.map((homesFile, index) => (
        <div
          onClick={handlePropertyInfo}
          className="w-[45%] h-[40%] m-2  shadow-md hover:shadow-lg hover:shadow-slate-300 transition duration-150 ease-in-out bg-white flex flex-col"
          key={index}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <Image src={homesFile} alt="homes" />
          </div>
          {/* Housing Cards */}
          <div className="w-full h-1/3 flex flex-col justify-around font-medium text-gray-600 ">
            <div className="flex w-full  h-fit justify-between">
              <h2 className="text-2xl ml-4">{prices[index]}</h2>
              <p className="text-xs mr-4 font-normal">{`${infoEstate[index].beds} Beds | ${infoEstate[index].baths} Baths |  ${infoEstate[index].sqft} sqft`}</p>
            </div>
            {propertyInfo}
            {/* address and bookmark */}
            <div className="w-full h-fit ">
              <p className="text-xs ml-4 font-normal">{addresses[index]}</p>
              {/* Boomark */}
              <div className="w-full flex justify-end">
                <button
                  className="w-fit h-8 flex text-right items-center p-4"
                  onClick={() => handleBookmarkToggle(index)}
                >
                  <FontAwesomeIcon
                    className="hover:text-red-500 duration-100"
                    icon={faBookmark}
                    size="lg"
                    style={{ color: isBookmarked(index) ? "red" : "" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {propertyInfo && (
        <div className="fixed inset-0 z-10">
          <div className="bg-forest w-full h-full absolute">
            {/* close button */}
            <div className="w-full flex justify-end">
              <button onClick={handleClose} className=" w-fit ">
                <FontAwesomeIcon className="w-7 h-7" icon={faXmark} size="lg" />
              </button>
            </div>
            <div className="w-full h-[65%] flex flex-col justify-center items-center">
              <div className="w-2/4 h-3/4 border"></div>
              <div className="w-full h-24  bg-black/90 border-black mt-4"></div>
            </div>
            <div className="w-full h-[35%] bg-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homes;
