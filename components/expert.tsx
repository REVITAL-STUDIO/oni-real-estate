import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";
import OniManagement from "public/vector-house.svg";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Expert = () => {
  return (
    <div className=" h-screen  w-full">
      {/* Local Support */}
      <div className="h-1/2 w-full bg-white flex justify-center items-center ">
        <div className="w-1/2 h-full   ">
          <Image
            src={Local}
            alt="local support"
            className="w-[100%] h-[100%]"
          ></Image>
        </div>
        <div className="w-1/2 h-full flex flex-col bg-white justify-center items-center">
          <h2 className="w-5/6 mb-4 text-right text-5xl font-bold uppercase tracking-wider text-black ">
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <p className="text-sm w-5/6 text-black text-right">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="19"
            viewBox="0 0 630 19"
            fill="none"
            className="mt-4"
          >
            <path
              d="M1.5 17.5C200.333 9.16666 604 -5.00001 628 4.99999"
              stroke="#97B586"
              stroke-width="6"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      {/* Testimonials */}
      <div className="h-1/2 w-full bg-mint flex relative ">
        <div className="w-1/3 h-full  flex  items-center ">
          <div className="flex flex-col h-1/2 justify-evenly ml-4  ">
            <h2 className="text-5xl w-[100%]  uppercase font-bold text-black">
              Property Management at it's finest
            </h2>
            <button className="border-b border-black w-fit">
              Find Out More
            </button>
          </div>
        </div>
        <div className="w-2/3 h-full flex justify-center items-center ">
          <div className="w-5/6 h-1/2 flex flex-col justify-center items-center">
            {/* <Image src={OniManagement} alt="oni property management" /> */}
            <p className="text-black text-xl mb-4 font-bold text-center">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
