"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from "../public/logo-real.png";
import { motion, useAnimation } from "framer-motion";
import { Cinzel } from "next/font/google";

const Hero = () => {
  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: -20,
      scale: 0.75,
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5, delay: 1 }, // Delay the y transition by 0.5 seconds
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
    <div className="h-screen w-full flex  justify-center items-center bg-[url('/new-background.jpg')] bg-cover bg-center">
      <div className=" flex flex-col justify-center items-center w-5/6 h-2/6">
        {/* Logo & Slogan */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="w-fit h-fit text-center text-white flex justify-center items-center"
        >
          <Image
            src={Logo2}
            alt="logo"
            className="w-52 md:w-80 h-auto invert"
          />
        </motion.div>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="w-3/4 md:w-full h-1/2 justify-center items-center flex"
        >
          <h2
            className="text-white text-center font-cinzel text-2xl md:text-4xl tracking-wider"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Where Houston finds Homes
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
