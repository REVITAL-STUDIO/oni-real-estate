import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full h-5/6 bg-black flex">
      {/* Buyer Process */}
      <div className="w-1/2 h-full  flex justify-center items-center">
        <div className="w-5/6 h-3/4   flex flex-col">
          <h2 className="uppercase font-medium w-1/2 text-6xl z-10 tracking-wider bg-gradient-to-r from-white via-rgba-white-opacity to-blue-600 bg-clip-text text-transparent">
            Buyer Process
          </h2>
          <div className="w-full h-56  relative bottom-6 flex justify-end">
            <Image src={buy} alt="buy"></Image>
          </div>
          <div className="w-full h-8  flex justify-end text-white">
            <p className="text-xs">
              Discover the Path to Your Dream Home with Us – Expert Guidance
              Every Step of the Way!
            </p>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="w-1/2 h-full  flex justify-center items-center">
        <div className="w-3/4 h-full ">
          <ul className="w-full h-full text-md text-white flex gap-y-6 justify-center items-center flex-col">
            <li>Select a Real Estate Agent</li>
            <li>Obtain Financial Pre-approval</li>
            <li>Analyze needs with Buyer Consultation</li>
            <li className="flex">
              Select
              <span className="w-6 h-6 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-fit h-fit px-2"
                  size="xs"
                />
              </span>{" "}
              View Properties
            </li>
            <li>Write an Offer to Purchase</li>
            <li>Negotiation</li>
            <li>Acceptance Contract</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
