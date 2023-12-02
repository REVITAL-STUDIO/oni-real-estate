import React from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="h-auto w-full flex flex-col items-center bg-white">
      <div className="w-40 h-28">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="w-full h-40 flex justify-center items-center">
        <ul className=" text-black flex justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-28 text-xs uppercase tracking-wider w-auto">
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
