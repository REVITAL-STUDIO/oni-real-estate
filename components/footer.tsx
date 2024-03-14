import React from "react";
import Logo from "../public/oni-moon.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-screen lg:h-400 flex flex-col  relative bg-black -z-10">
      <div className="flex  h-full  ">
        {/* links */}
        <div className="w-1/2 h-full xl:flex  justify-center items-center hidden">
          <div className=" w-40 h-fit  ">
            <Image
              src={Logo}
              alt="logo"
              style={{
                objectFit: "cover",
              }}
              className="w-[100%] h-[100%] invert"
            ></Image>
          </div>
          {/* Contact & Social Media */}
        </div>

        {/* divider */}
        <div className="w-full flex-col flex justify-evenly xl:justify-center gap-y-4 items-center  ">
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-2/5 xl:h-0">
            <div className="border-b-4 rounded-full hidden border-white xl:w-1/2 w-5/6 xl:block xl:left-0"></div>
            <ul
              className={` text-white text-sm xl:text-xs  p-4  font-agrandir h-full flex flex-col xl:flex-row gap-y-4 justify-evenly xl:justify-around uppercase tracking-widest xl:items-center  w-full transition-colors duration-300 ease-in
          `}
            >
              <li className="relative  hover:text-gray-400 duration-200 ease-in-out transition">
                <Link href="/">
                  <span className="">Home</span>
                </Link>
              </li>
              <li className="relative  hover:text-gray-400  duration-200 ease-in-out transition">
                <Link href="/listings">
                  <span className="">Properties</span>
                </Link>
              </li>
              <li className="relative  hover:text-gray-400  duration-200 ease-in-out transition">
                <Link href="/clients">
                  <span className="">Ownership</span>
                </Link>
              </li>
              <li className="relative  hover:text-gray-400  duration-200 ease-in-out transition">
                <Link href="/">
                  <span className="">Login</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <div className="text-white/75 w-full h-fit  flex flex-col">
              <h2 className="text-md tracking-wider md:text-sm text-white font-agrandir font-medium p-4">
                Contact
              </h2>
              <p className="font-light text-sm font-montserrat md:text-sm tracking-wider px-4">
                info@oniprofessionals.com
              </p>
            </div>
            <div className="text-white/75 w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider text-white font-agrandir md:text-sm font-medium p-4">
                Phone
              </h2>
              <p className="font-light text-sm font-montserrat md:text-sm w-full px-4">
                +1 (281) 123-4567
              </p>
            </div>
            <div className="text-white/75 w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider text-white font-agrandir md:text-sm font-medium p-4">
                Location
              </h2>
              <p className="font-light text-sm font-montserrat md:text-sm w-full px-4">
                1234 SANTA MONICA BLVD., HOUSTON, TX 12345
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="h-[8%] w-full flex font-montserrat items-center ">
        <h2 className="text-white   text-xs tracking-wide  w-full  px-4">
          © 2024 Oni Associates. All rights Reserved. Developed by{" "}
          <span className="font-bold">REVITAL Studio</span>
        </h2>
      </div>
    </div>
  );
};

export default Footer;
