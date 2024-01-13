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
      <div className="w-full h-1/2  flex items-center justify-center">
        <div className="w-1/2 h-full flex flex-col justify-center ">
          {/* <div className="w-1/6 h-fit ml-4 mt-4 hidden xl:visible">
            <Image
              src={Logo}
              alt="logo"
              style={{
                objectFit: "cover",
              }}
              className="w-[100%] h-[100%] invert"
            ></Image>
          </div> */}
          {/* Contact & Social Media */}
          <div className="text-white w-full  h-fit text-center justify-center items-center  flex flex-col">
            <h2 className="text-md tracking-wide font-cinzel font-medium p-4">
              Contact
            </h2>
            <p className="font-light text-sm font-montserrat">
              info@oniprofessionals.com
            </p>
          </div>
          <div className="text-white text-center w-full h-fit flex flex-col ">
            <h2 className="text-md tracking-wide font-cinzel font-medium p-4">
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
        <div className="border-b border-white w-3/4"></div>
      </div>

      {/* Copyright */}
      <div className="h-1/2 w-full flex flex-col font-montserrat justify-evenly xl:justify-between items-center">
        <h2 className=" text-xs flex items-center uppercase w-1/2 text-white relative left-4">
          Powered by{" "}
          <Image
            src={FooterLogo}
            alt="logo"
            className="w-12 h-auto ml-2"
          ></Image>
        </h2>
        <h2 className="text-white uppercase w-3/4 text-xs tracking-wide xl:mr-4 relative left-4">
          Copyright © 2024 | Private Policy
        </h2>
      </div>
    </div>
  );
};

export default Footer;
