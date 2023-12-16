"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Homes
import home1 from "public/home1.jpg";
import home2 from "public/home2.jpg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";

const homes = [home1, home2, home3, home4, home5, home6];

// Home Info

interface RealEstate {
  address: string;
  price: number | string;
  bed: number | string;
  bath: number | string;
  sqft: number | string;
}

const Homes = () => {
  const [realEstate, setRealEstate] = useState<RealEstate>({
    address: "",
    price: 0,
    bed: 0,
    bath: 0,
    sqft: 0,
  });

  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "789 Meadowbrook Avenue, Houston, TX 77003",
    "101 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  const prices = [
    "$500,000",
    "$800,000",
    "$600,000",
    "$350,000",
    "$1,500,000",
    "$2,000,000",
  ];

  const infoEstate = [
    { beds: 5, baths: 3, sqft: 2500 },
    { beds: 4, baths: 2, sqft: 2000 },
    { beds: 6, baths: 4, sqft: 3000 },
    { beds: 3, baths: 2, sqft: 1800 },
    { beds: 4, baths: 3, sqft: 2200 },
    { beds: 5, baths: 4, sqft: 2800 },
  ];

  return (
    <div className="w-2/3 h-full flex gap-4  justify-center flex-wrap overflow-y-auto">
      {homes.map((homesFile, index) => (
        <div
          className="w-[45%] h-[50%] m-2 shadow-md shadow-black bg-white flex flex-col"
          key={index}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <Image src={homesFile} alt="homes" />
          </div>
          <div className="w-full h-1/3 flex flex-col justify-around font-medium text-gray-600 ">
            <div className="flex w-full h-fit justify-between">
              <h2 className="text-2xl ml-4">{prices[index]}</h2>
              <p className="text-xs mr-4 font-normal">{`${infoEstate[index].beds} Beds | ${infoEstate[index].baths} Baths |  ${infoEstate[index].sqft} sqft`}</p>
            </div>
            <div className="w-full h-fit border">
              <p className="text-xs  font-normal">{addresses[index]}</p>
              <div className="w-48 h-8 border"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homes;
