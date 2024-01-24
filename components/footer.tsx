import React from "react";
import Logo from "../public/oni-moon.png";
import Image from "next/image";
import FooterLogo from "../public/rvtl_white.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="w-full h-screen lg:h-600 flex flex-col z-50 relative bg-shadow">
      <div className="xl:flex xl:flex-row xl:h-3/4 h-2/3 ">
        {/* links */}
        <div className="w-full h-full xl:w-1/2 xl:h-full flex ">
          <div className="w-1/2 h-full flex flex-col justify-center xl:items-center">
            <div className="w-40 h-fit mt-4 ">
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
            <div className="text-white/75 w-full  h-fit    flex flex-col">
              <h2 className="text-md tracking-wider md:text-xl font-agrandir font-medium p-4">
                Contact
              </h2>
              <p className="font-light text-sm font-montserrat md:text-xl tracking-wider px-4">
                info@oniprofessionals.com
              </p>
            </div>
            <div className="text-white/75 w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider font-agrandir md:text-xl font-medium p-4">
                Phone
              </h2>
              <p className="font-light text-sm font-montserrat md:text-xl w-full px-4">
                +1 (281) 123-4567
              </p>
            </div>
            <div className="text-white/75 w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider font-agrandir md:text-xl font-medium p-4">
                Location
              </h2>
              <p className="font-light text-sm font-montserrat md:text-xl w-full px-4">
                1234 SANTA MONICA BLVD., HOUSTON, TX 12345
              </p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="w-full flex flex-col justify-center items-center  xl:flex-row xl:items-center">
          <div className="border-b border-white xl:w-1/2 w-5/6  xl:left-0"></div>
          <ul
            className={` text-white text-sm xl:text-sm  mt-4 xl:mt-0 font-montserrat h-full flex justify-evenly xl:justify-around uppercase tracking-widest items-center  w-full transition-colors duration-300 ease-in
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
                <span className="">Saved</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="h-1/3 w-full flex flex-col absolute bottom-0 font-montserrat justify-center   xl:h-1/4">
        <h2 className=" text-xs flex items-center   uppercase text-white p-4">
          Powered by{" "}
          <Image
            src={FooterLogo}
            alt="logo"
            className="w-12 h-auto ml-2"
          ></Image>
        </h2>
        <h2 className="text-white uppercase  text-xs tracking-wide xl:mr-4 p-4">
          Copyright © 2024 | Private Policy
        </h2>
      </div>
    </div>
  );
};

export default Footer;
