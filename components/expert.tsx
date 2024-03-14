"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Local from "public/iStock-1481867504.jpg";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Expert = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const control = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    if (inView) {
      control.start("visible");
    } else {
      const { bottom } = parentRef.current.getBoundingClientRect();
      const isBelowScreenBottom = bottom > window.innerHeight;
      if (isBelowScreenBottom) {
        control.start("hidden");
      }
    }
  }, [inView, control]);

  return (
    <div
      className=" w-full h-screen md:h-1000 bg-gradient-to-b  from-white via-pine/50 to-white flex justify-center items-center"
      ref={parentRef}
    >
      {/* Local Support */}
      <div
        className=" h-full w-full  flex flex-col justify-center  items-center xl:flex-row"
        ref={ref}
      >
        {/* Flex column */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full h-1000 md:h-2/3 xl:hidden  relative flex flex-col items-center justify-center"
        >
          <motion.h2 className="md:w-full xl:hidden text-left font-agrandir p-4 text-2xl md:text-5xl  tracking-wide text-black ">
            Local Expertise Houston Connected
          </motion.h2>
          <motion.p className="text-sm xl:w-full xl:hidden p-4 text-black/75 mt-2 font-montserrat leading-6 font-regular tracking-wide text-left relative xl:top-6">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </motion.p>
          <div className="w-full xl:h-5/6 lg:h-3/5 md:h-1/2 h-1/2 rounded-lg p-4   ">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
          </div>
          <Link
            href="/owners"
            className="absolute xl:w-1/3 w-5/6  xl:hidden h-16 hover:bg-black hover:text-white text-black font-light tracking-wider text-base flex justify-center items-center transition-all duration-300 ease-in-out font-montserrat -bottom-10 md:-bottom-5 bg-white xl:right-4  bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-black/50 rounded-2xl shadow-sm p-4  group"
          >
            <span>For Owners </span>
            <span className="relative left-1 bottom-3 transfrom -rotate-45 flex items-center justify-start w-12 h-12 duration-300 transform translate-y-0 group-hover:-translate-y-[10%] group-hover:translate-x-[25%] group-hover:opacity-100 ease">
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
        {/* Flex-row */}
        <div className="w-full xl:w-1/2 xl:h-full hidden xl:flex xl:flex-col xl:justify-evenly items-center">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={control}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="  w-full text-left  font-agrandir p-4 text-2xl md:text-6xl font-regular tracking-wide text-black "
          >
            Local Expertise Houston Connected
          </motion.h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 0 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={control}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="w-full h-1/2 relative p-4 bottom-24"
          >
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%]  rounded-lg shadow-xl"
            ></Image>
          </motion.div>
          {/* flex column */}
        </div>
        {/* Local Expertise */}
        <div className="w-full h-1/5 xl:h-1/2   xl:w-1/2 flex items-center flex-col justify-center xl:justify-evenly  xl:items-end  relative">
          {/* Mobille Responsive */}
          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={control}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="p-4 text-5xl font-montserrat hidden xl:block"
          >
            A Trustworthy <span className="text-pine font-bold">Network</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 0 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={control}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm xl:w-5/6 hidden xl:block p-4 text-black/75 mt-2 font-montserrat leading-6 font-regular tracking-wide text-jusitfy relative "
          >
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
            <br></br>
            <br></br>
            We understand the intricate nuances of the market landscape,
            allowing us to provide you with tailored solutions that align
            perfectly with your goals. Whether you're buying, selling, or
            investing, our expertise ensures that you navigate each step with
            confidence and clarity. Our team is dedicated to staying ahead of
            market trends, leveraging our deep-rooted connections to unlock
            opportunities that others might overlook.
          </motion.p>
          {/* <ul className="xl:w-full xl:h-1/2 hidden xl:flex xl:flex-col items-end p-4 justify-evenly font-cinzel text-xl relative top-20">
            <div className="w-1/2 ">
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={control}
                transition={{ duration: 1, delay: 2 }}
                className="p-4 text-right text-black tracking-wider font-light"
              >
                Curated & Exclusive
              </motion.li>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={control}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1 },
                }}
                transition={{ duration: 1, delay: 2 }}
                className="w-full border border-black/50"
                style={{ transformOrigin: "right" }}
              ></motion.div>
            </div>
            <div className=" w-1/2 ">
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={control}
                transition={{ duration: 0.6, delay: 2.5 }}
                className="p-4 text-right text-black tracking-wider font-light"
              >
                Redefining Standards
              </motion.li>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={control}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1 },
                }}
                transition={{ duration: 1, delay: 2.5 }}
                className="w-full border border-black/50"
                style={{ transformOrigin: "right" }}
              ></motion.div>
            </div>
            <div className="w-1/2">
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={control}
                transition={{ duration: 0.6, delay: 3 }}
                className="p-4 text-right text-black tracking-wider font-light"
              >
                Uncompromising Efforts
              </motion.li>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={control}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1 },
                }}
                transition={{ duration: 1, delay: 3 }}
                className="w-full border border-black/50"
                style={{ transformOrigin: "right" }}
              ></motion.div>
            </div>
          </ul> */}
          <Link
            href="/owners"
            className="absolute xl:w-1/3 w-5/6 hidden  h-16 hover:bg-black hover:text-white text-black font-light tracking-wider text-base xl:flex justify-center items-center transition-all duration-300 ease-in-out font-montserrat bottom-[0%] bg-white xl:right-4  bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-black/50 rounded-2xl shadow-sm p-4  group"
          >
            <span>For Owners </span>
            <span className="relative left-1 bottom-3 transfrom -rotate-45 flex items-center justify-start w-12 h-12 duration-300 transform translate-y-0 group-hover:-translate-y-[10%] group-hover:translate-x-[25%] group-hover:opacity-100 ease">
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Expert;
