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
    initial: { scale: 1, opacity: 1, fill: "#3E4A37" },
    animate: { scale: 1.5, opacity: 0.5, fill: "#3E4A37" },
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
    <div className="bg-storm w-full h-screen">
      <div className="w-full h-full bg-gradient-to-t from-white via-mint to-white flex flex-col justify-center items-center">
        <motion.h2
          className="text-4xl font-montserrat font-regular tracking-wide text-center w-3/5 "
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          Seamless Transitions, Effortless Decisions: Home Buying and Selling,
          Simplified.
        </motion.h2>
        <div className="w-full h-1/3 flex justify-center items-center flex-col">
          <svg
            width="751"
            height="120"
            viewBox="0 0 751 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative left-8"
          >
            <g
              clip-path="url(#clip0_1596_32)"
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            >
              <path
                d="M715.742 32.7202C711.746 32.7202 708.69 35.776 708.69 39.7719C708.69 43.7679 711.746 46.8237 715.742 46.8237C718.797 46.8237 721.383 44.9432 722.323 42.1225H727.495V46.8237H732.196V42.1225H736.897V37.4214H722.323C721.383 34.6007 718.797 32.7202 715.742 32.7202ZM715.742 37.4214C717.152 37.4214 718.092 38.3616 718.092 39.7719C718.092 41.1823 717.152 42.1225 715.742 42.1225C714.331 42.1225 713.391 41.1823 713.391 39.7719C713.391 38.3616 714.331 37.4214 715.742 37.4214ZM709.865 51.5248C708.22 51.5248 707.045 52.465 706.574 53.8754L701.638 67.9788V86.7834C701.638 88.1938 702.578 89.134 703.989 89.134H706.339C707.75 89.134 708.69 88.1938 708.69 86.7834V84.4329H736.897V86.7834C736.897 88.1938 737.837 89.134 739.247 89.134H741.598C743.008 89.134 743.949 88.1938 743.949 86.7834V67.9788L739.012 53.8754C738.542 52.465 737.132 51.5248 735.722 51.5248H709.865ZM709.865 55.0507H735.722L739.247 65.6283H706.339L709.865 55.0507ZM709.865 70.3294C711.746 70.3294 713.391 71.9748 713.391 73.8553C713.391 75.7357 711.746 77.3811 709.865 77.3811C707.985 77.3811 706.339 75.7357 706.339 73.8553C706.339 71.9748 707.985 70.3294 709.865 70.3294ZM735.722 70.3294C737.602 70.3294 739.247 71.9748 739.247 73.8553C739.247 75.7357 737.602 77.3811 735.722 77.3811C733.841 77.3811 732.196 75.7357 732.196 73.8553C732.196 71.9748 733.841 70.3294 735.722 70.3294Z"
                fill="#000000"
              />
            </g>
            <path
              d="M687.534 79.3317H685.771V26.9418L688.641 26.3292C689.33 26.1944 689.985 25.9238 690.568 25.5332C691.151 25.1426 691.651 24.6398 692.038 24.0541C692.425 23.4684 692.691 22.8116 692.821 22.1219C692.952 21.4322 692.944 20.7234 692.798 20.0369C692.651 19.3504 692.37 18.6998 691.97 18.1232C691.569 17.5466 691.058 17.0554 690.466 16.6782C689.874 16.3011 689.213 16.0456 688.521 15.9266C687.83 15.8077 687.121 15.8276 686.437 15.9852L587.713 37.1404C586.438 37.4154 585.31 38.1517 584.545 39.2077C583.78 40.2638 583.432 41.5652 583.568 42.8621C583.704 44.159 584.315 45.3599 585.282 46.2342C586.25 47.1085 587.506 47.5945 588.81 47.599C589.185 47.5997 589.559 47.5613 589.925 47.4844L590.578 47.3433V79.3317H588.81C587.408 79.3317 586.062 79.8889 585.071 80.8808C584.079 81.8726 583.521 83.2179 583.521 84.6205C583.521 86.0232 584.079 87.3684 585.071 88.3603C586.062 89.3521 587.408 89.9093 588.81 89.9093H687.534C688.937 89.9093 690.282 89.3521 691.274 88.3603C692.266 87.3684 692.823 86.0232 692.823 84.6205C692.823 83.2179 692.266 81.8726 691.274 80.8808C690.282 79.8889 688.937 79.3317 687.534 79.3317ZM601.151 45.0736L675.194 29.2072V79.3317H666.379V52.8878C666.379 51.4851 665.822 50.1399 664.83 49.148C663.838 48.1562 662.493 47.599 661.09 47.599H615.254C613.852 47.599 612.506 48.1562 611.515 49.148C610.523 50.1399 609.965 51.4851 609.965 52.8878V79.3317H601.151V45.0736ZM655.802 63.4654H620.543V58.1766H655.802V63.4654ZM620.543 74.0429H655.802V79.3317H620.543V74.0429Z"
              fill="#000000"
            />
            <g
              clip-path="url(#clip1_1596_32)"
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            >
              <path
                d="M401.814 50.1704L400.46 48.8165C401.336 46.9965 401.637 44.9527 401.321 42.9576C401.006 40.9626 400.09 39.111 398.696 37.6497C397.745 36.7029 396.602 35.97 395.345 35.4998C394.088 35.0296 392.745 34.833 391.406 34.923C390.148 34.9967 388.912 35.2905 387.755 35.7912V13H300V113.291H387.755V62.5815L397.439 52.8971L398.267 53.7214C398.375 53.8293 398.46 53.9576 398.519 54.0988C398.578 54.2399 398.608 54.3912 398.608 54.5441C398.608 54.6969 398.578 54.8482 398.519 54.9894C398.46 55.1305 398.375 55.2588 398.267 55.3668L390.892 62.7444C390.422 63.2145 390.157 63.8522 390.157 64.5172C390.157 65.1823 390.42 65.8202 390.89 66.2907C391.361 66.7611 391.998 67.0256 392.663 67.0259C393.328 67.0262 393.966 66.7623 394.437 66.2922L401.814 58.9146C402.972 57.7541 403.623 56.1818 403.623 54.5425C403.623 52.9032 402.972 51.3309 401.814 50.1704ZM318.805 32.4314H368.956V37.446H318.805V32.4314ZM318.805 44.9678H368.956V49.9824H318.805V44.9678ZM318.805 57.5042H351.713V62.5188H318.805V57.5042ZM365.164 100.429H340.706C337.879 100.429 335.234 100.162 333.829 97.8464C332.391 95.4801 333.82 92.7315 334.864 90.7194C335.049 90.3653 334.638 89.9265 334.168 90.4123C332.789 91.8289 330.595 94.38 328.831 96.4297C326.966 98.5985 326.226 99.4479 325.831 99.8052C325.413 100.29 324.846 100.623 324.218 100.75C323.591 100.877 322.939 100.792 322.365 100.507C321.85 100.21 321.446 99.7518 321.216 99.2034C320.986 98.655 320.941 98.0463 321.089 97.4703C321.221 96.6867 323.459 87.9677 325.487 80.1293C322.791 84.9151 314.235 99.2473 313.834 99.9211C313.536 100.421 313.051 100.782 312.486 100.925C311.922 101.067 311.324 100.98 310.824 100.681C310.324 100.383 309.963 99.8979 309.82 99.3334C309.678 98.7689 309.765 98.1708 310.064 97.6708C310.173 97.4922 320.892 79.5307 322.243 76.9231C322.683 75.8808 323.503 75.0445 324.536 74.5831C325.569 74.1218 326.739 74.0698 327.809 74.4378C328.775 74.8304 329.556 75.5744 329.995 76.5201C330.434 77.4657 330.498 78.5426 330.175 79.5338C329.047 83.8839 327.897 88.3469 327.01 91.8195C328.442 90.1647 329.94 88.466 331.021 87.3534C331.853 86.353 332.991 85.6529 334.258 85.3602C335.526 85.0676 336.855 85.1985 338.042 85.7331C338.779 86.1084 339.369 86.7195 339.719 87.4692C340.069 88.2188 340.158 89.064 339.972 89.8701C339.673 90.8685 339.265 91.8312 338.756 92.7409C337.919 94.4803 338.318 96.038 340.706 96.038H365.161C365.743 96.038 366.301 96.2691 366.712 96.6805C367.124 97.092 367.355 97.65 367.355 98.2318C367.355 98.8137 367.124 99.3717 366.712 99.7831C366.301 100.195 365.743 100.426 365.161 100.426L365.164 100.429ZM358.642 84.6016L350.481 86.7548C350.362 86.7884 350.237 86.7893 350.117 86.7573C349.998 86.7253 349.89 86.6616 349.804 86.573C349.714 86.488 349.649 86.3799 349.616 86.2605C349.584 86.1411 349.585 86.015 349.619 85.896L351.7 77.7505L372.354 57.0968L379.249 63.9918L358.642 84.6016ZM394.578 48.6629L382.794 60.4471L375.899 53.5521L387.683 41.7679C388.737 40.6843 390.155 40.03 391.663 39.9313L391.945 39.9219C392.537 39.9113 393.125 40.0187 393.675 40.2377C394.225 40.4567 394.726 40.783 395.148 41.1975C396.054 42.2668 396.502 43.6499 396.395 45.0473C396.289 46.4446 395.636 47.7437 394.578 48.6629Z"
                fill="#000000"
              />
            </g>
            <path
              d="M77.5691 83.8777V99.8993C77.5691 101.302 77.0119 102.647 76.0201 103.639C75.0282 104.631 73.683 105.188 72.2803 105.188H40.5476C39.1449 105.188 37.7996 104.631 36.8078 103.639C35.816 102.647 35.2588 101.302 35.2588 99.8993V25.8561C35.2588 24.4535 35.816 23.1082 36.8078 22.1164C37.7996 21.1246 39.1449 20.5673 40.5476 20.5673H44.1228C46.3365 17.8885 48.8977 15.517 51.7386 13.5156H40.5476C37.2746 13.5156 34.1358 14.8158 31.8215 17.1301C29.5072 19.4444 28.207 22.5832 28.207 25.8561V99.8993C28.207 106.711 33.7356 112.24 40.5476 112.24H72.2803C75.5532 112.24 78.6921 110.94 81.0064 108.625C83.3207 106.311 84.6208 103.172 84.6208 99.8993V82.5732C82.3157 83.2253 79.955 83.662 77.5691 83.8777ZM45.8363 94.6105C45.8363 93.6753 46.2078 92.7785 46.869 92.1173C47.5303 91.4561 48.4271 91.0846 49.3622 91.0846H63.4657C64.4008 91.0846 65.2976 91.4561 65.9588 92.1173C66.62 92.7785 66.9915 93.6753 66.9915 94.6105C66.9915 95.5456 66.62 96.4424 65.9588 97.1036C65.2976 97.7649 64.4008 98.1363 63.4657 98.1363H49.3622C48.4271 98.1363 47.5303 97.7649 46.869 97.1036C46.2078 96.4424 45.8363 95.5456 45.8363 94.6105ZM74.0432 76.9811C82.4593 76.9811 90.5306 73.6379 96.4817 67.6868C102.433 61.7358 105.776 53.6644 105.776 45.2484C105.776 36.8323 102.433 28.761 96.4817 22.8099C90.5306 16.8589 82.4593 13.5156 74.0432 13.5156C65.6272 13.5156 57.5558 16.8589 51.6048 22.8099C45.6537 28.761 42.3105 36.8323 42.3105 45.2484C42.3105 53.6644 45.6537 61.7358 51.6048 67.6868C57.5558 73.6379 65.6272 76.9811 74.0432 76.9811ZM90.643 37.1671L69.4878 58.3223C69.1603 58.6506 68.7712 58.9111 68.3429 59.0889C67.9145 59.2666 67.4553 59.3581 66.9915 59.3581C66.5277 59.3581 66.0685 59.2666 65.6402 59.0889C65.2118 58.9111 64.8227 58.6506 64.4952 58.3223L57.4435 51.2706C57.1157 50.9427 56.8556 50.5536 56.6782 50.1252C56.5008 49.6969 56.4095 49.2379 56.4095 48.7742C56.4095 48.3106 56.5008 47.8516 56.6782 47.4233C56.8556 46.9949 57.1157 46.6058 57.4435 46.2779C58.1055 45.6159 59.0035 45.2439 59.9398 45.2439C60.4034 45.2439 60.8625 45.3352 61.2908 45.5127C61.7191 45.6901 62.1083 45.9501 62.4361 46.2779L66.9915 50.8404L85.6504 32.1745C86.3124 31.5124 87.2104 31.1405 88.1467 31.1405C89.083 31.1405 89.9809 31.5124 90.643 32.1745C91.3051 32.8366 91.677 33.7345 91.677 34.6708C91.677 35.6071 91.3051 36.505 90.643 37.1671Z"
              fill="#000000"
            />
            <motion.circle
              cx="138.623"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{ ...circleTransition, delay: 0, ease: "easeInOut" }}
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
            />
            <motion.circle
              cx="180.934"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 0.2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="223.244"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 0.4,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="265.554"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 0.6,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="429.503"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 0.8,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="471.813"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{ ...circleTransition, delay: 1, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="514.123"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 1.2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <motion.circle
              cx="556.433"
              cy="62.9947"
              r="8.78276"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              transition={{
                ...circleTransition,
                delay: 1.4,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <defs>
              <clipPath id="clip0_1596_32">
                <rect
                  width="56.4138"
                  height="56.4138"
                  fill="white"
                  transform="translate(694.586 32.7202)"
                />
              </clipPath>
              <clipPath id="clip1_1596_32">
                <rect
                  width="112.828"
                  height="112.828"
                  fill="white"
                  transform="translate(290.879 6.46387)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="h-1/4 w-full flex justify-center items-center">
          <motion.button
            onClick={handleOpen}
            className=" backdrop-filter font-montserrat  pulse-btn font-regular bg-forest text-white text-xs  uppercase tracking-widest backdrop-blur-md shadow-xl shadow-black transition ease-in-out duration-300 rounded-full w-36 h-36"
            whileHover={{ scale: 1.1 }}
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
                    className="w-1/4 h-3/4 backdrop-blur bg-black/50  rounded-2xl shadow-xl"
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
                      <h2 className="text-2xl font-montserrat tracking-wide mt-4 font-bold text-pine">
                        Let's Talk.
                      </h2>
                      {/* Schedule */}
                      <div className="w-full h-3/5 flex justify-evenly items-center flex-col">
                        {/* Form */}
                        <form className="bg-transparent rounded  w-3/4 h-2/3 ">
                          {" "}
                          {/* Name */}
                          <div className="mb-4">
                            <label
                              className="block text-white font-montserrat  text-sm font-medium mb-2"
                              placeholder="name"
                            >
                              Name
                            </label>
                            <input
                              className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              type="text"
                              placeholder="Name"
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
                            <div className="mt-2 h-1/5 w-full flex justify-center items-center ">
                              <button
                                className="w-2/4 h-2/4 border font-montserrat  rounded-full text-pine font-bold"
                                type="submit"
                              >
                                Submit.
                              </button>
                            </div>
                          </div>
                        </form>
                        {/* Phone and Email */}
                        <div className="w-full h-1/5  flex justify-evenly items-center">
                          <button className="w-20 h-20 border-4 border-pine rounded-full shadow-lg flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={faMobile}
                              className="w-8  h-8 text-white"
                            />
                          </button>
                          <button className="w-20 h-20 border-4 border-pine rounded-full shadow-lg flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                              className="w-8  h-8 text-white"
                            />
                          </button>
                        </div>
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
