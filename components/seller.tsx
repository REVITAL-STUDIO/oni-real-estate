"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import seller1 from "public/seller1.jpeg";
import seller2 from "public/seller2.webp";
import seller3 from "public/seller3.jpeg";
import "app/globals.css";
import ProgressBarSvg from "./progressBarSvg";

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm">
      {/* Image */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="uppercase text-6xl font-regular text-forest text-left w-5/6">
          Seller Process
        </h2>
        <div className="w-5/6 h-11/12 flex flex-col gap-y-8 justify-evenly  items-center">
          <div className="w-2/3 h-2/4 relative right-24">
            <Image
              src={seller1}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90 contrast-75 shadow-lg shadow-mint"
            />
          </div>
          <div className="w-2/3 h-2/4 relative left-20">
            <Image
              src={seller2}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90	contrast-75	shadow-lg shadow-mint"
            />
          </div>
          <div className="w-2/3 h-2/4 relative right-24">
            <Image
              src={seller3}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90 contrast-75	shadow-lg shadow-mint"
            />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="w-1/2 h-full  flex justify-center items-center">
        <ProgressBarSvg />
      </div>
    </div>
  );
};

export default Seller;
