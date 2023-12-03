import React from "react";
import Link from "next/link";

const Expert = () => {
  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center w-full">
      <div className="h-1/6 w-5/6 flex flex-col items-end justify-end border-black ">
        <h2 className=" p-2 text-3xl uppercase tracking-wider font-light">
          Local Expertise - Houston Real Estate
        </h2>
        <p className="text-xs px-2 w-2/3 text-right">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
      {/* Links */}
      <div className="w-5/6 h-5/6 ">
        <div className="grid grid-cols-2 h-full">
          <div className="w-full h-full flex items-center justify-center ">
            <Link
              href="/"
              className="w-5/6 uppercase h-5/6 flex justify-center items-center hover:scale-75 text-white transition ease-in duration-200 bg-[url('/image46.png')] bg-cover bg-center"
            >
              <span className="tracking-wider text-xl">
                Property Evaluation
              </span>
            </Link>
          </div>

          {/* Wrap the next two divs inside a parent container */}
          <div className="flex flex-col gap-y-4">
            <div className="w-full h-1/2  flex justify-center items-end">
              <Link
                href="/"
                className="w-5/6 h-5/6 uppercase flex justify-center items-center text-white hover:scale-75 transition ease-in duration-200 bg-[url('/image47.png')] bg-cover bg-center"
              >
                <span className="tracking-wider text-xl">
                  Explore The Lifestyle
                </span>
              </Link>
            </div>
            <div className="w-full h-1/2  flex justify-center items-start ">
              <Link
                href="/"
                className="w-5/6 h-5/6 uppercase flex justify-center items-center text-white hover:scale-75 transition ease-in duration-200  bg-[url('/image48.png')] bg-cover bg-center"
              >
                <span className="tracking-wider text-xl">
                  Current Inventory
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
