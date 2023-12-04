import React from "react";
import Logo from "../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="w-full h-screen flex flex-col   bg-royal">
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
          <div className=" w-5/6 h-full  flex flex-wrap">
            <div className="text-white ml-4 w-64 h-fit  flex   flex-col">
              <h2 className="text-xl">CONTACT</h2>
              <p className="font-light">info@oniprofessionals.com</p>
            </div>
            <div className="text-white ml-4 w-64 h-fit flex   flex-col">
              <h2 className="text-xl">LOCATION</h2>
              <p className="font-light">
                1234 SANTA MONICA BLVD.,
                <br></br>
                PENTHOUSE BEVERLY HILLS,
                <br></br>
                CA 12345
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
      <div className="h-50 w-full "></div>
    </div>
  );
};

export default Footer;
