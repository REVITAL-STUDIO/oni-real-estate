import React from "react";
import Image from "next/image";
import Logo2 from "../public/logo2.png";
import HeroSection from "../public/herosection.jpeg";

const Hero = () => {
  return (
    <div className="h-700 w-full flex justify-center items-center bg-[url('/herosection.png')] bg-cover ">
      <div className=" flex flex-col justify-center items-center w-5/6 h-3/6">
        {/* Logo & Slogan */}
        <div className="flex w-300 h-1/2 justify-center items-center">
          <div className="w-5/6 h-fit">
            <Image src={Logo2} alt="sub-logo" />
          </div>
          <div className="w-2/3 h-full text-2xl text-center text-white flex justify-center items-center">
            <h2>Where Houston Finds Homes</h2>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex w-5/6 justify-center h-1/5">
          <form className="w-5/6 h-full rounded-lg border bg-black flex items-center ">
            <input
              className="bg-transparent w-full border-none text-white font-thin text-2xl px-1 outline-none"
              type="text"
              placeholder="Enter Location"
            />
          </form>
          <button className="w-24 h-full shadow-lg shadow-black rounded-lg bg-royal ml-4 flex items-center justify-center">
            <span className="tracking-wide font-regular text-white">
              SEARCH
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
