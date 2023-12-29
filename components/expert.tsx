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
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </div>
      {/* Testimonials */}
      <div className="h-1/2 w-full bg-mint flex relative ">
        <div className="w-1/2 h-full  flex justify-center items-center ">
          <div>
            <h2 className="text-5xl uppercase font-bold text-black">
              Our Stories
            </h2>
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
      </div>
    </div>
  );
};

export default Expert;
