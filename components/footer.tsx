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
    <div className="w-full h-screen flex flex-col z-50  bg-white">
      {/* links */}
      <div className="w-full h-full border-b border-gray-400 flex">
        <div className="w-1/2 h-full flex flex-col justify-evenly ">
          <div className="w-1/5 h-fit ml-4">
            <Image
              src={Logo}
              alt="logo"
              style={{
                objectFit: "cover",
              }}
              className="w-[100%] h-[100%]"
            ></Image>
          </div>
          {/* Contact & Social Media */}
          <div className=" w-1/2 h-3/4  items-center flex flex-wrap">
            <div className="text-black ml-4 w-64 h-fit  flex   flex-col">
              <h2 className="text-xl tracking-wide">Contact</h2>
              <p className="font-light">info@oniprofessionals.com</p>
            </div>
            <div className="text-black ml-4 w-64 h-fit flex   flex-col">
              <h2 className="text-xl tracking-wide">Location</h2>
              <p className="font-light">
                1234 SANTA MONICA BLVD.,
                <br></br>
                HOUSTON, TX
                <br></br>
                12345
              </p>
            </div>
            <div className="text-black ml-4 w-fit h-fit  flex   flex-col">
              <h2 className="text-xl tracking-wide">Social Media</h2>
              <ul className="w-fit h-fit  flex gap-x-8">
                <Link
                  className="text-md hover:text-black/50 transition ease-in duration-200"
                  href="/"
                >
                  Instagram
                </Link>
                <Link
                  className="text-md hover:text-black/50 transition ease-in duration-200"
                  href="/"
                >
                  Facebook
                </Link>
                <Link
                  className="text-md hover:text-black/50 transition ease-in duration-200"
                  href="/"
                >
                  LinkedIn
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {/* Links */}
        <div className="w-1/2  border-black h-full flex flex-col justify-evenly items-center">
          <ul className="w-full h-12 text-black text-sm  flex justify-evenly items-center">
            <Link className="hover:text-gray-600" href="/">
              Home
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Search
            </Link>
            <div className="border w-16 border-black"></div>
            <Link className="hover:text-gray-600" href="/">
              List
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Sellers
            </Link>
            <Link className="hover:text-gray-600" href="/">
              Buyers
            </Link>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="h-75  w-full flex justify-between items-center">
        <h2 className="flex text-xs uppercase items-center w-96 ml-4 text-black">
          Powered by{"  "}
          <Image
            className="invert"
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
        <h2 className="text-black uppercase mr-4 text-xs tracking-widest">
          Copyright Oni Professionals. All Rights Reserved. Private Policy.
        </h2>
      </div>
    </div>
  );
};

export default Footer;
