"use client";

import React, { useEffect, useState, useRef } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation} from "framer-motion";
import { useInView } from "react-intersection-observer";

const Buyer = () => {
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      icon: (
        <svg
          width="250"
          height="250"
          viewBox="0 0 370 370"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
        >
          <path
            d="M53.9583 208.125V238.958C53.9583 255.313 60.4553 270.998 72.0201 282.563C83.5848 294.128 99.27 300.625 115.625 300.625C127.891 300.625 139.655 295.752 148.329 287.078C157.002 278.405 161.875 266.641 161.875 254.375V215.833C161.875 209.7 164.311 203.818 168.648 199.481C172.985 195.144 178.867 192.708 185 192.708C191.133 192.708 197.015 195.144 201.352 199.481C205.689 203.818 208.125 209.7 208.125 215.833V254.375C208.125 266.641 212.998 278.405 221.671 287.078C230.345 295.752 242.109 300.625 254.375 300.625C270.73 300.625 286.415 294.128 297.98 282.563C309.545 270.998 316.042 255.313 316.042 238.958V208.125"
            stroke="black"
            stroke-width="5"
            stroke-linecap="round"
          />
          <path
            d="M161.875 208.125H53.9583L97.9883 76.0348C98.6933 73.9216 99.8077 71.968 101.268 70.2857C102.728 68.6033 104.505 67.2251 106.498 66.2298C109.084 64.9368 111.957 64.3262 114.845 64.4561C117.733 64.586 120.54 65.4521 122.999 66.972C125.459 68.492 127.488 70.6154 128.896 73.1406C130.303 75.6658 131.042 78.5088 131.042 81.3998V84.7915M208.125 208.125H316.042L272.012 76.0348C271.307 73.9216 270.192 71.968 268.732 70.2857C267.272 68.6033 265.495 67.2251 263.502 66.2298C260.916 64.9368 258.043 64.3262 255.155 64.4561C252.267 64.586 249.46 65.4521 247.001 66.972C244.541 68.492 242.512 70.6154 241.104 73.1406C239.697 75.6658 238.958 78.5088 238.958 81.3998V84.7915"
            stroke="black"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      info: [
        "Select your Real Estate Agent",
        "Obtain Financial Pre-Approval",
        "Analyze needs with Buyer Consultation",
      ],
      name: "Analyze",
      paragraph:
        "Leveraging decades of industry experience, our real estate expertise allows us to create unique opportunities and deliver exceptional value. Our dedicated development team manages projects from concept to completion, ensuring collaboration with consultants, local stakeholders, and government entities.",
      title: "All in the Details",
    },
    {
      icon: (
        <svg
          width="250"
          height="250"
          viewBox="0 0 370 370"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
        >
          <path
            d="M77.0833 323.75C68.6042 323.75 61.3481 320.733 55.315 314.7C49.2819 308.667 46.2603 301.406 46.25 292.917V77.0833C46.25 68.6042 49.2717 61.3481 55.315 55.315C61.3583 49.2819 68.6144 46.2603 77.0833 46.25H292.917C301.396 46.25 308.657 49.2717 314.7 55.315C320.744 61.3583 323.76 68.6144 323.75 77.0833H200.417C182.174 77.0833 167.338 82.8029 155.909 94.2421C144.48 105.681 138.76 120.517 138.75 138.75V231.25C138.75 249.493 144.47 264.334 155.909 275.773C167.348 287.213 182.184 292.927 200.417 292.917H323.75C323.75 301.396 320.733 308.657 314.7 314.7C308.667 320.744 301.406 323.76 292.917 323.75H77.0833ZM200.417 262.083C191.937 262.083 184.681 259.067 178.648 253.034C172.615 247.001 169.594 239.739 169.583 231.25V138.75C169.583 130.271 172.605 123.015 178.648 116.982C184.692 110.949 191.948 107.927 200.417 107.917H308.333C316.812 107.917 324.074 110.938 330.117 116.982C336.16 123.025 339.177 130.281 339.167 138.75V231.25C339.167 239.729 336.15 246.99 330.117 253.034C324.084 259.077 316.823 262.094 308.333 262.083H200.417ZM246.667 208.125C253.347 208.125 258.872 205.941 263.24 201.573C267.608 197.205 269.792 191.681 269.792 185C269.792 178.319 267.608 172.795 263.24 168.427C258.872 164.059 253.347 161.875 246.667 161.875C239.986 161.875 234.462 164.059 230.094 168.427C225.726 172.795 223.542 178.319 223.542 185C223.542 191.681 225.726 197.205 230.094 201.573C234.462 205.941 239.986 208.125 246.667 208.125Z"
            fill="black"
          />
        </svg>
      ),
      info: [
        "Select / View Properties",
        "Write an Offer to Purchase",
        "Secure Financing",
      ],
      name: "Finance",
      paragraph:
        "From selecting and viewing properties to crafting a compelling offer to purchase, we guide our clients through each stage with expertise and care. Our dedicated team ensures that securing financing is a seamless process, leveraging our extensive network and resources to find the best options tailored to our clients' needs. By your side, you can trust in our commitment to simplifying the complexities of real estate transactions, making your experience both rewarding and stress-free.",
      title: "Selection to Finance",
    },

    {
      icon: (
        <svg
          width="250"
          height="250"
          viewBox="0 0 333 287"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
        >
          <g filter="url(#filter0_d_1999_14)">
            <path
              d="M189.833 262.75V237.312C189.833 235.257 190.219 233.268 190.99 231.346C191.76 229.424 192.917 227.687 194.458 226.135L275.01 145.969C277.323 143.656 279.892 141.986 282.719 140.958C285.545 139.93 288.371 139.417 291.198 139.417C294.281 139.417 297.236 139.997 300.062 141.159C302.889 142.32 305.458 144.052 307.771 146.354L322.031 160.614C324.087 162.927 325.695 165.496 326.857 168.323C328.018 171.149 328.594 173.976 328.583 176.802C328.583 179.628 328.069 182.522 327.042 185.482C326.014 188.442 324.344 191.073 322.031 193.375L241.865 273.542C240.323 275.083 238.591 276.239 236.669 277.01C234.747 277.781 232.753 278.167 230.687 278.167H205.25C200.882 278.167 197.223 276.692 194.273 273.742C191.324 270.792 189.844 267.128 189.833 262.75ZM291.198 191.833L305.458 176.802L291.198 162.542L276.552 177.187L291.198 191.833ZM35.6666 247.333C27.1874 247.333 19.9313 244.317 13.8983 238.284C7.8652 232.251 4.84353 224.989 4.83325 216.5V31.4998C4.83325 23.0207 7.85492 15.7646 13.8983 9.7315C19.9416 3.69845 27.1977 0.676782 35.6666 0.666504H115.448C119.559 0.666504 123.48 1.43734 127.211 2.97901C130.942 4.52067 134.215 6.7047 137.031 9.53108L159 31.4998H282.333C290.812 31.4998 298.074 34.5215 304.117 40.5648C310.16 46.6082 313.177 53.8643 313.167 62.3332V94.3228C313.167 98.9478 311.301 102.673 307.57 105.5C303.839 108.326 299.538 109.354 294.667 108.583H290.427C283.233 108.583 276.49 109.868 270.2 112.437C263.91 115.007 258.191 118.861 253.042 124L167.865 209.177C165.038 212.003 162.854 215.282 161.312 219.013C159.771 222.744 159 226.659 159 230.76V231.917C159 236.285 157.52 239.949 154.56 242.909C151.6 245.869 147.941 247.343 143.583 247.333H35.6666Z"
              fill="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1999_14"
              x="0.833252"
              y="0.666504"
              width="331.75"
              height="285.5"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1999_14"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1999_14"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
      info: ["Negotiation", "Home Inspection", "Accept Contract"],
      name: "Let's Deal",
      paragraph:
        "Our experienced team works tirelessly to advocate for our clients, striving to achieve the best possible outcomes. Prior to finalizing any agreement, we conduct meticulous home inspections, ensuring our clients are fully informed about the condition of the property. Once all parties are satisfied, we facilitates the smooth acceptance of contracts, ensuring a seamless transition to the next phase of the transaction. Trust us to navigate you through negotiation, home inspection, and contract acceptance with professionalism and expertise.",
      title: "Negotiation to Contract Approval",
    },
  ];

  const toggleSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const currentSlidePick = slides[currentSlide];

  return (
    <div className="w-full  bg-white ">
      {/* Buyer Process */}
      <div className="w-full h-700 flex flex-col justify-center bg-gradient-to-b from-white  via-white to-mint/20">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.25 }}
          className="w-[95%] h-5/6 flex flex-col gap-x-2 justify-center bg-[url('/living-room-interior-design-zoom-calls-with-chair.jpg')] bg-cover bg-center rounded-tr-xl rounded-br-xl shadow-xl"
        >
          <div className="md:text-7xl text-4xl p-4 font-agrandir w-full text-mint">
            Buyer Process
          </div>
          <h2 className="md:text-base w-5/6 text-xs text-white font-montserrat font-medium tracking-widest  p-4">
            We Know the Ropes, Let Us Guide You to your Dream Home. Our
            dedicated team is committed to guiding you through every step of the
            home buying process. From understanding your unique preferences to
            navigating the intricate details of real estate transactions, we are
            here to make your dream home a reality.
          </h2>
        </motion.div>
      </div>
      <div
        className="w-full h-screen bg-gradient-to-b from-mint/20  via-white to-white"
        ref={parentRef}
      >
        {/* Slides */}

        <div className="w-[100%] xl:w-[95%] h-full  relative" ref={ref}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="w-full h-full flex flex-col xl:flex-row overflow-x-hidden"
          >
            <motion.div className="xl:w-1/2 w-full xl:h-3/4 h-1/3 flex xl:flex-col xl:justify-around justify-start items-center px-4 my-8">
              <div className="rounded-full  xl:h-96 xl:w-96 h-64 w-64 drop-shadow-lg flex flex-col  items-center ">
                <h2 className="font-agrandir  text-2xl lg:text-5xl  tracking-wider font-regular">
                  {currentSlidePick.name}
                </h2>
                {currentSlidePick.icon}
              </div>
            </motion.div>
            <motion.div className="xl:w-1/2 w-full xl:h-5/6 h-full flex flex-col justify-evenly  xl:justify-end ">
              <h1 className="p-4 xl:mb-4 pulse-btn shadow-lg xl:ml-0 border border-black text-black ml-4 text-xs md:text-xl w-2/3 md:w-1/3 flex justify-center items-center rounded-full  font-montserrat  font-medium tracking-wide">
                {currentSlidePick.title}
              </h1>

              <p className="p-4 xl:p-0 xl:mb-4 text-sm  md:text-lg lg:text-2xl xl:text-base text-montserrat font-regular tracking-wider text-black/60 w-5/6">
                {currentSlidePick.paragraph}
              </p>
              <ul className="w-3/4 xl:h-2/5 h-1/2 flex flex-col justify-around text-sm md:text-base  font-montserrat tracking-wider p-4 xl:p-0 xl:mb-4">
                {currentSlidePick.info.map((item, index) => (
                  <li key={index} className="border-t  py-4">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={toggleSlide}
            className="absolute top-1/2  hover:text-pine duration-200 ease-in-out right-4 w-10 h-10 xl:w-16 xl:h-16 p-4 flex justify-center items-center"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              className="xl:w-8 xl:h-8 md:w-6 md:h-6 w-4 h-4 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
