import React from "react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

const propertyPreview = () => {
  return (
    <div>
      {" "}
      <AnimatePresence>
        {propertyInfo && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="bg-white/40 w-full h-full flex justify-center items-center relative"
            >
              <button
                onClick={handleClose}
                className="w-fit h-fit absolute top-2 right-5"
              >
                <FontAwesomeIcon
                  className="hover:text-black/50 text-black duration-100"
                  icon={faClose}
                  size="lg"
                />
              </button>
              <motion.section
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="w-5/6 h-5/6 bg-black/75 rounded-2xl shadow-xl flex flex-col justify-evenly items-center"
              >
                {/* Home and Description */}
                <div className="w-full h-3/5 flex justify-around items-center">
                  <div className="w-3/5 h-full shadow-lg shadow-pine/20 rounded-lg ">
                    <Image
                      src={homesFile}
                      className="rounded-lg w-[100%] h-[100%] brightness-90"
                      alt="homes"
                    />
                  </div>
                  <div className="w-1/5 h-full text-white">
                    <h2 className="text-2xl tracking-wide text-pine">
                      Description
                    </h2>
                    <p className="text-xs mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
                {/* Card Info */}
                <div className="w-full h-1/5 bg-black/75 flex shadow-lg">
                  <div className="w-1/3 h-full text-white flex justify-center item-center border-r-2">
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="w-fit">
                        <h2 className=" font-medium text-pine tracking-wide text-3xl">
                          {prices[index]}
                        </h2>
                        <h2 className="text-xs font-bold mt-4">
                          {addresses[index]}
                        </h2>
                        <p className="text-xs  font-bold mt-4">{`${infoEstate[index].beds} Beds | ${infoEstate[index].baths} Baths |  ${infoEstate[index].sqft} sqft`}</p>
                      </div>
                    </div>
                  </div>
                  {/* slideshow */}
                  <section className="w-2/3 h-full flex justify-center items-center">
                    <section className="w-5/6 h-3/4">
                      <div className="h-full w-1/4 border"></div>
                    </section>
                  </section>
                </div>
              </motion.section>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default propertyPreview;
