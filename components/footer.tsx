import React from "react";
import Logo from "../public/logo-real.png";
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
    <div className="w-full h-600 flex flex-col z-50  bg-shadow">
      <div className="xl:flex xl:flex-row xl:h-3/4 h-1/2 items-center justify-center">
        {/* links */}
        <div className="w-full h-full xl:w-1/2 xl:h-full flex items-center justify-center">
          <div className="w-1/2 h-full flex flex-col justify-center xl:items-center">
            <div className="w-40 h-fit mt-4 hidden xl:flex">
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
            <div className="text-white/75 w-full  h-fit  justify-center items-center  flex flex-col">
              <h2 className="text-md tracking-wider font-agrandir font-medium p-4">
                Contact
              </h2>
              <p className="font-light text-sm font-montserrat tracking-wider">
                info@oniprofessionals.com
              </p>
            </div>
            <div className="text-white/75 text-center w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider font-agrandir font-medium p-4">
                Phone
              </h2>
              <p className="font-light text-sm font-montserrat w-full">
                +1 (281) 123-4567
              </p>
            </div>
            <div className="text-white/75 text-center w-full h-fit flex flex-col tracking-wider">
              <h2 className="text-md tracking-wider font-agrandir font-medium p-4">
                Location
              </h2>
              <p className="font-light text-sm font-montserrat w-full">
                1234 SANTA MONICA BLVD., HOUSTON, TX 12345
              </p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="w-full flex justify-center items-center">
          <div className="border-b border-white w-1/2"></div>
          <ul
            className={` text-white text-xs xl:text-sm hidden  font-light font-montserrat h-full xl:flex justify-around uppercase tracking-widest items-center   w-auto transition-colors duration-300 ease-in
          `}
          >
            <li className="relative p-4 hover:text-gray-400 duration-200 ease-in-out transition">
              <Link href="/">
                <span className="">Home</span>
              </Link>
            </li>
            <li className="relative p-4 hover:text-gray-400  duration-200 ease-in-out transition">
              <Link href="/listings">
                <span className="">Properties</span>
              </Link>
            </li>
            <li className="relative p-4 hover:text-gray-400  duration-200 ease-in-out transition">
              <Link href="/clients">
                <span className="">Ownership</span>
              </Link>
            </li>
            <li className="relative p-4 hover:text-gray-400  duration-200 ease-in-out transition">
              <Link href="/">
                <span className="">Saved</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="h-1/2 w-full flex flex-col font-montserrat justify-center xl:justify-center items-center xl:h-1/4">
        <h2 className=" text-xs flex items-center uppercase text-white relative left-4">
          Powered by{" "}
          <Image
            src={FooterLogo}
            alt="logo"
            className="w-12 h-auto ml-2"
          ></Image>
        </h2>
        <h2 className="text-white uppercase  text-xs tracking-wide xl:mr-4 relative left-4">
          Copyright © 2024 | Private Policy
        </h2>
      </div>
    </div>
  );
};

export default Footer;
