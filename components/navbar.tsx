"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-real.png";
import mobileLogo from "public/oni-moon.png";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [color, setColor] = useState<boolean>(false);
  const [disappear, setDisappear] = useState<boolean>(false);

  const changeColor = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      setColor(scrollY >= 80);
      setDisappear(scrollY >= 80);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);

      return () => {
        window.removeEventListener("scroll", changeColor);
      };
    }
  }, []);

  //menu animation
  const variants = {
    hidden: { opacity: 0, y: 0, transition: { delay: 3 } },
    visible: {
      opacity: 1,
      transition: { delay: 2.5 },
    },
  };

  //Mobile Menu
  const [openMenu, setOpenMenu] = useState(false);

  const toggleButton = () => {
    setOpenMenu((prev) => !prev);

    // Toggle scrolling based on the openMenu state
    document.body.style.overflow = !openMenu ? "hidden" : "auto";
  };

  return (
    <div
      className={`h-80 w-full flex fixed bg-gradient-to-b from-black via-black/50 to-transparent z-50 flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        color ? "" : ""
      } ${disappear ? "opacity-0 pointer-events-none " : " "}`}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full m-auto flex justify-between items-center p-4 text-white"
      >
        <Link href="/" className="font-agrandir text-4xl md:text-5xl">
          <Image
            src={mobileLogo}
            alt="oni real estate logo"
            className="invert w-20"
          />
        </Link>
        <ul
          className={` text-white text-sm hidden  font-light font-montserrat h-full xl:flex justify-between uppercase tracking-widest items-center gap-x-8  w-auto transition-colors duration-300 ease-in
          `}
        >
          <li className="relative p-4">
            <Link href="/">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Home
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/listings">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Properties
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/clients">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Ownership
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Saved
              </span>
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={toggleButton}
          className="w-12 h-12 flex flex-col relative justify-center items-center rounded-full  space-x-reverse xl:hidden z-10"
        >
          <span
            className={`block w-3/4 my-0.5 border border-white ${
              openMenu
                ? "rotate-45 transition-transform duration-300 ease-in-out"
                : "transition-transform duration-300 ease-in-out relative top-0.5"
            }`}
          ></span>
          <span
            className={`block w-3/4 my-0.5 border border-white ${
              openMenu
                ? "-rotate-45 w-3/4 absolute top-2/5 transition-transform duration-300 ease-in-out"
                : "transition-transform duration-300 ease-in-out relative top-0.5"
            }`}
          ></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="xl:hidden absolute top-0  right-0 bottom-0  flex justify-center items-center w-full  h-screen bg-mist  "
            >
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                className="xl:hidden absolute top-0   right-0 bottom-0 w-full h-screen bg-black shadow-xl "
              >
                <Image
                  src={mobileLogo}
                  alt="oni real estate logo"
                  className="invert w-24 p-4"
                />
                <ul
                  className={` gap-y-4  flex flex-col justify-center font-agrandir w-full h-1/2
          `}
                >
                  <li className="relative   w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link href="/" className="w-full flex justify-between">
                      Home <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link href="/" className="w-full flex justify-between">
                      Saved <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link
                      href="/clients"
                      className="w-full flex justify-between"
                    >
                      Ownership <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link
                      href="/listings"
                      className="w-full flex justify-between"
                    >
                      Properties <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                </ul>
                <div className="w-full flex justify-center items-center">
                  <button className="font-agrandir w-3/4 h-1/3 bg-white text-black border border-white p-4 text-lg rounded-xl">
                    Contact Us.
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Nav;
