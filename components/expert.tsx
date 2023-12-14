import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "../public/expert.png";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Expert = () => {
  return (
    <div className="bg-black h-1300 flex flex-col justify-center items-center w-full">
      <div className="h-800 w-5/6  flex flex-col items-end justify-around  ">
        <div className="w-full h-auto flex justify-end">
          <h2 className="  w-fit p-4 mb-4 rounded-full text-xl uppercase tracking-wider text-white font-medium">
            Local Expertise
          </h2>
        </div>
        <p className="text-xs  px-2 w-2/3 text-white text-right">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <div className="w-full h-3/4 mt-4 flex items-center justify-end animate-float">
          <div className="w-1/5 h-full relative left-10 rounded-3xl bg-royal"></div>
          <div className="w-4/5 h-full  bg-cover bg-center z-10  bg-no-repeat bg-[url('/local.png')] rounded-3xl"></div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="w-full h-700 flex justify-center items-center">
        <div className="w-5/6 h-3/4  flex flex-col justify-center items-center">
          <div className="w-full h-auto ">
            <h1 className="text-white w-fit  uppercase  font-medium text-2xl">
              Our Stories
            </h1>
          </div>
          <div className=" flex justify-center items-center w-full h-5/6">
            <div className="w-1/3 h-3/4 relative">
              <div className="bg-royal rounded-full w-64 h-64 relative right-4 top-0 "></div>
              <div className=" z-10 rounded-full w-64 h-64 relative left-32 bottom-48 bg-[url('/person.png')] bg-cover shadow-lg shadow-black animate-float"></div>
              <div className="bg-royal rounded-full w-64 h-64 relative bottom-80 left-4 shadow-2xl shadow-black "></div>
            </div>
            <div className="w-2/3 h-full text-white flex flex-col justify-center items-center ">
              <div className="w-full bg-gradient-to-l from-black via-black to-royal text-right">
                <p className="italic font-light uppercase text-gray-400">
                  {" "}
                  Agent - Maya Peterson
                </p>
              </div>

              <p className="px-4 text-sm text-right">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.”
                <br></br>
                <br></br>- Steven Adams
              </p>
            </div>
          </div>
        </div>
        {/* Forward / Backward buttons */}
        <div className=" absolute h-auto flex w-full px-4  justify-between items-center">
          <button
            className="w-10 h-10   rounded-full flex items-center justify-center transition ease-in duration-800 animate-carousel-left"
            style={{ top: "50%" }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#ffffff", fontSize: "16px" }}
            />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center transition ease-in duration-800 animate-carousel-right"
            style={{ top: "50%" }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#ffffff", fontSize: "16px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
