import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";

const Expert = () => {
  return (
    <div className=" h-screen w-full bg-gradient-to-b from-white via-mint to-white">
      {/* Local Support */}
      <div className="h-full w-full bg-white flex flex-col ">
        <div className="w-full h-1/4 flex flex-col bg-white justify-center items-end">
          <h2
            className="xl:w-5/6 w-full text-right font-cinzel p-4 text-2xl xl:text-5xl font-regular uppercase tracking-wide text-black "
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            LOCAL EXPERTISE <span className="font-bold">HOUSTON CONNECTED</span>
          </h2>
          <p className="text-xs p-4 text-black/80 font-montserrat font-medium tracking-wide text-right">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="19"
            viewBox="0 0 630 19"
            fill="none"
            className=" w-full h-auto "
          >
            <path
              d="M1.5 17.5C200.333 9.16666 604 -5.00001 628 4.99999"
              stroke="#97B586"
              stroke-width="6"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="w-full h-3/4">
          <div className="w-full h-full rounded-lg p-4 relative">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
            <button className="absolute bg-gray-700/60 text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-8 right-6 p-4 rounded-full border border-white ">
              For Owners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
