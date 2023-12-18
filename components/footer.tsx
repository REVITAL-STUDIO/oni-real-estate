import React from "react";
import Logo from "../public/logo.png";
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
    <div className="w-full h-screen flex flex-col z-50  bg-black">
      {/* links */}
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full flex flex-col ">
          <div className="w-1/4 h-fit">
            <Image
              src={Logo}
              alt="logo"
              style={{
                objectFit: "cover",
                position: "relative",
                right: "15px",
              }}
            ></Image>
          </div>
          {/* Contact & Social Media */}
          <div className=" w-1/2 h-full  flex flex-wrap">
            <div className="text-white ml-4 w-64 h-fit  flex   flex-col">
              <h2 className="text-xl">CONTACT</h2>
              <p className="font-light">info@oniprofessionals.com</p>
            </div>
            <div className="text-white ml-4 w-64 h-fit flex   flex-col">
              <h2 className="text-xl">LOCATION</h2>
              <p className="font-light">
                1234 SANTA MONICA BLVD.,
                <br></br>
                HOUSTON, TX
                <br></br>
                12345
              </p>
            </div>
            <div className="text-white ml-4 w-fit h-fit  flex   flex-col">
              <h2 className="text-xl">SOCIAL MEDIA</h2>
              <ul className="w-fit h-fit  flex gap-x-8">
                <Link
                  className="text-3xl hover:text-white/50 transition ease-in duration-200"
                  href="/"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className="text-3xl hover:text-white/50 transition ease-in duration-200"
                  href="/"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link
                  className="text-3xl hover:text-white/50 transition ease-in duration-200"
                  href="/"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {/* Links */}
        <div className="w-1/2  border-white h-full flex flex-col justify-evenly items-center">
          <ul className="w-full h-12 text-white text-sm  flex justify-evenly items-center">
            <Link href="/">HOME</Link>
            <Link href="/">SEARCH</Link>
            <div className="border w-16 border-white"></div>
            <Link href="/">LISTINGS</Link>
            <Link href="/">SELLERS</Link>
            <Link href="/">BUYERS</Link>
          </ul>
          {/* <p className="text-white text-sm  w-11/12 p-4">
            <span className="text-2xl tracking-wide font-extralight">
              Oni Professionals
            </span>{" "}
            is a full-service, luxury real estate brokerage and lifestyle
            company that has redefined and modernized the real estate industry.
            To put it simply, we do things differently. The Agency set out to
            foster a culture of collaboration in which the collective talents,
            resources and networks of our world-class team would be behind each
            of our clients every step of the way. Our spirit of innovation has
            led the way in the advancement of our industry, and we offer a fresh
            forward-thinking approach that reaches all corners of the globe. The
            Agency represents clients worldwide in the residential, new
            development, resort and luxury leasing industries, with some of the
            most visible and high-end properties in the country among our vast
            portfolio
          </p> */}
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
          Copyright Oni Professionals. All Rights Reserved.
        </h2>
      </div>
    </div>
  );
};

export default Footer;
