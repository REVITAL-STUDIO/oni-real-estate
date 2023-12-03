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
      className={`h-auto w-full flex fixed flex-col items-center ${
        color ? "bg-royal" : "bg-white"
      }`}
    >
      <div className="w-28 h-20">
        <Image
          src={Logo}
          alt="logo"
          style={{ filter: filter ? "invert(0%)" : "invert(100%)" }}
        />
      </div>
      <div className="w-full h-12 flex justify-center items-center">
        <ul
          className={` text-black font-light flex justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-28 text-xs uppercase tracking-wider w-auto ${
            color ? "text-white" : "text-black"
          }`}
        >
          <Link href="/">Search</Link>
          <Link href="/">Listing</Link>
          <Link href="/">Buyer</Link>
          <Link href="/">Seller</Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
