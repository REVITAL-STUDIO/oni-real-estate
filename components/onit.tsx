import React from "react";
import OniManagement from "public/ONIT-LOGO.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Onit = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-t from-white via-mint  to-white xl:bg-mint flex">
      <div className="w-full h-full  relative">
        <div className="w-fit h-1/2 flex flex-col justify-center">
          {" "}
          <h1 className="font-cinzel text-2xl p-4 text-center">
            Meet{" "}
            <span className="font-medium text-5xl tracking-wider">Onit</span>
          </h1>
          <h2
            className="xl:text-5xl text-sm text-center p-4 w-full font-cinzel uppercase font-medium text-black"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            With a commitment to excellence, we seamlessly handle every aspect
            of real estate management, ensuring optimal returns and peace of
            mind for property owners.
          </h2>
        </div>

        <div className="flex flex-col w-full  h-1/4 justify-center items-center  ">
          <Image
            className="xl:w-1/3 w-[75%]  shadow-lg"
            src={OniManagement}
            alt="oni property management"
          />
          <button className="text-lg font-regular tracking-wide p-4 text-gray-500  mt-4 rounded-md font-bold w-44 h-fit font-montserrat top-3/4">
            Visit <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onit;
