import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full h-full  flex flex-col">
      {/* Buyer Process */}
      <div className="w-full  h-full flex flex-col justify-center items-center">
        <div className="w-[90%]  flex items-center justify-between">
          <h2 className="uppercase text-6xl bottom-0 font-medium w-1/5">
            Buyer Process
          </h2>
          <h2>We Know the Ropes, Let Us Guide You to your Dream Home.</h2>
        </div>
        <div className="w-[90%] h-[50%] flex justify-center items-center">
          <Image src={buy} alt="buy" className="w-[100%] h-[100%]"></Image>
        </div>
        <div className="h-1/4 w-[90%]  flex justify-between">
          <div className="w-1/3 h-full flex flex-col ">
            <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
              1
            </div>
            <ul className="w-3/4 h-36">
              <li>Select a Real Estate Agent</li>
              <li>Obtain Financial Pre-approval</li>
              <li>Analyze needs with Buyer Consultation</li>
            </ul>
          </div>
          <div className="w-1/3 h-full  ">
            <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
              2
            </div>
            <ul>
              <li></li>
            </ul>
          </div>{" "}
          <div className="w-1/3 h-full  ">
            <div className="w-10 h-10 rounded-full border-4 border-pine font-bold flex justify-center items-center">
              3
            </div>
            <ul>
              <li></li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Buyer;
