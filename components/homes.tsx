"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
  faClose,
  faMobile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
// Homes
import home1 from "public/home1.webp";
import home2 from "public/home2.jpeg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Home Info

type Bookmark = 1 | 2 | 3 | 4 | 5 | 6 | null;

interface InfoEstate {
  beds: number;
  baths: number;
  sqft: number;
}

const Homes = () => {
  //homes
  const homes: StaticImport[] = [home1, home2, home3, home4, home5, home6];

  //addresses
  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "3015 Flatbend Road, Cypress, TX 77004",
    "1012 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  //prices
  const prices = [
    "$3,000,000",
    "$1,800,000",
    "$1,600,000",
    "$350,000",
    "$1,500,000",
    "$2,000,000",
  ];

  //Detailed Info
  const infoEstate = [
    { beds: 5, baths: 3, sqft: 3500 },
    { beds: 4, baths: 2, sqft: 5000 },
    { beds: 6, baths: 4, sqft: 2000 },
    { beds: 3, baths: 2, sqft: 7500 },
    { beds: 4, baths: 3, sqft: 4000 },
    { beds: 5, baths: 4, sqft: 3000 },
  ];

  const [selectedImage, setSelectedImage] = useState<StaticImport | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<InfoEstate | null>(null);

  const handlePropertyInfo = (index: number) => {
    setSelectedImage(homes[index]);
    setSelectedAddress(addresses[index]);
    setSelectedPrices(prices[index]);
    setSelectedInfo(infoEstate[index]);
    openPropertyInfo((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    openPropertyInfo(false);
  };

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

  useEffect(() => {
    // If propertyInfo is open, prevent scrolling by adding a class to the body
    if (propertyInfo) {
      document.body.style.overflow = "hidden";
    } else {
      // If propertyInfo is closed, allow scrolling by removing the class
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [propertyInfo]);

  return (
    <div className="w-full xl:w-3/5 h-full flex flex-col items-center overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap justify-around gap-y-4 w-full  p-4">
        {homes.map((homesFile, index) => (
          <div className="xl:w-[50%] w-[100%] flex flex-col p-4" key={index}>
            <div
              onClick={() => handlePropertyInfo(index)}
              className=" relative w-[100%] my-4"
            >
              <Image
                src={homesFile}
                className=" w-[100%] object-cover rounded-lg brightness-90 shadow-md"
                alt="homes"
              />
              <div className="absolute w-full h-full bg-black/50 opacity-0 duration-300 flex justify-center items-center hover:opacity-100 hover:rounded-lg hover:flex top-0 ease-in-out hover:justify-center hover:items-center">
                <p className="text-white text-xl font-regular font-montserrat underline underline-offset-8">
                  View Home
                </p>
              </div>
            </div>
            {/* Housing Cards */}
            <div className="w-full h-1/2 flex flex-col font-medium text-gray-600 ">
              <div className="flex flex-col justify-center p-4">
                <h2 className="text-base font-montserrat font-regular mt-4 w-3/5">
                  {addresses[index]}
                </h2>
                <p className="font-light text-sm">{`${infoEstate[index].beds} beds | ${infoEstate[index].baths} baths |  ${infoEstate[index].sqft} sqft`}</p>
              </div>
              {/* address and bookmark */}
              <AnimatePresence>
                {propertyInfo && (
                  <div className="fixed inset-0 z-50">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="bg-eggshell w-full h-full flex justify-center items-center relative"
                    >
                      <button
                        onClick={handleClose}
                        className="w-fit h-fit absolute top-2 right-5"
                      >
                        <FontAwesomeIcon
                          className="hover:text-black/50 text-white duration-100"
                          icon={faClose}
                          size="lg"
                        />
                      </button>
                      <motion.section
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        className="w-5/6 h-5/6 bg-white rounded-2xl shadow-md flex flex-col justify-evenly items-center"
                      >
                        {/* Home and Description */}
                        <div className="w-full h-full flex flex-col xl:flex-row justify-around items-center">
                          <div className="w-1/2 h-5/6 rounded-lg p-4 ">
                            <Image
                              src={
                                selectedImage !== null
                                  ? selectedImage
                                  : "/default-image-url.jpg"
                              }
                              className="rounded-lg w-[100%] h-[100%] brightness-90 shadow-md object-cover"
                              alt="homes"
                            />
                          </div>
                          <div className="w-2/5 h-5/6 text-black">
                            <h2 className="text-xl font-agrandir tracking-wider ">
                              Resident Information
                            </h2>
                            <h2 className=" font-light text-pine font-montserrat tracking-wide text-4xl py-2">
                              {selectedPrices}
                            </h2>
                            <p className="text-xs tracking-wider font-montserrat font-regular text-justify w-3/4 py-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                            <h2 className="text-xs xl:text-base font-montserrat font-regular py-4">
                              {selectedAddress}
                            </h2>
                            <p className="text-base font-montserrat font-extralight py-4">
                              {selectedInfo
                                ? `${selectedInfo.beds} Beds | ${selectedInfo.baths} Baths | ${selectedInfo.sqft} sqft`
                                : "No information available"}
                            </p>{" "}
                            {/* Phone and Email */}
                            <div className="w-full h-1/6  flex  items-center">
                              <button className="w-1/2 h-12 border border-border rounded-xl shadow-md flex justify-center items-center">
                                Contact Us.
                              </button>
                            </div>
                            <div className="w-full h-1/5 bg-black flex shadow-lg">
                              <section className="w-full flex items-center ">
                                <div className="h-full w-2/5 border border-red-600"></div>
                              </section>
                            </div>
                          </div>
                        </div>
                        {/* Card Info */}
                      </motion.section>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;
