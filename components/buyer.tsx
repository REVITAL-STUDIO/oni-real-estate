import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import walking from "public/walking-real-estate.webp";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full h-full bg-storm  flex flex-col">
      {/* Buyer Process */}
      <div className="w-full   h-full flex flex-col justify-center items-center">
        <div className="w-[90%]  flex items-center justify-between">
          <h2 className="uppercase text-forest text-6xl bottom-0 font-regular w-2/4">
            Buyer Process
          </h2>
          <h2 className="text-xl text-forest font-medium">
            We Know the Ropes, Let Us Guide You to your Dream Home.
          </h2>
        </div>
        <div className="w-[90%] h-1/2 flex flex-col gap-x-2 justify-evenly items-center relative">
          <Image
            src={buy}
            alt="buy"
            className="w-[100%] h-[100%] shadow-xl absolute right-0 top-0 rounded-2xl"
          />
        </div>
        <div className="h-1/3 w-[90%]  flex justify-between">
          {/* step 1 */}
          <div className="w-1/4 h-3/4 rounded-2xl  hover:shadow-2xl  hover:shadow-white transition duration-200 ease-in-out  mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex items-center text-black font-medium flex-col">
              <div className="w-full h-10 text-forest  font-bold flex  items-center">
                <h1 className="text-6xl">1</h1>
                <h2 className="text-sm border-b-4 border-pine"> Analyze</h2>
              </div>
              <li>Select a Real Estate Agent</li>
              <li>Obtain Financial Pre-approval</li>
              <li>Analyze needs with Consultation</li>
            </ul>
          </div>
          {/* step 2 */}
          <div className="w-1/4 h-3/4 rounded-2xl   hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out  mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex items-center  text-black font-medium flex-col">
              <div className="w-full h-10 text-forest  font-bold flex  items-center">
                <h1 className="text-6xl">2</h1>
                <h2 className="text-sm border-b-4 border-pine"> Finance</h2>
              </div>
              <li>Select View Properties</li>
              <li>Write an Offer to Purchase</li>
              <li>Secure Financing</li>
            </ul>
          </div>
          {/* step 3 */}
          <div className="w-1/4 h-3/4 rounded-2xl    hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out   mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex items-center text-black font-medium flex-col">
              <div className="w-full h-10 text-forest  font-bold flex  items-center">
                <h1 className="text-6xl">3</h1>
                <h2 className="text-sm border-b-4 border-pine"> Approve</h2>
              </div>
              <li>Negotiation</li>
              <li>Home Inspection</li>
              <li>Accept Contract</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
