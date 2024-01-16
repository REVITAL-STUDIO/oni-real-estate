import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";

const Expert = () => {
  return (
    <div className=" h-screen w-full bg-gradient-to-b from-white via-mint to-white">
      {/* Local Support */}
      <div className="h-full w-full bg-white flex flex-col justify-center items-center xl:flex-row">
        {/* Flex-row */}
        <div className="w-full xl:w-1/2 h-3/4 xl:h-full hidden xl:flex xl:justify-center items-end">
          <div className="w-full h-1/2 xl:h-2/3 relative p-2">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] brightness-90 rounded-lg shadow-xl"
            ></Image>
          </div>
        </div>
        {/* Local Expertise */}
        <div className="w-full h-1/4 xl:h-full xl:w-1/2 flex flex-col bg-white justify-center items-end relative relative">
          <h2
            className="md:w-[75%] font-medium w-3/4 text-right font-cinzel p-4 text-2xl md:text-4xl font-regular uppercase tracking-wide text-black "
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
          >
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <p className="text-sm md:text-sm xl:text-md xl:w-full md:w-3/4 p-4 text-black/60 txt font-montserrat leading-4 font-medium tracking-wide text-right">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </p>
          <ul className="xl:w-full xl:h-1/2 hidden xl:flex xl:flex-col items-end p-4 justify-around font-cinzel text-2xl">
            <div className="w-full border-t border-b flex justify-end items-center">
              <li className=" border-gray-500 p-4 text-right text-3xl text-gray-500/80">
                Curated & Exclusive
              </li>
            </div>
            <div className="border-t border-b w-full flex justify-end items-center">
              <li className=" border-gray-500 p-4 text-right text-3xl text-gray-500/80 ">
                Redefining Standards
              </li>
            </div>
            <div className="border-t border-b w-full flex justify-end items-center">
              <li className="  border-gray-500 p-4 text-right text-3xl text-gray-500/80">
                Uncompromising Efforts
              </li>
            </div>
          </ul>
          <button className="absolute w-1/3 h-16 tracking-wide text-black font-bold text-sm bg-transparent   transition-all duration-300 ease-in-out font-montserrat bottom-4 right-6 p-4 rounded-full  ">
            For Owners
          </button>
        </div>

        {/* flex column */}
        <div className="w-full h-3/4 md:h-2/3 xl:hidden">
          <div className="w-full h-full rounded-lg p-4 relative">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
            <button className="absolute bg-transparent text-white font-bold text-sm hover:bg-forest/60  transition-all duration-300 ease-in-out font-montserrat bottom-8 right-6 p-4 rounded-full border border-white ">
              For Owners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
