"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faCircleMinus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import home1 from "public/home1.webp";
import home2 from "public/home2.jpeg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface profile {
  name: string;
}

const Dashboard = () => {
  //Setting profile name
  const [profile, setProfileName] = useState<profile>({ name: "" });

  let newName = "John Doe";

  useEffect(() => {
    setProfileName((prevProfile) => {
      return { ...prevProfile, name: newName };
    });
  }, []);

  //Open menu

  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  //Saved Listings
  //homes
  const homes: StaticImport[] = [home1, home2, home3, home4, home5, home6];

  //addresses
  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "3015 Flatbend Road, Cypress, TX 77004",
    "1012 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  //viewhome

  const [viewHome, openViewHome] = useState(false);

  const toggleViewHome = () => {(
    
  )}

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] h-5/6 bg-mist/20  shadow-lg rounded-2xl flex">
        {/* Profile */}
        <div className=" w-1/3 h-full flex justify-center items-center">
          {/* Profile Circle */}
          <div className="w-full h-[90%] flex justify-center">
            <div className="w-3/5 h-3/6 rounded-2xl bg-white shadow-md  flex flex-col  items-center">
              <div className="w-5/6 h-1/6 flex items-center justify-between">
                <h2 className="  font-medium font-agrandir tracking-wider">
                  Profile
                </h2>
                <button
                  onClick={handleToggleMenu}
                  className="w-8 h-8 hover:bg-gray-200/20 rounded-full shadow-md flex justify-center items-center transition duration-200 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="lg"
                    className="w-5 h-5 text-black"
                  />
                </button>
              </div>
              {/* Profile Picture */}
              <div className="w-full h-2/3 flex justify-center items-center">
                <div className="w-44 h-44 border-4 border-mint inset-0 relative rounded-2xl flex justify-center items-center">
                  <div className="w-36 h-36 bg-eggshell inset-0 rounded-2xl shadow-md flex justify-center items-center">
                    <h2 className="text-5xl text-white font-montserrat">D</h2>
                  </div>
                  <div className="absolute w-7 h-7 bg-blue-500 shadow-sm left-0 bottom-0 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="sm"
                      className="w-4  h-4 text-white"
                    />
                  </div>
                </div>
              </div>
              {/* Username */}
              <div className="w-full h-1/5   flex justify-center items-center">
                <h2 className="font-agrandir text-lg tracking-wider">
                  {profile.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* Saved Listing */}
        <div className=" w-2/3 h-full flex justify-center items-center">
          <div className="w-[95%] h-[90%] rounded-2xl bg-white shadow-md ">
            <section className="w-full h-1/6">
              <h2 className="p-4 font-agrandir">Saved Listings</h2>
            </section>
            <div className="w-full h-5/6 flex flex-col items-center overflow-y-scroll">
              {homes.map((savedHomes, index) => (
                <div
                  key={index}
                  className="w-5/6 relative h-1/4 rounded-2xl my-4 hover:scale-105 hover:translate-x-4 shadow-mint/50 shadow-md transition duration-150 ease-in-out"
                >
                  <Image
                    src={savedHomes}
                    className=" w-[100%] h-[100%]  object-cover rounded-lg brightness-50 contrast-125 shadow-md"
                    alt="homes"
                  />
                  <div className="absolute top-1/2 w-full flex justify-between">
                    <h2 className=" font-montserrat w-1/3 text-white px-4">
                      {addresses[index]}
                    </h2>
                    <div className="w-1/6 flex justify-evenly">
                      <button className="w-10 h-10">
                        <FontAwesomeIcon
                          className="w-5 h-5 text-white"
                          icon={faEye}
                        />
                      </button>
                      <button className="w-10 h-10 relative">
                        <FontAwesomeIcon
                          className="w-5 h-5 text-red-600"
                          icon={faCircleMinus}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Handling Opening Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white/75 w-full h-full fixed top-0 left-0"
          >
            <motion.div
              initial={{ opacity: 0, left: -100 }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-1/3 bg-black h-full flex flex-col items-center relative"
            >
              {/* Close Button */}
              <div className="absolute w-fit right-2">
                <button
                  onClick={() => setOpenMenu(false)}
                  className="w-8 h-8 flex flex-col relative justify-center items-center rounded-full  space-x-reverse  z-10"
                >
                  <span
                    className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
                  ></span>
                  <span
                    className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
                  ></span>
                </button>
              </div>
              {/* Profile  */}
              <div className="w-5/6 h-1/4 flex items-center">
                <div className="w-32 h-32 border-4 border-mint inset-0 relative rounded-2xl flex justify-center items-center">
                  <div className="w-24 h-24 bg-eggshell inset-0 rounded-2xl shadow-md flex justify-center items-center">
                    <h2 className="text-5xl text-white font-montserrat">D</h2>
                  </div>
                </div>
                <h2 className="text-white text-lg font-agrandir p-4 ">
                  Edit Profile
                </h2>
              </div>
              {/* Form */}
              <form className="w-full h-full  text-sm flex flex-col font-agrandir items-center ">
                {/* Name */}
                <div className="flex flex-col w-4/5">
                  <label className="py-4 text-white">Name</label>
                  <input
                    className="p-4 rounded-lg text-white bg-slate-400/10"
                    type="text"
                    id="Name"
                    name="Name"
                    placeholder="Name"
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col w-4/5">
                  <label className="py-4 text-white">Phone</label>
                  <input
                    className="p-4 rounded-lg text-white bg-slate-400/10"
                    type="text"
                    id="Phone"
                    name="Phone"
                    placeholder="Phone"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col w-4/5">
                  <label className="py-4 text-white">Email</label>
                  <input
                    className="p-4 rounded-lg text-white bg-slate-400/10"
                    type="text"
                    id="Email"
                    name="Email"
                    placeholder="Email"
                  />
                </div>
                {/* Password */}
                <div className="flex flex-col w-4/5">
                  <label className="py-4 text-white">Password</label>
                  <input
                    className="p-4 rounded-lg text-white bg-slate-400/10"
                    type="text"
                    id="Password"
                    name="Password"
                    placeholder="Password"
                  />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col w-4/5">
                  <label className="py-4 text-white">Confirm Password</label>
                  <input
                    className="p-4 rounded-lg text-white bg-slate-400/10"
                    type="text"
                    id="Password"
                    name="Password"
                    placeholder="Confirm Password"
                  />
                </div>
                {/* Log In Button */}
                <div className="justify-evenly w-full h-1/2 my-4 flex  items-center">
                  <button className="p-4 bg-gradient-to-r shadow-md w-1/3 from-pine via-mint/50 to-mint text-base text-black rounded-2xl tracking-wide">
                    Save
                  </button>
                  <button className="p-4 bg-red-700 w-1/3 rounded-2xl text-base tracking-wider shadow-md">
                    Logout
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
