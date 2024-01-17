import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";

const Expert = () => {
  return (
    <div className=" h-screen w-full bg-gradient-to-b from-white via-mint/60 to-white">
      {/* Local Support */}
      <div className="h-full w-full  flex flex-col justify-center items-center xl:flex-row">
        {/* Flex-row */}
        <div className="w-full xl:w-1/2 h-3/4 xl:h-full hidden xl:flex xl:justify-center items-start">
          <div className="w-full h-2/3 relative p-2 mt-4">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] brightness-90 rounded-lg shadow-xl"
            ></Image>
          </div>
        </div>
        {/* Local Expertise */}
        <div className="w-full h-1/4 xl:h-full xl:w-1/2 flex flex-col  justify-center items-end  relative">
          <h2 className="md:w-[75%] font-medium w-3/4 text-right font-cinzel p-4 text-2xl md:text-4xl font-regular uppercase tracking-wide text-black ">
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <p className="text-sm md:text-base xl:text-md xl:w-full md:w-3/4 p-4 text-black/60 txt font-montserrat leading-4 font-medium tracking-wide text-right">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </p>
          <ul className="xl:w-full xl:h-2/5 hidden xl:flex xl:flex-col items-end p-4 justify-evenly font-cinzel text-2xl">
            <div className="w-full border-black  flex justify-end items-center">
              <li className="  p-4 text-right text-2xl text-black">
                Curated & Exclusive
              </li>
            </div>
            <div className="border-black  w-full flex justify-end items-center">
              <li className="  p-4 text-right text-2xl text-black ">
                Redefining Standards
              </li>
            </div>
            <div className="border-black  w-full flex justify-end items-center">
              <li className="   p-4 text-right text-2xl text-black">
                Uncompromising Efforts
              </li>
            </div>
          </ul>
          <button className="absolute w-1/3 h-16 tracking-wide text-black font-bold text-sm bg-transparent   transition-all duration-300 ease-in-out font-montserrat bottom-20 right-0 p-4 rounded-full  ">
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
