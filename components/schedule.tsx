"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Logo from "public/logo-real.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMobile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
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

  const circleVariants = {
    initial: { scale: 1, opacity: 1, fill: "#C1FF72" },
    animate: { scale: 1.5, opacity: 0.5, fill: "#C1FF72" },
  };

  const circleTransition = {
    duration: 2, // Adjust the duration as needed
    repeat: Infinity,
    repeatType: "reverse" as const, // Use 'as const' to assert the correct type
  };

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

  return (
    <div className=" bg-gradient-to-b from-mint/50 via-white to-white w-full h-screen flex justify-center items-center">
      <div className="w-full xl:5/6 h-5/6  flex flex-col justify-center ">
        <motion.h2
          className="md:text-5xl text-3xl  font-agrandir tracking-wide w-[90%] p-4 xl:w-[80%] "
          variants={textVariants}
          initial="initial"
          animate="animate"
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
            whileHover={{ scale: 1.05 }}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
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
