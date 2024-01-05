"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import seller1 from "public/seller1.jpeg";
import seller2 from "public/seller2.webp";
import seller3 from "public/seller3.jpeg";
import "app/globals.css";
import ProgressBarSvg from "./progressBarSvg";
import { motion, useAnimation } from "framer-motion";

const Seller = () => {
  const text = "Seller Process";

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full h-full flex bg-white">
      {/* Image */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-fit ml-4 mb-4 flex flex-col justify-center items-center ">
          <span className="uppercase text-black text-6xl font-bold bottom-0 font-regular w-full">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 1 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="text-lg text-forest w-full font-medium">
            Achieve Your Home Selling Goals with Us – Where Expertise Meets
            Results.
          </span>
        </div>
        <div className="w-5/6 h-11/12 flex flex-col gap-y-8 justify-evenly  items-center">
          <motion.div className="w-2/3 h-2/4 relative right-24">
            <Image
              src={seller1}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90 contrast-75 shadow-lg shadow-mint"
            />
          </motion.div>
          <motion.div className="w-2/3 h-2/4 relative left-20">
            <Image
              src={seller2}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90	contrast-75	shadow-lg shadow-mint"
            />
          </motion.div>
          <motion.div className="w-2/3 h-2/4 relative right-24">
            <Image
              src={seller3}
              alt="home"
              className="h-48 w-96 object-cover rounded-lg brightness-90 contrast-75	shadow-lg shadow-mint"
            />
          </motion.div>
        </div>
      </div>
      {/* Info */}
      <div className="w-1/2 h-full flex justify-center items-center">
        <ProgressBarSvg />
      </div>
    </div>
  );
};

export default Seller;
