import React from "react";
import Image from "next/image";
import Link from "next/link";
import Real from "public/logo-real.png";

const SubNav = () => {
  return (
    <div className="w-full h-24  bg-white ">
      <div className=" w-full h-full flex justify-between items-center">
        <Link
          className="w-28 h-28 flex justify-center items-center"
          href="/"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image src={Real} alt="logo" className="w-20 h-20" />
        </Link>
        <div className="w-1/2 h-24 ">
          <ul
            className={` text-black text-xs  font-regular h-full flex justify-end mr-4 uppercase tracking-widest items-center gap-x-12  w-auto transition-colors duration-300 ease-in
          `}
          >
            <Link
              className={`
            relative
            font-regular
          `}
              href="/"
            >
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500  hover:before:w-full hover:before:opacity-100">
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
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500  hover:before:w-full hover:before:opacity-100">
                Listing
              </span>
            </Link>
            <Link
              className={`
            relative
            font-regular
          `}
              href="/clients"
            >
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500  hover:before:w-full hover:before:opacity-100">
                BUY/SELL
              </span>
            </Link>
            <Link
              className={`
            relative
            font-regular
          `}
              href="/"
            >
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-2 before:rounded-full before:opacity-0 before:transition-all before:duration-500  hover:before:w-full hover:before:opacity-100">
                Saved
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
