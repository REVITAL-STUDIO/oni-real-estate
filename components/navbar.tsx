"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";

const Nav = () => {
  //Color change when scrolling
  const [color, setColor] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const changeColor = () => {
    if (window.scrollY >= 150) {
      setColor(true);
      setFilter(true);
    } else {
      setColor(false);
      setFilter(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <div
      className={`h-100 w-full flex fixed  z-50 flex-col items-center transition-colors duration-300 ease-in ${
        color ? "bg-royal" : "bg-white/30"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <ul
          className={` text-white  font-light h-full flex justify-center items-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-28 text-xs uppercase tracking-wider w-auto transition-colors duration-300 ease-in
          `}
        >
          <Link
            className={`
             relative
             font-regular
             hover:border-b-2 
             transition ease-in duration-300
             ${color ? " hover:border-white" : " hover:border-royal"}
           `}
            href="/"
          >
            Search
          </Link>
          <Link
            className={`
            relative
            font-regular
            hover:border-b-2 
            transition ease-in-out duration-300
            ${color ? " hover:border-white" : " hover:border-royal"}
          `}
            href="/"
          >
            Listings
          </Link>
          <div
            className="w-28 h-28"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Image src={Logo} alt="logo" />
          </div>
          <Link
            className={`
            relative
            font-regular
            hover:border-b-2 
            transition ease-in-out duration-300
            ${color ? " hover:border-white" : " hover:border-royal"}
          `}
            href="/"
          >
            Buyer
          </Link>
          <Link
            className={`
            relative
            font-regular
            hover:border-b-2 
            transition ease-in-out duration-300
            ${color ? " hover:border-white" : " hover:border-royal"}
          `}
            href="/"
          >
            Seller
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
