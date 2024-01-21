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
    <div className="bg-eggshell w-full h-screen flex justify-center items-center">
      <div className="w-full xl:5/6 h-5/6  flex flex-col justify-center ">
        <motion.h2
          className="xl:text-6xl text-3xl font-agrandir tracking-wide w-[90%] p-4 xl:w-[90%] "
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
            {openSchedule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="fixed inset-0 z-50"
              >
                <div
                  className="w-full h-full bg-white/80
              flex justify-center items-center"
                >
                  <motion.section
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                    className="xl:w-1/3 w-[90%] h-[90%] backdrop-blur bg-black/50  rounded-2xl shadow-xl"
                  >
                    <button
                      onClick={handleClose}
                      className="w-12   h-12 flex justify-center items-center"
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        className="w-6 h-6 text-white "
                      />
                    </button>
                    <div className="w-full h-[95%] flex flex-col justify-center items-center">
                      <Image
                        src={Logo}
                        alt="company logo"
                        className="w-1/3 invert "
                      />
                      <h2 className="text-2xl font-agrandir tracking-wide mt-4 font-bold text-white">
                        Let's Talk.
                      </h2>
                      {/* Schedule */}
                      <div className="w-full h-4/5 flex justify-evenly items-center flex-col">
                        {/* Form */}
                        <form className="bg-transparent rounded  w-3/4 h-5/6 ">
                          {" "}
                          {/* First Name */}
                          <div className="mb-4">
                            <label
                              className="block text-white font-montserrat  text-sm font-medium mb-2"
                              placeholder="name"
                            >
                              First Name
                            </label>
                            <input
                              className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              type="text"
                              placeholder="Name"
                            />
                          </div>
                          {/* Last Name */}
                          <div className="mb-4">
                            <label
                              className="block text-white font-montserrat  text-sm font-medium mb-2"
                              placeholder="name"
                            >
                              Last Name
                            </label>
                            <input
                              className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              type="text"
                              placeholder="Name"
                            />
                          </div>
                          {/* Last Name */}
                          <div className="mb-4">
                            <label
                              className="block text-white font-montserrat  text-sm font-medium mb-2"
                              placeholder="name"
                            >
                              Email
                            </label>
                            <input
                              className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              type="text"
                              placeholder="Email"
                            />
                          </div>
                          {/* Submission Field */}
                          <div className="mb-4">
                            <label
                              className="block text-white font-montserrat  text-sm font-medium mb-2"
                              placeholder="name"
                            >
                              Message
                            </label>
                            <textarea
                              className="shadow font-montserrat  appearance-none bg-transparent border rounded w-full py-6 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="message"
                              placeholder="Type your message here..."
                              rows="1" // You can adjust the number of rows as needed
                            ></textarea>
                            <div className="my-2 h-1/5 w-full flex justify-center items-center ">
                              <button
                                className="w-3/4 border font-montserrat text-sm rounded-full text-white font-bold p-2"
                                type="submit"
                              >
                                Submit.
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </motion.section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
