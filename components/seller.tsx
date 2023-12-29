"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import seller from "public/seller.png";
import "app/globals.css";
import ProgressBarSvg from "./progressBarSvg";

interface ProgressBarProps {
  progress: number;
}

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm ">
      {/* Info */}
      <div className="w-1/2  flex justify-center items-center">
        <div className="w-5/6 h-4/5 relative justify-center items-center flex">
          <ProgressBarSvg />
          <div className="absolute top-[50%] flex justify-center items-center w-80 h-[15%] ">
            <span className="text-black text-center text-2xl tracking-wider font-medium">
              Agent Will Represent Best Interest of the Buyer.{" "}
            </span>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="uppercase text-6xl font-medium text-black text-right w-3/4">
          Seller Process
        </h2>

        <div className=" w-3/4 h-11/12">
          <Image
            src={seller}
            alt="seller"
            className="w-[100%] h-[100%] shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Seller;
