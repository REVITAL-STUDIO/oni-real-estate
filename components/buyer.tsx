import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import walking from "public/walking-real-estate.webp";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full h-full bg-white  flex flex-col">
      {/* Buyer Process */}
      <div className="w-full  h-full flex flex-col justify-center items-center">
        <div className="w-[90%] mb-4 flex flex-col  justify-between">
          <h2
            className="uppercase text-black text-5xl font-regular bottom-0 font-cinzel w-2/4"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Buyer Process
          </h2>
          <h2 className="text-xl text-forest font-montserrat font-medium">
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
            <ul className="w-5/6 h-42 gap-y-4 flex font-montserrat  items-center text-black font-medium flex-col">
              <div
                className="w-full h-10  text-forest font-cinzel  font-regular flex justify-center items-center"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              >
                <h1 className="text-xl border-4 border-pine rounded-full w-8 h-8 flex justify-center items-center">
                  1
                </h1>
                <h2 className="text-4xl border-b-4 border-pine ml-4">
                  {" "}
                  Analyze
                </h2>
              </div>
              <li>Select a Real Estate Agent</li>
              <li>Obtain Financial Pre-approval</li>
              <li>Analyze needs with Consultation</li>
            </ul>
          </div>
          {/* step 2 */}
          <div className="w-1/4 h-3/4 rounded-2xl   hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out  mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex items-center font-montserrat   text-black font-medium flex-col">
              <div
                className="w-full h-10 text-forest  font-cinzel font-regular flex justify-center items-center"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              >
                <h1 className="text-xl border-4 border-pine rounded-full w-8 h-8 flex justify-center items-center">
                  2
                </h1>
                <h2 className="text-4xl border-b-4 border-pine ml-4">
                  {" "}
                  Finance
                </h2>
              </div>
              <li>Select View Properties</li>
              <li>Write an Offer to Purchase</li>
              <li>Secure Financing</li>
            </ul>
          </div>
          {/* step 3 */}
          <div className="w-1/4 h-3/4 rounded-2xl    hover:shadow-2xl hover:shadow-white transition duration-200 ease-in-out   mt-4 flex flex-col justify-center items-center hover:translate-y-4 hover:scale-105">
            <ul className="w-5/6 h-42 gap-y-4 flex items-center font-montserrat  text-black font-medium flex-col">
              <div
                className="w-full h-10 text-forest font-cinzel  text-center font-regular flex justify-center items-center"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
              >
                <h1 className="text-xl border-4 border-pine rounded-full w-8 h-8 flex justify-center items-center">
                  3
                </h1>
                <h2 className="text-4xl border-b-4 border-pine ml-4">
                  {" "}
                  Approve
                </h2>
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
