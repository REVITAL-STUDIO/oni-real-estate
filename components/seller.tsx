"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import seller1 from "public/seller1.jpeg";
import seller2 from "public/seller2.webp";
import seller3 from "public/seller3.jpeg";
import "app/globals.css";
import ProgressBarSvg from "./progressBarSvg";
import { motion, useAnimation } from "framer-motion";

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-eggshell">
      {/* Info */}
      <div className="xl:w-2/5 w-1/3 flex flex-col justify-end items-start">
        <h2 className="p-4 text-2xl md:text-6xl">Why Choose Us?</h2>
        <p className="font-montserrat p-4 text-black/60 text-xs md:text-sm lg:text-lg font-medium xl:text-base">
          We understand that selling your home is a significant milestone, and
          we're here to ensure that you not only achieve but surpass your
          selling goals. Our team of seasoned real estate experts combines
          unparalleled expertise with a track record of delivering exceptional
          results.
          <br></br>
          <br></br>
          <span className="hidden md:block">
            Selling a home involves various complexities. Our comprehensive
            support includes handling paperwork, coordinating inspections, and
            guiding you through each phase of the transaction. We're with you
            from listing to closing.
          </span>
        </p>
      </div>
      {/* Image */}
      <div className="xl:w-3/5 w-2/3 flex justify-center items-start ">
        <div className="w-full h-full bg-[url('/interior.jpg')] bg-cover bg-center rounded-tl-xl rounded-bl-xl flex flex-col items-end">
          <h2 className="xl:text-7xl text-5xl text-mint font-agrandir text-right p-4">
            Seller Process
          </h2>
          <p className="text-right w-5/6 text-white text-sm md:text-xl p-4 text-montserrat tracking-wider">
            Our in-depth knowledge of the local real estate market empowers us
            to provide accurate pricing strategies. We analyze trends and
            leverage our understanding of the area to maximize the value of your
            property.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Seller;
