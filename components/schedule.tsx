"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import ScheduleModal from "./scheduleModal";

const Schedule = () => {
  //Open and Close Scheduling
  const [openSchedule, isOpenSchedule] = useState(false);

  const handleOpen = () => {
    isOpenSchedule(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleClose = () => {
    isOpenSchedule(false);
    document.body.style.overflow = "visible"; // Enable scrolling
  };

  //SVG Progression animation
  const controls = useAnimation();

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 2 } },
  };

  // Trigger animation on mount
  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  //Animation
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
      className=" bg-gradient-to-b from-mint/50 via-white to-white w-full h-screen flex justify-center items-center"
      ref={parentRef}
    >
      <div
        className="w-full xl:5/6 h-5/6  flex flex-col justify-center "
        ref={ref}
      >
        <motion.h2
          className="md:text-5xl text-3xl  font-agrandir tracking-wide w-[90%] p-4 xl:w-[80%] "
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 1, delay: 0.25 }}
        >
          Seamless Transitions, Effortless Decisions: Home Buying and Selling,
          <span
            className="text-pine font-bold"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Simplified.
          </span>
        </motion.h2>

        <div className="h-1/4 w-full flex p-4 items-center">
          <motion.button
            onClick={handleOpen}
            className=" backdrop-filter font-montserrat  pulse-btn font-regular  text-black text-base  tracking-widest backdrop-blur-md shadow-xl shadow-black transition ease-in-out duration-300 rounded-full border border-black w-2/3 xl:w-1/4 h-1/3"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={control}
            transition={{ duration: 1, delay: 1 }}
          >
            Schedule
          </motion.button>
          <AnimatePresence>
            {openSchedule && <ScheduleModal handleClose={handleClose} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
