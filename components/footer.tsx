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
    <div className="w-full h-500 flex flex-col z-50  bg-shadow">
      {/* links */}
      <div className="w-full h-full border-b border-gray-400 flex">
        <div className="w-1/2 h-full border hidden flex flex-col justify-evenly ">
          <div className="w-1/6 h-fit ml-4 mt-4 hidden xl:visible">
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
          <div className=" w-1/2 h-3/4  items-center flex flex-col justify-evenly hidden">
            <div className="text-white ml-4 w-full h-fit border flex flex-col">
              <h2 className="text-sm tracking-wide font-cinzel font-medium ">
                Contact
              </h2>
              <p className="font-light text-xs font-montserrat">
                info@oniprofessionals.com
              </p>
            </div>
            <div className="text-white ml-4 w-full h-fit flex  border flex-col hidden">
              <h2 className="text-sm tracking-wide font-cinzel font-medium">
                Location
              </h2>
              <p className="font-light text-xs font-montserrat w-full">
                1234 SANTA MONICA BLVD., HOUSTON, TX 12345
              </p>
            </div>
            <ul className="w-full h-fit flex flex-col text-white hidden">
              <h2 className="text-sm tracking-wide font-cinzel font-medium">
                Social Media
              </h2>
              <Link
                className="text-xs font-montserrat hover:text-white/50 transition ease-in duration-200"
                href="/"
              >
                Instagram
              </Link>
              <Link
                className="text-xs font-montserrat hover:text-white/50 transition ease-in duration-200"
                href="/"
              >
                Facebook
              </Link>
              <Link
                className="text-xs font-montserrat hover:text-white/50 transition ease-in duration-200"
                href="/"
              >
                LinkedIn
              </Link>
            </ul>
          </div>
        </div>
        {/* Links */}
        <div>
          <ul className="w-full h-full text-white text-md flex flex-col justify-center gap-y-4 font-montserrat ml-4">
            <Link className="hover:text-gray-600" href="/">
              Home
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Properties
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Ownership
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Saved
            </Link>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="h-75  w-full flex justify-between items-center">
        <h2 className="flex text-xs uppercase items-center w-96 ml-4 text-white">
          Powered by{"  "}
          <Image
            src={FooterLogo}
            alt="logo"
            style={{
              position: "relative",
              width: "80px",
              height: "40px",
              left: "15px",
            }}
          ></Image>
        </h2>
        <h2 className="text-white uppercase mr-4 text-xs tracking-widest">
          Copyright Oni Professionals. All Rights Reserved. Private Policy.
        </h2>
      </div>
    </div>
  );
};

export default Footer;
