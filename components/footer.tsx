import React from "react";
import Logo from "../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-royal">
      {/* links */}
      <div className="w-5/6 h-450 flex items-center justify-center">
        <div className="w-1/2 h-full  flex justify-center items-center">
          <div
            className="w-3/4 h-3/4 bg-[url('/logo.png')] bg-contain"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "40%",
              backgroundPositionY: "50%",
              backgroundSize: "400px",
            }}
          ></div>
        </div>
        <div className="w-1/2 h-full  flex justify-center items-center">
          <ul className="w-full h-12 text-white text-sm  flex justify-evenly items-center">
            <Link href="/">HOME</Link>
            <Link href="/">SEARCH</Link>
            <div className="border w-16 border-white"></div>
            <Link href="/">LISTINGS</Link>
            <Link href="/">SELLERS</Link>
            <Link href="/">BUYERS</Link>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="h-50 w-full border"></div>
    </div>
  );
};

export default Footer;
