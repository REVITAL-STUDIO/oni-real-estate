import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Expert = () => {
  return (
    <div className=" h-screen  w-full">
      {/* Local Support */}
      <div className="h-1/2 w-full bg-black flex justify-center items-center ">
        <div className="w-1/2 h-full   ">
          <Image
            src={Local}
            alt="local support"
            className="w-[100%] h-[100%]"
          ></Image>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <h2 className="w-5/6 mb-4 text-right text-5xl font-bold uppercase tracking-wider bg-gradient-to-r from-white via-rgba-white-opacity to-pine bg-clip-text text-transparent ">
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <p className="text-xs w-5/6 text-white text-right">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </div>
      {/* Testimonials */}
      <div className="h-1/2 w-full flex relative ">
        <div className="w-1/2 h-full  flex justify-center items-center ">
          <div>
            <h2 className="text-2xl uppercase font-bold bg-gradient-to-r from-black via-black to-pine bg-clip-text text-transparent">
              Our Stories
            </h2>
          </div>
          <div className="w-1/2 h-[90%] relative ">
            <div className="w-[60%] h-[60%] absolute top-[5%] rounded-full shadow-sm shadow-black bg-mint "></div>
            <div className="w-[60%] h-[60%] absolute z-10 top-[15%] left-36 shadow-lg rounded-full shadow-black bg-[url('/person.png')] bg-cover "></div>
            <div className="w-[60%] h-[60%] absolute top-[40%] left-10 shadow-sm shadow-black rounded-full  bg-mint "></div>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center ">
          <div className="w-5/6 h-1/2 flex flex-col justify-center items-center">
            <p className="text-black text-xl mb-4 font-bold text-right">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam."
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="630"
              height="19"
              viewBox="0 0 630 19"
              fill="none"
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
        <div className="absolute w-full h-8  top-[46%] flex items-center justify-between px-2">
          <button className="w-8 h-8  ">
            {" "}
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="xl"
              className="text-mint w-8 h-8"
            />
          </button>
          <button className="w-8 h-8  ">
            <FontAwesomeIcon
              icon={faChevronRight}
              size="xl"
              className="text-mint w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
