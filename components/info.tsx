"use client";

import React, { useState } from "react";

type expandId = 1 | 2 | null;

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="h-full w-1/2">
        <div className="w-full h-5/6 bg-royal flex flex-col justify-center  text-white">
          <h3 className="p-2 text-lg font-regular tracking-wider">
            Our Purpose
          </h3>
          <h1 className="uppercase flex items-center p-4 text-5xl font-light tracking-wider">
            Oni Real Estate{" "}
            <div className="w-36 ml-4 h-0 border-2 border-white"></div>
          </h1>
          <p className="text-xs text-left p-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
            <br></br>
            <br></br>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
        </div>
        <div className="w-full h-1/6  flex  bg-white ">
          <ul className="w-full flex items-center justify-center  h-auto">
            <li className="text-xs hover:bg-orange-500 hover:w-full transition-all ease-in duration-100 hover:text-white  flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Cinco Ranch
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Fort Bend
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Katy
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Heights
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Missouri City
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Montrose
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Pearland
            </li>{" "}
          </ul>
        </div>
      </div>

      <div className="w-1/2 h-full bg-[url('/pool.png')] flex  justify-center items-center">
        <div className="h-full w-full  flex flex-col justify-center gap-y-16 items-center">
          {/* <div
            className={`w-${expanded ? "5/6" : "96"} h-${
              expanded ? "3/4" : "64"
            } bg-opacity-20 hover:bg-opacity-20 shadow-black origin-top transition-all ease-in-out duration-300 bg-white bg-blur rounded-lg shadow-lg flex justify-evenly items-center cursor-pointer`}
            onClick={handleClick}
          >
            <span
              className={`font-medium text-xl text-white tracking-wider cursor-pointer ${
                expanded ? "border-b border-white" : ""
              }`}
              onClick={handleClick}
            >
              OUR PROCESS
            </span>
            {expanded && (
              <div className=" w-1/2 h-full text-white">
                <ul className="w-full h-full flex justify-evenly flex-col font-medium text-md uppercase">
                  <li>
                    <h2 className="text-lg ">Initial Consultation</h2>
                    <p className="text-xs font-light">
                      Meet with our experienced real estate agents for a
                      one-on-one consultation. We'll get to understand your
                      property needs and financial goals.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg ">Property Search</h2>
                    <p className="text-xs font-light">
                      Based on your criteria, we'll curate a list of available
                      properties that fit your needs and budget.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg ">Virtual or In-person Tours</h2>
                    <p className="text-xs font-light">
                      Take a virtual walkthrough or schedule in-person visits to
                      the properties you're interested in.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg ">Financial Assessment</h2>
                    <p className="text-xs font-light">
                      We'll help you get pre-approved for a mortgage and guide
                      you through the financial nuances of property buying.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg ">Closing the Deal</h2>
                    <p className="text-xs font-light">
                      We'll guide you through the legalities, ensure all
                      paperwork is in order, and happily hand you the keys to
                      your new home!
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Info;
