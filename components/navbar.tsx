"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";

const Nav = () => {
  const [color, setColor] = useState<boolean>(false);
  const [disappear, setDisappear] = useState<boolean>(false);

  const changeColor = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      setColor(scrollY >= 150);
      setDisappear(scrollY >= 150);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);

      return () => {
        window.removeEventListener("scroll", changeColor);
      };
    }
  }, []);

  return (
    <div
      className={`h-100 w-full  flex fixed  z-50 flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        color ? "" : ""
      } ${disappear ? "opacity-0 pointer-events-none " : " "}`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <ul
          className={` text-white text-xs font-light h-full flex justify-around uppercase tracking-widest items-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-28  w-auto transition-colors duration-300 ease-in
          `}
        >
          <Link
            className={`
            relative
            font-regular
          `}
            href="/"
          >
            <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-royal before:via-royal/30 before:to-royal hover:before:w-full hover:before:opacity-100">
              Agents
            </span>
          </Link>
          <Link
            className={`
            relative
            font-regular
          `}
            href="/listings"
          >
            <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-royal before:via-royal/30 before:to-royal hover:before:w-full hover:before:opacity-100">
              Listing
            </span>
          </Link>
          <div
            className="w-52 h-28 flex justify-center items-center"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Image src={Logo} alt="logo" className="w-28 h-28" />
          </div>
          <Link
            className={`
            relative
            font-regular
          `}
            href="/clients"
          >
            <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-royal before:via-royal/30 before:to-royal hover:before:w-full hover:before:opacity-100">
              Clients
            </span>
          </Link>
          <Link
            className={`
            relative
            font-regular
          `}
            href="/"
          >
            <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-royal before:via-royal/30 before:to-royal hover:before:w-full hover:before:opacity-100">
              Saved
            </span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
