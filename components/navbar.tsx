"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-real.png";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

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
        <Link
          href="/"
          className="font-cinzel text-4xl md:text-5xl"
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
        >
          Oni
        </Link>
        <ul
          className={` text-white text-xs hidden  font-light font-montserrat h-full xl:flex justify-around uppercase tracking-widest items-center   w-auto transition-colors duration-300 ease-in
          `}
        >
          <li className="relative p-4">
            <Link href="/">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-8 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
                Home
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/listings">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-8 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
                Properties
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/clients">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-8 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
                Ownership
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-8 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
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
            className={`block w-1/2 my-0.5 border border-white ${
              openMenu ? "hidden" : ""
            } transition-opacity duration-300 ease-in-out relative top-0.5`}
          ></span>
          <span
            className={`block w-1/4 my-0.5 border border-white ${
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
              className="xl:hidden absolute top-0  right-0 bottom-0 flex justify-center items-center w-full  h-screen bg-white/75  "
            >
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="xl:hidden absolute top-0  right-0 bottom-0 flex justify-end items-center w-3/4 rounded-tl-3xl rounded-bl-3xl h-screen bg-shadow shadow-xl "
              >
                <ul
                  className={`text-right gap-y-12 h-fit font-cinzel w-full 
          `}
                >
                  <div className="absolute w-1/2 h-10 top-5 left-6 flex">
                    <div className="w-10 h-10 rounded-full absolute left-3 bg-pine shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-forest shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-mint absolute left-6 shadow-lg"></div>
                  </div>
                  <li className="relative text-right hover:text-gray-500 w-full p-4 text-2xl md:text-4xl tracking-wider font-extralight flex items-center justify-end">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="relative text-right hover:text-gray-500 p-4 text-2xl md:text-4xl tracking-wider font-extralight flex items-center justify-end">
                    <Link href="/listings">Properties</Link>
                  </li>
                  <li className="relative text-right hover:text-gray-500 p-4 text-2xl md:text-4xl tracking-wider font-extralight flex items-center justify-end">
                    <Link href="/clients">Ownership</Link>
                  </li>
                  <li className="relative hover:text-gray-500 p-4 text-2xl md:text-4xl tracking-wider font-extralight flex items-center justify-end">
                    <Link href="/">Saved</Link>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Nav;
