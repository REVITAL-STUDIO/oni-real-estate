import React from "react";
import OniManagement from "public/ONIT-LOGO.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Onit = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-t from-black via-forest/50  to-white xl:bg-mint">
      <div className="w-full h-full flex justify-center items-center flex-col relative">
        <div className="flex flex-col w-full  h-1/4 justify-evenly items-center  ">
          <Image
            className="xl:w-1/3 w-[75%]  shadow-lg"
            src={OniManagement}
            alt="oni property management"
          />
        </div>
        <div className="w-fit h-1/3 flex flex-col justify-center items-center">
          {" "}
          <h1
            className="font-cinzel text-3xl xl p-4 text-white text-center"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Meet{" "}
            <span className="font-medium text-6xl  tracking-wider">Onit</span>
          </h1>
          <h2
            className="xl:text-xl text-xs leading-6 text-center p-4 w-full font-cinzel uppercase font-medium text-white"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            With a commitment to excellence, we seamlessly handle every aspect
            of real estate management, ensuring optimal returns and peace of
            mind for property owners.
          </h2>
          <div className="w-3/4 h-20 bg-transparent mt-4  flex justify-center items-center">
            <button className="text-sm bg-white border border-white text-black flex justify-evenly rounded-full items-center shadow-md  font-regular tracking-wide  font-bold w-48 h-fit font-montserrat p-4">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onit;
