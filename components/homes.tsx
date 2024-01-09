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
import home1 from "public/home1.jpg";
import home2 from "public/home2.jpg";
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
    "789 Meadowbrook Avenue, Houston, TX 77003",
    "101 Riverbend Road, Missouri City, TX 77004",
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
    { beds: 5, baths: 3, sqft: 30000 },
    { beds: 4, baths: 2, sqft: 10000 },
    { beds: 6, baths: 4, sqft: 2000 },
    { beds: 3, baths: 2, sqft: 7500 },
    { beds: 4, baths: 3, sqft: 40000 },
    { beds: 5, baths: 4, sqft: 28000 },
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
    <div className="w-full h-1600   ">
      <div className="w-fit h-16 flex justify-center items-center m-4  tracking-wide text-4xl ">
        <h2
          className="font-cinzel"
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
        >
          Available Properties
        </h2>
      </div>
      <div className="flex relative justify-center  items-center gap-8 flex-wrap w-full h-3/4">
        {homes.map((homesFile, index) => (
          <div
            className="w-[40%] h-[35%] m-2  shadow-md  bg-white flex flex-col"
            key={index}
          >
            <div
              onClick={() => handlePropertyInfo(index)}
              className="w-full h-2/3 overflow-hidden relative cursor-pointer"
              style={{ position: "relative" }}
            >
              <Image src={homesFile} className="rounded-lg" alt="homes" />
              <div className="absolute w-full h-full bg-black/50  opacity-0 duration-300 flex justify-center items-center hover:opacity-100 hover:rounded-t-lg hover:flex top-0 ease-in-out hover:justify-center hover:items-center">
                <p className="text-white text-xl font-regular font-montserrat underline underline-offset-8		">
                  View Home
                </p>
              </div>
            </div>
            {/* Housing Cards */}
            <div className="w-full h-1/4 flex flex-col justify-around font-medium text-gray-600 ">
              <div className="flex flex-col w-fit h-full justify-center ml-4 ">
                <h2 className="text-xl font-montserrat  font-medium mt-4">
                  {addresses[index]}
                </h2>
                <p className="text-xs font-montserrat   font-normal mt-4">{`${infoEstate[index].beds} Beds | ${infoEstate[index].baths} Baths |  ${infoEstate[index].sqft} sqft`}</p>
                {/* Boomark */}
                <div className="w-full flex mt-4">
                  <button
                    className="w-fit h-8 flex text-right  items-center"
                    onClick={() => handleBookmarkToggle(index)}
                  >
                    <FontAwesomeIcon
                      className="hover:text-forest text-black duration-100"
                      icon={faBookmark}
                      size="lg"
                      style={{ color: isBookmarked(index) ? "red" : "" }}
                    />
                  </button>
                  <button
                    className="w-fit h-8 flex text-right ml-4 items-center"
                    onClick={() => handleBookmarkToggle(index)}
                  >
                    <FontAwesomeIcon
                      className="hover:text-forest text-black duration-100"
                      icon={faShareNodes}
                      size="lg"
                      style={{ color: isBookmarked(index) ? "red" : "" }}
                    />
                  </button>
                </div>
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
                      className="bg-white/40 w-full h-full flex justify-center items-center relative"
                    >
                      <button
                        onClick={handleClose}
                        className="w-fit h-fit absolute top-2 right-5"
                      >
                        <FontAwesomeIcon
                          className="hover:text-black/50 text-black duration-100"
                          icon={faClose}
                          size="lg"
                        />
                      </button>
                      <motion.section
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        className="w-5/6 h-5/6 bg-black/75 rounded-2xl shadow-xl flex flex-col justify-evenly items-center"
                      >
                        {/* Home and Description */}
                        <div className="w-full h-3/5 flex justify-around items-center">
                          <div className="w-3/5 h-full shadow-lg shadow-pine/20 rounded-lg ">
                            <Image
                              src={
                                selectedImage !== null
                                  ? selectedImage
                                  : "/default-image-url.jpg"
                              }
                              className="rounded-lg w-[100%] h-[100%] brightness-90"
                              alt="homes"
                            />
                          </div>
                          <div className="w-1/5 h-full text-white">
                            <h2 className="text-2xl font-montserrat tracking-wide text-pine">
                              Description
                            </h2>
                            <p className="text-xs mt-2 font-montserrat">
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
                            <h2 className="text-lg text-white montserrat font-extralight mt-4">
                              {selectedAddress}
                            </h2>
                            <p className="text-lg text-white montserrat font-extralight mt-4">
                              {selectedInfo
                                ? `${selectedInfo.beds} Beds | ${selectedInfo.baths} Baths | ${selectedInfo.sqft} sqft`
                                : "No information available"}
                            </p>{" "}
                            {/* Phone and Email */}
                            <div className="w-full h-1/5  flex  items-center">
                              <button className="w-16 h-16 border-4 border-pine rounded-full shadow-lg flex justify-center items-center">
                                <FontAwesomeIcon
                                  icon={faMobile}
                                  className="w-6  h-6 text-white"
                                />
                              </button>
                              <button className="w-16 h-16 ml-4 border-4 border-pine rounded-full shadow-lg flex justify-center items-center">
                                <FontAwesomeIcon
                                  icon={faPaperPlane}
                                  className="w-6  h-6 text-white"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Card Info */}
                        <div className="w-full h-1/5 bg-black/75 flex shadow-lg">
                          <div className="w-1/3 h-full text-white flex justify-center item-center border-r border-white/30">
                            <div className="w-full flex flex-col justify-center items-center">
                              <div className="w-fit">
                                <h2
                                  className=" font-extralight text-pine font-montserrat tracking-wide text-4xl "
                                  style={{
                                    textShadow:
                                      "0px 4px 4px rgba(0, 0, 0, 0.3)",
                                  }}
                                >
                                  {selectedPrices}
                                </h2>
                              </div>
                            </div>
                          </div>
                          {/* slideshow */}
                          <section className="w-2/3 h-full flex justify-center items-center">
                            <section className="w-5/6 h-3/4">
                              <div className="h-full w-1/4 border"></div>
                            </section>
                          </section>
                        </div>
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
