"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import seller from "public/seller.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faLock,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import "app/globals.css";

interface ProgressBarProps {
  progress: number;
}

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm ">
      {/* Info */}
      <div className="w-1/2  flex justify-center items-center">
        <div className="w-5/6 h-4/5  ">
          {/* <div className="w-full h-[75%] flex justify-center items-center relative">
            <div className="w-36 bg-white h-36 rounded-full absolute bottom-0 right-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faLock}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
            <div className="w-36 bg-white h-36 rounded-full absolute top-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faHandshake}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
            <div className="w-36 bg-white h-36 rounded-full absolute bottom-0 left-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faLayerGroup}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
            <div className="w-full h-full relative ">
              <svg
                className="absolute right-[10%] top-[20%] "
                xmlns="http://www.w3.org/2000/svg"
                width="115"
                height="211"
                viewBox="0 0 115 211"
                fill="none"
              >
                <path
                  d="M8.48047 8.17578C43.0391 31.0794 111.099 102.013 106.871 202.517"
                  stroke="#C4C4C4"
                  stroke-width="15"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                className="absolute left-[10%] top-[20%]"
                xmlns="http://www.w3.org/2000/svg"
                width="115"
                height="211"
                viewBox="0 0 115 211"
                fill="none"
              >
                <path
                  d="M8.38104 202.526C6.36951 161.116 23.2184 64.2662 106.706 8.15166"
                  stroke="#C4C4C4"
                  stroke-width="15"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                className="absolute left-[30%]  -bottom-10"
                xmlns="http://www.w3.org/2000/svg"
                width="234"
                height="44"
                viewBox="0 0 234 44"
                fill="none"
              >
                <path
                  d="M225.911 8.07764C189.951 28.7108 96.0411 57.7741 8.08437 8.96139"
                  stroke="#C4C4C4"
                  stroke-width="15"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
      {/* Image */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="uppercase text-6xl font-medium bg-gradient-to-r from-black via-mint to-mint bg-clip-text text-transparent">
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
