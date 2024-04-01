"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Pool from "public/iStock-1453183714.jpg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Info = () => {
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
      ref={parentRef}
      className="h-screen  w-full  md:h-1000 flex flex-col lg:flex-row bg-white "
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={control}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="w-full h-full relative flex flex-col justify-start items-center  text-black"
        ref={ref}
      >
        <div className="w-full h-1/2 flex flex-col justify-center">
          <h1 className=" font-agrandir tracking-wider flex items-center font-regular p-4 mt-4 text-3xl md:text-6xl  text-black  ">
            Our Purpose{" "}
          </h1>
          <h3 className="p-4 text-xs md:text-sm font-montserrat font-medium tracking-widest text-black/75">
            Creating a One-of-A-Kind Home Buying Experience
          </h3>
          <p className="text-sm xl:w-full   text-black/60  font-regular font-montserrat tracking-wide  p-4 xl:leading-6">
            For every project, we start with the fundamentals. Reliability,
            quality and a relentless vision for success. From the ground up,
            every detail and every outcome is in trusted hands.
            <br></br>
            <br></br>
            We envisage and build quality projects for longevity and strategic
            success.
          </p>
          <div className="p-4 hidden xl:block font-agrandir">
            <h2 className="text-black text-6xl">
              Exceptional <span className="text-pine">Agents</span>,
            </h2>
            <h2 className="text-6xl">
              Proven <span className="text-pine">Results</span>.
            </h2>
          </div>
        </div>

        {/* Mobile Responsive */}
        <div className="h-2/5  w-[100%] relative rounded-lg md:bottom-20 flex justify-center items-center p-4  xl:hidden ">
          <Image
            src={Pool}
            alt="pool-image"
            className="w-[100%] h-[100%] rounded-lg shadow-md"
          />
        </div>
        <Link
          href="/listings"
          className="absolute xl:w-1/3 w-5/6  h-16 hover:bg-black hover:text-white text-black font-light tracking-wider text-base flex justify-center items-center transition-all duration-300 ease-in-out font-montserrat bottom-[0%] xl:top-1/2 bg-white xl:left-4  bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-black/50 rounded-2xl shadow-sm p-4  group z-40"
        >
          <span>View Properties </span>
          <span className="relative left-1 bottom-3 transfrom -rotate-45 flex items-center justify-start w-12 h-12 duration-300 transform translate-y-0 group-hover:-translate-y-[10%] group-hover:translate-x-[25%] group-hover:opacity-100 ease">
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </span>
        </Link>
      </motion.div>

      <div className="xl:w-1/2 w-full h-full hidden xl:flex justify-center xl:items-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="md:h-3/4 md:w-[90%] p-4 flex rounded-lg flex-col  justify-center items-center overflow-hidden relative left-4"
        >
          <Image
            src={Pool}
            alt="pool-image"
            className="rounded-lg w-[100%] h-[100%] object-cover bg-center"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Info;
