"use client";

import React from "react";
import Image from "next/image";
import Logo2 from "../public/oni-moon.png";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: -20,

      transition: {
        opacity: { duration: 0.3 },
        scale: { duration: 0.8, delay: 1 }, // Delay the y transition by 0.5 seconds
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: -30,
      transition: {
        opacity: { duration: 0.5, delay: 2 }, // Delay the y transition by 0.5 seconds
      },
    },
  };

  return (
    <motion.div className="h-screen w-full bg-black flex justify-center items-center  bg-[url('/aerial-houston.jpg')] bg-cover ">
      <div className=" flex   justify-center items-center w-5/6 h-2/6">
        {/* Logo & Slogan */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="w-3/4 md:w-1/2 h-fit text-center text-white flex justify-center items-center"
        >
          <Image src={Logo2} alt="logo" className="w-96 h-auto invert" />
        </motion.div>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="w-1/2  h-1/2 justify-center items-center flex"
        >
          <h2
            className="text-white text-center font-agrandir font-medium text-base md:text-4xl lg:text-5xl xl:text-4xl tracking-wider "
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Where Houston finds Homes.
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
