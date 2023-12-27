import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full h-full bg-storm  flex flex-col">
      {/* Buyer Process */}
      <div className="w-full   h-full flex flex-col justify-center items-center">
        <div className="w-[90%]  flex items-center justify-between">
          <h2 className="uppercase text-6xl bottom-0 font-medium w-1/4 bg-gradient-to-r from-black via-mint to-mint bg-clip-text text-transparent">
            Buyer Process
          </h2>
          <h2>We Know the Ropes, Let Us Guide You to your Dream Home.</h2>
        </div>
        <div className="w-[90%] h-[50%] flex justify-center items-center">
          <Image
            src={buy}
            alt="buy"
            className="w-[100%] h-[100%] shadow-xl"
          ></Image>
        </div>
        <div className="h-1/3 w-[90%]  flex justify-between">
          {/* step 1 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl hover:shadow-2xl shadow-pine hover:shadow-pine transition duration-200 ease-in-out bg-white mt-4 flex flex-col justify-center items-center">
            <ul className="w-5/6 h-42 gap-y-4 flex  font-medium flex-col">
              <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
                1
              </div>
              <li>Select a Real Estate Agent</li>
              <li>Obtain Financial Pre-approval</li>
              <li>Analyze needs with Consultation</li>
            </ul>
          </div>
          {/* step 2 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl shadow-pine hover:shadow-2xl hover:shadow-pine bg-white mt-4 flex flex-col justify-center items-center">
            <ul className="w-5/6 h-42 gap-y-4 flex font-medium flex-col">
              <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
                2
              </div>
              <li>Select View Properties</li>
              <li>Write an Offer to Purchase</li>
              <li>Secure Financing</li>
            </ul>
          </div>
          {/* step 3 */}
          <div className="w-1/4 h-3/4 rounded-2xl shadow-xl shadow-pine  hover:shadow-2xl hover:shadow-pine bg-white mt-4 flex flex-col justify-center items-center">
            <ul className="w-5/6 h-42 gap-y-4 flex  font-medium flex-col">
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
