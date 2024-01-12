import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";
import OniManagement from "public/ONIT-LOGO.png";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Expert = () => {
  return (
    <div className=" h-screen w-full">
      {/* Local Support */}
      <div className="h-1/2 w-full bg-white flex justify-center items-center ">
        <div className="w-1/2 h-full overflow-hidden  p-4">
          <Image
            src={Local}
            alt="local support"
            className="object-cover h-[100%] w-[100%] rounded-lg"
          ></Image>
        </div>
        <div className="w-1/2 h-full flex flex-col bg-white justify-center items-center">
          <h2
            className="xl:w-5/6 w-full p-4 font-cinzel text-right text-2xl xl:text-5xl font-regular uppercase tracking-wider text-black "
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            LOCAL EXPERTISE <span className="font-bold">HOUSTON CONNECTED</span>
          </h2>
          <p
            className="text-sm p-4 text-black font-montserrat tracking-wide text-right"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore"
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="19"
            viewBox="0 0 630 19"
            fill="none"
            className=" w-full h-auto"
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
      <div className="h-1/2 w-full bg-gradient-to-t from-mint to-white xl:bg-mint flex">
        <div className="w-full h-full  flex justify-center items-center relative">
          <div className="flex flex-col w-full  h-1/2 justify-center items-center  ">
            <h2
              className="xl:text-5xl text-md p-4 text-center w-[75%] font-cinzel uppercase font-medium text-black"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
            >
              Property Management at it's finest, and a Group you can Trust
            </h2>
            <Image
              className="xl:w-1/3 w-[75%]  shadow-lg"
              src={OniManagement}
              alt="oni property management"
            />
            <button className="text-md font-regular tracking-wide p-4 text-black w-fit h-fit font-montserrat top-3/4">
              Learn More.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
