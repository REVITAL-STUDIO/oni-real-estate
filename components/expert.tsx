import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Expert = () => {
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center w-full">
      <div className="h-150 w-5/6 flex flex-col items-end justify-center  ">
        <h2 className=" p-2 text-3xl uppercase tracking-wider text-white font-light">
          Local Expertise - Houston Real Estate
        </h2>
        <p className="text-xs px-2 w-2/3 text-white text-right">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
      {/* Testimonials */}
      <div className="w-full h-4/6 flex justify-center items-center">
        <div className="w-5/6 h-full flex flex-col justify-center items-center">
          <div className="w-full">
            <h1 className="text-white uppercase font-light text-3xl">
              Our Stories
            </h1>
          </div>
          <div className=" flex justify-center items-center w-full h-5/6">
            <div className="w-1/3 h-full">
              <div className="bg-royal rounded-full w-64 h-64 relative right-4 top-8"></div>
              <div className="border z-10 rounded-full w-64 h-64 relative left-32 bottom-44 bg-[url('/person.png')] bg-cover shadow-lg shadow-black"></div>
              <div className="bg-royal rounded-full w-64 h-64 relative bottom-3/4 left-4 shadow-2xl shadow-black"></div>
            </div>
            <div className="w-2/3 h-full text-white flex justify-center items-center ">
              <p className="px-4 text-sm">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.”
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
      {/* Counter */}
      <div className="w-full h-40 flex justify-end items-center">
        <span className="text-white tracking-widest px-4">1/5</span>
      </div>
    </div>
  );
};

export default Expert;
