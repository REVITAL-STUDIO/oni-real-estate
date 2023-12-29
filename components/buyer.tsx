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
          <h2 className="uppercase text-6xl bottom-0 font-medium w-1/4">
            Buyer Process
          </h2>
          <h2>We Know the Ropes, Let Us Guide You to your Dream Home.</h2>
        </div>
        <div className="w-[90%] h-1/2 flex flex-col gap-x-2 justify-evenly items-center relative">
          <Image
            src={buy}
            alt="buy"
            className="w-[48%] h-[65%] shadow-xl absolute right-0 top-0 rounded-2xl"
          />
          <Image
            src={walking}
            alt="buy"
            className="w-[48%] h-[65%] shadow-xl absolute left-0 bottom-0 rounded-2xl"
          />
        </div>
        <div className="h-1/3 w-[90%]  flex justify-between">
          {/* step 1 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl hover:shadow-2xl shadow-pine hover:shadow-white transition duration-200 ease-in-out bg-white mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex text-black font-medium flex-col">
              <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
                1
              </div>
              <li>Select a Real Estate Agent</li>
              <li>Obtain Financial Pre-approval</li>
              <li>Analyze needs with Consultation</li>
            </ul>
          </div>
          {/* step 2 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl shadow-pine hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out bg-white mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex text-black font-medium flex-col">
              <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
                2
              </div>
              <li>Select View Properties</li>
              <li>Write an Offer to Purchase</li>
              <li>Secure Financing</li>
            </ul>
          </div>
          {/* step 3 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl shadow-pine  hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out bg-white border border-white mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex text-black font-medium flex-col">
              <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
                3
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
