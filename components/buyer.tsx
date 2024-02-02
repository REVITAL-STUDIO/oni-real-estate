import React from "react";
import Image from "next/image";
import buy from "public/buyer.png";
import walking from "public/walking-real-estate.webp";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buyer = () => {
  return (
    <div className="w-full  bg-eggshell ">
      {/* Buyer Process */}
      <div className="w-full h-700 flex flex-col justify-center ">
        <div className="w-[95%] h-4/5 flex flex-col gap-x-2 justify-center bg-[url('/family.png')] bg-cover bg-center rounded-tr-xl rounded-br-xl shadow-xl">
          <div className="md:text-7xl text-5xl p-4 font-agrandir w-full text-mint">
            Buyer Process
          </div>
          <h2 className="md:text-base w-3/4 text-sm text-white font-montserrat font-medium tracking-widest  p-4">
            We Know the Ropes, Let Us Guide You to your Dream Home. Our
            dedicated team is committed to guiding you through every step of the
            home buying process. From understanding your unique preferences to
            navigating the intricate details of real estate transactions, we are
            here to make your dream home a reality.
          </h2>
        </div>
      </div>
      <div className="w-full h-screen ">
        {/* Analyze */}
        <div className="w-[100%] xl:w-[95%] h-full border  flex flex-col xl:flex-row relative">
          <div className="xl:w-1/2 w-full xl:h-3/4 h-1/3 flex xl:flex-col xl:justify-around justify-between items-center px-4">
            <h2 className="font-agrandir text-4xl md:text-6xl lg:8xl mb-4 tracking-wider font-bold">
              Analyze
            </h2>
            <div className="rounded-full bg-forest md:h-96 md:w-96  h-44 w-44 drop-shadow-lg flex justify-center items-center pulse-btn">
              <svg
                width="254"
                height="254"
                viewBox="0 0 254 254"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-4"
              >
                <g id="lets-icons:glasses">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M31.75 148.166V158.75C31.75 169.977 36.2101 180.745 44.1491 188.684C52.0882 196.623 62.8558 201.083 74.0833 201.083C82.504 201.083 90.5797 197.738 96.534 191.784C102.488 185.829 105.833 177.754 105.833 169.333V158.75C105.833 153.136 108.063 147.752 112.033 143.783C116.002 139.813 121.386 137.583 127 137.583C132.614 137.583 137.998 139.813 141.967 143.783C145.937 147.752 148.167 153.136 148.167 158.75V169.333C148.167 177.754 151.512 185.829 157.466 191.784C163.42 197.738 171.496 201.083 179.917 201.083C191.144 201.083 201.912 196.623 209.851 188.684C217.79 180.745 222.25 169.977 222.25 158.75V148.166"
                      stroke="white"
                      stroke-width="5"
                      stroke-linecap="round"
                    />
                    <path
                      id="Vector_2"
                      d="M148.167 148.167H222.25L193.94 63.2353C191.823 56.8853 186.372 52.2286 179.779 51.128C177.192 50.6959 174.542 50.8328 172.013 51.529C169.484 52.2251 167.137 53.464 165.136 55.1592C163.134 56.8545 161.526 58.9655 160.423 61.3454C159.321 63.7252 158.75 66.3168 158.75 68.9397V74.0832M105.833 148.167H31.75L60.0604 63.2353C62.1771 56.8853 67.6275 52.2286 74.2209 51.128C76.808 50.6959 79.4582 50.8328 81.9871 51.529C84.516 52.2251 86.8628 53.464 88.8643 55.1592C90.8657 56.8545 92.4738 58.9655 93.5766 61.3454C94.6794 63.7252 95.2505 66.3168 95.25 68.9397V74.0832"
                      stroke="white"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="xl:w-1/2 w-full xl:h-5/6 h-full flex flex-col justify-evenly  xl:justify-end ">
            <h1 className="p-4 xl:p-0 xl:mb-4 text-2xl md:text-4xl lg:text-6xl xl:text-4xl font-montserrat text-black font-medium tracking-wide">
              All in the Details.
            </h1>{" "}
            <p className="p-4 xl:p-0 xl:mb-4 text-sm  md:text-lg lg:text-2xl xl:text-base text-montserrat font-regular tracking-wider text-black/60 w-5/6">
              Leveraging decades of industry experience, our real estate
              expertise allows us to create unique opportunities and deliver
              exceptional value. Our dedicated development team manages projects
              from concept to completion, ensuring collaboration with
              consultants, local stakeholders, and government entities.{" "}
            </p>
            <ul className="w-3/4 xl:h-2/5 h-1/2 flex flex-col justify-around text-sm md:text-base  font-montserrat tracking-wider p-4 xl:p-0 xl:mb-4">
              <li className="border-t border-b border-black py-4">
                Select your Real Estate Agent
              </li>
              <li className="border-t border-b border-black py-4">
                Select / View Properties
              </li>
              <li className="border-t border-b border-black py-4">
                Analyze needs with Buyer Consultation
              </li>
            </ul>
          </div>
          {/* Next Button */}
          <button className="absolute top-1/2 hover:bg-forest hover:text-pine duration-200 ease-in-out right-4 w-12 h-12 xl:w-16 xl:h-16 p-4 rounded-full border border-black flex justify-center items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              className="md:w-8 md:h-8 w-6 h-6 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
